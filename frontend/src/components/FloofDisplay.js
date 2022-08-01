import React from 'react'
import PropTypes from 'prop-types'

const FloofDisplay = ({ value, color }) => {
  return (
    <div className="floofDisplay">
      <span><i style={{ color }} className="fa-solid fa-paw" /> {value} floofs</span>
    </div>
  )
}

FloofDisplay.defaultProps = {
  color: "#C50"
}

FloofDisplay.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string
}

export default FloofDisplay