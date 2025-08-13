// store/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import sanityReducer from "./slices/sanitySlice";

// 1) Crea un rootReducer para poder derivar RootState
const rootReducer = combineReducers({
  sanity: sanityReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

// 2) makeStore que acepta preloadedState (sin PreloadedState)
export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState, // puede venir solo { sanity: ... }
  });
};

// Tipos
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
