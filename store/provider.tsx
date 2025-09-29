"use client";
import { Provider } from "react-redux";
import { makeStore, type RootState } from "./store";
import { useRef } from "react";

export function ReduxProvider({
  children,
  preloadedState,
}: {
  children: React.ReactNode;
  preloadedState?: Partial<RootState>;
}) {
  const storeRef = useRef<ReturnType<typeof makeStore>>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState);
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
