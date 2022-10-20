import React from "react"
import { Alert } from "react-bootstrap"

const Message = ({ variant, error, children }) => {
  if (error) {
    return error.data.summaries.map((errSum, index) => (
      <Alert key={index} variant="danger">
        {errSum}
      </Alert>
    ))
  }
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: "info",
}

export default Message
