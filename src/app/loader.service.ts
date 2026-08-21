import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  public showLoader(): void {
    this.isLoadingSubject.next(true);
  }

  public hideLoader(): void {
    this.isLoadingSubject.next(false);
  }
}