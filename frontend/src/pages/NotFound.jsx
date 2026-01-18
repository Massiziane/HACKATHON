import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
				return (
												<div className="card">
														<div className="card__header">
																<h2>Page introuvable</h2>
																<p className="muted">Retourne à l’accueil.</p>
														</div>
														<Link className="btn btn--primary" to="/">
																Accueil
														</Link>
												</div>
												);
}
