
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";
import Layout from "./Layout";
import { useEffect, useState } from "react";

const ProductDetail = () => {

  const {prodId} = useParams();
  const [product, setProduct] = useState(null)  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
        try {
          
          const response = await fetch(`https://fakestoreapi.com/products/${prodId}`);
          const data = await response.json();
          setProduct(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    }, [prodId]);

    
  
    if (loading) return <div className="loading-message">Cargando el detalle de los productos...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;
    if (!product) return <div className="not-found">Producto no encontrado</div>;

  return (
    <Layout>
      <div className="product-detail-container">
        <div className="product-detail-card">
          <div className="product-detail-img-wrapper">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-detail-info">
            <h1>{product.title}</h1>
            <p className="product-detail-price">${product.price}</p>
            <p className="product-detail-description">{product.description}</p>
            <button>Comprar</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
