import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import FloofDisplay from "./FloofDisplay"

const Dog = ({ dog }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/dog/${dog.pk}`}>
        <Card.Img className="dog-card-image" src={dog.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/dog/${dog.pk}`}>
          <Card.Title as="div">
            <strong>{dog.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <FloofDisplay value={dog.floofs} dogPk={dog.pk} />
        </Card.Text>
        <Card.Text as="h3">${dog.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Dog
