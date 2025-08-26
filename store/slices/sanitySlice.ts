import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blog, Category, Dolar, Profitability } from "@/lib/interface";
import Page from "../../app/herramientas/nu/page";

export interface SanityState {
  blogs: Blog[];
  categories: Category[];
  dolar: Dolar | null;
  profitability: Profitability | null;
  loading: boolean;
  error: string | null;
}

const initialState: SanityState = {
  blogs: [],
  categories: [],
  dolar: null,
  profitability: null,
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
