import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject(false);
  private state: boolean = false;

  constructor() { }

  getLoading(): Observable<any> {
    return this.loadingSubject.asObservable();
  }

  private refresh() {
    // Emitir los nuevos valores para que todos los que dependan se actualicen.
    this.loadingSubject.next(this.state);
  }

  updateLoading(currentState: boolean) {
    this.state = currentState;
    this.refresh();
  }

  loadDummyData() {
    this.refresh();
  }
}
