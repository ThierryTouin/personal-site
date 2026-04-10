# Documentation Projet — Site Personnel thierrytouin.fr

## 1. Vue d'ensemble

### 1.1 Description
Site personnel statique de **Thierry TOUIN**, Architecte Solution. Le site sert de **vitrine professionnelle** avec deux axes :
- **Blog technique** : articles Markdown rendus en HTML (liste + détail)
- **CV en ligne** : données JSON centralisées, rendues en sous-pages HTML avec navigation dédiée

### 1.2 Objectif
Présenter le profil professionnel de Thierry Touin (parcours, compétences, expériences) et partager des articles techniques.

### 1.3 Public cible
Recruteurs, clients potentiels, pairs de la communauté tech — le site est une **vitrine d'architecte** et doit être irréprochable sur mobile.

### 1.4 URL actuelle
`https://thierrytouin.fr`

---

## 2. Architecture fonctionnelle

### 2.1 Cartographie des pages

```
/                         → Page d'accueil = Liste des articles du blog + composant MQTT
/blog/{slug}/             → Page détail d'un article (générée automatiquement depuis le Markdown)
/about/                   → CV — Résumé professionnel (label + summary)
/about/experiences/       → CV — Liste des expériences professionnelles
/about/educations/        → CV — Liste des formations
/about/knowledges/        → CV — Compétences transverses (savoir-faire)
/about/skills/            → CV — Compétences techniques (outils, langages, frameworks)
/contact/                 → Informations de contact (email + réseaux sociaux)
/404                      → Page d'erreur
```

### 2.2 Navigation

**Menu principal (header)** :
| Libellé   | Lien        | Sous-menu                                |
|-----------|-------------|------------------------------------------|
| Home      | `/`         | —                                        |
| About-Me  | `/about/`   | Experiences (`/about/experiences`), Educations (`/about/educations`) |
| Contact   | `/contact/` | —                                        |

> Note : les sous-menus sont définis dans la config mais actuellement commentés dans le rendu du header.

**Menu latéral CV** (visible sur toutes les sous-pages `/about/*`) :
- Info → `/about/`
- Experiences → `/about/experiences/`
- Educations → `/about/educations/`
- Knowledges → `/about/knowledges/`
- Skills → `/about/skills/`

### 2.3 Layout général

```
┌──────────────────────────────────────┐
│           Header                     │
│  Hero image + Titre + Description    │
│  Navigation principale               │
├──────────────────────────────────────┤
│           Contenu principal          │
│  (ou layout CV 2 colonnes :          │
│   menu latéral | contenu)            │
├──────────────────────────────────────┤
│ [Bouton scroll-to-top] (conditionnel)│
├──────────────────────────────────────┤
│           Footer                     │
│  "Site developed by TTO © {année}"   │
└──────────────────────────────────────┘
```

---

## 3. Fonctionnalités détaillées

### 3.1 Blog

#### F-BLOG-01 : Liste des articles
- Affichage de tous les articles Markdown, triés par date décroissante
- Chaque carte affiche : titre, date de publication, temps de lecture, image featured (optionnelle), extrait, lien "Read More"

#### F-BLOG-02 : Page détail d'un article
- Génération automatique de pages à partir des fichiers Markdown (`/blog/{slug}/`)
- Le slug est dérivé du nom du fichier Markdown
- Affichage : titre, date, temps de lecture, image featured, contenu HTML complet

#### F-BLOG-03 : Frontmatter Markdown
Chaque article utilise le frontmatter suivant :
```yaml
title: "Titre de l'article"
description: "Description pour le SEO"
date: "YYYY-MM-DD"
featured: "../images/nom-image.jpg"  # optionnel
```

#### F-BLOG-04 : Coloration syntaxique
- Plugin : `@deckdeckgo/highlight-code`
- Thème : Monokai
- Terminal : Carbon
- Numéros de ligne activés

#### F-BLOG-05 : Diagrammes Mermaid
- Plugin : `gatsby-remark-graph`
- Blocs de code de langage `mermaid` rendus en diagrammes SVG

#### F-BLOG-06 : Emojis
- Plugin : `gatsby-remark-emoji`
- Syntaxe `:emoji_name:` convertie en emojis dans les articles

#### F-BLOG-07 : Images optimisées
- Plugin : `gatsby-remark-images` + `gatsby-plugin-sharp` + `gatsby-transformer-sharp`
- Images dans les articles automatiquement optimisées (fluid, maxWidth 750px)
- Pas de lien vers l'original

#### F-BLOG-08 : Temps de lecture
- Calculé automatiquement (`timeToRead` de GraphQL)
- Affiché en minutes sur la liste et le détail

### 3.2 CV (Section About)

#### F-CV-01 : Source de données centralisée
- Fichier : `data/cv-data.js` (module CommonJS exportant un objet `cv`)
- Format : objet JavaScript (FRESH@0.6.0)
- **Maintenu manuellement** — ne doit pas être modifié automatiquement
- Injecté dans `siteMetadata` via `gatsby-config.js` (spread `...cv`)
- Accessible via GraphQL dans tous les composants

#### F-CV-02 : Résumé professionnel (`/about/`)
- Affiche `cv.info.label` (titre : "Architecte Solution")
- Affiche `cv.info.summary` (HTML, rendu via `dangerouslySetInnerHTML`)

#### F-CV-03 : Expériences professionnelles (`/about/experiences/`)
- Source : `cv.employment.history[]`
- Par expérience : projet, position, société, employeur, période (formatée en français : "Janvier 2025 - À nos jours"), résumé (HTML), highlights (HTML, liste), keywords (liste à puces)
- Mois en français : Janvier, Février...

#### F-CV-04 : Formations (`/about/educations/`)
- Source : `cv.education.history[]`
- Par formation : année de début + institution

#### F-CV-05 : Compétences transverses (`/about/knowledges/`)
- Source : `cv.knowledges.sets[]`
- Par catégorie : nom + liste de skills

#### F-CV-06 : Compétences techniques (`/about/skills/`)
- Source : `cv.skills.sets[]` (12 catégories)
- Par catégorie : nom + liste de keywords

#### F-CV-07 : Layout CV 2 colonnes
- Colonne gauche : menu latéral vertical (liens Gatsby)
- Colonne droite : contenu de la sous-page active

#### F-CV-08 : Menu CV latéral
- Navigation verticale avec liens : Info, Experiences, Educations, Knowledges, Skills
- Présent sur toutes les sous-pages `/about/*`

### 3.3 Contact

#### F-CONTACT-01 : Affichage des coordonnées
- Email : `cv.contact.email`
- Réseaux sociaux : `cv.social[]` (GitHub, LinkedIn) — nom du réseau + lien cliquable
- Pas de formulaire de contact

### 3.4 IoT / MQTT

#### F-MQTT-01 : Télémétrie sur la page d'accueil
- Composant invisible sur la page d'accueil
- Au chargement : récupère l'IP publique du visiteur (via `api.ipify.org`)
- Publie un message MQTT (WebSocket) sur `test.mosquitto.org:8081`
- Topic : `tto/page1`
- Message : `{ ts: timestamp, ip: adresse_ip }`
- Flag `retain: true`
- Nettoyage de la connexion à la destruction du composant

### 3.5 SEO & Analytics

#### F-SEO-01 : Métadonnées HTML
- `<html lang="fr">`
- Titre : `{page_title} | tto's blog`
- Description meta
- Open Graph : locale fr_FR, title, url, type, description, image (header-image2.avif 400x50)
- Twitter Cards : card, domain, url, title, description, image
- URL canonique dynamique (`window.location.href`)

#### F-SEO-02 : Sitemap
- Génération automatique (`gatsby-plugin-sitemap`)

#### F-SEO-03 : Robots.txt
- Conditionnel selon l'environnement Netlify :
  - Production : tout autorisé
  - Branch-deploy / deploy-preview : `Disallow: /`

#### F-ANALYTICS-01 : Clicky Analytics
- Script de tracking Clicky (ID: 101361743) intégré dans le `<head>` via le composant Metadata
- Version noscript avec pixel de tracking

### 3.6 UX

#### F-UX-01 : Bouton scroll-to-top
- Apparaît après 300px de scroll
- Flèche vers le haut (SVG background)
- Positionné en bas à droite (fixed)
- Initialisation via `gatsby-browser.js` sur chaque changement de route

#### F-UX-02 : Page 404
- Message d'erreur
- Lien vers le blog

---

## 4. Architecture technique actuelle

### 4.1 Stack
| Composant       | Technologie                    |
|-----------------|--------------------------------|
| Framework       | Gatsby 5.13.7                  |
| UI              | React 18.3.1                   |
| Langage         | JavaScript (ES6+)              |
| Styles          | SCSS (Sass) + CSS Modules      |
| Données CV      | JS/JSON (CommonJS export)      |
| Données blog    | Markdown + frontmatter YAML    |
| Requêtes data   | GraphQL (Gatsby `StaticQuery`)  |
| SEO             | React Helmet                   |
| Analytics       | Clicky                         |
| IoT             | MQTT over WebSocket            |
| Images          | gatsby-image (Sharp)           |
| Code highlight  | @deckdeckgo/highlight-code     |
| Diagrammes      | Mermaid (gatsby-remark-graph)  |
| Node.js         | v22                            |

### 4.2 Structure des fichiers source

```
data/
  cv-data.js                    # Données CV (source unique, FRESH@0.6.0)
src/
  contents/                     # Articles Markdown
    developper-avec-docker.md
    linky-vers-jeedom.md
    performance-java-et-logger.md
    site-perso-sans-wordpress.md
  images/                       # Images (articles + assets)
  pages/
    index.js                    # Accueil / liste blog
    about.js                    # CV — résumé
    contact.js                  # Contact
    404.js                      # Page 404
    about/
      experiences.js            # CV — expériences
      educations.js             # CV — formations
      knowledges.js             # CV — savoir-faire
      skills.js                 # CV — compétences techniques
  components/
    layout.js                   # Layout principal (Header + Content + Footer)
    header.js                   # Header + hero + nav
    footer.js                   # Footer (copyright)
    metadata.js                 # SEO (Helmet) + Analytics
    cv/
      layoutCv.js               # Layout 2 colonnes CV
      MenuCv.js                 # Menu latéral CV
      MyInfo.js                 # Résumé professionnel
      Employments.js            # Expériences
      Educations.js             # Formations
      Knowledges.js             # Savoir-faire
      Skills.js                 # Compétences techniques
      Contact.js                # Coordonnées
      Cv.js                     # (legacy, non utilisé activement)
    mqtt/
      mqtt-page1.js             # Composant MQTT (télémétrie)
  styles/
    style.scss                  # Styles globaux + variables couleurs
  templates/
    blog-post.js                # Template article de blog
static/
  header-image2.avif            # Image hero header
```

### 4.3 Palette de couleurs

| Variable | Valeur    | Usage              |
|----------|-----------|--------------------|
| $color1  | `#809BF3` | Bleu clair         |
| $color2  | `#6D739A` | Bleu gris          |
| $color3  | `#545C84` | Bleu foncé primaire|
| $color4  | `white`   | Blanc              |
| $color5  | `#95CCF4` | Cyan               |
| $color6  | `#20285E` | Navy               |
| $color7  | `#cfdbe7` | Gris clair         |

Police : Segoe UI, Roboto, Verdana, Helvetica Neue, sans-serif

### 4.4 Infrastructure

#### Déploiement actuel
- **Hébergeur** : Netlify (CI/CD automatique sur git push)
- **Domaine** : thierrytouin.fr
- **Build** : `npm run build` → dossier `public/`
- **Node pour le build** : 20 (Netlify), 22 (Docker)

#### Docker

**Dockerfile.dev** (environnement de dev/build) :
- Base : `node:22-bookworm-slim`
- Installe : python3, build-essential, git, gatsby-cli
- Copie les sources, ouvre un shell bash
- Usage : entrer dans le container pour développer/builder sans rien installer sur le host

**Dockerfile.run** (servir le site en dev) :
- Base : `node:22-bookworm-slim`
- Installe les dépendances (`npm install --legacy-peer-deps`)
- Lance `gatsby develop -H 0.0.0.0`
- Expose le port 8000

**docker-compose.yml** :
- Service `run` : sert le site Gatsby (port 8000)
- Service `builder` : shell interactif (stdin_open + tty)
- Volume nommé `personal_site_node_modules` pour persister node_modules

---

## 5. Contraintes et décisions de conception

### 5.1 Contraintes fonctionnelles
- **CV-DATA-01** : Le fichier `cv-data.js` est la source unique du CV. Il est maintenu manuellement et ne doit pas être modifié automatiquement.
- **CV-STRUCT-01** : Les sous-pages CV (`/about/experiences/`, `/about/educations/`, etc.) doivent rester des pages distinctes avec navigation latérale.
- **BLOG-MD-01** : Les articles sont rédigés en Markdown avec frontmatter YAML. La génération de pages est automatique à partir du nom de fichier.
- **ISO-FONC-01** : Toute migration doit maintenir une iso-fonctionnalité complète.

### 5.2 Contraintes techniques
- **STATIC-01** : Le site doit être 100% statique (pas de SSR, pas de serverless functions).
- **DOCKER-01** : Les Dockerfiles sont essentiels — un pour l'environnement de dev/build (sans rien installer sur le host), un pour servir le site.
- **MOBILE-01** : Le site doit être responsive et lisible sur mobile — c'est une vitrine professionnelle.

### 5.3 Contraintes de migration (future)
- **MIG-TECHNO-01** : Technologie cible envisagée : **Astro** (simplicité).
- **MIG-HOSTING-01** : Quitter Netlify → **GitHub Pages** (hébergement statique gratuit).
- **MIG-DESIGN-01** : Refonte design repoussée à une phase ultérieure. La migration sera d'abord iso-fonctionnelle.

---

## 6. User Stories

### Epic 1 — Blog

| ID | User Story | Critères d'acceptation |
|----|------------|------------------------|
| US-BLOG-01 | **En tant que** visiteur, **je veux** voir la liste de tous les articles de blog triés du plus récent au plus ancien, **afin de** parcourir le contenu disponible. | - Articles triés par date DESC<br>- Chaque carte affiche : titre (lien), date, temps de lecture, image (si présente), extrait, bouton "Read More"<br>- Clic sur titre ou "Read More" → page détail |
| US-BLOG-02 | **En tant que** visiteur, **je veux** lire un article complet sur sa propre page, **afin de** suivre un sujet technique en détail. | - URL : `/blog/{slug}/`<br>- Slug = nom du fichier Markdown (sans extension)<br>- Contenu : titre, date, temps de lecture, image featured, HTML du Markdown |
| US-BLOG-03 | **En tant que** rédacteur, **je veux** écrire mes articles en Markdown avec un frontmatter YAML, **afin de** publier sans coder. | - Fichiers dans `src/contents/`<br>- Frontmatter : title, description, date, featured (optionnel)<br>- Le build génère automatiquement la page |
| US-BLOG-04 | **En tant que** visiteur, **je veux** voir le code source dans les articles avec une coloration syntaxique élégante, **afin de** lire le code confortablement. | - Thème Monokai, style terminal Carbon<br>- Numéros de ligne affichés |
| US-BLOG-05 | **En tant que** rédacteur, **je veux** insérer des diagrammes Mermaid dans mes articles, **afin de** illustrer des architectures. | - Blocs ` ```mermaid ` rendus en diagrammes SVG |
| US-BLOG-06 | **En tant que** rédacteur, **je veux** utiliser des emojis dans mes articles, **afin de** rendre le contenu plus expressif. | - Syntaxe `:emoji:` convertie en émoji affiché |
| US-BLOG-07 | **En tant que** visiteur, **je veux** que les images des articles soient chargées rapidement, **afin de** ne pas attendre sur mobile. | - Images optimisées automatiquement (compression, responsive sizes) |
| US-BLOG-08 | **En tant que** visiteur, **je veux** connaître le temps de lecture estimé d'un article, **afin de** savoir combien de temps y consacrer. | - Temps affiché en minutes sur la liste et le détail |

### Epic 2 — CV / Section About

| ID | User Story | Critères d'acceptation |
|----|------------|------------------------|
| US-CV-01 | **En tant que** recruteur, **je veux** voir un résumé professionnel de Thierry, **afin de** comprendre rapidement son profil. | - Page `/about/`<br>- Affiche le titre (label) et le résumé (summary HTML) |
| US-CV-02 | **En tant que** recruteur, **je veux** consulter l'historique des expériences professionnelles, **afin de** évaluer le parcours. | - Page `/about/experiences/`<br>- Par mission : projet, position, société, employeur, période (mois FR), résumé, highlights, keywords<br>- Date "null" → "À nos jours" |
| US-CV-03 | **En tant que** recruteur, **je veux** voir les formations et certifications, **afin de** vérifier les qualifications. | - Page `/about/educations/`<br>- Par formation : année de début + institution |
| US-CV-04 | **En tant que** recruteur, **je veux** consulter les compétences transverses (savoir-faire), **afin de** évaluer le profil fonctionnel. | - Page `/about/knowledges/`<br>- Par catégorie : nom + liste de compétences |
| US-CV-05 | **En tant que** recruteur, **je veux** consulter les compétences techniques détaillées, **afin de** vérifier la maîtrise des technologies. | - Page `/about/skills/`<br>- 12 catégories, chacune avec nom + liste de technologies |
| US-CV-06 | **En tant que** visiteur, **je veux** naviguer entre les sections du CV via un menu latéral, **afin de** accéder rapidement à la section qui m'intéresse. | - Menu vertical à gauche sur toutes les pages `/about/*`<br>- 5 entrées : Info, Experiences, Educations, Knowledges, Skills |
| US-CV-07 | **En tant que** propriétaire, **je veux** que les données du CV soient centralisées dans un seul fichier JS/JSON, **afin de** les maintenir facilement. | - Source unique : `data/cv-data.js`<br>- Format FRESH@0.6.0<br>- Aucune modification automatique de ce fichier |

### Epic 3 — Contact

| ID | User Story | Critères d'acceptation |
|----|------------|------------------------|
| US-CONTACT-01 | **En tant que** visiteur, **je veux** trouver les coordonnées de Thierry, **afin de** le contacter. | - Page `/contact/`<br>- Affiche : email, liens GitHub et LinkedIn<br>- Données issues de `cv-data.js` |

### Epic 4 — IoT / MQTT

| ID | User Story | Critères d'acceptation |
|----|------------|------------------------|
| US-MQTT-01 | **En tant que** propriétaire, **je veux** que chaque visite sur la page d'accueil publie un message MQTT, **afin de** suivre la fréquentation en temps réel via mon infrastructure IoT. | - Connexion WebSocket à `test.mosquitto.org:8081`<br>- Fetch IP publique (ipify)<br>- Publish sur `tto/page1` avec `{ ts, ip }` et `retain: true`<br>- Nettoyage de la connexion à la destruction |

### Epic 5 — SEO & Analytics

| ID | User Story | Critères d'acceptation |
|----|------------|------------------------|
| US-SEO-01 | **En tant que** propriétaire, **je veux** que chaque page ait des métadonnées SEO complètes, **afin de** être bien référencé. | - `<html lang="fr">`<br>- Title, description, OG (fr_FR), Twitter Cards<br>- Image OG : header-image2.avif<br>- URL canonique |
| US-SEO-02 | **En tant que** propriétaire, **je veux** un sitemap généré automatiquement, **afin de** faciliter l'indexation. | - Sitemap XML à la racine |
| US-SEO-03 | **En tant que** propriétaire, **je veux** un robots.txt conditionnel, **afin de** ne pas indexer les previews. | - Production : tout autorisé<br>- Previews/branches : `Disallow: /` |
| US-ANALYTICS-01 | **En tant que** propriétaire, **je veux** suivre la fréquentation via Clicky Analytics, **afin de** mesurer l'audience. | - Script Clicky (ID 101361743) dans le `<head>`<br>- Fallback noscript (pixel) |

### Epic 6 — UX & Navigation

| ID | User Story | Critères d'acceptation |
|----|------------|------------------------|
| US-UX-01 | **En tant que** visiteur, **je veux** un menu de navigation principal, **afin de** accéder aux différentes sections du site. | - Liens : Home, About-Me, Contact<br>- Lien actif visuellement distingué |
| US-UX-02 | **En tant que** visiteur, **je veux** un header visuel avec image hero, **afin de** avoir une première impression professionnelle. | - Image hero en fond<br>- Titre du site + description par-dessus |
| US-UX-03 | **En tant que** visiteur, **je veux** un bouton "retour en haut", **afin de** revenir rapidement au sommet des pages longues. | - Apparaît après 300px de scroll<br>- Position fixe, en bas à droite<br>- Icône flèche vers le haut |
| US-UX-04 | **En tant que** visiteur, **je veux** voir une page 404 claire, **afin de** savoir que la page n'existe pas et retrouver mon chemin. | - Message d'erreur + lien retour blog |
| US-UX-05 | **En tant que** visiteur, **je veux** consulter le site sur mon téléphone, **afin de** accéder à la vitrine pro depuis n'importe où. | - Design responsive<br>- Lisibilité sur mobile (CV, blog, navigation) |
| US-UX-06 | **En tant que** visiteur, **je veux** voir un footer avec le copyright, **afin de** savoir qui a créé le site. | - "Site developed by TTO © {année courante}" |

### Epic 7 — Infrastructure & DevOps

| ID | User Story | Critères d'acceptation |
|----|------------|------------------------|
| US-INFRA-01 | **En tant que** développeur, **je veux** un site 100% statique, **afin de** l'héberger simplement et gratuitement. | - Build produit des fichiers HTML/CSS/JS statiques<br>- Aucune dépendance serveur runtime |
| US-INFRA-02 | **En tant que** développeur, **je veux** un Dockerfile d'environnement de dev/build, **afin de** développer et builder sans rien installer sur mon PC. | - Image Node.js + outils build<br>- Shell interactif (bash)<br>- Sources montées en volume |
| US-INFRA-03 | **En tant que** développeur, **je veux** un Dockerfile pour servir le site en dev, **afin de** tester localement. | - Install des dépendances + lancement du serveur de dev<br>- Port 8000 exposé |
| US-INFRA-04 | **En tant que** développeur, **je veux** un docker-compose orchestrant les deux services, **afin de** tout lancer en une commande. | - Service `run` : sert le site (port 8000)<br>- Service `builder` : shell interactif (stdin/tty)<br>- Volume nommé pour persister node_modules |

### Epic 8 — Migration (future, hors scope actuel)

| ID | User Story | Critères d'acceptation |
|----|------------|------------------------|
| US-MIG-01 | **En tant que** développeur, **je veux** migrer le site vers Astro, **afin de** simplifier la stack technique. | - Iso-fonctionnalité avec le site Gatsby actuel<br>- Toutes les US précédentes doivent être satisfaites |
| US-MIG-02 | **En tant que** développeur, **je veux** héberger le site sur GitHub Pages, **afin de** me séparer de Netlify. | - Build statique déployé via GitHub Actions<br>- Domaine personnalisé thierrytouin.fr conservé |
| US-MIG-03 | **En tant que** développeur, **je veux** adapter les Dockerfiles à la nouvelle stack, **afin de** conserver le workflow de dev containerisé. | - Dockerfile.dev : environnement de dev Astro<br>- Dockerfile.run : serveur de dev Astro<br>- docker-compose.yml adapté |
| US-MIG-04 | **En tant que** propriétaire, **je veux** moderniser le design du site dans une phase ultérieure, **afin de** avoir une vitrine visuellement à jour. | - Phase séparée, après migration technique iso-fonctionnelle<br>- Mobile-first |

---

## 7. Articles de blog existants

| Fichier | Titre | Date | Image featured |
|---------|-------|------|----------------|
| `site-perso-sans-wordpress.md` | Mon site perso sans Wordpress ! | 2022-03-22 | Non |
| `performance-java-et-logger.md` | Performance Java et Logger ! | 2022-04-13 | Non |
| `developper-avec-docker.md` | Développer avec Docker ! | 2022-02-21 | Oui (`1582889227259.jpeg`) |
| `linky-vers-jeedom.md` | Consommation électrique Linky vers Jeedom ! | 2023-01-06 | Oui (`light-bulb.jpg`) |
| `mon-nouveau-couteau.md_disabled` | *(désactivé)* | — | — |

---

## 8. Structure des données CV (`data/cv-data.js`)

```
cv
├── name: string                          # "Thierry TOUIN"
├── meta: { format, version }
├── info: { label, image, summary }       # Résumé pro (HTML)
├── contact: { phone, email, other[] }
├── location: { address, city, code, country }
├── social: [{ label, network, user, url }]
├── employment
│   └── history: [{
│       url, summary, societe, projet, start, position,
│       place, period, keywords[], highlights[], end, employer
│   }]
├── education
│   └── history: [{ end, institution, start }]
├── knowledges
│   └── sets: [{ name, skills[] }]
└── skills
    └── sets: [{ name, skills[] }]
```

---

## 9. Glossaire

| Terme | Définition |
|-------|------------|
| **Slug** | Identifiant URL dérivé du nom du fichier Markdown (ex: `developper-avec-docker`) |
| **Frontmatter** | Bloc YAML en tête d'un fichier Markdown contenant les métadonnées (titre, date, etc.) |
| **FRESH** | Format de CV structuré (Fluent Resume & Employment Schema History), version 0.6.0 |
| **Static Query** | Requête GraphQL Gatsby exécutée au build (pas de variables dynamiques) |
| **CSS Modules** | Fichiers SCSS scopés au composant (`.module.scss`) pour éviter les conflits de styles |
| **MQTT** | Protocole de messagerie léger pour l'IoT (Message Queuing Telemetry Transport) |
| **Retain** | Flag MQTT qui conserve le dernier message sur le broker pour les nouveaux abonnés |
