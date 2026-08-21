import { Injectable } from '@angular/core';
import { Message } from '../enums/Message';
import { MessageType } from '../enums/MessageType';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages: Message[] = [];
  private nextId = 1;

  public showSuccess(text: string = 'Успешное сообщение'): void {
    this.addMessage(MessageType.Success, text);
  }

  public showInfo(text: string = 'Информационное сообщение'): void {
    this.addMessage(MessageType.Info, text);
  }

  public showWarn(text: string = 'Предупреждение'): void {
    this.addMessage(MessageType.Warn, text);
  }

  public showError(text: string = 'Ошибка'): void {
    this.addMessage(MessageType.Error, text);
  }

  private addMessage(type: MessageType, text: string): void {
    const message: Message = {
      id: this.nextId++,
      type,
      text,
      icon: this.getIcon(type)
    };

    this.messages.unshift(message);

    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }

  public closeMessage(id: number): void {
    this.messages = this.messages.filter(message => message.id !== id);
  }

  private getIcon(type: MessageType): string {
    return '/images/messages/icon-message.png';
  }
}