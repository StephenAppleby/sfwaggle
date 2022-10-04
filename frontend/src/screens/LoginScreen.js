import React, { useState, useEffect } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import FormContainer from "../components/FormContainer"
import LoadingSpinner from "../components/LoadingSpinner"
import Message from "../components/Message"
import { login } from "../slices/accountSlice"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const account = useSelector((state) => state.account)
  const { user } = account
  const { loading, error } = account.loginState

  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/"

  useEffect(() => {
    if (user) {
      navigate(redirect)
    }
  }, [user])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login({ email: email, password: password }))
  }

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <LoadingSpinner />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="my-3" type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen