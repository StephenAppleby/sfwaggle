import React from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap"
import FloofDisplay from '../components/FloofDisplay'
import dogs from '../dogs'


const DogScreen = () => {
  const params = useParams()
  const navigate = useNavigate()

  const dog = dogs.find(d => d._id === params.id)

  return (
    <>
      <Button className="my-3" onClick={() => navigate(-1)}>Go back</Button>
      <Row>
        <Col md={6}>
          <Image src={dog.image} alt={dog.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{dog.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <FloofDisplay value={dog.floofs} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${dog.price}
            </ListGroup.Item>
            <ListGroup.Item>
              {dog.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default DogScreen