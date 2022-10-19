import { createSlice } from "@reduxjs/toolkit"

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null

const initialState = { paymentMethod: paymentMethodFromStorage }

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addPaymentMethod(state, action) {
      console.log(action)
      state.paymentMethod = action.payload
      localStorage.setItem("paymentMethod", JSON.stringify(state.paymentMethod))
    },
    removePaymentMethod(state, action) {
      state.paymentMethod = null
      localStorage.removeItem("paymentMethod")
    },
  },
})

const { actions, reducer } = paymentSlice

export const { addPaymentMethod, removePaymentMethod } = actions

export default reducer
