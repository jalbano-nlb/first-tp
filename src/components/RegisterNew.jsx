import { Link } from 'react-router-dom';
import '../styles/RegisterNew.css'
import Layout from './Layout';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function RegisterNew() {

  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //TODO hacer validaciones correspondientes
    const passwordsMatch = password === passwordConfirm;

    if (!passwordsMatch) {
      setMessage("Las contraseñas no coinciden");
      setMessageType("error");
      return;
    }

    try {
      await register(email, password);
      setMessageType("success")
      setMessage("Usuario creado exitosamente")
      setTimeout( setMessage("Redirigiendo al login"),2500)
      setTimeout( setMessageType("info"),4000)
    } catch (error) {
      console.log(error)
    }

  };

  const handleName = (ev) => {
        setName(ev.target.value)
  }

  const handleSurName = (ev) => {
        setSurName(ev.target.value)
  }

  const handlePassword = (ev) => {
        setPassword(ev.target.value)
  }

  const handlePasswordConfirm = (ev) => {
        setPasswordConfirm(ev.target.value)
  }

  const handleEmail = (ev) => {
        setEmail(ev.target.value)
  }

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
              <input type="text" name="name" onChange={handleName} value={name} placeholder="Ej: Lionel" required />
            </label>
            <label>
              Apellido:
              <input type="text" name="surName" onChange={handleSurName} value={surName} placeholder="Ej: Messi" required />
            </label>
            <label>
              Email:
              <input type="email" name="email" onChange={handleEmail} value={email}  placeholder="example@correo.com" required />
            </label>
            <label>
              Contraseña:
              <input type="password" name="password" onChange={handlePassword} value={password} placeholder="********" required />
            </label>
            <label>
              Confirmar Contraseña:
              <input type="password" name="confirmPassword" onChange={handlePasswordConfirm} value={passwordConfirm} placeholder="********" required />
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
