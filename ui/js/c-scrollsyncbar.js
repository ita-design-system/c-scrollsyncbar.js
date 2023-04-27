/**
* C-SCROLLSYNCBAR
* v0.1.0
* Librairie JS dédiée à l'affichage masquage progressif d'un élément synchronisé avec le sens du défilement
* https://github.com/ita-design-system/c-scrollsyncbar.js
*/

const scrollSyncBar = {
    defaults: {
        scrollSteps: 200
    },
    userSettings: {},
    instances: {},
    update: function(options) {
        Object.keys(scrollSyncBar.defaults).forEach(function(setting) {
            if (typeof options == 'object') {
                if (options[setting] !== undefined) {
                    scrollSyncBar.userSettings[setting] = options[setting];
                } else {
                    scrollSyncBar.userSettings[setting] = scrollSyncBar.defaults[setting];
                }
            } else {
                scrollSyncBar.userSettings[setting] = scrollSyncBar.defaults[setting];
            }
        });
        document.querySelectorAll('[c-scrollsyncbar]').forEach(function(el) {
            const identifier = el.getAttribute('c-scrollsyncbar');
            scrollSyncBar.instances[identifier] = {
                el: el,
                formula: el.dataset.transform || 'translateY(-|x|%)',
                class_origin: el.getAttribute('class')
            }
        });
        scrollSyncBar.raf = requestAnimationFrame(scrollSyncBar._running);
    },
    start: function() {
        scrollSyncBar.raf = requestAnimationFrame(scrollSyncBar._running);
    },
    pause: function() {
        if (scrollSyncBar.raf !== undefined) {
            cancelAnimationFrame(scrollSyncBar.raf);
        }
    },
    reset: function() {
        if (scrollSyncBar.raf !== undefined) {
            cancelAnimationFrame(scrollSyncBar.raf);
            Object.keys(scrollSyncBar.instances).forEach(function(id) {
                scrollSyncBar.instances[id].el.style.transform = '';
            });
        }
    },
    _scroll_previous: window.scrollTop,
    _scroll_delta: 0,
    _running: function(e) {
        // Get difference between current scrollY and previous
        const delta = Math.abs(window.scrollY - scrollSyncBar._scroll_previous);
        if (window.scrollY > scrollSyncBar._scroll_previous) {
            // scrolling down
            if (scrollSyncBar._scroll_delta >= 0 && scrollSyncBar._scroll_delta < scrollSyncBar.userSettings.scrollSteps) {
                scrollSyncBar._scroll_delta = scrollSyncBar._scroll_delta + delta;
            }
        } else if (window.scrollY < scrollSyncBar._scroll_previous) {
            // scrolling up
            if (scrollSyncBar._scroll_delta >= 1 && scrollSyncBar._scroll_delta <= scrollSyncBar.userSettings.scrollSteps) {
                scrollSyncBar._scroll_delta = scrollSyncBar._scroll_delta - delta;
            }
        }
        // Set bounds min and max
        if (scrollSyncBar._scroll_delta < 0 || window.scrollY == 0) {
            scrollSyncBar._scroll_delta = 0
        }
        if (scrollSyncBar._scroll_delta > scrollSyncBar.userSettings.scrollSteps) {
            scrollSyncBar._scroll_delta = scrollSyncBar.userSettings.scrollSteps
        }
        // Simple linear function to convert scroll steps to percents
        const percents_value = 100 * scrollSyncBar._scroll_delta / scrollSyncBar.userSettings.scrollSteps;
        // Apply on each instance
        Object.keys(scrollSyncBar.instances).forEach(function(id) {
            const value = scrollSyncBar.instances[id].formula.replaceAll('|x|', percents_value);
            scrollSyncBar.instances[id].el.style.transform = value;
        });
        // Save previous scrollY
        scrollSyncBar._scroll_previous = window.scrollY;
        scrollSyncBar.raf = requestAnimationFrame(scrollSyncBar._running);
    }
}
scrollSyncBar.update();