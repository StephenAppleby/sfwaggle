// test("Fetch sanity check", () => {
//   return fetch("https://catfact.ninja/fact").then((data) =>
//     expect(data.status).toBe(200)
//   )
// })

// test("Fetch local database without proxy", () => {
//   return fetch("http://localhost:8000/api/v1/products").then((data) =>
//     expect(data.status).toBe(200)
//   )
// })

import axios from "axios"

test("Axios local database without proxy", () => {
  return axios.get("http://localhost:8000/api/v1/products/").then((data) => {
    expect(data.status).toBe(200)
  })
})

test("Axios local database with proxy", () => {
  return axios.get("/api/v1/products/").then((data) => {
    expect(data.status).toBe(200)
  })
})
