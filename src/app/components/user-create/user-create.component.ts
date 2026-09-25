import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../enums/User';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  @Output() public create = new EventEmitter<User>();

  public form: FormGroup;

  private readonly defaultFormValue = {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  };

  public constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.pattern(/^[A-Za-zА-Яа-яЁё\s'-]*$/)]],
      username: ['', [Validators.pattern(/^[A-Za-z0-9_.-]*$/)]],
      email: ['', [Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9+\-.\s()]*$/)]],
      website: ['', [Validators.pattern(/^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/)]],
      address: this.fb.group({
        street: ['', [Validators.pattern(/^[\wА-Яа-яЁё0-9\s.,'-]*$/)]],
        suite: ['', [Validators.pattern(/^[\wА-Яа-яЁё0-9\s.,'-]*$/)]],
        city: ['', [Validators.pattern(/^[A-Za-zА-Яа-яЁё\s'-]*$/)]],
        zipcode: ['', [Validators.pattern(/^[0-9]{4,10}(-[0-9]{3,4})?$/)]],
        geo: this.fb.group({
          lat: ['', [Validators.pattern(/^-?\d{1,3}(\.\d+)?$/)]],
          lng: ['', [Validators.pattern(/^-?\d{1,3}(\.\d+)?$/)]],
        }),
      }),
      company: this.fb.group({
        name: ['', [Validators.pattern(/^[\wА-Яа-яЁё\s'-]*$/)]],
        catchPhrase: ['', [Validators.pattern(/^[\wА-Яа-яЁё\s.,'-]*$/)]],
        bs: ['', [Validators.pattern(/^[\wА-Яа-яЁё\s.,'-]*$/)]],
      }),
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newUser: User = {
      id: Date.now(),
      ...this.form.value,
    };

    this.create.emit(newUser);
    this.form.reset(this.defaultFormValue);
  }
}