import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { renderErrors } from "../util"

export const login = createAsyncThunk(
  "account/login",
  async (body, { rejectWithValue }) => {
    const response = await fetch("/api/v1/dj-rest-auth/login/", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
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

export const logout = createAsyncThunk(
  "account/logout",
  async (token, { rejectWithValue }) => {
    const response = await fetch("/api/v1/dj-rest-auth/logout/", {
      method: "POST",
      headers: new Headers({
        Authorization: "Token " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
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

export const register = createAsyncThunk(
  "account/register",
  async (body, { rejectWithValue }) => {
    const response = await fetch("/api/v1/dj-rest-auth/registration/", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    })
    if (response.status === 201) {
      return await response.json()
    } else {
      const data = await response.json()
      const renderedError = renderErrors(data)
      return rejectWithValue(renderedError)
    }
  }
)

const tokenFromStorage = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null

const userDataFromStorage = localStorage.getItem("account")
  ? JSON.parse(localStorage.getItem("account"))
  : null

const initialState = {
  loginState: { loading: false, error: null },
  registerState: { loading: false, error: null },
  retrieveState: { loading: false, error: null },
  token: tokenFromStorage,
  user: userDataFromStorage,
}

const loginAction = (state, action) => {
  state.user = { email: action.meta.arg.email }
  localStorage.setItem("account", JSON.stringify(state.user))
  state.token = action.payload.key
  localStorage.setItem("token", JSON.stringify(state.token))
}

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loginState.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginState.loading = false
        state.loginState.error = null
        loginAction(state, action)
      })
      .addCase(login.rejected, (state, action) => {
        state.loginState.loading = false
        state.loginState.error = action.payload
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null
        state.token = null
        localStorage.removeItem("account")
        localStorage.removeItem("token")
      })
      .addCase(register.pending, (state, action) => {
        state.registerState.loading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerState.loading = false
        state.registerState.error = null
        loginAction(state, action)
      })
      .addCase(register.rejected, (state, action) => {
        state.registerState.loading = false
        state.registerState.error = action.payload
      })
  },
})

export default accountSlice.reducer
