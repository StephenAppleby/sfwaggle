import React, { useState } from "react"
import { Button, Col, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CheckoutSteps from "../components/CheckoutSteps"
import FormContainer from "../components/FormContainer"
import { addPaymentMethod } from "../slices/paymentSlice"

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const paymentMethodState = useSelector((state) => state.payment.paymentMethod)

  if (paymentMethodState) {
    setPaymentMethod(paymentMethodState)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addPaymentMethod(paymentMethod))
    navigate("/placeorder")
  }

  return (
    <FormContainer>
      <CheckoutSteps shipping payment />
      <h1>Payment method</h1>
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
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/* <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
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
