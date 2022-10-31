import Container from "react-bootstrap/Container"
import { LinkContainer } from "react-router-bootstrap"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { NavDropdown } from "react-bootstrap"
import {
  useFetchCartQuery,
  useFetchUserInfoQuery,
  useLogoutMutation,
} from "../slices/apiSlice"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.account.token)

  const skip = !token ? true : false

  const { data: userInfo, isSuccess: userInfoSuccess } = useFetchUserInfoQuery(
    {},
    { skip }
  )
  const { data: cartItems, isSuccess: cartSuccess } = useFetchCartQuery(
    {},
    {
      skip,
    }
  )

  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    dispatch(logout(token))
    navigate("/")
  }

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
              <LinkContainer to="/dogs">
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
                {userInfoSuccess ? (
                  <NavDropdown title={userInfo.email} id="username">
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate("/orders")}>
                      Orders
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
