import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import DogListScreen from "./screens/DogListScreen"
import DogScreen from "./screens/DogScreen"
import ProductListScreen from "./screens/ProductListScreen"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen"

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/dog-list" element={<DogListScreen />} />
            <Route path="/dog/:id" element={<DogScreen />} />
            <Route path="/products" element={<ProductListScreen />} />
            <Route path="/product/:pk" element={<ProductScreen />} />
            <Route path="/cart/:pk" element={<CartScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
