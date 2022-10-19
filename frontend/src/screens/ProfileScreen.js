import React, { useEffect } from "react"
import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"
import Message from "../components/Message"
import {
  useFetchUserInfoQuery,
  useUpdateUserInfoMutation,
} from "../slices/apiSlice"

const ProfileScreen = () => {
  const [favouriteColor, setFavouriteColor] = useState("")
  const [message, setMessage] = useState(null)

  const account = useSelector((state) => state.account)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [updateUserInfo, { data: updateSuccess }] = useUpdateUserInfoMutation()

  const {
    data: user,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useFetchUserInfoQuery()

  useEffect(() => {
    if (!account.token) {
      navigate("/login")
    } else {
      if (user) {
        setFavouriteColor(user.favouriteColor)
      }
    }
  }, [user, account])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserInfo({ favourite_color: favouriteColor }))
  }

  return (
    <>
      <Row>
        <Col md={3}>
          <h2>Profile</h2>
          {updateSuccess && (
            <Message variant="success">Profile updated</Message>
          )}
          {isFetching && <LoadingSpinner />}
          {isError && <Message error={error} />}
          {isSuccess && (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  plaintext
                  readOnly
                  value={user.email}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="favouriteColor">
                <Form.Label>Favourite color</Form.Label>
                <Form.Control
                  placeholder="You favourite color"
                  value={favouriteColor}
                  onChange={(e) => setFavouriteColor(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button className="my-3" type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ProfileScreen
