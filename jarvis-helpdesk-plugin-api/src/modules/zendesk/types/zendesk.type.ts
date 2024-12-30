export type Author = {
  role: string;
};

export type Conversation = {
  author: {
    role: string;
  };
  message: Message;
  timestamp: string;
};

export type Requester = {
  name: string;
};

export type Via = {
  channel: string;
};

export type Ticket = {
  id: string;
  type: string;
  tags: string[];
  brand: { name: string };
  status: string;
  subject: string;
  conversation: Conversation[];
  assignee: { user: { name: string } };
  requester: {
    name: string;
    locale: string;
    email: string;
    role: string;
  } | null;
};

export type Message = {
  role: string;
  content: string;
  createdAt?: string;
};
