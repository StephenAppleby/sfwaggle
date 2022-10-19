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

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const {
    data: product,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useFetchProductQuery(params.pk)

  const token = useSelector((state) => state.account.token)
  const skip = !token ? true : false

  const { data: cartItems, isSuccess: cartSuccess } = useFetchCartQuery(
    {},
    { skip }
  )

  const inCart =
    cartSuccess &&
    isSuccess &&
    cartItems.some((item) => item.product.pk === product.pk)

  useEffect(() => {
    if (inCart) {
      setQty(cartItems.find((item) => item.product.pk === product.pk).qty)
    }
  }, [inCart])

  const [addToCart] = useAddToCartMutation()

  return (
    <>
      {isFetching && <LoadingSpinner />}
      {isError && <Message error={error} />}
      {isSuccess && (
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
                  {product.count_in_stock > 0 && (
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
                            {[...Array(product.count_in_stock).keys()].map(
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
                          onClick={() =>
                            dispatch(
                              addToCart({ product: product.pk, qty: qty })
                            )
                          }
                          className="btn-block"
                          type="button"
                          disabled={product.count_in_stock === 0}
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
        </>
      )}
    </>
  )
}

export default ProductScreen
