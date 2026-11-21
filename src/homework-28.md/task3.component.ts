import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject } from '@angular/core';

@Component({
  selector: 'app-task3',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Задание 3, OnPush и ChangeDetectorRef</h2>
    <p>count: {{ count }}</p>
    <p>ngDoCheck: {{ checks }}</p>

    <p>Изменение count:</p>
    <button (click)="incrementClick()">click</button>
    <button (click)="incrementTimeout()">setTimeout</button>
    <button (click)="incrementInterval()">setInterval</button>
    <button (click)="incrementPromise()">Promise</button>

    <p>ChangeDetectorRef:</p>
    <button (click)="markForCheck()">markForCheck</button>
    <button (click)="detectChanges()">detectChanges</button>
    <button (click)="detach()">detach</button>
    <button (click)="reattach()">reattach</button>
  `
})
export class Task3Component implements DoCheck {

  count = 0;
  checks = 0;

  private cdr = inject(ChangeDetectorRef);

  ngDoCheck(): void {
    this.checks++;
    // eslint-disable-next-line no-console
    console.log('Change Detection');
  }

  // способы изменения count из задания
  incrementClick(): void {
    this.count++;
  }

  incrementTimeout(): void {
    setTimeout(() => this.count++, 0);
  }

  incrementInterval(): void {
    setInterval(() => this.count++, 1000);
  }

  incrementPromise(): void {
    Promise.resolve().then(() => this.count++);
  }

  // часть 1: помечает компонент на проверку при следующем тике
  markForCheck(): void {
    this.cdr.markForCheck();
  }

  // часть 2: проверяет компонент сразу и синхронно
  detectChanges(): void {
    this.cdr.detectChanges();
  }

  // часть 3: отключает компонент от проверок
  detach(): void {
    this.cdr.detach();
  }

  // часть 4: возвращает компонент под контроль проверок
  reattach(): void {
    this.cdr.reattach();
  }

}

// Ответы.
//
// Часть 1, markForCheck:
// 1. Компонент и его предки до корня помечены как «грязные»,
// сама проверка при вызове не запускалась.
// 2. Нет, сразу не обновился: markForCheck ничего не проверяет,
// только ставит пометку.
// 3. На ближайшем тике, который запустил Zone.js после завершения setTimeout.
// 4. Стратегия OnPush: ссылка на вход не менялась, событий в шаблоне
// компонента не было, Angular считал его чистым и пропускал при проверке.
//
// Часть 2, detectChanges:
// 1. Обновление происходит в момент вызова, а не на следующем тике.
// 2. Да, выполняется немедленно и синхронно.
// 3. Этот компонент и его дочерние компоненты, остальное дерево не трогается.
// 4. Когда нужен мгновенный DOM-апдейт: колбэки сторонних библиотек,
// перед измерением DOM, код вне зоны, частые события вроде scroll.
//
// Часть 3, detach:
// 1. Интерфейс не обновляется, экран замирает на последнем значении.
// 2. ngDoCheck не выполняется, отключённый компонент пропускается целиком,
// console.log молчит.
// 3. detach отключает вид от дерева проверок. Общий тик обходит только
// подключённые виды, отключённый пропускается, что бы внутри ни происходило.
// 4. Все четыре способа перестают обновлять экран: click, setTimeout,
// setInterval и Promise меняют count в модели, но до экрана это не доходит.
// Обновить экран в этом состоянии может только принудительный detectChanges().
//
// Часть 4, reattach:
// 1. Компонент снова проверяется на каждом тике: клик, таймеры и промис
// опять обновляют экран, ngDoCheck снова срабатывает, а count, накопившийся
// за время отключения, догоняется одним скачком.
// 2. Сразу после вызова reattach(), на ближайшем тике: он сам помечает
// компонент для проверки, поэтому уже следующее изменение видно на экране.
// 3. Нет, не нужно. reattach сам вызывает markForCheck внутри,
// дополнительно вызывать ничего не требуется. detectChanges понадобился бы
// только для мгновенного обновления без ожидания тика.