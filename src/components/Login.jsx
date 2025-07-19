import '../styles/Login.css';
import Layout from './Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
     
    try {
      login(email, password)
      if (!user) {
        setMessageType("error");
        setMessage("Usuario o contraseña incorrectos")
        setTimeout(()=>{setMessage("")}, 2000)
        return;
      }
      navigate("/");
    } catch (e) {
      setMessageType("error");
      setMessage("Error al conectar con el servidor")
      console.log(e)
    }
    
  };

  const handlePassword = (ev) => {
        setPassword(ev.target.value)
  }

  const handleEmail = (ev) => {
        setEmail(ev.target.value)
  }


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
              <input type="email" name="email" onChange={handleEmail} value={email} placeholder='example@correo.com' required />
            </label>
            <label>Contraseña:
              <input type="password" name="password" onChange={handlePassword} value={password} placeholder="********" required />
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
