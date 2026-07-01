import { Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"
import WishlistPage from "./pages/WishlistPage"
import LoginPage from "./pages/LoginPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import ScrollToTop from "./components/ScrollToTop"


function App() {

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
