import { Component } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  template: `
    <h2>Родитель</h2>
    <p>{{ user.name }}, {{ user.age }}</p>
    <button (click)="changeName()">changeName</button>
    <app-child [user]="user"></app-child>
  `
})
export class ParentComponent {

  user = { name: 'Alex', age: 20 };

  changeName(): void {
    this.user.name = 'Eugene';
  }

}

//Почему не обновился: у ребёнка стратегия OnPush, а Angular проверяет такие компоненты только в трёх случаях:
// поменялась ссылка на вход, событие произошло в его собственном шаблоне, или кто-то вызвал markForCheck и detectChanges.
// changeName() правит поле внутри того же объекта, ссылка прежняя, для Angular вход не менялся, ребёнка пропускают целиком.
// Родитель обновляется: у него Default и клик случился в его шаблоне.
// На экране родитель показывает Eugene, ребёнок всё ещё Alex.

//Исправление: присвоить новый объект вместо мутации: this.user = { ...this.user, name: 'Eugene' }.
// Ссылка стала другой, Angular видит смену входа и проверяет ребёнка, оба показывают Eugene.
// Второй способ: в ребёнке взять ChangeDetectorRef и после изменения вызвать markForCheck(),
// тогда его проверят на ближайшем тике даже без новой ссылки.