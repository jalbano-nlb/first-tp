import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useAuth } from "../context/AuthContext";
import { FiLogOut, FiUser } from "react-icons/fi";

const Header = () => {

  const {user, logout} = useAuth();
  const handleLogout = () => {
    logout()
  }

  return (
    <header className="header">
      <nav className="header-nav">
        <ul className="header-nav-list">
          <li><Link to="/">Inicio</Link></li>
          {user && (
            <>
              <li><Link to="/adminpanel">Panel de Administrador</Link></li>
              <li className="header-user">
                <FiUser style={{ marginRight: "6px" }} />
                {user.displayName || user.email}
              </li>
              <li>
                <button className="header-logout-btn" onClick={handleLogout}>
                  <FiLogOut style={{ marginRight: "6px" }} />
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
          {!user && (
            <>
              <li><Link to="/register">Registrate</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
