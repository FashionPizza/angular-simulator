import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MessageComponent } from './components/message/message.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LocalStorageService } from './local-storage.service';
import { ThemeService } from './theme.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, MessageComponent,
    LoaderComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  public isLoading = signal(true);

  public constructor(
    public localStorageService: LocalStorageService,
    private iconLibrary: FaIconLibrary,
    private themeService: ThemeService,
  ) {
    this.iconLibrary.addIconPacks(fas, far, fab);
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