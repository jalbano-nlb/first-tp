import './RegisTerNew.css'

function RegisterNew() {
  return (
    <>
      <div className="register-cont">
        <div className="register-card">
          <h2>Registro de Usuario</h2>
          <form className="register-form">
            <label>Nombre:
              <input type="text" name="nombre" required />
            </label>
            <label>Apellido:
              <input type="text" name="apellido" required />
            </label>
            <label>Email:
              <input type="email" name="email" required />
            </label>
            <label>Teléfono:
              <input type="tel" name="telefono" required />
            </label>
            <label>Contraseña:
              <input type="password" name="password" required />
            </label>
            <label>Confirmar Contraseña:
              <input type="password" name="confirmPassword" required />
            </label>

            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterNew;
