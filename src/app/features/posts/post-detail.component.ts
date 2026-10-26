import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IPost } from './post.interface';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public post = signal<IPost | null>(this.route.snapshot.data['post'] ?? null);

  public goBack(): void {
    this.router.navigate(['/posts']);
  }
}