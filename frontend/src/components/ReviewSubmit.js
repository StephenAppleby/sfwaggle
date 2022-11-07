import React, { useState, useEffect } from "react"
import { Button, Form, ListGroup } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useSubmitReviewMutation } from "../slices/apiSlice"
import Message from "./Message"

const ReviewSubmit = ({ product, setMessage }) => {
  const dispatch = useDispatch()

  const [reviewRating, setReviewRating] = useState(0)
  const [reviewBody, setReviewBody] = useState("")

  const [
    submitReview,
    {
      isSuccess: submitReviewSuccess,
      isError: submitReviewIsError,
      error: submitReviewError,
    },
  ] = useSubmitReviewMutation()

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    const data = { rating: reviewRating, product: product.pk }
    if (reviewBody) {
      data.body = reviewBody
    }
    dispatch(submitReview(data))
  }

  useEffect(() => {
    if (submitReviewSuccess) {
      setMessage({ text: "Review submitted", variant: "success", error: null })
    }
    if (submitReviewIsError) {
      setMessage({ text: "", variant: "danger", error: submitReviewError })
    }
  }, [submitReviewSuccess, submitReviewIsError])

  return (
    <ListGroup.Item>
      <p>You have purchased this item and are eligible to leave a review!</p>
      <Form onSubmit={handleReviewSubmit}>
        <Form.Group controlId="reviewRating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={reviewRating}
            onChange={(e) => setReviewRating(e.target.value)}
          >
            {[0, 1, 2, 3, 4, 5].map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="reviewBody">
          <Form.Label>Review text (optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            onChange={(e) => setReviewBody(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="my-3" type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </ListGroup.Item>
  )
}

export default ReviewSubmit
