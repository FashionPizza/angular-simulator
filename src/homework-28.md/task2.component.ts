import { ChangeDetectionStrategy, Component, DoCheck, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task2',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <h2>Задание 2, стратегия Default</h2>
    <p>count: {{ count }}</p>
    <p>ngDoCheck: {{ checks }}</p>

    <button (click)="byClick()">click</button>
    <button (click)="byTimeout()">setTimeout</button>
    <button (click)="byPromise()">Promise</button>
    <button (click)="byHttp()">HttpClient</button>
    <button (click)="byInterval()">setInterval</button>
    <button (click)="byAll()">комбинированная</button>
  `
})
export class Task2Component implements DoCheck {

  private http = inject(HttpClient);

  count = 0;
  checks = 0;

  ngDoCheck(): void {
    this.checks++;
    // eslint-disable-next-line no-console
    console.log('Change Detection');
  }

  // сценарий 1
  byClick(): void {
    this.count++;
  }

  // сценарий 2
  byTimeout(): void {
    setTimeout(() => this.count++, 0);
  }

  // сценарий 3
  byPromise(): void {
    Promise.resolve().then(() => this.count++);
  }

  // сценарий 4
  byHttp(): void {
    this.http.get('https://dummyjson.com/products/1').subscribe(() => this.count++);
  }

  // сценарий 5
  byInterval(): void {
    setInterval(() => this.count++, 1000);
  }

  // сценарий 6
  byAll(): void {
    setTimeout(() => this.count++, 500);
    Promise.resolve().then(() => this.count++);
    this.http.get('https://dummyjson.com/products/1').subscribe(() => this.count++);
    setInterval(() => this.count++, 1000);
  }

}

// Ответы по сценариям.
//
// Сценарий 1.
// 1. Да, обновился автоматически.
// 2. 1 раз.
// 3. Нет, не понадобился.
// 4. Событие клика: обработчик выполнен в зоне, зона запустила tick.
//
// Сценарий 2.
// 1. Да, после срабатывания таймера.
// 2. 2 раза: от нажатия кнопки и от таймера.
// 3. Нет, не понадобился.
// 4. Zone.js перехватил завершение таймера и запустил tick.
//
// Сценарий 3.
// 1. Да, обновился автоматически.
// 2. 1 раз: промис отрабатывает в том же цикле микрозадач, что и клик.
// 3. Нет, не понадобился.
// 4. Zone.js перехватил микрозадачу промиса.
//
// Сценарий 4.
// 1. Да, когда пришёл ответ.
// 2. 2 раза: от нажатия кнопки и от ответа.
// 3. Нет, не понадобился.
// 4. Zone.js перехватил XHR запрос.
//
// Сценарий 5.
// 1. Да, раз в секунду.
// 2. 1 раз от нажатия кнопки и дальше по 1 разу на каждый тик интервала.
// 3. Нет, не понадобился.
// 4. Zone.js перехватывает каждый вызов колбэка интервала.
//
// Сценарий 6.
// 1. Да, несколько раз.
// 2. 3 раза: клик с промисом, таймер, ответ, и дальше по 1 разу в секунду.
// 3. Нет, не понадобился.
// 4. Zone.js перехватил все запущенные задачи, каждая завершившаяся
// давала свой tick.