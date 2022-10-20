import React from "react"
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CheckoutSteps from "../components/CheckoutSteps"
import LoadingSpinner from "../components/LoadingSpinner"
import Message from "../components/Message"
import { useFetchCartQuery } from "../slices/apiSlice"

const PlaceOrderScreen = () => {
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

  let cartPrice = cartSuccess
    ? cartItems
        .map((item) => item.qty * item.product.price)
        .reduce((prev, cur) => prev + cur, 0)
    : 0
  cartPrice = Math.round(cartPrice * 100) / 100

  const shippingPrice = cartPrice > 100 ? 0 : 12

  const placeOrderHandler = () => {
    console.log("ORDERING")
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
              {cartSuccess && cartItems.length > 1 && (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product.pk}`}>
                            {item.product.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.product.price}:{" $"}
                          {item.qty * item.product.price}
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
                  <Col>${cartPrice + shippingPrice}</Col>
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
