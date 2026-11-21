import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <h3>Ребёнок, OnPush</h3>
    <p>{{ user.name }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {

  @Input() user = { name: '', age: 0 };

}