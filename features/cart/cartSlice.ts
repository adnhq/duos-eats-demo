"use client";

import { CartInfoState, GlobalStoreState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CartInfoState = {
  cart: {
    items: [],
    rating: 0,
    discount: 0,
    restaurantId: null,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // exisiting check

      const existingItem = state.cart.items.find(
        (item) => item.identifier === action.payload.identifier
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;

        return;
      }

      state.cart.items.push(action.payload);

      state.cart.restaurantId = action.payload.restaurantId;
      state.cart.discount = action.payload.discount;
    },

    increaseItemQuantity(state, action) {
      const existingItem = state.cart.items.find(
        (item) => item.identifier === action.payload
      );

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },

    decreaseItemQuantity(state, action) {
      const existingItem = state.cart.items.find(
        (item) => item.identifier === action.payload
      );

      if (existingItem && existingItem.quantity === 1) {
        state.cart.items = state.cart.items.filter(
          (item) => item.identifier !== existingItem.identifier
        );

        if (state.cart.items.length === 0) {
          state.cart.restaurantId = null;
          state.cart.discount = 0;
        }
        return;
      }

      if (existingItem) {
        existingItem.quantity -= 1;
      }
    },

    deleteItem(state, action) {
      const existingItem = state.cart.items.find(
        (item) => item.identifier === action.payload
      );

      if (existingItem) {
        state.cart.items = state.cart.items.filter(
          (item) => item.identifier !== action.payload
        );

        if (state.cart.items.length === 0) {
          state.cart.restaurantId = null;
          state.cart.discount = 0;
        }
      }
    },

    clearCart(state) {
      state.cart.items = [];

      state.cart.restaurantId = null;
      state.cart.discount = 0;
    },
  },
});

export const {
  addItem,
  deleteItem,
  clearCart,
  decreaseItemQuantity,
  increaseItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getCart = (state: GlobalStoreState) => state.cart.cart;

export const getTotalCartQuantity = (state: GlobalStoreState) =>
  state.cart.cart.items.reduce((acc, item) => acc + item.quantity, 0);

export const getTotalCartActualPrice = (state: GlobalStoreState) =>
  state.cart.cart.items.reduce(
    (acc, item) => acc + item.actualPrice * item.quantity,
    0
  );

export const getTotalCartPriceAfterDiscount = (state: GlobalStoreState) =>
  state.cart.cart.items.reduce(
    (acc, item) => acc + item.priceAfterDiscount * item.quantity,
    0
  );

export const prevResturantId = (state: GlobalStoreState) =>
  state.cart.cart.restaurantId;

export const currentDiscount = (state: GlobalStoreState) =>
  state.cart.cart.discount;
