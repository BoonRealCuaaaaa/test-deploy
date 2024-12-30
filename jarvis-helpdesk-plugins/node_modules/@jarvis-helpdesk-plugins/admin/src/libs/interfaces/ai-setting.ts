export interface IAssistantSettings {
  id: string;
  autoResponse: boolean;
  enableTemplate: boolean;
  includeReference: boolean;
  language: string;
  toneOfAI: string;
  jarvisAssitantId: string | null;
  jarvisKnowledgeId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRule {
  id: string;
  content: string;
  isEnable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IIntegrationPlatform {
  id: string;
  type: string;
  domain: string;
  isEnable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
