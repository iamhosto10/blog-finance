import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SanityState {
  categories: any[];
  isMenuOpen?: boolean;
}

const initialState: SanityState = {
  categories: [],
};

export const sanitySlice = createSlice({
  name: "sanity",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = sanitySlice.actions;
export default sanitySlice.reducer;
