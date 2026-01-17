import React from "react";
import { Link } from "react-router-dom";

export default function NavItem({ to, current, children }) {
  return (
    <Link className={`nav__item ${current ? "is-active" : ""}`} to={to}>
      {children}
    </Link>
  );
}
