import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import "../styles/AdminPanel.css" //Utilizo el mismo que el de alta, son casi iguales. Agregué solamente estilos al boton editar


const EditProduct = () => {
    const { prodId } = useParams();
    const navigate = useNavigate();
    const handleBack = () => navigate("/");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");

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
        navigate("/");
        } catch (err) {
        console.log("Error al actualizar producto: ", err);
        }
    };

    const handleDelete = async () => {
        const confirm = window.confirm("¿Estás seguro de que querés eliminar este producto?");
        if (!confirm) return;

        try {
        const productRef = doc(db, "productos", prodId);
        await deleteDoc(productRef);
        navigate("/");
        } catch (err) {
        console.log("Error al eliminar producto: ", err);
        }
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

    return (
        <>
            <button className="back-btn" onClick={handleBack}>⬅ Volver</button>
            <div className="create-product-cont">
                <div className="create-product-card">
                    <h2>Editar Producto</h2>
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

                    <button type="submit">Guardar cambios</button>
                    <button type="button" style={{ marginTop: "1rem", backgroundColor: "#c0392b" }} onClick={handleDelete}>
                        Eliminar producto
                    </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditProduct;
