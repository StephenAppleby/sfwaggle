import React, { useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import Rating from "../components/Rating"
import LoadingSpinner from "../components/LoadingSpinner"
import Message from "../components/Message"
import {
  useAddToCartMutation,
  useFetchCartQuery,
  useFetchProductQuery,
} from "../slices/apiSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import ReviewSection from "../components/ReviewSection"

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const [message, setMessage] = useState("")

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const {
    data: product,
    isFetching,
    isSuccess: productSuccess,
    isError,
    error,
  } = useFetchProductQuery(params.pk)

  const token = useSelector((state) => state.account.token)

  const { data: cartItems, isSuccess: cartSuccess } = useFetchCartQuery()

  const inCart =
    cartSuccess &&
    productSuccess &&
    cartItems.some((item) => item.product.pk === product.pk)

  const [addToCart] = useAddToCartMutation()

  useEffect(() => {
    if (inCart) {
      setQty(cartItems.find((item) => item.product.pk === product.pk).qty)
    }
  }, [inCart])

  return (
    <>
      {isFetching && <LoadingSpinner />}
      {isError && <Message error={error} />}
      {message && <Message variant="success">{message}</Message>}
      {productSuccess && (
        <>
          <h1>{product.name}</h1>
          <Button className="my-3" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>Category: {product.category}</ListGroup.Item>
                <ListGroup.Item>Brand: {product.brand}</ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numReviews={product.reviews.length}
                  />
                </ListGroup.Item>
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
                        {product.countInStock > 10
                          ? "In stock"
                          : product.countInStock > 0
                          ? "Low stock"
                          : "Out of stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                            disabled={inCart}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Row>
                      {!token ? (
                        <Button
                          onClick={() =>
                            navigate(`/login?redirect=${location.pathname}`)
                          }
                          className="btn-block"
                          type="button"
                        >
                          Log in
                        </Button>
                      ) : inCart ? (
                        <Button
                          onClick={() => navigate("/cart")}
                          className="btn-block"
                          type="button"
                        >
                          Shopping cart
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            setMessage("Added to cart")
                            dispatch(
                              addToCart({ product: product.pk, qty: qty })
                            )
                          }}
                          className="btn-block"
                          type="button"
                          disabled={product.countInStock === 0}
                        >
                          Add to cart
                        </Button>
                      )}
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <ReviewSection product={product} />
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
