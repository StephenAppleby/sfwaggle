import React from "react"
import { Link } from "react-router-dom"

const WrongWayScreen = ({ redirect }) => {
  return (
    <>
      <h2>Oh no!</h2>
      <p>To access this page, you need to be signed in.</p>
      <p>
        <Link to={`/login?redirect=${redirect}`}>Log in</Link> to continue
      </p>
      <p>
        <Link to="/">Home</Link>
      </p>
    </>
  )
}

export default WrongWayScreen
