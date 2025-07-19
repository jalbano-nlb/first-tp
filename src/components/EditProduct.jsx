import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./Layout";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import * as DEF_IMG from "../assets/defaultImage"
import "../styles/AdminPanel.css"
import { useAuth } from "../context/AuthContext";


const EditProduct = () => {
    const { prodId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        const fetchProduct = async () => {
        const productRef = doc(db, "productos", prodId);
        const docSnap = await getDoc(productRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            setName(data.name);
            setPrice(data.price);
            setDesc(data.desc);
            setImage(data.image);
        } else {
            console.log("Producto no encontrado");
        }
        };

        fetchProduct();
    }, [prodId]);

    const handleUpdate = async (ev) => {
        ev.preventDefault();

        try {
            const productRef = doc(db, "productos", prodId);
            await updateDoc(productRef, {
                name,
                price,
                desc,
                image: image,
                updatedAt: Date.now()
            });
            setMessageType("success");
            setMessage("Producto editado exitosamente");
        } catch (err) {
            console.log("E: ", err);
            setMessageType("error");
            setMessage("Error al editar producto");
        }
        setTimeout(() => setMessage(""), 4000);
        setTimeout(() => navigate("/"), 5000);
    };

    const handleDelete = async () => {
        const confirm = window.confirm("¿Estás seguro de que querés eliminar este producto?");
        if (!confirm) return;

        try {
            const productRef = doc(db, "productos", prodId);
            await updateDoc(productRef, {
                deletedAt: Date.now()
            });
            setMessageType("success");
            setMessage("Producto editado exitosamente");
            navigate("/");
        } catch (err) {
            console.log("E: ", err);
            setMessageType("error");
            setMessage("Error al eliminar producto");
        }
        setTimeout(() => setMessage(""), 4000);
        setTimeout(() => navigate("/"), 5000);
        
    };

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

    return (
        <Layout>
            <div className="form-container">
                <div className="form-back">
                    <Link to="/">← Volver</Link>
                </div>
                <div className="create-product-cont">
                    <div className="create-product-card">
                        <h2>Editar Producto</h2>
                        {message && (
                            <div className={`form-message ${messageType}`}>
                                {message}
                            </div>
                        )}
                        <form className="create-product-form" onSubmit={handleUpdate}>
                        <label>
                            Nombre del producto:
                            <input type="text" value={name} onChange={handleName} required />
                        </label>
                        <label>
                            Precio:
                            <input type="number" value={price} onChange={handlePrice} step="0.01" required />
                        </label>
                        <label>
                            Descripción:
                            <textarea value={desc} onChange={handleDesc} rows="4" required />
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
                        <button type="submit">Guardar cambios</button>
                        {
                            user &&
                            <>
                                <button type="button" style={{ marginTop: "1rem", backgroundColor: "#c0392b" }} onClick={handleDelete}>
                                    Eliminar producto
                                </button>
                            </>
                        }
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default EditProduct;
