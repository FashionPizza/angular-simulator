import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MessageComponent } from './components/message/message.component';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  public isLoading = signal(true);

  public constructor(
    public localStorageService: LocalStorageService,
  ) {
    this.saveLastVisitDate();
    this.saveVisitCount();
    setTimeout(() => this.isLoading.set(false), 2000);
  }

  private saveLastVisitDate(): void {
    this.localStorageService.set('lastVisit', new Date().toISOString());
  }

  private saveVisitCount(): void {
    const count = this.localStorageService.get<number>('visitCount') || 0;
    this.localStorageService.set('visitCount', count + 1);
  }
}