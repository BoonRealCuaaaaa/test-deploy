export enum TicketAnalyzeRules {
  READ_HISTORY_CONTENT = 'You must read the entire content within the <history> tag carefully and analyze it thoroughly before proceeding.',
  DIRECT_ANSWER = 'Answer directly to the point, without unnecessary preambles.',
  NO_HISTORY_OR_ANALYSIS = 'If there is no history provided or the analysis cannot be performed, return the lowest value for each category.',
  ALIGN_ANALYSIS_VALUES = 'The analysis values must align with the lists described below.',
}

export enum TicketAnalyzeInstructions {
  READ_HISTORY_CONTENT = '1. Carefully read and analyze the entire conversational history provided within the <history> tags.',
  READ_HISTORY_BOTTOM_TO_TOP = '2. Read the entire history provided from bottom to top to prioritize recent information as it is more relevant to the current situation.',
  CREATE_SUMMARY = '3. Create a summary of the history.',
  ANALYZE_CUSTOMER_TONE = "4. Analyze the tone of the customer's messages throughout the chat history.",
  DETERMINE_SATISFACTION_LEVEL = "5. Determine the overall satisfaction level based on the customer's tone and language.",
  USE_PROVIDED_TONE_SATISFACTION_LIST = '6. Use the provided tone list and satisfaction list to categorize your findings.',
  PRIORITIZE_RECENT_SENTIMENT = '7. If the sentiment is mixed, prioritize the tone and satisfaction level shown in the most recent history.',
  ASSESS_PURCHASING_POTENTIAL = "8. Assess the customer's purchasing potential based on their interest and intent shown in the history.",
  PROVIDE_PURCHASING_REASON = '9. Provide a reason for the purchasing potential level you determined, citing specific evidence from the history.',
  EVALUATE_AGENT_TONE = "10. Evaluate the agent's tone throughout the history using the provided agent tone list.",
  DETERMINE_URGENCY_LEVEL = "11. Determine the urgency level of the customer's requests based on the language and context of the history.",
  NO_HISTORY_OR_ANALYSIS = '12. If there is no history or the analysis cannot be performed, return the lowest value for each category.',
}
