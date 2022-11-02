import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import {
  useFetchUserInfoQuery,
  useFloofDogToggleMutation,
} from "../slices/apiSlice"
import { useLocation, useNavigate } from "react-router-dom"

const FloofDisplay = ({ value, dogPk }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const token = useSelector((state) => state.account.token)

  const skip = !token ? true : false

  const { data: userInfo, isSuccess: userInfoSuccess } = useFetchUserInfoQuery(
    {},
    { skip }
  )

  const unfloofedColor = "#B84"
  const floofedColor = "#B30"

  let color = unfloofedColor

  if (userInfoSuccess) {
    if (userInfo.dogsFloofed.includes(dogPk)) {
      color = floofedColor
    }
  }

  const [floofDogToggle] = useFloofDogToggleMutation()

  const handleFloof = () => {
    if (token) {
      floofDogToggle(dogPk)
    } else {
      navigate(`/login?redirect=${location.pathname}`)
    }
  }

  return (
    <div className="floofDisplay" onClick={handleFloof}>
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
