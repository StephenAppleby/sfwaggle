import React from "react"
import { Card, ListGroup } from "react-bootstrap"
import Rating from "./Rating"

const Review = ({ review }) => {
  return (
    <>
      <ListGroup.Item>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <p>{review.user}</p>
              <Rating rating={review.rating} />
            </ListGroup.Item>
            <ListGroup.Item>
              <p>{review.body}</p>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </ListGroup.Item>
    </>
  )
}

export default Review
