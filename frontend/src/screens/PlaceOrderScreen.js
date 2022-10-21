import React from "react"
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CheckoutSteps from "../components/CheckoutSteps"
import LoadingSpinner from "../components/LoadingSpinner"
import Message from "../components/Message"
import RemoveFromCartButton from "../components/RemoveFromCartButton"
import {
  useDeleteCartItemMutation,
  useFetchCartQuery,
} from "../slices/apiSlice"

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()

  const {
    data: cartItems,
    isSuccess: cartSuccess,
    isFetching: cartFetching,
    isError: cartIsError,
    error: cartError,
  } = useFetchCartQuery()

  const shippingDetails = useSelector((state) => state.shipping.shippingDetails)
  const paymentMethod = useSelector((state) => state.payment.paymentMethod)

  const cartEmpty = cartSuccess ? cartItems.length === 0 : true

  const cartPrice = cartSuccess
    ? cartItems
        .map((item) => item.qty * item.product.price)
        .reduce((prev, cur) => prev + cur, 0)
    : 0

  const shippingPrice = cartPrice > 100 ? 0 : 12

  const totalPrice = cartPrice + shippingPrice

  const placeOrderHandler = () => {
    console.log("ORDERING")
  }

  const [deleteCartItem] = useDeleteCartItemMutation()

  const removeCartItemHandler = (pk) => {
    dispatch(deleteCartItem({ product: pk }))
  }

  return (
    <>
      <CheckoutSteps shipping payment placeOrder />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingDetails.address}, {shippingDetails.city},{" "}
                {shippingDetails.postalCode}, {shippingDetails.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Cart</h2>
              {cartFetching && <LoadingSpinner />}
              {cartIsError && <Message error={cartError} />}
              {cartSuccess && cartEmpty && (
                <Message>Your cart is empty</Message>
              )}
              {cartSuccess && cartItems.length > 0 && (
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col md={2}>
                        <h5>Item</h5>
                      </Col>
                      <Col md={5}></Col>
                      <Col md={1}>
                        <h5>Qty</h5>
                      </Col>
                      <Col md={1}>
                        <h5>Price</h5>
                      </Col>
                      <Col md={1}>
                        <h5>Subtotal</h5>
                      </Col>
                      <Col md={2}></Col>
                    </Row>
                  </ListGroup.Item>
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={5}>
                          <Link to={`/product/${item.product.pk}`}>
                            {item.product.name}
                          </Link>
                        </Col>
                        <Col md={1}>{item.qty}</Col>
                        <Col md={1}>${item.product.price}</Col>
                        <Col md={1}>${item.qty * item.product.price}</Col>
                        <Col md={2}>
                          <RemoveFromCartButton product={item.product} />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cartPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartEmpty}
                  onClick={placeOrderHandler}
                >
                  Place order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
