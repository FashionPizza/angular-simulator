import { Component, OnDestroy, OnInit } from '@angular/core';
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
  private subscription?: Subscription;

  public constructor(public loaderService: LoaderService) {}

  public ngOnInit(): void {
    this.subscription = this.loaderService.isLoading$.subscribe(isLoading => {
      document.body.classList.toggle('loading-active', isLoading);
    });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}