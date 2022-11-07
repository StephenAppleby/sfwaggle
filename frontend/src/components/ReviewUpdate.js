import React, { useState, useEffect } from "react"
import { Button, Form, ListGroup } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useUpdateReviewMutation } from "../slices/apiSlice"
import DeleteReviewButton from "./DeleteReviewButton"

const ReviewUpdate = ({ product, review, setMessage, setShowUpdate }) => {
  const dispatch = useDispatch()

  const [reviewRating, setReviewRating] = useState(review.rating)
  const [reviewBody, setReviewBody] = useState(review.body)

  const [
    updateReview,
    {
      isSuccess: updateReviewSuccess,
      isError: updateReviewIsError,
      error: updateReviewError,
    },
  ] = useUpdateReviewMutation()

  const handleReviewUpdate = (e) => {
    e.preventDefault()
    const data = { rating: reviewRating, product: product.pk }
    if (reviewBody) {
      data.body = reviewBody
    }
    dispatch(updateReview(data))
  }

  useEffect(() => {
    if (updateReviewSuccess) {
      setShowUpdate(false)
      setMessage({ text: "Review updated", variant: "success", error: null })
    }
    if (updateReviewIsError) {
      setMessage({ text: "", variant: "danger", error: updateReviewError })
    }
  }, [updateReviewSuccess, updateReviewIsError])

  return (
    <ListGroup.Item>
      <p>You left a review: </p>
      <Form onSubmit={handleReviewUpdate}>
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
            value={reviewBody}
            rows={5}
            onChange={(e) => setReviewBody(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="my-3" type="submit" variant="primary">
          Update
        </Button>
        <DeleteReviewButton product={product} setMessage={setMessage} />
      </Form>
    </ListGroup.Item>
  )
}

export default ReviewUpdate
