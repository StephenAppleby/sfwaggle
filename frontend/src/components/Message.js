import React from "react"
import { Alert } from "react-bootstrap"

const Message = ({ variant, error, children }) => {
  if (error) {
    if (error.data.summaries) {
      return error.data.summaries.map((errSum, index) => (
        <Alert key={index} variant="danger">
          {errSum}
        </Alert>
      ))
    } else {
      return (
        <Alert variant="danger">
          <p>Difficulty processing error. Original message:</p>
          {JSON.stringify(error)}
        </Alert>
      )
    }
  }
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: "info",
}

export default Message
