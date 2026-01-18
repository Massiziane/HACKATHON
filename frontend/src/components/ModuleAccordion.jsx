import React, { useState } from "react";

export default function ModuleAccordion({ module }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="acc">
      <button className="acc__head" onClick={() => setOpen((v) => !v)}>
        <div>
          <div className="acc__title">{module.title}</div>
          <div className="muted small">{module.lessons.length} leçon(s)</div>
        </div>
        <div className="acc__chev">{open ? "−" : "+"}</div>
      </button>

      {open && (
        <div className="acc__body">
          {module.lessons.map((l) => (
            <div key={l.id} className="lesson">
              <div className="lesson__top">
                <div>
                  <div className="lesson__title">{l.title}</div>
                  <div className="muted small">{l.content}</div>
                </div>
                <span className="chip chip--soft">
                  Quiz: {l.quiz.questionsCount} questions
                </span>
              </div>

              <div className="lesson__ex">
                {l.exercises.map((ex) => (
                  <span key={ex.id} className="chip">
                    {ex.type} • {ex.title}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}