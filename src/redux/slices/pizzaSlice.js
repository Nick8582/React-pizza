import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const {categoryIdURL, sortTypeURL, sortByToURL, searchValueURL, currentPage} = params
    const {data} = await axios.get(`https://64e767c8b0fd9648b78fe8b4.mockapi.io/items?limit=4&page=${currentPage}${categoryIdURL}&sortBy=${sortTypeURL}&order=${sortByToURL}${searchValueURL}`)

    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Пиццы пустые')
    }

    return thunkAPI.fulfillWithValue(data)
  }
)

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading'
      state.items = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'success'
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error'
      state.items = []
    }
  }
})

export const selectPizzaData = (state) => state.pizza

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer;
