import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  exact: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  public companyName = 'РУМТИБЕТ';
  public clickCount = 0;
  public currentDate = signal('');
  public showTimer = true;
  public liveText = '';

  public navItems: NavItem[] = [
    { label: 'Главная', path: '/', exact: true },
    { label: 'Пользователи', path: '/users', exact: false },
  ];

  private timerId: ReturnType<typeof setInterval>;

  public constructor() {
    this.updateDate();
    this.timerId = setInterval(() => this.updateDate(), 1000);
  }

  public toggleHeaderInfo(): void { this.showTimer = !this.showTimer; }
  public increase(): void { this.clickCount++; }
  public decrease(): void { if (this.clickCount > 0) this.clickCount--; }

  public ngOnDestroy(): void { clearInterval(this.timerId); }

  private updateDate(): void {
    this.currentDate.set(new Date().toLocaleString('ru-RU'));
  }
}