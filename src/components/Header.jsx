import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { useAuth } from "../context/AuthContext";
import { FiLogOut, FiUser, FiMenu } from "react-icons/fi";
import { useState } from "react";

const Header = () => {

  const {user, logout} = useAuth();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const handleLogout = () => {
    logout()
    navigate("/login");
  }

  return (
    <header className="header">
      <nav className="header-nav">
        <button className="header-hamburger" onClick={() => setNavOpen((prev) => !prev)}>
          <FiMenu />
        </button>
        <ul className={`header-nav-list${navOpen ? " active" : ""}`}>
          <li><Link to="/" onClick={() => setNavOpen(false)}>Inicio</Link></li>
          {user && (
            <>
              <li><Link to="/adminpanel" onClick={() => setNavOpen(false)}>Panel de Usuario</Link></li>
              <li className="header-user">
                <FiUser style={{ marginRight: "6px" }} />
                {user.displayName || user.email}
              </li>
              <li>
                <button className="header-logout-btn" onClick={() => {handleLogout(); setNavOpen(false);}}>
                  <FiLogOut style={{ marginRight: "6px" }} />
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
          {!user && (
            <>
              <li><Link to="/register" onClick={() => setNavOpen(false)}>Registrate</Link></li>
              <li><Link to="/login" onClick={() => setNavOpen(false)}>Login</Link></li>
            </>
          )}
        </ul>
        {/* <ul className="header-nav-list">
          <li><Link to="/">Inicio</Link></li>
          {user && (
            <>
              <li><Link to="/adminpanel">Panel de Usuario</Link></li>
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
        </ul> */}
      </nav>
    </header>
  );
};

export default Header;
