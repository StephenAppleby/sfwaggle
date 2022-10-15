import React from "react"
import { useDispatch, useSelector } from "react-redux"
import LoadingSpinner from "../components/LoadingSpinner"
import Message from "../components/Message"
import { Button, Col, Image, ListGroup, Row, Form, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import {
  useDeleteCartItemMutation,
  useFetchCartQuery,
  useUpdateCartItemMutation,
} from "../slices/apiSlice"
import { useEffect } from "react"

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
  const [deleteCartItem] = useDeleteCartItemMutation()

  const account = useSelector((state) => state.account)

  useEffect(() => {
    if (!account.token) {
      navigate("/login")
    }
  }, [account])

  return (
    <>
      <h1>Shopping cart</h1>
      {isFetching ? (
        <LoadingSpinner />
      ) : isError ? (
        { error }
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
                          onClick={() =>
                            dispatch(deleteCartItem({ product: product.pk }))
                          }
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
