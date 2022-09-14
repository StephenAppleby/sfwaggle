import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const sfwaggleApi = createApi({
  reducerPath: "sfwaggleApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (builder) => ({
    // fetchProducts: builder.query({ query: () => "products/" }),
    fetchProducts: builder.query({ query: () => ({ url: "products/" }) }),
    fetchStuff: builder.query({ query: () => ({ url: "stuff/" }) }),
    fetchThing: builder.query({ query: (pk) => ({ url: `thing/${pk}` }) }),
    fetchProduct: builder.query({
      query: (pk) => ({ url: `product/${pk}/` }),
    }),
  }),
})

export const {
  useFetchProductsQuery,
  useFetchStuffQuery,
  useFetchThingQuery,
  useFetchProductQuery,
} = sfwaggleApi
