import { createReducer } from 'redux-act';

import { orderActions } from '../actions';

const initialState = {
  orders: [],
  currentOrder: {
    products: []
  }
};

export default createReducer(
  {
    [orderActions.getOrdersSuccess]: (state, payload) => ({
      ...state,
      orders: payload.length ? [...payload] : []
    }),
    [orderActions.postOrderSuccess]: (state, payload) => ({
      ...state,
      orders: state.orders.concat(payload),
      currentOrder: {
        products: []
      }
    }),
    [orderActions.addToCart]: (state, payload) => {
      const index = state.currentOrder.products.findIndex(
        item => item.productId === payload.productId
      );
      if (index !== -1) {
        return {
          ...state,
          currentOrder: {
            ...state.currentOrder,
            products: state.currentOrder.products.map(item => {
              if (item.productId !== payload.productId) return item;
              return { ...item, quantity: (item.quantity += 1) };
            })
          }
        };
      }
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          products: state.currentOrder.products.concat(payload)
        }
      };
    }
  },
  initialState
);
