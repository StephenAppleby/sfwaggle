import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectAllProducts } from "../slices/productSlice"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import { useFetchProductsQuery } from "../slices/apiSlice"

const ProductListScreen = () => {
  const {
    data: products,
    isLoading,
    // isFetching,
    // isSuccess,
    // isError,
    error,
  } = useFetchProductsQuery()

  const resolveStatus = () => {
    if (error) {
      return <h3>{error}</h3>
    }
    if (isLoading) {
      return <h2>Loading...</h2>
    }
    if (products) {
      return (
        <Row>
          {products.map((product) => (
            <Col key={product.pk} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )
    }
    return <h2>Idle</h2>
  }

  return (
    <>
      <h1>Products</h1>
      {resolveStatus()}
    </>
  )
}

export default ProductListScreen
