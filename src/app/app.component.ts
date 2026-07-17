import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Color } from '../enums/Color';
import './training';
import { Collection } from '../collection';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnDestroy {
  
  public companyName: string = 'РУМТИБЕТ';
  public location = '';
  public date = '';
  public participants = '';
  public clickCount = 0;
  public currentDate: string = '';
  public showTimer = true;
  public liveText: string = '';
  public isLoading = true;

  public programs = [
    {
      icon: '/images/third-unit-icon-first.svg',
      title: 'Опытный гид',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      icon: '/images/third-unit-icon-second.svg',
      title: 'Безопасный поход',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      icon: '/images/third-unit-icon-third.svg',
      title: 'Лояльные цены',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    }
  ];

  public numberCollection = new Collection<number>([
    1,
    2,
    3,
    4
  ]);

  public colorCollection = new Collection<Color>([
    Color.Red,
    Color.Green,
    Color.Blue
  ]);

  private timerId!: ReturnType<typeof setInterval>;

  public constructor() {
    this.updateDate();
    this.timerId = setInterval(() => {
      this.updateDate();
    }, 1000);

    // сохраняем дату последнего захода на страницу
    this.saveLastVisitDate();

    // увеличиваем и сохраняем количество заходов на страницу
    this.saveVisitCount();

    // получить все элементы коллекции
    // console.log(this.numberCollection.getAll());

    // получить элемент коллекции по индексу
    // console.log(this.numberCollection.getItem(1));

    // заменить элемент коллекции по индексу
    // this.numberCollection.updateItem(0, 99);

    // удалить элемент коллекции по индексу
    // this.numberCollection.removeItem(2);

    // очистить всю коллекцию
    // this.numberCollection.clear();

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  };

  public get isFormValid(): boolean {
    return this.location !== '' &&
          this.date !== '' &&
          this.participants !== '';
  };

  public isMainColor(color: Color): boolean {
    const mainColors = [
      Color.Red,
      Color.Green,
      Color.Blue
    ];
    return mainColors.includes(color);
  };
  
  public toggleHeaderInfo(): void {
    this.showTimer = !this.showTimer;
  };

  public increase(): void {
    this.clickCount++;
  };

  public decrease(): void {
    if (this.clickCount > 0) {
      this.clickCount--;
    }
  };

  public ngOnDestroy(): void {
    clearInterval(this.timerId);
  };

  private updateDate(): void {
    const date = new Date();
    this.currentDate = date.toLocaleString('ru-RU');
  };

  private saveLastVisitDate(): void {
    const date = new Date();

    localStorage.setItem(
      'lastVisit',
      date.toISOString()
    );
  };

  private saveVisitCount(): void {
    const count = Number(localStorage.getItem('visitCount')) || 0;

    localStorage.setItem(
      'visitCount',
      String(count + 1)
    );
  };
};