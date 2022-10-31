import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import DogListScreen from "./screens/DogListScreen"
import DogScreen from "./screens/DogScreen"
import ProductListScreen from "./screens/ProductListScreen"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import { useSelector } from "react-redux"
import WrongWayScreen from "./screens/WrongWayScreen"
import OrderScreen from "./screens/OrderScreen"
import OrderListScreen from "./screens/OrderListScreen"

function App() {
  const token = useSelector((state) => state.account.token)

  const protectedRoute = (path, element) => {
    return (
      <Route
        path={path}
        element={token ? element : <WrongWayScreen redirect={path} />}
      />
    )
  }

  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            // Public routes
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/dogs" element={<DogListScreen />} />
            <Route path="/dog/:id" element={<DogScreen />} />
            <Route path="/products" element={<ProductListScreen />} />
            <Route path="/product/:pk" element={<ProductScreen />} />
            // Protected routes
            {protectedRoute("/cart", <CartScreen />)}
            {protectedRoute("/shipping", <ShippingScreen />)}
            {protectedRoute("/payment", <PaymentScreen />)}
            {protectedRoute("/placeorder", <PlaceOrderScreen />)}
            {protectedRoute("/orders/:pk", <OrderScreen />)}
            {protectedRoute("/orders", <OrderListScreen />)}
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
