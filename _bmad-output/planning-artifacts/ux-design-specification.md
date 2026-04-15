---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments:
  - /data/work/dev-perso/personal-site/_bmad-output/project-documentation.md
---

# UX Design Specification personal-site

**Author:** Thierry
**Date:** 15 avril 2026

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Project Vision
Creer une vitrine personnelle d'Architecte Solution au style editorial minimaliste, ou la premiere impression sur la page d'accueil installe immediatement la credibilite, puis guide vers la preuve (CV + articles) et l'action (contact).

### Target Users
Utilisateurs principaux:
- Recruteurs qui evaluent rapidement la seniorite et la clarte du positionnement.
- Clients potentiels qui recherchent un profil fiable, structure et oriente resultats.
- Pairs techniques qui valident la profondeur par le contenu du blog.

### Key Design Challenges
- Maximiser l'impact de la page d'accueil sans surcharge visuelle.
- Concilier esthetique editoriale (serif) et lisibilite operationnelle.
- Preserver un style distinctif sur mobile avec des performances solides.

### Design Opportunities
- Utiliser un hero photo + overlays comme signature visuelle professionnelle.
- Construire une hierarchie typographique forte pour guider la lecture en 10 secondes.
- Transformer l'accueil en parcours de conversion clair: promesse -> preuves -> contact.

## Core User Experience

### Defining Experience
L'experience coeur du site est une lecture guidee et immediate de la proposition de valeur professionnelle de Thierry, en moins de 10 secondes sur mobile. Le visiteur doit comprendre qui il est, ce qu'il apporte, et pourquoi lui faire confiance avant meme d'entrer dans les details du CV ou du blog.

### Platform Strategy
La strategie est mobile-first:
- architecture visuelle pensee d'abord pour petit ecran;
- hierarchie de contenu en blocs courts et scannables;
- navigation simple, stable et previsible;
- adaptation desktop en enrichissant l'espace, sans changer la logique d'usage.

### Effortless Interactions
Les interactions a rendre sans effort:
- lecture d'articles longs avec rythme typographique confortable;
- progression naturelle dans le contenu (promesse -> preuve -> action);
- retour au point cle rapide (navigation et scroll assistes);
- continuite visuelle entre Accueil, About et Blog pour eviter toute rupture cognitive.

### Critical Success Moments
Moments decisifs de reussite:
- premier ecran: perception immediate de seniorite, clarte et credibilite;
- premier scroll: confirmation par preuves concretes (parcours, expertise, contenu);
- fin de session: intention claire de revenir ou de prendre contact.

### Experience Principles
Principes directeurs:
- Clarte avant exhaustivite.
- Mobile d'abord, desktop amplifie.
- Lecture longue sans fatigue.
- Personnalite graphique maitrisee, jamais decorative.
- Chaque ecran doit renforcer la confiance.

## Desired Emotional Response

### Primary Emotional Goals
Le site doit d'abord installer une confiance immediate, puis ouvrir une curiosite naturelle qui donne envie d'explorer davantage.
L'emotion dominante recherchee est: "ce professionnel est solide, clair et humain".

### Emotional Journey Mapping
- Decouverte (premier ecran): curiosite + credibilite instantanee.
- Exploration (scroll/navigation): sentiment de clarte, rythme calme, comprehension progressive.
- Lecture longue (CV/articles): confort, concentration, absence de fatigue cognitive.
- Fin de visite: respect professionnel suffisamment fort pour declencher la recommandation.
- Retour sur le site: familiarite et continuite, sans friction.

### Micro-Emotions
Micro-etats a favoriser:
- Confiance plutot que scepticisme.
- Curiosite plutot qu'indifference.
- Confort de lecture plutot qu'effort.
- Fierte de recommandation plutot que simple satisfaction passive.

Micro-etat a eviter en priorite:
- Froid/impersonnel (distance emotionnelle, ton trop neutre, esthetique trop generique).

### Design Implications
Connexions emotion -> choix UX:
- Confiance immediate -> hierarchie visuelle nette, message de valeur explicite au-dessus de la ligne de flottaison.
- Curiosite -> progression narrative legere (promesse -> preuves -> contact) avec transitions discretes.
- Confort de lecture -> typographie editoriale bien calibree, largeur de ligne maitrisee, interlignage genereux.
- Recommandation -> coherence percue, details soignes, personnalite graphique subtile mais memorable.
- Eviter le froid/impersonnel -> tonalite redactionnelle plus humaine, visuels moins "template", accents de marque mesures.

### Emotional Design Principles
- Inspirer la confiance avant de convaincre.
- Susciter la curiosite sans creer de confusion.
- Faire de la lecture un espace de confort.
- Construire une personnalite graphique chaleureuse et professionnelle.
- Terminer chaque parcours sur une impression recommandable.

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis
Stripe excelle dans la mise en confiance immediate: hierarchie visuelle nette, message de valeur explicite, et structure qui guide sans friction.
Linear se distingue par une interface reduite a l'essentiel, ou chaque interaction semble evidente et rapide, sans surcharge.
Medium reussit la lecture longue grace a une typographie respirante, une largeur de ligne maitrisee, et une progression de contenu tres confortable sur mobile.

### Transferable UX Patterns
Patterns de navigation transferables:
- Navigation principale courte et stable, visible des l'arrivee.
- Parcours narratif simple: promesse -> preuves -> action.

Patterns d'interaction transferables:
- Transitions discretes et rapides, jamais decoratives.
- Etats hover/focus propres et lisibles pour renforcer la sensation de maitrise.

Patterns visuels transferables:
- Hero clair avec message principal fort (inspiration Stripe).
- Densite reduite, composants aeres, alignements stricts (inspiration Linear).
- Systeme typographique oriente lecture profonde (inspiration Medium).

### Anti-Patterns to Avoid
- Interfaces "vitrine" trop generiques qui paraissent impersonnelles.
- Multiplication d'effets visuels qui ralentissent la lecture mobile.
- Blocs trop denses sans respiration typographique.
- CTA noyes dans le contenu sans hierarchie claire.

### Design Inspiration Strategy
Ce qu'on adopte:
- Clarte de proposition de valeur au premier ecran.
- Minimalisme fonctionnel dans la navigation et les interactions.
- Confort editorial maximal pour CV et blog.

Ce qu'on adapte:
- Le niveau de sobriete de Linear, en ajoutant plus de chaleur humaine.
- Le confort de lecture de Medium, applique a un site vitrine oriente conversion.
- La credibilite "enterprise" de Stripe, calibree pour un profil personnel.

Ce qu'on evite:
- Le style trop froid/standardise.
- Les animations ostentatoires.
- Les structures de page qui noient la promesse principale.

## Design System Foundation

### 1.1 Design System Choice
Nous retenons une approche de design system thematique leger, fondee sur une architecture SCSS tokenisee et un set de composants UI maison cibles.
Le projet n'adopte pas de framework UI lourd; il conserve une base front legere et performante, orientee vitrine professionnelle mobile-first.

### Rationale for Selection
- Le site doit exprimer une personnalite visuelle forte sans tomber dans un rendu generique.
- Le contexte est un site personnel expert, pas une application metier necessitant une bibliotheque exhaustive de composants complexes.
- La strategie mobile-first et le besoin de confort de lecture longue favorisent un systeme maitrise et sobre.
- L'existant Gatsby + SCSS permet une migration progressive sans dette d'integration inutile.

### Implementation Approach
- Creer une couche de design tokens centralisee (couleurs, typo, espacements, rayons, ombres, z-index, transitions).
- Structurer les styles autour de primitives reutilisables: container, stack, grid, section, surface, text styles.
- Definir un noyau de composants maison: Hero, Nav, Button, Card, ArticlePreview, SectionHeader, Footer.
- Etablir des regles d'accessibilite par defaut: contrastes AA, focus visible, tailles tactiles, etats interactifs coherents.
- Deployer en iterations: accueil d'abord, puis pages CV, puis templates article.

### Customization Strategy
- Typographie editoriale pilotee par tokens (titres serif, texte courant sans-serif si necessaire pour lisibilite).
- Palette sobre et professionnelle avec accents controles pour guider l'attention.
- Motion discrete: transitions courtes, revelations legeres, aucune animation decorative lourde.
- Signature visuelle via hero photo + overlays geometriques subtils.
- Regles anti-derive: pas de composant sans token, pas de variante visuelle sans justification UX.
