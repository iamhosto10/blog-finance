import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blog, Category, Dolar } from "@/app/lib/interface";

export interface SanityState {
  blogs: Blog[];
  categories: Category[];
  dolar: Dolar | null;
  loading: boolean;
  error: string | null;
}

const initialState: SanityState = {
  blogs: [],
  categories: [],
  dolar: null,
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
