# Authentification et gestion des utilisateurs

Ce module gère l’**inscription**, la **connexion** et l’**authentification** des utilisateurs, ainsi que la gestion des rôles pour le projet Hackathon.

---

## 1. Contrôleur d’authentification (`auth.controller.ts`)

### Sign Up (`signUp`)

- **But :** Créer un nouvel utilisateur.
- **Champs requis :** `firstName`, `lastName`, `email`, `password`, `role`.
- **Étapes :**
  1. Vérifie que tous les champs sont présents.
  2. Vérifie que l’email n’existe pas déjà (`prisma.user.findUnique`).
  3. Hash le mot de passe (`HashPassword`) avant de le stocker.
  4. Crée l’utilisateur dans la base de données (`prisma.user.create`).
  5. Retourne l’utilisateur **sans le mot de passe**.

- **Codes d’erreur :**
  - 400 → champs manquants ou email déjà utilisé.
  - 500 → erreur serveur/base de données.

---

### Sign In (`signIn`)

- **But :** Authentifier un utilisateur et fournir un JWT.
- **Champs requis :** `email`, `password`.
- **Étapes :**
  1. Vérifie la présence de l’email et du mot de passe.
  2. Récupère l’utilisateur par email.
  3. Compare le mot de passe fourni avec le hash stocké (`ComparePassword`).
  4. Génère un JWT (`generateToken`) contenant `id`, `email` et `role`.
  5. Retourne l’utilisateur et le token.

- **Codes d’erreur :**
  - 400 → champs manquants.
  - 401 → mot de passe incorrect.
  - 404 → utilisateur introuvable.
  - 500 → erreur serveur/base de données.

---

## 2. Extension Express pour TypeScript

- **Fichier :** `HACKATHON\backend\src\prisma\express.d.ts`
- Ajoute la propriété `user` au type `Request` :

```ts
req.user?: {
  id: string;
  email: string;
  role: string;
} | User;
```

## 3. Middleware d’authentification et rôle
* **auth.middleware.ts** :
Vérifie le token JWT dans les requêtes et attache l’utilisateur à req.user.

* **role.middleware.ts** :
Vérifie que l’utilisateur a le rôle requis (admin, enseignant, etudiant, mentor) pour accéder à une route.

## 4. Utilitaires

* **hashpassword.ts** :
Contient les fonctions HashPassword et ComparePassword pour sécuriser les mots de passe.

* **jwt.ts** :
Contient la fonction generateToken pour créer des JWT sécurisés utilisés pour l’authentification.

