import React from "react"
import { useDispatch } from "react-redux"
import LoadingSpinner from "../components/LoadingSpinner"
import Message from "../components/Message"
import { Button, Col, Image, ListGroup, Row, Form, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import {
  useFetchCartQuery,
  useUpdateCartItemMutation,
} from "../slices/apiSlice"
import RemoveFromCartButton from "../components/RemoveFromCartButton"

const CartScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    data: cartItems,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useFetchCartQuery()

  const [updateCartItem] = useUpdateCartItemMutation()
  console.log(cartItems)

  return (
    <>
      <h1>Shopping cart</h1>
      {isFetching && <LoadingSpinner />}
      {isError && <Message error={error} />}
      {isSuccess && (
        <Row>
          <Col md={8}>
            {cartItems.length === 0 ? (
              <Message>
                Your cart is empty{" "}
                <Button
                  type="button"
                  variant="light"
                  className="my-3"
                  onClick={() => navigate(-1)}
                >
                  Go back
                </Button>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map(({ product, qty }) => (
                  <ListGroup.Item key={product.pk}>
                    <Row>
                      <Col md={2}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${product.pk}`}>
                          {product.name}
                        </Link>
                      </Col>
                      <Col md={2}>${product.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) =>
                            dispatch(
                              updateCartItem({
                                product: product.pk,
                                qty: e.target.value,
                              })
                            )
                          }
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <RemoveFromCartButton product={product} />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </h2>
                  $
                  {cartItems
                    .reduce(
                      (acc, cartItem) =>
                        acc + cartItem.qty * cartItem.product.price,
                      0
                    )
                    .toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={() => navigate("/shipping")}
                  >
                    Proceed to checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default CartScreen
