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
  tagTypes: ["UserInfo"],
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
      providesTags: ["UserInfo"],
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
      invalidatesTags: ["UserInfo"],
    }),
  }),
})

export const {
  useFetchProductsQuery,
  useFetchProductQuery,
  useFetchUserInfoQuery,
  useUpdateUserInfoMutation,
} = sfwaggleApi
