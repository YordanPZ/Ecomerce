import "./App.css"
import { HashRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ProductDetail from "./pages/ProductDetail"
import Purchases from "./pages/Purchases"
import NavBar from "./components/NavBar"
import SingUp from "./pages/SingUp"

function App() {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/singup" element={<SingUp />} />
      </Routes>
    </HashRouter>
  )
}

export default App
