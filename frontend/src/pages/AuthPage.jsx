import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  function validate() {
    setError("");
    if (!email.includes("@")) return setError("Email invalide."), false;
    if (password.length < 6)
      return setError("Mot de passe: minimum 6 caractères."), false;

    if (mode === "signup") {
      if (!name.trim()) return setError("Nom requis."), false;
      if (password !== confirm)
        return setError("Les mots de passe ne correspondent pas."), false;
    }
    return true;
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    navigate("/catalogue");
  }

  return (
    <div className="auth">
      <div className="card auth__card">
        <div className="card__header">
          <h2>{mode === "login" ? "Connexion" : "Inscription"}</h2>
          <p className="muted">
            {mode === "login"
              ? "Reviens continuer tes parcours."
              : "Crée ton compte pour t’inscrire aux parcours."}
          </p>
        </div>

        <div className="tabs">
          <button
            className={`tab ${mode === "login" ? "is-active" : ""}`}
            onClick={() => setMode("login")}
            type="button"
          >
            Connexion
          </button>
          <button
            className={`tab ${mode === "signup" ? "is-active" : ""}`}
            onClick={() => setMode("signup")}
            type="button"
          >
            Inscription
          </button>
        </div>

        <form className="form" onSubmit={onSubmit}>
          {mode === "signup" && (
            <div className="field">
              <label className="label">Nom</label>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Marie"
              />
            </div>
          )}

          <div className="field">
            <label className="label">Email</label>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@mail.com"
            />
          </div>

          <div className="field">
            <label className="label">Mot de passe</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
            />
          </div>

          {mode === "signup" && (
            <div className="field">
              <label className="label">Confirmer</label>
              <input
                className="input"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••"
              />
            </div>
          )}

          {error && <div className="alert">{error}</div>}

          <button className="btn btn--primary" type="submit">
            {mode === "login" ? "Se connecter" : "Créer mon compte"}
          </button>

          <p className="muted small">(Démo) Après validation, on va au catalogue.</p>
        </form>
      </div>
    </div>
  );
}