import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AiAssistantService } from 'src/shared/modules/ai-assistant/ai-assistant.service';
import { Repository } from 'typeorm';

import { AIAssistant } from '../assistant/entities/assistant.entity';
import { IntegrationPlatform } from '../integration-platform/entities/integration-platform.entity';

import { buildDraftResponsePrompt, buildFormalizePrompt } from './lib/helpers/response-toolbox.helper';
import {
  buildTicketAnalysisPrompt,
  calculateAverageResponseTimeFromAgent,
  calculateLastMessageTime,
} from './lib/helpers/ticket-sidebar.helper';
import { extractTagValues, formatConversation, markdownToHtml } from './lib/utils';
import { Conversation, Requester, Ticket, Via } from './types/zendesk.type';
@Injectable()
export class ZendeskService {
  constructor(
    private aiAssistantService: AiAssistantService,
    @InjectRepository(IntegrationPlatform) private integrationPlatformRepository: Repository<IntegrationPlatform>,
    @InjectRepository(AIAssistant) private assistantRepository: Repository<AIAssistant>
  ) {}

  async generateResponse(content: string) {
    return await this.aiAssistantService.askAssistant(content);
  }

  async generateDraftResponse(
    conversation: Conversation[],
    requester: Requester,
    via: Via,
    domain: string
  ): Promise<string> {
    const normalizedConversation = formatConversation(conversation);
    let template;
    const chatThread = via.channel === 'native_messaging';

    const assistant = await this.assistantRepository.findOne({
      where: { integrationPlatforms: { domain: domain } },
      relations: ['responseTemplates', 'rules', 'config'],
    });

    if (!assistant) {
      throw new HttpException('Assistant not found', HttpStatus.NOT_FOUND);
    }

    const { toneOfAI, includeReference, language, enableTemplate } = assistant.config.values;
    const { responseTemplates, rules } = assistant;

    if (enableTemplate) {
      template =
        responseTemplates.length > 0
          ? assistant.responseTemplates.find((template) => template.isActive)?.template ||
            `Hello ${requester.name},\n\nThank you for reaching out to us.{YOUR CONTENT GO HERE}.\n\nBest regards`
          : `Hello ${requester.name},\n\nThank you for reaching out to us.{YOUR CONTENT GO HERE}.\n\nBest regards`;
    }

    const prompt = buildDraftResponsePrompt(
      normalizedConversation,
      language,
      toneOfAI,
      rules.filter((r) => r.isEnable === true).map((r) => r.content),
      chatThread,
      template,
      includeReference
    );

    const result = await this.aiAssistantService.askAssistant(prompt);
    const match = result.match(/<final_answer>([\s\S]*?)<\/final_answer>/i);

    if (!match) {
      throw new HttpException('Internal server error', HttpStatus.BAD_REQUEST);
    }

    const finalAnswer = match[1].trim();
    return markdownToHtml(finalAnswer);
  }

  async generateFormalizeResponse(ticket: Ticket, givenText: string, variant: string) {
    const lastMessage = buildFormalizePrompt(ticket, givenText, variant);
    const result = await this.aiAssistantService.askAssistant(lastMessage);
    return markdownToHtml(result);
  }

  async generateAnalyzeTicket(ticket: Ticket, domain: string) {
    const integrationPlatform = await this.integrationPlatformRepository.findOne({
      where: { domain },
      relations: ['assistant', 'assistant.config'],
    });

    if (!integrationPlatform) {
      throw new HttpException('Integration platform not found', HttpStatus.NOT_FOUND);
    }

    const { assistant } = integrationPlatform;

    const commentsCount = ticket.conversation.length;
    const averageResponseTime = calculateAverageResponseTimeFromAgent(ticket.conversation);
    const lastMessageTime = calculateLastMessageTime(ticket.conversation);

    const message = buildTicketAnalysisPrompt(ticket);
    const result = await this.aiAssistantService.askAssistant(message);

    const summaryValues = extractTagValues(result, 'summary');
    const toneValues = extractTagValues(result, 'tone');
    const satisfactionValues = extractTagValues(result, 'satisfaction');
    const purchasingPotentialValues = extractTagValues(result, 'purchasing_potential');
    const reasonValues = extractTagValues(result, 'reason');
    const agentToneValues = extractTagValues(result, 'agent_tone');
    const urgencyValues = extractTagValues(result, 'urgency');

    return {
      isAutoResponse: assistant.config.values.autoResponse,
      commentsCount,
      averageResponseTime,
      lastMessageTime,
      sentiment: {
        tone: toneValues[0],
        satisfaction: satisfactionValues[0],
        agent_tone: agentToneValues[0],
        urgency: urgencyValues[0],
      },
      purchasingPotential: {
        rating: purchasingPotentialValues[0],
        reason: reasonValues[0],
      },
      summary: summaryValues[0],
    };
  }
}
