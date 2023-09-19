import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";
import {Sort} from "./filterSlice";

type FetchPizzasArgs = {
  categoryIdURL: string;
  sortTypeURL: string;
  sortByToURL: string;
  searchValueURL: string;
  currentPage: string;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type SearchPizzaParams = {
  categoryIdURL: string;
  sortTypeURL: string;
  sortByToURL: string;
  searchValueURL: string;
  currentPage: string;
}

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasArgs) => {
    const {categoryIdURL, sortTypeURL, sortByToURL, searchValueURL, currentPage} = params
    const {data} = await axios.get<Pizza[]>(`https://64e767c8b0fd9648b78fe8b4.mockapi.io/items?limit=4&page=${currentPage}${categoryIdURL}&sortBy=${sortTypeURL}&order=${sortByToURL}${searchValueURL}`)

    return data as Pizza[]
  }
)

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING
      state.items = []
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR
      state.items = []
    });
  }
})

export const selectPizzaData = (state: RootState) => state.pizza

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer;
