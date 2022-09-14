import React from "react"

const ErrorDisplay = ({ error }) => {
  return (
    <>
      <h2>Oh no! Something went wrong!</h2>
      {error}
    </>
  )
}

export default ErrorDisplay
