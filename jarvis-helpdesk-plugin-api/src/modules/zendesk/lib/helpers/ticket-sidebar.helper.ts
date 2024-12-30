import DateTimeUtils from 'src/lib/utils/datetime.util';

import { TicketAnalyzeInstructions, TicketAnalyzeRules } from '../../constants/ticket-analyze.constant';
import { AgentTone, Potential, Satisfaction, Tone, Urgency } from '../../constants/ticket-analyze.constants';
import { Conversation, Ticket } from '../../types/zendesk.type';
import { formatConversation, joinItems } from '../utils';

export const buildSentimentPrompt = (ticket: Ticket, rules: string[]): string => {
  const history = formatConversation(ticket.conversation);
  const joinRules = (rules: string[]) => rules.map((rule) => `\n- ${rule}`).join('');
  return `
    "You are an expert customer service analyst with a specialty in evaluating customer sentiment from support ticket interactions. Your task is to analyze the provided chat history and determine the overall sentiment and satisfaction level of the customer.

    Ensure that your analysis is objective and based on the content of the conversation. Do not infer beyond the provided text.

    Here are the important rules for the task:
    <rules>
    ${joinRules(rules)}
    </rules>

    Here is an example of how to analyze and categorize the sentiment:

    <example>
    <history>
    Agent: Hello, how can I assist you today?
    Customer: I'm really frustrated with the service. My internet has been down for hours!
    Agent: I'm sorry to hear that. Let me check your account.
    Customer: This is the third time this month. I'm seriously considering switching providers.
    </history>

    <analysis>
    <json>
    {
      "tone": "Negative",
      "satisfaction": "Very dissatisfied"
    }
    </json>
    </analysis>
    </example>

    Here is the list of possible tones:
    <tone_list>
    ${Object.values(Tone).join(', ')}
    </tone_list>

    Here is the list of possible satisfaction levels:
    <satisfaction_list>
    ${Object.values(Satisfaction).join(', ')}
    </satisfaction_list>

    Here is the chat history for the current ticket:
    <history>
    ${history.join('\n')}
    </history>

    <instructions>
    - Carefully read the chat history.
    - Analyze the tone and satisfaction level based on the customer's messages.
    - Use the provided tone list and satisfaction list to categorize your findings.
    - Format your output as specified, with no additional explanation.
    </instructions>

    Before providing your analysis, carefully consider the tone and satisfaction level of the customer's messages step by step. Ensure all rules and guidelines are adhered to.

    Your response must be in the following JSON format only:
    <json>
    {
      "tone": "{TONE}",
      "satisfaction": "{SATISFACTION}"
    }
    </json>"
  `;
};

export const buildSummaryPrompt = (ticket: Ticket, rules: string[]): string => {
  const history = formatConversation(ticket.conversation);
  const joinRules = (rules: string[]) => rules.map((rule) => `- ${rule}`).join('\n');

  return `
    You are an expert customer service analyst, skilled at extracting key information from customer service conversations and summarizing it in a structured format. Your task is to analyze customer service conversations and generate concise, accurate summaries without providing personal opinions.

    You should maintain a professional and simple customer service tone.

    Here are some important rules you should follow, provided inside the <rules> tag:
    <rules>
    ${joinRules(rules)}
    </rules>

    Here is the conversational history (between the user and you, maybe there are other agents who help solving this ticket). It could be empty if there is no history:
    <history>
    ${history.join('\n')}
    </history>

    Based on the history conversation, follow the instructions provided inside the <instructions> tag below:
    <instructions>
    - If the history is blank, return the exact phrase: "No history found".
    - Read the ticket conversation carefully.
    - Analyze the conversation, focusing on the customer's context, issue, and any solutions discussed.
    - Write a summary paragraph that gives clear insight into the customer’s issues and context, solutions (if provided) using the template below:
      <template>
      The customer, <customer name>, <briefly describe the customer’s main goals and issues>. The assistant <briefly describe the main solution offered by the agent>.
      </template>
    - If your summary exceeds 200 characters, continue revising until it meets this limit.
    - Put your completed summary inside <summary> tag.
    </instructions>

    Before creating the summary, analyze the conversational history and outline your thought process in the <thinking> tag:
    <thinking>Indicate the main issue and resolution</thinking>

    Place your final summary within <summary> tags.

    Please ensure accuracy, as this is critical for my career.
  `;
};

export const buildTicketAnalysisPrompt = (ticket: Ticket): string => {
  const history = formatConversation(ticket.conversation);
  const rules = Object.values(TicketAnalyzeRules);
  const instructions = Object.values(TicketAnalyzeInstructions);

  return `
    "You are an expert customer service analyst specializing in evaluating customer sentiment in support ticket interactions. Your task is to analyze the provided chat history, determining the customer's overall sentiment, satisfaction, purchasing potential, agent tone, urgency level, and provide a reason for the purchasing potential.

    Ensure that your analysis is objective and based on the content of the history. Do not infer beyond the provided text.

    Here is the rules you must follow:
    <rules>
    ${joinItems(rules)}
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

    Conversational History: This section may include exchanges between the user and any agents involved in addressing the ticket in the tag <history>, or it could be empty if no history exists.
    <history>
    ${history.join('\n')}
    </history>

    Here are the instructions of your task:
    <instructions>
    ${joinItems(instructions)}
    </instructions>

    Ensure all rules and guidelines are adhered to.

    Put your results in the corresponding XML tags, with no additional explanation:
    - For ticket summary: <summary>
    - For tone: <tone>
    - For satisfaction: <satisfaction>
    - For purchasing potential: <purchasing_potential>
    - For reason of purchasing potential: <reason>
    - For agent tone: <agent_tone>
    - For urgency: <urgency>

    For example, your output MUST look like this (in the tag <output>):
    <output>
    <summary>
    This is the summary of the history.
    </summary>
    <tone>Slightly positive</tone>
    <satisfaction>Satisfied</satisfaction>
    <purchasing_potential>Low</purchasing_potential>
    <reason>The customer showed minimal interest and only sought general information.</reason>
    <agent_tone>Professional</agent_tone>
    <urgency>Low</urgency>
    </output>

    Example when analysis cannot be performed:
    <output>
    <summary>There is no conversation history available to analyze.</summary>
    <tone>Negative</tone>
    <satisfaction>Very dissatisfied</satisfaction>
    <purchasing_potential>Low</purchasing_potential>
    <reason>No history available to determine purchasing potential.</reason>
    <agent_tone>Not Responsed</agent_tone>
    <urgency>Low</urgency>
    </output>"
  `;
};

export const calculateAverageResponseTimeFromAgent = (conversation: Conversation[]): string => {
  const endUserMessages = conversation.filter((comment) => comment.author.role === 'end-user');
  const adminMessages = conversation.filter((comment) => comment.author.role === 'admin');

  if (endUserMessages.length === 0 || adminMessages.length === 0) {
    return '--';
  }

  let totalResponseTime = 0;
  let responseCount = 0;

  endUserMessages.forEach((endUserMessage, index) => {
    const endUserTimestamp = new Date(endUserMessage.timestamp).getTime();
    let adminResponse;

    if (index < endUserMessages.length - 1) {
      const nextEndUserTimestamp = new Date(endUserMessages[index + 1].timestamp).getTime();
      adminResponse = adminMessages.find(
        (adminMessage) =>
          new Date(adminMessage.timestamp).getTime() > endUserTimestamp &&
          new Date(adminMessage.timestamp).getTime() < nextEndUserTimestamp
      );
    } else {
      adminResponse = adminMessages.find(
        (adminMessage) => new Date(adminMessage.timestamp).getTime() > endUserTimestamp
      );
    }

    if (adminResponse) {
      const adminTimestamp = new Date(adminResponse.timestamp).getTime();
      totalResponseTime += adminTimestamp - endUserTimestamp;
      responseCount++;
    }
  });

  const averageResponseTimeInSeconds = responseCount > 0 ? totalResponseTime / responseCount / 1000 : 0;
  return DateTimeUtils.formatDurationToString(averageResponseTimeInSeconds);
};

export const calculateLastMessageTime = (conversation: Conversation[]): string => {
  const adminMessages = conversation.filter((comment) => comment.author.role === 'admin');
  if (adminMessages.length === 0) {
    return '--';
  }
  const lastMessage = adminMessages[adminMessages.length - 1];
  const lastMessageTime = new Date(lastMessage.timestamp);
  return DateTimeUtils.formatDateToString(lastMessageTime);
};
