import '../styles/Login.css';
import Layout from './Layout';

function Login() {
  return (
    <Layout>
      <div className="login-cont">
        <div className="login-card">
          <h2>Iniciar Sesión</h2>
          <form className="login-form">
            <label>Email:
              <input type="email" name="email" required />
            </label>
            <label>Contraseña:
              <input type="password" name="password" required />
            </label>

            <button type="submit">Ingresar</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
