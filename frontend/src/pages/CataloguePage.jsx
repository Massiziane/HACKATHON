import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MOCK_CATEGORIES, MOCK_PATHS } from "../data/mockData.js";
import PathCard from "../components/PathCard.jsx";

export default function CataloguePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialCat = params.get("cat") || "all";

  const [q, setQ] = useState("");
  const [cat, setCat] = useState(initialCat);
  const [level, setLevel] = useState("all");
  const [minHours, setMinHours] = useState(0);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    return MOCK_PATHS.filter((p) => {
      const okQ =
        !t ||
        p.title.toLowerCase().includes(t) ||
        p.description.toLowerCase().includes(t);
      const okCat = cat === "all" || p.category === cat;
      const okLevel = level === "all" || p.level === level;
      const okHours = p.durationHours >= Number(minHours);
      return okQ && okCat && okLevel && okHours;
    });
  }, [q, cat, level, minHours]);

  return (
    <div className="stack-24">
      <section className="card">
        <div className="card__header">
          <h2>Catalogue</h2>
          <p className="muted">Recherche avancée + filtres.</p>
        </div>

        <div className="filters">
          <div className="field">
            <label className="label">Recherche</label>
            <input
              className="input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Mot-clé…"
            />
          </div>

          <div className="field">
            <label className="label">Catégorie</label>
            <select className="input" value={cat} onChange={(e) => setCat(e.target.value)}>
              <option value="all">Toutes</option>
              {MOCK_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="label">Niveau</label>
            <select className="input" value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="all">Tous</option>
              <option value="débutant">Débutant</option>
              <option value="intermédiaire">Intermédiaire</option>
              <option value="avancé">Avancé</option>
            </select>
          </div>

          <div className="field">
            <label className="label">Durée min (h)</label>
            <input
              className="input"
              type="number"
              min="0"
              value={minHours}
              onChange={(e) => setMinHours(e.target.value)}
            />
          </div>
        </div>

        <div className="rowBetween">
          <div className="muted">
            <b>{results.length}</b> résultat(s)
          </div>
          <button
            className="btn btn--ghost"
            type="button"
            onClick={() => {
              setQ("");
              setCat("all");
              setLevel("all");
              setMinHours(0);
              navigate("/catalogue");
            }}
          >
            Réinitialiser
          </button>
        </div>

        <div className="grid grid--3">
          {results.map((p) => (
            <PathCard key={p.id} path={p} />
          ))}
        </div>
      </section>
    </div>
  );
}