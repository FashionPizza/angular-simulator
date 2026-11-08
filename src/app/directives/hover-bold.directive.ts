import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverBold]',
  standalone: true,
})
export class HoverBoldDirective {

  // необязательная настройка: <button appHoverBold> → 'bold' по умолчанию,
  // <button [appHoverBold]="'800'"> → своя жирность при hover
  @Input('appHoverBold') hoverWeight = 'bold';

  // HostBinding вешает inline-стиль на ХОСТ-элемент (кнопку),
  // без обращения к nativeElement.style
  @HostBinding('style.font-weight')
    fontWeight = '';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.fontWeight = this.hoverWeight;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    // пустая строка убирает inline-стиль → возвращается вес из CSS-файла
    this.fontWeight = '';
  }

}
