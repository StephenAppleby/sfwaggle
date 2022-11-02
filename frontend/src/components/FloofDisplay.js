import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import {
  useFetchUserInfoQuery,
  useFloofDogToggleMutation,
} from "../slices/apiSlice"

const FloofDisplay = ({ value, dogPk }) => {
  const [floofs, setFloofs] = useState(value)
  const [color, setColor] = useState("#B84")
  const token = useSelector((state) => state.account.token)

  const skip = !token ? true : false

  const { data: userInfo, isSuccess: userInfoSuccess } = useFetchUserInfoQuery(
    {},
    { skip }
  )

  const [floofDogToggle, { data: floofMessage, isSuccess: floofSuccess }] =
    useFloofDogToggleMutation()

  useEffect(() => {
    if (userInfoSuccess) {
      if (userInfo.dogsFloofed.includes(dogPk)) {
        setColor("#B30")
      }
    }
    if (floofSuccess) {
      if (floofMessage === "Floof removed") {
        setFloofs(floofs - 1)
        setColor("#B84")
      } else if (floofMessage === "Floof added") {
        setFloofs(floofs + 1)
        setColor("#B30")
      }
    }
  }, [floofSuccess, floofMessage, userInfoSuccess, userInfo])

  return (
    <div className="floofDisplay" onClick={() => floofDogToggle(dogPk)}>
      <span>
        <i style={{ color }} className="fa-solid fa-paw" /> {floofs} floofs
      </span>
    </div>
  )
}

FloofDisplay.propTypes = {
  value: PropTypes.number.isRequired,
}

export default FloofDisplay
