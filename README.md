# c-scrollsyncbar.js

c-scrollsyncbar.js est une barre d'affichage et de masquage synchronisée avec le défilement de la fenêtre. c-scrollsyncbar.js permet d'afficher et de masquer progressivement la navigation ou tout autre élément en synchronisation avec le sens de défilement de la fenêtre.

![Kapture 2023-04-26 at 15 35 42](https://user-images.githubusercontent.com/13103047/234616162-0b5b4222-8bce-4d18-ab16-709a6ead5a11.gif)
![Kapture 2023-04-26 at 15 39 16](https://user-images.githubusercontent.com/13103047/234616353-a2431b8d-6e02-422a-a2de-05fb4dbff243.gif)

## Installation

Il est recommandé de placer les fichiers dans cet ordre avant la balise fin de body.

### En local

```html
<body>
    <script src="/path/to/c-scrollsyncbar.js"></script> <!-- obligatoire -->
    <script src="/path/to/c-scrollsyncbar-callbacks.js"></script> <!-- optionnel -->
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

Ajouter `c-scrollsyncbar="IDENTIFIANT_UNIQUE"` à l'élément. Par défaut l'élément subit une [transformation CSS](https://developer.mozilla.org/fr/docs/Web/CSS/transform) `translateY(-|x|%)` dans laquelle `|x|` est un nombre compris entre à et 100.

```html
<div c-scrollsyncbar="foo">
    <!-- Contenu -->
</div>
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

Indispensable pour démarrer l'application, crée les instances des éléments sur lequel appliquer l'effet.

```javascript
cScrollSyncBar.update();
```
