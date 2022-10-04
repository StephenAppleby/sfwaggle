import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import cartReducer from "./slices/cartSlice"
import accountReducer from "./slices/accountSlice"
import { sfwaggleApi } from "./slices/apiSlice"

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []

const preloadedState = {
  cart: { cartItems: cartItemsFromStorage },
}

export const store = configureStore({
  preloadedState,
  reducer: {
    [sfwaggleApi.reducerPath]: sfwaggleApi.reducer,
    cart: cartReducer,
    account: accountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sfwaggleApi.middleware),
})

setupListeners(store.dispatch)