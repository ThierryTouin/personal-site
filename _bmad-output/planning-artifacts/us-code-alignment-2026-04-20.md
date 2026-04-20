# Matrice complète de conformité US / Code

Date: 20 avril 2026
Périmètre audité: sources Astro (src, config, Docker, workflow) + documentation BMAD

## Résumé global

- Total US auditées: 35
- Conformes: 15
- Partiellement conformes: 11
- Non conformes: 9

## Matrice détaillée

| ID | Statut | Diagnostic | Preuves principales |
|----|--------|------------|---------------------|
| US-BLOG-01 | Partiel | Tri et listing OK, temps de lecture absent | src/pages/index.astro |
| US-BLOG-02 | Partiel | Route et rendu OK, image featured/temps de lecture absents en détail | src/pages/blog/[slug].astro |
| US-BLOG-03 | Conforme | Markdown + frontmatter + génération statique OK | src/content.config.ts, src/content/blog/ |
| US-BLOG-04 | Non conforme | Pas de configuration Monokai/Carbon/numéros de ligne | package.json, src/ |
| US-BLOG-05 | Non conforme | Pas d'intégration Mermaid identifiée | package.json, src/ |
| US-BLOG-06 | Non conforme | Pas de transformation :emoji: dédiée identifiée | package.json, src/ |
| US-BLOG-07 | Partiel | Lazy loading présent, optimisation pipeline non démontrée | src/pages/index.astro |
| US-BLOG-08 | Non conforme | Temps de lecture non affiché | src/pages/index.astro, src/pages/blog/[slug].astro |
| US-CV-01 | Partiel | Contenu OK mais route en /cv (pas /about/) | src/pages/cv.astro |
| US-CV-02 | Partiel | Contenu OK mais route en /cv + formulation date différente | src/pages/cv.astro |
| US-CV-03 | Partiel | Contenu OK mais route en /cv | src/pages/cv.astro |
| US-CV-04 | Partiel | Contenu OK mais route en /cv | src/pages/cv.astro |
| US-CV-05 | Partiel | Contenu OK mais route en /cv | src/pages/cv.astro |
| US-CV-06 | Partiel | Menu latéral présent, mais navigation par ancres sur une page unique | src/pages/cv.astro |
| US-CV-07 | Conforme | Source unique centralisée en JSON, format FRESH conservé | src/data/cv.json |
| US-CONTACT-01 | Conforme | Email + GitHub + LinkedIn issus du JSON CV | src/pages/contact.astro, src/data/cv.json |
| US-MQTT-01 | Conforme | IP + MQTT + topic + retain + fermeture connexion | src/pages/index.astro |
| US-SEO-01 | Conforme | Lang fr, title, description, OG, Twitter, canonical | src/layouts/Layout.astro |
| US-SEO-02 | Non conforme | Génération sitemap auto non configurée côté Astro | astro.config.mjs, package.json |
| US-SEO-03 | Non conforme | robots conditionnel previews non implémenté | public/robots.txt |
| US-ANALYTICS-01 | Non conforme | Aucun script Clicky trouvé | src/ |
| US-UX-01 | Partiel | Menu principal présent, pas d'état actif visuel explicite | src/layouts/Layout.astro |
| US-UX-02 | Conforme | Hero image + titre + description présents | src/layouts/Layout.astro |
| US-UX-03 | Conforme | Bouton scroll-to-top après 300px + clic vers haut | src/layouts/Layout.astro |
| US-UX-04 | Conforme | Page 404 claire avec lien de retour | src/pages/404.astro |
| US-UX-05 | Partiel | Responsive observé (notamment CV), couverture globale non testée | src/pages/cv.astro, src/styles/global.scss |
| US-UX-06 | Conforme | Footer et année courante présents | src/layouts/Layout.astro |
| US-INFRA-01 | Conforme | Build statique Astro vers dist | package.json |
| US-INFRA-02 | Conforme | Docker dev Astro opérationnel | Dockerfile.dev, docker-compose.yml, run.sh |
| US-INFRA-03 | Partiel | Build/serve OK mais port diffère du critère historique (9000 vs 8000) | Dockerfile.build, run.sh |
| US-INFRA-04 | Partiel | Orchestration OK mais services/ports différents du wording historique | docker-compose.yml, run.sh |
| US-MIG-01 | Conforme | Migration Astro réalisée dans le code | package.json, src/ |
| US-MIG-02 | Conforme | Déploiement GitHub Pages via workflow | .github/workflows/deploy.yml |
| US-MIG-03 | Conforme | Dockerfiles et compose adaptés à Astro | Dockerfile.dev, Dockerfile.build, docker-compose.yml |
| US-MIG-04 | Partiel | Refonte visuelle majeure non engagée (phase ultérieure) | src/styles/global.scss |

## Observations majeures

1. MQTT est aligné code/documentation: ce n'est plus un gap.
2. Le décalage principal est le référentiel US historique encore orienté Gatsby (routes /about, plugins Gatsby, ports 8000, Clicky).
3. Le backlog doit distinguer:
   - les US "produit en vigueur" (catalogue Astro),
   - les US "héritées à fermer/adapter".

## Actions recommandées

1. Prendre comme référence active le catalogue Astro: planning-artifacts/us-catalog-astro-2026-04-20.md.
2. Arbitrer US-ANALYTICS-01 (réimplémenter ou retirer officiellement).
3. Décider si le CV doit rester sur /cv (page unique) ou revenir à /about/* (multi-pages).
4. Nettoyer les artefacts Gatsby historiques dans public pour réduire les faux positifs d'audit.
