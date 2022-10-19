import React from "react"
import { Row, Col } from "react-bootstrap"
import Message from "../components/Message"
import LoadingSpinner from "../components/LoadingSpinner"
import Product from "../components/Product"
import { useFetchProductsQuery } from "../slices/apiSlice"

const ProductListScreen = () => {
  const {
    data: products,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useFetchProductsQuery()

  return (
    <>
      <h1>Products</h1>
      {isFetching && <LoadingSpinner />}
      {isError && <Message error={error} />}
      {isSuccess && (
        <Row>
          {products.map((product) => (
            <Col key={product.pk} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default ProductListScreen
