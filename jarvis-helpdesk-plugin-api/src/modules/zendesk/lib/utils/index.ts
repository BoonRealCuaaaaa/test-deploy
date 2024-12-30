import { HttpException, HttpStatus } from '@nestjs/common';
import showdown from 'showdown';

import { Conversation } from '../../types/zendesk.type';

export const formatConversation = (conversation: Conversation[]): string[] => {
  return conversation.map((comment) => {
    if (comment.author.role === 'end-user') {
      return '<User>' + comment.message.content + '</User>';
    } else {
      return '<Agent>' + comment.message.content + '</Agent>';
    }
  });
};

export const markdownToHtmlDraftResponse = (markdown: string): string => {
  const match = markdown.match(/<final_answer>([\s\S]*?)<\/final_answer>/i);
  if (!match) {
    throw new HttpException('Internal server error', HttpStatus.BAD_REQUEST);
  }

  const finalAnswer = match[1].trim();
  const converter: showdown.Converter = new showdown.Converter({ simplifiedAutoLink: true }) as string;
  let html: string = converter.makeHtml(finalAnswer) as string;
  html = html.replace(/<li><p>/g, '<li>').replace(/<\/p><\/li>/g, '</li>');
  return html;
};

export const markdownToHtmlSentiment = (markdown: string): string => {
  const match = markdown.match(/<summary>([\s\S]*?)<\/summary>/i);
  if (!match) {
    throw new HttpException('Internal server error', HttpStatus.BAD_REQUEST);
  }

  const finalAnswer = match[1].trim();
  const converter: showdown.Converter = new showdown.Converter({ simplifiedAutoLink: true }) as string;
  let html: string = converter.makeHtml(finalAnswer) as string;
  html = html.replace(/<li><p>/g, '<li>').replace(/<\/p><\/li>/g, '</li>');
  return html;
};

export const markdownToHtml = (markdown: string): string => {
  const finalAnswer = markdown.trim();
  const converter: showdown.Converter = new showdown.Converter({ simplifiedAutoLink: true }) as string;
  let html: string = converter.makeHtml(finalAnswer) as string;
  html = html.replace(/<li><p>/g, '<li>').replace(/<\/p><\/li>/g, '</li>');
  return html;
};

export const extractTagValues = (input: string, tagName: string): string[] => {
  const regex = new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`, 'g');
  const matches: string[] = [];
  let match;
  while ((match = regex.exec(input)) !== null) {
    matches.push(match[1].trim());
  }
  return matches;
};

export const joinItems = (items: string[], prefix = '-'): string => {
  return items.map((item) => `\n${prefix} ${item}`).join('');
};

export const checkTicketConversation = (conversation: Conversation[]): boolean => {
  return conversation.some((comment) => comment.author.role === 'end-user');
};

export const convertSecondsToDhms = (seconds: number): string => {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}days`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0) parts.push(`${secs}s`);

  return parts.join(', ');
};
