import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { IPost } from './post.interface';

@Component({
  selector: 'app-post-edit-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputNumberModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSave()" class="post-edit">
      <div class="post-edit__field">
        <label class="post-edit__label" for="post-edit-title">Заголовок</label>
        <input id="post-edit-title" name="post-edit-title" class="post-edit__input" type="text" formControlName="title" />
        @if (form.get('title')?.invalid && form.get('title')?.touched) {
          <span class="post-edit__error">Минимум 5 символов</span>
        }
      </div>

      <div class="post-edit__field">
        <label class="post-edit__label" for="post-edit-tags">Теги (через запятую)</label>
        <input id="post-edit-tags" name="post-edit-tags" class="post-edit__input" type="text" formControlName="tags" />
      </div>

      <div class="post-edit__field">
        <label class="post-edit__label" for="post-edit-views">Просмотры</label>
        <p-inputnumber inputId="post-edit-views" formControlName="views" [min]="0" />
      </div>

      <div class="post-edit__actions">
        <p-button label="Отмена" severity="secondary" (onClick)="ref.close()" />
        <p-button label="Сохранить" icon="pi pi-check" (onClick)="onSave()" />
      </div>
    </form>
  `,
  styles: `
    .post-edit { display: flex; flex-direction: column; gap: 14px; }
    .post-edit__field { display: flex; flex-direction: column; gap: 4px; }
    .post-edit__label { font-weight: 700; font-size: 14px; color: #667C7C; }
    .post-edit__input {
      box-sizing: border-box; padding: 10px 12px;
      border: 1px solid #E2E8F0; border-radius: 4px;
      font-size: 14px; color: #1D3939;
    }
    .post-edit__input:focus { outline: none; border-color: #D4A373; }
    .post-edit__error { font-size: 12px; color: #B15757; }
    .post-edit__actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px; }
  `,
})
export class PostEditDialogComponent {
  public ref = inject(DynamicDialogRef);
  private post: IPost = inject(DynamicDialogConfig).data as IPost;

  private fb = inject(FormBuilder);

  public form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    tags: [''],
    views: [0, [Validators.required, Validators.min(0)]],
  });

  public constructor() {
    this.form.patchValue({
      title: this.post.title,
      tags: this.post.tags.join(', '),
      views: this.post.views,
    });
  }

  public onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, tags, views } = this.form.getRawValue();

    this.ref.close({
      ...this.post,
      title,
      views,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
  }
}