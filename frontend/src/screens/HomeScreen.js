import React from "react"
import { Col, ListGroup, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import Dog from "../components/Dog"
import LoadingSpinner from "../components/LoadingSpinner"
import Message from "../components/Message"
import { useFetchDogsQuery } from "../slices/apiSlice"

const HomeScreen = () => {
  const {
    data: dogs,
    isSuccess: dogsIsSuccess,
    isFetching: dogsIsFetching,
    isError: dogsIsError,
    error: dogsError,
  } = useFetchDogsQuery()

  const top3doggos = dogsIsSuccess
    ? [...dogs].sort((a, b) => a.floofs < b.floofs).slice(0, 3)
    : []

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Link to={"/dogs"}>
            <h1>Dogs</h1>
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <p>
            At Sfwaggle, we manage a small range of precious puppers whose
            owners have trusted them to us to find them their new home.
          </p>
          <p>
            You can browse our doggos on our <Link to={"/dogs"}>dogs page</Link>{" "}
            but in order to really get to know them, or to make inquiries,
            please visit our store.
          </p>
          <p>
            If you love the look of one of our fluffy heros, you can show your
            affection by leaving a floof!
          </p>
        </ListGroup.Item>
        {dogsIsFetching && <LoadingSpinner />}
        {dogsIsError && <Message error={dogsError} />}
        {dogsIsSuccess && (
          <ListGroup.Item>
            <Row>
              {top3doggos.map((dog) => (
                <Col key={dog.pk} sm={12} md={6} lg={4} xl={3}>
                  <Dog dog={dog} />
                </Col>
              ))}
            </Row>
          </ListGroup.Item>
        )}

        <ListGroup.Item>
          <Link to={"/products"}>
            <h1>Accessories</h1>
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <p>
            We also stock a wide range of dog accessory products from a select
            range of trusted brands.
          </p>
          <p>
            Order online to have all your doggy treats and toys delivered to
            your doorstep!
          </p>
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}

export default HomeScreen
