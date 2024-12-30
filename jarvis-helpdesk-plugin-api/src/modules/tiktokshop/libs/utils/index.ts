import { HttpException, HttpStatus } from '@nestjs/common';
import showdown from 'showdown';

import { ChatMessage } from '../../types/tiktokshop.type';

export const formatConversation = (conversation: ChatMessage[]): string[] => {
  return conversation.map((comment) => {
    if (comment.author.role === 'customer') {
      return '<Customer>' + comment.message.content + '</Customer>';
    } else if (comment.author.role === 'agent') {
      return '<Agent>' + comment.message.content + '</Agent>';
    } else {
      return '';
    }
  });
};

export const markdownToHtml = (markdown: string, responseType = ''): string => {
  if (responseType !== '') {
    const match = markdown.match(new RegExp(`<${responseType}>([\\s\\S]*?)<\\/${responseType}>`, 'i'));
    if (!match) {
      throw new HttpException('Internal server error', HttpStatus.BAD_REQUEST);
    }
    markdown = match[1].trim();
  }

  const finalAnswer = markdown.trim();
  const converter: showdown.Converter = new showdown.Converter({ simplifiedAutoLink: true }) as string;
  let html: string = converter.makeHtml(finalAnswer) as string;
  html = html.replace(/<li><p>/g, '<li>').replace(/<\/p><\/li>/g, '</li>');
  return html;
};

export const htmlToPlainText = (html: string): string => {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
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

export const checkTicketConversation = (conversation: ChatMessage[]): boolean => {
  return conversation.some((comment) => comment.author.role === 'customer');
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

export const joinItems = (items: string[], prefix = '-'): string => {
  if (prefix === 'asc') {
    return items.map((item, index) => `${index + 1}. ${item}\n`).join('');
  }
  return items.map((item) => `\n${prefix} ${item}`).join('');
};
