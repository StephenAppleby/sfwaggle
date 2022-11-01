import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { useFetchUserInfoQuery } from "../slices/apiSlice"

const FloofDisplay = ({ value, dogPk }) => {
  const token = useSelector((state) => state.account.token)

  const skip = !token ? true : false

  const { data: userInfo, isSuccess: userInfoSuccess } = useFetchUserInfoQuery(
    {},
    { skip }
  )

  let color = "#C50"

  if (userInfoSuccess) {
    if (userInfo.dogsFloofed.includes(dogPk)) {
      color = "#D20"
    }
  }

  return (
    <div className="floofDisplay">
      <span>
        <i style={{ color }} className="fa-solid fa-paw" /> {value} floofs
      </span>
    </div>
  )
}

FloofDisplay.propTypes = {
  value: PropTypes.number.isRequired,
}

export default FloofDisplay
