import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap"
import FloofDisplay from "../components/FloofDisplay"
import { useFetchDogQuery } from "../slices/apiSlice"
import LoadingSpinner from "../components/LoadingSpinner"
import Message from "../components/Message"

const DogScreen = () => {
  const params = useParams()
  const navigate = useNavigate()

  const {
    data: dog,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useFetchDogQuery(params.id)

  console.log(dog)

  return (
    <>
      {isFetching && <LoadingSpinner />}
      {isError && <Message error={error} />}
      {isSuccess && (
        <>
          <Button className="my-3" onClick={() => navigate(-1)}>
            Go back
          </Button>
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
                <ListGroup.Item>Price: ${dog.price}</ListGroup.Item>
                <ListGroup.Item>{dog.description}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default DogScreen
