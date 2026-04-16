# 🚀 Synchronisation Design → Figma - INSTRUCTIONS

## ✅ Étapes Complétées

### 1️⃣ Spécification Chargée
- ✓ Fichier: `figma-design-sync.md`
- ✓ Contenu: Vision, couleurs, typographie, composants, responsive
- ✓ Format: Markdown structuré pour Figma

### 2️⃣ Profil Figma Vérifié
- ✓ Compte: **Thierry Touin** (thierrytouin.pro@gmail.com)
- ✓ Token API: **Valide et actif**
- ✓ Connexion: **Confirmée**

### 3️⃣ Payload Préparé
- ✓ Fichier: `figma-sync-payload.json`
- ✓ Contenu: Spécification complète sérialisée pour MCP
- ✓ Format: JSON structuré

---

## 🎯 Finalisation dans Figma

### Option A: Via VS Code Copilot Chat (⭐ Recommandée)

1. **Ouvre VS Code**
   - Raccourci: `Ctrl+Shift+I` (ou `Cmd+Shift+I` sur Mac)

2. **Copilot Chat devient actif**
   - Regarde la barre de chat en bas à droite

3. **Tape cette commande:**
   ```
   @Figma Crée un nouveau fichier "personal-site Design System" 
   avec la spécification de design suivante:
   
   # Design System - personal-site
   
   ## Vision
   Vitrine personnelle d'Architecte Solution au style éditorial minimaliste.
   
   ## Couleurs
   - Fond: #f7f5f2 (beige chaud)
   - Texte: #1f252b (bleu très sombre)
   - Primaire: #1e5a96 (bleu confiance)
   - Accent: #c47a3a (chaud mesuré)
   
   ## Typographie
   - Serif: Merriweather (titres)
   - Sans: Source Sans 3 (corps)
   - H1: 44px/34px (desktop/mobile)
   - Body: 18px, 1.65 line-height
   
   ## Composants
   - Header: image responsive 60-65vh
   - Hero: centré, blanc, serif 32-44px
   - Containers: max 1120px
   
   ## Responsive
   - Mobile-first
   - Breakpoints: 768px, 1024px
   ```

4. **Attends la réponse du serveur MCP Figma**
   - ✅ Le serveur créera le fichier dans Figma
   - ✅ Les sections seront organisées
   - ✅ Les tokens seront appliqués

5. **Vérifie dans Figma**
   - Ouvre https://figma.com
   - Cherche le fichier "personal-site Design System"
   - Devrait être dans ton workspace principal

---

### Option B: Via API Directe (Script personnalisé)

Un script personnalisé peut être créé pour synchroniser directement via l'API Figma si nécessaire. Dis-moi si tu veux explorer cette approche ! 🔧

---

## 📊 Contenu Inclus dans la Synchronisation

```
Design System
├── 🎯 Vision & Principes
│   ├── Concept éditorial minimaliste
│   ├── Principes directeurs
│   └── Target users
│
├── 🎨 Système de Couleurs
│   ├── Palette (11 tokens)
│   ├── Psychologie couleur
│   └── Mappings sémantiques
│
├── 📝 Typographie
│   ├── Familles (Merriweather + Source Sans 3)
│   ├── Échelle (H1-H3, Body, Meta)
│   └── Constraints lecture (70ch)
│
├── 🏗️ Composants & Layouts
│   ├── Header/Hero
│   ├── Content containers
│   └── Navigation
│
├── 📱 Responsive Strategy
│   ├── Mobile-first
│   ├── Breakpoints
│   └── Constraints
│
└── ✨ Experience Moments
    ├── Premier écran
    ├── Premier scroll
    └── Fin de session
```

---

## 🔗 Fichiers Source

| Fichier | Statut | Chemin |
|---------|--------|--------|
| **figma-design-sync.md** | ✅ Spécification | `_bmad-output/planning-artifacts/` |
| **figma-sync-payload.json** | ✅ Payload MCP | `_bmad-output/planning-artifacts/` |
| **sync-design-to-figma.js** | ✅ Script | `./` |

---

## ⚡ Prochaines Actions

- [ ] Ouvrir Copilot Chat dans VS Code
- [ ] Utiliser `@Figma` pour synchroniser
- [ ] Vérifier le fichier dans Figma
- [ ] Collaborer sur le design avec l'équipe
- [ ] Itérer basé sur feedback
- [ ] Merger la branche `feat/ux-editorial-minimal` une fois validé

---

**Créé par:** Sally, UX Designer  
**Date:** 16 avril 2026  
**Branche:** `feat/ux-editorial-minimal`  
**Statut:** ✨ Prêt pour publication Figma
