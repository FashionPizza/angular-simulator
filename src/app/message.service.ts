import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMessage } from '../enums/Message';
import { MessageType } from '../enums/MessageType';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messagesSubject = new BehaviorSubject<IMessage[]>([]);
  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();

  private nextId = 1;

  showSuccess(text = 'Успешное сообщение'): void {
    this.addMessage(MessageType.SUCCESS, text);
  }

  showInfo(text = 'Информационное сообщение'): void {
    this.addMessage(MessageType.INFO, text);
  }

  showWarn(text = 'Предупреждение'): void {
    this.addMessage(MessageType.WARN, text);
  }

  showError(text = 'Ошибка'): void {
    this.addMessage(MessageType.ERROR, text);
  }

  private addMessage(type: MessageType, text: string): void {
    const message: IMessage = {
      id: this.nextId++,
      type,
      text,
      icon: this.getIcon(),
    };

    const current = this.messagesSubject.value;
    this.messagesSubject.next([message, ...current]);

    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }

  closeMessage(id: number): void {
    const current = this.messagesSubject.value;
    this.messagesSubject.next(current.filter((message) => message.id !== id));
  }

  private getIcon(): string {
    return '/images/messages/icon-message.png';
  }

}
