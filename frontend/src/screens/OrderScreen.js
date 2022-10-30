import React from "react"
import { Col, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
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

  if (isSuccess) {
    console.log(order)
  }

  const createdOn = isSuccess ? new Date(order.created_on) : ""

  const first_col = 4
  const second_col = 12 - first_col

  return (
    <>
      {isFetching && <LoadingSpinner />}
      {isError && <Message error={error} />}
      {isSuccess && (
        <>
          <h1>Your order</h1>
          <Row>
            <Col md={first_col}>Order submitted:</Col>
            <Col md={second_col}>{createdOn.toDateString()}</Col>
          </Row>
          <Row>
            <Col md={first_col}>Payment status:</Col>
            {/* <Col md={second_col}>{order.</Col> */}
          </Row>
        </>
      )}
    </>
  )
}

export default OrderScreen
