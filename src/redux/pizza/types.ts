export type FetchPizzasArgs = {
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

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}