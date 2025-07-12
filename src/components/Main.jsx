import { useEffect, useState } from "react";
import "../styles/Main.css";
import { Link } from "react-router-dom";
import { db } from "../config/firebase"
import { collection, getDocs, doc, addDoc } from "firebase/firestore"

const Main = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {

     try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError("Ocurrió un error al cargar los productos. | " + err);
      console.log(error);
    }

    //IMPLEMENTO FIREBASE
    // const productosRef = collection(db, "productos")
    // const snapshot = await getDocs(productosRef)
    // const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    // setProducts(docs)
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="main">
      <section className="main-banner">
        <h1 className="main-title">Bienvenidos a Noalbits</h1>
      </section>

      <section className="main-product-list">
        {error && <p className="main-error">{error}</p>}
        {products.length === 0 && !error && <p className="main-info">No hay productos para mostrar</p>}
        {products.map((product) => (
          <div className="main-product" key={product.id}>
            <img src={product.image} alt={`Imagen del producto ${product.title}`} />
            <h2>{product.title}</h2>
            <p>${product.price}</p>
            <Link className="btn-nlb" to={`/productDetail/${product.id}`}>Comprar</Link>
            
          </div>
        ))}
      </section>
    </main>
  );
};

export default Main;
