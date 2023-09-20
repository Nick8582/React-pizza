import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {getCartFromLS} from "../../utils/getCartFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {CartItem, CartSliceState} from "./types";

const {items, totalPrice} = getCartFromLS()

const initialState: CartSliceState = {
  totalPrice ,
  items,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({...action.payload, count: 1})
      }
      state.totalPrice = calcTotalPrice(state.items )
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if (findItem) {
        findItem.count--
      }
      state.totalPrice = calcTotalPrice(state.items )
    },
    removeItem(state, acton: PayloadAction<string>) {
      state.totalPrice = calcTotalPrice(state.items)
      state.items = state.items.filter((obj) => obj.id !== acton.payload)
      if(state.items.length === 0) {
        state.items = []
        state.totalPrice = calcTotalPrice(state.items )
        state.totalPrice = 0
      }
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = calcTotalPrice(state.items )
      state.totalPrice = 0
    }
  }
})

export const {addItem, clearItems, removeItem, minusItem} = cartSlice.actions
export default cartSlice.reducer;
