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
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (pks) => {
        let path = "products/"
        return pks
          ? { url: path + pks.map((pk) => `pk[]=${pk}`).join("&") }
          : { url: path }
      },
      transformResponse: (products) =>
        convertProductListPriceToNumber(products),
    }),
    fetchProduct: builder.query({
      query: (pk) => ({ url: `product/${pk}/` }),
      transformResponse: (product) => convertProductPriceToNumber(product),
    }),
    fetchStuff: builder.query({ query: () => ({ url: "stuff/" }) }),
    fetchThing: builder.query({ query: (pk) => ({ url: `thing/${pk}` }) }),
  }),
})

export const {
  useFetchProductsQuery,
  useFetchStuffQuery,
  useFetchThingQuery,
  useFetchProductQuery,
} = sfwaggleApi
