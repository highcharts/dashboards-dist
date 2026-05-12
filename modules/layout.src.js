// SPDX-License-Identifier: LicenseRef-Highcharts
/**
 * @license Highcharts Dashboards Layout 4.2.0 (2026-05-12)
 * @module dashboards/modules/layout
 * @requires dashboards
 *
 * (c) 2009-2026 Highsoft AS
 *
 * A commercial license may be required depending on use,
 * see www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(root["_Dashboards"], root["_Dashboards"]["AST"], root["_Dashboards"]["ComponentRegistry"]);
	else if(typeof define === 'function' && define.amd)
		define("dashboards/modules/layout", ["dashboards/dashboards"], function (amd1) {return factory(amd1,amd1["AST"],amd1["ComponentRegistry"]);});
	else if(typeof exports === 'object')
		exports["dashboards/modules/layout"] = factory(root["_Dashboards"], root["_Dashboards"]["AST"], root["_Dashboards"]["ComponentRegistry"]);
	else
		root["Dashboards"] = factory(root["Dashboards"], root["Dashboards"]["AST"], root["Dashboards"]["ComponentRegistry"]);
})(typeof window === 'undefined' ? this : window, (__WEBPACK_EXTERNAL_MODULE__668__, __WEBPACK_EXTERNAL_MODULE__160__, __WEBPACK_EXTERNAL_MODULE__376__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 160:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__160__;

/***/ }),

/***/ 376:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__376__;

/***/ }),

/***/ 668:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__668__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ layout_src)
});

// EXTERNAL MODULE: external {"amd":["dashboards/dashboards"],"commonjs":["dashboards"],"commonjs2":["dashboards"],"root":["Dashboards"]}
var dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_ = __webpack_require__(668);
var dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default = /*#__PURE__*/__webpack_require__.n(dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_);
;// ./code/dashboards/es-modules/Dashboards/EditMode/EditGlobals.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */


const PREFIX = (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNamePrefix + 'edit-';
const EditGlobals = {
    classNames: {
        resizeSnap: PREFIX + 'resize-snap',
        resizeSnapX: PREFIX + 'resize-snap-x',
        resizeSnapY: PREFIX + 'resize-snap-y',
        separator: PREFIX + 'separator',
        contextMenuBtn: PREFIX + 'context-menu-btn',
        contextMenuBtnText: PREFIX + 'context-menu-btn-text',
        contextMenu: PREFIX + 'context-menu',
        contextMenuItem: PREFIX + 'context-menu-item',
        editModeEnabled: PREFIX + 'enabled',
        editToolbar: PREFIX + 'toolbar',
        editToolbarCellOutline: PREFIX + 'toolbar-cell-outline',
        editToolbarRowOutline: PREFIX + 'toolbar-row-outline',
        editToolbarItem: PREFIX + 'toolbar-item',
        editToolbarRow: PREFIX + 'toolbar-row',
        editToolbarCell: PREFIX + 'toolbar-cell',
        editSidebar: PREFIX + 'sidebar',
        editSidebarShow: PREFIX + 'sidebar-show',
        editSidebarHide: PREFIX + 'sidebar-hide',
        editSidebarHeader: PREFIX + 'sidebar-header',
        editSidebarTitle: PREFIX + 'sidebar-title',
        editSidebarMenuItem: PREFIX + 'sidebar-item',
        rowContextHighlight: PREFIX + 'row-context-highlight',
        cellEditHighlight: PREFIX + 'cell-highlight',
        dashboardCellEditHighlightActive: PREFIX + 'cell-highlight-active',
        dragMock: PREFIX + 'drag-mock',
        dropPointer: PREFIX + 'drop-pointer',
        contextDetectionPointer: PREFIX + 'ctx-detection-pointer',
        resizePointer: PREFIX + 'resize-pointer',
        currentEditedElement: PREFIX + 'unmask',
        maskElement: PREFIX + 'mask',
        menuItem: PREFIX + 'menu-item',
        menu: PREFIX + 'menu',
        menuVerticalSeparator: PREFIX + 'menu-vertical-separator',
        menuHorizontalSeparator: PREFIX + 'menu-horizontal-separator',
        menuDestroy: PREFIX + 'menu-destroy',
        editSidebarWrapper: PREFIX + 'sidebar-wrapper',
        customSelect: PREFIX + 'custom-select',
        customSelectButton: PREFIX + 'custom-option-button',
        toggleContainer: PREFIX + 'toggle-container',
        toggleWrapper: PREFIX + 'toggle-wrapper',
        toggleSlider: PREFIX + 'toggle-slider',
        toggleWrapperColored: PREFIX + 'toggle-wrapper-colored',
        toggleLabels: PREFIX + 'toggle-labels',
        labeledToggleWrapper: PREFIX + 'labeled-toggle-wrapper',
        button: PREFIX + 'button',
        sidebarNavButton: PREFIX + 'sidebar-button-nav',
        labelText: PREFIX + 'label-text',
        editSidebarTabBtn: PREFIX + 'sidebar-tab-btn',
        editToolsBtn: PREFIX + 'tools-btn',
        editTools: PREFIX + 'tools',
        editGridItems: PREFIX + 'grid-items',
        editStandaloneToggle: PREFIX + 'standalone-toggle',
        // Confirmation popup
        confirmationPopup: PREFIX + 'confirmation-popup',
        popupButtonContainer: PREFIX + 'confirmation-popup-button-container',
        popupContentContainer: PREFIX + 'confirmation-popup-content',
        popupCancelBtn: PREFIX + 'confirmation-popup-cancel-btn',
        popupConfirmBtn: PREFIX + 'confirmation-popup-confirm-btn',
        popupCloseButton: PREFIX + 'popup-close',
        editOverlay: PREFIX + 'overlay',
        editOverlayActive: PREFIX + 'overlay-active',
        resizerMenuBtnActive: PREFIX + 'resizer-menu-btn-active',
        sidebarCloseButton: PREFIX + 'close-btn',
        editSidebarTabBtnWrapper: PREFIX + 'tabs-buttons-wrapper',
        editSidebarRight: PREFIX + 'sidebar-right',
        editSidebarRightShow: PREFIX + 'sidebar-right-show',
        viewFullscreen: PREFIX + 'view-fullscreen',
        // Accordion
        accordionMenu: PREFIX + 'accordion-menu',
        accordionContainer: PREFIX + 'accordion',
        accordionHeader: PREFIX + 'accordion-header',
        accordionHeaderBtn: PREFIX + 'accordion-header-btn',
        accordionHeaderWrapper: PREFIX + 'accordion-header-wrapper',
        accordionHeaderIcon: PREFIX + 'accordion-header-icon',
        accordionContent: PREFIX + 'accordion-content',
        accordionNestedWrapper: PREFIX + 'accordion-nested',
        accordionMenuButtonsContainer: PREFIX + 'accordion-menu-buttons-container',
        accordionMenuButton: PREFIX + 'accordion-menu-button',
        accordionStandaloneWrapper: PREFIX + 'accordion-standalone-wrapper',
        hiddenElement: PREFIX + 'hidden-element',
        collapsableContentHeader: PREFIX + 'collapsable-content-header',
        standaloneElement: PREFIX + 'standalone-element',
        // Custom dropdown with icons
        collapsedElement: PREFIX + 'collapsed-element',
        dropdown: PREFIX + 'dropdown',
        dropdownContent: PREFIX + 'dropdown-content',
        dropdownButton: PREFIX + 'dropdown-button',
        dropdownButtonContent: PREFIX + 'dropdown-button-content',
        dropdownIcon: PREFIX + 'pointer',
        icon: PREFIX + 'icon'
    },
    lang: {
        accessibility: {
            contextMenu: {
                button: 'Context menu'
            },
            editMode: {
                editMode: 'Edit mode toggle button'
            }
        },
        addComponent: 'Add component',
        cancelButton: 'Cancel',
        caption: 'Caption',
        chartClassName: 'Chart class name',
        chartConfig: 'Chart configuration',
        chartID: 'Chart ID',
        chartOptions: 'Chart options',
        chartType: 'Chart type',
        connectorName: 'Connector name',
        confirmButton: 'Confirm',
        confirmDestroyCell: 'Do you really want to destroy the cell?',
        confirmDestroyRow: 'Do you really want to destroy the row?',
        confirmDiscardChanges: 'Do you really want to discard the changes?',
        dataLabels: 'Data labels',
        editMode: 'Edit mode',
        errorMessage: 'Something went wrong',
        exitFullscreen: 'Exit full screen',
        htmlInput: 'HTML',
        id: 'Id',
        off: 'off',
        on: 'on',
        pointFormat: 'Point format',
        settings: 'Settings',
        style: 'Styles',
        title: 'Title',
        viewFullscreen: 'View in full screen',
        sidebar: {
            HTML: 'HTML',
            row: 'Row',
            Highcharts: 'Highcharts',
            Grid: 'Grid',
            KPI: 'KPI'
        }
    }
};
/* harmony default export */ const EditMode_EditGlobals = (EditGlobals);

;// ./code/dashboards/es-modules/Shared/Utilities.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 * */

const { doc, win } = (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default());
/**
 * Add an event listener.
 *
 * @function Highcharts.addEvent<T>
 *
 * @param  {Highcharts.Class<T>|T} el
 *         The element or object to add a listener to. It can be a
 *         {@link HTMLDOMElement}, an {@link SVGElement} or any other object.
 *
 * @param  {string} type
 *         The event type.
 *
 * @param  {Highcharts.EventCallbackFunction<T>|Function} fn
 *         The function callback to execute when the event is fired.
 *
 * @param  {Highcharts.EventOptionsObject} [options]
 *         Options for adding the event.
 *
 * @sample highcharts/members/addevent
 *         Use a general `render` event to draw shapes on a chart
 *
 * @return {Function}
 *         A callback function to remove the added event.
 */
function addEvent(el, type, fn, options = {}) {
    // Add hcEvents to either the prototype (in case we're running addEvent on a
    // class) or the instance. If hasOwnProperty('hcEvents') is false, it is
    // inherited down the prototype chain, in which case we need to set the
    // property on this instance (which may itself be a prototype).
    const owner = typeof el === 'function' && el.prototype || el;
    if (!Object.hasOwnProperty.call(owner, 'hcEvents')) {
        owner.hcEvents = {};
    }
    const events = owner.hcEvents;
    // Allow click events added to points, otherwise they will be prevented by
    // the TouchPointer.pinch function after a pinch zoom operation (#7091).
    if ((dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).Point && // Without H a dependency loop occurs
        el instanceof (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).Point &&
        el.series &&
        el.series.chart) {
        el.series.chart.runTrackerClick = true;
    }
    // Handle DOM events
    // If the browser supports passive events, add it to improve performance
    // on touch events (#11353).
    const addEventListener = el.addEventListener;
    if (addEventListener) {
        addEventListener.call(el, type, fn, (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).supportsPassiveEvents ? {
            passive: options.passive === void 0 ?
                type.indexOf('touch') !== -1 : options.passive,
            capture: false
        } : false);
    }
    if (!events[type]) {
        events[type] = [];
    }
    const eventObject = {
        fn,
        order: typeof options.order === 'number' ? options.order : Infinity
    };
    events[type].push(eventObject);
    // Order the calls
    events[type].sort((a, b) => a.order - b.order);
    // Return a function that can be called to remove this event.
    return function () {
        removeEvent(el, type, fn);
    };
}
/**
 * Non-recursive method to find the lowest member of an array. `Math.min` raises
 * a maximum call stack size exceeded error in Chrome when trying to apply more
 * than 150.000 points. This method is slightly slower, but safe.
 *
 * @function Highcharts.arrayMin
 *
 * @param {Array<*>} data
 *        An array of numbers.
 *
 * @return {number}
 *         The lowest number.
 */
function arrayMin(data) {
    let i = data.length, min = data[0];
    while (i--) {
        if (data[i] < min) {
            min = data[i];
        }
    }
    return min;
}
/**
 * Non-recursive method to find the lowest member of an array. `Math.max` raises
 * a maximum call stack size exceeded error in Chrome when trying to apply more
 * than 150.000 points. This method is slightly slower, but safe.
 *
 * @function Highcharts.arrayMax
 *
 * @param {Array<*>} data
 *        An array of numbers.
 *
 * @return {number}
 *         The highest number.
 */
function arrayMax(data) {
    let i = data.length, max = data[0];
    while (i--) {
        if (data[i] > max) {
            max = data[i];
        }
    }
    return max;
}
/**
 * Set or get an attribute or an object of attributes.
 *
 * To use as a setter, pass a key and a value, or let the second argument be a
 * collection of keys and values. When using a collection, passing a value of
 * `null` or `undefined` will remove the attribute.
 *
 * To use as a getter, pass only a string as the second argument.
 *
 * @function Highcharts.attr
 *
 * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} elem
 *        The DOM element to receive the attribute(s).
 *
 * @param {string|Highcharts.HTMLAttributes|Highcharts.SVGAttributes} [keyOrAttribs]
 *        The property or an object of key-value pairs.
 *
 * @param {number|string} [value]
 *        The value if a single property is set.
 *
 * @return {string|null|undefined}
 *         When used as a getter, return the value.
 */
function attr(elem, keyOrAttribs, value) {
    const isGetter = isString(keyOrAttribs) && !defined(value);
    let ret;
    const attrSingle = (value, key) => {
        // Set the value
        if (defined(value)) {
            elem.setAttribute(key, value);
            // Get the value
        }
        else if (isGetter) {
            ret = elem.getAttribute(key);
            // IE7 and below cannot get class through getAttribute (#7850)
            if (!ret && key === 'class') {
                ret = elem.getAttribute(key + 'Name');
            }
            // Remove the value
        }
        else {
            elem.removeAttribute(key);
        }
    };
    // If keyOrAttribs is a string
    if (isString(keyOrAttribs)) {
        attrSingle(value, keyOrAttribs);
        // Else if keyOrAttribs is defined, it is a hash of key/value pairs
    }
    else {
        objectEach(keyOrAttribs, attrSingle);
    }
    return ret;
}
/**
 * Constrain a value to within a lower and upper threshold.
 *
 * @internal
 * @param {number} value The initial value
 * @param {number} min The lower threshold
 * @param {number} max The upper threshold
 * @return {number} Returns a number value within min and max.
 */
function clamp(value, min, max) {
    return value > min ? value < max ? value : max : min;
}
/**
 * Fix JS round off float errors.
 *
 * @function Highcharts.correctFloat
 *
 * @param {number} num
 *        A float number to fix.
 *
 * @param {number} [prec=14]
 *        The precision.
 *
 * @return {number}
 *         The corrected float number.
 */
function correctFloat(num, prec) {
    // When the number is higher than 1e14 use the number (#16275)
    return num > 1e14 ? num : parseFloat(num.toPrecision(prec || 14));
}
/**
 * Utility function to create an HTML element with attributes and styles.
 *
 * @function Highcharts.createElement
 *
 * @param {string} tag
 *        The HTML tag.
 *
 * @param {Highcharts.HTMLAttributes} [attribs]
 *        Attributes as an object of key-value pairs.
 *
 * @param {Highcharts.CSSObject} [styles]
 *        Styles as an object of key-value pairs.
 *
 * @param {Highcharts.HTMLDOMElement} [parent]
 *        The parent HTML object.
 *
 * @param {boolean} [nopad=false]
 *        If true, remove all padding, border and margin.
 *
 * @return {Highcharts.HTMLDOMElement}
 *         The created DOM element.
 */
function createElement(tag, attribs, styles, parent, nopad) {
    const el = doc.createElement(tag);
    if (attribs) {
        extend(el, attribs);
    }
    if (nopad) {
        css(el, { padding: '0', border: 'none', margin: '0' });
    }
    if (styles) {
        css(el, styles);
    }
    if (parent) {
        parent.appendChild(el);
    }
    return el;
}
/**
 * Utility for crisping a line position to the nearest full pixel depending on
 * the line width.
 *
 * @internal
 * @param {number} value       The raw pixel position
 * @param {number} lineWidth   The line width
 * @param {boolean} [inverted] Whether the containing group is inverted.
 *                             Crisping round numbers on the y-scale need to go
 *                             to the other side because the coordinate system
 *                             is flipped (scaleY is -1)
 * @return {number}            The pixel position to use for a crisp display
 */
function crisp(value, lineWidth = 0, inverted) {
    const mod = lineWidth % 2 / 2, inverter = inverted ? -1 : 1;
    return (Math.round(value * inverter - mod) + mod) * inverter;
}
/**
 * Set CSS on a given element.
 *
 * @function Highcharts.css
 *
 * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} el
 *        An HTML DOM element.
 *
 * @param {Highcharts.CSSObject} styles
 *        Style object with camel case property names.
 *
 * @return {void}
 */
function css(el, styles) {
    extend(el.style, styles);
}
/**
 * Check if an object is null or undefined.
 *
 * @function Highcharts.defined
 *
 * @param {*} obj
 *        The object to check.
 *
 * @return {boolean}
 *         False if the object is null or undefined, otherwise true.
 */
function defined(obj) {
    return typeof obj !== 'undefined' && obj !== null;
}
/**
 * Utility method that destroys any SVGElement instances that are properties on
 * the given object. It loops all properties and invokes destroy if there is a
 * destroy method. The property is then delete.
 *
 * @function Highcharts.destroyObjectProperties
 *
 * @param {*} obj
 *        The object to destroy properties on.
 *
 * @param {*} [except]
 *        Exception, do not destroy this property, only delete it.
 */
function destroyObjectProperties(obj, except, destructablesOnly) {
    objectEach(obj, function (val, n) {
        // If the object is non-null and destroy is defined
        if (val !== except && val?.destroy) {
            // Invoke the destroy
            val.destroy();
        }
        // Delete the property from the object
        if (val?.destroy || !destructablesOnly) {
            delete obj[n];
        }
    });
}
/**
 * Discard a HTML element
 *
 * @function Highcharts.discardElement
 *
 * @param {Highcharts.HTMLDOMElement} element
 *        The HTML node to discard.
 */
function discardElement(element) {
    element?.parentElement?.removeChild(element);
}
// eslint-disable-next-line valid-jsdoc
/**
 * Return the deep difference between two objects. It can either return the new
 * properties, or optionally return the old values of new properties.
 * @internal
 */
function diffObjects(newer, older, keepOlder, collectionsWithUpdate) {
    const ret = {};
    /**
     * Recurse over a set of options and its current values, and store the
     * current values in the ret object.
     */
    function diff(newer, older, ret, depth) {
        const keeper = keepOlder ? older : newer;
        objectEach(newer, function (newerVal, key) {
            if (!depth &&
                collectionsWithUpdate &&
                collectionsWithUpdate.indexOf(key) > -1 &&
                older[key]) {
                newerVal = splat(newerVal);
                ret[key] = [];
                // Iterate over collections like series, xAxis or yAxis and map
                // the items by index.
                for (let i = 0; i < Math.max(newerVal.length, older[key].length); i++) {
                    // Item exists in current data (#6347)
                    if (older[key][i]) {
                        // If the item is missing from the new data, we need to
                        // save the whole config structure. Like when
                        // responsively updating from a dual axis layout to a
                        // single axis and back (#13544).
                        if (newerVal[i] === void 0) {
                            ret[key][i] = older[key][i];
                            // Otherwise, proceed
                        }
                        else {
                            ret[key][i] = {};
                            diff(newerVal[i], older[key][i], ret[key][i], depth + 1);
                        }
                    }
                }
            }
            else if (isObject(newerVal, true) &&
                !newerVal.nodeType // #10044
            ) {
                ret[key] = isArray(newerVal) ? [] : {};
                diff(newerVal, older[key] || {}, ret[key], depth + 1);
                // Delete empty nested objects
                if (Object.keys(ret[key]).length === 0 &&
                    // Except colorAxis which is a special case where the empty
                    // object means it is enabled. Which is unfortunate and we
                    // should try to find a better way.
                    !(key === 'colorAxis' && depth === 0)) {
                    delete ret[key];
                }
            }
            else if (newer[key] !== older[key] ||
                // If the newer key is explicitly undefined, keep it (#10525)
                (key in newer && !(key in older))) {
                if (key !== '__proto__' && key !== 'constructor') {
                    ret[key] = keeper[key];
                }
            }
        });
    }
    diff(newer, older, ret, 0);
    return ret;
}
/**
 * Remove the last occurrence of an item from an array.
 *
 * @function Highcharts.erase
 *
 * @param {Array<*>} arr
 *        The array.
 *
 * @param {*} item
 *        The item to remove.
 *
 * @return {void}
 */
function erase(arr, item) {
    let i = arr.length;
    while (i--) {
        if (arr[i] === item) {
            arr.splice(i, 1);
            break;
        }
    }
}
/**
 * Utility function to extend an object with the members of another.
 *
 * @function Highcharts.extend<T>
 *
 * @param {T|undefined} a
 *        The object to be extended.
 *
 * @param {Partial<T>} b
 *        The object to add to the first one.
 *
 * @return {T}
 *         Object a, the original object.
 */
function extend(a, b) {
    let n;
    if (!a) {
        a = {};
    }
    for (n in b) { // eslint-disable-line guard-for-in
        a[n] = b[n];
    }
    return a;
}
// eslint-disable-next-line valid-jsdoc
/**
 * Extend a prototyped class by new members.
 *
 * @deprecated
 * @function Highcharts.extendClass<T>
 *
 * @param {Highcharts.Class<T>} parent
 *        The parent prototype to inherit.
 *
 * @param {Highcharts.Dictionary<*>} members
 *        A collection of prototype members to add or override compared to the
 *        parent prototype.
 *
 * @return {Highcharts.Class<T>}
 *         A new prototype.
 */
function extendClass(parent, members) {
    const obj = (function () { });
    obj.prototype = new parent(); // eslint-disable-line new-cap
    extend(obj.prototype, members);
    return obj;
}
/**
 * Fire an event that was registered with {@link Highcharts#addEvent}.
 *
 * @function Highcharts.fireEvent<T>
 *
 * @param {T} el
 *        The object to fire the event on. It can be a {@link HTMLDOMElement},
 *        an {@link SVGElement} or any other object.
 *
 * @param {string} type
 *        The type of event.
 *
 * @param {Highcharts.Dictionary<*>|Event} [eventArguments]
 *        Custom event arguments that are passed on as an argument to the event
 *        handler.
 *
 * @param {Highcharts.EventCallbackFunction<T>|Function} [defaultFunction]
 *        The default function to execute if the other listeners haven't
 *        returned false.
 *
 * @return {void}
 */
function fireEvent(el, type, eventArguments, defaultFunction) {
    eventArguments = eventArguments || {};
    if (doc?.createEvent &&
        (el.dispatchEvent ||
            (el.fireEvent &&
                // Enable firing events on Highcharts instance.
                el !== (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default())))) {
        const e = doc.createEvent('Events');
        e.initEvent(type, true, true);
        eventArguments = extend(e, eventArguments);
        if (el.dispatchEvent) {
            el.dispatchEvent(eventArguments);
        }
        else {
            el.fireEvent(type, eventArguments);
        }
    }
    else if (el.hcEvents) {
        if (!eventArguments.target) {
            // We're running a custom event
            extend(eventArguments, {
                // Attach a simple preventDefault function to skip
                // default handler if called. The built-in
                // defaultPrevented property is not overwritable (#5112)
                preventDefault: function () {
                    eventArguments.defaultPrevented = true;
                },
                // Setting target to native events fails with clicking
                // the zoom-out button in Chrome.
                target: el,
                // If the type is not set, we're running a custom event
                // (#2297). If it is set, we're running a browser event.
                type: type
            });
        }
        const events = [];
        let object = el;
        let multilevel = false;
        // Recurse up the inheritance chain and collect hcEvents set as own
        // objects on the prototypes.
        while (object.hcEvents) {
            if (Object.hasOwnProperty.call(object, 'hcEvents') &&
                object.hcEvents[type]) {
                if (events.length) {
                    multilevel = true;
                }
                events.unshift.apply(events, object.hcEvents[type]);
            }
            object = Object.getPrototypeOf(object);
        }
        // For performance reasons, only sort the event handlers in case we are
        // dealing with multiple levels in the prototype chain. Otherwise, the
        // events are already sorted in the addEvent function.
        if (multilevel) {
            // Order the calls
            events.sort((a, b) => a.order - b.order);
        }
        // Call the collected event handlers
        events.forEach((obj) => {
            // If the event handler returns false, prevent the default handler
            // from executing
            if (obj.fn.call(el, eventArguments, el) === false) {
                eventArguments.preventDefault();
            }
        });
    }
    // Run the default if not prevented
    if (defaultFunction && !eventArguments.defaultPrevented) {
        defaultFunction.call(el, eventArguments);
    }
}
/**
 * Convenience function to get the align factor, used several places for
 * computing positions
 * @internal
 */
const getAlignFactor = (align = '') => ({
    center: 0.5,
    right: 1,
    middle: 0.5,
    bottom: 1
}[align] || 0);
/**
 * Find the closest distance between two values of a two-dimensional array
 * @internal
 * @function Highcharts.getClosestDistance
 *
 * @param {Array<Array<number>>} arrays
 *          An array of arrays of numbers
 *
 * @return {number | undefined}
 *          The closest distance between values
 */
function getClosestDistance(arrays, onError) {
    const allowNegative = !onError;
    let closest, loopLength, distance, i;
    arrays.forEach((xData) => {
        if (xData.length > 1) {
            loopLength = xData.length - 1;
            for (i = loopLength; i > 0; i--) {
                distance = xData[i] - xData[i - 1];
                if (distance < 0 && !allowNegative) {
                    onError?.();
                    // Only one call
                    onError = void 0;
                }
                else if (distance && (typeof closest === 'undefined' || distance < closest)) {
                    closest = distance;
                }
            }
        }
    });
    return closest;
}
/**
 * Get the magnitude of a number.
 *
 * @function Highcharts.getMagnitude
 *
 * @param {number} num
 *        The number.
 *
 * @return {number}
 *         The magnitude, where 1-9 are magnitude 1, 10-99 magnitude 2 etc.
 */
function getMagnitude(num) {
    return Math.pow(10, Math.floor(Math.log(num) / Math.LN10));
}
/**
 * Returns the value of a property path on a given object.
 *
 * @internal
 * @function getNestedProperty
 *
 * @param {string} path
 * Path to the property, for example `custom.myValue`.
 *
 * @param {unknown} parent
 * Instance containing the property on the specific path.
 *
 * @return {unknown}
 * The unknown property value.
 */
function getNestedProperty(path, parent) {
    const pathElements = path.split('.');
    while (pathElements.length && defined(parent)) {
        const pathElement = pathElements.shift();
        // Filter on the key
        if (typeof pathElement === 'undefined' ||
            pathElement === '__proto__') {
            return; // Undefined
        }
        if (pathElement === 'this') {
            let thisProp;
            if (isObject(parent)) {
                thisProp = parent['@this'];
            }
            return thisProp ?? parent;
        }
        const child = parent[pathElement.replace(/[\\'"]/g, '')];
        // Filter on the child
        if (!defined(child) ||
            typeof child === 'function' ||
            typeof child.nodeType === 'number' ||
            child === win) {
            return; // Undefined
        }
        // Else, proceed
        parent = child;
    }
    return parent;
}
/**
 * Get the computed CSS value for given element and property, only for numerical
 * properties. For width and height, the dimension of the inner box (excluding
 * padding) is returned. Used for fitting the chart within the container.
 *
 * @function Highcharts.getStyle
 *
 * @param {Highcharts.HTMLDOMElement} el
 * An HTML element.
 *
 * @param {string} prop
 * The property name.
 *
 * @param {boolean} [toInt=true]
 * Parse to integer.
 *
 * @return {number|string|undefined}
 * The style value.
 */
function getStyle(el, prop, toInt) {
    let style;
    // For width and height, return the actual inner pixel size (#4913)
    if (prop === 'width') {
        let offsetWidth = Math.min(el.offsetWidth, el.scrollWidth);
        // In flex boxes, we need to use getBoundingClientRect and floor it,
        // because scrollWidth doesn't support subpixel precision (#6427) ...
        const boundingClientRectWidth = el.getBoundingClientRect?.().width;
        // ...unless if the containing div or its parents are transform-scaled
        // down, in which case the boundingClientRect can't be used as it is
        // also scaled down (#9871, #10498).
        if (boundingClientRectWidth < offsetWidth &&
            boundingClientRectWidth >= offsetWidth - 1) {
            offsetWidth = Math.floor(boundingClientRectWidth);
        }
        return Math.max(0, // #8377
        (offsetWidth -
            (getStyle(el, 'padding-left', true) || 0) -
            (getStyle(el, 'padding-right', true) || 0)));
    }
    if (prop === 'height') {
        return Math.max(0, // #8377
        (Math.min(el.offsetHeight, el.scrollHeight) -
            (getStyle(el, 'padding-top', true) || 0) -
            (getStyle(el, 'padding-bottom', true) || 0)));
    }
    // Otherwise, get the computed style
    const css = win.getComputedStyle(el, void 0); // eslint-disable-line no-undefined
    if (css) {
        style = css.getPropertyValue(prop);
        if (pick(toInt, prop !== 'opacity')) {
            style = pInt(style);
        }
    }
    return style;
}
/**
 * Return the value of the first element in the array that satisfies the
 * provided testing function.
 *
 * @function Highcharts.find<T>
 *
 * @param {Array<T>} arr
 *        The array to test.
 *
 * @param {Function} callback
 *        The callback function. The function receives the item as the first
 *        argument. Return `true` if this item satisfies the condition.
 *
 * @return {T|undefined}
 *         The value of the element.
 */
const find = Array.prototype.find ?
    function (arr, callback) {
        return arr.find(callback);
    } :
    // Legacy implementation. PhantomJS, IE <= 11 etc. #7223.
    function (arr, callback) {
        let i;
        const length = arr.length;
        for (i = 0; i < length; i++) {
            if (callback(arr[i], i)) { // eslint-disable-line node/callback-return
                return arr[i];
            }
        }
    };
/**
 * Internal clear timeout. The function checks that the `id` was not removed
 * (e.g. by `chart.destroy()`). For the details see
 * [issue #7901](https://github.com/highcharts/highcharts/issues/7901).
 *
 * @internal
 *
 * @function Highcharts.clearTimeout
 *
 * @param {number|undefined} id
 * Id of a timeout.
 */
function internalClearTimeout(id) {
    if (defined(id)) {
        clearTimeout(id);
    }
}
/**
 * Utility function to check if an Object is a HTML Element.
 *
 * @function Highcharts.isDOMElement
 *
 * @param {*} obj
 *        The item to check.
 *
 * @return {boolean}
 *         True if the argument is a HTML Element.
 */
function isDOMElement(obj) {
    return isObject(obj) && typeof obj.nodeType === 'number';
}
/**
 * Utility function to check if an Object is a class.
 *
 * @function Highcharts.isClass
 *
 * @param {object|undefined} obj
 *        The item to check.
 *
 * @return {boolean}
 *         True if the argument is a class.
 */
function isClass(obj) {
    const c = obj?.constructor;
    return !!(isObject(obj, true) &&
        !isDOMElement(obj) &&
        (c?.name && c.name !== 'Object'));
}
/**
 * Utility function to check if an item is a number and it is finite (not NaN,
 * Infinity or -Infinity).
 *
 * @function Highcharts.isNumber
 *
 * @param {*} n
 *        The item to check.
 *
 * @return {boolean}
 *         True if the item is a finite number
 */
function isNumber(n) {
    return typeof n === 'number' && !isNaN(n) && n < Infinity && n > -Infinity;
}
/**
 * Utility function to check for string type.
 *
 * @function Highcharts.isString
 *
 * @param {*} s
 *        The item to check.
 *
 * @return {boolean}
 *         True if the argument is a string.
 */
function isString(s) {
    return typeof s === 'string';
}
/**
 * Utility function to check if an item is an array.
 *
 * @function Highcharts.isArray
 *
 * @param {*} obj
 *        The item to check.
 *
 * @return {boolean}
 *         True if the argument is an array.
 */
function isArray(obj) {
    const str = Object.prototype.toString.call(obj);
    return str === '[object Array]' || str === '[object Array Iterator]';
}
/**
 * Utility function to check if object is a function.
 *
 * @function Highcharts.isFunction
 *
 * @param {*} obj
 *        The item to check.
 *
 * @return {boolean}
 *         True if the argument is a function.
 */
function isFunction(obj) {
    return typeof obj === 'function';
}
/**
 * Utility function to check if an item is of type object.
 *
 * @function Highcharts.isObject
 *
 * @param {*} obj
 *        The item to check.
 *
 * @param {boolean} [strict=false]
 *        Also checks that the object is not an array.
 *
 * @return {boolean}
 *         True if the argument is an object.
 */
function isObject(obj, strict) {
    return (!!obj &&
        typeof obj === 'object' &&
        (!strict || !isArray(obj))); // eslint-disable-line @typescript-eslint/no-explicit-any
}
/**
 * Utility function to deep merge two or more objects and return a third object.
 * If the first argument is true, the contents of the second object is copied
 * into the first object. The merge function can also be used with a single
 * object argument to create a deep copy of an object.
 *
 * @function Highcharts.merge<T>
 *
 * @param {true | T} extendOrSource
 *        Whether to extend the left-side object,
 *        or the first object to merge as a deep copy.
 *
 * @param {...Array<object|undefined>} [sources]
 *        Object(s) to merge into the previous one.
 *
 * @return {T}
 *         The merged object. If the first argument is true, the return is the
 *         same as the second argument.
 */
function merge(extendOrSource, ...sources) {
    let i, args = [extendOrSource, ...sources], ret = {};
    const doCopy = function (copy, original) {
        // An object is replacing a primitive
        if (typeof copy !== 'object') {
            copy = {};
        }
        objectEach(original, function (value, key) {
            // Prototype pollution (#14883)
            if (key === '__proto__' || key === 'constructor') {
                return;
            }
            // Copy the contents of objects, but not arrays or DOM nodes
            if (isObject(value, true) &&
                !isClass(value) &&
                !isDOMElement(value)) {
                copy[key] = doCopy(copy[key] || {}, value);
                // Primitives and arrays are copied over directly
            }
            else {
                copy[key] = original[key];
            }
        });
        return copy;
    };
    // If first argument is true, copy into the existing object. Used in
    // setOptions.
    if (extendOrSource === true) {
        ret = args[1];
        args = Array.prototype.slice.call(args, 2);
    }
    // For each argument, extend the return
    const len = args.length;
    for (i = 0; i < len; i++) {
        ret = doCopy(ret, args[i]);
    }
    return ret;
}
/**
 * Take an interval and normalize it to multiples of round numbers.
 *
 * @deprecated
 * @function Highcharts.normalizeTickInterval
 *
 * @param {number} interval
 *        The raw, un-rounded interval.
 *
 * @param {Array<*>} [multiples]
 *        Allowed multiples.
 *
 * @param {number} [magnitude]
 *        The magnitude of the number.
 *
 * @param {boolean} [allowDecimals]
 *        Whether to allow decimals.
 *
 * @param {boolean} [hasTickAmount]
 *        If it has tickAmount, avoid landing on tick intervals lower than
 *        original.
 *
 * @return {number}
 *         The normalized interval.
 *
 * @todo
 * Move this function to the Axis prototype. It is here only for historical
 * reasons.
 */
function normalizeTickInterval(interval, multiples, magnitude, allowDecimals, hasTickAmount) {
    let i, retInterval = interval;
    // Round to a tenfold of 1, 2, 2.5 or 5
    magnitude = pick(magnitude, getMagnitude(interval));
    const normalized = interval / magnitude;
    // Multiples for a linear scale
    if (!multiples) {
        multiples = hasTickAmount ?
            // Finer grained ticks when the tick amount is hard set, including
            // when alignTicks is true on multiple axes (#4580).
            [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] :
            // Else, let ticks fall on rounder numbers
            [1, 2, 2.5, 5, 10];
        // The allowDecimals option
        if (allowDecimals === false) {
            if (magnitude === 1) {
                multiples = multiples.filter(function (num) {
                    return num % 1 === 0;
                });
            }
            else if (magnitude <= 0.1) {
                multiples = [1 / magnitude];
            }
        }
    }
    // Normalize the interval to the nearest multiple
    for (i = 0; i < multiples.length; i++) {
        retInterval = multiples[i];
        // Only allow tick amounts smaller than natural
        if ((hasTickAmount &&
            retInterval * magnitude >= interval) ||
            (!hasTickAmount &&
                (normalized <=
                    (multiples[i] +
                        (multiples[i + 1] || multiples[i])) / 2))) {
            break;
        }
    }
    // Multiply back to the correct magnitude. Correct floats to appropriate
    // precision (#6085).
    retInterval = correctFloat(retInterval * magnitude, -Math.round(Math.log(0.001) / Math.LN10));
    return retInterval;
}
/**
 * Iterate over object key pairs in an object.
 *
 * @function Highcharts.objectEach<T>
 *
 * @param {*} obj
 *        The object to iterate over.
 *
 * @param {Highcharts.ObjectEachCallbackFunction<T>} fn
 *        The iterator callback. It passes three arguments:
 *        * value - The property value.
 *        * key - The property key.
 *        * obj - The object that objectEach is being applied to.
 *
 * @param {T} [ctx]
 *        The context.
 */
function objectEach(obj, fn, ctx) {
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            fn.call(ctx || obj[key], obj[key], key, obj);
        }
    }
}
/**
 * Get the element's offset position, corrected for `overflow: auto`.
 *
 * @function Highcharts.offset
 *
 * @param {global.Element} el
 *        The DOM element.
 *
 * @return {Highcharts.OffsetObject}
 *         An object containing `left` and `top` properties for the position in
 *         the page.
 */
function offset(el) {
    const docElem = doc.documentElement, box = (el.parentElement || el.parentNode) ?
        el.getBoundingClientRect() :
        { top: 0, left: 0, width: 0, height: 0 };
    return {
        top: box.top + (win.pageYOffset || docElem.scrollTop) -
            (docElem.clientTop || 0),
        left: box.left + (win.pageXOffset || docElem.scrollLeft) -
            (docElem.clientLeft || 0),
        width: box.width,
        height: box.height
    };
}
/**
 * Left-pad a string to a given length by adding a character repetitively.
 *
 * @function Highcharts.pad
 *
 * @param {number} number
 *        The input string or number.
 *
 * @param {number} [length]
 *        The desired string length.
 *
 * @param {string} [padder=0]
 *        The character to pad with.
 *
 * @return {string}
 *         The padded string.
 */
function pad(number, length, padder) {
    return new Array((length || 2) +
        1 -
        String(number)
            .replace('-', '')
            .length).join(padder || '0') + number;
}
/* eslint-disable jsdoc/check-param-names */
/**
 * Return the first value that is not null or undefined.
 *
 * @function Highcharts.pick<T>
 *
 * @param {...Array<T|null|undefined>} items
 *        Variable number of arguments to inspect.
 *
 * @return {T}
 *         The value of the first argument that is not null or undefined.
 */
function pick() {
    const args = arguments;
    const length = args.length;
    for (let i = 0; i < length; i++) {
        const arg = args[i];
        if (typeof arg !== 'undefined' && arg !== null) {
            return arg;
        }
    }
}
/* eslint-enable jsdoc/check-param-names */
/**
 * Shortcut for parseInt
 *
 * @internal
 * @function Highcharts.pInt
 *
 * @param {*} s
 *        any
 *
 * @param {number} [mag]
 *        Magnitude
 *
 * @return {number}
 *         number
 */
function pInt(s, mag) {
    return parseInt(s, mag || 10);
}
/**
 * Adds an item to an array, if it is not present in the array.
 *
 * @internal
 *
 * @function Highcharts.pushUnique
 *
 * @param {Array<unknown>} array
 * The array to add the item to.
 *
 * @param {unknown} item
 * The item to add.
 *
 * @return {boolean}
 * Returns true, if the item was not present and has been added.
 */
function pushUnique(array, item) {
    return array.indexOf(item) < 0 && !!array.push(item);
}
/**
 * Return a length based on either the integer value, or a percentage of a base.
 *
 * @function Highcharts.relativeLength
 *
 * @param {Highcharts.RelativeSize} value
 *        A percentage string or a number.
 *
 * @param {number} base
 *        The full length that represents 100%.
 *
 * @param {number} [offset=0]
 *        A pixel offset to apply for percentage values. Used internally in
 *        axis positioning.
 *
 * @return {number}
 *         The computed length.
 */
function relativeLength(value, base, offset) {
    return (/%$/).test(value) ?
        (base * parseFloat(value) / 100) + (offset || 0) :
        parseFloat(value);
}
/**
 * Replaces text in a string with a given replacement in a loop to catch nested
 * matches after previous replacements.
 *
 * @internal
 *
 * @function Highcharts.replaceNested
 *
 * @param {string} text
 * Text to search and modify.
 *
 * @param {...Array<(RegExp|string)>} replacements
 * One or multiple tuples with search pattern (`[0]: (string|RegExp)`) and
 * replacement (`[1]: string`) for matching text.
 *
 * @return {string}
 * Text with replacements.
 */
function replaceNested(text, ...replacements) {
    let previous, replacement;
    do {
        previous = text;
        for (replacement of replacements) {
            text = text.replace(replacement[0], replacement[1]);
        }
    } while (text !== previous);
    return text;
}
/**
 * Remove an event that was added with {@link Highcharts#addEvent}.
 *
 * @function Highcharts.removeEvent<T>
 *
 * @param {Highcharts.Class<T>|T} el
 *        The element to remove events on.
 *
 * @param {string} [type]
 *        The type of events to remove. If undefined, all events are removed
 *        from the element.
 *
 * @param {Highcharts.EventCallbackFunction<T>} [fn]
 *        The specific callback to remove. If undefined, all events that match
 *        the element and optionally the type are removed.
 *
 * @return {void}
 */
function removeEvent(el, type, fn) {
    /** @internal */
    function removeOneEvent(type, fn) {
        const removeEventListener = el.removeEventListener;
        if (removeEventListener) {
            removeEventListener.call(el, type, fn, false);
        }
    }
    /** @internal */
    function removeAllEvents(eventCollection) {
        let types, len;
        if (!el.nodeName) {
            return; // Break on non-DOM events
        }
        if (type) {
            types = {};
            types[type] = true;
        }
        else {
            types = eventCollection;
        }
        objectEach(types, function (_val, n) {
            if (eventCollection[n]) {
                len = eventCollection[n].length;
                while (len--) {
                    removeOneEvent(n, eventCollection[n][len].fn);
                }
            }
        });
    }
    const owner = typeof el === 'function' && el.prototype || el;
    if (Object.hasOwnProperty.call(owner, 'hcEvents')) {
        const events = owner.hcEvents;
        if (type) {
            const typeEvents = (events[type] || []);
            if (fn) {
                events[type] = typeEvents.filter(function (obj) {
                    return fn !== obj.fn;
                });
                removeOneEvent(type, fn);
            }
            else {
                removeAllEvents(events);
                events[type] = [];
            }
        }
        else {
            removeAllEvents(events);
            delete owner.hcEvents;
        }
    }
}
/**
 * Check if an element is an array, and if not, make it into an array.
 *
 * @function Highcharts.splat
 *
 * @param {*} obj
 *        The object to splat.
 *
 * @return {Array}
 *         The produced or original array.
 */
function splat(obj) {
    return isArray(obj) ? obj : [obj];
}
/**
 * Sort an object array and keep the order of equal items. The ECMAScript
 * standard does not specify the behavior when items are equal.
 *
 * @function Highcharts.stableSort
 *
 * @param {Array<*>} arr
 *        The array to sort.
 *
 * @param {Function} sortFunction
 *        The function to sort it with, like with regular Array.prototype.sort.
 */
function stableSort(arr, sortFunction) {
    // @todo It seems like Chrome since v70 sorts in a stable way internally,
    // plus all other browsers do it, so over time we may be able to remove this
    // function
    const length = arr.length;
    let sortValue, i;
    // Add index to each item
    for (i = 0; i < length; i++) {
        arr[i].safeI = i; // Stable sort index
    }
    arr.sort(function (a, b) {
        sortValue = sortFunction(a, b);
        return sortValue === 0 ? a.safeI - b.safeI : sortValue;
    });
    // Remove index from items
    for (i = 0; i < length; i++) {
        delete arr[i].safeI; // Stable sort index
    }
}
/**
 * Set a timeout if the delay is given, otherwise perform the function
 * synchronously.
 *
 * @function Highcharts.syncTimeout
 *
 * @param {Function} fn
 *        The function callback.
 *
 * @param {number} delay
 *        Delay in milliseconds.
 *
 * @param {*} [context]
 *        An optional context to send to the function callback.
 *
 * @return {number}
 *         An identifier for the timeout that can later be cleared with
 *         Highcharts.clearTimeout. Returns -1 if there is no timeout.
 */
function syncTimeout(fn, delay, context) {
    if (delay > 0) {
        return setTimeout(fn, delay, context);
    }
    fn.call(0, context);
    return -1;
}
/**
 * @internal
 */
function ucfirst(s) {
    return ((isString(s) ?
        s.substring(0, 1).toUpperCase() + s.substring(1) :
        String(s)));
}
/**
 * Wrap a method with extended functionality, preserving the original function.
 *
 * @function Highcharts.wrap
 *
 * @param {*} obj
 *        The context object that the method belongs to. In real cases, this is
 *        often a prototype.
 *
 * @param {string} method
 *        The name of the method to extend.
 *
 * @param {Highcharts.WrapProceedFunction} func
 *        A wrapper function callback. This function is called with the same
 *        arguments as the original function, except that the original function
 *        is unshifted and passed as the first argument.
 */
function wrap(obj, method, func) {
    const proceed = obj[method];
    obj[method] = function () {
        const outerArgs = arguments, scope = this;
        return func.apply(this, [
            function () {
                return proceed.apply(scope, arguments.length ? arguments : outerArgs);
            }
        ].concat([].slice.call(arguments)));
    };
}

;// ./code/dashboards/es-modules/Dashboards/Layout/GUIElement.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */



class GUIElement {
    /* *
    *
    *  Static Properties
    *
    * */
    /**
     * Get offsets of the guiElement relative to the referenceElement or the
     * Viewport.
     *
     * @param guiElement
     * The element to get the offsets from.
     *
     * @param referenceElement
     * The element to get the offsets relative to.
     *
     * @returns
     * The offsets of the guiElement.
     */
    static getOffsets(guiElement, referenceElement) {
        const offset = { left: 0, top: 0, right: 0, bottom: 0 };
        if (!guiElement.container) {
            return offset;
        }
        const guiElementClientRect = guiElement.container.getBoundingClientRect();
        const referenceClientRect = referenceElement ?
            referenceElement.getBoundingClientRect() : { left: 0, top: 0 };
        offset.left = guiElementClientRect.left - referenceClientRect.left;
        offset.top = guiElementClientRect.top - referenceClientRect.top;
        offset.right =
            guiElementClientRect.right - referenceClientRect.left;
        offset.bottom =
            guiElementClientRect.bottom - referenceClientRect.top;
        return offset;
    }
    /**
     * Get dimensions of the guiElement container from offsets.
     *
     * @param offsets
     * The offsets of the guiElement container.
     *
     * @returns
     * The dimensions of the guiElement container.
     */
    static getDimFromOffsets(offsets) {
        return {
            width: offsets.right - offsets.left,
            height: offsets.bottom - offsets.top
        };
    }
    /**
     * Based on the element provided, generate an unique id.
     *
     * @param elementType
     * Type of the element.
     *
     * @returns
     * The unique id.
     */
    static getElementId(elementType) {
        return ((dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNamePrefix + elementType + '-' +
            (0,dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_.uniqueKey)().slice(11));
    }
    /**
     * Get width in percentages (0% - 100%).
     *
     * @param width
     * The width of the element. Supported formats '50%' or '1/2'.
     *
     * @returns
     * The width in percentages.
     */
    static getPercentageWidth(width) {
        const fractionRegEx = /^(\d{1})[\-\/\.](\d{1,2})$/;
        let result;
        if (fractionRegEx.test(width)) {
            const match = width.match(fractionRegEx) || [], multiplier = +match[1], divider = +match[2];
            result = 100 * multiplier / divider;
            result = (result <= 100 ? result : 100) + '%';
        }
        else if (width.indexOf('%') !== -1) {
            const value = parseFloat(width);
            result = (value <= 100 ?
                (value >= 0 ? value : 0) : 100) + '%';
        }
        return result;
    }
    /* *
    *
    *  Functions
    *
    * */
    /**
     * Create or get existing HTML element as a GUIElement container.
     *
     * @param {GetElementContainerOptions} options
     * Options.
     *
     * @returns
     * The HTML element for the element container.
     */
    getElementContainer(options) {
        const guiElement = this;
        let elem;
        if (options.render) {
            if (options.attribs && !options.attribs.id) {
                delete options.attribs.id;
            }
        }
        else if (typeof options.elementId === 'string') {
            const div = document.getElementById(options.elementId);
            if (div) {
                guiElement.container = div;
            }
            else {
                (0,dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_.error)('Element ' + options.elementId + ' does not exist');
            }
        }
        if (options.element instanceof HTMLElement) {
            elem = options.element;
        }
        else {
            elem = createElement('div', options.attribs || {}, options.style || {}, options.parentContainer);
        }
        // Set bindedGUIElement event on GUIElement container.
        guiElement.removeBindedEventFn = addEvent(elem, 'bindedGUIElement', function (e) {
            e.guiElement = guiElement;
            e.stopImmediatePropagation();
        });
        return elem;
    }
    /**
     * Destroy the element, its container, event hooks and all properties.
     */
    destroy() {
        const guiElement = this;
        // Remove bindedGUIElement event.
        if (guiElement.removeBindedEventFn) {
            guiElement.removeBindedEventFn();
        }
        // Remove HTML container.
        if (guiElement.container && guiElement.container.parentNode) {
            guiElement.container.parentNode.removeChild(guiElement.container);
        }
        // Delete all properties.
        objectEach(guiElement, function (val, key) {
            delete guiElement[key];
        });
    }
    /**
     * Return the GUIElement instance type.
     *
     * @returns
     * The GUIElement instance type
     */
    getType() {
        return this.type;
    }
    changeVisibility(setVisible = true, displayStyle) {
        const visibilityChanged = (this.isVisible && !setVisible ||
            !this.isVisible && setVisible);
        if (this.container && visibilityChanged) {
            this.container.style.display = (setVisible ?
                (displayStyle || 'block') :
                'none');
            this.isVisible = setVisible;
        }
    }
    hide() {
        this.changeVisibility(false);
    }
    show() {
        this.changeVisibility();
    }
}
/* harmony default export */ const Layout_GUIElement = (GUIElement);

;// ./code/dashboards/es-modules/Dashboards/Layout/Cell.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */





/* *
 *
 *  Class
 *
 * */
/**
 * @internal
 **/
class Cell extends Layout_GUIElement {
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of the Cell class.
     *
     * @param {Row} row
     * Reference to the row instance.
     *
     * @param {Options} options
     * Options for the cell.
     *
     * @param {HTMLElement} cellElement
     * The container of the cell HTML element.
     */
    constructor(row, options, cellElement) {
        super();
        /**
         * The type of GUI element.
         */
        this.type = (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).guiElementType.cell;
        this.id = options.id;
        this.options = options;
        this.row = row;
        this.isVisible = true;
        // Get parent container
        const parentContainer = document.getElementById(options.parentContainerId || '') ||
            row.container;
        const layoutOptions = row.layout.options || {}, rowOptions = row.options || {}, cellClassName = layoutOptions.cellClassName || '';
        const cellStyle = options.style || {};
        const elementStyle = merge(layoutOptions.style, rowOptions.style, cellStyle);
        this.applySizeOptions(options, cellStyle, elementStyle);
        this.container = this.getElementContainer({
            render: row.layout.board.guiEnabled,
            parentContainer: parentContainer,
            attribs: {
                id: options.id,
                className: (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNames.cell + ' ' +
                    cellClassName
            },
            element: cellElement,
            elementId: options.id,
            style: elementStyle
        });
        // Nested layout
        if (this.options.layout) {
            this.setNestedLayout();
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Create a nested layout in the cell and assign it to the nestedCell
     * property.
     * @internal
     */
    setNestedLayout() {
        const board = this.row.layout.board, Layout = this.row.layout.constructor;
        const optionsGui = board.options.gui;
        this.nestedLayout = new Layout(board, merge({}, optionsGui && optionsGui.layoutOptions, this.options.layout, {
            parentContainerId: this.options.id
        }), this);
    }
    /**
     * Destroy the element, its container, event hooks
     * and mounted component.
     */
    destroy() {
        fireEvent(this, 'outdate');
        const cell = this;
        const { row } = cell;
        // Destroy mounted component.
        cell.mountedComponent?.destroy();
        // If layout exists in the cell - destroy it
        cell.nestedLayout?.destroy();
        row.unmountCell(cell);
        const destroyRow = row.cells?.length === 0;
        super.destroy();
        if (destroyRow) {
            row.destroy();
        }
    }
    /**
     * Get the cell's options.
     * @returns
     * The JSON of cell's options.
     *
     * @internal
     *
     */
    getOptions() {
        const cell = this;
        if (cell.options.layout && cell.nestedLayout) {
            return {
                ...cell.options,
                layout: cell.nestedLayout.getOptions()
            };
        }
        return cell.options;
    }
    changeVisibility(setVisible = true) {
        super.changeVisibility(setVisible);
        const cell = this, row = cell.row;
        // Change row visibility if needed.
        if (!cell.row.getVisibleCells().length) {
            cell.row.hide();
        }
        else if (cell.isVisible && !row.isVisible) {
            cell.row.show();
        }
        setTimeout(() => {
            fireEvent(row, 'cellChange', { row, cell });
        }, 0);
    }
    getParentCell(level) {
        const cell = this;
        let parentCell;
        if (level <= cell.row.layout.level) {
            if (cell.row.layout.level === level) {
                return cell;
            }
            if (cell.row.layout.level - 1 >= 0) {
                parentCell = cell.row.layout.parentCell;
                if (parentCell) {
                    return parentCell.getParentCell(level);
                }
            }
        }
    }
    // Method to get array of overlapping levels.
    getOverlappingLevels(align, levelMaxGap, // Max distance between levels
    offset // Analyzed cell offset
    ) {
        const cell = this, parentCell = cell.row.layout.parentCell;
        let levels = [cell.row.layout.level];
        if (parentCell) {
            const cellOffset = offset || Layout_GUIElement.getOffsets(cell)[align];
            const parentCellOffset = Layout_GUIElement.getOffsets(parentCell)[align];
            if (Math.abs(cellOffset - parentCellOffset) < levelMaxGap) {
                levels = [
                    ...levels,
                    ...parentCell.getOverlappingLevels(align, levelMaxGap, parentCellOffset)
                ];
            }
        }
        return levels;
    }
    /**
     * Set cell size.
     *
     * @param width
     * % value or 'auto' or px
     *
     * @param height
     * value in px
     */
    setSize(width, height) {
        const cell = this, editMode = cell.row.layout.board.editMode;
        if (cell.container) {
            if (defined(width)) {
                if (width === 'auto' &&
                    cell.container.style.flex !== '1 1 0%') {
                    cell.container.style.flex = '1 1 0%';
                    cell.options.width = cell.container.style.flex;
                }
                else {
                    const cellWidth = cell.convertWidthToValue(width);
                    if (cellWidth) {
                        cell.container.style.flex = '0 0 ' + cellWidth;
                        cell.options.width = cell.container.style.flex;
                    }
                }
            }
            if (defined(height)) {
                const heightValue = (typeof height === 'number' ?
                    height + 'px' :
                    height);
                cell.height = cell.container.style.height = heightValue;
                cell.options.height = heightValue;
            }
            if (editMode) {
                editMode.hideContextPointer();
                if (editMode.cellToolbar &&
                    editMode.cellToolbar.isVisible) {
                    if (editMode.cellToolbar.cell === cell) {
                        editMode.cellToolbar.showToolbar(cell);
                    }
                    else {
                        editMode.cellToolbar.hide();
                    }
                }
            }
            // Call cellResize board event.
            fireEvent(cell.row.layout.board, 'cellResize', { cell: cell });
            fireEvent(cell.row, 'cellChange', { cell: cell, row: cell.row });
        }
    }
    setHighlight(remove) {
        const cell = this, editMode = cell.row?.layout.board.editMode;
        if (cell.container && editMode) {
            const cnt = cell.container, isSet = cnt.classList.contains(EditMode_EditGlobals.classNames.cellEditHighlight);
            if (!remove && !isSet) {
                cnt.classList.add(EditMode_EditGlobals.classNames.cellEditHighlight);
                cell.row.layout.board.container.classList.add(EditMode_EditGlobals.classNames.dashboardCellEditHighlightActive);
                cell.isHighlighted = true;
            }
            else if (remove && isSet) {
                cnt.classList.remove(EditMode_EditGlobals.classNames.cellEditHighlight);
                cell.row.layout.board.container.classList.remove(EditMode_EditGlobals.classNames.dashboardCellEditHighlightActive);
                cell.isHighlighted = false;
            }
        }
    }
    /**
     * Sets the active state of the cell and resets the state of other cells.
     */
    setActiveState() {
        const cell = this;
        // Reset other boxes
        cell.row.layout.board.mountedComponents.forEach((mountedComponent) => {
            if (mountedComponent.cell.container) {
                mountedComponent.cell.container.classList.remove((dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNames.cellActive);
            }
            mountedComponent.component.isActive = false;
        });
        // Apply class
        if (cell.container) {
            cell.container.classList.add((dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNames.cellActive);
        }
    }
    /**
     * Enables or disables the loading indicator in the cell.
     *
     * @internal
     */
    setLoadingState(enabled = true) {
        this.container?.classList?.toggle((dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNames.cellLoading, enabled);
    }
    convertWidthToValue(width) {
        if (typeof width === 'number') {
            return width + 'px';
        }
        if (/px/.test(width)) {
            return width;
        }
        return Layout_GUIElement.getPercentageWidth(width) || '';
    }
    applySizeOptions(options, cellStyle, elementStyle) {
        const heightValue = defined(options.height) ?
            options.height :
            cellStyle.height;
        if (defined(heightValue)) {
            this.height = typeof heightValue === 'number' ?
                heightValue + 'px' :
                String(heightValue);
            elementStyle.height = this.height;
            options.height = this.height;
        }
        else if (defined(elementStyle.height)) {
            delete elementStyle.height;
        }
        const widthSource = defined(options.width) ?
            options.width :
            cellStyle.flex;
        if (defined(widthSource) &&
            (typeof widthSource === 'string' ||
                typeof widthSource === 'number')) {
            let flexValue;
            if (typeof widthSource === 'string' &&
                widthSource.indexOf(' ') !== -1) {
                flexValue = widthSource;
            }
            else if (widthSource === 'auto') {
                flexValue = '1 1 0%';
            }
            else {
                const cellWidth = this.convertWidthToValue(widthSource);
                if (cellWidth) {
                    flexValue = '0 0 ' + cellWidth;
                }
            }
            if (flexValue) {
                elementStyle.flex = flexValue;
                options.width = flexValue;
            }
        }
    }
}
/**
 * Checks if a valid cell instance.
 */
function isCell(cell) {
    return (!!cell && 'row' in cell && cell.type === 'cell');
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Layout_Cell = (Cell);

;// ./code/dashboards/es-modules/Dashboards/Layout/CellHTML.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */




/* *
 *
 *  Class
 *
 * */
/**
 * @internal
 **/
class CellHTML extends Layout_GUIElement {
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of the CellHTML class.
     *
     * @param {Options} options
     * Options for the cell.
     */
    constructor(options) {
        super();
        /**
         * The type of a GUIElement instance.
         */
        this.type = 'cell-html';
        this.options = options;
        this.id = options.id;
        this.container = options.container;
        this.mountedComponent = options.mountedComponent;
    }
    /**
     * Destroy the element, its container, event hooks
     * and mounted component.
     */
    destroy() {
        const cell = this;
        // Destroy mounted component.
        cell.mountedComponent?.destroy();
        super.destroy();
    }
    /**
     * Highlight the cell.
     */
    setHighlight() {
        const cell = this;
        cell.container.classList.toggle(EditMode_EditGlobals.classNames.cellEditHighlight);
        cell.mountedComponent?.board.container.classList.toggle(EditMode_EditGlobals.classNames.dashboardCellEditHighlightActive);
    }
    setActiveState() {
        const cell = this;
        // Apply class
        if (cell.container) {
            cell.container.classList.add((dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNames.cellActive);
        }
    }
}
/* *
 *
 *  Type Declarations
 *
 * */
/**
 * Checks if a valid cell HTML instance.
 */
function isCellHTML(cellHTML) {
    return cellHTML instanceof CellHTML;
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Layout_CellHTML = (CellHTML);

;// ./code/dashboards/es-modules/Dashboards/EditMode/EditRenderer.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */



/* *
 *
 *  Functions
 *
 * */
/**
 * Function to create a context button.
 * @internal
 *
 * @param parentNode
 * The element to which the new element should be appended.
 *
 * @param editMode
 * EditMode instance.
 *
 * @returns
 * Context button element.
 */
function renderContextButton(parentNode, editMode) {
    const contextMenuOptions = editMode.options.contextMenu;
    let contextButton;
    if (contextMenuOptions) {
        contextButton = createElement('button', {
            className: EditMode_EditGlobals.classNames.contextMenuBtn,
            onclick: function (event) {
                event.stopPropagation();
                editMode.onContextBtnClick();
            }
        }, {}, parentNode);
        // Add the icon if defined.
        if (contextMenuOptions.icon) {
            createElement('img', {
                src: contextMenuOptions.icon,
                className: EditMode_EditGlobals.classNames.icon
            }, {}, contextButton);
        }
        // Add text next to the icon if defined.
        if (contextMenuOptions.text) {
            createElement('span', {
                className: EditMode_EditGlobals.classNames.contextMenuBtnText,
                textContent: contextMenuOptions.text
            }, {}, contextButton);
        }
        contextButton.setAttribute('aria-label', editMode.lang.accessibility.contextMenu.button);
        contextButton.setAttribute('aria-expanded', 'false');
    }
    return contextButton;
}
/**
 * Creates the collapsable header element.
 * @internal
 *
 * @param parentElement
 * The HTMLElement to which the element should be rendered to.
 *
 * @param options
 * Nested header options.
 *
 * @returns the outer element and content in the collapsable div.
 */
function renderCollapseHeader(parentElement, options) {
    const { name, showToggle, onchange, isEnabled, isNested, isStandalone, lang } = options;
    const accordion = createElement('div', {
        className: EditMode_EditGlobals.classNames[(isNested ? 'accordionNestedWrapper' : 'accordionContainer')] + ' ' +
            (isStandalone ?
                EditMode_EditGlobals.classNames.accordionStandaloneWrapper : '') + ' ' + EditMode_EditGlobals.classNames.collapsableContentHeader
    }, {}, parentElement);
    const header = createElement('div', {
        className: EditMode_EditGlobals.classNames.accordionHeader
    }, {}, accordion);
    let headerBtn;
    if (!isStandalone || showToggle) {
        headerBtn = createElement(isStandalone && showToggle ? 'span' : 'button', {
            className: EditMode_EditGlobals.classNames[isStandalone ?
                'accordionHeaderWrapper' : 'accordionHeaderBtn']
        }, {}, header);
    }
    createElement('span', {
        textContent: lang[name] || name
    }, {}, headerBtn);
    if (showToggle && header) {
        renderToggle(header, {
            enabledOnOffLabels: true,
            id: name,
            name: '',
            onchange: onchange,
            value: isEnabled || false,
            lang
        });
    }
    if (!isStandalone) {
        const headerIcon = createElement('span', {
            className: EditMode_EditGlobals.classNames.accordionHeaderIcon + ' ' +
                EditMode_EditGlobals.classNames.collapsedElement
        }, {}, headerBtn);
        headerBtn?.addEventListener('click', function () {
            content.classList.toggle(EditMode_EditGlobals.classNames.hiddenElement);
            headerIcon?.classList.toggle(EditMode_EditGlobals.classNames.collapsedElement);
        });
    }
    const content = createElement('div', {
        className: EditMode_EditGlobals.classNames.accordionContent + ' ' +
            (isStandalone ?
                EditMode_EditGlobals.classNames.standaloneElement :
                EditMode_EditGlobals.classNames.hiddenElement)
    }, {}, accordion);
    return { outerElement: accordion, content: content };
}
/**
 * Function to create select element.
 *
 * @param parentElement
 * The element to which the new element should be appended.
 *
 * @param options
 * Select form field options.
 *
 * @returns
 * Select element
 */
function renderSelect(parentElement, options) {
    if (!parentElement) {
        return;
    }
    if (options.name) {
        renderText(parentElement, { title: options.name, isLabel: true });
    }
    const iconsURLPrefix = options.iconsURLPrefix || '';
    const customSelect = createElement('div', {
        className: EditMode_EditGlobals.classNames.dropdown +
            ' ' +
            EditMode_EditGlobals.classNames.collapsableContentHeader
    }, {}, parentElement);
    const btn = createElement('button', {
        className: EditMode_EditGlobals.classNames.dropdownButton
    }, {}, customSelect);
    const btnContent = createElement('div', {
        className: EditMode_EditGlobals.classNames.dropdownButtonContent
    }, {}, btn);
    const iconURL = (find(options.selectOptions, (item) => item.name === options.value) || {}).iconURL;
    let headerIcon;
    if (iconURL) {
        headerIcon = createElement('img', {
            src: iconsURLPrefix + iconURL,
            className: EditMode_EditGlobals.classNames.icon
        }, {}, btnContent);
    }
    const placeholder = createElement('span', {
        textContent: options.value,
        id: options.id || ''
    }, {}, btnContent);
    const dropdownPointer = createElement('img', {
        className: EditMode_EditGlobals.classNames.dropdownIcon +
            ' ' +
            EditMode_EditGlobals.classNames.collapsedElement,
        src: iconsURLPrefix + 'dropdown-pointer.svg'
    }, {}, btn);
    const dropdown = createElement('ul', {
        className: EditMode_EditGlobals.classNames.dropdownContent +
            ' ' +
            EditMode_EditGlobals.classNames.hiddenElement
    }, {}, customSelect);
    btn.addEventListener('click', function () {
        dropdown.classList.toggle(EditMode_EditGlobals.classNames.hiddenElement);
        dropdownPointer.classList.toggle(EditMode_EditGlobals.classNames.collapsedElement);
    });
    for (let i = 0, iEnd = options.selectOptions.length; i < iEnd; ++i) {
        renderSelectElement(merge(options.selectOptions[i] || {}, { iconsURLPrefix }), dropdown, placeholder, options.id, dropdownPointer, headerIcon, options.onchange);
    }
    return customSelect;
}
/**
 * @internal
 */
function renderSelectElement(option, dropdown, placeholder, id, dropdownPointer, headerIcon, callback) {
    const iconURL = option.iconsURLPrefix + option.iconURL;
    const selectOption = createElement('li', {}, {}, dropdown);
    const selectOptionBtn = createElement('button', { className: EditMode_EditGlobals.classNames.customSelectButton }, {}, selectOption);
    if (option.iconURL) {
        createElement('img', {
            src: iconURL
        }, {}, selectOptionBtn);
    }
    createElement('span', { textContent: option.name || '' }, {}, selectOptionBtn);
    selectOptionBtn.addEventListener('click', function () {
        dropdown.classList.add(EditMode_EditGlobals.classNames.hiddenElement);
        dropdownPointer.classList.toggle(EditMode_EditGlobals.classNames.collapsedElement);
        placeholder.textContent = option.name || '';
        if (headerIcon && option.iconURL) {
            headerIcon.src = iconURL;
        }
        if (callback) {
            return callback(option.name);
        }
    });
}
/**
 * Function to create toggle element.
 *
 * @param parentElement
 * The element to which the new element should be appended.
 *
 * @param options
 * Form field options.
 *
 * @returns
 * Toggle element.
 */
function renderToggle(parentElement, options) {
    if (!parentElement) {
        return;
    }
    const lang = options.lang, value = options.value, title = options.title || options.name, langKey = options.langKey;
    if (options.isNested) {
        const labeledToggleWrapper = createElement('div', {
            className: EditMode_EditGlobals.classNames.labeledToggleWrapper
        }, {}, parentElement);
        parentElement = labeledToggleWrapper;
    }
    const toggleContainer = createElement('button', {
        className: EditMode_EditGlobals.classNames.toggleContainer,
        type: 'button',
        role: 'switch',
        ariaChecked: false,
        ariaLabel: langKey ? lang.accessibility[langKey][options.name] : ''
    }, {}, parentElement);
    if (title) {
        renderText(options.isNested ? parentElement : toggleContainer, { title });
    }
    if (options.enabledOnOffLabels) {
        renderText(toggleContainer, {
            title: lang.off,
            className: EditMode_EditGlobals.classNames.toggleLabels
        });
    }
    const toggle = createElement('label', {
        className: EditMode_EditGlobals.classNames.toggleWrapper +
            ' ' + (options.className || '')
    }, {}, toggleContainer);
    const input = renderCheckbox(toggle, value), callbackFn = options.onchange;
    callbackFn && toggleContainer.addEventListener('click', (e) => {
        callbackFn(!input.checked);
        input.checked = !input.checked;
        toggleContainer.setAttribute('aria-checked', input.checked);
        e.stopPropagation();
    });
    const slider = createElement('span', {
        className: EditMode_EditGlobals.classNames.toggleSlider
    }, {}, toggle);
    callbackFn && slider.addEventListener('click', (e) => {
        e.preventDefault();
    });
    if (options.enabledOnOffLabels) {
        renderText(toggleContainer, {
            title: lang.on,
            className: EditMode_EditGlobals.classNames.toggleLabels
        });
    }
    return toggleContainer;
}
/**
 * Function to create text element.
 *
 * @param parentElement
 * The element to which the new element should be appended
 *
 * @param options
 * Text options.
 *
 * @returns text Element
 */
function renderText(parentElement, options) {
    let textElem;
    const { title: text, className, isLabel } = options;
    if (parentElement) {
        const labelFor = isLabel ? { htmlFor: text } : {};
        textElem = createElement(isLabel ? 'label' : 'div', {
            className: EditMode_EditGlobals.classNames.labelText + ' ' + (className || ''),
            textContent: text,
            ...labelFor
        }, {}, parentElement);
    }
    return textElem;
}
/**
 * Function to create Icon element.
 *
 * @param parentElement
 * The element to which the new element should be appended.
 *
 * @param options
 * Icon options.
 *
 * @returns
 * Icon Element
 */
function renderIcon(parentElement, options) {
    const { icon, callback } = options;
    if (!parentElement) {
        return;
    }
    const iconElem = createElement('div', {
        onclick: callback,
        className: options.className || ''
    }, {}, parentElement);
    iconElem.style['background-image'] = 'url(' + icon + ')';
    const mousedown = options.mousedown;
    const click = options.click;
    if (mousedown) {
        iconElem.onmousedown = function () {
            mousedown.apply(this, arguments);
        };
    }
    if (click) {
        iconElem.addEventListener('click', function () {
            click.apply(this, arguments);
        });
    }
    return iconElem;
}
/**
 * Function to create input element.
 *
 * @param parentElement
 * the element to which the new element should be appended
 *
 * @param options
 * Form field options
 *
 * @returns
 * Input Element
 */
function renderInput(parentElement, options) {
    if (!parentElement) {
        return;
    }
    if (options.name) {
        renderText(parentElement, { title: options.name, isLabel: true });
    }
    const input = createElement('input', {
        type: 'text',
        onclick: options.callback,
        id: options.id || '',
        name: options.name || '',
        value: ((defined(options.value) &&
            options.value.toString().replace(/\"/g, '')) || '')
    }, {}, parentElement);
    const onchange = options.onchange;
    if (onchange) {
        input.addEventListener('change', function (e) {
            onchange(e.target.value);
        });
    }
    return input;
}
/**
 * Function to create textarea element.
 *
 * @param parentElement
 * The element to which the new element should be appended
 *
 * @param options
 * Form field options
 *
 * @returns
 * textarea Element
 */
function renderTextarea(parentElement, options) {
    if (!parentElement) {
        return;
    }
    if (options.name) {
        renderText(parentElement, { title: options.name, isLabel: true });
    }
    const textarea = createElement('textarea', {
        id: options.id,
        name: options.name,
        value: options.value || ''
    }, {}, parentElement);
    const onchange = options.onchange;
    if (onchange) {
        textarea.addEventListener('change', function (e) {
            onchange(e.target.value);
        });
    }
    return textarea;
}
/**
 * Function to render the input of type checkbox.
 *
 * @param parentElement
 * An element to which render the checkbox to
 *
 * @param checked
 * Whether the checkbox should be checked or not.
 *
 * @returns
 * The checkbox element
 */
function renderCheckbox(parentElement, checked) {
    let input;
    if (parentElement) {
        input = createElement('input', {
            type: 'checkbox',
            checked: !!checked
        }, {}, parentElement);
    }
    return input;
}
/**
 * Function to create button element.
 *
 * @param parentElement
 * the element to which the new element should be appended
 *
 * @param options
 * Button field options
 *
 * @returns
 * Button Element
 */
function renderButton(parentElement, options) {
    if (!parentElement) {
        return;
    }
    const button = createElement('button', {
        className: (EditMode_EditGlobals.classNames.button + ' ' +
            (options.className || '')),
        onclick: options.callback,
        textContent: options.text
    }, options.style || {}, parentElement);
    if (options.icon) {
        button.style['background-image'] =
            'url(' + options.icon + ')';
    }
    return button;
}
/**
 * Get the renderer function based on the type of the element to render.
 *
 * @param type
 * Type of the element to render
 *
 * @returns
 * function to render a specific element
 */
function getRendererFunction(type) {
    return {
        select: renderSelect,
        toggle: renderToggle,
        text: renderText,
        collapse: renderCollapseHeader,
        icon: renderIcon,
        contextButton: renderContextButton,
        input: renderInput,
        textarea: renderTextarea,
        checkbox: renderCheckbox,
        button: renderButton
    }[type];
}
const EditRenderer = {
    renderSelect,
    renderToggle,
    renderText,
    renderCollapseHeader,
    renderIcon,
    renderContextButton,
    renderInput,
    renderTextarea,
    renderCheckbox,
    renderButton,
    getRendererFunction
};
/* harmony default export */ const EditMode_EditRenderer = (EditRenderer);

;// ./code/dashboards/es-modules/Dashboards/EditMode/Menu/MenuItem.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */



class MenuItem {
    /* *
    *
    *  Constructor
    *
    * */
    constructor(menu, options) {
        this.menu = menu;
        this.isActive = false;
        this.options = merge(MenuItem.defaultOptions, options);
        this.container = this.setContainer();
        this.innerElement = this.setInnerElement();
    }
    /* *
    *
    *  Functions
    *
    * */
    setContainer() {
        const item = this, options = item.options;
        let className = EditMode_EditGlobals.classNames.menuItem;
        if (item.menu.options.itemsClassName) {
            className += ' ' + item.menu.options.itemsClassName;
        }
        if (options.className) {
            className += ' ' + options.className;
        }
        return createElement('div', { className: className || '' }, merge(this.options.style || {}, 
        // To remove
        this.isActive ? { display: 'block' } : {}), this.menu.container);
    }
    setInnerElement() {
        const item = this, options = item.options, container = item.container, langKey = options.langKey;
        if (options.type === 'toggle') {
            return EditMode_EditRenderer.renderToggle(container, {
                id: options.id,
                name: options.id,
                title: langKey ?
                    this.menu.editMode.lang[langKey] :
                    options.text,
                value: !!(options.getValue && options.getValue(item)),
                lang: this.menu.editMode.lang,
                langKey: langKey,
                onchange: options.events?.click?.bind(item)
            });
        }
        if (options.type === 'text') {
            return EditMode_EditRenderer.renderText(container, {
                title: langKey ?
                    this.menu.editMode.lang[langKey] :
                    options.text || '',
                className: options.className || ''
            });
        }
        if (options.type === 'icon') {
            return EditMode_EditRenderer.renderIcon(container, {
                icon: options.icon || '',
                mousedown: options.events?.onmousedown?.bind(item),
                click: options.events?.click?.bind(item)
            });
        }
        if (options.type === 'button') {
            return EditMode_EditRenderer.renderButton(container, {
                callback: options.events?.click?.bind(item),
                className: options.className || '',
                style: options.style || {},
                text: langKey ?
                    this.menu.editMode.lang[langKey] :
                    (options.text || '')
            });
        }
    }
    update() {
        const item = this, options = item.options;
        if (options.events && options.events.update) {
            options.events.update.apply(item, arguments);
        }
    }
    activate() {
        const item = this;
        item.update();
        // Temp.
        if (item.container) {
            item.isActive = true;
            item.container.style.display = 'block';
        }
    }
    deactivate() {
        const item = this;
        // Temp.
        if (item.container) {
            item.isActive = false;
            item.container.style.display = 'none';
        }
    }
}
/* *
*
*  Static Properties
*
* */
MenuItem.defaultOptions = {
    type: 'text'
};
/* harmony default export */ const Menu_MenuItem = (MenuItem);

;// ./code/dashboards/es-modules/Dashboards/EditMode/Menu/MenuItemBindings.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */
const MenuItemBindings = {
    /* *
    *
    *  Context menu
    *
    * */
    viewFullscreen: {
        id: 'viewFullscreen',
        type: 'button',
        langKey: 'viewFullscreen',
        events: {
            click: function () {
                const fullScreen = this.menu.editMode.board.fullscreen;
                if (fullScreen) {
                    fullScreen.toggle();
                }
            }
        }
    }
};
/* harmony default export */ const Menu_MenuItemBindings = (MenuItemBindings);

;// ./code/dashboards/es-modules/Dashboards/EditMode/Menu/Menu.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */




class Menu {
    /* *
    *
    *  Constructor
    *
    * */
    constructor(parentElement, options, editMode, parent) {
        this.parentElement = parentElement;
        this.isVisible = false;
        this.activeItems = [];
        this.options = options;
        this.items = {};
        this.editMode = editMode;
        if (parent) {
            this.parent = parent;
        }
        this.container = this.setContainer();
    }
    /* *
    *
    *  Functions
    *
    * */
    setContainer() {
        return createElement('div', {
            className: EditMode_EditGlobals.classNames.menu +
                ' ' + (this.options.className || '')
        }, {}, this.parentElement);
    }
    // ItemsSchemas - default items definitions.
    initItems(itemsSchemas, activeItems) {
        const menu = this, optionsItems = menu.options.items || [];
        let itemSchema, itemConfig, item, options;
        for (let i = 0, iEnd = optionsItems.length; i < iEnd; ++i) {
            itemConfig = optionsItems[i];
            itemSchema =
                typeof itemConfig === 'string' ? itemsSchemas[itemConfig] :
                    itemConfig.id ? itemsSchemas[itemConfig.id] :
                        {};
            options = typeof itemConfig === 'string' ?
                merge(itemSchema, { id: itemConfig }) :
                merge(itemSchema, itemConfig);
            if (options.id) {
                item = new Menu_MenuItem(menu, options);
                // Save initialized item.
                menu.items[item.options.id] = item;
                if (activeItems) {
                    item.activate();
                    menu.activeItems.push(item);
                }
            }
            else {
                // Error - defined item needs an id.
            }
        }
    }
    setActiveItems(items) {
        const menu = this;
        let item;
        // Deactivate items.
        for (let i = 0, iEnd = menu.activeItems.length; i < iEnd; ++i) {
            if (items.indexOf(menu.activeItems[i].options.id) === -1) {
                menu.activeItems[i].deactivate();
            }
        }
        menu.activeItems.length = 0;
        for (let j = 0, jEnd = items.length; j < jEnd; ++j) {
            item = menu.items[items[j]];
            if (item) {
                // Activate item.
                if (!item.isActive) {
                    item.activate();
                }
                else {
                    item.update();
                }
                menu.activeItems.push(item);
            }
        }
    }
    deactivateActiveItems() {
        const menu = this;
        for (let i = 0, iEnd = menu.activeItems.length; i < iEnd; ++i) {
            menu.activeItems[i].deactivate();
        }
    }
    updateActiveItems() {
        const activeItems = this.activeItems;
        for (let i = 0, iEnd = activeItems.length; i < iEnd; ++i) {
            activeItems[i].update();
        }
    }
    destroy() {
        this.activeItems.length = 0;
        this.container.remove();
        this.items = {};
        this.options = {};
    }
}
/* *
*
*  Static Properties
*
* */
Menu.items = Menu_MenuItemBindings;
/* harmony default export */ const Menu_Menu = (Menu);

;// ./code/dashboards/es-modules/Dashboards/EditMode/Toolbar/EditToolbar.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */



/**
 * Abstract Class of Edit Toolbar.
 * @internal
 */
class EditToolbar {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(editMode, options) {
        this.container = createElement('div', {
            className: options.className
        }, void 0, editMode.board.container);
        this.editMode = editMode;
        this.iconURLPrefix = editMode.iconsURLPrefix;
        this.menu = new Menu_Menu(this.container, options.menu, editMode, this);
        this.options = options;
        this.isVisible = false;
        if (this.options.outline) {
            this.outline = createElement('div', {
                className: options.outlineClassName
            }, void 0, this.container);
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    hide() {
        this.setPosition(void 0, void 0);
    }
    refreshOutline(x, y, guiElement, offset = 0) {
        const toolbar = this, guiElemCnt = (guiElement || {}).container;
        if (toolbar.outline && guiElemCnt) {
            css(toolbar.outline, {
                display: 'block',
                left: x - offset + 'px',
                top: y - offset + 'px',
                width: guiElemCnt.offsetWidth + offset * 2 + 'px',
                height: guiElemCnt.offsetHeight + offset * 2 + 'px'
            });
        }
    }
    hideOutline() {
        if (this.outline) {
            this.outline.style.display = 'none';
        }
    }
    setPosition(x, y) {
        const toolbar = this;
        if (toolbar.container) {
            css(toolbar.container, {
                left: (x || '-9999') + 'px',
                top: (y || '-9999') + 'px'
            });
        }
        toolbar.isVisible = defined(x) && defined(y);
    }
}
/* harmony default export */ const Toolbar_EditToolbar = (EditToolbar);

;// ./code/dashboards/es-modules/Dashboards/EditMode/Toolbar/CellEditToolbar.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */





const { isFirefox } = (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default());

/**
 * @internal
 */
class CellEditToolbar extends Toolbar_EditToolbar {
    static getItemsConfig(options, iconURLPrefix) {
        const items = [];
        if (options.dragDrop?.enabled) {
            items.push({
                id: 'drag',
                type: 'icon',
                icon: iconURLPrefix + 'drag.svg',
                events: {
                    onmousedown: function (e) {
                        // #22546, workaround for Firefox, where mouseenter
                        // event is not fired when triggering it while dragging
                        // another element.
                        if (isFirefox) {
                            e.preventDefault();
                        }
                        const cellEditToolbar = this.menu
                            .parent;
                        const dragDrop = cellEditToolbar.editMode.dragDrop;
                        if (dragDrop &&
                            cellEditToolbar.cell &&
                            isCell(cellEditToolbar.cell)) {
                            dragDrop.onDragStart(e, cellEditToolbar.cell);
                        }
                    }
                }
            });
        }
        if (options.settings?.enabled) {
            items.push({
                id: 'settings',
                type: 'icon',
                icon: iconURLPrefix + 'settings.svg',
                events: {
                    click: function () {
                        this.menu.parent.editMode.setEditOverlay();
                        this.menu.parent.onCellOptions();
                    }
                }
            });
        }
        items.push({
            id: 'destroy',
            type: 'icon',
            className: EditMode_EditGlobals.classNames.menuDestroy,
            icon: iconURLPrefix + 'destroy.svg',
            events: {
                click: function () {
                    const parentNode = this.menu.parent, editMode = this.menu.parent.editMode, popup = editMode.confirmationPopup;
                    popup.show({
                        confirmButton: {
                            value: editMode.lang.confirmButton,
                            callback: parentNode.onCellDestroy,
                            context: parentNode
                        },
                        cancelButton: {
                            value: editMode.lang.cancelButton,
                            callback: () => {
                                popup.closePopup();
                            }
                        },
                        text: editMode.lang.confirmDestroyCell
                    });
                }
            }
        });
        if (options.viewFullscreen?.enabled) {
            items.push({
                id: 'viewFullscreen',
                type: 'icon',
                className: EditMode_EditGlobals.classNames.viewFullscreen,
                icon: iconURLPrefix + 'fullscreen.svg',
                events: {
                    click: function () {
                        const fullScreen = this.menu.parent.editMode.board.fullscreen;
                        const container = this.menu.parent.cell.container.firstElementChild;
                        if (fullScreen) {
                            fullScreen.toggle(container);
                        }
                    }
                }
            });
        }
        return items;
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor(editMode) {
        super(editMode, merge(CellEditToolbar.defaultOptions, (editMode.options.toolbars || {}).cell, {
            menu: {
                items: CellEditToolbar.getItemsConfig(editMode.options, editMode.iconsURLPrefix)
            }
        }));
        if (editMode.customHTMLMode) {
            this.filterOptionsAvailableInCustomHTMLMode();
        }
        this.menu.initItems({});
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Show toolbar for given cell.
     *
     * @param cell
     * Cell to show toolbar for.
     */
    showToolbar(cell) {
        const toolbar = this;
        const cellCnt = cell.container;
        const toolbarWidth = 30;
        const toolbarMargin = 10;
        const cellToolbar = toolbar.editMode.cellToolbar;
        if (!cellToolbar) {
            return;
        }
        if (cellCnt && toolbar.editMode.isActive() &&
            !(toolbar.editMode.dragDrop || {}).isActive) {
            const cellOffsets = Layout_GUIElement.getOffsets(cell, toolbar.editMode.board.container);
            const x = cellOffsets.right - toolbarWidth - toolbarMargin;
            const y = cellOffsets.top + toolbarMargin;
            objectEach(toolbar.menu.items, (item) => {
                if (!cell.options?.editMode?.toolbarItems) {
                    item.activate();
                    return;
                }
                const toolbarItems = cell.options.editMode.toolbarItems;
                if (toolbarItems[item.options.id]
                    ?.enabled === false) {
                    item.deactivate();
                    return;
                }
                item.activate();
            });
            toolbar.setPosition(x, y);
            toolbar.cell = cell;
            toolbar.refreshOutline();
            cellToolbar.isVisible = true;
        }
        else if (toolbar.isVisible) {
            toolbar.hide();
            cellToolbar.isVisible = false;
        }
    }
    refreshOutline() {
        const toolbar = this, offsetWidth = -1;
        if (toolbar.cell && toolbar.cell.container && toolbar.outline) {
            super.refreshOutline(-toolbar.cell.container.offsetWidth, 0, this.cell, offsetWidth);
        }
    }
    /**
     * When options icon is clicked, show sidebar with options.
     */
    onCellOptions() {
        const toolbar = this;
        const editMode = toolbar.editMode;
        if (!editMode.sidebar) {
            return;
        }
        editMode.sidebar.show(toolbar.cell);
        toolbar.highlightCell();
    }
    onCellDestroy() {
        const toolbar = this;
        if (toolbar.cell && isCell(toolbar.cell)) {
            const row = toolbar.cell.row;
            const board = toolbar.editMode.board;
            const editMode = toolbar.editMode;
            const cellId = toolbar.cell.id;
            // Disable row highlight.
            toolbar.cell.row.setHighlight();
            toolbar.resetEditedCell();
            toolbar.cell.destroy();
            toolbar.cell = void 0;
            // Hide row and cell toolbars.
            editMode.hideToolbars(['cell', 'row']);
            // Disable resizer.
            editMode.resizer?.disableResizer();
            // Call cellResize dashboard event.
            if (row && row.cells && row.cells.length) {
                fireEvent(board, 'cellResize', {
                    cell: row.cells[0]
                });
                fireEvent(row, 'cellChange', { cell: row.cells[0], row });
            }
            fireEvent(editMode, 'layoutChanged', {
                type: 'cellDestroyed',
                target: cellId,
                board: board
            });
        }
    }
    resetEditedCell() {
        this.editedCell = void 0;
    }
    /**
     * Filter options available in custom HTML mode, only settings available.
     */
    filterOptionsAvailableInCustomHTMLMode() {
        this.options.menu.items = this.options.menu.items?.filter((item) => {
            if (typeof item === 'string') {
                return false;
            }
            return item.id === 'settings';
        });
    }
    /**
     * Highlight cell and gray out the rest of the dashboard.
     */
    highlightCell() {
        const toolbar = this;
        if (!toolbar.cell) {
            return;
        }
        if (toolbar.cell.setHighlight) {
            toolbar.cell.setHighlight();
        }
        else {
            toolbar.cell.container.classList.add(EditMode_EditGlobals.classNames.cellEditHighlight);
            toolbar.editMode.board.container.classList.add(EditMode_EditGlobals.classNames.dashboardCellEditHighlightActive);
        }
    }
}
/* *
 *
 *  Static Properties
 *
 * */
CellEditToolbar.defaultOptions = {
    enabled: true,
    className: EditMode_EditGlobals.classNames.editToolbar,
    outline: false,
    outlineClassName: EditMode_EditGlobals.classNames.editToolbarCellOutline,
    menu: {
        className: EditMode_EditGlobals.classNames.editToolbarCell,
        itemsClassName: EditMode_EditGlobals.classNames.editToolbarItem,
        items: []
    }
};
/* harmony default export */ const Toolbar_CellEditToolbar = (CellEditToolbar);

;// ./code/dashboards/es-modules/Dashboards/EditMode/Toolbar/RowEditToolbar.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */




/**
 * @internal
 */
class RowEditToolbar extends Toolbar_EditToolbar {
    static getMenuItemsConfig(options, iconURLPrefix) {
        const items = [];
        if (options.dragDrop?.enabled) {
            items.push({
                id: 'drag',
                type: 'icon',
                icon: iconURLPrefix + 'drag.svg',
                events: {
                    onmousedown: function (e) {
                        const rowEditToolbar = this.menu
                            .parent, dragDrop = rowEditToolbar.editMode.dragDrop;
                        e.preventDefault();
                        if (dragDrop && rowEditToolbar.row) {
                            dragDrop.onDragStart(e, rowEditToolbar.row);
                        }
                    }
                }
            });
        }
        items.push({
            id: 'destroy',
            type: 'icon',
            className: EditMode_EditGlobals.classNames.menuDestroy,
            icon: iconURLPrefix + 'destroy.svg',
            events: {
                click: function () {
                    const parentNode = this.menu.parent, editMode = this.menu.parent.editMode, popup = editMode.confirmationPopup;
                    popup.show({
                        confirmButton: {
                            value: editMode.lang.confirmButton,
                            callback: parentNode.onRowDestroy,
                            context: parentNode
                        },
                        cancelButton: {
                            value: editMode.lang.cancelButton,
                            callback: () => {
                                popup.closePopup();
                            }
                        },
                        text: editMode.lang.confirmDestroyRow
                    });
                }
            }
        });
        return items;
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor(editMode) {
        super(editMode, merge(RowEditToolbar.defaultOptions, (editMode.options.toolbars || {}).row, {
            menu: {
                items: RowEditToolbar.getMenuItemsConfig(editMode.options, editMode.iconsURLPrefix)
            }
        }));
        this.menu.initItems({});
    }
    /* *
     *
     *  Functions
     *
     * */
    refreshOutline(x, y) {
        const toolbar = this, offsetWidth = 2;
        if (toolbar.row && toolbar.row.container) {
            super.refreshOutline(x, y, this.row, offsetWidth);
        }
    }
    showToolbar(row) {
        const toolbar = this;
        const rowCnt = row.container;
        const rowToolbar = toolbar.editMode.rowToolbar;
        let x;
        let y;
        let offsetX;
        if (!rowToolbar) {
            return;
        }
        if (rowCnt &&
            toolbar.editMode.isActive() &&
            !(toolbar.editMode.dragDrop || {}).isActive) {
            const rowOffsets = Layout_GUIElement.getOffsets(row, toolbar.editMode.board.container);
            const rowWidth = rowOffsets.right - rowOffsets.left;
            objectEach(toolbar.menu.items, (item) => {
                if (!row.options?.editMode?.toolbarItems) {
                    item.activate();
                    return;
                }
                const toolbarItems = row.options.editMode.toolbarItems;
                if (toolbarItems[item.options.id]
                    ?.enabled === false) {
                    item.deactivate();
                    return;
                }
                item.activate();
            });
            offsetX = rowWidth / 2 - toolbar.container.clientWidth / 2;
            x = rowOffsets.left + offsetX;
            y = rowOffsets.top - toolbar.container.clientHeight;
            toolbar.setPosition(x, y);
            toolbar.row = row;
            toolbar.refreshOutline(-offsetX, toolbar.container.clientHeight);
            rowToolbar.isVisible = true;
        }
        else if (toolbar.isVisible) {
            toolbar.hide();
            rowToolbar.isVisible = false;
        }
    }
    onRowOptions() {
        const toolbar = this;
        if (toolbar.editMode.sidebar) {
            toolbar.editMode.sidebar.show(toolbar.row);
        }
    }
    onRowDestroy() {
        const toolbar = this;
        if (toolbar.row) {
            const rowId = toolbar.row.options.id || -1;
            this.resetEditedRow();
            toolbar.row.destroy();
            toolbar.row = void 0;
            // Hide row and cell toolbars.
            toolbar.editMode.hideToolbars(['cell', 'row']);
            toolbar.editMode.resizer?.disableResizer();
            fireEvent(toolbar.editMode, 'layoutChanged', {
                type: 'rowDestroyed',
                target: rowId,
                board: toolbar.editMode.board
            });
        }
    }
    resetEditedRow() {
        /// super.resetCurrentElements(this.row as Row, true);
        this.editedRow = void 0;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
RowEditToolbar.defaultOptions = {
    enabled: true,
    className: EditMode_EditGlobals.classNames.editToolbar,
    outline: true,
    outlineClassName: EditMode_EditGlobals.classNames.editToolbarRowOutline,
    menu: {
        className: EditMode_EditGlobals.classNames.editToolbarRow,
        itemsClassName: EditMode_EditGlobals.classNames.editToolbarItem,
        items: []
    }
};
/* harmony default export */ const Toolbar_RowEditToolbar = (RowEditToolbar);

// EXTERNAL MODULE: external {"amd":["dashboards/dashboards","AST"],"commonjs":["dashboards","AST"],"commonjs2":["dashboards","AST"],"root":["Dashboards","AST"]}
var dashboards_AST_commonjs_dashboards_AST_commonjs2_dashboards_AST_root_Dashboards_AST_ = __webpack_require__(160);
var dashboards_AST_commonjs_dashboards_AST_commonjs2_dashboards_AST_root_Dashboards_AST_default = /*#__PURE__*/__webpack_require__.n(dashboards_AST_commonjs_dashboards_AST_commonjs2_dashboards_AST_root_Dashboards_AST_);
;// ./code/dashboards/es-modules/Shared/BaseForm.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 * */

/* *
 *
 *  Imports
 *
 * */


/* *
 *
 *  Class
 *
 * */
class BaseForm {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(parentDiv, iconsURL) {
        this.iconsURL = iconsURL;
        this.container = this.createPopupContainer(parentDiv);
        this.closeButton = this.addCloseButton();
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Create popup div container.
     *
     * @param {HTMLElement} parentDiv
     * Parent div to attach popup.
     *
     * @param  {string} className
     * Class name of the popup.
     *
     * @return {HTMLElement}
     * Popup div.
     */
    createPopupContainer(parentDiv, className = 'highcharts-popup highcharts-no-tooltip') {
        return createElement('div', { className }, void 0, parentDiv);
    }
    /**
     * Create HTML element and attach click event to close popup.
     *
     * @param {string} className
     * Class name of the close button.
     *
     * @return {HTMLElement}
     * Close button.
     */
    addCloseButton(className = 'highcharts-popup-close') {
        const popup = this, iconsURL = this.iconsURL;
        // Create close popup button.
        const closeButton = createElement('button', { className }, void 0, this.container);
        createElement('span', {
            className: 'highcharts-icon'
        }, {
            backgroundImage: 'url(' + (iconsURL.match(/png|svg|jpeg|jpg|gif/ig) ?
                iconsURL : iconsURL + 'close.svg') + ')'
        }, closeButton);
        ['click', 'touchstart'].forEach((eventName) => {
            addEvent(closeButton, eventName, popup.closeButtonEvents.bind(popup));
        });
        // Close popup when press ESC
        addEvent(document, 'keydown', function (event) {
            if (event.code === 'Escape') {
                popup.closeButtonEvents();
            }
        });
        return closeButton;
    }
    /**
     * Close button events.
     * @return {void}
     */
    closeButtonEvents() {
        this.closePopup();
    }
    /**
     * Reset content of the current popup and show.
     *
     * @param {string} toolbarClass
     * Class name of the toolbar which styles should be reset.
     */
    showPopup(toolbarClass = 'highcharts-annotation-toolbar') {
        const popupDiv = this.container, popupCloseButton = this.closeButton;
        this.type = void 0;
        // Reset content.
        popupDiv.innerHTML = (dashboards_AST_commonjs_dashboards_AST_commonjs2_dashboards_AST_root_Dashboards_AST_default()).emptyHTML;
        // Reset toolbar styles if exists.
        if (popupDiv.className.indexOf(toolbarClass) >= 0) {
            popupDiv.classList.remove(toolbarClass);
            // Reset toolbar inline styles
            popupDiv.removeAttribute('style');
        }
        // Add close button.
        popupDiv.appendChild(popupCloseButton);
        popupDiv.style.display = 'block';
        popupDiv.style.height = '';
    }
    /**
     * Hide popup.
     */
    closePopup() {
        this.container.style.display = 'none';
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Shared_BaseForm = (BaseForm);

;// ./code/dashboards/es-modules/Dashboards/EditMode/ConfirmationPopup.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */




/**
 * Class to create confirmation popup.
 */
class ConfirmationPopup extends Shared_BaseForm {
    /* *
    *
    *  Static Properties
    *
    * */
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Constructs an instance of the ConfirmationPopup.
     *
     * @param parentDiv
     * Parent div where the popup will be added.
     *
     * @param iconsURL
     * URL to the icons.
     *
     * @param editMode
     * The EditMode instance.
     *
     * @param options
     * Options for confirmation popup.
     */
    constructor(parentDiv, iconsURL, editMode, options) {
        iconsURL =
            options && options.close && options.close.icon ?
                options.close.icon :
                iconsURL;
        super(parentDiv, iconsURL);
        this.editMode = editMode;
        this.options = options;
    }
    /* *
    *
    *  Functions
    *
    * */
    /**
     * Returns popup container.
     *
     * @param parentDiv
     * Parent div where the popup will be added.
     *
     * @param className
     * Class name added to the popup container.
     */
    createPopupContainer(parentDiv, className = EditMode_EditGlobals.classNames.confirmationPopup) {
        return super.createPopupContainer(parentDiv, className);
    }
    /**
     * Adds close button to the popup.
     *
     * @param className
     * Class name added to the close button.
     */
    addCloseButton(className = EditMode_EditGlobals.classNames.popupCloseButton) {
        return super.addCloseButton(className);
    }
    /**
     * Adds events to the close button.
     *
     * @override BaseForm.closeButtonEvents
     */
    closeButtonEvents() {
        const cancelCallback = this.contentOptions?.cancelButton.callback;
        if (!cancelCallback) {
            return;
        }
        cancelCallback();
    }
    /**
     * Adds content inside the popup.
     */
    renderContent() {
        const options = this.contentOptions;
        if (!options) {
            return;
        }
        // Render content wrapper
        this.contentContainer = createElement('div', {
            className: EditMode_EditGlobals.classNames.popupContentContainer
        }, {}, this.container);
        const popupContainer = this.contentContainer.parentNode;
        popupContainer.style.marginTop = '0px';
        const offsetTop = popupContainer.getBoundingClientRect().top;
        popupContainer.style.marginTop = (offsetTop < 0 ? Math.abs(offsetTop - 200) : 200) + 'px';
        // Render text
        EditMode_EditRenderer.renderText(this.contentContainer, {
            title: options.text || ''
        });
        // Render button wrapper
        this.buttonContainer = createElement('div', {
            className: EditMode_EditGlobals.classNames.popupButtonContainer
        }, {}, this.container);
        // Render cancel buttons
        EditMode_EditRenderer.renderButton(this.buttonContainer, {
            text: options.cancelButton.value,
            className: EditMode_EditGlobals.classNames.popupCancelBtn,
            callback: options.cancelButton.callback
        });
        // Confirm
        EditMode_EditRenderer.renderButton(this.buttonContainer, {
            text: options.confirmButton.value,
            className: EditMode_EditGlobals.classNames.popupConfirmBtn,
            callback: () => {
                options.confirmButton.callback.call(options.confirmButton.context);
                this.closePopup();
            }
        });
    }
    /**
     * Shows confirmation popup.
     *
     * @param options
     * Options for confirmation popup.
     */
    show(options) {
        this.contentOptions = options;
        this.showPopup();
        this.renderContent();
        this.editMode.setEditOverlay();
    }
    /**
     * Hides confirmation popup.
     */
    closePopup() {
        super.closePopup();
        this.editMode.setEditOverlay(true);
    }
}
/* harmony default export */ const EditMode_ConfirmationPopup = (ConfirmationPopup);

;// ./code/dashboards/es-modules/Dashboards/EditMode/AccordionMenu.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Paweł Lysy
 *  - Sebastian Bochan
 *
 * */






/* *
 *
 *  Class
 *
 * */
/**
 * Accordion menu class.
 */
class AccordionMenu {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(iconsURLPrefix, closeSidebar) {
        this.changedOptions = {};
        this.chartOptionsJSON = {};
        this.oldOptionsBuffer = {};
        this.waitingForConfirmation = false;
        this.iconsURLPrefix = iconsURLPrefix;
        this.closeSidebar = closeSidebar;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Renders the menu for given component.
     *
     * @param container
     * The HTML Element to render the menu in.
     *
     * @param component
     * The component to render the menu for.

     * @param sidebarMainContainer
     * The main container of the sidebar.
     */
    renderContent(container, component, sidebarMainContainer) {
        const { editMode } = component.board;
        const menu = this;
        const editableOptions = component.editableOptions.getOptions();
        let options;
        let content;
        this.component = component;
        this.oldOptionsBuffer = component.getEditableOptions();
        if (editMode) {
            this.confirmationPopup = new EditMode_ConfirmationPopup(component.board.container, editMode.iconsURLPrefix, editMode, { close: { icon: '' } });
        }
        const accordionContainer = createElement('div', {
            className: EditMode_EditGlobals.classNames.accordionMenu
        }, {}, container);
        for (let i = 0, end = editableOptions.length; i < end; i++) {
            options = editableOptions[i];
            content = EditMode_EditRenderer.renderCollapseHeader(accordionContainer, merge({
                iconsURLPrefix: menu.iconsURLPrefix,
                lang: (component.board?.editMode || EditMode_EditGlobals).lang
            }, options)).content;
            this.renderAccordion(options, content, component);
        }
        const buttonContainer = createElement('div', {
            className: EditMode_EditGlobals.classNames.accordionMenuButtonsContainer
        }, {}, sidebarMainContainer);
        EditMode_EditRenderer.renderButton(buttonContainer, {
            text: (component.board?.editMode || EditMode_EditGlobals)
                .lang.confirmButton,
            className: EditMode_EditGlobals.classNames.popupConfirmBtn,
            callback: async () => {
                await this.confirmChanges();
                fireEvent(editMode, 'confirmEditing');
            }
        });
        EditMode_EditRenderer.renderButton(buttonContainer, {
            text: (component.board?.editMode || EditMode_EditGlobals)
                .lang.cancelButton,
            className: EditMode_EditGlobals.classNames.popupCancelBtn,
            callback: () => {
                this.cancelChanges();
                fireEvent(editMode, 'cancelEditing');
            }
        });
        sidebarMainContainer.appendChild(buttonContainer);
    }
    /**
     * Update the options object with new nested value, based on the property
     * path. If the objects in the path are not defined, the function will
     * create them.
     *
     * @param propertyPath
     * Path of the property for which the value should be updated.
     * Example: ```['chartOptions', 'chart', 'type']```
     *
     * @param value
     * New value of the property.
     */
    updateOptions(propertyPath, value) {
        const pathLength = propertyPath.length - 1;
        let currentLevel = this.changedOptions;
        let currentChartOptionsLevel;
        let currentOldChartOptionsBufferLevel;
        let currentGridOptionsLevel;
        let currentOldGridOptionsBufferLevel;
        if (pathLength === 0 && propertyPath[0] === 'chartOptions') {
            try {
                const parsedValue = JSON.parse(value);
                this.chartOptionsJSON = parsedValue;
            }
            catch (e) {
                // TODO: Handle the wrong config passed from the user.
                (0,dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_.error)('Dashboards Error: Wrong JSON config structure passed ' +
                    'as chart options. \n____________\n' +
                    String(e));
            }
        }
        for (let i = 0; i < pathLength; i++) {
            const key = propertyPath[i];
            if (!currentLevel[key]) {
                currentLevel[key] = {};
            }
            currentLevel = currentLevel[key];
            if (key === 'gridOptions') {
                const realGridOptions = this.component.grid?.options;
                if (realGridOptions) {
                    const oldOptionsBuffer = this.oldOptionsBuffer;
                    if (!oldOptionsBuffer.gridOptions) {
                        oldOptionsBuffer.gridOptions = {};
                    }
                    currentOldGridOptionsBufferLevel =
                        oldOptionsBuffer.gridOptions;
                    currentGridOptionsLevel = realGridOptions;
                }
            }
            else if (currentGridOptionsLevel &&
                currentOldGridOptionsBufferLevel) {
                currentGridOptionsLevel = currentGridOptionsLevel[key];
                if (currentOldGridOptionsBufferLevel[key] === void 0) {
                    currentOldGridOptionsBufferLevel[key] = {};
                }
                currentOldGridOptionsBufferLevel =
                    currentOldGridOptionsBufferLevel[key];
            }
            if (key === 'chartOptions') {
                const realChartOptions = this.component.chart?.options;
                if (realChartOptions) {
                    const oldOptionsBuffer = this.oldOptionsBuffer;
                    if (!oldOptionsBuffer.chartOptions) {
                        oldOptionsBuffer.chartOptions = {};
                    }
                    currentOldChartOptionsBufferLevel =
                        oldOptionsBuffer.chartOptions;
                    currentChartOptionsLevel = realChartOptions;
                }
            }
            else if (currentChartOptionsLevel &&
                currentOldChartOptionsBufferLevel) {
                currentChartOptionsLevel = currentChartOptionsLevel[key];
                if (currentOldChartOptionsBufferLevel[key] === void 0) {
                    currentOldChartOptionsBufferLevel[key] = {};
                }
                currentOldChartOptionsBufferLevel =
                    currentOldChartOptionsBufferLevel[key];
            }
        }
        const lastKey = propertyPath[pathLength];
        currentLevel[lastKey] = value;
        if (currentOldChartOptionsBufferLevel && currentChartOptionsLevel) {
            currentOldChartOptionsBufferLevel[lastKey] = (currentOldChartOptionsBufferLevel[lastKey] ??
                currentChartOptionsLevel[lastKey]);
        }
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.component?.update(this.changedOptions);
    }
    /**
     * Renders either a basic or nested element. This function can be
     * recursively called, if there are multiple nested options.
     *
     * @param options
     * Configuration object of the Component options.
     *
     * @param parentNode
     * A container where the accordion is rendered.
     *
     * @param component
     * the component for which the menu should be rendered.
     */
    renderAccordion(options, parentNode, component) {
        if (options.type === 'nested') {
            return this.renderNested(parentNode, options, component);
        }
        const renderFunction = EditMode_EditRenderer.getRendererFunction(options.type);
        const lang = (component.board?.editMode || EditMode_EditGlobals).lang;
        if (!renderFunction) {
            return;
        }
        renderFunction(parentNode, {
            ...options,
            iconsURLPrefix: this.iconsURLPrefix,
            value: component.getEditableOptionValue(options.propertyPath),
            enabledOnOffLabels: options.type === 'toggle',
            lang,
            onchange: (value) => this.updateOptions(options.propertyPath || [], value)
        });
    }
    /**
     * Render nested menu for the component.
     *
     * @param parentElement
     * HTML element to which the nested structure should be rendered to
     *
     * @param options
     * configuration object for the options
     *
     * @param component
     * The component instance for the options should be rendered
     */
    renderNested(parentElement, options, component) {
        if (!parentElement || !options.nestedOptions) {
            return;
        }
        const nestedOptions = options.nestedOptions;
        for (let i = 0, iEnd = nestedOptions.length; i < iEnd; ++i) {
            const name = nestedOptions[i].name;
            const accordionOptions = nestedOptions[i].options;
            const showToggle = !!nestedOptions[i].showToggle;
            const propertyPath = nestedOptions[i].propertyPath || [];
            const lang = (component.board?.editMode || EditMode_EditGlobals).lang;
            const collapsedHeader = EditMode_EditRenderer.renderCollapseHeader(parentElement, {
                name,
                isEnabled: !!component.getEditableOptionValue(propertyPath),
                iconsURLPrefix: this.iconsURLPrefix,
                showToggle: showToggle,
                onchange: (value) => this.updateOptions(propertyPath, value),
                isNested: !!accordionOptions,
                isStandalone: !accordionOptions,
                lang
            });
            for (let j = 0, jEnd = accordionOptions?.length; j < jEnd; ++j) {
                this.renderAccordion(merge(accordionOptions[j], { lang, isNested: true }), collapsedHeader.content, component);
            }
        }
        return;
    }
    /**
     * Closes the sidebar discarding changes. If there are any changes, it will
     * show a confirmation popup. If no changes, it will close the sidebar.
     */
    cancelChanges() {
        if (Object.keys(this.changedOptions).length < 1) {
            this.closeSidebar();
        }
        else {
            this.showCancelConfirmationPopup();
        }
    }
    /**
     * Confirms changes made in the component.
     *
     * @fires EditMode#componentChanged
     */
    async confirmChanges() {
        const component = this.component;
        if (!component) {
            return;
        }
        if (component.type === 'Highcharts' &&
            Object.keys(this.chartOptionsJSON).length) {
            await component.update({
                chartOptions: this.chartOptionsJSON
            });
        }
        else if (component.type === 'HTML') {
            const options = this.changedOptions;
            await component.update(options, true);
        }
        fireEvent(component.board.editMode, 'componentChanged', {
            target: component,
            changedOptions: merge({}, this.changedOptions),
            oldOptions: merge({}, this.oldOptionsBuffer)
        });
        this.changedOptions = {};
        this.chartOptionsJSON = {};
        this.closeSidebar();
    }
    /**
     * Discards changes made in the component.
     *
     * @fires EditMode#componentChangesDiscarded
     */
    async discardChanges() {
        const component = this.component;
        if (!component) {
            return;
        }
        await component.update(this.oldOptionsBuffer);
        fireEvent(component.board.editMode, 'componentChangesDiscarded', {
            target: component,
            changedOptions: merge({}, this.changedOptions),
            oldOptions: merge({}, this.oldOptionsBuffer)
        });
        this.changedOptions = {};
        this.chartOptionsJSON = {};
    }
    /**
     * Shows a confirmation popup when the user tries to discard changes.
     */
    showCancelConfirmationPopup() {
        const popup = this.confirmationPopup;
        const editMode = this.component?.board?.editMode;
        if (!popup || !editMode || this.waitingForConfirmation) {
            return;
        }
        this.waitingForConfirmation = true;
        popup.show({
            text: editMode.lang.confirmDiscardChanges,
            confirmButton: {
                value: editMode.lang.confirmButton,
                callback: async () => {
                    await this.discardChanges();
                    this.waitingForConfirmation = false;
                    this.closeSidebar();
                },
                context: this
            },
            cancelButton: {
                value: editMode.lang.cancelButton,
                callback: () => {
                    popup.closePopup();
                    editMode.setEditOverlay();
                    setTimeout(() => {
                        this.waitingForConfirmation = false;
                    }, 100);
                }
            }
        });
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const EditMode_AccordionMenu = (AccordionMenu);

// EXTERNAL MODULE: external {"amd":["dashboards/dashboards","ComponentRegistry"],"commonjs":["dashboards","ComponentRegistry"],"commonjs2":["dashboards","ComponentRegistry"],"root":["Dashboards","ComponentRegistry"]}
var dashboards_ComponentRegistry_commonjs_dashboards_ComponentRegistry_commonjs2_dashboards_ComponentRegistry_root_Dashboards_ComponentRegistry_ = __webpack_require__(376);
var dashboards_ComponentRegistry_commonjs_dashboards_ComponentRegistry_commonjs2_dashboards_ComponentRegistry_root_Dashboards_ComponentRegistry_default = /*#__PURE__*/__webpack_require__.n(dashboards_ComponentRegistry_commonjs_dashboards_ComponentRegistry_commonjs2_dashboards_ComponentRegistry_root_Dashboards_ComponentRegistry_);
;// ./code/dashboards/es-modules/Dashboards/Actions/Bindings.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */





/* *
 *
 *  Functions
 *
 * */
function getGUIElement(idOrElement, parentElement) {
    let guiElement;
    if (typeof idOrElement === 'string' &&
        document.querySelectorAll('#' + idOrElement).length > 1) {
        // eslint-disable-next-line no-console
        console.warn(`Multiple cells have identical ID %c${idOrElement}%c, potentially leading to unexpected behavior. \nEnsure that each cell has a unique ID on the page.`, 'font-weight: bold', '');
    }
    const container = parentElement ?
        parentElement.querySelector('#' + idOrElement) :
        document.getElementById(idOrElement);
    if (container !== null) {
        fireEvent(container, 'bindedGUIElement', {}, function (e) {
            guiElement = e.guiElement;
        });
    }
    return guiElement;
}
async function addComponent(options, board, cell) {
    const optionsStates = options.states;
    const optionsEvents = options.events;
    const renderTo = options.renderTo;
    if (!renderTo) {
        // eslint-disable-next-line no-console
        console.error('The%c renderTo%c option is required to render the component.', 'font-weight: bold', '');
        return;
    }
    if (board.mountedComponents.filter((el) => el.options.renderTo === renderTo).length > 0) {
        // eslint-disable-next-line no-console
        console.error(`A component has already been declared in the cell %c${renderTo}%c use a different cell.`, 'font-weight: bold', '');
        return;
    }
    cell = cell || Bindings.getCell(renderTo, board.container);
    const componentContainer = cell?.container || document.querySelector('#' + renderTo);
    if (!componentContainer || !options.type) {
        // eslint-disable-next-line no-console
        console.error(`The component is unable to find the HTML cell element %c${renderTo}%c to render the content.`, 'font-weight: bold', '');
        return;
    }
    let ComponentClass = (dashboards_ComponentRegistry_commonjs_dashboards_ComponentRegistry_commonjs2_dashboards_ComponentRegistry_root_Dashboards_ComponentRegistry_default()).types[options.type];
    if (!ComponentClass) {
        // eslint-disable-next-line no-console
        console.error(`The component's type %c${options.type}%c does not exist.`, 'font-weight: bold', '');
        if (cell) {
            ComponentClass =
                (dashboards_ComponentRegistry_commonjs_dashboards_ComponentRegistry_commonjs2_dashboards_ComponentRegistry_root_Dashboards_ComponentRegistry_default()).types['HTML'];
            options.title = {
                text: board.editMode?.lang.errorMessage ||
                    'Something went wrong',
                className: (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNamePrefix + 'component-title-error ' +
                    (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNamePrefix + 'component-title'
            };
        }
    }
    const component = new ComponentClass(cell, options, board);
    const promise = component.load()['catch']((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        return component.update({
            connector: {
                id: ''
            },
            title: {
                text: board.editMode?.lang.errorMessage ||
                    'Something went wrong',
                className: (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNamePrefix + 'component-title-error ' +
                    (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNamePrefix + 'component-title'
            }
        });
    });
    if (cell) {
        component.setCell(cell);
        cell.mountedComponent = component;
    }
    board.mountedComponents.push({
        options: options,
        component: component,
        cell: cell || new Layout_CellHTML({
            id: renderTo,
            container: componentContainer,
            mountedComponent: component
        })
    });
    if (cell &&
        optionsStates?.active?.enabled &&
        optionsStates?.active?.isActive) {
        cell.setActiveState();
        component.isActive = true;
    }
    fireEvent(component, 'mount');
    // Events
    addEvent(componentContainer, 'click', () => {
        // Call the component's click callback
        if (optionsEvents && optionsEvents.click) {
            optionsEvents.click.call(component);
        }
        // Default behavior
        if (cell &&
            component &&
            componentContainer &&
            optionsStates?.active?.enabled) {
            cell.setActiveState();
            component.isActive = true;
        }
    });
    // States
    if (optionsStates?.hover?.enabled) {
        componentContainer.classList.add((dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNames.cellHover);
    }
    fireEvent(component, 'afterLoad');
    return promise;
}
function getCell(idOrElement, parentElement) {
    const cell = getGUIElement(idOrElement, parentElement);
    if (!(cell && cell.getType() === 'cell')) {
        return;
    }
    return cell;
}
function getRow(idOrElement, parentElement) {
    const row = getGUIElement(idOrElement, parentElement);
    if (!(row && row.getType() === 'row')) {
        return;
    }
    return row;
}
function getLayout(idOrElement, parentElement) {
    const layout = getGUIElement(idOrElement, parentElement);
    if (!(layout && layout.getType() === 'layout')) {
        return;
    }
    return layout;
}
/* *
 *
 *  Default Export
 *
 * */
const Bindings = {
    addComponent,
    getCell,
    getLayout,
    getRow
};
/* harmony default export */ const Actions_Bindings = (Bindings);

;// ./code/dashboards/es-modules/Dashboards/Layout/Row.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */






/**
 * @internal
 **/
class Row extends Layout_GUIElement {
    /* *
    *
    *  Static Properties
    *
    * */
    static setContainerHeight(rowContainer, height) {
        if (height) {
            rowContainer.style.height = height + 'px';
        }
    }
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Constructs an instance of the Row class.
     *
     * @param {Layout} layout
     * Reference to the layout instance.
     *
     * @param {Options} options
     * Options for the row.
     *
     * @param {HTMLElement} rowElement
     * The container of the row HTML element.
     */
    constructor(layout, options, rowElement) {
        super();
        /**
         * The type of GUI element.
         */
        this.type = (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).guiElementType.row;
        this.layout = layout;
        this.cells = [];
        this.options = options;
        this.isVisible = true;
        // Get parent container
        const parentContainer = document.getElementById(options.parentContainerId || '') ||
            layout.container;
        const layoutOptions = (layout.options || {}), rowClassName = layoutOptions.rowClassName || '';
        this.container = this.getElementContainer({
            render: layout.board.guiEnabled,
            parentContainer: parentContainer,
            attribs: {
                id: options.id,
                className: (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNames.row + ' ' +
                    rowClassName
            },
            element: rowElement,
            elementId: options.id,
            style: merge(layoutOptions.style, options.style)
        });
        // Init rows from options.
        if (this.options.cells) {
            this.setCells();
        }
    }
    /* *
    *
    *  Functions
    *
    * */
    /**
     * Set the row cells using cell options or cellClassName.
     */
    setCells() {
        const row = this, cellClassName = (row.layout.options || {}).cellClassName || '', cellsElements = pick(row.options.cells, row.container && row.container.getElementsByClassName(cellClassName)) || [];
        let cellElement, i, iEnd;
        for (i = 0, iEnd = cellsElements.length; i < iEnd; ++i) {
            cellElement = cellsElements[i];
            row.addCell(row.layout.board.guiEnabled ? cellElement : { id: '' }, cellElement instanceof HTMLElement ? cellElement : void 0);
        }
    }
    /**
     * Add a new Cell instance to the row cells array.
     *
     * @param {CellOptions} [options]
     * Options for the row cell.
     *
     * @param {HTMLElement} [cellElement]
     * The container for a new cell HTML element.
     *
     * @return {Cell}
     * Returns the Cell object.
     */
    addCell(options, cellElement, index) {
        const row = this, cell = new Layout_Cell(row, options, cellElement);
        if (!defined(index)) {
            row.cells.push(cell);
        }
        else {
            row.mountCell(cell, index);
        }
        // Set editMode events.
        if (row.layout.board.editMode) {
            row.layout.board.editMode.setCellEvents(cell);
        }
        return cell;
    }
    /**
     * Destroy the element, its container, event hooks
     * and inner cells.
     */
    destroy() {
        const row = this;
        const { layout } = row;
        const board = row.layout.board;
        const editMode = board.editMode;
        // Destroy cells.
        if (row.cells) {
            // Copy to avoid problem with index when shifting array of cells
            // during the destroy.
            const rowCells = [...row.cells];
            for (let i = 0, iEnd = rowCells.length; i < iEnd; ++i) {
                if (rowCells[i]) {
                    rowCells[i].destroy();
                }
            }
        }
        if (row.layout) {
            row.layout.unmountRow(row);
            super.destroy();
            if (layout.rows?.length === 0) {
                layout.destroy();
            }
        }
        fireEvent(editMode, 'rowDestroyed', {
            target: row,
            board: board
        });
    }
    /**
     * Get the row's options.
     * @returns
     * The JSON of row's options.
     *
     * @internal
     *
     */
    getOptions() {
        const row = this, cells = [];
        for (let i = 0, iEnd = row.cells.length; i < iEnd; ++i) {
            cells.push(row.cells[i].getOptions());
        }
        return {
            id: this.options.id,
            style: this.options.style,
            cells
        };
    }
    setSize(height) {
        Row.setContainerHeight(this.container, height);
    }
    // Get cell index from the row.cells array.
    getCellIndex(cell) {
        for (let i = 0, iEnd = this.cells?.length; i < iEnd; ++i) {
            if (this.cells[i].id === cell.id) {
                return i;
            }
        }
    }
    // Add cell to the row.cells array and move cell container.
    mountCell(cell, index = 0) {
        const row = this, nextCell = row.cells[index], prevCell = row.cells[index - 1];
        if (cell.container) {
            if (nextCell && nextCell.container) {
                nextCell.container.parentNode.insertBefore(cell.container, nextCell.container);
            }
            else if (prevCell && prevCell.container) {
                prevCell.container.parentNode.insertBefore(cell.container, prevCell.container.nextSibling);
            }
            else if (!prevCell && !nextCell && row.container) {
                row.container.appendChild(cell.container);
            }
            row.cells.splice(index, 0, cell);
            cell.row = row;
            setTimeout(() => {
                fireEvent(row, 'cellChange', { row, cell });
            }, 0);
        }
    }
    // Remove cell from the row.cells array.
    unmountCell(cell) {
        const cellIndex = this.getCellIndex(cell);
        if (defined(cellIndex)) {
            this.cells.splice(cellIndex, 1);
        }
        setTimeout(() => {
            fireEvent(this, 'cellChange', { row: this, cell });
        }, 0);
    }
    getVisibleCells() {
        const cells = [];
        for (let i = 0, iEnd = this.cells.length; i < iEnd; ++i) {
            if (this.cells[i].isVisible) {
                cells.push(this.cells[i]);
            }
        }
        return cells;
    }
    changeVisibility(setVisible = true, displayStyle) {
        const row = this;
        super.changeVisibility(setVisible, displayStyle);
        // Change layout visibility if needed.
        if (!row.layout.getVisibleRows().length) {
            row.layout.hide();
        }
        else if (row.isVisible && !row.layout.isVisible) {
            row.layout.show();
        }
    }
    show() {
        this.changeVisibility(true, 'flex');
    }
    setHighlight(remove) {
        const classList = this.container.classList;
        const highlightClass = EditMode_EditGlobals.classNames.rowContextHighlight;
        if (remove === true) {
            classList.remove(highlightClass);
        }
        else {
            classList.toggle(highlightClass, !remove);
        }
    }
    // Row can have cells below each others.
    // This method returns cells split into levels.
    getRowLevels() {
        const row = this, rowLevels = {}, rowLevelsArray = [];
        let cell, cellOffsets;
        for (let k = 0, kEnd = row.cells.length; k < kEnd; ++k) {
            cell = row.cells[k];
            if (cell.isVisible) {
                cellOffsets = Layout_GUIElement.getOffsets(cell);
                if (!rowLevels[cellOffsets.top]) {
                    rowLevels[cellOffsets.top] = {
                        top: cellOffsets.top,
                        bottom: cellOffsets.bottom,
                        cells: []
                    };
                }
                if (rowLevels[cellOffsets.top].bottom < cellOffsets.bottom) {
                    rowLevels[cellOffsets.top].bottom = cellOffsets.bottom;
                }
                rowLevels[cellOffsets.top].cells.push(cell);
            }
        }
        objectEach(rowLevels, (value) => {
            rowLevelsArray.push(value);
        });
        return rowLevelsArray;
    }
    // Get row level with additional info
    // on a specific Y position.
    getRowLevelInfo(posY) {
        const rowLevels = this.getRowLevels();
        let rowLevelInfo;
        for (let i = 0, iEnd = rowLevels.length; i < iEnd; ++i) {
            if (rowLevels[i].top <= posY && rowLevels[i].bottom > posY) {
                rowLevelInfo = {
                    index: i,
                    rowLevels: rowLevels,
                    rowLevel: rowLevels[i]
                };
            }
        }
        return rowLevelInfo;
    }
}
/* harmony default export */ const Layout_Row = (Row);

;// ./code/dashboards/es-modules/Dashboards/Layout/Layout.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */




/**
 * @internal
 **/
class Layout extends Layout_GUIElement {
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Constructs an instance of the Layout class.
     *
     * @param {Dashboard} board
     * Reference to the dashboard instance.
     *
     * @param {Options} options
     * Options for the layout.
     */
    constructor(board, options, parentCell) {
        super();
        /**
         * The type of GUI element.
         */
        this.type = (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).guiElementType.layout;
        this.board = board;
        this.rows = [];
        this.options = options;
        this.isVisible = true;
        // Get parent container
        const parentContainer = parentCell ? parentCell.container :
            document.getElementById(options.parentContainerId || '') || board.layoutsWrapper;
        // Set layout level.
        if (parentCell) {
            this.parentCell = parentCell;
            this.level = parentCell.row.layout.level + 1;
        }
        else {
            this.level = 0;
        }
        // GUI structure
        if (options.copyId) {
            this.copyId = options.copyId;
        }
        const layoutOptions = (this.options || {}), layoutClassName = layoutOptions.rowClassName || '';
        this.container = this.getElementContainer({
            render: board.guiEnabled,
            parentContainer: parentContainer,
            attribs: {
                id: (options.id || '') + (this.copyId ? '_' + this.copyId : ''),
                className: (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNames.layout + ' ' +
                    layoutClassName
            },
            elementId: options.id,
            style: this.options.style
        });
        // Init rows from options.
        if (this.options.rows) {
            this.setRows();
        }
    }
    /* *
    *
    *  Functions
    *
    * */
    /**
     * Set the layout rows using rows options or rowClassName.
     */
    setRows() {
        const layout = this, rowsElements = pick(layout.options.rows, layout.container && layout.container.getElementsByClassName(layout.options.rowClassName || '')) || [];
        let rowElement, i, iEnd;
        for (i = 0, iEnd = rowsElements.length; i < iEnd; ++i) {
            rowElement = rowsElements[i];
            layout.addRow(layout.board.guiEnabled ? rowElement : {}, rowElement instanceof HTMLElement ? rowElement : void 0);
        }
    }
    /**
     * Add a new Row instance to the layout rows array.
     *
     * @param {RowOptions} options
     * Options of a row.
     *
     * @param {HTMLElement} rowElement
     * The container for a new row HTML element.
     *
     * @return {Row}
     * Returns the Row object.
     */
    addRow(options, rowElement, index) {
        const layout = this, row = new Layout_Row(layout, options, rowElement);
        if (!defined(index)) {
            layout.rows.push(row);
        }
        else {
            layout.mountRow(row, index);
        }
        // Set editMode events.
        if (layout.board.editMode) {
            layout.board.editMode.setRowEvents(row);
        }
        return row;
    }
    /**
     * Destroy the element, its container, event hooks
     * and inner rows.
     */
    destroy() {
        const layout = this;
        for (let i = layout.board.layouts.length - 1; i >= 0; i--) {
            if (layout.board.layouts[i] === layout) {
                layout.board.layouts.splice(i, 1);
            }
        }
        if (layout.parentCell) {
            delete layout.parentCell.nestedLayout;
        }
        // Destroy rows.
        for (let i = layout.rows.length - 1; i >= 0; i--) {
            layout.rows[i].destroy();
        }
        if (layout.parentCell) {
            layout.parentCell.destroy();
        }
        super.destroy();
    }
    // Get row index from the layout.rows array.
    getRowIndex(row) {
        for (let i = 0, iEnd = this.rows.length; i < iEnd; ++i) {
            if (this.rows[i] === row) {
                return i;
            }
        }
    }
    // Add cell to the layout.rows array and move row container.
    mountRow(row, index) {
        const nextRow = this.rows[index], prevRow = this.rows[index - 1];
        if (row.container) {
            if (nextRow && nextRow.container) {
                nextRow.container.parentNode.insertBefore(row.container, nextRow.container);
            }
            else if (prevRow && prevRow.container) {
                prevRow.container.parentNode.insertBefore(row.container, prevRow.container.nextSibling);
            }
            this.rows.splice(index, 0, row);
            row.layout = this;
        }
    }
    // Remove row from the layout.rows array.
    unmountRow(row) {
        const rowIndex = this.getRowIndex(row);
        if (defined(rowIndex)) {
            this.rows.splice(rowIndex, 1);
        }
    }
    getVisibleRows() {
        const rows = [];
        for (let i = 0, iEnd = this.rows.length; i < iEnd; ++i) {
            if (this.rows[i].isVisible) {
                rows.push(this.rows[i]);
            }
        }
        return rows;
    }
    changeVisibility(setVisible = true) {
        const layout = this;
        super.changeVisibility(setVisible);
        // Change parentCell visibility.
        if (layout.parentCell) {
            if (layout.isVisible && !layout.parentCell.isVisible) {
                layout.parentCell.show();
            }
            else if (!layout.isVisible && layout.parentCell.isVisible) {
                layout.parentCell.hide();
            }
        }
    }
    /**
     * Get the layout's options.
     * @returns
     * Layout's options.
     *
     * @internal
     *
     */
    getOptions() {
        const layout = this, rows = [];
        // Get rows JSON.
        for (let i = 0, iEnd = layout.rows.length; i < iEnd; ++i) {
            rows.push(layout.rows[i].getOptions());
        }
        return {
            id: this.options.id,
            layoutClassName: this.options.layoutClassName,
            rowClassName: this.options.rowClassName,
            cellClassName: this.options.cellClassName,
            style: this.options.style,
            rows
        };
    }
}
/* harmony default export */ const Layout_Layout = (Layout);

;// ./code/dashboards/es-modules/Dashboards/EditMode/SidebarPopup.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  Paweł Lysy
 *
 * */












/* *
 *
 *  Class
 *
 * */
/**
 * Class which creates the sidebar and handles its behavior.
 *
 * @internal
 */
class SidebarPopup extends Shared_BaseForm {
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructor of the SidebarPopup class.
     *
     * @param parentDiv
     * Element to which the sidebar will be appended.
     *
     * @param iconsURL
     * URL to the icons.
     *
     * @param editMode
     * Instance of EditMode.
     */
    constructor(parentDiv, iconsURL, editMode) {
        super(parentDiv, iconsURL);
        /**
         * Options used in the sidebar.
         */
        this.options = {
            components: ['HTML', 'row', 'Highcharts', 'Grid', 'KPI']
        };
        /**
         * Whether the sidebar is visible.
         */
        this.isVisible = false;
        /**
         * List of components that can be added to the board.
         */
        this.componentsList = [];
        this.editMode = editMode;
        this.options = merge(this.options, editMode.options.toolbars?.sidebar || {});
        this.componentsList = this.getComponentsList(this.options.components || []);
        this.accordionMenu = new EditMode_AccordionMenu(this.iconsURL, this.hide.bind(this));
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Function to detect on which side of the screen should the sidebar be.
     *
     * @param context
     * The cell or row which is the context of the sidebar.
     *
     * @returns
     * Whether the sidebar should be on the right side of the screen.
     */
    detectRightSidebar(context) {
        const editMode = this.editMode;
        const layoutWrapper = editMode.customHTMLMode ?
            editMode.board.container : editMode.board.layoutsWrapper;
        if (!layoutWrapper) {
            return false;
        }
        return Layout_GUIElement.getOffsets(context, layoutWrapper).left < ((layoutWrapper.offsetWidth / 2) - 10); // 10 = snap
    }
    /**
     * Function to remove the class names from the sidebar.
     */
    removeClassNames() {
        const classNames = EditMode_EditGlobals.classNames, classList = this.container.classList;
        classList.remove(classNames.editSidebarShow);
        classList.remove(classNames.editSidebarRightShow);
    }
    /**
     * Function to add the class names to the sidebar depending on the position
     * of the sidebar.
     *
     * @param isRightSidebar
     * Whether the sidebar should be on the right side of the screen.
     */
    addClassNames(isRightSidebar) {
        const classList = this.container.classList;
        if (isRightSidebar) {
            classList.add(EditMode_EditGlobals.classNames.editSidebarRight);
        }
        else {
            classList.remove(EditMode_EditGlobals.classNames.editSidebarRight);
        }
        setTimeout(() => {
            classList.add(EditMode_EditGlobals.classNames[isRightSidebar ? 'editSidebarRightShow' : 'editSidebarShow']);
        });
    }
    /**
     * Function to show the sidebar.
     *
     * @param context
     * The cell or row which is the context of the sidebar.
     */
    show(context) {
        const editMode = this.editMode, isRightSidebar = !!(context && this.detectRightSidebar(context));
        this.showPopup(EditMode_EditGlobals.classNames.editSidebarShow);
        this.addClassNames(isRightSidebar);
        if (editMode.resizer) {
            editMode.resizer.disableResizer();
        }
        // Remove highlight from the row.
        if (isCell(editMode.editCellContext) &&
            editMode.editCellContext.row) {
            editMode.editCellContext.row.setHighlight();
        }
        editMode.hideToolbars(['cell', 'row']);
        editMode.stopContextDetection();
        this.isVisible = true;
        this.generateContent(context);
    }
    generateContent(context) {
        // Reset
        this.container.innerHTML = (dashboards_AST_commonjs_dashboards_AST_commonjs2_dashboards_AST_root_Dashboards_AST_default()).emptyHTML;
        // Title
        this.renderHeader(context ?
            this.editMode.lang.settings :
            this.editMode.lang.addComponent, '');
        // Render content wrapper
        this.sidebarWrapper = createElement('div', {
            className: EditMode_EditGlobals.classNames.editSidebarWrapper
        }, void 0, this.container);
        if (!context) {
            this.renderAddComponentsList();
            return;
        }
        this.type = context.getType();
        if (this.type === 'cell-html' || this.type === 'cell') {
            const component = context.mountedComponent;
            if (!component) {
                return;
            }
            this.accordionMenu.renderContent(this.sidebarWrapper, component, this.container);
        }
    }
    renderAddComponentsList() {
        const sidebar = this;
        const components = this.componentsList;
        let gridElement;
        const gridWrapper = createElement('div', {
            className: EditMode_EditGlobals.classNames.editGridItems
        }, {}, sidebar.sidebarWrapper);
        for (let i = 0, iEnd = components.length; i < iEnd; ++i) {
            gridElement = createElement('div', {}, {}, gridWrapper);
            // Drag drop new component.
            gridElement.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const dragDrop = sidebar.editMode.dragDrop;
                if (dragDrop) {
                    // Workaround for Firefox, where mouseleave is not triggered
                    // correctly when dragging.
                    const onMouseMove = (event) => {
                        const rect = sidebar.container.getBoundingClientRect();
                        if (event.clientX < rect.left ||
                            event.clientX > rect.right ||
                            event.clientY < rect.top ||
                            event.clientY > rect.bottom) {
                            sidebar.hide();
                            document.removeEventListener('mousemove', onMouseMove);
                        }
                    };
                    // Clean up event listeners
                    const onMouseUp = () => {
                        document.removeEventListener('mousemove', onMouseMove);
                        document.removeEventListener('mouseup', onMouseUp);
                    };
                    // Add event listeners
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                    dragDrop.onDragStart(e, void 0, (dropContext) => {
                        // Add component if there is no layout yet.
                        if (this.editMode.board.layouts.length === 0) {
                            const board = this.editMode.board, newLayoutId = Layout_GUIElement.getElementId('layout'), layout = new Layout_Layout(board, {
                                id: newLayoutId,
                                copyId: '',
                                parentContainerId: board.container.id,
                                rows: [{}],
                                style: {}
                            });
                            if (layout) {
                                board.layouts.push(layout);
                            }
                            dropContext = layout.rows[0];
                        }
                        if (!dropContext?.type) {
                            const layouts = sidebar.editMode.board.layouts;
                            dragDrop.dropContext = dropContext =
                                layouts[layouts.length - 1].addRow({}, void 0);
                        }
                        const newCell = components[i].onDrop(sidebar, dropContext);
                        /* eslint-disable max-len */
                        const unbindLayoutChanged = addEvent(this.editMode, 'layoutChanged', (e) => {
                            if (newCell && e.type === 'newComponent') {
                                const chart = newCell.mountedComponent?.chart;
                                const settingsEnabled = this.editMode.options.settings?.enabled;
                                if (chart?.isDirtyBox) {
                                    const unbind = addEvent(chart, 'render', () => {
                                        sidebar.editMode.setEditCellContext(newCell);
                                        if (settingsEnabled) {
                                            sidebar.show(newCell);
                                            newCell.setHighlight();
                                        }
                                        unbind();
                                        unbindLayoutChanged();
                                    });
                                }
                                else {
                                    sidebar.editMode.setEditCellContext(newCell);
                                    if (settingsEnabled) {
                                        sidebar.show(newCell);
                                        newCell.setHighlight();
                                    }
                                    unbindLayoutChanged();
                                }
                            }
                        });
                        /* eslint-enable max-len */
                        // Clean up event listener after drop is complete
                        document.removeEventListener('mousemove', onMouseMove);
                    });
                }
            });
            gridElement.innerHTML = components[i].text;
        }
        return;
    }
    onDropNewComponent(dropContext, componentOptions) {
        const sidebar = this, dragDrop = sidebar.editMode.dragDrop;
        if (!dragDrop) {
            return;
        }
        const row = (dropContext.getType() === 'cell' ?
            dropContext.row :
            dropContext), newCell = row.addCell({
            id: Layout_GUIElement.getElementId('col')
        });
        dragDrop.onCellDragEnd(newCell);
        const options = merge(componentOptions, {
            renderTo: newCell.id
        });
        const componentPromise = Actions_Bindings.addComponent(options, sidebar.editMode.board, newCell);
        sidebar.editMode.setEditOverlay(!this.editMode.options.settings?.enabled);
        void (async () => {
            const component = await componentPromise;
            if (!component) {
                return;
            }
            fireEvent(this.editMode, 'layoutChanged', {
                type: 'newComponent',
                target: component
            });
        })();
        return newCell;
    }
    /**
     * Function to hide the sidebar.
     */
    hide() {
        const editMode = this.editMode;
        const editCellContext = editMode.editCellContext;
        this.removeClassNames();
        this.container.style.display = 'none';
        // Remove edit overlay if active.
        if (editMode.isEditOverlayActive) {
            editMode.setEditOverlay(true);
        }
        if (isCell(editCellContext) && editCellContext.row) {
            editMode.showToolbars(['cell', 'row'], editCellContext);
            editCellContext.row.setHighlight(true);
            editCellContext.setHighlight(true);
            if (editMode.resizer) {
                editMode.resizer.setSnapPositions(editMode.editCellContext);
            }
        }
        else if (isCellHTML(editCellContext) && editMode.cellToolbar) {
            editMode.cellToolbar.showToolbar(editCellContext);
            editCellContext.setHighlight();
        }
        editMode.isContextDetectionActive = true;
        this.isVisible = false;
    }
    /**
     * Function called when the close button is pressed.
     *
     * @override BaseForm.closeButtonEvents
     */
    closeButtonEvents() {
        if (this.type === 'cell' || this.type === 'cell-html') {
            this.accordionMenu.cancelChanges();
        }
        else {
            this.hide();
        }
    }
    renderHeader(title, iconURL) {
        if (!this.container) {
            return;
        }
        const headerWrapper = createElement('div', {
            className: EditMode_EditGlobals.classNames.editSidebarHeader
        }, {}, this.container);
        this.container.appendChild(headerWrapper);
        this.headerWrapper = headerWrapper;
        const icon = EditMode_EditRenderer.renderIcon(this.headerWrapper, {
            icon: iconURL,
            className: EditMode_EditGlobals.classNames.editSidebarTitle
        });
        if (icon) {
            icon.textContent = title;
        }
        this.headerWrapper?.appendChild(this.closeButton);
    }
    /**
     * Based on the provided components list, it returns the list of components
     * with its names and functions that are called when the component is
     * dropped.
     *
     * @param components
     * List of components that can be added to the board.
     */
    getComponentsList(components) {
        const sidebar = this, editMode = sidebar.editMode, componentTypes = editMode.board.componentTypes, componentList = [];
        components.forEach((componentName) => {
            const component = componentTypes[componentName];
            if (component) {
                componentList.push({
                    text: editMode.lang?.sidebar[componentName] ||
                        component.name,
                    onDrop: function (sidebar, dropContext) {
                        const options = component.prototype.getOptionsOnDrop(sidebar);
                        if (options) {
                            return sidebar.onDropNewComponent(dropContext, options);
                        }
                    }
                });
            }
            else if (componentName === 'row') {
                componentList.push({
                    ...SidebarPopup.addRow,
                    text: editMode.lang?.sidebar[componentName] ||
                        SidebarPopup.addRow.text
                });
            }
        });
        return componentList;
    }
    /**
     * Function to create and add the close button to the sidebar.
     *
     * @param className
     * Class name of the close button.
     * @returns Close button element
     */
    addCloseButton(className = EditMode_EditGlobals.classNames.popupCloseButton) {
        // Close popup when click outside the popup
        addEvent(document, 'click', (event) => {
            event.stopPropagation();
            if (this.container.style.display === 'block' &&
                !this.container.contains(event.target) &&
                this.container.classList.value.includes('show')) {
                if (this.type === 'cell' || this.type === 'cell-html') {
                    this.accordionMenu.cancelChanges();
                }
                else {
                    this.hide();
                }
            }
        });
        return super.addCloseButton.call(this, className);
    }
    /**
     * Function that creates the container of the sidebar.
     *
     * @param parentDiv
     * The parent div to which the sidebar will be appended.
     * @param className
     * Class name of the sidebar.
     * @returns The container of the sidebar.
     */
    createPopupContainer(parentDiv, className = EditMode_EditGlobals.classNames.editSidebar) {
        return super.createPopupContainer.call(this, parentDiv, className);
    }
}
SidebarPopup.addRow = {
    text: EditMode_EditGlobals.lang.sidebar.row,
    onDrop: function (sidebar, dropContext) {
        if (!dropContext) {
            return;
        }
        const isCellType = dropContext.getType() === 'cell', row = isCellType ? dropContext.row :
            dropContext, board = row.layout.board, cellId = Layout_GUIElement.getElementId('cell');
        if (isCellType) {
            const newLayoutId = Layout_GUIElement.getElementId('layout');
            const layout = new Layout_Layout(board, {
                id: newLayoutId,
                copyId: '',
                parentContainerId: board.container.id,
                rows: [{
                        cells: [{
                                id: cellId
                            }]
                    }],
                style: {}
            });
            board.layouts.push(layout);
            fireEvent(board.editMode, 'layoutChanged', {
                type: 'newLayout',
                target: layout,
                board
            });
        }
        else {
            dropContext.layout.rows[0].addCell({
                id: cellId
            });
        }
        void Actions_Bindings.addComponent({
            type: 'HTML',
            renderTo: cellId,
            className: 'highcharts-dashboards-component-placeholder',
            html: `
                    <h2> Placeholder </h2>
                    <span> This placeholder can be deleted when you add extra
                        components to this row.
                    </span>
                    `
        }, board);
    }
};
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const EditMode_SidebarPopup = (SidebarPopup);

;// ./code/dashboards/es-modules/Dashboards/EditMode/EditContextMenu.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */



/**
 * Class to create context menu.
 * @internal
 */
class EditContextMenu extends Menu_Menu {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(parentElement, options, editMode) {
        super(editMode.board.container, merge(EditContextMenu.defaultOptions, options || {}), editMode);
        this.editMode = editMode;
        this.options = merge(EditContextMenu.defaultOptions, options || {});
        // Move it in the DOM after the edit tools so it is better accessible.
        this.editMode.board.layoutsWrapper?.parentNode.insertBefore(this.container, this.editMode.board.layoutsWrapper);
        // Set the context menu container width.
        this.container.style.width = this.options.width + 'px';
        super.initItems(EditContextMenu.items);
        if (this.options.items) {
            const items = [];
            for (let i = 0, iEnd = this.options.items.length; i < iEnd; ++i) {
                if (typeof this.options.items[i] === 'string') {
                    items.push(this.options.items[i]);
                }
                else if (this.options.items[i].id) {
                    items.push(this.options.items[i].id);
                }
            }
            this.setActiveItems(items);
        }
        this.initEvents();
    }
    /* *
    *
    *  Functions
    *
    * */
    initEvents() {
        const contextMenu = this;
        // Click on document close the context menu
        // TODO refactor
        addEvent(document, 'click', (event) => {
            if (event.target !== this.container &&
                event.target !==
                    contextMenu.editMode.tools.contextButtonElement &&
                !event.target.classList
                    .contains(EditMode_EditGlobals.classNames.toggleSlider) &&
                event.target.tagName !== 'INPUT' &&
                this.isVisible) {
                this.setVisible(false);
            }
        });
    }
    setVisible(visible) {
        const contextMenu = this, contextButtonElement = contextMenu.editMode.tools.contextButtonElement;
        if (contextMenu.container && contextButtonElement) {
            if (visible) {
                contextMenu.container.style.display = 'block';
                contextMenu.isVisible = true;
                contextButtonElement.setAttribute('aria-expanded', 'true');
            }
            else {
                contextMenu.container.style.display = 'none';
                contextMenu.isVisible = false;
                contextButtonElement.setAttribute('aria-expanded', 'false');
            }
        }
        // Set editMode toggle state
        const toggleEditMode = this.activeItems.find((item) => item.options.langKey === 'editMode');
        if (toggleEditMode) {
            toggleEditMode.options.setValue(toggleEditMode, this.editMode.isActive());
        }
    }
    updatePosition(ctxButton, x, y) {
        const contextMenu = this, width = contextMenu.options.width || 0, left = (ctxButton ?
            ctxButton.offsetLeft - width + ctxButton.offsetWidth :
            x), top = ctxButton ? ctxButton.offsetTop + ctxButton.offsetHeight : y;
        if (left && top) {
            contextMenu.container.style.left = left + 'px';
            contextMenu.container.style.top = top + 'px';
        }
    }
}
/* *
*
*  Static Properties
*
* */
EditContextMenu.defaultOptions = {
    enabled: true,
    width: 150,
    className: EditMode_EditGlobals.classNames.contextMenu,
    itemsClassName: EditMode_EditGlobals.classNames.contextMenuItem,
    items: ['editMode']
};
/**
 * Default Context menu items.
 */
EditContextMenu.items = merge(Menu_Menu.items, {
    editMode: {
        id: 'editMode',
        type: 'toggle',
        getValue: function (item) {
            return item.menu.editMode.isActive();
        },
        setValue: function (item, value) {
            const inputElem = item.innerElement?.querySelector('input');
            if (inputElem) {
                inputElem.checked = value;
            }
        },
        langKey: 'editMode',
        events: {
            click: function () {
                this.menu.editMode.toggleEditMode();
            }
        }
    }
});
/* harmony default export */ const EditMode_EditContextMenu = (EditContextMenu);

;// ./code/dashboards/es-modules/Dashboards/Actions/ContextDetection.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */


class ContextDetection {
    static isGUIElementOnParentEdge(mouseContext, side) {
        const visibleElements = (side === 'top' || side === 'bottom') ?
            mouseContext.row.layout.getVisibleRows() :
            (side === 'left' || side === 'right') ?
                mouseContext.row.getVisibleCells() :
                [];
        const lastElementIndex = (visibleElements.length - 1);
        return ((visibleElements[lastElementIndex] === mouseContext &&
            side === 'right') ||
            (visibleElements[lastElementIndex] === mouseContext.row &&
                side === 'bottom') ||
            (visibleElements[0] === mouseContext && side === 'left') ||
            (visibleElements[0] === mouseContext.row && side === 'top'));
    }
    static getContextLevel(mouseContext, offset, sideOffset, side) {
        // Array of overlapped levels.
        const overlappedLevels = mouseContext.getOverlappingLevels(side, offset / 2);
        // Divide offset to level sections (eg 3 nested layouts -
        // cell edge will have 3 sections each 1/3 offset width).
        const divOffset = offset / overlappedLevels.length;
        // Overlapped nested layout level.
        const lastOverlappedLevel = overlappedLevels[overlappedLevels.length - 1];
        let level = mouseContext.row.layout.level - Math.floor(sideOffset / divOffset);
        level = level < lastOverlappedLevel ? lastOverlappedLevel : (level > mouseContext.row.layout.level ?
            mouseContext.row.layout.level : level);
        return level;
    }
    static getContext(mouseCellContext, e, offset) {
        let sideOffset;
        // Get cell offsets, width, height
        const mouseCellContextOffsets = Layout_GUIElement.getOffsets(mouseCellContext);
        const { width, height } = Layout_GUIElement.getDimFromOffsets(mouseCellContextOffsets);
        // Correct offset when element to small.
        if (width < 2 * offset) {
            offset = width / 2;
        }
        // Get mouse position relative to the mouseContext sides.
        const leftSideX = e.clientX - mouseCellContextOffsets.left;
        const topSideY = e.clientY - mouseCellContextOffsets.top;
        // Get cell side - right, left, top, bottom
        let side = 'bottom';
        if (leftSideX >= -offset && leftSideX <= offset) {
            side = 'left';
        }
        else if (leftSideX - width >= -offset && leftSideX - width <= offset) {
            side = 'right';
        }
        else if (topSideY >= -offset && topSideY <= offset) {
            side = 'top';
        }
        else if (topSideY - height >= -offset && topSideY - height <= offset) {
            side = 'bottom';
        }
        switch (side) {
            case 'right':
                sideOffset = leftSideX - width + offset;
                break;
            case 'left':
                sideOffset = offset - leftSideX;
                break;
            case 'top':
                sideOffset = offset - topSideY;
                break;
            case 'bottom':
                sideOffset = topSideY - height + offset;
                break;
        }
        const context = {
            cell: mouseCellContext,
            side: side
        };
        // Nested layouts.
        if (mouseCellContext.row?.layout.level &&
            side &&
            ContextDetection.isGUIElementOnParentEdge(mouseCellContext, side) &&
            defined(sideOffset)) {
            const level = ContextDetection.getContextLevel(mouseCellContext, offset, sideOffset, side);
            const cell = mouseCellContext.getParentCell(level);
            if (cell) {
                context.cell = cell;
            }
        }
        return context;
    }
}
/* harmony default export */ const Actions_ContextDetection = (ContextDetection);

;// ./code/dashboards/es-modules/Dashboards/Actions/DragDrop.js





/**
 * Class providing a drag and drop functionality.
 * @internal
 */
class DragDrop {
    /* *
     *
     *  Constructors
     *
     * */
    /**
     * Constructor for the DragDrop class.
     * @internal
     *
     * @param {EditMode} editMode
     * The parent editMode reference.
     *
     * @param {Options} options
     * Options for the DragDrop.
     */
    constructor(editMode, options) {
        this.editMode = editMode;
        this.options = merge(DragDrop.defaultOptions, options);
        this.mockElement = createElement('div', { className: EditMode_EditGlobals.classNames.dragMock }, {}, editMode.board.container);
        this.dropPointer = {
            isVisible: false,
            align: '',
            element: createElement('div', { className: EditMode_EditGlobals.classNames.dropPointer }, {}, editMode.board.container)
        };
        this.isActive = false;
        this.initEvents();
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Method for showing and positioning drop pointer.
     *
     * @param {number} left
     * Drop pointer left position.
     *
     * @param {number} top
     * Drop pointer top position.
     *
     * @param {number} width
     * Drop pointer width.
     *
     * @param {number} height
     * Drop pointer height.
     */
    showDropPointer(left, top, width, height) {
        this.dropPointer.isVisible = true;
        css(this.dropPointer.element, {
            display: 'block',
            left: left + 'px',
            top: top + 'px',
            height: height + 'px',
            width: width + 'px'
        });
    }
    /**
     * Method for hiding drop pointer.
     */
    hideDropPointer() {
        if (this.dropPointer.isVisible) {
            this.dropPointer.isVisible = false;
            this.dropPointer.align = '';
            this.dropPointer.element.style.display = 'none';
        }
    }
    /**
     * Method for positioning drag mock element.
     *
     * @param {PointerEvent} mouseEvent
     * Mouse event.
     */
    setMockElementPosition(mouseEvent) {
        const dragDrop = this, dashBoundingRect = dragDrop.editMode.board.container.getBoundingClientRect(), offset = dragDrop.mockElement.clientWidth / 2, x = mouseEvent.clientX - dashBoundingRect.left - offset, y = mouseEvent.clientY - dashBoundingRect.top - offset;
        css(this.mockElement, { left: x + 'px', top: y + 'px' });
    }
    /**
     * Method for initializing drag drop events.
     */
    initEvents() {
        const dragDrop = this;
        // DragDrop events.
        addEvent(document, 'mousemove', dragDrop.onDrag.bind(dragDrop));
        addEvent(document, 'mouseup', dragDrop.onDragEnd.bind(dragDrop));
    }
    /**
     * General method used on drag start.
     *
     * @param {PointerEvent} e
     * Mouse event.
     *
     * @param {Cell|Row} context
     * Reference to the dragged context.
     *
     * @param {Function} dragEndCallback
     * Callback invoked on drag end.
     */
    onDragStart(e, context, dragEndCallback) {
        this.isActive = true;
        this.editMode.hideToolbars(['cell', 'row']);
        if (this.editMode.resizer) {
            this.editMode.resizer.disableResizer();
        }
        this.setMockElementPosition(e);
        if (context) {
            this.context = context;
            context.hide();
            if (context.getType() === (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).guiElementType.cell) {
                const draggedCell = context;
                // Call cellResize board event.
                fireEvent(this.editMode.board, 'cellResize', { cell: context });
                fireEvent(draggedCell.row, 'cellChange', { cell: context, row: draggedCell.row });
            }
        }
        else if (dragEndCallback) {
            this.dragEndCallback = dragEndCallback;
        }
        css(this.mockElement, {
            cursor: 'grabbing',
            display: 'block'
        });
    }
    /**
     * General method used while dragging.
     *
     * @param {PointerEvent} e
     * Mouse event.
     */
    onDrag(e) {
        const dragDrop = this;
        if (dragDrop.isActive) {
            e.preventDefault();
            dragDrop.setMockElementPosition(e);
            if (dragDrop.context) {
                if (dragDrop.context.getType() ===
                    (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).guiElementType.cell) {
                    dragDrop.onCellDrag(e);
                }
                else if (dragDrop.context.getType() ===
                    (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).guiElementType.row) {
                    dragDrop.onRowDrag(e);
                }
            }
            else if (dragDrop.dragEndCallback) {
                dragDrop.onCellDrag(e);
            }
        }
    }
    /**
     * General method used when drag finish.
     */
    onDragEnd() {
        const dragDrop = this;
        if (dragDrop.isActive) {
            dragDrop.isActive = false;
            css(dragDrop.mockElement, {
                cursor: 'grab',
                display: 'none'
            });
            if (dragDrop.context) {
                if (dragDrop.context.getType() ===
                    (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).guiElementType.cell) {
                    dragDrop.onCellDragEnd();
                }
                else if (dragDrop.context.getType() ===
                    (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).guiElementType.row) {
                    dragDrop.onRowDragEnd();
                }
                dragDrop.context = void 0;
                // Show toolbars and snaps.
                if (dragDrop.editMode.editCellContext) {
                    dragDrop.editMode.showToolbars(['row', 'cell'], dragDrop.editMode.editCellContext);
                    if (dragDrop.editMode.resizer) {
                        dragDrop.editMode.resizer.setSnapPositions(dragDrop.editMode.editCellContext);
                    }
                }
            }
            else if (dragDrop.dragEndCallback) {
                dragDrop.dragEndCallback(dragDrop.dropContext);
                dragDrop.dragEndCallback = void 0;
                dragDrop.hideDropPointer();
            }
        }
    }
    /**
     * Sets appropriate drop context and refresh drop pointer position when
     * row is dragged or cell is dragged as a row.
     *
     * @param {PointerEvent} e
     * Mouse event.
     *
     * @param {ContextDetails} contextDetails
     * Context details (cell, side)
     */
    onRowDrag(e, contextDetails) {
        const dragDrop = this, mouseCellContext = dragDrop.mouseCellContext, dropPointerSize = dragDrop.options.dropPointerSize || 0, offset = dragDrop.options.rowDropOffset || 0;
        let updateDropPointer = false;
        if (mouseCellContext) {
            const context = (contextDetails ||
                Actions_ContextDetection.getContext(mouseCellContext, e, offset));
            const align = context.side;
            if (dragDrop.dropPointer.align !== align ||
                dragDrop.dropContext !== context.cell.row) {
                updateDropPointer = true;
                dragDrop.dropPointer.align = align;
                dragDrop.dropContext = context.cell.row;
            }
            if (align) {
                const dropContextRowOffsets = Layout_GUIElement.getOffsets(dragDrop.dropContext, dragDrop.editMode.board.container);
                const { width, height } = Layout_GUIElement
                    .getDimFromOffsets(dropContextRowOffsets);
                // Update or show drop pointer.
                if (!dragDrop.dropPointer.isVisible || updateDropPointer) {
                    dragDrop.showDropPointer(dropContextRowOffsets.left, dropContextRowOffsets.top + (dragDrop.dropPointer.align === 'bottom' ?
                        height :
                        0) - dropPointerSize / 2, width, dropPointerSize);
                }
            }
            else {
                dragDrop.dropContext = void 0;
                dragDrop.hideDropPointer();
            }
        }
    }
    /**
     * Unmounts dropped row and mounts it in a new position.
     *
     * @fires DragDrop#layoutChanged
     */
    onRowDragEnd() {
        const dragDrop = this, draggedRow = dragDrop.context, dropContext = dragDrop.dropContext;
        if (dragDrop.dropPointer.align) {
            draggedRow.layout.unmountRow(draggedRow);
            // Destroy layout when empty.
            if (draggedRow.layout.rows.length === 0) {
                draggedRow.layout.destroy();
            }
            dropContext.layout.mountRow(draggedRow, (dropContext.layout.getRowIndex(dropContext) || 0) +
                (dragDrop.dropPointer.align === 'bottom' ? 1 : 0));
            // Call cellResize board event.
            if (draggedRow.cells[0]) {
                fireEvent(dragDrop.editMode.board, 'cellResize', { cell: draggedRow.cells[0] });
                fireEvent(draggedRow, 'cellChange', { cell: draggedRow.cells[0], row: draggedRow });
            }
        }
        dragDrop.hideDropPointer();
        draggedRow.show();
        fireEvent(dragDrop.editMode, 'layoutChanged', {
            type: 'rowDragEnd',
            target: draggedRow,
            board: dragDrop.editMode.board
        });
    }
    /**
     * Method used as middleware when cell is dragged.
     * Decides where to pass an event depending on the mouse context.
     *
     * @param {PointerEvent} e
     * Mouse event.
     *
     * @param {ContextDetails} contextDetails
     * Context details (cell, side)
     */
    onCellDrag(e, contextDetails) {
        const dragDrop = this, mouseCellContext = dragDrop.mouseCellContext, offset = dragDrop.options.cellDropOffset || 0;
        if (mouseCellContext || contextDetails) {
            dragDrop.onCellDragCellCtx(e, contextDetails ||
                Actions_ContextDetection.getContext(mouseCellContext, e, offset));
        }
        else if (dragDrop.mouseRowContext) {
            dragDrop.onCellDragRowCtx(e, dragDrop.mouseRowContext);
        }
    }
    /**
     * Sets appropriate drop context and refreshes the drop pointer
     * position when a cell is dragged and a cell context is detected.
     *
     * @param {PointerEvent} e
     * Mouse event.
     *
     * @param {ContextDetails} context
     * Context details (cell, side)
     */
    onCellDragCellCtx(e, context) {
        const dragDrop = this, dropPointerSize = dragDrop.options.dropPointerSize || 0, align = context.side;
        let updateDropPointer = false;
        if (dragDrop.dropPointer.align !== align ||
            dragDrop.dropContext !== context.cell) {
            updateDropPointer = true;
            dragDrop.dropPointer.align = align;
            dragDrop.dropContext = context.cell;
        }
        if (align === 'right' || align === 'left') {
            const dropContextOffsets = Layout_GUIElement.getOffsets(dragDrop.dropContext, dragDrop.editMode.board.container);
            const { width, height } = Layout_GUIElement.getDimFromOffsets(dropContextOffsets);
            // Update or show drop pointer.
            if (!dragDrop.dropPointer.isVisible || updateDropPointer) {
                const rowLevelInfo = dragDrop.dropContext.row.getRowLevelInfo(e.clientY), pointerHeight = (rowLevelInfo ?
                    (rowLevelInfo.rowLevel.bottom -
                        rowLevelInfo.rowLevel.top) :
                    height);
                dragDrop.showDropPointer(dropContextOffsets.left + (align === 'right' ? width : 0) -
                    dropPointerSize / 2, dropContextOffsets.top, dropPointerSize, pointerHeight);
            }
        }
        else if (align === 'top' || align === 'bottom') {
            const dropContextOffsets = Layout_GUIElement.getOffsets(dragDrop.dropContext), rowLevelInfo = dragDrop.dropContext.row
                .getRowLevelInfo(dropContextOffsets.top);
            if (rowLevelInfo &&
                ((rowLevelInfo.index === 0 && align === 'top') ||
                    (rowLevelInfo.index ===
                        rowLevelInfo.rowLevels.length - 1 &&
                        align === 'bottom'))) {
                // Checks if a cell is dragged as a row
                // (only when a cell edge is on a row edge)
                dragDrop.onRowDrag(e, context);
            }
        }
        else {
            dragDrop.dropContext = void 0;
            dragDrop.hideDropPointer();
        }
    }
    /**
     * Sets appropriate drop context and refreshes the drop pointer
     * position when a cell is dragged and a row context is detected.
     *
     * @param {PointerEvent} e
     * Mouse event.
     *
     * @param {Row} mouseRowContext
     * Row context.
     */
    onCellDragRowCtx(e, mouseRowContext) {
        const dragDrop = this, dropPointerSize = dragDrop.options.dropPointerSize || 0, rowOffsets = Layout_GUIElement.getOffsets(mouseRowContext), rowLevelInfo = mouseRowContext.getRowLevelInfo(e.clientY);
        let cell, cellOffsets;
        if (rowLevelInfo) {
            for (let i = 0, iEnd = rowLevelInfo.rowLevel.cells.length; i < iEnd; ++i) {
                cell = rowLevelInfo.rowLevel.cells[i];
                cellOffsets = Layout_GUIElement.getOffsets(cell);
                const { width, height } = Layout_GUIElement
                    .getDimFromOffsets(cellOffsets), dashOffsets = dragDrop.editMode.board.container
                    .getBoundingClientRect(), levelHeight = (rowLevelInfo.rowLevel.bottom -
                    rowLevelInfo.rowLevel.top);
                if (cell.isVisible) {
                    if (height < 0.8 * levelHeight &&
                        cellOffsets.left <= e.clientX &&
                        cellOffsets.right >= e.clientX) {
                        if (cellOffsets.top > e.clientY) {
                            // @ToDo - Mouse above the cell.
                        }
                        else if (cellOffsets.bottom < e.clientY) {
                            // Mouse below the cell.
                            dragDrop.showDropPointer(cellOffsets.left - dashOffsets.left, cellOffsets.top - dashOffsets.top + height, width, levelHeight - height);
                            dragDrop.dropPointer.align = 'nestedBottom';
                            dragDrop.dropContext = cell;
                        }
                        i = iEnd; // Stop the loop
                    }
                    else if ((i === 0 && cellOffsets.left > e.clientX) ||
                        (i === iEnd - 1 && cellOffsets.right < e.clientX)) {
                        if (cellOffsets.left > e.clientX) {
                            // @ToDo - Mouse on the cell left side.
                        }
                        else if (cellOffsets.right < e.clientX) {
                            // Mouse on the cell right side.
                            const pointerWidth = rowOffsets.right - cellOffsets.right;
                            dragDrop.showDropPointer(cellOffsets.left + ((i === 0 && cellOffsets.left > e.clientX) ?
                                0 :
                                width) - dropPointerSize / 2 - dashOffsets.left, cellOffsets.top - dashOffsets.top, pointerWidth > dropPointerSize ?
                                pointerWidth :
                                dropPointerSize, levelHeight || height);
                            dragDrop.dropPointer.align = 'right';
                            dragDrop.dropContext = cell;
                        }
                        i = iEnd; // Stop the loop
                    }
                }
                else if (!cell.isVisible && cell === dragDrop.context) {
                    // Element is not visible.
                    dragDrop.dropContext = void 0;
                    dragDrop.hideDropPointer();
                }
            }
        }
    }
    /**
     * Unmounts dropped cell and mounts it in a new position.
     * When cell is dragged as a row also creates a new row
     * and mounts cell there.
     *
     * @param {Cell} contextCell
     * Cell used as a dragDrop context.
     *
     * @fires DragDrop#layoutChanged
     */
    onCellDragEnd(contextCell) {
        const dragDrop = this, draggedCell = contextCell || dragDrop.context;
        let dropContext = dragDrop.dropContext;
        if (dragDrop.dropPointer.align && dropContext && draggedCell) {
            draggedCell.row.unmountCell(draggedCell);
            // Destroy row when empty.
            if (draggedCell.row.cells.length === 0) {
                draggedCell.row.destroy();
            }
            if ((dragDrop.dropPointer.align === 'top' ||
                dragDrop.dropPointer.align === 'bottom') &&
                dropContext.getType() === (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).guiElementType.row) {
                dropContext = dropContext;
                const newRow = dropContext.layout.addRow({}, void 0, (dropContext.layout.getRowIndex(dropContext) || 0) +
                    (dragDrop.dropPointer.align === 'bottom' ? 1 : 0));
                newRow.mountCell(draggedCell, 0);
            }
            else if (dragDrop.dropPointer.align === 'nestedBottom' &&
                dropContext.getType() === (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).guiElementType.cell) {
                // Create nesting.
                const dropContextCell = dropContext;
                const row = dropContextCell.row;
                const dropContextCellIndex = row.getCellIndex(dropContextCell);
                row.unmountCell(dropContextCell);
                const newCell = row.addCell({
                    id: Layout_GUIElement.getElementId('col-nested'),
                    layout: {
                        rows: [{}, {}]
                    }
                }, void 0, dropContextCellIndex);
                if (newCell.nestedLayout) {
                    newCell.nestedLayout.rows[0].mountCell(dropContextCell);
                    newCell.nestedLayout.rows[1].mountCell(draggedCell);
                }
            }
            else if (dropContext.getType() === (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).guiElementType.cell) {
                dropContext = dropContext;
                dropContext.row.mountCell(draggedCell, (dropContext.row.getCellIndex(dropContext) || 0) +
                    (dragDrop.dropPointer.align === 'right' ? 1 : 0));
            }
        }
        // Call cellResize board event.
        fireEvent(dragDrop.editMode.board, 'cellResize', { cell: draggedCell });
        fireEvent(draggedCell.row, 'cellChange', { cell: draggedCell, row: draggedCell.row });
        dragDrop.hideDropPointer();
        draggedCell.show();
        fireEvent(dragDrop.editMode, 'layoutChanged', {
            type: 'cellDragEnd',
            target: draggedCell,
            board: dragDrop.editMode.board
        });
    }
}
/* *
 *
 *  Static Properties
 *
 * */
DragDrop.defaultOptions = {
    enabled: true,
    rowDropOffset: 30,
    cellDropOffset: 30,
    dropPointerSize: 16
};
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Actions_DragDrop = (DragDrop);

;// ./code/dashboards/es-modules/Dashboards/Actions/Resizer.js



/**
 * Class providing a resizing functionality.
 */
class Resizer {
    /* *
    *
    *  Static Properties
    *
    * */
    /**
     * Creates a new instance of the Resizer class based on JSON.
     * @internal
     */
    static fromJSON(editMode, json) {
        return new Resizer(editMode, json.options);
    }
    /* *
    *
    *  Constructors
    *
    * */
    /**
     * Constructor for the Resizer class.
     *
     * @param {EditMode} editMode
     * The parent editMode reference.
     *
     * @param {Options} options
     * Options for the Resizer.
     */
    constructor(editMode, options) {
        this.editMode = editMode;
        this.options = merge({}, Resizer.defaultOptions, editMode.options.resize, options);
        this.currentCell = void 0;
        this.isX = this.options.type.indexOf('x') > -1;
        this.isY = this.options.type.indexOf('y') > -1;
        this.isActive = false;
        this.startX = 0;
        this.tempSiblingsWidth = [];
        this.addSnaps();
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Add Snap - create snaps and add events.
     *
     */
    addSnaps() {
        const iconsURLPrefix = this.editMode.iconsURLPrefix;
        const snapWidth = this.options.snap.width || 0;
        const snapHeight = this.options.snap.height || 0;
        const dashboardContainer = this.editMode.board.container;
        // Right snap
        this.snapRight = createElement('img', {
            className: EditMode_EditGlobals.classNames.resizeSnap + ' ' +
                EditMode_EditGlobals.classNames.resizeSnapX,
            src: iconsURLPrefix + 'resize-handle.svg'
        }, {
            width: snapWidth + 'px',
            height: snapHeight + 'px',
            left: -9999 + 'px'
        }, dashboardContainer);
        // Bottom snap
        this.snapBottom = createElement('img', {
            className: EditMode_EditGlobals.classNames.resizeSnap + ' ' +
                EditMode_EditGlobals.classNames.resizeSnapY,
            src: iconsURLPrefix + 'resize-handle.svg'
        }, {
            width: snapWidth + 'px',
            height: snapHeight + 'px',
            top: -9999 + 'px',
            left: '0px'
        }, dashboardContainer);
        this.addResizeEvents();
    }
    /**
     * Hide snaps
     *
     */
    disableResizer() {
        this.isActive = false;
        this.currentDimension = void 0;
        this.currentCell = void 0;
        if (this.snapRight) {
            this.snapRight.style.left = '-9999px';
        }
        if (this.snapBottom) {
            this.snapBottom.style.left = '-9999px';
        }
    }
    /**
     * Update snap position.
     *
     * @param cell
     * Cell reference
     */
    setSnapPositions(cell) {
        // Set current cell
        this.currentCell = cell;
        // Set position of snaps
        const cellOffsets = Layout_GUIElement.getOffsets(cell, this.editMode.board.container);
        const left = cellOffsets.left || 0;
        const top = cellOffsets.top || 0;
        const { width, height } = Layout_GUIElement.getDimFromOffsets(cellOffsets);
        const snapWidth = (this.options.snap.width || 0);
        const snapHeight = (this.options.snap.height || 0);
        if (this.snapRight) {
            this.snapRight.style.left = (left + width - snapWidth) + 'px';
            this.snapRight.style.top = top + (height / 2) - (snapHeight / 2) + 'px';
        }
        if (this.snapBottom) {
            this.snapBottom.style.top = (top + height - snapHeight) + 'px';
            this.snapBottom.style.left = (left + (width / 2) - (snapWidth / 2)) + 'px';
        }
    }
    /**
     * Method detects siblings and auto-width applied by flex. The resizer
     * requires static widths for correct calculations, so we need to apply
     * temporary width on siblings.
     */
    setTempWidthSiblings() {
        const currentCell = this.currentCell;
        if (currentCell) {
            const cellOffsets = Layout_GUIElement.getOffsets(currentCell), rowLevelInfo = currentCell.row.getRowLevelInfo(cellOffsets.top), rowLevelCells = (rowLevelInfo && rowLevelInfo.rowLevel.cells) || [];
            let cellContainer, cell;
            for (let i = 0, iEnd = rowLevelCells.length; i < iEnd; ++i) {
                cell = rowLevelCells[i];
                cellContainer = cell.container;
                // Do not convert width on the current cell and next siblings.
                if (cell === currentCell) {
                    break;
                }
                if (cellContainer) {
                    cellContainer.style.flex =
                        '0 0 ' + cellContainer.offsetWidth + 'px';
                    this.tempSiblingsWidth.push(cell);
                }
            }
        }
    }
    /**
     * Revert widths to auto.
     */
    revertSiblingsAutoWidth() {
        const tempSiblingsWidth = this.tempSiblingsWidth;
        let cellContainer, cellResize;
        for (let i = 0, iEnd = tempSiblingsWidth.length; i < iEnd; ++i) {
            cellContainer = tempSiblingsWidth[i].container;
            if (cellContainer) {
                cellContainer.style.flex = '1 1 0%';
                cellResize = tempSiblingsWidth[i];
            }
        }
        this.tempSiblingsWidth = [];
        // Call cellResize dashboard event.
        if (cellResize) {
            fireEvent(this.editMode.board, 'cellResize', {
                cell: cellResize
            });
            fireEvent(cellResize.row, 'cellChange', {
                cell: cellResize,
                row: cellResize.row
            });
        }
    }
    /**
     * Add mouse events to snaps
     *
     */
    addResizeEvents() {
        const resizer = this;
        let mouseDownSnapX, mouseDownSnapY, mouseMoveSnap, mouseUpSnap;
        resizer.mouseDownSnapX = mouseDownSnapX = function (e) {
            resizer.isActive = true;
            resizer.currentDimension = 'x';
            resizer.editMode.hideToolbars(['row', 'cell']);
            resizer.setTempWidthSiblings();
            resizer.startX = e.clientX;
        };
        resizer.mouseDownSnapY = mouseDownSnapY = function () {
            resizer.isActive = true;
            resizer.currentDimension = 'y';
            resizer.editMode.hideToolbars(['row', 'cell']);
        };
        resizer.mouseMoveSnap = mouseMoveSnap = function (e) {
            if (resizer.isActive) {
                resizer.onMouseMove(e);
            }
        };
        resizer.mouseUpSnap = mouseUpSnap = function () {
            if (resizer.isActive) {
                resizer.isActive = false;
                resizer.currentDimension = void 0;
                resizer.revertSiblingsAutoWidth();
                resizer.editMode.showToolbars(['row', 'cell'], resizer.currentCell);
                if (resizer.currentCell) {
                    resizer.setSnapPositions(resizer.currentCell);
                }
            }
        };
        // Add mouse events
        addEvent(this.snapRight, 'mousedown', mouseDownSnapX);
        addEvent(this.snapBottom, 'mousedown', mouseDownSnapY);
        addEvent(document, 'mousemove', mouseMoveSnap);
        addEvent(document, 'mouseup', mouseUpSnap);
        // Touch events
        // addEvent(snapX, 'touchstart', mouseDownSnapX);
        // addEvent(snapY, 'touchstart', mouseDownSnapY);
        // if (!rowContainer.hcEvents.mousemove) {
        //     addEvent(rowContainer, 'touchmove', mouseMoveSnap);
        //     addEvent(rowContainer, 'touchend', mouseUpSnap);
        // }
        const runReflow = () => {
            if (resizer.currentCell) {
                resizer.setSnapPositions(resizer.currentCell);
            }
        };
        if (typeof ResizeObserver === 'function') {
            this.resizeObserver = new ResizeObserver(runReflow);
            this.resizeObserver.observe(resizer.editMode.board.container);
        }
        else {
            const unbind = addEvent(window, 'resize', runReflow);
            addEvent(this, 'destroy', unbind);
        }
    }
    /**
     * General method used on resizing.
     *
     * @param {global.Event} e
     * A mouse event.
     *
     */
    onMouseMove(e) {
        const currentCell = this.currentCell;
        const cellContainer = currentCell && currentCell.container;
        const currentDimension = this.currentDimension;
        if (currentCell &&
            cellContainer &&
            !((currentCell.row.layout.board.editMode || {}).dragDrop || {})
                .isActive) {
            const cellOffsets = Layout_GUIElement.getOffsets(currentCell);
            const { width: parentRowWidth } = Layout_GUIElement.getDimFromOffsets(Layout_GUIElement.getOffsets(currentCell.row));
            // Resize width
            if (currentDimension === 'x') {
                const newWidth = (Math.min(e.clientX - cellOffsets.left, parentRowWidth) /
                    parentRowWidth) *
                    100 +
                    '%';
                currentCell.setSize(newWidth);
                this.startX = e.clientX;
            }
            // Resize height
            if (currentDimension === 'y') {
                currentCell.setSize(void 0, e.clientY - cellOffsets.top);
            }
            // Call cellResize dashboard event.
            fireEvent(this.editMode.board, 'cellResize', {
                cell: currentCell
            });
            fireEvent(currentCell.row, 'cellChange', {
                cell: currentCell,
                row: currentCell.row
            });
            this.setSnapPositions(currentCell);
        }
    }
    /**
     * Destroy resizer
     */
    destroy() {
        const snaps = ['snapRight', 'snapBottom'];
        let snap;
        // Unbind events
        removeEvent(document, 'mousemove');
        removeEvent(document, 'mouseup');
        this.resizeObserver?.unobserve(this.editMode.board.container);
        for (let i = 0, iEnd = snaps.length; i < iEnd; ++i) {
            snap = this[snaps[i]];
            // Unbind event
            removeEvent(snap, 'mousedown');
            // Destroy snap
            snap.remove();
        }
    }
    /**
     * Converts the class instance to a class JSON.
     * @internal
     *
     * @return {JSON}
     * Class JSON of this Resizer instance.
     */
    toJSON() {
        const options = this.options;
        return {
            $class: 'Dashboards.Action.Resizer',
            options: {
                enabled: options.enabled,
                styles: {
                    minWidth: options.styles.minWidth,
                    minHeight: options.styles.minHeight
                },
                type: options.type,
                snap: {
                    width: options.snap.width,
                    height: options.snap.height
                }
            }
        };
    }
}
Resizer.defaultOptions = {
    enabled: true,
    styles: {
        minWidth: 20,
        minHeight: 50
    },
    type: 'xy',
    snap: {
        width: 9,
        height: 17
    }
};
/* harmony default export */ const Actions_Resizer = (Resizer);

;// ./code/dashboards/es-modules/Dashboards/EditMode/EditMode.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */















/* *
 *
 *  Class
 *
 * */
class EditMode {
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Edit mode constructor.
     * @internal
     *
     * @param board
     * Board instance
     *
     * @param options
     * Edit mode options
     */
    constructor(board, options) {
        /* *
        *
        *  Properties
        *
        * */
        /**
         * @internal
         */
        this.active = false;
        /**
         * Whether the board is generated with custom HTML.
         */
        this.customHTMLMode = false;
        /**
         * URL from which the icons will be fetched.
         */
        this.iconsURLPrefix = 'https://code.highcharts.com/dashboards/4.2.0/gfx/dashboards-icons/';
        this.iconsURLPrefix =
            (options && options.iconsURLPrefix) || this.iconsURLPrefix;
        this.options = merge(
        // Default options.
        {
            confirmationPopup: {
                close: {
                    icon: this.iconsURLPrefix + 'close.svg'
                }
            },
            contextMenu: {
                icon: this.iconsURLPrefix + 'menu.svg'
            },
            dragDrop: {
                enabled: true
            },
            viewFullscreen: {
                enabled: true
            },
            enabled: true,
            resize: {
                enabled: true
            },
            settings: {
                enabled: true
            },
            toolbars: {
                cell: {
                    enabled: true
                },
                row: {
                    enabled: true
                }
            },
            tools: {
                addComponentBtn: {
                    enabled: true,
                    icon: this.iconsURLPrefix + 'add.svg'
                }
            }
        }, options || {});
        this.board = board;
        this.lang = merge({}, EditMode_EditGlobals.lang, this.options.lang);
        board.boardWrapper = board.container;
        if (board.guiEnabled) {
            this.initLayout();
        }
        this.isInitialized = false;
        this.isContextDetectionActive = false;
        this.tools = {};
        if (board.editModeEnabled) {
            this.customHTMLMode = !this.board.layoutsWrapper;
            this.contextPointer = {
                isVisible: false,
                element: createElement('div', {
                    className: EditMode_EditGlobals.classNames.contextDetectionPointer
                }, {}, board.container)
            };
            this.createTools();
            this.confirmationPopup = new EditMode_ConfirmationPopup(board.container, this.iconsURLPrefix, this, this.options.confirmationPopup);
            // Create edit overlay.
            this.editOverlay = createElement('div', {
                className: EditMode_EditGlobals.classNames.editOverlay
            }, {}, board.container);
            this.isEditOverlayActive = false;
            board.fullscreen = new (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).win.Dashboards.Fullscreen(board);
            if (this.customHTMLMode) {
                board.container.classList.add((dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNames.boardContainer);
            }
        }
    }
    /* *
    *
    *  Functions
    *
    * */
    /**
     * Event to fire on click of the context button.
     * @internal
     */
    onContextBtnClick() {
        const editMode = this;
        // Toggle context menu visibility.
        if (editMode.tools.contextMenu) {
            if (!editMode.tools.contextMenu.isVisible) {
                editMode.tools.contextMenu
                    .updatePosition(editMode.tools.contextButtonElement);
            }
            editMode.tools.contextMenu.setVisible(!editMode.tools.contextMenu.isVisible);
        }
    }
    /**
     * Activate or deactivate edit mode.
     */
    toggleEditMode() {
        const editMode = this;
        if (editMode.active) {
            editMode.deactivate();
        }
        else {
            editMode.activate();
        }
    }
    /**
     * Init the instance of edit mode.
     * @internal
     */
    init() {
        const editMode = this;
        if (this.options.resize?.enabled && !editMode.customHTMLMode) {
            editMode.resizer = new Actions_Resizer(editMode, editMode.options.resize);
        }
        editMode.dragDrop = new Actions_DragDrop(editMode, editMode.options.dragDrop);
        // Init rowToolbar.
        if (editMode.options.toolbars?.row?.enabled &&
            !editMode.rowToolbar &&
            !editMode.customHTMLMode) {
            editMode.rowToolbar = new Toolbar_RowEditToolbar(editMode);
        }
        // Init cellToolbar.
        if (editMode.options.toolbars?.cell?.enabled && !editMode.cellToolbar) {
            editMode.cellToolbar = new Toolbar_CellEditToolbar(editMode);
        }
        // Init Sidebar.
        if (!editMode.sidebar) {
            editMode.sidebar = new EditMode_SidebarPopup(this.board.container, this.iconsURLPrefix, editMode);
        }
        editMode.isInitialized = true;
    }
    /**
     * Init events for edit mode.
     * @internal
     */
    initEvents() {
        const editMode = this, board = editMode.board;
        if (this.customHTMLMode) {
            const length = board.mountedComponents.length;
            for (let i = 0, iEnd = length; i < iEnd; ++i) {
                editMode.setCellEvents(board.mountedComponents[i].cell);
            }
        }
        else {
            for (let i = 0, iEnd = board.layouts.length; i < iEnd; ++i) {
                editMode.setLayoutEvents(board.layouts[i]);
            }
        }
        addEvent(document, 'keydown', (e) => {
            if (e.key === 'Escape' && editMode.isActive()) {
                editMode.hideToolbars(['cell', 'row']);
                editMode.editCellContext = void 0;
                editMode.resizer?.disableResizer();
            }
        });
        if (editMode.cellToolbar) {
            // Stop context detection when mouse on cell toolbar.
            addEvent(editMode.cellToolbar.container, 'mouseenter', function () {
                editMode.stopContextDetection();
            });
            addEvent(editMode.cellToolbar.container, 'mouseleave', function () {
                editMode.isContextDetectionActive = true;
            });
        }
        if (editMode.rowToolbar) {
            // Stop context detection when mouse on row toolbar.
            addEvent(editMode.rowToolbar.container, 'mouseenter', function () {
                editMode.stopContextDetection();
            });
            addEvent(editMode.rowToolbar.container, 'mouseleave', function () {
                editMode.isContextDetectionActive = true;
            });
        }
        const elementForEvents = this.customHTMLMode ?
            board.container : board.layoutsWrapper;
        addEvent(elementForEvents, 'mousemove', editMode.onDetectContext.bind(editMode));
        addEvent(elementForEvents, 'click', editMode.onContextConfirm.bind(editMode));
        addEvent(elementForEvents, 'mouseleave', () => {
            editMode.hideContextPointer();
        });
    }
    /**
     * Initialize the container for the layouts.
     * @internal
     *
     */
    initLayout() {
        const board = this.board;
        // Clear the container from any content.
        board.container.innerHTML = '';
        // Add container for the board.
        board.container = createElement('div', {
            className: (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNames.boardContainer
        }, {}, board.boardWrapper);
        // Create layouts wrapper.
        board.layoutsWrapper = createElement('div', {
            className: (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNames.layoutsWrapper
        }, {}, board.container);
        if (board.options.gui) {
            this.setLayouts(board.options.gui);
        }
    }
    /**
     * Creates a new layouts and adds it to the dashboard based on the options.
     * @internal
     *
     * @param guiOptions
     * The GUI options for the layout.
     *
     */
    setLayouts(guiOptions) {
        const board = this.board, layoutsOptions = guiOptions.layouts;
        for (let i = 0, iEnd = layoutsOptions.length; i < iEnd; ++i) {
            board.layouts.push(new Layout_Layout(board, merge({}, guiOptions.layoutOptions, layoutsOptions[i])));
        }
    }
    /**
     * Set events for the layout.
     * @internal
     */
    setLayoutEvents(layout) {
        const editMode = this;
        for (let j = 0, jEnd = layout.rows.length; j < jEnd; ++j) {
            const row = layout.rows[j];
            editMode.setRowEvents(row);
            for (let k = 0, kEnd = row.cells.length; k < kEnd; ++k) {
                editMode.setCellEvents(row.cells[k]);
            }
        }
    }
    /**
     * Set events for the row.
     * @internal
     */
    setRowEvents(row) {
        const editMode = this;
        // Init dragDrop row events.
        if (editMode.dragDrop) {
            const dragDrop = editMode.dragDrop;
            addEvent(row.container, 'mouseenter', function () {
                if (editMode.isContextDetectionActive) {
                    editMode.mouseRowContext = row;
                }
            });
            addEvent(row.container, 'mousemove', function (e) {
                if (dragDrop.isActive && e.target === row.container) {
                    dragDrop.mouseRowContext = row;
                }
            });
            addEvent(row.container, 'mouseleave', function () {
                if (dragDrop.isActive && dragDrop.mouseRowContext === row) {
                    dragDrop.mouseRowContext = void 0;
                }
                if (editMode.isContextDetectionActive) {
                    editMode.mouseRowContext = void 0;
                }
            });
        }
    }
    /**
     * Set events for the cell.
     * @internal
     */
    setCellEvents(cell) {
        const editMode = this;
        if (isCellHTML(cell)) {
            addEvent(cell.container, 'mouseenter', function () {
                if (editMode.isContextDetectionActive) {
                    editMode.mouseCellContext = cell;
                }
            });
        }
        else {
            if (cell.nestedLayout) {
                editMode.setLayoutEvents(cell.nestedLayout);
            }
            else if (editMode.cellToolbar && cell.container) {
                addEvent(cell.container, 'mouseenter', function () {
                    if (editMode.isContextDetectionActive) {
                        editMode.mouseCellContext = cell;
                    }
                });
                // Init dragDrop cell events only when using layouts.
                if ((editMode.dragDrop || editMode.resizer)) {
                    const dragDrop = editMode.dragDrop;
                    addEvent(cell.container, 'mousemove', function (e) {
                        if (dragDrop &&
                            dragDrop.isActive &&
                            e.target === cell.container) {
                            dragDrop.mouseCellContext = cell;
                            dragDrop.mouseRowContext = void 0;
                        }
                    });
                    addEvent(cell.container, 'mouseleave', function () {
                        if (dragDrop &&
                            dragDrop.isActive &&
                            dragDrop.mouseCellContext === cell) {
                            dragDrop.mouseCellContext = void 0;
                        }
                        if (editMode.isContextDetectionActive) {
                            editMode.mouseCellContext = void 0;
                        }
                    });
                }
            }
        }
    }
    /**
     * Activate the edit mode.
     * @internal
     */
    activate() {
        const editMode = this;
        // Init edit mode.
        if (!editMode.isInitialized) {
            editMode.init();
            editMode.initEvents();
        }
        // Set edit mode active class to dashboard.
        editMode.board.container.classList.add(EditMode_EditGlobals.classNames.editModeEnabled);
        if (this.addComponentBtn) {
            this.addComponentBtn.style.display = 'block';
        }
        editMode.active = true;
        editMode.isContextDetectionActive = true;
    }
    /**
     * Deactivate the edit mode.
     * @internal
     */
    deactivate() {
        const editMode = this, dashboardCnt = editMode.board.container;
        dashboardCnt.classList.remove(EditMode_EditGlobals.classNames.editModeEnabled);
        // Hide toolbars.
        editMode.hideToolbars();
        // Remove highlight from the context row if exists.
        if (this.editCellContext && isCell(this.editCellContext)) {
            this.editCellContext.row?.setHighlight();
        }
        // TODO all buttons should be deactivated.
        if (this.addComponentBtn) {
            this.addComponentBtn.style.display = 'none';
        }
        if (editMode.resizer) {
            editMode.resizer.disableResizer();
        }
        // Disable responsive width and restore elements to their original
        // positions and sizes.
        if (this.board.layoutsWrapper) {
            this.board.layoutsWrapper.style.width = '100%';
        }
        this.board.reflow();
        editMode.active = false;
        editMode.stopContextDetection();
        this.editCellContext = void 0;
        this.potentialCellContext = void 0;
    }
    /**
     * Function to check whether the edit mode is activated.
     * @internal
     *
     * @returns
     * Whether the edit mode is activated.
     */
    isActive() {
        return this.active;
    }
    /**
     * Method for hiding edit toolbars.
     * @internal
     *
     * @param toolbarTypes
     * The array of toolbar names to hide ('cell', 'row', 'sidebar').
     */
    hideToolbars(toolbarTypes) {
        const editMode = this, toolbarsToHide = toolbarTypes || ['cell', 'row', 'sidebar'];
        for (let i = 0, iEnd = toolbarsToHide.length; i < iEnd; ++i) {
            switch (toolbarsToHide[i]) {
                case 'cell': {
                    if (editMode.cellToolbar &&
                        editMode.cellToolbar.isVisible) {
                        editMode.cellToolbar.hide();
                    }
                    break;
                }
                case 'row': {
                    if (editMode.rowToolbar && editMode.rowToolbar.isVisible) {
                        editMode.rowToolbar.hide();
                    }
                    break;
                }
                case 'sidebar': {
                    if (editMode.sidebar && editMode.sidebar.isVisible) {
                        editMode.sidebar.hide();
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }
    /**
     * Method for hiding edit toolbars.
     * @internal
     *
     * @param toolbarTypes
     * The array of toolbar names to hide ('cell', 'row', 'sidebar').
     *
     * @param currentCell
     * The cell reference for toolbar.
     *
     */
    showToolbars(toolbarTypes, currentCell) {
        const editMode = this, toolbarsToShow = toolbarTypes || ['cell', 'row', 'sidebar'];
        for (let i = 0, iEnd = toolbarsToShow.length; i < iEnd; ++i) {
            switch (toolbarsToShow[i]) {
                case 'cell': {
                    if (currentCell && editMode.cellToolbar) {
                        editMode.cellToolbar.showToolbar(currentCell);
                    }
                    break;
                }
                case 'row': {
                    if (currentCell && currentCell.row && editMode.rowToolbar) {
                        editMode.rowToolbar.showToolbar(currentCell.row);
                    }
                    break;
                }
                case 'sidebar': {
                    if (editMode.sidebar && !editMode.sidebar.isVisible) {
                        editMode.sidebar.show();
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }
    /**
     * Creates the buttons such as `addComponent` button, context menu button
     * and its container.
     * @internal
     */
    createTools() {
        const editMode = this;
        const { board, options, tools } = editMode;
        // Create tools container
        tools.container = document.createElement('div');
        tools.container.classList.add(EditMode_EditGlobals.classNames.editTools);
        if (board.layoutsWrapper) {
            // For the generated layout
            board.layoutsWrapper.parentNode.insertBefore(tools.container, board.layoutsWrapper);
        }
        else {
            // For the custom layout
            board.container.insertBefore(tools.container, board.container.firstChild);
        }
        // Create context a menu button or edit mode toggle
        if (options.contextMenu && options.contextMenu.enabled) {
            if (options.contextMenu.items?.length) {
                tools.contextButtonElement = EditMode_EditRenderer.renderContextButton(tools.container, editMode);
                // Init contextMenu if doesn't exist.
                if (!editMode.tools.contextMenu) {
                    editMode.tools.contextMenu = new EditMode_EditContextMenu(editMode.board.container, editMode.options.contextMenu || {}, editMode);
                }
            }
            else {
                // Render the edit mode toggle when no items are provided
                tools.standaloneEditToggle =
                    EditMode_EditRenderer.renderToggle(tools.container, {
                        id: EditMode_EditContextMenu.items.editMode.id,
                        name: EditMode_EditContextMenu.items.editMode.id,
                        className: EditMode_EditGlobals.classNames.editStandaloneToggle,
                        title: editMode.lang.editMode,
                        value: editMode.isActive(),
                        lang: editMode.lang,
                        langKey: 'editMode',
                        onchange() {
                            editMode.toggleEditMode();
                        }
                    });
            }
        }
        // Create add component button
        if (options.tools?.addComponentBtn?.enabled &&
            options.toolbars?.cell?.enabled &&
            !this.customHTMLMode) {
            const addIconURL = options.tools.addComponentBtn.icon;
            this.addComponentBtn = EditMode_EditRenderer.renderButton(tools.container, {
                className: EditMode_EditGlobals.classNames.editToolsBtn,
                icon: addIconURL,
                text: this.lang.addComponent,
                callback: () => {
                    // Sidebar trigger
                    if (editMode.sidebar) {
                        editMode.sidebar.show();
                        editMode.setEditOverlay();
                    }
                },
                style: {
                    display: 'none'
                }
            });
        }
    }
    /**
     * Event fired when detecting context on drag&drop.
     */
    onDetectContext() {
        const editMode = this;
        if (!editMode.isActive() ||
            !editMode.isContextDetectionActive ||
            (!editMode.mouseCellContext && !editMode.mouseRowContext) ||
            (editMode.dragDrop || {}).isActive) {
            return;
        }
        let cellContext;
        let rowContext;
        if (editMode.mouseCellContext) {
            cellContext = editMode.mouseCellContext;
        }
        else if (editMode.mouseRowContext) {
            rowContext = editMode.mouseRowContext;
            cellContext = rowContext.layout.parentCell;
        }
        this.potentialCellContext = cellContext;
        if (cellContext) {
            const cellContextOffsets = Layout_GUIElement
                .getOffsets(cellContext, editMode.board.container);
            const { width, height } = Layout_GUIElement
                .getDimFromOffsets(cellContextOffsets);
            editMode.showContextPointer(cellContextOffsets.left, cellContextOffsets.top, width, height);
        }
    }
    /**
     * Stops the context detection.
     */
    stopContextDetection() {
        this.isContextDetectionActive = false;
        if (this.dragDrop) {
            this.dragDrop.mouseCellContext = void 0;
        }
        this.mouseCellContext = void 0;
        this.hideContextPointer();
    }
    /**
     * Confirms the selected context.
     */
    onContextConfirm() {
        if (this.isContextDetectionActive &&
            this.potentialCellContext &&
            this.editCellContext !== this.potentialCellContext) {
            this.setEditCellContext(this.potentialCellContext, this.editCellContext);
        }
    }
    /**
     * Sets the edit cell context.
     * @internal
     */
    setEditCellContext(editCellContext, oldEditCellContext) {
        const editMode = this;
        const oldContext = oldEditCellContext;
        if (isCellHTML(editCellContext) ||
            isCellHTML(oldContext)) {
            editMode.editCellContext = editCellContext;
            editMode.cellToolbar?.showToolbar(editCellContext);
        }
        else {
            const oldContextRow = oldContext?.row;
            editMode.editCellContext = editCellContext;
            editMode.showToolbars(['row', 'cell'], editCellContext);
            if (!oldContextRow || oldContextRow !== editCellContext.row) {
                if (oldContextRow) {
                    // Remove highlight from the previous row.
                    oldContextRow.setHighlight(true);
                }
                // Add highlight to the context row.
                if (editCellContext.row) {
                    editCellContext.row.setHighlight();
                }
            }
            if (editMode.resizer) {
                editMode.resizer.setSnapPositions(editCellContext);
            }
        }
    }
    /**
     * Method for showing and positioning context pointer.
     * @internal
     */
    showContextPointer(left, top, width, height) {
        if (!this.contextPointer) {
            return;
        }
        this.contextPointer.isVisible = true;
        css(this.contextPointer.element, {
            display: 'block',
            left: left + 'px',
            top: top + 'px',
            height: height + 'px',
            width: width + 'px'
        });
    }
    /**
     * Method for hiding context pointer.
     * @internal
     */
    hideContextPointer() {
        if (this.contextPointer?.isVisible) {
            this.contextPointer.isVisible = false;
            this.contextPointer.element.style.display = 'none';
        }
    }
    /**
     * Adds/Removes the edit mode overlay.
     * @internal
     *
     * @param remove
     * Whether the edit overlay should be removed.
     */
    setEditOverlay(remove) {
        const editMode = this, cnt = editMode.editOverlay, isSet = cnt?.classList.contains(EditMode_EditGlobals.classNames.editOverlayActive);
        if (!remove && !isSet) {
            cnt?.classList.add(EditMode_EditGlobals.classNames.editOverlayActive);
            editMode.isEditOverlayActive = true;
        }
        else if (remove && isSet) {
            cnt?.classList.remove(EditMode_EditGlobals.classNames.editOverlayActive);
            editMode.isEditOverlayActive = false;
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const EditMode_EditMode = (EditMode);

;// ./code/dashboards/es-modules/Dashboards/EditMode/Fullscreen.js
/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */


class Fullscreen {
    /* *
    *
    *  Constructor
    *
    * */
    constructor(DashboardClass) {
        this.isOpen = false;
        this.board = DashboardClass;
        // Add class to allow scroll element
        this.board.boardWrapper.classList.add((dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default()).classNamePrefix + '-fullscreen');
    }
    /* *
    *
    *  Functions
    *
    * */
    /**
     * Toggles displaying the board in fullscreen mode.
     *
     * @param container
     * The container to be displayed in fullscreen mode.
     */
    toggle(container) {
        const fullscreen = this, isOpen = this.isOpen;
        fullscreen[isOpen ? 'close' : 'open'](container);
    }
    /**
     * Display board in fullscreen.
     */
    open(container) {
        if (this.isOpen) {
            return;
        }
        const fullscreen = this;
        const board = fullscreen.board;
        const elementToFullscreen = container || board.boardWrapper;
        // Handle exitFullscreen() method when user clicks 'Escape' button.
        const unbindChange = addEvent(board.boardWrapper.ownerDocument, // Dashboard's document
        'fullscreenchange', function () {
            if (fullscreen.isOpen) {
                fullscreen.isOpen = false;
                fullscreen.close();
            }
            else {
                fullscreen.isOpen = true;
                fullscreen.setButtonText();
            }
        });
        fullscreen.unbindFullscreenEvent = () => {
            unbindChange();
        };
        const promise = elementToFullscreen.requestFullscreen();
        promise['catch'](() => {
            throw new Error('Full screen is not supported.');
        });
    }
    /**
     * Stops displaying the dashboard in fullscreen mode.
     */
    close() {
        const fullscreen = this;
        const board = fullscreen.board;
        // Don't fire exitFullscreen() when user exited using 'Escape' button.
        if (fullscreen.isOpen &&
            board.boardWrapper.ownerDocument instanceof Document) {
            void board.boardWrapper.ownerDocument.exitFullscreen();
        }
        // Unbind event as it's necessary only before exiting from fullscreen.
        if (fullscreen.unbindFullscreenEvent) {
            fullscreen.unbindFullscreenEvent =
                fullscreen.unbindFullscreenEvent();
        }
        fullscreen.isOpen = false;
        this.setButtonText();
    }
    /**
     * Set the correct text depending of the fullscreen is on or of.
     */
    setButtonText() {
        const editMode = this.board.editMode, contextMenu = editMode && editMode.tools.contextMenu, button = contextMenu && contextMenu.items.viewFullscreen;
        if (button && button.innerElement) {
            const lang = editMode.lang;
            button.innerElement.innerHTML =
                (this.isOpen ? lang.exitFullscreen : lang.viewFullscreen) || '';
        }
    }
}
/* harmony default export */ const EditMode_Fullscreen = (Fullscreen);

;// ./code/dashboards/es-modules/masters/modules/layout.src.js


/* *
 *
 *  Imports
 *
 * */

// Fill registries




/* *
 *
 *  Namespace
 *
 * */
const G = (dashboards_commonjs_dashboards_commonjs2_dashboards_root_Dashboards_default());
G.EditMode = EditMode_EditMode;
G.Fullscreen = EditMode_Fullscreen;
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const layout_src = (G);

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});