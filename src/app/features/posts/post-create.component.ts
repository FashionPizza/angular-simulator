import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { PostService } from './post.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputNumberModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {
  private fb = inject(FormBuilder);
  private postService = inject(PostService);
  private router = inject(Router);

  public submitting = false;

  public form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    body: ['', [Validators.required, Validators.minLength(10)]],
    tags: [''],
    views: [0, [Validators.required, Validators.min(0)]],
  });

  public onSubmit(): void {
    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }
    const { title, body, tags, views } = this.form.getRawValue();
    const tagList = tags.split(',').map((t) => t.trim()).filter(Boolean);
    this.submitting = true;
    this.postService.addPost({ title, body, tags: tagList, views }).subscribe((created) => {
      this.submitting = false;
      if (created) {
        this.router.navigate(['/posts']);
      }
    });
  }

  public cancel(): void {
    this.router.navigate(['/posts']);
  }
}