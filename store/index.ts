import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      search: searchReducer,
    },
  });
};

export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
