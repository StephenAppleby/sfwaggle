import React from "react"

const Rating = ({ rating, numReviews }) => {
  const get_star = (i) => {
    return (
      <span>
        <i
          style={{ color: "#EFBB00" }}
          className={
            rating >= i
              ? "fas fa-star"
              : rating >= i - 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
    )
  }
  return (
    <div className="rating">
      {get_star(1)}
      {get_star(2)}
      {get_star(3)}
      {get_star(4)}
      {get_star(5)}
      {numReviews !== null && numReviews > 0 && (
        <span> out of {numReviews} ratings</span>
      )}
      {numReviews !== null && numReviews === 0 && <span> No reviews yet</span>}
    </div>
  )
}

export default Rating
