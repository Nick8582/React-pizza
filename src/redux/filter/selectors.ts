import {RootState} from "../store";


export const selectSort = (state: RootState) => state.filter.sort
export const selectSortByTo = (state: RootState) => state.filter.sortByTo
export const selectFilter = (state: RootState) => state.filter
