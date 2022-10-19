import React, { useState, useEffect } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import FormContainer from "../components/FormContainer"
import LoadingSpinner from "../components/LoadingSpinner"
import Message from "../components/Message"
import { setCredentials } from "../slices/accountSlice"
import { useLoginMutation } from "../slices/apiSlice"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = useSelector((state) => state.account.token)

  const [login, { isFetching, isError, error }] = useLoginMutation()

  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/"

  useEffect(() => {
    if (token) {
      navigate(redirect)
    }
  }, [token])

  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(login({ email: email, password: password }))
    navigate(redirect)
  }

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {isError && <Message error={error} />}
      {isFetching && <LoadingSpinner />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            required
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
