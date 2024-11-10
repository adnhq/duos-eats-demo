"use client";
import { Cart, CartInfoState, GlobalStoreState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CartInfoState = {
  cart: {
    items: [],
    totalPrice: 0,
    rating: 0,
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
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        state.cart.totalPrice += action.payload.quantity * existingItem.price;
        return;
      }

      state.cart.items.push(action.payload);
      state.cart.totalPrice += action.payload.quantity * action.payload.price;
      state.cart.restaurantId = action.payload.restaurantId;
    },

    increaseItemQuantity(state, action) {
      const existingItem = state.cart.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        existingItem.quantity += 1;
        state.cart.totalPrice += existingItem.price;
      }
    },

    decreaseItemQuantity(state, action) {
      const existingItem = state.cart.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem && existingItem.quantity === 1) {
        state.cart.totalPrice -= existingItem.price;
        state.cart.items = state.cart.items.filter(
          (item) => item.id !== existingItem.id
        );
        state.cart.restaurantId = null;
        return;
      }

      if (existingItem) {
        existingItem.quantity -= 1;
        state.cart.totalPrice -= existingItem.price;
      }
    },

    deleteItem(state, action) {
      const existingItem = state.cart.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        state.cart.totalPrice -= existingItem.quantity * existingItem.price;
        state.cart.items = state.cart.items.filter(
          (item) => item.id !== action.payload
        );

        if (state.cart.items.length === 0) {
          state.cart.restaurantId = null;
        }
      }
    },

    clearCart(state) {
      state.cart.items = [];
      state.cart.totalPrice = 0;
      state.cart.restaurantId = null;
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

export const getTotalCartPrice = (state: GlobalStoreState) =>
  state.cart.cart.totalPrice;

export const getItemQuantityById = (id: number) => {
  return (state: GlobalStoreState) =>
    state.cart.cart.items.find((item) => item.id === id);
};

export const prevResturantId = (state: GlobalStoreState) =>
  state.cart.cart.restaurantId;
