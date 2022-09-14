import React from "react"
import { Row, Col } from "react-bootstrap"
import dogs from "../dogs"
import Dog from "../components/Dog"

const DogListScreen = () => {
  return (
    <>
      <h1>Top doggos</h1>
      <Row>
        {dogs.map((dog) => (
          <Col key={dog._id} sm={12} md={6} lg={4} xl={3}>
            <Dog dog={dog} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default DogListScreen
