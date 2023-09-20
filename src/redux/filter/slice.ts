import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilterSliceState, Sort, SortPropertyEnum} from "./types";

const initialState: FilterSliceState = {
  categoryId: 0,
  searchValue: '',
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING
  },
  sortByTo: false,
  currentPage: 1
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setSortType(state, acton: PayloadAction<Sort>) {
      state.sort = acton.payload
    },
    setSortByTo(state, action: PayloadAction<boolean>) {
      state.sortByTo = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort
        state.currentPage = Number(action.payload.currentPage)
        state.categoryId = Number(action.payload.categoryId)
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: 'популярности',
          sortProperty: SortPropertyEnum.RATING
        };
        state.sortByTo = false
      }
    }
  }
})


export const {setCategoryId, setSortType, setSortByTo, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions

export default filterSlice.reducer;