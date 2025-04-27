import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authTypeSlice } from "../features/authSlice";
import { isAuthSlice } from "../features/isAuthSlice";
import { modalIsOpenSlice } from "../features/modalIsOpenSlice";
import { userNameSlice } from "../features/userNameSlice";
import { activeTabSlice } from "../features/activeTabSlice";
import { isSearchSlice } from "../features/isSearchSlice";
import { isTreilerOpenSlice } from "../features/isTreilerOpen";
import { searchIsOpenSlice } from "../features/searchIsOpen";

const rootReducer = combineSlices(authTypeSlice, isAuthSlice, modalIsOpenSlice, userNameSlice, activeTabSlice, isSearchSlice, isTreilerOpenSlice, searchIsOpenSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware()
    },
    preloadedState,
  })
  setupListeners(store.dispatch);
  return store
};

export const store = makeStore();
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>