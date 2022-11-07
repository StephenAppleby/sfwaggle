import React from "react"
import { useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDeleteReviewMutation } from "../slices/apiSlice"

const DeleteReviewButton = ({ product, setMessage }) => {
  const [deleteReview, { data, isSuccess, isError, error }] =
    useDeleteReviewMutation()

  useEffect(() => {
    if (isSuccess) {
      setMessage({ text: data, variant: "success", error: null })
    }
    if (isError) {
      setMessage({ text: "", variant: "danger", error: error })
    }
  }, [isSuccess, isError])

  return (
    <Button
      className="m-3"
      variant="danger"
      onClick={() => deleteReview({ product: product.pk })}
    >
      Delete
    </Button>
  )
}

export default DeleteReviewButton
