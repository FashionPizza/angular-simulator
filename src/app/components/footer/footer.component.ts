import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { socials, services, travelInfo } from '../../../data/information';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public socials = socials;
  public services = services;
  public travelInfo = travelInfo;
  public isSubscribed = false;
  public email = '';
  public constructor(private messageService: MessageService) {}

  public onSubscribe(): void {
    if (this.email && this.email.includes('@')) {
      this.isSubscribed = true; // Прячем блок
      this.messageService.showSuccess('Вы успешно подписались на рассылку!');
    } else {
      this.messageService.showError('Введите корректный e-mail адрес');
    }
  }
}