


# Relations Prisma & Contrôleurs

Ce projet utilise Prisma pour gérer une plateforme d'apprentissage avec **utilisateurs, cours, leçons, quiz, questions, réponses, formations, catégories et progression des étudiants**.

---

## **Relations du schéma**

### 1. Utilisateur
- Peut être `admin`, `enseignant`, `etudiant` ou `mentor`.
- **Relations** :
  - `cours[]` → cours enseignés (un-à-plusieurs)
  - `lecons[]` → leçons créées (un-à-plusieurs)
  - `quizzes[]` → quiz créés (un-à-plusieurs)
  - `formations[]` → formations créées
  - `progresses[]` → progression des étudiants (un-à-plusieurs)

### 2. Cours
- Appartient à un enseignant (`teacherId`) et à une catégorie (`categorieId`).
- Relation optionnelle avec une formation (`formationId`).
- **Relations** :
  - `lecons[]` → leçons dans ce cours
  - `progresses[]` → progression des étudiants

### 3. Leçon ↔ Quiz
- **Relation un-à-un optionnelle** : une leçon peut avoir au maximum un quiz (`quizId`).
- `Lecon.quiz` ↔ `Quiz.lecon`

### 4. Quiz → Question → Réponse
- Un quiz a plusieurs questions.
- Une question a plusieurs réponses (`Reponse`), `bonneReponse` indique la réponse correcte.

### 5. Formation ↔ Catégorie
- Relation plusieurs-à-plusieurs (`Formation.inheritedCategories` ↔ `Categorie.formations`)

### 6. Progress
- Suit la progression d’un étudiant dans un cours.
- `@@unique([studentId, coursId])` garantit une entrée unique par étudiant/cours.

---


