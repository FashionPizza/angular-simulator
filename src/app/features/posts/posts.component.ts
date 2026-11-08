import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { IPost } from './post.interface';
import { PostService } from './post.service';
import { PostEditDialogComponent } from './post-edit-dialog.component';

interface IPageChangeEvent {
  first?: number;
  page?: number;
  rows?: number;
}

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, TableModule, ContextMenuModule, SkeletonModule, ButtonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  providers: [DialogService],
})
export class PostsComponent implements OnInit {

  private postService = inject(PostService);
  private router = inject(Router);
  private dialogService = inject(DialogService);

  posts = signal<IPost[]>([]);
  loading = signal(true);
  selectedPost: IPost | null = null;

  first = 0;
  page = 0;
  pageSize = 10;
  totalRecords = 0;
  pageSizes = [10, 20, 50];

  menuItems: MenuItem[] = [
    { label: 'View', icon: 'pi pi-eye', command: () => this.openDetail(this.selectedPost) },
    { label: 'Edit', icon: 'pi pi-pencil', command: () => this.openEdit(this.selectedPost) },
    { label: 'Delete', icon: 'pi pi-trash', command: () => this.deleteSelected() },
  ];

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => this.posts.set(posts));
    this.postService.getTotal().subscribe((total) => (this.totalRecords = total));

    const last = this.postService.getLastQuery();
    if (last.limit > 0) {
      this.pageSize = last.limit;
      this.first = last.skip;
      this.page = Math.floor(last.skip / last.limit);
    }
    this.loadPage();
  }

  loadPage(): void {
    this.loading.set(true);
    this.postService.loadPosts(this.pageSize, this.first).subscribe(() => this.loading.set(false));
  }

  onPageChange(event: IPageChangeEvent): void {
    this.first = event.first ?? 0;
    this.page = event.page ?? 0;
    this.pageSize = event.rows ?? 10;
    this.loadPage();
  }

  onRowDblclick(post: IPost): void {
    this.openDetail(post);
  }

  onContextMenuSelect(post: IPost): void {
    this.selectedPost = post;
  }

  goCreate(): void {
    this.router.navigate(['/posts/create']);
  }

  private openDetail(post: IPost | null): void {
    if (post) {
      this.router.navigate(['/posts', post.id]);
    }
  }

  private openEdit(post: IPost | null): void {
    if (!post) {
      return;
    }

    this.dialogService
      .open(PostEditDialogComponent, {
        header: 'Редактировать пост',
        width: '560px',
        data: post,
      })
      ?.onClose.subscribe((result: IPost | undefined) => {
        if (result) {
          this.postService.updatePost(result).subscribe();
        }
      });
  }

  private deleteSelected(): void {
    if (this.selectedPost) {
      this.postService.deletePost(this.selectedPost.id).subscribe();
    }
  }

}
