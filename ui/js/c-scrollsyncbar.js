/**
* C-SCROLLSYNCBAR
* v0.1.0
* cScrollSyncBar is a scroll synced show hide. 
* cScrollSyncBar makes navigation or any element show and hide progressively in sync with window scroll.
* https://github.com/ita-design-system/c-scrollsyncbar.js
*/

const cScrollSyncBar = {
    // Blank object where cScrollSyncBar instances are stored
    instances: {},
    /**
    * UPDATE
    * Build/update instances on page start or DOM change
    * @param {Object} options Optional parameters
    * @param {Integer} options.scrollSteps Set the velocity of the CSS transforms
    * Higher scrollSteps values give slower transforms
    * Lower scrollSteps values give faster transforms
    */
    update: function(options) {
        // User defined settings of defaults
        Object.keys(cScrollSyncBar._defaults).forEach(function(setting) {
            if (typeof options == 'object') {
                if (options[setting] !== undefined) {
                    cScrollSyncBar._userSettings[setting] = options[setting];
                } else {
                    cScrollSyncBar._userSettings[setting] = cScrollSyncBar._defaults[setting];
                }
            } else {
                cScrollSyncBar._userSettings[setting] = cScrollSyncBar._defaults[setting];
            }
        });
        // Seek for elements
        document.querySelectorAll('[c-scrollsyncbar]').forEach(function(el) {
            const identifier = el.getAttribute('c-scrollsyncbar');
            // Store elements into the pre-defined object cScrollSyncBar.instances
            cScrollSyncBar.instances[identifier] = {
                el: el,
                formula: el.dataset.transform || 'translateY(-|x|%)'
            }
        });
        // If requestAnimationFrame is already active, cancel it
        if (cScrollSyncBar.raf !== undefined) {
            cancelAnimationFrame(cScrollSyncBar.raf);
        }
        // Create requestAnimationFrame
        cScrollSyncBar.raf = requestAnimationFrame(cScrollSyncBar._running);
    },
    /**
    * START
    * Enable the effect
    */
    start: function() {
        if (cScrollSyncBar.raf !== undefined) {
            cancelAnimationFrame(cScrollSyncBar.raf);
        }
        cScrollSyncBar.raf = requestAnimationFrame(cScrollSyncBar._running);
    },
    /**
    * PAUSE
    * Disable the effect
    */
    // Pause
    pause: function() {
        if (cScrollSyncBar.raf !== undefined) {
            cancelAnimationFrame(cScrollSyncBar.raf);
        }
    },
    /**
    * STOP
    * Disable the effect and reset each element
    */
    stop: function() {
        if (cScrollSyncBar.raf !== undefined) {
            cancelAnimationFrame(cScrollSyncBar.raf);
            Object.keys(cScrollSyncBar.instances).forEach(function(id) {
                cScrollSyncBar.instances[id].el.style.transform = '';
            });
        }
    },
    _defaults: {
        scrollSteps: 200
    },
    _userSettings: {},
    _scroll_previous: window.scrollTop,
    _scroll_delta: 0,
    _running: function(e) {
        // Get difference between current scrollY and previous
        const delta = Math.abs(window.scrollY - cScrollSyncBar._scroll_previous);
        if (window.scrollY > cScrollSyncBar._scroll_previous) {
            // scrolling down
            if (cScrollSyncBar._scroll_delta >= 0 && cScrollSyncBar._scroll_delta < cScrollSyncBar._userSettings.scrollSteps) {
                cScrollSyncBar._scroll_delta = cScrollSyncBar._scroll_delta + delta;
            }
        } else if (window.scrollY < cScrollSyncBar._scroll_previous) {
            // scrolling up
            if (cScrollSyncBar._scroll_delta >= 1 && cScrollSyncBar._scroll_delta <= cScrollSyncBar._userSettings.scrollSteps) {
                cScrollSyncBar._scroll_delta = cScrollSyncBar._scroll_delta - delta;
            }
        }
        // Set bounds min and max
        if (cScrollSyncBar._scroll_delta < 0 || window.scrollY == 0) {
            cScrollSyncBar._scroll_delta = 0
        }
        if (cScrollSyncBar._scroll_delta > cScrollSyncBar._userSettings.scrollSteps) {
            cScrollSyncBar._scroll_delta = cScrollSyncBar._userSettings.scrollSteps
        }
        // Simple linear function to convert scroll steps to percents
        const percents_value = 100 * cScrollSyncBar._scroll_delta / cScrollSyncBar._userSettings.scrollSteps;
        // Apply on each instance
        Object.keys(cScrollSyncBar.instances).forEach(function(id) {
            const value = cScrollSyncBar.instances[id].formula.replaceAll('|x|', percents_value);
            cScrollSyncBar.instances[id].el.style.transform = value;
        });
        // Save previous scrollY
        cScrollSyncBar._scroll_previous = window.scrollY;
        cScrollSyncBar.raf = requestAnimationFrame(cScrollSyncBar._running);
    }
}
cScrollSyncBar.update();