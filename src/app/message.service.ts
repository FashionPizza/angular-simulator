import { Injectable } from '@angular/core';
import { Message } from '../enums/Message';
import { MessageType } from '../enums/MessageType';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages: Message[] = [];

  private nextId = 1;

  public showSuccess(): void {
    this.addMessage(MessageType.Success, 'Успешное сообщение');
  }

  public showInfo(): void {
    this.addMessage(MessageType.Info, 'Информационное сообщение');
  }

  public showWarn(): void {
    this.addMessage(MessageType.Warn, 'Предупреждение');
  }

  public showError(): void {
    this.addMessage(MessageType.Error, 'Ошибка');
  }

  private addMessage(type: MessageType, text: string): void {
    const message: Message = {
      id: this.nextId++,
      type,
      text
    };

    this.messages.unshift(message);

    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }

  public closeMessage(id: number): void {
    this.messages = this.messages.filter(message => message.id !== id);
  }
}