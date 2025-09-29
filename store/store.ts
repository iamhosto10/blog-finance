import { configureStore, combineReducers } from "@reduxjs/toolkit";
import sanityReducer from "./slices/sanitySlice";

const rootReducer = combineReducers({
  sanity: sanityReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
