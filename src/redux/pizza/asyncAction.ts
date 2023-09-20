import {createAsyncThunk} from "@reduxjs/toolkit";
import {FetchPizzasArgs, Pizza} from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasArgs) => {
    const {categoryIdURL, sortTypeURL, sortByToURL, searchValueURL, currentPage} = params
    const {data} = await axios.get<Pizza[]>(`https://64e767c8b0fd9648b78fe8b4.mockapi.io/items?limit=4&page=${currentPage}${categoryIdURL}&sortBy=${sortTypeURL}&order=${sortByToURL}${searchValueURL}`)

    return data as Pizza[]
  }
)
