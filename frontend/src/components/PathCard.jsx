import React from "react";
import { Link } from "react-router-dom";
import { labelCategory } from "../data/mockData.js";

export default function PathCard({ path }) {
  return (
    <Link to={`/parcours/${path.id}`} className="pathCard">
      <div
        className="pathCard__img"
        style={{ backgroundImage: `url(${path.image})` }}
      />
      <div className="pathCard__body">
        <div className="pathCard__title">{path.title}</div>
        <div className="pathCard__desc">{path.description}</div>

        <div className="pathCard__meta">
          <span className="badge">{labelCategory(path.category)}</span>
          <span className="badge badge--soft">{path.level}</span>
          <span className="badge badge--soft">{path.durationHours}h</span>
        </div>

        <div className="pathCard__rating muted">
          ★ {path.rating} • {path.reviewsCount} avis
        </div>
      </div>
    </Link>
  );
}