import React from "react"
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useDeleteCartItemMutation } from "../slices/apiSlice"

const RemoveFromCartButton = ({ product }) => {
  const dispatch = useDispatch()
  const [deleteCartItem] = useDeleteCartItemMutation()

  return (
    <Button
      type="button"
      variant="light"
      onClick={() => dispatch(deleteCartItem({ product: product.pk }))}
    >
      Remove <i className="fas fa-trash"></i>
    </Button>
  )
}

export default RemoveFromCartButton
