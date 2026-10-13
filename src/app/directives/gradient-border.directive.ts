import {
  Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2,
} from '@angular/core';

export interface GradientBorderConfiguration {
  delay?: number;
  colors?: string[];
  thickness?: string;
}

const DEFAULTS = {
  delay: 1000,
  colors: ['#F2BE22', '#D4A373', '#B15757'],
  thickness: '2px',
};

const GRADIENT_STYLES = [
  'border',
  'background-image',
  'background-clip',
  'background-origin',
  'background-size',
  'background-position',
  'background-repeat',
  'animation',
] as const;

@Directive({
  selector: '[appGradientBorder]',
  standalone: true,
})
export class GradientBorderDirective implements OnDestroy {
  @Input() public gradientConfiguration: GradientBorderConfiguration = {};

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  public constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    if (this.timeoutId !== null) {
      return;
    }
    const delay = this.gradientConfiguration.delay ?? DEFAULTS.delay;
    this.timeoutId = setTimeout(() => {
      this.timeoutId = null;
      this.applyGradient();
    }, delay);
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this.clearTimer();
    this.removeGradient();
  }

  public ngOnDestroy(): void {
    this.clearTimer();
  }

  private clearTimer(): void {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  private applyGradient(): void {
    const colors = this.gradientConfiguration.colors ?? DEFAULTS.colors;
    const thickness = this.gradientConfiguration.thickness ?? DEFAULTS.thickness;
    const el = this.el.nativeElement;
    const r = this.renderer;
    const inner = this.resolveInnerColor();
    const loop = [...colors, colors[0]].join(', ');

    r.setStyle(el, 'border', `${thickness} solid transparent`);
    r.setStyle(el, 'background-image',
      `linear-gradient(${inner}, ${inner}), linear-gradient(90deg, ${loop})`);
    r.setStyle(el, 'background-clip', 'padding-box, border-box');
    r.setStyle(el, 'background-origin', 'padding-box, border-box');
    r.setStyle(el, 'background-size', '100% 100%, 300% 100%');
    r.setStyle(el, 'background-position', '0 0, 0% 50%');
    r.setStyle(el, 'background-repeat', 'no-repeat, repeat');
    r.setStyle(el, 'animation', 'gradient-border-flow 2s linear infinite');
  }

  private removeGradient(): void {
    for (const prop of GRADIENT_STYLES) {
      this.renderer.removeStyle(this.el.nativeElement, prop);
    }
  }

  private resolveInnerColor(): string {
    let node: HTMLElement | null = this.el.nativeElement;
    while (node) {
      const bg = getComputedStyle(node).backgroundColor;
      if (bg && bg !== 'transparent' && !bg.endsWith(', 0)')) {
        return bg;
      }
      node = node.parentElement;
    }
    return '#FFFFFF';
  }
}