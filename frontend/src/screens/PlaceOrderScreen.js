import React from "react"
import { useEffect } from "react"
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CheckoutSteps from "../components/CheckoutSteps"
import ItemsSummary from "../components/ItemsSummary"
import LoadingSpinner from "../components/LoadingSpinner"
import Message from "../components/Message"
import { useFetchCartQuery, usePlaceOrderMutation } from "../slices/apiSlice"

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

  const cartPrice = cartSuccess
    ? cartItems
        .map((item) => item.qty * item.product.price)
        .reduce((prev, cur) => prev + cur, 0)
    : 0
  const cartPriceDisplay = addDecimals(cartPrice)

  const shippingPrice = cartPrice > 100 ? 0 : 12
  const shippingPriceDisplay = addDecimals(shippingPrice)

  const totalPriceDisplay = addDecimals(cartPrice + shippingPrice)

  const [
    placeOrder,
    {
      data: orderData,
      isSuccess: orderSuccess,
      isError: orderIsError,
      error: orderError,
    },
  ] = usePlaceOrderMutation()

  useEffect(() => {
    if (orderSuccess) {
      navigate(`/orders/${orderData.pk}/`)
    }
  }, [orderSuccess, navigate, orderData])

  const placeOrderHandler = () => {
    const order = {
      items: cartItems.map((item) => {
        return {
          qty: item.qty,
          product: item.product.pk,
        }
      }),
      postalAddress: {
        address: shippingDetails.address,
        city: shippingDetails.city,
        postalCode: shippingDetails.postalCode,
        country: shippingDetails.country,
      },
    }
    dispatch(placeOrder(order))
  }

  return (
    <>
      <CheckoutSteps shipping payment placeOrder />
      {orderIsError && <Message error={orderError} />}
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
                <ItemsSummary items={cartItems} isCart />
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
                  <Col>${cartPriceDisplay}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPriceDisplay}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPriceDisplay}</Col>
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
