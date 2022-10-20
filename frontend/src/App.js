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
import ProfileScreen from "./screens/ProfileScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import { useSelector } from "react-redux"
import WrongWayScreen from "./screens/WrongWayScreen"

function App() {
  const token = useSelector((state) => state.account.token)

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
            <Route path="/dog-list" element={<DogListScreen />} />
            <Route path="/dog/:id" element={<DogScreen />} />
            <Route path="/products" element={<ProductListScreen />} />
            <Route path="/product/:pk" element={<ProductScreen />} />
            // Protected routes
            <Route
              path="/cart"
              element={
                token ? <CartScreen /> : <WrongWayScreen redirect="/cart" />
              }
            />
            <Route
              path="/profile"
              element={
                token ? (
                  <ProfileScreen />
                ) : (
                  <WrongWayScreen redirect="/profile" />
                )
              }
            />
            <Route
              path="/shipping"
              element={
                token ? (
                  <ShippingScreen />
                ) : (
                  <WrongWayScreen redirect="/shipping" />
                )
              }
            />
            <Route
              path="/payment"
              element={
                token ? (
                  <PaymentScreen />
                ) : (
                  <WrongWayScreen redirect="/payment" />
                )
              }
            />
            <Route
              path="/placeorder"
              element={
                token ? (
                  <PlaceOrderScreen />
                ) : (
                  <WrongWayScreen redirect="/placeorder" />
                )
              }
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
