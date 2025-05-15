/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *  - Pawel Lysy
 *  - Karol Kolodziej
 *
 * */
'use strict';
/* *
 *
 *  Namespace
 *
 * */
/**
 * Global Dashboards namespace in classic `<scripts>`-based implementations.
 *
 * @namespace Dashboards
 */
var Globals;
(function (Globals) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    /**
     * Prefix of a GUIElement HTML class name.
     */
    Globals.classNamePrefix = 'highcharts-dashboards-';
    /** @internal */
    Globals.classNames = {
        layout: Globals.classNamePrefix + 'layout',
        cell: Globals.classNamePrefix + 'cell',
        cellHover: Globals.classNamePrefix + 'cell-state-hover',
        cellActive: Globals.classNamePrefix + 'cell-state-active',
        cellLoading: Globals.classNamePrefix + 'cell-state-loading',
        row: Globals.classNamePrefix + 'row',
        layoutsWrapper: Globals.classNamePrefix + 'layouts-wrapper',
        boardContainer: Globals.classNamePrefix + 'wrapper'
    };
    /** @internal */
    Globals.guiElementType = {
        row: 'row',
        cell: 'cell',
        layout: 'layout'
    };
    /**
     * Contains all Board instances of this window.
     */
    Globals.boards = [];
    /**
     * Reference to the window used by Dashboards.
     */
    Globals.win = window;
    Globals.doc = document;
    Globals.noop = function () { };
    Globals.isMS = /(edge|msie|trident)/i
        .test((Globals.win.navigator && Globals.win.navigator.userAgent) || '') && !Globals.win.opera;
    Globals.supportsPassiveEvents = (function () {
        // Checks whether the browser supports passive events, (#11353).
        let supportsPassive = false;
        // Object.defineProperty doesn't work on IE as well as passive
        // events - instead of using polyfill, we can exclude IE totally.
        if (!Globals.isMS) {
            const opts = Object.defineProperty({}, 'passive', {
                get: function () {
                    supportsPassive = true;
                }
            });
            if (Globals.win.addEventListener && Globals.win.removeEventListener) {
                Globals.win.addEventListener('testPassive', Globals.noop, opts);
                Globals.win.removeEventListener('testPassive', Globals.noop, opts);
            }
        }
        return supportsPassive;
    }());
})(Globals || (Globals = {}));
/* *
 *
 *  Default Export
 *
 * */
export default Globals;
