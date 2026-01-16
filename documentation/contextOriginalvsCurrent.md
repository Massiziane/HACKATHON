# Comparatif Fonctionnalités LearnHub – Notre Implémentation

## 1. Contexte Original (Consigne)

Plateforme centrée sur l’apprentissage actif et collaboratif.

**Acteurs :**

- **Visiteur :** explorer catalogue, voir profils, inscription/connexion.
- **Apprenant :** suivre parcours, compléter modules/quiz/exercices, participer aux discussions, rejoindre groupes, devenir mentor.
- **Créateur :** créer parcours, modules, leçons, quiz, suivre statistiques.
- **Mentor :** accompagner les apprenants, répondre aux questions, gagner réputation.

**Fonctionnalités principales :**

- Création de parcours modulaires (Parcours → Modules → Leçons) avec contenu riche.
- Exercices et quiz variés (QCM, vrai/faux, réponse courte, exercices de code…).
- Suivi de progression et gamification (XP, niveaux, badges, classements).
- Système de mentorat (demande, acceptation, sessions, feedback).
- Groupes d’étude (discussions, défis, tableau progression).
- Forum de questions par parcours/leçon.
- Tableaux de bord personnalisés pour apprenants et créateurs.
- Système d’avis et de notes (parcours et mentors).

---

## 2. Notre Implémentation – Différences et Ajouts

**Base de données (Prisma) structurée autour de :**

- `User`, `Formation`, `Cours`, `Lecon`, `Quiz`, `Question`, `Reponse`, `Progress`.
- Relations claires pour gérer : qui crée, qui suit, quelles leçons/quiz appartiennent à quel cours/parcours.
- Gamification simplifiée : suivi de progression via `Progress` (% complétion, statut `completed`).

**Back-end complet avec API REST :**

- Création, lecture, mise à jour, suppression pour :  
  Formations, cours, leçons, quiz, questions, réponses, progressions.
- Authentification/JWT et gestion des rôles (`admin`, `enseignant`, `etudiant`, `mentor`).
- Middlewares pour sécuriser les routes selon le rôle.

**Simplifications/modifications par rapport à la consigne :**

- Les groupes d’étude et le forum de questions ne sont pas implémentés dans la base (peuvent être ajoutés ultérieurement).
- Gamification et mentorat sont basiques : `Progress` permet de suivre la complétion, mais pas encore XP, badges, ni réputation.
- Les parcours sont nommés `Formations`, et chaque cours appartient à une formation et une catégorie.
- Les quiz sont limités à une leçon (`Lecon`) et contiennent des questions avec réponses (`Reponse`), relation 1-to-many.

**Avantages de notre modèle :**

- Clarté des relations entre entités.
- Sécurité via rôles et JWT.
- Back-end modulable pour étendre les fonctionnalités (badges, classements, mentorat avancé…).
- Contrôleurs prêts à gérer toute modification CRUD.

---

**Résumé synthétique :**

- **Consigne originale :** plateforme riche et très interactive (gamification complète, mentorat, groupes, forum).  
- **Notre version :** back-end solide et sécurisé avec API REST, relations Prisma bien définies, gamification simplifiée, prêt pour extension future.  
- **Différence principale :** nous avons choisi de prioriser la structure de données et la sécurité pour un MVP fonctionnel, en laissant certaines fonctionnalités sociales/gamification à développer après.


# Diagramme simplifié des relations principales

User
 ├─< Cours (TeacherCours)
 ├─< Lecon (TeacherLecon)
 ├─< Quiz
 ├─< Progress
 └─< Formation (teacher)

Formation
 ├─< Cours
 └─< Categories (via inheritedCategories)

Categorie
 └─< Cours

Cours
 ├─< Lecon
 ├─< Progress
 └─ belongsTo Formation & Categorie

Lecon
 ├─< Quiz (optionnel)
 └─ belongsTo Cours & User (teacher)

Quiz
 ├─< Question
 └─ belongsTo Lecon & User (teacher)

Question
 ├─< Reponse
 └─ belongsTo Quiz

Reponse
 └─ belongsTo Question

Progress
 └─ belongsTo User (student) & Cours
