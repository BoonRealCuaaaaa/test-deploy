export type Author = {
  role: string;
};

export type ChatMessage = {
  author: Author;
  message: Message;
  timestamp?: string;
};

export type Message = {
  role: string;
  content: string;
  createdAt?: string;
};
