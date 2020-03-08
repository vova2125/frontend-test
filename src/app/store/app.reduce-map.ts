import { orderReducer } from './reducers/order-list.reducer';
import { ITableConfig } from '../shared/table/table.component';

export const appReduceMap = {
  order: orderReducer,
};

export interface IStoreState {
  order: IOrderState;
}

export interface IOrderState {
  configList;
  configOrder: ITableConfig;
}
