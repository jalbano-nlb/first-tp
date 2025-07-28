import Layout from "./Layout";
import "../styles/AdminPanel.css"
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase"
import * as DEF_IMG from "../assets/defaultImage"
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



const AdminPanel = () => {

    const {user} = useAuth();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // 'success' | 'error'


    const createProduct  = async (prodData) => {
        const createdAt = Date.now ()
        const updatedAt = Date.now ()
        const deletedAt = null;
        const createdBy = user.uid;
        const productosRef = collection(db, "productos")
        try{
            const productRef = await addDoc(productosRef, {createdAt, updatedAt, deletedAt, createdBy, ...prodData})
            cleanForm();
            return productRef
        } catch(err){
            console.log("Saving error: ", err);
        }
    }

    const handleName = (ev) => {
        setName(ev.target.value)
    }

    const handleDesc = (ev) => {
        setDesc(ev.target.value)
    }

    const handlePrice = (ev) => {
        setPrice(ev.target.value)
    }

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file.size > 5000000) {
            alert("La imagen debe pesar menos de 5 MB.");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result); // base64
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (ev) =>{
        ev.preventDefault()
        
        if (name.length <= 2) {
            console.log("El nombre debe tener mas de dos caracteres")
            return
        }

        if (price <= 0) {
            console.log("El precio debe ser mayor a 0")
            return
        }

        const newProd = {name, price, desc, image: image || DEF_IMG.default};

        try {
            await createProduct(newProd)
            setMessage("Producto creado exitosamente");
            setMessageType("success");
        } catch (error) {
            console.log("E:", error)
            setMessage("Error al crear producto");
            setMessageType("error");
        }
        setTimeout(() => setMessage(""), 4000);
    }

    const cleanForm = () => {
        setName("");
        setDesc("");
        setPrice(0);
        setImage("");
    }

    return (
        <Layout>
            <div className="form-container">
                <div className="form-back">
                    <Link to="/">← Volver</Link>
                </div>
            
                <div className="create-product-cont">
                    <div className="create-product-card">
                        <h2>Alta de Producto</h2>
                        <div style={{ minHeight: "2.5rem" }}>
                            {message && (
                            <div className={`form-message ${messageType}`}>
                                {message}
                            </div>
                            )}
                        </div>
                        <form className="create-product-form" onSubmit={handleSubmit}>
                            <label>
                                Nombre del producto:
                                <input type="text" id="name" name="name" onChange={handleName} value={name} required />
                            </label>
                            <label>
                                Precio:
                                <input type="number" name="price" id="price" onChange={handlePrice} step="0.01" value={price} required />
                            </label>
                            <label>
                                Descripción:
                                <textarea name="desc" id="desc" onChange={handleDesc} rows="4" value={desc} required></textarea>
                            </label>

                            <label>
                                Imagen del producto:
                                <input type="file" accept="image/*" onChange={handleImage} />
                            </label>
                            {image && (
                                <img
                                    src={image || DEF_IMG.default}
                                    alt="Vista previa"
                                    style={{ maxWidth: "150px", marginTop: "1rem", borderRadius: "6px" }}
                                />
                            )}


                            <button type="submit">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminPanel;