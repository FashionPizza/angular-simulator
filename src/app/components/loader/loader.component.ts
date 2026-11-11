import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnInit, OnDestroy {

  loaderService = inject(LoaderService);

  private subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = this.loaderService.isLoading$.subscribe((isLoading) => {
      document.body.classList.toggle('loading-active', isLoading);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
