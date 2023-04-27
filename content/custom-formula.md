---
title: Formules personnalisées
description: Exemples d’élements avec des formules CSS transform personnalisées
layout: libdoc/page-split
category: Exemples
order: 10
---

```html
<nav c-scrollsyncbar="foo"
    data-transform="translateY(-|x|%) scale(clamp(0.5, calc(1 - |x| / 100), 1))">
    <a href="#">c-scrollsyncbar.js</a>
</nav>

<p>Défiler vers le bas pour observer l'effet, vers le haut pour inverser immédiatement le mouvement.</p>

<footer>
    <nav c-scrollsyncbar="bar"
        data-transform="rotateY(clamp(0deg, |x|deg, 90deg)">
        <a href="#">Retour vers le haut</a>
    </nav>
</footer>

<!-- DEMO ONLY -->
<style>
    * {
        box-sizing: border-box;
    }
    body {
        min-height: 500vh;
        padding: var(--ita-spacing-14) var(--ita-spacing-8);
        color: var(--ita-color-primary-800);
        font-family: var(--ita-font-family-mono);
        font-size: 1rem;
        line-height: 1.5rem;
        background-color: ghostwhite;
    }
    [c-scrollsyncbar="foo"] {
        position: fixed;
        top: 0%;
        left: 0;
        width: 100%;
        padding: 1em;
        background-color: var(--ita-color-primary-500);
    }
    footer {
        position: fixed;
        perspective: 800px;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    [c-scrollsyncbar="bar"] {
        padding: 2em;
        background-color: var(--ita-color-support-success-100);
    }
    [c-scrollsyncbar="foo"] a {
        color: var(--ita-color-neutral-100);
    }
    [c-scrollsyncbar="bar"] a {
        color: var(--ita-color-support-success-700);
    }
</style>
```
{:.playground title="Exemples de formules personnalisées"}