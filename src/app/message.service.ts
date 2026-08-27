import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../enums/Message';
import { MessageType } from '../enums/MessageType';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$: Observable<Message[]> = this.messagesSubject.asObservable();

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

    const current = this.messagesSubject.value;
    this.messagesSubject.next([message, ...current]);

    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }

  public closeMessage(id: number): void {
    const current = this.messagesSubject.value;
    this.messagesSubject.next(current.filter(message => message.id !== id));
  }

  private getIcon(type: MessageType): string {
    return '/images/messages/icon-message.png';
  }
}