import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavItem from "./NavItem.jsx";

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar__inner">
          <Link className="brand" to="/">
            Parcours<span className="brand__dot">•</span>
          </Link>

          <nav className="nav">
            <NavItem to="/" current={location.pathname === "/"}>Accueil</NavItem>
            <NavItem to="/catalogue" current={location.pathname.startsWith("/catalogue")}>
              Catalogue
            </NavItem>
            <NavItem to="/auth" current={location.pathname.startsWith("/auth")}>
              Inscription / Connexion
            </NavItem>
          </nav>
        </div>
      </header>

      <main className="container">{children}</main>

      <footer className="footer">
        <div className="footer__inner">
          <span>© {new Date().getFullYear()} Parcours</span>
          <span className="muted">UI mock • prêt à connecter à une API</span>
        </div>
      </footer>
    </div>
  );
}
