import { useEffect, useState } from "react";
import "../styles/Main.css";
import { Link } from "react-router-dom";
import { db } from "../config/firebase"
import { collection, getDocs } from "firebase/firestore"
import { useAuth } from "../context/AuthContext";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchProducts = async () => {

    try {
      const productosRef = collection(db, "productos");
      const prodSnapshot = await getDocs(productosRef);
      const productList = prodSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })).filter((prod) => prod.deletedAt === null);

      setProducts(productList);

    } catch (err) {
      setError("Ocurrió un error al cargar productos: " + err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <section className="main-banner">
        <h1 className="main-title">Bienvenidos a Noalbits</h1>
      </section>

      <section className="main-product-list">
        {error && <p className="main-error">{error}</p>}
        {products.length === 0 && !error && <p className="main-info">No hay productos para mostrar</p>}
        {products.map((product) => (
           <div className="main-product" key={product.id}>
            {product.image && <img src={product.image} alt={`Imagen de ${product.name}`} />}
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <div className="main-product-buttons">
              <Link className="btn-nlb" to={`/productDetail/${product.id}`}>Comprar</Link>
              {
                user &&
                  <Link className="btn-nlb edit-btn" to={`/editProduct/${product.id}`}>Editar</Link>
              }
            </div>
          </div>

        ))}
      </section>
    </>
  );
};

export default Main;
