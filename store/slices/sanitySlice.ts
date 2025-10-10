import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Bank,
  Blog,
  Card,
  Category,
  Dolar,
  Franchise,
  Profitability,
} from "@/lib/interface";

export interface SanityState {
  blogs: Blog[];
  categories: Category[];
  dolar: Dolar | null;
  profitability: Profitability | null;
  banks: Bank[] | null;
  franchieses: Franchise[] | null;
  cards: Card[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: SanityState = {
  blogs: [],
  categories: [],
  dolar: null,
  profitability: null,
  banks: null,
  franchieses: null,
  cards: null,
  loading: false,
  error: null,
};

const sanitySlice = createSlice({
  name: "sanity",
  initialState,
  reducers: {
    setPreloadedData: (state, action: PayloadAction<SanityState>) => {
      return { ...state, ...action.payload, loading: false, error: null };
    },
  },
});

export const { setPreloadedData } = sanitySlice.actions;
export default sanitySlice.reducer;
