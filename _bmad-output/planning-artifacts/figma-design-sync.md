# Design System - personal-site
## Synchronisation Figma - 16 avril 2026

---

## 🎯 Vision & Principes

### Concept
Vitrine personnelle d'Architecte Solution au style **éditorial minimaliste**. La première impression doit installer immédiatement la crédibilité, puis guider vers la preuve (CV + articles) et l'action (contact).

### Principes Directeurs
- **Clarté avant exhaustivité** — hiérarchie visuelle nette
- **Mobile d'abord, desktop amplifié** — responsive naturel
- **Lecture longue sans fatigue** — typographie calibrée
- **Personnalité graphique maîtrisée** — jamais décorative
- **Chaque écran renforce la confiance** — cohérence perçue

---

## 🎨 Système de Couleurs

### Palette Principale
| Token | Valeur | Usage |
|-------|--------|-------|
| **Fond Principal** | `#f7f5f2` | Background global, beige chaud |
| **Surface** | `#ffffff` | Cartes, sections, conteneurs |
| **Texte Principal** | `#1f252b` | Corps, titres, lisibilité forte |
| **Texte Muted** | `#5c6670` | Métadonnées, texte secondaire |
| **Primaire** | `#1e5a96` | Actions, repères, confiance |
| **Primaire Strong** | `#15446f` | États hover/active |
| **Accent Chaud** | `#c47a3a` | Accent mesuré, signature |
| **Border** | `#d9d4cc` | Séparations discrètes |
| **Success** | `#2d8a4a` | États positifs |
| **Warning** | `#b87d3a` | États d'alerte |
| **Error** | `#c64545` | États d'erreur |

### Psychologie Couleur
- **Bleu confiance** (#1e5a96) : professionnel, stable, fiable
- **Beige chaud** (#f7f5f2) : accessible, intemporel, editorial
- **Accent chaud** (#c47a3a) : personnalité, signature subtile

---

## 📝 Typographie

### Familles de Polices
- **Serif Editorial** : Merriweather
  - Usage : Titres (H1, H2, H3), branding
  - Caractère : élégant, autorité, editorial
  
- **Sans-Serif Opérationnel** : Source Sans 3
  - Usage : Corps, métadonnées, UI
  - Caractère : lisible, moderne, accessible

### Échelle Typographique

#### Titres
| Niveau | Desktop | Mobile | Line Height | Weight |
|--------|---------|--------|-------------|--------|
| H1 | 44px | 34px | 1.2 | 700 |
| H2 | 32px | 28px | 1.25 | 600 |
| H3 | 24px | 22px | 1.3 | 600 |

#### Corps & Texte
| Type | Taille | Line Height | Weight | Usage |
|------|--------|-------------|--------|-------|
| Body Large | 20px | 1.6 | 400 | Highlights |
| Body Regular | 18px | 1.65 | 400 | Lecture longue |
| Meta | 14px | 1.5 | 400 | Métadonnées |
| Small | 13px | 1.4 | 400 | UI minor |

### Constraints Lecture
- **Content max-width** : 70ch (caractères) pour confort optimal
- **Ligne idéale** : 62-70 caractères = lecture fluide
- **Interlignage** : 1.65 pour lecture longue sans fatigue

---

## 🏗️ Composants & Layouts

### Header/Hero
- **Fond** : Image responsive (`header-image2.avif`)
- **Min-height** : 280px (mobile) → 350px (tablet) → 500px max
- **Height** : 60vh (mobile) → 65vh (tablet)
- **Overlay** : Text shadow pour lisibilité
- **Contenu** : Centré, 90% max-width
- **Marque** : Serif 32px mobile / 44px desktop, couleur blanc

### Content Containers
- **Max-width** : 1120px
- **Spacing vertical** : espacements 8px-96px modulaires
- **Padding** : $space-2 (16px) mobile → $space-4+ (32px+) desktop

### Navigation
- **Stable et prévisible** : positionnement cohérent
- **Couleur primaire** : #1e5a96 pour repères actifs
- **Hover states** : texte-décoration underline 2px, offset 4px

---

## 📱 Responsive Strategy

### Breakpoints
- **Mobile** : < 768px
  - 280px min hero
  - 90% width content
  - 16px padding sides
  
- **Tablet** : ≥ 768px
  - 350px min hero, 65vh
  - Max-width 1120px
  - 32px+ padding

- **Desktop** : ≥ 1024px
  - Full height optimisation
  - Spread optimisation

### Mobile-First Principles
1. Design d'abord pour petit écran
2. Hiérarchie de contenu en blocs courts/scannables
3. Navigation simple et stable
4. Desktop enrichit l'espace sans changer la logique d'usage

---

## ✨ Experience Moments Clés

### Premier Écran (Perception)
- Perception immédiate : séniorité, clarté, crédibilité
- Hero image + message fort + hiérarchie claire

### Premier Scroll (Confirmation)
- Preuves concrètes : parcours, expertise, contenu
- Rythme naturel sans surcharge

### Fin de Session (Intent)
- Intention claire : revenir ou prendre contact
- CTA visible et motivant

---

## 🎬 État des Branches
- **Branche active** : `feat/ux-editorial-minimal`
- **Dernier commit** : "test design" (16 avril 2026)
- **Fichiers impactés** : header, promise, styles, tokens
- **Statut** : Prêt pour synchronisation Figma

---

*Documentation générée pour synchronisation MCP Figma*
*Design Direction: D06 Hybrid Signature*
