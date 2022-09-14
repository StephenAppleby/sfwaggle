import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap"
import Rating from "../components/Rating"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorDisplay from "../components/ErrorDisplay"
import { useFetchProductQuery } from "../slices/apiSlice"

const ProductScreen = () => {
  const params = useParams()
  const {
    data: product,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useFetchProductQuery(params.pk)

  const navigate = useNavigate()
  return (
    <>
      {isFetching ? (
        <LoadingSpinner />
      ) : isError ? (
        <ErrorDisplay error={error} />
      ) : isSuccess ? (
        <>
          <Button className="my-3" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.count_in_stock > 10
                          ? "In stock"
                          : product.count_in_stock > 0
                          ? "Low stock"
                          : "Out of stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Button
                        className="btn-block"
                        type="button"
                        disabled={product.count_in_stock === 0}
                      >
                        Add to cart
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <h3>Idle</h3>
      )}
      )
    </>
  )
}

export default ProductScreen
