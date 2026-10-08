import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../enums/User';
import { PhonePipe } from '../../pipes/phone.pipe';
import { HoverBoldDirective } from '../../directives/hover-bold.directive';
import { GradientBorderDirective } from '../../directives/gradient-border.directive';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, PhonePipe, HoverBoldDirective, GradientBorderDirective ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({ required: true }) public user!: User;

  @Output() public delete = new EventEmitter<User>();

  public onDeleteClick(): void {
    this.delete.emit(this.user);
  }
}