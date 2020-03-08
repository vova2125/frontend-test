import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IStoreState } from './store/app.reduce-map';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { selectOrderConfig, selectOrderList } from './store/selectors/order.selectors';
import { ITableConfig } from './shared/table/table.component';
import { addNewOrderAction, addNewOrderProperty, deleteExistingOrderAction, deleteOrderProperty } from './store/actions/order.actions';
import { TABLE_MODE } from './shared/table/table-toolbar/table-toolbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  orderConfig: ITableConfig[];
  orderList;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<IStoreState>) {
  }

  ngOnInit(): void {
    this.initListeners();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initListeners(): void {
    this.store
      .pipe(
        select(selectOrderConfig),
        takeUntil(this.destroy$)
      )
      .subscribe((orderConfig: ITableConfig[]) => this.orderConfig = orderConfig);

    this.store
      .pipe(
        select(selectOrderList),
        takeUntil(this.destroy$)
      )
      .subscribe(orderList => this.orderList = orderList);
  }

  deleteOrder(id: number): void {
    this.store.dispatch(deleteExistingOrderAction({ id }));
  }

  deleteOrderProperty(id: string): void {
    this.store.dispatch(deleteOrderProperty({ id }));
  }

  addOrder({ mode, value }): void {
    mode === TABLE_MODE.ROW_MODE
      ? this.store.dispatch(addNewOrderAction({ value }))
      : this.store.dispatch(addNewOrderProperty({ value }));
  }
}
