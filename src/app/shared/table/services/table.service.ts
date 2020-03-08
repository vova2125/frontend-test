import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TableService {
  private selectedTableRowId$: Subject<number> = new Subject();

  constructor() { }

  setSelectedTableRowId(id: number): void {
    this.selectedTableRowId$.next(id);
  }

  getSelectedTableRowId(): Observable<number> {
    return this.selectedTableRowId$.asObservable();
  }
}
