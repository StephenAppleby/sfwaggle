import React from "react"
import { Row, Col } from "react-bootstrap"
import Dog from "../components/Dog"
import LoadingSpinner from "../components/LoadingSpinner"
import Message from "../components/Message"
import { useFetchDogsQuery } from "../slices/apiSlice"

const DogListScreen = () => {
  const {
    data: dogs,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useFetchDogsQuery()
  return (
    <>
      <h1>Pre loved doggos</h1>
      {isFetching && <LoadingSpinner />}
      {isError && <Message error={error} />}
      {isSuccess && (
        <Row>
          {dogs.map((dog) => (
            <Col key={dog.pk} sm={12} md={6} lg={4} xl={3}>
              <Dog dog={dog} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default DogListScreen
