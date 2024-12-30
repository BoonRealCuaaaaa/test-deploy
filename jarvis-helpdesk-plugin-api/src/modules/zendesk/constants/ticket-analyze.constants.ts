export enum Tone {
  POSITIVE = 'Positive',
  SLIGHTLY_POSITIVE = 'Slightly positive',
  NORMAL = 'Normal',
  SLIGHTLY_NEGATIVE = 'Slightly negative',
  NEGATIVE = 'Negative',
}

export enum Satisfaction {
  VERY_SATISFIED = 'Very Satisfied',
  SATISFIED = 'Satisfied',
  NEUTRAL = 'Neutral',
  DISSATISFIED = 'Dissatisfied',
  VERY_DISSATISFIED = 'Very Dissatisfied',
}

export enum Potential {
  LOW = 'Low: The customer shows minimal interest and only seeks general information without a clear intention to buy.',
  MEDIUM = 'Medium: The customer is somewhat interested in the product/service and asks more detailed questions but does not have a clear intent to purchase.',
  HIGH = 'High: The customer has a clear intention to buy and shows significant interest in completing the transaction.',
}

export enum AgentTone {
  PROFESSIONAL = 'Professional: Responses are formal, concise, and focused on clarity. Ideal for business or corporate settings, where accuracy and neutrality are key.',
  FRIENDLY = 'Friendly: Conversational and approachable, this tone uses casual language to create a warm and engaging experience, perfect for customer support or social interactions.',
  ENTHUSIASTIC = 'Enthusiastic: Upbeat, energetic, and positive. Suitable for engaging audiences, creating excitement, or energizing responses.',
  NOT_RESPONDED = 'Not Responded: The agent has not yet responded to the inquiry.',
}

export enum Urgency {
  LOW = 'Low: The task or issue is not time-sensitive and can be addressed at a leisurely pace without immediate attention.',
  NORMAL = 'Normal: The task or issue should be addressed in a timely manner but does not require immediate action.',
  HIGH = 'High: The task or issue is important and should be prioritized, requiring prompt attention and action.',
  URGENT = 'Urgent: The task or issue is critical and demands immediate attention and action to prevent significant consequences.',
}
