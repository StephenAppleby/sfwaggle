import React from "react"
import { Col, ListGroup, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import ItemsSummary from "../components/ItemsSummary"
import LoadingSpinner from "../components/LoadingSpinner"
import Message from "../components/Message"
import { useRetrieveOrderQuery } from "../slices/apiSlice"

const OrderScreen = () => {
  const params = useParams()

  const {
    data: order,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useRetrieveOrderQuery(params.pk)

  const createdOn = isSuccess ? new Date(order.createdOn) : ""
  const capitalizedOrderStatus = isSuccess
    ? order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)
    : ""
  const capitalizedPaymentStatus = isSuccess
    ? order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)
    : ""

  return (
    <>
      {isFetching && <LoadingSpinner />}
      {isError && <Message error={error} />}
      {isSuccess && (
        <>
          <h1>Your order</h1>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order submitted</h2>
              <p>{createdOn.toDateString()}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Reference</h2>
              <p>{order.pk}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <ItemsSummary items={order.items} />
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              <Row>
                <Col md={4}>Status:</Col>
                <Col md={8}>{capitalizedPaymentStatus}</Col>
              </Row>
              <Row>
                <Col md={4}>Items price:</Col>
                <Col md={8}>${order.itemsPrice}</Col>
              </Row>
              <Row>
                <Col md={4}>Shipping price:</Col>
                <Col md={8}>${order.shippingPrice}</Col>
              </Row>
              <Row>
                <Col md={4}>Total price:</Col>
                <Col md={8}>${order.totalPrice}</Col>
              </Row>
              <Row>
                <Col md={4}>Amount paid:</Col>
                <Col md={8}>${order.amountPaid}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <Row>
                <Col md={4}>Status:</Col>
                <Col md={8}>{capitalizedOrderStatus}</Col>
              </Row>
              <Row>
                <Col md={4}>Address:</Col>
                <Col md={8}>{order.postalAddress.address}</Col>
              </Row>
              <Row>
                <Col md={4}>Postal code:</Col>
                <Col md={8}>{order.postalAddress.postalCode}</Col>
              </Row>
              <Row>
                <Col md={4}>City:</Col>
                <Col md={8}>{order.postalAddress.city}</Col>
              </Row>
              <Row>
                <Col md={4}>Country:</Col>
                <Col md={8}>{order.postalAddress.country}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </>
      )}
    </>
  )
}

export default OrderScreen
