import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CheckoutSteps from "../components/CheckoutSteps"
import FormContainer from "../components/FormContainer"
import { addShippingDetails } from "../slices/shippingSlice"

const Shipping = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const shippingDetails = useSelector((state) => state.shipping.shippingDetails)

  const [address, setAddress] = useState(shippingDetails.address)
  const [city, setCity] = useState(shippingDetails.city)
  const [postalCode, setPostalCode] = useState(shippingDetails.postalCode)
  const [country, setCountry] = useState(shippingDetails.country)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      addShippingDetails({
        address: address,
        city: city,
        postalCode: postalCode,
        country: country,
      })
    )
    navigate("/payment")
  }

  return (
    <FormContainer>
      <CheckoutSteps shipping />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="my-3" type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Shipping
