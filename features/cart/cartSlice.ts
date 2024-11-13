"use client";
import { priceWithDiscount } from "@/lib/helper";
import { CartInfoState, GlobalStoreState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CartInfoState = {
  cart: {
    items: [],
    totalPrice: 0,
    totalPriceAfterDiscount: 0,
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
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        state.cart.totalPrice += action.payload.quantity * existingItem.price;
        state.cart.totalPriceAfterDiscount = priceWithDiscount(
          state.cart.totalPrice,
          state.cart.discount
        );
        return;
      }

      state.cart.items.push(action.payload);
      state.cart.totalPrice += action.payload.quantity * action.payload.price;

      state.cart.restaurantId = action.payload.restaurantId;
      state.cart.discount = action.payload.discount;

      state.cart.totalPriceAfterDiscount = priceWithDiscount(
        state.cart.totalPrice,
        state.cart.discount
      );
    },

    increaseItemQuantity(state, action) {
      const existingItem = state.cart.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        existingItem.quantity += 1;
        state.cart.totalPrice += existingItem.price;
        state.cart.totalPriceAfterDiscount = priceWithDiscount(
          state.cart.totalPrice,
          state.cart.discount
        );
      }
    },

    decreaseItemQuantity(state, action) {
      const existingItem = state.cart.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem && existingItem.quantity === 1) {
        state.cart.totalPrice -= existingItem.price;
        state.cart.totalPriceAfterDiscount = priceWithDiscount(
          state.cart.totalPrice,
          state.cart.discount
        );
        state.cart.items = state.cart.items.filter(
          (item) => item.id !== existingItem.id
        );
        state.cart.restaurantId = null;
        state.cart.discount = 0;
        return;
      }

      if (existingItem) {
        existingItem.quantity -= 1;
        state.cart.totalPrice -= existingItem.price;
        state.cart.totalPriceAfterDiscount = priceWithDiscount(
          state.cart.totalPrice,
          state.cart.discount
        );
      }
    },

    deleteItem(state, action) {
      const existingItem = state.cart.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        state.cart.totalPrice -= existingItem.quantity * existingItem.price;
        state.cart.totalPriceAfterDiscount = priceWithDiscount(
          state.cart.totalPrice,
          state.cart.discount
        );
        state.cart.items = state.cart.items.filter(
          (item) => item.id !== action.payload
        );

        if (state.cart.items.length === 0) {
          state.cart.restaurantId = null;
          state.cart.discount = 0;
        }
      }
    },

    clearCart(state) {
      state.cart.items = [];
      state.cart.totalPrice = 0;
      state.cart.totalPriceAfterDiscount = priceWithDiscount(
        state.cart.totalPrice,
        state.cart.discount
      );
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

export const getTotalCartPrice = (state: GlobalStoreState) =>
  state.cart.cart.totalPrice;

export const getTotalCartPriceAfterDiscount = (state: GlobalStoreState) =>
  state.cart.cart.totalPriceAfterDiscount;

export const getItemQuantityById = (id: number) => {
  return (state: GlobalStoreState) =>
    state.cart.cart.items.find((item) => item.id === id);
};

export const prevResturantId = (state: GlobalStoreState) =>
  state.cart.cart.restaurantId;

export const currentDiscount = (state: GlobalStoreState) =>
  state.cart.cart.discount;
