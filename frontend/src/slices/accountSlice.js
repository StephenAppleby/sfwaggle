import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { renderErrors } from "../util"

export const login = createAsyncThunk(
  "account/login",
  async (body, { rejectWithValue }) => {
    const response = await fetch("/api/v1/dj-rest-auth/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    if (response.status === 200) {
      return await response.json()
    } else {
      const data = await response.json()
      const renderedError = renderErrors(data)
      return rejectWithValue(renderedError)
    }
  }
)
const userDataFromStorage = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null

const initialState = {
  loading: false,
  error: null,
  user: userDataFromStorage,
}

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.user = { email: action.meta.arg.email, key: action.payload.key }
        localStorage.setItem("userData", JSON.stringify(state.user))
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default accountSlice.reducer
