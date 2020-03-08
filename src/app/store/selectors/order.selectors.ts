import { createSelector } from '@ngrx/store';

export const selectOrder = (state) => state.order;

export const selectOrderList = createSelector(
  selectOrder,
  ({ orderList }) => orderList
);

export const selectOrderConfig = createSelector(
  selectOrder,
  ({ orderConfig }) => orderConfig
);
