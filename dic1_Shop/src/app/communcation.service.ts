import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private headerUpdateSource = new Subject<void>();
  headerUpdate$ = this.headerUpdateSource.asObservable();

  constructor() {}

  updateHeader() {
    this.headerUpdateSource.next();
  }
}
