import { useEffect, useState } from "react";
import "../styles/Main.css";
import { Link } from "react-router-dom";
import { db } from "../config/firebase"
import { collection, getDocs } from "firebase/firestore"
import { useAuth } from "../context/AuthContext";
import { FiFilter, FiShoppingCart } from "react-icons/fi";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [showOwn, setShowOwn] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
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

  const filteredProducts = showOwn && user
    ? products.filter((prod) => prod.createdBy === user.uid)
    : products;

  return (
    <>
      <section className="main-banner">
        <div className="main-banner-content">
          <FiShoppingCart className="main-banner-icon" />
          <h1 className="main-title">Bienvenidos a Noalbits</h1>
          <p className="main-subtitle">Tu tienda online para comprar y vender productos fácilmente.</p>
          {
            !user && 
              <Link to="/register" className="main-banner-btn">
                ¡Comenzá ahora!
              </Link>
          }
        </div>
      </section>

      {user && 
        <div className="main-filter-bar">
          <button className="filter-btn" onClick={() => setShowOwn((prev) => !prev)}>
            <FiFilter style={{ marginRight: "6px" }} />
            {showOwn ? "Ver todos los productos" : "Ver solo mis productos"}
          </button>
        </div>
      }
      <section className="main-product-list">
        {error && <p className="main-error">{error}</p>}
        {filteredProducts.length === 0 && !error && <p className="main-info">No hay productos para mostrar</p>}
        {filteredProducts.slice(0,visibleCount).map((product) => (
           <div className="main-product" key={product.id}>
            {product.image && <img src={product.image} alt={`Imagen de ${product.name}`} />}
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <div className="main-product-buttons">
              <Link className="btn-nlb" to={`/productDetail/${product.id}`}>Comprar</Link>
              {
                user && product.createdBy === user.uid &&
                  <Link className="btn-nlb edit-btn" to={`/editProduct/${product.id}`}>Editar</Link>
              }
            </div>
          </div>

        ))}
      </section>
      {visibleCount < filteredProducts.length && 
        <div className="main-see-more-bar">
          <button className="see-more-btn" onClick={() => setVisibleCount(visibleCount + 4)}>
            Ver más
          </button>
        </div>
      }
    </>
  );
};

export default Main;
