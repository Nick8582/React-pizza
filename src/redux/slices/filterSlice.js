import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating'
  },
  sortByTo: false
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSortType(state, acton) {
      state.sort = acton.payload
    },
    setSortByTo(state, action) {
      state.sortByTo = action.payload
    }
  }
})

export const {setCategoryId, setSortType, setSortByTo} = filterSlice.actions

export default filterSlice.reducer;
