import { Link } from 'react-router-dom';
import '../styles/RegisterNew.css'
import Layout from './Layout';

function RegisterNew() {
  return (
    <Layout>
      <div className="register-cont">
        <div className="register-card">
          <h2>Registro de Usuario</h2>
          <form className="register-form">
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
            <p className="register-footer">¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
          </form>

        </div>
      </div>
    </Layout>
  );
}

export default RegisterNew;
