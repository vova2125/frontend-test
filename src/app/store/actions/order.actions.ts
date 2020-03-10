import { createAction, props } from '@ngrx/store';
import { IOrder } from '../../utils/order-mock';

export enum ORDER_ACTIONS {
  ADD_NEW_ORDER = '[ORDER] Add new Order Item',
  ADD_NEW_ORDER_PROPERTY = '[ORDER] Add new Order Property',
  DELETE_EXISTING_ORDER = '[ORDER] Delete Existing Order',
  DELETE_EXISTING_PROPERTY = '[ORDER] Delete Existing Order Property'
}

export const addNewOrderAction = createAction(ORDER_ACTIONS.ADD_NEW_ORDER,
  props<{ value: IOrder }>());

export const deleteExistingOrderAction = createAction(ORDER_ACTIONS.DELETE_EXISTING_ORDER,
  props<{ id: number }>());

export const addNewOrderProperty = createAction(ORDER_ACTIONS.ADD_NEW_ORDER_PROPERTY,
  props<{ value }>());

export const deleteOrderProperty = createAction(ORDER_ACTIONS.DELETE_EXISTING_PROPERTY,
  props<{ id: string }>());
