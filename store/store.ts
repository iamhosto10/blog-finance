import { configureStore } from "@reduxjs/toolkit";
import sanityReducer from "./slices/sanitySlice";

export const store = configureStore({
  reducer: {
    sanity: sanityReducer,
  },
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
