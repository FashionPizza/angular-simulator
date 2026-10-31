import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from '../../../message.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  public readonly submitting = signal(false);

  public readonly form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  public onSubmit(): void {
    if (this.form.invalid || this.submitting()) {
      return;
    }

    this.submitting.set(true);

    this.authService
      .login(this.form.getRawValue())
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          this.messageService.showSuccess('Вы вошли в систему');
          this.router.navigate(['/']);
        },
        error: () => {
          this.messageService.showError('Неверное имя пользователя или пароль');
        },
      });
  }
}