import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageService } from '../../message.service';
import { MessageType } from '../../../enums/MessageType';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messageService = inject(MessageService);

  getIconByType(type: MessageType): string {
    switch (type) {
    case MessageType.SUCCESS:
      return 'circle-check';
    case MessageType.INFO:
      return 'circle-info';
    case MessageType.WARN:
      return 'triangle-exclamation';
    case MessageType.ERROR:
      return 'circle-xmark';
    default:
      return 'circle-info';
    }
  }

}
