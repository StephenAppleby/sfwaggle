import React, { useState } from "react"
import { ListGroup } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useFetchUserInfoQuery } from "../slices/apiSlice"
import Message from "./Message"
import Review from "./Review"
import ReviewSubmit from "./ReviewSubmit"
import ReviewUpdate from "./ReviewUpdate"

const ReviewSection = ({ product }) => {
  const [message, setMessage] = useState({ text: "", variant: "", error: null })
  const [showUpdate, setShowUpdate] = useState(false)

  const reviews = [...product.reviews]

  const token = useSelector((state) => state.account.token)

  const skip = !token ? true : false

  const { data: userInfo, isSuccess: userInfoSuccess } = useFetchUserInfoQuery(
    {},
    { skip }
  )

  const userEligibleToReview = userInfoSuccess
    ? userInfo.productsEligibleForReview.includes(product.pk)
    : false

  const userHasReview = userInfoSuccess
    ? reviews
        .map((review) => review.user)
        .some((user) => user === userInfo.email.split("@")[0])
    : false

  const userReview = userHasReview
    ? reviews.splice(
        reviews.findIndex(
          (review) => review.user === userInfo.email.split("@")[0]
        ),
        1
      )[0]
    : null

  return (
    <>
      <h2>Reviews</h2>
      {message.text !== "" || message.error !== null ? (
        <Message error={message.error} variant={message.variant}>
          {message.text}
        </Message>
      ) : (
        <></>
      )}
      {reviews.length === 0 && <p>No reviews yet</p>}
      <ListGroup>
        {userEligibleToReview && !userHasReview && (
          <ReviewSubmit setMessage={setMessage} product={product} />
        )}
        {userHasReview && showUpdate && (
          <ReviewUpdate
            product={product}
            setMessage={setMessage}
            review={userReview}
            setShowUpdate={setShowUpdate}
          />
        )}
        {userHasReview && !showUpdate && (
          <Review
            product={product}
            setMessage={setMessage}
            review={userReview}
            isUserReview={true}
            setShowUpdate={setShowUpdate}
          />
        )}
        {reviews
          .filter((review) => review.body)
          .map((review, index) => (
            <Review review={review} key={index} />
          ))}
      </ListGroup>
    </>
  )
}

export default ReviewSection
