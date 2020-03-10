import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStoreState } from './store/app.reduce-map';
import { Observable } from 'rxjs';
import { selectOrderConfig, selectOrderList } from './store/selectors/order.selectors';
import { ITableConfig } from './shared/table/table.component';
import {
  addNewOrderAction,
  addNewOrderProperty,
  deleteExistingOrderAction,
  deleteOrderProperty
} from './store/actions/order.actions';
import { TABLE_MODE } from './shared/table/table-toolbar/table-toolbar.component';
import { IOrder } from './utils/order-mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  orderConfig$: Observable<ITableConfig[]> = this.store.select(selectOrderConfig);
  orderList$: Observable<IOrder[]> = this.store.select(selectOrderList);

  constructor(private store: Store<IStoreState>) {
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
