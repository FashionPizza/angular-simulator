import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverBold]',
  standalone: true,
})
export class HoverBoldDirective {
  // необязательная настройка: <button appHoverBold> → 'bold' по умолчанию,
  // <button [appHoverBold]="'800'"> → своя жирность при hover
  @Input('appHoverBold') hoverWeight: string = 'bold';

  // HostBinding вешает inline-стиль на ХОСТ-элемент (кнопку),
  // без обращения к nativeElement.style
  @HostBinding('style.font-weight')
  public fontWeight: string = '';

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    this.fontWeight = this.hoverWeight;
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    // пустая строка убирает inline-стиль → возвращается вес из CSS-файла
    this.fontWeight = '';
  }
}