import { createSlice } from "@reduxjs/toolkit"

const shippingDetailsFromStorage = localStorage.getItem("shipping")
  ? JSON.parse(localStorage.getItem("shipping"))
  : {}

const initialState = { shippingDetails: shippingDetailsFromStorage }

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    addShippingDetails(state, action) {
      state.shippingDetails = action.payload
      localStorage.setItem("shipping", JSON.stringify(state.shippingDetails))
    },
    removeShippingDetails(state, action) {
      state.shippingDetails = {}
      localStorage.removeItem("shipping")
    },
  },
})

const { actions, reducer } = shippingSlice

export const { addShippingDetails, removeShippingDetails } = actions

export default reducer
