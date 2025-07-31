import Layout from "./Layout";
import "../styles/AdminPanel.css"
import { useState } from "react";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
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
    const [messageType, setMessageType] = useState("");


    const createProduct  = async (prodData) => {
        const createdAt = Date.now ()
        const updatedAt = Date.now ()
        const deletedAt = null;
        const createdBy = user.uid;
        const createdByName = user.displayName || user.email;

        const productosRef = collection(db, "productos")
        try{
            const productRef = await addDoc(productosRef, {createdAt, updatedAt, deletedAt, createdBy, createdByName, ...prodData})
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

    const handleImage = async (e) => {
        const file = e.target.files[0];

        if (file.size > 5000000) {
            alert("La imagen debe pesar menos de 5 MB.");
            return;
        }

        const reader = new FileReader();

        try {
            const compressed = await compressImage(file, 600, 0.7);
            setImage(compressed);
        } catch (err) {
            console.log("e", err)
            setMessageType("error");
            setMessage("Error al subir la imagen");
        }

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

        const sku = await generateSKU();
        const newProd = {name, price, desc, sku, image: image || DEF_IMG.default};

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

    const generateSKU = async () => {
        const now = new Date();
        const MM = String(now.getMonth() + 1).padStart(2, "0");
        const YY = String(now.getFullYear()).slice(-2);
        const prefix = `${MM}${YY}-PRL-`;

        let sku;
        let exists = true;

        while (exists) {
            const randomNum = Math.floor(10000 + Math.random() * 90000);
            sku = `${prefix}${randomNum}`;

            
            const productosRef = collection(db, "productos");
            const res = query(productosRef, where("sku", "==", sku));
            const snapshot = await getDocs(res);
            exists = !snapshot.empty;
        }

        return sku;
    };

    const compressImage = (file, maxWidth = 600, quality = 0.7) => {
        return new Promise((resolve, reject) => {
            const img = new window.Image();
            const reader = new FileReader();

            reader.onload = (e) => {
                img.src = e.target.result;
            };

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const scale = Math.min(maxWidth / img.width, 1);
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
                resolve(compressedBase64);
            };

            img.onerror = reject;
            reader.onerror = reject;

            reader.readAsDataURL(file);
        });
    };

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