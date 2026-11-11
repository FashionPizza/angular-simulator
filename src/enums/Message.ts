import { MessageType } from './MessageType';

export interface IMessage {
  id: number;
  type: MessageType;
  text: string;
  icon: string;
}
