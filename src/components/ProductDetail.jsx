
import { useParams, Link } from "react-router-dom";
import "../styles/ProductDetail.css";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase"

const ProductDetail = () => {

  const {prodId} = useParams();

  const [product, setProduct] = useState(null)  
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchDetails = async () => {
        try {
          const productRef = doc(db, "productos", prodId);
          const docSnap = await getDoc(productRef);
          if (docSnap.exists()) {
            setProduct({ id: docSnap.id, ...docSnap.data() });
          } else {
            setError("Producto no encontrado");
          }
        } catch (err) {
          setError("Error al obtener producto: " + err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchDetails();
    }, [prodId]);

    const handleBuy = () => {
      setMessageType("info");
      setMessage("Función en desarrollo");
      setTimeout(() => setMessage(""), 4000);
    }
    
  
    if (loading) return <div className="loading-message">Cargando el detalle de los productos...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;
    if (!product) return <div className="not-found">Producto no encontrado</div>;

  return (
    <Layout>
      <div className="form-container">
        <div className="form-back">
          <Link to="/">← Volver</Link>
        </div>
        <div className="product-detail-container">
          <div className="product-detail-card">
            <div className="product-detail-img-wrapper">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-detail-info">
              <h1>{product.name}</h1>
              {product.sku && 
                <p className="product-detail-sku">
                  SKU: <span>{product.sku}</span>
                </p>
              }
              {product.createdByName && 
                <p className="product-detail-creator">
                  Creado por: <strong>{product.createdByName}</strong>
                </p>
              
              }
              <p className="product-detail-price">
                <span className="product-detail-price-label">PRECIO FINAL </span> 
                ${product.price}
              </p>
              <p className="product-detail-description">{product.desc}</p>
              <button onClick={handleBuy}>Comprar</button>
              <div style={{ minHeight: "2.5rem" }}>
                  {message && 
                    <div className={`form-message ${messageType}`}>
                        {message}
                    </div>
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
