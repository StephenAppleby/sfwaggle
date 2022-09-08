import { configureStore } from "@reduxjs/toolkit"
import productReducer from "./slices/productSlice"
import { setupListeners } from "@reduxjs/toolkit/query"
import { sfwaggleApi } from "./slices/apiSlice"

export const store = configureStore({
  reducer: {
    [sfwaggleApi.reducerPath]: sfwaggleApi.reducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sfwaggleApi.middleware),
})

setupListeners(store.dispatch)
