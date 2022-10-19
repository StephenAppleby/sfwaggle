import React, { useState, useEffect } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import FormContainer from "../components/FormContainer"
import LoadingSpinner from "../components/LoadingSpinner"
import Message from "../components/Message"
import { useRegisterMutation } from "../slices/apiSlice"

const RegisterScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = useSelector((state) => state.account.token)
  const [register, { isFetching, isError, error }] = useRegisterMutation()

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
    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
    } else {
      setMessage("")
      dispatch(
        register({
          email: email,
          password1: password,
          password2: confirmPassword,
        })
      )
      navigate(redirect)
    }
  }

  return (
    <FormContainer>
      <h1>Sign up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {isError && <Message error={error} />}
      {isFetching && <LoadingSpinner />}
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
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Reenter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="my-3" type="submit" variant="primary">
          Sign Up
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Log in
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
