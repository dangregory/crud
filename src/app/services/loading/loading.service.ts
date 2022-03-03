import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loading$: Subject<boolean> = new Subject();

  public start() {
    this.loading$.next(true);
  }

  public stop() {
    this.loading$.next(false);
  }
}
