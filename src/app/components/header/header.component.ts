import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemeService } from '../../theme.service';
import { ColorMode } from '../../../enums/ColorMode';
import { ThemePreset } from '../../../enums/ThemePreset';

interface NavItem {
  label: string;
  path: string;
  exact: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, FontAwesomeModule,
    ToggleSwitchModule, SelectButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  public companyName = 'РУМТИБЕТ';
  public clickCount = 0;
  public currentDate = signal('');
  public showTimer = true;
  public liveText = '';

  public colorMode = ColorMode;

  public presetOptions = [
    { label: 'Aura', value: ThemePreset.Aura },
    { label: 'Lara', value: ThemePreset.Lara },
    { label: 'Nora', value: ThemePreset.Nora },
    { label: 'Custom', value: ThemePreset.Custom },
  ];

  public navItems: NavItem[] = [
    { label: 'Главная', path: '/', exact: true },
    { label: 'Пользователи', path: '/users', exact: false },
  ];

  private timerId: ReturnType<typeof setInterval>;

  public constructor(public themeService: ThemeService) {
    this.updateDate();
    this.timerId = setInterval(() => this.updateDate(), 1000);
  }

  public toggleHeaderInfo(): void { this.showTimer = !this.showTimer; }
  public increase(): void { this.clickCount++; }
  public decrease(): void { if (this.clickCount > 0) this.clickCount--; }
  public ngOnDestroy(): void { clearInterval(this.timerId); }

  public onColorModeChange(isDark: boolean): void {
    this.themeService.setColorMode(isDark ? ColorMode.Dark : ColorMode.Light);
  }

  public onPresetChange(preset: ThemePreset): void {
    this.themeService.setPreset(preset);
  }

  private updateDate(): void {
    this.currentDate.set(new Date().toLocaleString('ru-RU'));
  }
}