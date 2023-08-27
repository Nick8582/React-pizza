import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating'
  },
  sortByTo: false,
  currentPage: 1
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
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.sort = action.payload.sort
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
    }
  }
})

export const {setCategoryId, setSortType, setSortByTo, setCurrentPage, setFilters} = filterSlice.actions

export default filterSlice.reducer;
