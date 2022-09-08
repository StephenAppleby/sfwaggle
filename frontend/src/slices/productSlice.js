import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = { data: [], status: "idle", error: null }

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // request: (state, action) => {
    //   state.loading = true
    // },
    // success: (state, action) => {
    //   state.loading = false
    //   state.products = action.payload
    // },
    // failure: (state, action) => {
    //   state.loading = false
    //   state.error = action.payload
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded"
        console.log("success")
        state.data = state.data.concat(action.payload)
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"
        console.log("failed")
        state.error = action.error.message
      })
  },
})

export const { request, success, failure } = productSlice.actions

export default productSlice.reducer

export const selectProducts = (state) => state.products

export const selectProduct = (state, pk) =>
  state.products.find((product) => product.pk === pk)

export const fetchProducts = createAsyncThunk("products/request", async () => {
  const response = await fetch("/api/v1/products/")
  // const data = await response.json()
  return response
})
