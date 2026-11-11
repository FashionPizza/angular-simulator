import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { socials, services, travelInfo } from '../../../data/information';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  private messageService = inject(MessageService);

  socials = socials;
  services = services;
  travelInfo = travelInfo;
  isSubscribed = false;
  email = '';

  onSubscribe(): void {
    if (this.email && this.email.includes('@')) {
      this.isSubscribed = true; // Прячем блок
      this.messageService.showSuccess('Вы успешно подписались на рассылку!');
    } else {
      this.messageService.showError('Введите корректный e-mail адрес');
    }
  }

}
