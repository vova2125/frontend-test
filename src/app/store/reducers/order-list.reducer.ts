import { Action, createReducer, on } from '@ngrx/store';
import { addNewOrderAction, addNewOrderProperty, deleteExistingOrderAction, deleteOrderProperty } from '../actions/order.actions';
import { ORDER_CONFIG, ORDER_LIST } from '../../utils/order-mock';

const initialState = {
  orderList: ORDER_LIST,
  orderConfig: ORDER_CONFIG,
};

const orderReducerImplicit = createReducer(
  initialState,
  on(addNewOrderAction, (state, { value }) => {
      return {
        ...state,
        orderList: [
          ...state.orderList, {
            ...value,
            id: Math.max(...state.orderList.map(orderItem => orderItem.id)) + 1
          }
        ]
      };
    }
  ),
  on(deleteExistingOrderAction, (state, { id }) => {
    return ({
      ...state,
      orderList: handleDeleteItem(state.orderList, id),
    });
  }),
  on(addNewOrderProperty, (state, { value }) => {
    return {
      ...state,
      orderConfig: [
        ...state.orderConfig,
        {
          ...value,
          id: value.field,
        }
      ],
    };
  }),
  on(deleteOrderProperty, (state, { id }) => {
    return {
      ...state,
      orderConfig: handleDeleteItem(state.orderConfig, id)
    };
  })
);

export const handleDeleteItem = (list, id) => {
  return list.filter(listItem => {
    return listItem.id !== id;
  });
};

export function orderReducer(state, action: Action) {
  return orderReducerImplicit(state, action);
}
