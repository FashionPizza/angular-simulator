import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DESTINATIONS } from '../../../data/destinations';
import { blogPosts } from '../../../data/blog';
import { moments } from '../../../data/moments';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    { icon: '/images/third-unit-icon-first.svg', title: 'Опытный гид', text: 'Для современного мира базовый вектор развития...' },
    { icon: '/images/third-unit-icon-second.svg', title: 'Безопасный поход', text: 'Для современного мира базовый вектор развития...' },
    { icon: '/images/third-unit-icon-third.svg', title: 'Лояльные цены', text: 'Для современного мира базовый вектор развития...' },
  ];

  public constructor(public messageService: MessageService) {}

  public get isFormValid(): boolean {
    return this.location !== '' && this.date !== '' && this.participants !== '';
  }
}