import React from "react"
import { Col, Image, ListGroup, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import RemoveFromCartButton from "./RemoveFromCartButton"

const ItemsSummary = ({ items }, { isCart }) => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <Row>
          <Col md={2}>
            <h5>Item</h5>
          </Col>
          <Col md={5}></Col>
          <Col md={1}>
            <h5>Qty</h5>
          </Col>
          <Col md={1}>
            <h5>Price</h5>
          </Col>
          <Col md={1}>
            <h5>Subtotal</h5>
          </Col>
          <Col md={2}></Col>
        </Row>
      </ListGroup.Item>
      {items.map((item, index) => (
        <ListGroup.Item key={index}>
          <Row>
            <Col md={2}>
              <Image
                src={item.product.image}
                alt={item.product.name}
                fluid
                rounded
              />
            </Col>
            <Col md={5}>
              <Link to={`/product/${item.product.pk}`}>
                {item.product.name}
              </Link>
            </Col>
            <Col md={1}>{item.qty}</Col>
            <Col md={1}>${item.product.price}</Col>
            <Col md={1}>
              $
              {(Math.round(item.qty * item.product.price * 100) / 100).toFixed(
                2
              )}
            </Col>
            {isCart && (
              <Col md={2}>
                <RemoveFromCartButton product={item.product} />
              </Col>
            )}
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default ItemsSummary
