import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <ul className="header-nav-list">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/adminpanel">Panel de Administrador</Link></li>
          <li><Link to="/register">Registrate</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
