"use client";
import { Cart, CartInfoState, GlobalStoreState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CartInfoState = {
  cart: { userId: null, items: [], totalPrice: 0, rating: 0 },
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
        existingItem.quantity += 1;
        state.cart.totalPrice += existingItem.quantity * existingItem.price;
        return;
      }

      state.cart.items.push(action.payload);
      state.cart.totalPrice += action.payload.quantity * action.payload.price;
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

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.cart.totalPrice -= existingItem.price;
      }

      if (existingItem && existingItem.quantity === 1) {
        state.cart.totalPrice -= existingItem.price;
        state.cart.items = state.cart.items.filter(
          (item) => item.id !== existingItem.id
        );
      }
    },

    deleteItem(state, action) {
      const existingItem = state.cart.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        state.cart.totalPrice -= existingItem.quantity * existingItem.price;
      }

      state.cart.items = state.cart.items.filter(
        (item) => item.id !== action.payload
      );
    },

    clearCart(state) {
      state.cart.items = [];
      state.cart.totalPrice = 0;
    },

    setCartUserId(state, action) {
      state.cart.userId = action.payload;
    },
  },
});

export const {
  addItem,
  deleteItem,
  clearCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  setCartUserId,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getCart = (state: GlobalStoreState) => state.cart.cart;

export const getTotalCartPrice = (state: GlobalStoreState) =>
  state.cart.cart.totalPrice;

export const getItemQuantityById = (id: number) => {
  return (state: GlobalStoreState) =>
    state.cart.cart.items.find((item) => item.id === id);
};
