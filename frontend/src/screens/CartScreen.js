import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFetchProductsQuery } from "../slices/apiSlice"
import LoadingSpinner from "../components/LoadingSpinner"
import Message from "../components/Message"
import { Button, Col, Image, ListGroup, Row, Form, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { removeFromCart, changeCartItemQty } from "../slices/cartSlice"

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    data: products,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useFetchProductsQuery(cartItems.map((item) => item.pk))

  return (
    <>
      <h1>Shopping cart</h1>
      {isFetching ? (
        <LoadingSpinner />
      ) : isError ? (
        <Message variant="danger">{error.error}</Message>
      ) : isSuccess ? (
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
                {products.map((product) => (
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
                          value={
                            cartItems.find((item) => item.pk === product.pk).qty
                          }
                          onChange={(e) =>
                            dispatch(
                              changeCartItemQty({
                                pk: product.pk,
                                newQty: Number(e.target.value),
                              })
                            )
                          }
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
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => dispatch(removeFromCart(product.pk))}
                        >
                          Remove <i className="fas fa-trash"></i>
                        </Button>
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
                      (acc, item) =>
                        acc +
                        item.qty *
                          products.find((product) => product.pk === item.pk)
                            .price,
                      0
                    )
                    .toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={() => navigate("/login?redirect=shipping")}
                  >
                    Proceed to checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      ) : (
        <h3>Idle</h3>
      )}
    </>
  )
  return <div>CartScreen</div>
}

export default CartScreen
