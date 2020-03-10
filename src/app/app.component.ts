import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStoreState } from './store/app.reduce-map';
import { Observable } from 'rxjs';
import { selectOrderConfig, selectOrderList } from './store/selectors/order.selectors';
import { ADDITIONAL_TABLE_INFO, ITableConfig } from './shared/table/table.component';
import {
  addNewOrderAction,
  addNewOrderProperty,
  deleteExistingOrderAction,
  deleteOrderProperty
} from './store/actions/order.actions';
import { TABLE_MODE } from './shared/table/table-toolbar/table-toolbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  orderConfig$: Observable<ITableConfig[]> = this.store.select(selectOrderConfig);
  orderList$: Observable<any> = this.store.select(selectOrderList);
  readonly tableAdditionalInfoStatus = ADDITIONAL_TABLE_INFO;

  constructor(private store: Store<IStoreState>) {
  }

  ngOnInit(): void {
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
