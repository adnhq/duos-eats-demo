import { Cart, CartInfoState, GlobalStoreState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CartInfoState = {
  cart: { userId: 2, items: [], totalPrice: 0, rating: 0 },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: any) {
      // exisiting check
      const existingItem = state.cart.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        state.cart.totalPrice += existingItem.price;
        return;
      }

      state.cart.items.push(action.payload);
      state.cart.totalPrice += action.payload.price;
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;

export const getCart = (state: GlobalStoreState) => state.cart.cart;
