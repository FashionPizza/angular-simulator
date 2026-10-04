import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DESTINATIONS } from '../../../data/destinations';
import { blogPosts } from '../../../data/blog';
import { moments } from '../../../data/moments';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public location = '';
  public date = '';
  public participants = '';

  public destinations = DESTINATIONS;
  public blogPosts = blogPosts;
  public moments = moments;

  public programs = [
    { icon: 'person-hiking', title: 'Опытный гид', text: 'Для современного мира базовый вектор развития...' },
    { icon: 'shield-halved', title: 'Безопасный поход', text: 'Для современного мира базовый вектор развития...' },
    { icon: 'tags', title: 'Лояльные цены', text: 'Для современного мира базовый вектор развития...' },
  ];

  public constructor(public messageService: MessageService) {}

  public get isFormValid(): boolean {
    return this.location !== '' && this.date !== '' && this.participants !== '';
  }
}