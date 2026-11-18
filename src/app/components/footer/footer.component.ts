import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { socials, services, travelInfo } from '../../../data/information';
import { MessageService } from '../../message.service';
import { APP_CONFIG } from '../../app-config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  private messageService = inject(MessageService);

  companyName = inject(APP_CONFIG).companyName;

  socials = socials;
  services = services;
  travelInfo = travelInfo;
  isSubscribed = false;
  email = '';

  onSubscribe(): void {
    if (this.email && this.email.includes('@')) {
      this.isSubscribed = true;
      this.messageService.showSuccess('Вы успешно подписались на рассылку!');
    } else {
      this.messageService.showError('Введите корректный e-mail адрес');
    }
  }

}
