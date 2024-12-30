import { Injectable } from '@nestjs/common';
import { AiAssistantService } from 'src/shared/modules/ai-assistant/ai-assistant.service';

import { buildDraftResponsePrompt, buildFormalizePrompt } from './libs/helpers/response-toolbox.helper';
import {
  buildTicketAnalysisPrompt,
  calculateAverageResponseTime,
  calculateLastMessageTime,
} from './libs/helpers/ticket-sidebar.helper';
import { extractTagValues, htmlToPlainText, markdownToHtml } from './libs/utils';
import { ChatMessage } from './types/tiktokshop.type';

@Injectable()
export class TiktokshopService {
  constructor(private aiAssistantService: AiAssistantService) {}

  async generateResponse(content: string) {
    return await this.aiAssistantService.askAssistant(content);
  }

  async generateDraftResponse(conversation: ChatMessage[]): Promise<string> {
    // Read db for those informations
    // const template = `Thank you for reaching out to us. We are sorry for the inconvenience you have faced. We will do our best to help you. Please provide us with more information about your issue so we can assist you better.\n\nBest regards`;
    const language = 'Vietnamese';

    const prompt = buildDraftResponsePrompt(conversation, language, 'Helpful and concise', [
      'Always say sorry when customers are angry, do not blame them',
      'Must not add reference source to your response',
    ]);

    const result = await this.aiAssistantService.askAssistant(prompt);
    const html = markdownToHtml(result);

    return html;
  }

  // async generateDraftResponse(conversation: ChatMessage[]): Promise<any> {
  //   const history = formatConversation(conversation);

  //   const userInquiryPrompt = buildFindUserInquiryPrompt(history);
  //   const userInquiryAnswer = await this.generateResponse(userInquiryPrompt);

  //   const userInquiryResult = extractTagValues(userInquiryAnswer, 'issue');

  //   const classifyPrompt = buildClassifyPrompt(userInquiryResult[0]);
  //   const classifyAnswer = await this.generateResponse(classifyPrompt);

  //   const classifyResult = extractTagValues(classifyAnswer, 'category');
  //   const agentResult = extractTagValues(classifyAnswer, 'agent');

  //   if (classifyResult[0] === 'Other' || agentResult[0] === 'YES') {
  //     // NOTE: Cân nhắc gọi AI generate response để đúng ngôn ngữ, đa dạng cách trả lời
  //     return `I cannot endorse or approve of this situation. I strongly recommend reaching out to a customer support agent for further assistance and guidance on how to resolve the issue.`;
  //   }

  //   const findAmbiguitiesPrompt = buildFindAmbiguitiesPrompt(history, userInquiryResult[0]);
  //   const findAmbiguitiesAnswer = await this.generateResponse(findAmbiguitiesPrompt);
  //   const findAmbiguitiesResult = extractTagValues(findAmbiguitiesAnswer, 'ambiguities');

  //   const generateDraftResponsePrompt = buildGenerateDraftResponsePrompt(
  //     history,
  //     userInquiryResult[0],
  //     findAmbiguitiesResult[0]
  //   );
  //   const draftResponseAnswer = await this.generateResponse(generateDraftResponsePrompt);
  //   const draftResponseResult = extractTagValues(draftResponseAnswer, 'final_answer');

  //   return {
  //     userInquiryResult: userInquiryResult[0],
  //     categoryResult: classifyResult[0],
  //     agentResult: agentResult[0],
  //     findAmbiguitiesResult: findAmbiguitiesResult[0],
  //     draftResponse: draftResponseResult[0],
  //   };
  // }

  async generateFormalizeResponse(conversation: ChatMessage[], givenText: string, variant: string) {
    const ruleEntities = [
      { content: 'The response should be in HTML format.' },
      { content: 'Answer directly to the point, without unnecessary preambles.' },
      { content: 'Ensure that the givenText maintains its original formatting.' },
      { content: 'Add the reference below as hyperlink the response if applicable' },
      { content: 'Do not insert sources from the knowledge base at the bottom of response.' },
      {
        content:
          'Correct only obvious spelling errors in the following text. Keep names and unique words unchanged, unless asked to change them.',
      },
      {
        content:
          "Don't use any backtick. And just generate response so that agent can just copy and paste to the textbox",
      },
      { content: 'Keep response language stays the same as history language' },
    ];
    const rules = ruleEntities.map((r) => r.content);

    const lastMessage = buildFormalizePrompt(conversation, givenText, variant, rules);
    const result = await this.aiAssistantService.askAssistant(lastMessage);
    const html = markdownToHtml(result);
    const plainText = htmlToPlainText(html);
    return plainText;
  }

  async generateAnalyzeTicket(conversation: ChatMessage[]) {
    const commentsCount = conversation.length;
    const averageResponseTime = calculateAverageResponseTime(conversation);
    const lastMessageTime = calculateLastMessageTime(conversation);

    const message = buildTicketAnalysisPrompt(conversation);

    const result = await this.aiAssistantService.askAssistant(message);

    const summaryValues = extractTagValues(result, 'summary');
    const toneValues = extractTagValues(result, 'tone');
    const satisfactionValues = extractTagValues(result, 'satisfaction');
    const purchasingPotentialValues = extractTagValues(result, 'purchasing_potential');
    const pusrchaingPotentialReason = extractTagValues(result, 'purchasing_potential_reason');
    const agentToneValues = extractTagValues(result, 'agent_tone');
    const urgencyValues = extractTagValues(result, 'urgency');

    return {
      commentsCount,
      averageResponseTime,
      lastMessageTime,
      sentiment: {
        tone: toneValues[0],
        satisfaction: satisfactionValues[0],
        purchasing_potential: purchasingPotentialValues[0],
        purchasing_potential_reason: pusrchaingPotentialReason[0],
        agent_tone: agentToneValues[0],
        urgency: urgencyValues[0],
      },
      summary: summaryValues[0],
    };
  }
}
