import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { renderErrors } from "../util"

const tokenFromStorage = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null

const initialState = {
  token: tokenFromStorage,
}

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.key
      localStorage.setItem("token", JSON.stringify(state.token))
    },
    removeCredentials: (state, action) => {
      state.token = null
      localStorage.removeItem("token")
      localStorage.removeItem("shipping")
    },
  },
})

export const { setCredentials, removeCredentials } = accountSlice.actions

export default accountSlice.reducer
