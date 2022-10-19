import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import accountReducer from "./slices/accountSlice"
import shippingReducer from "./slices/shippingSlice"
import paymentReducer from "./slices/paymentSlice"
import { sfwaggleApi } from "./slices/apiSlice"

const preloadedState = {}

export const store = configureStore({
  preloadedState,
  reducer: {
    [sfwaggleApi.reducerPath]: sfwaggleApi.reducer,
    account: accountReducer,
    shipping: shippingReducer,
    payment: paymentReducer,
  },
  middleware: [...getDefaultMiddleware(), sfwaggleApi.middleware],
})

setupListeners(store.dispatch)
