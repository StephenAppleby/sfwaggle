import { createSlice } from "@reduxjs/toolkit"

const initialState = { cartItems: [] }

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { pk, qty } = action.payload
      const isDupe = state.cartItems.some((x) => x.pk === pk)
      if (!isDupe) {
        state.cartItems.push({ pk: pk, qty: qty })
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
      }
    },
    removeFromCart: (state, action) => {
      const pk = action.payload
      const dupeIndex = state.cartItems.findIndex((item) => item.pk === pk)
      if (dupeIndex >= 0) {
        state.cartItems.splice(dupeIndex, 1)
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
      }
    },
    changeCartItemQty: (state, action) => {
      const { pk, newQty } = action.payload
      const dupeIndex = state.cartItems.findIndex((item) => item.pk === pk)
      if (dupeIndex >= 0) {
        state.cartItems[dupeIndex].qty = newQty
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
      }
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchProducts.pending, (state, action) => {
  //       state.status = "loading"
  //     })
  //     .addCase(fetchProducts.fulfilled, (state, action) => {
  //       state.status = "succeeded"
  //       console.log("success")
  //       state.data = state.data.concat(action.payload)
  //     })
  //     .addCase(fetchProducts.rejected, (state, action) => {
  //       state.status = "failed"
  //       console.log("failed")
  //       state.error = action.error.message
  //     })
  // },
})

export const { addToCart, removeFromCart, changeCartItemQty } =
  cartSlice.actions

export default cartSlice.reducer

// export const selectProducts = (state) => state.products

// export const selectProduct = (state, pk) =>
//   state.products.find((product) => product.pk === pk)

// export const fetchProducts = createAsyncThunk("products/request", async () => {
//   const response = await fetch("/api/v1/products/")
//   // const data = await response.json()
//   return response
// })
