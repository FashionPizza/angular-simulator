import { Component } from '@angular/core';
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
  public constructor(public messageService: MessageService) {}

  public getIconByType(type: MessageType): string {
    switch (type) {
      case MessageType.Success:
        return 'circle-check';
      case MessageType.Info:
        return 'circle-info';
      case MessageType.Warn:
        return 'triangle-exclamation';
      case MessageType.Error:
        return 'circle-xmark';
      default:
        return 'circle-info';
    }
  }
}