# Catalogue US en vigueur (Astro)

Date: 20 avril 2026
Objectif: référentiel fonctionnel aligné avec l'implémentation actuelle.

## Règles de lecture

- Les IDs historiques sont conservés pour la traçabilité.
- Les critères ci-dessous reflètent le comportement réellement implémenté.
- Les exigences non implémentées sont exclues de ce catalogue et traitées dans la matrice de conformité.

## Epic 1 - Blog

### US-BLOG-01 - Liste des articles
Critères d'acceptation:
- La page d'accueil affiche la liste des articles triée par date décroissante.
- Chaque item affiche au minimum: titre, date, image featured (si présente), description (si présente), lien vers le détail.

### US-BLOG-02 - Détail d'article
Critères d'acceptation:
- Chaque article est accessible via /blog/{slug}/.
- Le slug correspond a l'identifiant de l'entrée de contenu.
- La page détail affiche: titre, date, contenu Markdown rendu.

### US-BLOG-03 - Publication Markdown
Critères d'acceptation:
- Les articles sont stockés dans src/content/blog.
- Frontmatter supporté: title (obligatoire), date (obligatoire), description (optionnel), featured (optionnel).
- Les pages sont générées statiquement au build.

## Epic 2 - CV

### US-CV-01 - Résumé professionnel
Critères d'acceptation:
- Le résumé professionnel est affiché dans la page /cv (section Info).
- Le contenu enrichi (HTML) est rendu correctement.

### US-CV-02 - Expériences
Critères d'acceptation:
- Les expériences sont affichées dans /cv (section Expériences).
- Chaque expérience expose projet, position, société, employeur, dates, résumé, highlights, keywords.
- Si date de fin absente, l'affichage indique "A ce jour".

### US-CV-03 - Formations
Critères d'acceptation:
- Les formations sont affichées dans /cv (section Formations).
- Chaque entrée expose au minimum année de début et institution.

### US-CV-04 - Compétences transverses
Critères d'acceptation:
- Les connaissances fonctionnelles sont affichées dans /cv (section Compétences).
- Affichage par catégorie avec liste d'éléments.

### US-CV-05 - Compétences techniques
Critères d'acceptation:
- Les compétences techniques sont affichées dans /cv (section Skills Techniques).
- Affichage par catégorie avec liste d'éléments.

### US-CV-06 - Navigation CV
Critères d'acceptation:
- Un menu latéral est visible sur desktop dans /cv.
- Le menu permet la navigation interne par ancres (Info, Expériences, Formations, Compétences, Skills).
- En mobile, le menu devient horizontal/empilé via media query.

### US-CV-07 - Source de données unique CV
Critères d'acceptation:
- La source de données CV est unique et centralisée dans src/data/cv.json.
- Le format FRESH@0.6.0 est conservé.

## Epic 3 - Contact

### US-CONTACT-01 - Coordonnées
Critères d'acceptation:
- La page /contact affiche l'email.
- La page /contact affiche les liens sociaux (GitHub, LinkedIn).
- Les données proviennent de src/data/cv.json.

## Epic 4 - IoT / MQTT

### US-MQTT-01 - Télémétrie page d'accueil
Critères d'acceptation:
- Au chargement de la page d'accueil, récupération de l'IP publique via ipify.
- Connexion WebSocket MQTT sur wss://test.mosquitto.org:8081.
- Publication sur le topic tto/page1 avec payload { ts, ip } et retain=true.
- Fermeture de la connexion après publication ou en cas d'erreur.
- Garde anti-duplication côté navigateur pendant la session de page.

## Epic 5 - SEO

### US-SEO-01 - Métadonnées SEO
Critères d'acceptation:
- Le layout définit html lang=fr.
- Chaque page expose title, description, OG et Twitter cards.
- URL canonique calculée à partir de la route active.

## Epic 6 - UX et Navigation

### US-UX-01 - Navigation principale
Critères d'acceptation:
- Le header expose les liens Home, About-Me (/cv), Contact.

### US-UX-02 - Hero header
Critères d'acceptation:
- Le header affiche une image hero avec titre et description.

### US-UX-03 - Retour en haut
Critères d'acceptation:
- Un bouton retour en haut apparaît après 300px de scroll.
- Le bouton est fixe et remet la page en haut au clic.

### US-UX-04 - 404
Critères d'acceptation:
- La page 404 affiche un message explicite et un lien de retour.

### US-UX-05 - Responsive
Critères d'acceptation:
- Le layout CV adapte sa structure pour mobile (breakpoint 768px).
- Le contenu reste lisible sur mobile.

### US-UX-06 - Footer
Critères d'acceptation:
- Le footer affiche "Site developed by TTO ..." avec l'année courante.

## Epic 7 - Infrastructure

### US-INFRA-01 - Build statique
Critères d'acceptation:
- La commande npm run build produit un site statique dans dist.

### US-INFRA-02 - Container de dev
Critères d'acceptation:
- Dockerfile.dev permet de lancer Astro dev (port 4321).

### US-INFRA-03 - Container build/serve
Critères d'acceptation:
- Dockerfile.build exécute astro build puis sert dist sur le port 9000.

### US-INFRA-04 - Orchestration
Critères d'acceptation:
- docker-compose orchestre les services dev et build.
- run.sh expose les commandes opérationnelles (dev-start, build-start, etc.).

## Hors périmètre actuel

- US-ANALYTICS-01 (Clicky): non implémentée dans le code.
- US-SEO-02 et US-SEO-03 dans leur formulation historique (génération/conditionnel): à redéfinir.
- User stories migration (US-MIG-*): considérées clôturées et à retirer du backlog produit courant.
