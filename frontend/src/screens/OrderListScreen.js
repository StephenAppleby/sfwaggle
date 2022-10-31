import React from "react"
import { Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"
import Message from "../components/Message"
import { useListOrdersQuery } from "../slices/apiSlice"
import { capitalize } from "../util"

const OrderListScreen = () => {
  const {
    data: orders,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useListOrdersQuery()
  return (
    <>
      {isFetching && <LoadingSpinner />}
      {isError && <Message error={error} />}
      {isSuccess && (
        <>
          <h1>Orders</h1>
          {orders.length === 0 && (
            <Message>You have submitted no orders</Message>
          )}
          <Col>
            <Row>
              <Col md={3}>Submitted</Col>
              <Col md={3}>Payment status</Col>
              <Col md={3}>Delivery status</Col>
              <Col md={3}>Total price</Col>
            </Row>
            {orders.map((order) => (
              <Row>
                <Col md={3}>
                  <Link to={`/orders/${order.pk}`}>
                    {new Date(order.createdOn).toDateString()}
                  </Link>
                </Col>
                <Col md={3}>{capitalize(order.paymentStatus)}</Col>
                <Col md={3}>{capitalize(order.orderStatus)}</Col>
                <Col md={3}>{order.totalPrice}</Col>
              </Row>
            ))}
          </Col>
        </>
      )}
    </>
  )
}

export default OrderListScreen
