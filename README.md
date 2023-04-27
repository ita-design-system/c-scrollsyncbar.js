# c-scrollsyncbar.js

c-scrollsyncbar.js est une librairie permettant d'afficher/masquer des éléments HTML progressivement en fonction du sens de défilement de la fenêtre.

![GIF exemple usage c-scrollsyncbar.js 1](https://user-images.githubusercontent.com/13103047/234616162-0b5b4222-8bce-4d18-ab16-709a6ead5a11.gif)
![GIF exemple usage c-scrollsyncbar.js 2](https://user-images.githubusercontent.com/13103047/234616353-a2431b8d-6e02-422a-a2de-05fb4dbff243.gif)

## Installation

Il est recommandé de placer les fichiers dans cet ordre avant la balise fin de body.

### En local

```html
<body>
    <script src="/path/to/c-scrollsyncbar.js"></script> <!-- obligatoire -->
</body>
```

### Sur CDN

via [https://www.jsdelivr.com/](https://www.jsdelivr.com/)

```html
<!-- Version la plus récente -->
https://cdn.jsdelivr.net/gh/ita-design-system/c-scrollsyncbar.js/ui/js/c-scrollsyncbar.js

<!-- Version la plus récente minifiée -->
https://cdn.jsdelivr.net/gh/ita-design-system/c-scrollsyncbar.js/ui/js/c-scrollsyncbar.min.js

<!-- Typologie avec numéro de version -->
https://cdn.jsdelivr.net/gh/ita-design-system/c-scrollsyncbar.js@<TAG_VERSION>/ui/js/c-scrollsyncbar.js

<!-- Typologie numéro de version + minification automatique -->
https://cdn.jsdelivr.net/gh/ita-design-system/c-scrollsyncbar.js@<TAG_VERSION>/ui/js/c-scrollsyncbar.min.js

<!-- Exemple v0.1.0 -->
https://cdn.jsdelivr.net/gh/ita-design-system/c-scrollsyncbar.js@v0.1.0/ui/js/c-scrollsyncbar.js
https://cdn.jsdelivr.net/gh/ita-design-system/c-scrollsyncbar.js@v0.1.0/ui/js/c-scrollsyncbar.min.js
```

```html
<body>
    <!-- Exemple avec version la plus récente -->
    <script src="https://cdn.jsdelivr.net/gh/ita-design-system/c-scrollsyncbar.js/ui/js/c-scrollsyncbar.min.js"></script>

    <!-- Exemple avec numéro de version -->
    <script src="https://cdn.jsdelivr.net/gh/ita-design-system/c-scrollsyncbar.js@v0.1.0/ui/js/c-scrollsyncbar.min.js"></script>
</body>
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

### Sensibilité `scrollSteps`

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

### Formule personnalisée

c-scrollsyncbar.js fonctionne uniquement avec la [propriété CSS transform](https://developer.mozilla.org/fr/docs/Web/CSS/transform). Par défaut, la formule de transformation est `translateY(-|x|%)` dans laquelle `|x|` est un nombre compris entre à et 100. Il est possible de personnaliser la formule pour chaque élément en l'écrivant dans l'attribut `data-transform` de l'élément:

[Démo](https://ita-design-system.github.io/c-scrollsyncbar.js/content/custom-formula.html)

```html
<div c-scrollsyncbar="foo" data-transform="translateY(-|x|%) scale(clamp(0.5, calc(1 - |x| / 100), 1))">
    <!-- contenu -->
</div>

<div c-scrollsyncbar="bar" data-transform="rotateY(clamp(0deg, |x|deg, 90deg)">
    <!-- contenu -->
</div>
```

### Méthode `cScrollSyncBar.update()`

* Indispensable pour initialiser l'application, crée les instances des éléments sur lequels appliquer l'effet.
* Mettre à jour les options

```javascript
// Initialisation ou mise à jour avec paramètres par défaut
cScrollSyncBar.update();

// Initialisation ou mise à jour avec paramètres personnalisés
cScrollSyncBar.update({scrollSteps: 500});
```

### Méthode `cScrollSyncBar.pause()`

Interrompre l'effet de la librairie. Maintient les élements dans l'état courant.

```javascript
cScrollSyncBar.pause();
```

### Méthode `cScrollSyncBar.stop()`

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