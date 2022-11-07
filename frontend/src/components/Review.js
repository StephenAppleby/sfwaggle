import React from "react"
import { Button, Card, ListGroup } from "react-bootstrap"
import DeleteReviewButton from "./DeleteReviewButton"
import Rating from "./Rating"

const Review = ({
  review,
  isUserReview,
  setShowUpdate,
  product,
  setMessage,
}) => {
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
              {isUserReview && (
                <>
                  <Button
                    className="my-3"
                    variant="primary"
                    onClick={setShowUpdate}
                  >
                    Update
                  </Button>
                  <DeleteReviewButton
                    product={product}
                    setMessage={setMessage}
                  />
                </>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </ListGroup.Item>
    </>
  )
}

export default Review
