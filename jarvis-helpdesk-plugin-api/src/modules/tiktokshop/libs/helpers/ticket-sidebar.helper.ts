import {
  AgentTone,
  Overview,
  Potential,
  Satisfaction,
  TicketAnalyzeInstructions,
  TicketAnalyzeRules,
  Tone,
  Urgency,
} from '../../constants/ticket-analyze.constants';
import { ChatMessage } from '../../types/tiktokshop.type';
import { formatConversation, joinItems } from '../utils';

export const buildTicketAnalysisPrompt = (conversation: ChatMessage[]): string => {
  const history = formatConversation(conversation);
  const rules = Object.values(TicketAnalyzeRules);
  const instructions = Object.values(TicketAnalyzeInstructions);

  return `
    "You are an expert customer service analyst specializing in evaluating customer sentiment in support ticket interactions. Your task is to analyze the provided chat history, determining the customer's overall sentiment, satisfaction, purchasing potential, agent tone, and urgency level.

    Ensure that your analysis is objective and based on the content of the history. Do not infer beyond the provided text.

    Here is the rules you must follow:
    <rules>
    ${joinItems(rules)}}
    </rules>

    Here is the list of possible tones:
    <tone_list>
    ${Object.values(Tone).join(', ')}
    </tone_list>

    Here is the list of possible satisfaction levels:
    <satisfaction_list>
    ${Object.values(Satisfaction).join(', ')}
    </satisfaction_list>

    Here is the list of possible purchasing potential levels, along with their descriptions:
    <purchasing_potential_list>
    ${Object.values(Potential).join('\n')}
    </purchasing_potential_list>

    Here is the list of possible agent tones:
    <agent_tone_list>
    ${Object.values(AgentTone).join('\n')}
    </agent_tone_list>

    Here is the list of possible urgency levels:
    <urgency_list>
    ${Object.values(Urgency).join('\n')}
    </urgency_list>

    Conversational History: This section may include exchanges between the user and any agents involved in addressing the ticket (in the tag <history>), or it could be empty if no history exists.
    <history>
    ${history.join('\n')}
    </history>

    Here are the instructions of your task:
    <instructions>
    ${joinItems(instructions, 'asc')}
    </instructions>

    Ensure all rules and guidelines are adhered to.

    Put your results in the corresponding XML tags, with no additional explanation:
    - For ticket summary: <summary>
    - For tone: <tone>
    - For satisfaction: <satisfaction>
    - For purchasing potential: <purchasing_potential>
    - For purchasing potential reason: <purchasing_potential_reason>
    - For agent tone: <agent_tone>
    - For urgency: <urgency>

    For example, your output MUST following the form like this (in the tag <output>):
    <output>
    <summary>
    This is the summary of the history.
    </summary>
    <tone>Slightly positive</tone>
    <satisfaction>Satisfied</satisfaction>
    <purchasing_potential>Low</purchasing_potential>
    <purchasing_potential_reason>No history available</purchasing_potential_reason>
    <agent_tone>Professional</agent_tone>
    <urgency>Low</urgency>
    </output>

    Example when analysis cannot be performed:
    <output>
    <summary>There is no conversation history available to analyze.</summary>
    <tone>Negative</tone>
    <satisfaction>Very dissatisfied</satisfaction>
    <purchasing_potential>Low</purchasing_potential>
    <purchasing_potential_reason>No history available</purchasing_potential_reason>
    <agent_tone>Professional</agent_tone>
    <urgency>Low</urgency>
    </output>"
  `;
};

export const calculateAverageResponseTime = (conversation: ChatMessage[]) => {
  if (conversation.length <= 1) return Overview.DEFAULT_AVERAGE_RESPONSE_TIME;

  let sendMessage = conversation[0];
  let replyMessage = conversation[0];
  let index = 1,
    timeDifferece = 0,
    numberOfMessages = 0;
  while (index < conversation.length) {
    replyMessage = conversation[index];

    if (replyMessage.author.role !== sendMessage.author.role) {
      if (replyMessage.timestamp && sendMessage.timestamp) {
        const replyTimestamp = new Date(replyMessage.timestamp);
        const sendTimestamp = new Date(sendMessage.timestamp);

        timeDifferece += Math.abs(replyTimestamp.getTime() - sendTimestamp.getTime());
        numberOfMessages++;
      }
      sendMessage = replyMessage;
    }
    index++;
  }

  return numberOfMessages === 0 ? Overview.DEFAULT_AVERAGE_RESPONSE_TIME : timeDifferece / numberOfMessages;
};

export const calculateLastMessageTime = (conversation: ChatMessage[]) => {
  return (
    conversation
      .slice()
      .reverse()
      .find((message) => message.author.role === 'agent')?.timestamp ?? null
  );
};
