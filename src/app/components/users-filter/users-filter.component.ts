import { Component, DestroyRef, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {

  @Output() filterChange = new EventEmitter<string>();

  nameControl = new FormControl('');

  private destroyRef = inject(DestroyRef);

  constructor() {
    this.nameControl.valueChanges
      .pipe(
        debounceTime(200),
        map((value) => (value ?? '').trim().toLowerCase()),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => this.filterChange.emit(value));
  }

}
