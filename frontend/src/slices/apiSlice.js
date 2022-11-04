import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { removeCredentials, setCredentials } from "./accountSlice"
import { removePaymentMethod } from "./paymentSlice"
import { removeShippingDetails } from "./shippingSlice"

const convertProductPriceToNumber = (product) => {
  const price = product.price
  product.price = Number(price)
  return product
}

const convertProductListPriceToNumber = (products) => {
  return products.map((product) => convertProductPriceToNumber(product))
}

export const sfwaggleApi = createApi({
  reducerPath: "sfwaggleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().account.token

      if (token) {
        headers.set("authorization", `Token ${token}`)
      }

      return headers
    },
  }),
  tagTypes: [
    "userInfo",
    "products",
    "cart",
    "authenticationRequried",
    "orders",
    "dog",
  ],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "dj-rest-auth/registration/",
        method: "POST",
        body: body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(setCredentials(data))
      },
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "dj-rest-auth/login/",
        method: "POST",
        body: body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(setCredentials(data))
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "dj-rest-auth/logout/",
        method: "POST",
      }),
      invalidatesTags: ["authenticationRequried"],
      async onQueryStarted(arg, { dispatch }) {
        dispatch(removeCredentials())
        dispatch(removeShippingDetails())
        dispatch(removePaymentMethod())
      },
    }),
    fetchDogs: builder.query({
      query: () => ({ url: "dogs/" }),
      providesTags: ["dog"],
    }),
    fetchDog: builder.query({
      query: (pk) => ({ url: `dogs/${pk}/` }),
      providesTags: ["dog"],
    }),
    floofDogToggle: builder.mutation({
      query: (pk) => ({ url: `floof/${pk}/`, method: "PATCH" }),
      invalidatesTags: ["dog", "userInfo"],
    }),
    fetchProducts: builder.query({
      query: () => ({ url: "products/" }),
      providesTags: ["products"],
      transformResponse: (products) =>
        convertProductListPriceToNumber(products),
    }),
    fetchProduct: builder.query({
      query: (pk) => ({ url: `product/${pk}/` }),
      providesTags: ["products"],
      transformResponse: (product) => convertProductPriceToNumber(product),
    }),
    submitReview: builder.mutation({
      query: (data) => ({ url: "reviews/", method: "POST", body: data }),
      invalidatesTags: ["products"],
    }),
    fetchUserInfo: builder.query({
      query: () => ({ url: "dj-rest-auth/user/" }),
      providesTags: ["userInfo", "authenticationRequried"],
    }),
    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: "dj-rest-auth/user/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["userInfo"],
    }),
    fetchCart: builder.query({
      query: () => ({ url: "cart/" }),
      providesTags: ["cart", "authenticationRequried"],
    }),
    addToCart: builder.mutation({
      query: (cartItem) => ({ url: "cart/", method: "POST", body: cartItem }),
      invalidatesTags: ["cart"],
    }),
    updateCartItem: builder.mutation({
      query: (cartItem) => ({ url: "cart/", method: "PUT", body: cartItem }),
      invalidatesTags: ["cart"],
    }),
    deleteCartItem: builder.mutation({
      query: (product) => ({ url: "cart/", method: "DELETE", body: product }),
      invalidatesTags: ["cart"],
    }),
    placeOrder: builder.mutation({
      query: (body) => ({
        url: "orders/",
        method: "POST",
        body: body,
      }),
    }),
    listOrders: builder.query({
      query: () => ({ url: "orders/" }),
      providesTags: ["orders", "authenticationRequried"],
    }),
    retrieveOrder: builder.query({
      query: (pk) => ({ url: `orders/${pk}` }),
      providesTags: ["orders", "authenticationRequried"],
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useFetchDogsQuery,
  useFetchDogQuery,
  useFloofDogToggleMutation,
  useFetchProductsQuery,
  useFetchProductQuery,
  useSubmitReviewMutation,
  useFetchUserInfoQuery,
  useUpdateUserInfoMutation,
  useFetchCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  usePlaceOrderMutation,
  useListOrdersQuery,
  useRetrieveOrderQuery,
} = sfwaggleApi
