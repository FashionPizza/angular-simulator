import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import './training';
import { Collection } from '../collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  companyName: string = 'РУМТИБЕТ';

  numberCollection = new Collection<number>([
    1,
    2,
    3,
    4
  ]);

  colorCollection = new Collection<Color>([
    Color.Red,
    Color.Green,
    Color.Blue
  ]);

  isMainColor(color: Color): boolean {
    const mainColors = [
      Color.Red,
      Color.Green,
      Color.Blue
    ];

    return mainColors.includes(color);
  };

  constructor() {
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
  };

  saveLastVisitDate(): void {
    const date = new Date();

    localStorage.setItem(
      'lastVisit',
      date.toISOString()
    );
  };

  saveVisitCount(): void {
    const count = Number(localStorage.getItem('visitCount')) || 0;

    localStorage.setItem(
      'visitCount',
      String(count + 1)
    );
  };
}