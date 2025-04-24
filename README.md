---
title: c-scrollsyncbar.js
description: Documentation de la librairie c-scrollsyncbar.js permettant d’afficher/masquer des éléments HTML progressivement en fonction du sens de défilement de la fenêtre.
layout: libdoc_page.liquid
permalink: index.html
date: git Last Modified
---

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/ita-design-system/c-scrollsyncbar.js?style=for-the-badge)](https://github.com/ita-design-system/c-scrollsyncbar.js/releases)

![GIF exemple usage c-scrollsyncbar.js 1](/assets/capture-1.gif)
![GIF exemple usage c-scrollsyncbar.js 2](/assets/capture-2.gif)

{% include 'sandbox' path: '/sandboxes/1/index.html', title: 'Démo c-scrollsyncbar.js' %}

## Installation

Il est recommandé de placer les fichiers dans cet ordre avant la balise fin de body.

### En local

```html
<script src="/path/to/c-scrollsyncbar.js"></script>
```

### Sur CDN

Via [https://www.jsdelivr.com/](https://www.jsdelivr.com/)


Version la plus récente:

```html
https://cdn.jsdelivr.net/gh/ita-design-system/c-scrollsyncbar.js/ui/js/c-scrollsyncbar.js
```

Version la plus récente minifiée:

```html
https://cdn.jsdelivr.net/gh/ita-design-system/c-scrollsyncbar.js/ui/js/c-scrollsyncbar.min.js
```

Typologie avec numéro de version:

```html
https://cdn.jsdelivr.net/gh/ita-design-system/c-scrollsyncbar.js@<TAG_VERSION>/ui/js/c-scrollsyncbar.js
```

Typologie numéro de version + minification automatique:

```html
https://cdn.jsdelivr.net/gh/ita-design-system/c-scrollsyncbar.js@<TAG_VERSION>/ui/js/c-scrollsyncbar.min.js
```

Exemple v0.1.0:

```html
https://cdn.jsdelivr.net/gh/ita-design-system/c-scrollsyncbar.js@v0.1.0/ui/js/c-scrollsyncbar.js
https://cdn.jsdelivr.net/gh/ita-design-system/c-scrollsyncbar.js@v0.1.0/ui/js/c-scrollsyncbar.min.js
```

## Usage

Ajouter `c-scrollsyncbar="IDENTIFIANT_UNIQUE_OPTIONNEL"` à l'élément. Par défaut l'élément subit une [transformation CSS](https://developer.mozilla.org/fr/docs/Web/CSS/transform) `translateY(-|x|%)` dans laquelle `|x|` est un nombre compris entre à et 100.

```html
<!-- Minimal -->
<div c-scrollsyncbar="">
    <!-- Contenu -->
</div>

<!-- Avec id personnalisé -->
<div c-scrollsyncbar="foo">
    <!-- Contenu -->
</div>
```

## Sensibilité

Par défaut, l'initialisation se fait avec paramètre de sensibilité de `scrollSteps: 200`, qui correspond au nombre de pixels de défilement qu'il faut pour compléter la course de l'élément.

Il est possible de modifier cette sensibilité en invoquant la méthode `cScrollSyncBar.update({scrollSteps: <INTEGER>});`

* Plus le paramètre `scrollSteps` est élevé, plus la course du défilement nécessaire est longue
* Plus le paramètre `scrollSteps` est petit, plus la course du défilement nécessaire est courte

```javascript
// Faible sensibilité, course longue
cScrollSyncBar.update({scrollSteps: 500});

// Par défaut
cScrollSyncBar.update();
// Est équivalent à
cScrollSyncBar.update({scrollSteps: 200});

// Haute sensibilité, course courte
cScrollSyncBar.update({scrollSteps: 50});
```

## Formule personnalisée

c-scrollsyncbar.js fonctionne uniquement avec la [propriété CSS transform](https://developer.mozilla.org/fr/docs/Web/CSS/transform). Par défaut, la formule de transformation est `translateY(-|x|%)` dans laquelle `|x|` est un nombre compris entre à et 100. Il est possible de personnaliser la formule pour chaque élément en l'écrivant dans l'attribut `data-transform` de l'élément:

{% include 'sandbox' path: '/sandboxes/2/index.html', title: 'Démo 2' %}

## Méthode update

* Indispensable pour initialiser l'application, crée les instances des éléments sur lequels appliquer l'effet.
* Mettre à jour les options

```javascript
// Initialisation ou mise à jour avec paramètres par défaut
cScrollSyncBar.update();

// Initialisation ou mise à jour avec paramètres personnalisés
cScrollSyncBar.update({scrollSteps: 500});
```

## Méthode pause

Interrompre l'effet de la librairie. Maintient les élements dans l'état courant.

```javascript
cScrollSyncBar.pause();
```

## Méthode stop

Stoppe l'effet de la librairie et réinitialise les élements dans leur état d'origine.

```javascript
cScrollSyncBar.stop();
```

## API

Toutes les instances de cScrollSyncBar sont placées dans `cScrollSyncBar.instances[ID_DE_L_INSTANCE]`. `ID_DE_L_INSTANCE` est l'id de l'élément s'il est présent, s'il est absent, cScrollSyncBar applique un id préfixé de `cssb_` suivi de l'index de l'instance.

```javascript
// Élément DOM activé
cScrollSyncBar.instances[ID_DE_L_INSTANCE].el;
// Formule CSS transform en application
cScrollSyncBar.instances[ID_DE_L_INSTANCE].formula;
```