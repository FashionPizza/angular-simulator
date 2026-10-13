import { Pipe, PipeTransform } from '@angular/core';

export type PhoneFormat = 'compact' | 'international' | 'national' | 'masked';

@Pipe({
  name: 'phone',
  standalone: true,
})

export class PhonePipe implements PipeTransform {
  private readonly groups = [3, 3, 2, 2];

  public transform(value: string | number, mode: PhoneFormat = 'international'): string {
    const digits = this.extractDigits(value);

    if (!digits) {
      return String(value);
    }
    const { countryCode, local } = this.splitNumber(digits);

    switch (mode) {
      case 'compact':
        return this.toCompact(countryCode, local);
      case 'national':
        return this.groupDigits(local);
      case 'masked':
        return this.toMasked(countryCode, local);
      case 'international':
      default:
        return this.toInternational(countryCode, local);
    }
  }

  private extractDigits(value: string | number): string {
    const withoutExtension = String(value).split(/x/i)[0];
    return withoutExtension.replace(/\D/g, '');
  }

  private splitNumber(digits: string): { countryCode: string; local: string } {
    if (digits.length === 12 && digits.startsWith('38')) {
      return { countryCode: digits.slice(0, 2), local: digits.slice(2) };
    }

    if (digits.length === 11 && digits.startsWith('1')) {
      return { countryCode: digits.slice(0, 1), local: digits.slice(1) };
    }

    if (digits.length === 10) {
      return { countryCode: '', local: digits };
    }
    return { countryCode: '', local: digits };
  }

  private groupDigits(local: string): string {
    const parts: string[] = [];
    let index = 0;

    for (const size of this.groups) {
      if (index >= local.length) {
        break;
      }
      parts.push(local.slice(index, index + size));
      index += size;
    }

    if (index < local.length) {
      parts.push(local.slice(index));
    }
    return parts.join(' ');
  }

  private toInternational(countryCode: string, local: string): string {
    const body = this.groupDigits(local);
    return countryCode ? `+${countryCode} ${body}` : body;
  }

  private toCompact(countryCode: string, local: string): string {
    return countryCode ? `+${countryCode}${local}` : local;
  }

  private toMasked(countryCode: string, local: string): string {
    const parts = this.groupDigits(local).split(' ');

    const masked = parts.map((part, index) =>
      index === 0 || index === parts.length - 1 ? part : '*'.repeat(part.length)
    );

    const body = masked.join(' ');
    return countryCode ? `+${countryCode} ${body}` : body;
  }
}