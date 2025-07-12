import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterNew from "../components/RegisterNew"
import Login from "../components/Login"
import Home from "../components/Home"
import ProductDetail from "../components/ProductDetail"
import AdminPanel from "../components/AdminPanel"
import EditProduct from "../components/EditProduct"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterNew />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productDetail/:prodId" element={<ProductDetail/>}/>
        <Route path="/editProduct/:prodId" element={<EditProduct/>} />
        <Route path="*" element={<img src="https://mylittlebigweb.com/wp-content/uploads/2024/01/erreur-404-jpg.webp" />} />
      </Routes>
    </BrowserRouter>
  )
}

export { Router }