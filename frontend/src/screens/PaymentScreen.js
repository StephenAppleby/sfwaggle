import React, { useState } from "react"
import { Button, Col, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CheckoutSteps from "../components/CheckoutSteps"
import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
import { addPaymentMethod } from "../slices/paymentSlice"

const PaymentScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const paymentMethodState = useSelector((state) => state.payment.paymentMethod)

  const [paymentMethod, setPaymentMethod] = useState(paymentMethodState)
  const [message, setMessage] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    if (!paymentMethod) {
      setMessage("Please select a payment method")
    } else {
      dispatch(addPaymentMethod(paymentMethod))
      navigate("/placeorder")
    }
  }

  return (
    <FormContainer>
      <CheckoutSteps shipping payment />
      <h1>Payment method</h1>
      {message && <Message variant="danger">{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select payment method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or credit card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button className="my-3" type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
