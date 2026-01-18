import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MOCK_PATHS, labelCategory } from "../data/mockData.js";
import ModuleAccordion from "../components/ModuleAccordion.jsx";
import NotFound from "./NotFound.jsx";

export default function PathDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const path = MOCK_PATHS.find((p) => p.id === id);

  if (!path) return <NotFound />;

  const totalLessons = path.modules.reduce((sum, m) => sum + m.lessons.length, 0);

  return (
    <div className="stack-24">
      <section className="detailHero">
        <div className="detailHero__bg" style={{ backgroundImage: `url(${path.image})` }} />
        <div className="detailHero__overlay" />

        <div className="detailHero__content">
          <button className="btn btn--ghost" onClick={() => navigate(-1)}>
            ← Retour
          </button>

          <h1 className="detailTitle">{path.title}</h1>
          <p className="detailDesc">{path.description}</p>

          <div className="badges">
            <span className="badge">{labelCategory(path.category)}</span>
            <span className="badge badge--soft">{path.level}</span>
            <span className="badge badge--soft">{path.durationHours}h</span>
            <span className="badge badge--soft">
              ★ {path.rating} ({path.reviewsCount})
            </span>
          </div>

          <div className="detailActions">
            <button className="btn btn--primary" onClick={() => alert("Inscription (mock) ✅")}>
              S’inscrire
            </button>
            <button className="btn btn--ghost" onClick={() => alert("Ajout aux favoris (mock) ⭐")}>
              Ajouter aux favoris
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid--2">
        <div className="card">
          <div className="card__header">
            <h2>Infos</h2>
          </div>
          <ul className="list">
            <li>
              <b>Public cible:</b> {path.audience}
            </li>
            <li>
              <b>Leçons:</b> {totalLessons}
            </li>
            <li>
              <b>Modules:</b> {path.modules.length}
            </li>
          </ul>

          <div className="sep" />

          <h3 className="h3">Prérequis</h3>
          <div className="chips">
            {path.prerequisites.map((p) => (
              <span key={p} className="chip chip--soft">
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <h2>Avis</h2>
            <p className="muted">(Mock) Branchable à une vraie table reviews.</p>
          </div>

          <div className="reviewBox">
            <div className="reviewScore">
              <div className="reviewScore__big">★ {path.rating}</div>
              <div className="muted">{path.reviewsCount} avis</div>
            </div>

            <div className="reviewBars">
              {[
                { k: 5, v: 72 },
                { k: 4, v: 18 },
                { k: 3, v: 6 },
                { k: 2, v: 3 },
                { k: 1, v: 1 },
              ].map((r) => (
                <div className="barRow" key={r.k}>
                  <span className="barLabel">{r.k}★</span>
                  <div className="barTrack">
                    <div className="barFill" style={{ width: `${r.v}%` }} />
                  </div>
                  <span className="barPct muted">{r.v}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card__header">
          <h2>Modules & Leçons</h2>
          <p className="muted">Parcours → Modules → Leçons (texte, exercices, quiz).</p>
        </div>

        <div className="accordion">
          {path.modules.map((m) => (
            <ModuleAccordion key={m.id} module={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
