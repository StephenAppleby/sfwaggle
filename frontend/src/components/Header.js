import Container from "react-bootstrap/Container"
import { LinkContainer } from "react-router-bootstrap"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/" >
            <Navbar.Brand>Sfwaggle</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/accessory-list">
                <Nav.Link><i className="fa-solid fa-bone"></i>Accessories</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/dog-list">
                <Nav.Link><i className="fa-solid fa-dog"></i>Dogs</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login" >
                <Nav.Link><i className="fas fa-user"></i>Log in</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header