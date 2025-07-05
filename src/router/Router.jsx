import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterNew from "../components/RegisterNew"
import Login from "../components/Login"
import Home from "../components/Home"
import ProductDetail from "../components/ProductDetail"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterNew />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productDetail/:prodId" element={<ProductDetail/>}/>
        <Route path="*" element={<img src="https://mylittlebigweb.com/wp-content/uploads/2024/01/erreur-404-jpg.webp" />} />
      </Routes>
    </BrowserRouter>
  )
}

export { Router }