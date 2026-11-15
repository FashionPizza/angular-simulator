import { Component, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemeService } from '../../theme.service';
import { ColorMode } from '../../../enums/ColorMode';
import { ThemePreset } from '../../../enums/ThemePreset';
import { AuthService } from '../../features/auth/auth.service';
import { APP_CONFIG } from '../../app-config';

interface INavItem {
  label: string;
  path: string;
  exact: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    ButtonModule,
    ToggleSwitchModule,
    SelectButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {

  themeService = inject(ThemeService);

  companyName = inject(APP_CONFIG).companyName;
  clickCount = 0;
  currentDate = signal(new Date());
  showTimer = true;
  liveText = '';

  colorMode = ColorMode;

  presetOptions = [
    { label: 'Aura', value: ThemePreset.AURA },
    { label: 'Lara', value: ThemePreset.LARA },
    { label: 'Nora', value: ThemePreset.NORA },
    { label: 'Custom', value: ThemePreset.CUSTOM },
  ];

  navItems: INavItem[] = [
    { label: 'Главная', path: '/', exact: true },
    { label: 'Пользователи', path: '/users', exact: false },
    { label: 'Посты', path: '/posts', exact: false },
  ];

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly user = this.authService.user;
  readonly lastLoginAt = this.authService.lastLoginAt;

  private timerId: ReturnType<typeof setInterval>;

  constructor() {
    this.updateDate();
    this.timerId = setInterval(() => this.updateDate(), 1000);
  }

  toggleHeaderInfo(): void {
    this.showTimer = !this.showTimer;
  }

  increase(): void {
    this.clickCount++;
  }

  decrease(): void {
    if (this.clickCount > 0) this.clickCount--;
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }

  onColorModeChange(isDark: boolean): void {
    this.themeService.setColorMode(isDark ? ColorMode.DARK : ColorMode.LIGHT);
  }

  onPresetChange(preset: ThemePreset): void {
    this.themeService.setPreset(preset);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private updateDate(): void {
    this.currentDate.set(new Date());
  }

}
