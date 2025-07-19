import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { register, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordsMatch = password === passwordConfirm;

    if (!passwordsMatch) {
      setMessageType("error");
      setMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      await register(email, password);
      if (!user){
        setMessageType("error")
        setMessage("No se ha podido crear el usuario")
        return;
      }
      setMessageType("success")
      setMessage("Usuario creado exitosamente")
      setTimeout( ()=> {setMessageType("info")},700)
      setTimeout( ()=> {setMessage("Redirigiendo al Inicio")},700)
      setTimeout( ()=> {navigate("/")},  2500)
    } catch (error) {
      setMessageType("error")
      setMessage("Error al conectar con el servidor")
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
          </form>
          <p className="register-footer">¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
        </div>
      </div>
    </Layout>
  );
}

export default RegisterNew;
