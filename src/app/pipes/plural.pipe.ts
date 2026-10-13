import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
  standalone: true,
})
export class PluralPipe implements PipeTransform {
  public transform(value: number | string, many: string, few: string, one: string): string {
    const count = typeof value === 'number' ? value : parseInt(value, 10);

    if (isNaN(count)) {
      return String(value);
    }

    const mod100 = Math.abs(count) % 100;
    const mod10 = mod100 % 10;

    let word: string;
    if (mod100 >= 11 && mod100 <= 14) {
      word = many;
    } else if (mod10 === 1) {
      word = one;
    } else if (mod10 >= 2 && mod10 <= 4) {
      word = few;
    } else {
      word = many;
    }

    return `${count} ${word}`;
  }
}