import { MessageType } from './MessageType';

export interface Message {
  id: number;
  type: MessageType;
  text: string;
}