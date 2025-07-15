import { Link } from 'react-router-dom';
import '../styles/RegisterNew.css'
import Layout from './Layout';
import { useState } from 'react';

function RegisterNew() {

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' | 'error'

  const handleSubmit = (e) => {
    e.preventDefault();

    //valido al menos la contrasenia. Lógica real pendiente
    const passwordsMatch = true;

    if (!passwordsMatch) {
      setMessage("Error al crear producto");
      setMessageType("error");
      return;
    }
    // Suponiendo envío exitoso...
    setMessage("Producto creado exitosamente");
    setMessageType("success");
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <Layout>
      <div className="register-cont">
        <div className="register-card">
          <h2>Registro de Usuario</h2>
          <div style={{ minHeight: "2.5rem" }}>
            {message && (
              <div className={`form-message ${messageType}`}>
                {message}
              </div>
            )}
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <label>
              Nombre:
              <input type="text" name="nombre" placeholder="Ej: Lionel" required />
            </label>
            <label>
              Apellido:
              <input type="text" name="apellido" placeholder="Ej: Messi" required />
            </label>
            <label>
              Email:
              <input type="email" name="email" placeholder="example@correo.com" required />
            </label>
            <label>
              Contraseña:
              <input type="password" name="password" placeholder="********" required />
            </label>
            <label>
              Confirmar Contraseña:
              <input type="password" name="confirmPassword" placeholder="********" required />
            </label>

            <button type="submit">Registrarse</button>
            {message && ( <div className="register-message">{message}</div>)}
          </form>
          <p className="register-footer">¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
        </div>
      </div>
    </Layout>
  );
}

export default RegisterNew;
