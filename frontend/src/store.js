import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import accountReducer from "./slices/accountSlice"
import { sfwaggleApi } from "./slices/apiSlice"

const preloadedState = {}

export const store = configureStore({
  preloadedState,
  reducer: {
    [sfwaggleApi.reducerPath]: sfwaggleApi.reducer,
    account: accountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sfwaggleApi.middleware),
})

setupListeners(store.dispatch)
