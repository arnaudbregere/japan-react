# Japan Manga Explorer 🇯🇵

## Présentation du projet

**Japan Manga Explorer** est une application web développée avec Next.js permettant d'explorer l'univers des mangas japonais et de découvrir des lieux emblématiques du Japon.

Le projet propose une expérience orientée découverte avec :
- une liste de mangas alimentée par une API externe ;
- une recherche de mangas ;
- une pagination ;
- une liste de lieux japonais ;
- une interface responsive pensée pour une utilisation desktop et mobile first.

L'objectif du projet est de proposer une application moderne, performante et accessible, tout en mettant en pratique les bonnes pratiques du développement frontend moderne avec React et Next.js.

---

# Technologies utilisées

## Framework & langage

- **Next.js 16**  
  Framework React utilisé pour le rendu côté serveur (SSR), le routing basé sur l'App Router et l'optimisation des performances.

- **React 19**  
  Bibliothèque principale pour construire l'interface utilisateur avec une approche component-based.

- **TypeScript**  
  Utilisé pour renforcer la fiabilité du code grâce au typage statique.

---

## Styling

- **SCSS**
  - Organisation des styles par composants ;
  - Utilisation de CSS Modules ;
  - Variables et mixins globaux pour maintenir une architecture CSS scalable.

---

## APIs utilisées

### AniList API

Utilisée pour récupérer les données liées aux mangas :
- titres ;
- descriptions ;
- images ;
- informations générales ;
- pagination.

### Wikipedia API

Utilisée pour récupérer les informations concernant les lieux japonais :
- noms des lieux ;
- descriptions ;
- données culturelles.

---

## Outils de développement

- ESLint
- Next.js ESLint Configuration
- npm
- TypeScript Compiler

---

# Fonctionnalités

## Exploration des mangas

- Affichage d'une liste de mangas populaires ;
- Recherche par nom ;
- Pagination des résultats ;
- Cartes manga réutilisables ;
- Gestion des images optimisées.

---

## Découverte du Japon

- Catalogue de lieux incontournables ;
- Pagination des résultats ;
- Présentation sous forme de cartes ;
- Navigation dédiée aux destinations japonaises.

---

## Interface utilisateur

- Header global ;
- Footer global ;
- Hero section avec illustration ;
- Navigation claire ;
- Design responsive ;
- Composants réutilisables.

---

## SEO intégré

Le projet possède déjà plusieurs optimisations SEO :

- Metadata Next.js personnalisées ;
- Titles dynamiques ;
- Descriptions adaptées aux pages ;
- URLs canoniques ;
- Open Graph configuré ;
- Structure HTML sémantique.

---

## Accessibilité

Plusieurs bonnes pratiques sont déjà intégrées :

- Langue du document définie en français ;
- Présence d'un lien "skip navigation" ;
- Utilisation de balises HTML sémantiques ;
- Hiérarchie des titres (`h1`, `h2`) cohérente ;
- Navigation basée sur des liens natifs ;
- Composants structurés pour limiter les problèmes d'accessibilité.

---

# Architecture du site

Le projet utilise l'architecture **Next.js App Router**.

Structure principale :

```
src/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── mangas/
│   │   └── page.tsx
│   ├── locations/
│   │   └── page.tsx
│   └── globals.scss
│
├── components/
│   ├── Header/
│   ├── Footer/
│   ├── MangaCard/
│   ├── LocationCard/
│   ├── SearchForm/
│   ├── Pagination/
│   ├── Logo/
│   └── HeroIllustration/
│
├── lib/
│   └── api/
│       ├── anilist-list
│       └── wikipedia
│
├── types/
│   ├── manga.ts
│   └── location.ts
│
├── utils/
│   ├── seo/
│   ├── slugify.ts
│   └── mangaSlug.ts
│
└── styles/
    ├── _tokens.scss
    └── _mixins.scss
```

---

# Organisation des responsabilités

## App Router (`src/app`)

Contient :
- les routes ;
- les pages ;
- les layouts ;
- les metadata SEO.

Chaque page récupère ses données côté serveur afin d'améliorer :
- les performances ;
- le référencement naturel ;
- l'expérience utilisateur.

---

## Components (`src/components`)

Les composants sont isolés et réutilisables.

Exemples :

### MangaCard

Responsable de l'affichage d'un manga :
- image ;
- titre ;
- informations principales.

### LocationCard

Responsable de l'affichage d'un lieu japonais.

### Pagination

Gestion de la navigation entre les différentes pages de résultats.

### SearchForm

Gestion de la recherche utilisateur.

---

## API Layer (`src/lib/api`)

Centralise les appels aux services externes.

Avantages :
- séparation claire entre données et interface ;
- code plus facilement maintenable ;
- possibilité de remplacer une source de données.

---
