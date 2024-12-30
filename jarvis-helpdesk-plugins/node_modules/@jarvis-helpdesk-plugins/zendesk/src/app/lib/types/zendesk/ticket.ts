export type ZendeskTicket = {
  id: number;
  assignee: object;
  brand: { name: string; url: string };
  collaborators: object[];
  comment: {
    attachments: object[];
    text: string;
    type: string;
    useRichText: boolean;
  };
  comments: object[];
  conversation: {
    attachments: object[];
    author: {
      avatar: string;
      id: number;
      name: string;
      role: string;
    };
    channel: { name: string };
    message: { content: string; contentType: string };
    timestamp: string;
  }[];
  createdAt: string;
  customStatus: object;
  description: string;
  via: {
    channel: string;
    source: object;
  };
  requester: {
    name: string;
  };
  [key: string]: unknown;
};
