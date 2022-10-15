import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

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
  tagTypes: ["userInfo", "cart"],
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: () => ({ url: "products/" }),
      transformResponse: (products) =>
        convertProductListPriceToNumber(products),
    }),
    fetchProduct: builder.query({
      query: (pk) => ({ url: `product/${pk}/` }),
      transformResponse: (product) => convertProductPriceToNumber(product),
    }),
    fetchUserInfo: builder.query({
      query: () => ({ url: "dj-rest-auth/user/" }),
      providesTags: ["userInfo"],
      transformResponse: (info) => {
        return {
          email: info.email,
          favouriteColor: info.favourite_color,
        }
      },
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
      providesTags: ["cart"],
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
  }),
})

export const {
  useFetchProductsQuery,
  useFetchProductQuery,
  useFetchUserInfoQuery,
  useUpdateUserInfoMutation,
  useFetchCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = sfwaggleApi
