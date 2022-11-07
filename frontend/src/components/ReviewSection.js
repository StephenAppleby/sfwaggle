import React from "react"
import { ListGroup } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useFetchUserInfoQuery } from "../slices/apiSlice"
import Review from "./Review"
import ReviewSubmit from "./ReviewSubmit"
import ReviewUpdate from "./ReviewUpdate"

const ReviewSection = ({ product }) => {
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
      {reviews.length === 0 && <p>No reviews yet</p>}
      <ListGroup>
        {userHasReview && (
          <ReviewUpdate product={product} review={userReview} />
        )}
        {userEligibleToReview && !userHasReview && (
          <ReviewSubmit product={product} />
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
