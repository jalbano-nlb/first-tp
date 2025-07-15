import '../styles/Login.css';
import Layout from './Layout';
import { useState } from 'react';


function Login() {

  // const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' | 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Login Auth
    // setError("Funcionalidad no implementada.");
    // setMessage("Funcionalidad no implementada.");
    // setMessageType("success");

    setMessage("Funcionalidad no implementada.");
    setMessageType("error");
    setTimeout(() => setMessage(""), 4000);
  };

  return (
      <Layout>
      <div className="login-cont">
        <div className="login-card">
          <h2>Iniciar Sesión</h2>
          <p className="login-subtitle">Accedé a tu cuenta para continuar</p>
          <div style={{ minHeight: "2.5rem" }}>
            {message && (
              <div className={`form-message ${messageType}`}>
                {message}
              </div>
            )}
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>Email:
              <input type="email" name="email" placeholder='example@correo.com' required />
            </label>
            <label>Contraseña:
              <input type="password" name="password" placeholder="********" required />
            </label>
            <button type="submit">Ingresar</button>
          </form>
          <p className="login-register-link">
            ¿No tenés cuenta? <a href="/register">Registrate acá</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
