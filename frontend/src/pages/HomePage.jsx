import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MOCK_CATEGORIES, MOCK_PATHS } from "../data/mockData.js";
import PathCard from "../components/PathCard.jsx";

export default function HomePage() {
  const [q, setQ] = useState("");

  const popular = useMemo(() => {
    return [...MOCK_PATHS]
      .sort((a, b) => b.rating * b.reviewsCount - a.rating * a.reviewsCount)
      .slice(0, 3);
  }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return popular;
    return MOCK_PATHS.filter(
      (p) =>
        p.title.toLowerCase().includes(t) ||
        p.description.toLowerCase().includes(t)
    ).slice(0, 3);
  }, [q, popular]);

  return (
    <div className="stack-24">
      <section className="hero">
        <div className="hero__content">
          <h1>Apprends par parcours.</h1>
          <p className="muted">
            Parcours → Modules → Leçons, avec exercices pratiques et quiz.
          </p>

          <div className="hero__cta">
            <Link className="btn btn--primary" to="/catalogue">
              Explorer le catalogue
            </Link>
            <Link className="btn btn--ghost" to="/auth">
              Créer un compte
            </Link>
          </div>
        </div>

        <div className="hero__panel">
          <div className="hero__panelTitle">Exemple</div>
          <div className="hero__panelBody">
            <p>
              <b>Marie</b> crée <b>“JavaScript de zéro à héros”</b> : 5 modules
              (Fondamentaux, DOM, Async, ES6+, Projet final).
            </p>
            <p className="muted">
              Chaque leçon : texte + 2–3 exercices + mini-quiz (5 questions).
            </p>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card__header">
          <h2>Recherche rapide</h2>
          <p className="muted">Tape un mot-clé (ex: “JavaScript”, “SQL”, “UI”).</p>
        </div>

        <div className="searchRow">
          <input
            className="input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un parcours…"
          />
          <Link className="btn btn--primary" to="/catalogue">
            Voir le catalogue
          </Link>
        </div>

        <div className="grid grid--3">
          {filtered.map((p) => (
            <PathCard key={p.id} path={p} />
          ))}
        </div>
      </section>

      <section className="card">
        <div className="card__header">
          <h2>Catégories</h2>
          <p className="muted">Explore par thème.</p>
        </div>

        <div className="chips">
          {MOCK_CATEGORIES.map((c) => (
            <Link key={c.id} className="chip" to={`/catalogue?cat=${c.id}`}>
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="card__header">
          <h2>Parcours populaires</h2>
          <p className="muted">Ce que les utilisateurs adorent en ce moment.</p>
        </div>

        <div className="grid grid--3">
          {popular.map((p) => (
            <PathCard key={p.id} path={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
