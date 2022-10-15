import Container from "react-bootstrap/Container"
import { LinkContainer } from "react-router-bootstrap"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { NavDropdown } from "react-bootstrap"
import { logout } from "../slices/accountSlice"
import { useFetchCartQuery } from "../slices/apiSlice"

const Header = () => {
  const dispatch = useDispatch()
  const account = useSelector((state) => state.account)

  const { data: cartItems, isSuccess: cartSuccess } = useFetchCartQuery()

  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Sfwaggle</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/products">
                <Nav.Link>
                  <i className="fa-solid fa-bone"></i>Products
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/dog-list">
                <Nav.Link>
                  <i className="fa-solid fa-dog"></i>Dogs
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>
                  Cart
                  {cartSuccess ? `(${cartItems.length})` : 0}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                {account.user ? (
                  <NavDropdown title={account.user.email} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item
                      onClick={() => dispatch(logout(account.token))}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link>
                    <i className="fas fa-user"></i>Log in
                  </Nav.Link>
                )}
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
