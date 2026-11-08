import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PrimeNG } from 'primeng/config';
import { LocalStorageService } from './local-storage.service';
import { ColorMode } from '../enums/ColorMode';
import { ThemePreset } from '../enums/ThemePreset';
import { THEME_PRESETS } from './theme-presets';

const COLOR_MODE_STORAGE_KEY = 'colorMode';
const PRESET_STORAGE_KEY = 'themePreset';

const DEFAULT_COLOR_MODE = ColorMode.LIGHT;
const DEFAULT_PRESET = ThemePreset.AURA;

const DARK_MODE_CLASS = 'app-dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private localStorageService = inject(LocalStorageService);
  private primeng = inject(PrimeNG);

  private colorModeSubject = new BehaviorSubject<ColorMode>(
    this.localStorageService.get<ColorMode>(COLOR_MODE_STORAGE_KEY) ?? DEFAULT_COLOR_MODE,
  );

  private presetSubject = new BehaviorSubject<ThemePreset>(
    this.localStorageService.get<ThemePreset>(PRESET_STORAGE_KEY) ?? DEFAULT_PRESET,
  );

  colorMode$: Observable<ColorMode> = this.colorModeSubject.asObservable();
  preset$: Observable<ThemePreset> = this.presetSubject.asObservable();

  constructor() {
    this.applyColorMode(this.colorModeSubject.value);
    this.applyPreset(this.presetSubject.value);
  }

  get colorMode(): ColorMode {
    return this.colorModeSubject.value;
  }

  get preset(): ThemePreset {
    return this.presetSubject.value;
  }

  setColorMode(colorMode: ColorMode): void {
    this.colorModeSubject.next(colorMode);
    this.localStorageService.set(COLOR_MODE_STORAGE_KEY, colorMode);
    this.applyColorMode(colorMode);
  }

  toggleColorMode(): void {
    this.setColorMode(this.colorMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT);
  }

  setPreset(preset: ThemePreset): void {
    this.presetSubject.next(preset);
    this.localStorageService.set(PRESET_STORAGE_KEY, preset);
    this.applyPreset(preset);
  }

  private applyColorMode(colorMode: ColorMode): void {
    document.documentElement.classList.toggle(DARK_MODE_CLASS, colorMode === ColorMode.DARK);
  }

  private applyPreset(preset: ThemePreset): void {
    const presetObject = THEME_PRESETS[preset];
    if (!presetObject) {
      return;
    }
    this.primeng.theme.set({
      ...this.primeng.theme(),
      preset: presetObject,
    });
  }

}
