import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const sfwaggleApi = createApi({
  reducerPath: "sfwaggleApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({ query: () => "products/" }),
  }),
})

export const { useFetchProductsQuery } = sfwaggleApi
