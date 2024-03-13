/**
 * @license Highcharts Dashboards v2.0.0 (2024-03-13)
 *
 * (c) 2009-2024 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = (root && root.document) ?
            factory(root) :
            factory;
    } else if (typeof define === 'function' && define.amd) {
        define('datagrid/datagrid', function () {
            return factory(root);
        });
    } else {
        if (root.DataGrid) {
            root.DataGrid.error(16, true);
        }
        root.DataGrid = factory(root);
    }
}(typeof window !== 'undefined' ? window : this, function (window) {
    'use strict';
    var _modules = {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                window.dispatchEvent(new CustomEvent(
                    'DataGridModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Core/Globals.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Namespace
         *
         * */
        /**
         * Shared Highcharts properties.
         * @private
         */
        var Globals;
        (function (Globals) {
            /* *
             *
             *  Constants
             *
             * */
            Globals.SVG_NS = 'http://www.w3.org/2000/svg', Globals.product = 'Highcharts', Globals.version = '2.0.0', Globals.win = (typeof window !== 'undefined' ?
                window :
                {}), // eslint-disable-line node/no-unsupported-features/es-builtins
            Globals.doc = Globals.win.document, Globals.svg = (Globals.doc &&
                Globals.doc.createElementNS &&
                !!Globals.doc.createElementNS(Globals.SVG_NS, 'svg').createSVGRect), Globals.userAgent = (Globals.win.navigator && Globals.win.navigator.userAgent) || '', Globals.isChrome = Globals.userAgent.indexOf('Chrome') !== -1, Globals.isFirefox = Globals.userAgent.indexOf('Firefox') !== -1, Globals.isMS = /(edge|msie|trident)/i.test(Globals.userAgent) && !Globals.win.opera, Globals.isSafari = !Globals.isChrome && Globals.userAgent.indexOf('Safari') !== -1, Globals.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(Globals.userAgent), Globals.isWebKit = Globals.userAgent.indexOf('AppleWebKit') !== -1, Globals.deg2rad = Math.PI * 2 / 360, Globals.hasBidiBug = (Globals.isFirefox &&
                parseInt(Globals.userAgent.split('Firefox/')[1], 10) < 4 // Issue #38
            ), Globals.marginNames = [
                'plotTop',
                'marginRight',
                'marginBottom',
                'plotLeft'
            ], Globals.noop = function () { }, Globals.supportsPassiveEvents = (function () {
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
            /**
             * An array containing the current chart objects in the page. A chart's
             * position in the array is preserved throughout the page's lifetime. When
             * a chart is destroyed, the array item becomes `undefined`.
             *
             * @name Highcharts.charts
             * @type {Array<Highcharts.Chart|undefined>}
             */
            Globals.charts = [];
            /**
             * A shared registry between all bundles to keep track of applied
             * compositions.
             * @private
             */
            Globals.composed = [];
            /**
             * A hook for defining additional date format specifiers. New
             * specifiers are defined as key-value pairs by using the
             * specifier as key, and a function which takes the timestamp as
             * value. This function returns the formatted portion of the
             * date.
             *
             * @sample highcharts/global/dateformats/
             *         Adding support for week number
             *
             * @name Highcharts.dateFormats
             * @type {Record<string, Highcharts.TimeFormatCallbackFunction>}
             */
            Globals.dateFormats = {};
            /**
             * @private
             * @deprecated
             * @todo Use only `Core/Series/SeriesRegistry.seriesTypes`
             */
            Globals.seriesTypes = {};
            /**
             * @private
             */
            Globals.symbolSizes = {};
            /* *
             *
             *  Properties
             *
             * */
            // eslint-disable-next-line prefer-const
            Globals.chartCount = 0;
        })(Globals || (Globals = {}));
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * Theme options that should get applied to the chart. In module mode it
         * might not be possible to change this property because of read-only
         * restrictions, instead use {@link Highcharts.setOptions}.
         *
         * @deprecated
         * @name Highcharts.theme
         * @type {Highcharts.Options}
         */
        (''); // Keeps doclets above in JS file

        return Globals;
    });
    _registerModule(_modules, 'Core/Utilities.js', [_modules['Core/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { charts, doc, win } = H;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Provide error messages for debugging, with links to online explanation. This
         * function can be overridden to provide custom error handling.
         *
         * @sample highcharts/chart/highcharts-error/
         *         Custom error handler
         *
         * @function Highcharts.error
         *
         * @param {number|string} code
         *        The error code. See
         *        [errors.xml](https://github.com/highcharts/highcharts/blob/master/errors/errors.xml)
         *        for available codes. If it is a string, the error message is printed
         *        directly in the console.
         *
         * @param {boolean} [stop=false]
         *        Whether to throw an error or just log a warning in the console.
         *
         * @param {Highcharts.Chart} [chart]
         *        Reference to the chart that causes the error. Used in 'debugger'
         *        module to display errors directly on the chart.
         *        Important note: This argument is undefined for errors that lack
         *        access to the Chart instance. In such case, the error will be
         *        displayed on the last created chart.
         *
         * @param {Highcharts.Dictionary<string>} [params]
         *        Additional parameters for the generated message.
         *
         * @return {void}
         */
        function error(code, stop, chart, params) {
            const severity = stop ? 'Highcharts error' : 'Highcharts warning';
            if (code === 32) {
                code = `${severity}: Deprecated member`;
            }
            const isCode = isNumber(code);
            let message = isCode ?
                `${severity} #${code}: www.highcharts.com/errors/${code}/` :
                code.toString();
            const defaultHandler = function () {
                if (stop) {
                    throw new Error(message);
                }
                // Else ...
                if (win.console &&
                    error.messages.indexOf(message) === -1 // Prevent console flooting
                ) {
                    console.warn(message); // eslint-disable-line no-console
                }
            };
            if (typeof params !== 'undefined') {
                let additionalMessages = '';
                if (isCode) {
                    message += '?';
                }
                objectEach(params, function (value, key) {
                    additionalMessages += `\n - ${key}: ${value}`;
                    if (isCode) {
                        message += encodeURI(key) + '=' + encodeURI(value);
                    }
                });
                message += additionalMessages;
            }
            fireEvent(H, 'displayError', { chart, code, message, params }, defaultHandler);
            error.messages.push(message);
        }
        (function (error) {
            error.messages = [];
        })(error || (error = {}));
        /* eslint-disable valid-jsdoc */
        /**
         * Utility function to deep merge two or more objects and return a third object.
         * If the first argument is true, the contents of the second object is copied
         * into the first object. The merge function can also be used with a single
         * object argument to create a deep copy of an object.
         *
         * @function Highcharts.merge<T>
         *
         * @param {boolean} extend
         *        Whether to extend the left-side object (a) or return a whole new
         *        object.
         *
         * @param {T|undefined} a
         *        The first object to extend. When only this is given, the function
         *        returns a deep copy.
         *
         * @param {...Array<object|undefined>} [n]
         *        An object to merge into the previous one.
         *
         * @return {T}
         *         The merged object. If the first argument is true, the return is the
         *         same as the second argument.
         */ /**
        * Utility function to deep merge two or more objects and return a third object.
        * The merge function can also be used with a single object argument to create a
        * deep copy of an object.
        *
        * @function Highcharts.merge<T>
        *
        * @param {T|undefined} a
        *        The first object to extend. When only this is given, the function
        *        returns a deep copy.
        *
        * @param {...Array<object|undefined>} [n]
        *        An object to merge into the previous one.
        *
        * @return {T}
        *         The merged object. If the first argument is true, the return is the
        *         same as the second argument.
        */
        function merge() {
            /* eslint-enable valid-jsdoc */
            let i, args = arguments, ret = {};
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
            if (args[0] === true) {
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
         * Constrain a value to within a lower and upper threshold.
         *
         * @private
         * @param {number} value The initial value
         * @param {number} min The lower threshold
         * @param {number} max The upper threshold
         * @return {number} Returns a number value within min and max.
         */
        function clamp(value, min, max) {
            return value > min ? value < max ? value : max : min;
        }
        // eslint-disable-next-line valid-jsdoc
        /**
         * Return the deep difference between two objects. It can either return the new
         * properties, or optionally return the old values of new properties.
         * @private
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
         * Shortcut for parseInt
         *
         * @private
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
            const c = obj && obj.constructor;
            return !!(isObject(obj, true) &&
                !isDOMElement(obj) &&
                (c && c.name && c.name !== 'Object'));
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
         * Remove the last occurence of an item from an array.
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
         * Insert a series or an axis in a collection with other items, either the
         * chart series or yAxis series or axis collections, in the correct order
         * according to the index option and whether it is internal. Used internally
         * when adding series and axes.
         *
         * @private
         * @function Highcharts.Chart#insertItem
         * @param  {Highcharts.Series|Highcharts.Axis} item
         *         The item to insert
         * @param  {Array<Highcharts.Series>|Array<Highcharts.Axis>} collection
         *         A collection of items, like `chart.series` or `xAxis.series`.
         * @return {number} The index of the series in the collection.
         */
        function insertItem(item, collection) {
            const indexOption = item.options.index, length = collection.length;
            let i;
            for (
            // Internal item (navigator) should always be pushed to the end
            i = item.options.isInternal ? length : 0; i < length + 1; i++) {
                if (
                // No index option, reached the end of the collection,
                // equivalent to pushing
                !collection[i] ||
                    // Handle index option, the element to insert has lower index
                    (isNumber(indexOption) &&
                        indexOption < pick(collection[i].options.index, collection[i]._i)) ||
                    // Insert the new item before other internal items
                    // (navigator)
                    collection[i].options.isInternal) {
                    collection.splice(i, 0, item);
                    break;
                }
            }
            return i;
        }
        /**
         * Adds an item to an array, if it is not present in the array.
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
         * Internal clear timeout. The function checks that the `id` was not removed
         * (e.g. by `chart.destroy()`). For the details see
         * [issue #7901](https://github.com/highcharts/highcharts/issues/7901).
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
        /* eslint-disable valid-jsdoc */
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
            /* eslint-enable valid-jsdoc */
            let n;
            if (!a) {
                a = {};
            }
            for (n in b) { // eslint-disable-line guard-for-in
                a[n] = b[n];
            }
            return a;
        }
        /* eslint-disable valid-jsdoc */
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
         * Sort an object array and keep the order of equal items. The ECMAScript
         * standard does not specify the behaviour when items are equal.
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
            if (element && element.parentElement) {
                element.parentElement.removeChild(element);
            }
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
         * The time unit lookup
         *
         * @ignore
         */
        const timeUnits = {
            millisecond: 1,
            second: 1000,
            minute: 60000,
            hour: 3600000,
            day: 24 * 3600000,
            week: 7 * 24 * 3600000,
            month: 28 * 24 * 3600000,
            year: 364 * 24 * 3600000
        };
        /**
         * Easing definition
         *
         * @private
         * @function Math.easeInOutSine
         *
         * @param {number} pos
         *        Current position, ranging from 0 to 1.
         *
         * @return {number}
         *         Ease result
         */
        Math.easeInOutSine = function (pos) {
            return -0.5 * (Math.cos(Math.PI * pos) - 1);
        };
        /**
         * Find the closest distance between two values of a two-dimensional array
         * @private
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
         * Returns the value of a property path on a given object.
         *
         * @private
         * @function getNestedProperty
         *
         * @param {string} path
         * Path to the property, for example `custom.myValue`.
         *
         * @param {unknown} obj
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
                const child = parent[pathElement];
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
                const boundingClientRectWidth = el.getBoundingClientRect &&
                    el.getBoundingClientRect().width;
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
         * Search for an item in an array.
         *
         * @function Highcharts.inArray
         *
         * @deprecated
         *
         * @param {*} item
         *        The item to search for.
         *
         * @param {Array<*>} arr
         *        The array or node collection to search in.
         *
         * @param {number} [fromIndex=0]
         *        The index to start searching from.
         *
         * @return {number}
         *         The index within the array, or -1 if not found.
         */
        function inArray(item, arr, fromIndex) {
            error(32, false, void 0, { 'Highcharts.inArray': 'use Array.indexOf' });
            return arr.indexOf(item, fromIndex);
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
         * Returns an array of a given object's own properties.
         *
         * @function Highcharts.keys
         * @deprecated
         *
         * @param {*} obj
         *        The object of which the properties are to be returned.
         *
         * @return {Array<string>}
         *         An array of strings that represents all the properties.
         */
        function keys(obj) {
            error(32, false, void 0, { 'Highcharts.keys': 'use Object.keys' });
            return Object.keys(obj);
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
        /* eslint-disable valid-jsdoc */
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
            /* eslint-enable valid-jsdoc */
            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    fn.call(ctx || obj[key], obj[key], key, obj);
                }
            }
        }
        /**
         * Iterate over an array.
         *
         * @deprecated
         * @function Highcharts.each
         *
         * @param {Array<*>} arr
         *        The array to iterate over.
         *
         * @param {Function} fn
         *        The iterator callback. It passes three arguments:
         *        - `item`: The array item.
         *        - `index`: The item's index in the array.
         *        - `arr`: The array that each is being applied to.
         *
         * @param {*} [ctx]
         *        The context.
         *
         * @return {void}
         */
        /**
         * Filter an array by a callback.
         *
         * @deprecated
         * @function Highcharts.grep
         *
         * @param {Array<*>} arr
         *        The array to filter.
         *
         * @param {Function} callback
         *        The callback function. The function receives the item as the first
         *        argument. Return `true` if the item is to be preserved.
         *
         * @return {Array<*>}
         *         A new, filtered array.
         */
        /**
         * Map an array by a callback.
         *
         * @deprecated
         * @function Highcharts.map
         *
         * @param {Array<*>} arr
         *        The array to map.
         *
         * @param {Function} fn
         *        The callback function. Return the new value for the new array.
         *
         * @return {Array<*>}
         *         A new array item with modified items.
         */
        /**
         * Reduce an array to a single value.
         *
         * @deprecated
         * @function Highcharts.reduce
         *
         * @param {Array<*>} arr
         *        The array to reduce.
         *
         * @param {Function} fn
         *        The callback function. Return the reduced value. Receives 4
         *        arguments: Accumulated/reduced value, current value, current array
         *        index, and the array.
         *
         * @param {*} initialValue
         *        The initial value of the accumulator.
         *
         * @return {*}
         *         The reduced value.
         */
        /**
         * Test whether at least one element in the array passes the test implemented by
         * the provided function.
         *
         * @deprecated
         * @function Highcharts.some
         *
         * @param {Array<*>} arr
         *        The array to test
         *
         * @param {Function} fn
         *        The function to run on each item. Return truthy to pass the test.
         *        Receives arguments `currentValue`, `index` and `array`.
         *
         * @param {*} ctx
         *        The context.
         *
         * @return {boolean}
         */
        objectEach({
            map: 'map',
            each: 'forEach',
            grep: 'filter',
            reduce: 'reduce',
            some: 'some'
        }, function (val, key) {
            H[key] = function (arr) {
                error(32, false, void 0, { [`Highcharts.${key}`]: `use Array.${val}` });
                return Array.prototype[val].apply(arr, [].slice.call(arguments, 1));
            };
        });
        /* eslint-disable valid-jsdoc */
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
            /* eslint-enable valid-jsdoc */
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
            if (H.Point && // Without H a dependency loop occurs
                el instanceof H.Point &&
                el.series &&
                el.series.chart) {
                el.series.chart.runTrackerClick = true;
            }
            // Handle DOM events
            // If the browser supports passive events, add it to improve performance
            // on touch events (#11353).
            const addEventListener = el.addEventListener;
            if (addEventListener) {
                addEventListener.call(el, type, fn, H.supportsPassiveEvents ? {
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
        /* eslint-disable valid-jsdoc */
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
            /* eslint-enable valid-jsdoc */
            /**
             * @private
             */
            function removeOneEvent(type, fn) {
                const removeEventListener = el.removeEventListener;
                if (removeEventListener) {
                    removeEventListener.call(el, type, fn, false);
                }
            }
            /**
             * @private
             */
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
        /* eslint-disable valid-jsdoc */
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
            /* eslint-enable valid-jsdoc */
            eventArguments = eventArguments || {};
            if (doc.createEvent &&
                (el.dispatchEvent ||
                    (el.fireEvent &&
                        // Enable firing events on Highcharts instance.
                        el !== H))) {
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
                    if (obj.fn.call(el, eventArguments) === false) {
                        eventArguments.preventDefault();
                    }
                });
            }
            // Run the default if not prevented
            if (defaultFunction && !eventArguments.defaultPrevented) {
                defaultFunction.call(el, eventArguments);
            }
        }
        let serialMode;
        /**
         * Get a unique key for using in internal element id's and pointers. The key is
         * composed of a random hash specific to this Highcharts instance, and a
         * counter.
         *
         * @example
         * let id = uniqueKey(); // => 'highcharts-x45f6hp-0'
         *
         * @function Highcharts.uniqueKey
         *
         * @return {string}
         * A unique key.
         */
        const uniqueKey = (function () {
            const hash = Math.random().toString(36).substring(2, 9) + '-';
            let id = 0;
            return function () {
                return 'highcharts-' + (serialMode ? '' : hash) + id++;
            };
        }());
        /**
         * Activates a serial mode for element IDs provided by
         * {@link Highcharts.uniqueKey}. This mode can be used in automated tests, where
         * a simple comparison of two rendered SVG graphics is needed.
         *
         * **Note:** This is only for testing purposes and will break functionality in
         * webpages with multiple charts.
         *
         * @example
         * if (
         *   process &&
         *   process.env.NODE_ENV === 'development'
         * ) {
         *   Highcharts.useSerialIds(true);
         * }
         *
         * @function Highcharts.useSerialIds
         *
         * @param {boolean} [mode]
         * Changes the state of serial mode.
         *
         * @return {boolean|undefined}
         * State of the serial mode.
         */
        function useSerialIds(mode) {
            return (serialMode = pick(mode, serialMode));
        }
        function isFunction(obj) {
            return typeof obj === 'function';
        }
        // Register Highcharts as a plugin in jQuery
        if (win.jQuery) {
            /**
             * Highcharts-extended JQuery.
             *
             * @external JQuery
             */
            /**
             * Helper function to return the chart of the current JQuery selector
             * element.
             *
             * @function external:JQuery#highcharts
             *
             * @return {Highcharts.Chart}
             *         The chart that is linked to the JQuery selector element.
             */ /**
            * Factory function to create a chart in the current JQuery selector
            * element.
            *
            * @function external:JQuery#highcharts
            *
            * @param {'Chart'|'Map'|'StockChart'|string} [className]
            *        Name of the factory class in the Highcharts namespace.
            *
            * @param {Highcharts.Options} [options]
            *        The chart options structure.
            *
            * @param {Highcharts.ChartCallbackFunction} [callback]
            *        Function to run when the chart has loaded and all external
            *        images are loaded. Defining a
            *        [chart.events.load](https://api.highcharts.com/highcharts/chart.events.load)
            *        handler is equivalent.
            *
            * @return {JQuery}
            *         The current JQuery selector.
            */
            win.jQuery.fn.highcharts = function () {
                const args = [].slice.call(arguments);
                if (this[0]) { // `this[0]` is the renderTo div
                    // Create the chart
                    if (args[0]) {
                        new H[ // eslint-disable-line computed-property-spacing, no-new
                        // Constructor defaults to Chart
                        isString(args[0]) ? args.shift() : 'Chart'](this[0], args[0], args[1]);
                        return this;
                    }
                    // When called without parameters or with the return argument,
                    // return an existing chart
                    return charts[attr(this[0], 'data-highcharts-chart')];
                }
            };
        }
        /* *
         *
         *  Default Export
         *
         * */
        // TODO use named exports when supported.
        const Utilities = {
            addEvent,
            arrayMax,
            arrayMin,
            attr,
            clamp,
            clearTimeout: internalClearTimeout,
            correctFloat,
            createElement,
            css,
            defined,
            destroyObjectProperties,
            diffObjects,
            discardElement,
            erase,
            error,
            extend,
            extendClass,
            find,
            fireEvent,
            getClosestDistance,
            getMagnitude,
            getNestedProperty,
            getStyle,
            inArray,
            insertItem,
            isArray,
            isClass,
            isDOMElement,
            isFunction,
            isNumber,
            isObject,
            isString,
            keys,
            merge,
            normalizeTickInterval,
            objectEach,
            offset,
            pad,
            pick,
            pInt,
            pushUnique,
            relativeLength,
            removeEvent,
            replaceNested,
            splat,
            stableSort,
            syncTimeout,
            timeUnits,
            uniqueKey,
            useSerialIds,
            wrap
        };
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * An animation configuration. Animation configurations can also be defined as
         * booleans, where `false` turns off animation and `true` defaults to a duration
         * of 500ms and defer of 0ms.
         *
         * @interface Highcharts.AnimationOptionsObject
         */ /**
        * A callback function to execute when the animation finishes.
        * @name Highcharts.AnimationOptionsObject#complete
        * @type {Function|undefined}
        */ /**
        * The animation defer in milliseconds.
        * @name Highcharts.AnimationOptionsObject#defer
        * @type {number|undefined}
        */ /**
        * The animation duration in milliseconds.
        * @name Highcharts.AnimationOptionsObject#duration
        * @type {number|undefined}
        */ /**
        * The name of an easing function as defined on the `Math` object.
        * @name Highcharts.AnimationOptionsObject#easing
        * @type {string|Function|undefined}
        */ /**
        * A callback function to execute on each step of each attribute or CSS property
        * that's being animated. The first argument contains information about the
        * animation and progress.
        * @name Highcharts.AnimationOptionsObject#step
        * @type {Function|undefined}
        */
        /**
         * Creates a frame for the animated SVG element.
         *
         * @callback Highcharts.AnimationStepCallbackFunction
         *
         * @param {Highcharts.SVGElement} this
         *        The SVG element to animate.
         *
         * @return {void}
         */
        /**
         * Interface description for a class.
         *
         * @interface Highcharts.Class<T>
         * @extends Function
         */ /**
        * Class constructor.
        * @function Highcharts.Class<T>#new
        * @param {...Array<*>} args
        *        Constructor arguments.
        * @return {T}
        *         Class instance.
        */
        /**
         * A style object with camel case property names to define visual appearance of
         * a SVG element or HTML element. The properties can be whatever styles are
         * supported on the given SVG or HTML element.
         *
         * @example
         * {
         *    fontFamily: 'monospace',
         *    fontSize: '1.2em'
         * }
         *
         * @interface Highcharts.CSSObject
         */ /**
        * @name Highcharts.CSSObject#[key:string]
        * @type {boolean|number|string|undefined}
        */ /**
        * Background style for the element.
        * @name Highcharts.CSSObject#background
        * @type {string|undefined}
        */ /**
        * Background color of the element.
        * @name Highcharts.CSSObject#backgroundColor
        * @type {Highcharts.ColorString|undefined}
        */ /**
        * Border style for the element.
        * @name Highcharts.CSSObject#border
        * @type {string|undefined}
        */ /**
        * Radius of the element border.
        * @name Highcharts.CSSObject#borderRadius
        * @type {number|undefined}
        */ /**
        * Color used in the element. The 'contrast' option is a Highcharts custom
        * property that results in black or white, depending on the background of the
        * element.
        * @name Highcharts.CSSObject#color
        * @type {'contrast'|Highcharts.ColorString|undefined}
        */ /**
        * Style of the mouse cursor when resting over the element.
        * @name Highcharts.CSSObject#cursor
        * @type {Highcharts.CursorValue|undefined}
        */ /**
        * Font family of the element text. Multiple values have to be in decreasing
        * preference order and separated by comma.
        * @name Highcharts.CSSObject#fontFamily
        * @type {string|undefined}
        */ /**
        * Font size of the element text.
        * @name Highcharts.CSSObject#fontSize
        * @type {string|undefined}
        */ /**
        * Font weight of the element text.
        * @name Highcharts.CSSObject#fontWeight
        * @type {string|undefined}
        */ /**
        * Height of the element.
        * @name Highcharts.CSSObject#height
        * @type {number|undefined}
        */ /**
        * Width of the element border.
        * @name Highcharts.CSSObject#lineWidth
        * @type {number|undefined}
        */ /**
        * Opacity of the element.
        * @name Highcharts.CSSObject#opacity
        * @type {number|undefined}
        */ /**
        * Space around the element content.
        * @name Highcharts.CSSObject#padding
        * @type {string|undefined}
        */ /**
        * Behaviour of the element when the mouse cursor rests over it.
        * @name Highcharts.CSSObject#pointerEvents
        * @type {string|undefined}
        */ /**
        * Positioning of the element.
        * @name Highcharts.CSSObject#position
        * @type {string|undefined}
        */ /**
        * Alignment of the element text.
        * @name Highcharts.CSSObject#textAlign
        * @type {string|undefined}
        */ /**
        * Additional decoration of the element text.
        * @name Highcharts.CSSObject#textDecoration
        * @type {string|undefined}
        */ /**
        * Outline style of the element text.
        * @name Highcharts.CSSObject#textOutline
        * @type {string|undefined}
        */ /**
        * Line break style of the element text. Highcharts SVG elements support
        * `ellipsis` when a `width` is set.
        * @name Highcharts.CSSObject#textOverflow
        * @type {string|undefined}
        */ /**
        * Top spacing of the element relative to the parent element.
        * @name Highcharts.CSSObject#top
        * @type {string|undefined}
        */ /**
        * Animated transition of selected element properties.
        * @name Highcharts.CSSObject#transition
        * @type {string|undefined}
        */ /**
        * Line break style of the element text.
        * @name Highcharts.CSSObject#whiteSpace
        * @type {string|undefined}
        */ /**
        * Width of the element.
        * @name Highcharts.CSSObject#width
        * @type {number|undefined}
        */
        /**
         * All possible cursor styles.
         *
         * @typedef {'alias'|'all-scroll'|'auto'|'cell'|'col-resize'|'context-menu'|'copy'|'crosshair'|'default'|'e-resize'|'ew-resize'|'grab'|'grabbing'|'help'|'move'|'n-resize'|'ne-resize'|'nesw-resize'|'no-drop'|'none'|'not-allowed'|'ns-resize'|'nw-resize'|'nwse-resize'|'pointer'|'progress'|'row-resize'|'s-resize'|'se-resize'|'sw-resize'|'text'|'vertical-text'|'w-resize'|'wait'|'zoom-in'|'zoom-out'} Highcharts.CursorValue
         */
        /**
         * All possible dash styles.
         *
         * @typedef {'Dash'|'DashDot'|'Dot'|'LongDash'|'LongDashDot'|'LongDashDotDot'|'ShortDash'|'ShortDashDot'|'ShortDashDotDot'|'ShortDot'|'Solid'} Highcharts.DashStyleValue
         */
        /**
         * Generic dictionary in TypeScript notation.
         * Use the native `AnyRecord` instead.
         *
         * @deprecated
         * @interface Highcharts.Dictionary<T>
         */ /**
        * @name Highcharts.Dictionary<T>#[key:string]
        * @type {T}
        */
        /**
         * The function callback to execute when the event is fired. The `this` context
         * contains the instance, that fired the event.
         *
         * @callback Highcharts.EventCallbackFunction<T>
         *
         * @param {T} this
         *
         * @param {Highcharts.Dictionary<*>|Event} [eventArguments]
         *        Event arguments.
         *
         * @return {boolean|void}
         */
        /**
         * The event options for adding function callback.
         *
         * @interface Highcharts.EventOptionsObject
         */ /**
        * The order the event handler should be called. This opens for having one
        * handler be called before another, independent of in which order they were
        * added.
        * @name Highcharts.EventOptionsObject#order
        * @type {number}
        */ /**
        * Whether an event should be passive or not.
        * When set to `true`, the function specified by listener will never call
        * `preventDefault()`.
        * @name Highcharts.EventOptionsObject#passive
        * @type boolean
        */
        /**
         * Formats data as a string. Usually the data is accessible through the `this`
         * keyword.
         *
         * @callback Highcharts.FormatterCallbackFunction<T>
         *
         * @param {T} this
         *        Context to format
         *
         * @return {string}
         *         Formatted text
         */
        /**
         * An object of key-value pairs for HTML attributes.
         *
         * @typedef {Highcharts.Dictionary<boolean|number|string|Function>} Highcharts.HTMLAttributes
         */
        /**
         * An HTML DOM element. The type is a reference to the regular HTMLElement in
         * the global scope.
         *
         * @typedef {global.HTMLElement} Highcharts.HTMLDOMElement
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
         */
        /**
         * The iterator callback.
         *
         * @callback Highcharts.ObjectEachCallbackFunction<T>
         *
         * @param {T} this
         *        The context.
         *
         * @param {*} value
         *        The property value.
         *
         * @param {string} key
         *        The property key.
         *
         * @param {*} obj
         *        The object that objectEach is being applied to.
         */
        /**
         * An object containing `left` and `top` properties for the position in the
         * page.
         *
         * @interface Highcharts.OffsetObject
         */ /**
        * Left distance to the page border.
        * @name Highcharts.OffsetObject#left
        * @type {number}
        */ /**
        * Top distance to the page border.
        * @name Highcharts.OffsetObject#top
        * @type {number}
        */
        /**
         * Describes a range.
         *
         * @interface Highcharts.RangeObject
         */ /**
        * Maximum number of the range.
        * @name Highcharts.RangeObject#max
        * @type {number}
        */ /**
        * Minimum number of the range.
        * @name Highcharts.RangeObject#min
        * @type {number}
        */
        /**
         * If a number is given, it defines the pixel length. If a percentage string is
         * given, like for example `'50%'`, the setting defines a length relative to a
         * base size, for example the size of a container.
         *
         * @typedef {number|string} Highcharts.RelativeSize
         */
        /**
         * Proceed function to call original (wrapped) function.
         *
         * @callback Highcharts.WrapProceedFunction
         *
         * @param {*} [arg1]
         *        Optional argument. Without any arguments defaults to first argument of
         *        the wrapping function.
         *
         * @param {*} [arg2]
         *        Optional argument. Without any arguments defaults to second argument
         *        of the wrapping function.
         *
         * @param {*} [arg3]
         *        Optional argument. Without any arguments defaults to third argument of
         *        the wrapping function.
         *
         * @return {*}
         *         Return value of the original function.
         */
        /**
         * The Highcharts object is the placeholder for all other members, and various
         * utility functions. The most important member of the namespace would be the
         * chart constructor.
         *
         * @example
         * let chart = Highcharts.chart('container', { ... });
         *
         * @namespace Highcharts
         */
        ''; // Detach doclets above

        return Utilities;
    });
    _registerModule(_modules, 'Data/Modifiers/DataModifier.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *  - Gøran Slettemark
         *
         * */
        const { addEvent, fireEvent, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Abstract class to provide an interface for modifying a table.
         *
         * @private
         */
        class DataModifier {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Runs a timed execution of the modifier on the given datatable.
             * Can be configured to run multiple times.
             *
             * @param {DataTable} dataTable
             * The datatable to execute
             *
             * @param {DataModifier.BenchmarkOptions} options
             * Options. Currently supports `iterations` for number of iterations.
             *
             * @return {Array<number>}
             * An array of times in milliseconds
             *
             */
            benchmark(dataTable, options) {
                const results = [];
                const modifier = this;
                const execute = () => {
                    modifier.modifyTable(dataTable);
                    modifier.emit({
                        type: 'afterBenchmarkIteration'
                    });
                };
                const defaultOptions = {
                    iterations: 1
                };
                const { iterations } = merge(defaultOptions, options);
                modifier.on('afterBenchmarkIteration', () => {
                    if (results.length === iterations) {
                        modifier.emit({
                            type: 'afterBenchmark',
                            results
                        });
                        return;
                    }
                    // Run again
                    execute();
                });
                const times = {
                    startTime: 0,
                    endTime: 0
                };
                // Add timers
                modifier.on('modify', () => {
                    times.startTime = window.performance.now();
                });
                modifier.on('afterModify', () => {
                    times.endTime = window.performance.now();
                    results.push(times.endTime - times.startTime);
                });
                // Initial run
                execute();
                return results;
            }
            /**
             * Emits an event on the modifier to all registered callbacks of this event.
             *
             * @param {DataModifier.Event} [e]
             * Event object containing additonal event information.
             */
            emit(e) {
                fireEvent(this, e.type, e);
            }
            /**
             * Returns a modified copy of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Table to modify.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Promise<Highcharts.DataTable>}
             * Table with `modified` property as a reference.
             */
            modify(table, eventDetail) {
                const modifier = this;
                return new Promise((resolve, reject) => {
                    if (table.modified === table) {
                        table.modified = table.clone(false, eventDetail);
                    }
                    try {
                        resolve(modifier.modifyTable(table, eventDetail));
                    }
                    catch (e) {
                        modifier.emit({
                            type: 'error',
                            detail: eventDetail,
                            table
                        });
                        reject(e);
                    }
                });
            }
            /**
             * Applies partial modifications of a cell change to the property `modified`
             * of the given modified table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {string} columnName
             * Column name of changed cell.
             *
             * @param {number|undefined} rowIndex
             * Row index of changed cell.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Changed cell value.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyCell(table, 
            /* eslint-disable @typescript-eslint/no-unused-vars */
            columnName, rowIndex, cellValue, eventDetail
            /* eslint-enable @typescript-eslint/no-unused-vars */
            ) {
                return this.modifyTable(table);
            }
            /**
             * Applies partial modifications of column changes to the property
             * `modified` of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Highcharts.DataTableColumnCollection} columns
             * Changed columns as a collection, where the keys are the column names.
             *
             * @param {number} [rowIndex=0]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyColumns(table, 
            /* eslint-disable @typescript-eslint/no-unused-vars */
            columns, rowIndex, eventDetail
            /* eslint-enable @typescript-eslint/no-unused-vars */
            ) {
                return this.modifyTable(table);
            }
            /**
             * Applies partial modifications of row changes to the property `modified`
             * of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
             * Changed rows.
             *
             * @param {number} [rowIndex]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyRows(table, 
            /* eslint-disable @typescript-eslint/no-unused-vars */
            rows, rowIndex, eventDetail
            /* eslint-enable @typescript-eslint/no-unused-vars */
            ) {
                return this.modifyTable(table);
            }
            /**
             * Registers a callback for a specific modifier event.
             *
             * @param {string} type
             * Event type as a string.
             *
             * @param {DataEventEmitter.Callback} callback
             * Function to register for an modifier callback.
             *
             * @return {Function}
             * Function to unregister callback from the modifier event.
             */
            on(type, callback) {
                return addEvent(this, type, callback);
            }
        }
        /* *
         *
         *  Class Namespace
         *
         * */
        /**
         * Additionally provided types for modifier events and options.
         * @private
         */
        (function (DataModifier) {
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
             * Registry as a record object with modifier names and their class
             * constructor.
             */
            DataModifier.types = {};
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Adds a modifier class to the registry. The modifier class has to provide
             * the `DataModifier.options` property and the `DataModifier.modifyTable`
             * method to modify the table.
             *
             * @private
             *
             * @param {string} key
             * Registry key of the modifier class.
             *
             * @param {DataModifierType} DataModifierClass
             * Modifier class (aka class constructor) to register.
             *
             * @return {boolean}
             * Returns true, if the registration was successful. False is returned, if
             * their is already a modifier registered with this key.
             */
            function registerType(key, DataModifierClass) {
                return (!!key &&
                    !DataModifier.types[key] &&
                    !!(DataModifier.types[key] = DataModifierClass));
            }
            DataModifier.registerType = registerType;
        })(DataModifier || (DataModifier = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return DataModifier;
    });
    _registerModule(_modules, 'Data/DataTable.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *  - Gøran Slettemark
         *
         * */
        const { addEvent, fireEvent, uniqueKey } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Class to manage columns and rows in a table structure. It provides methods
         * to add, remove, and manipulate columns and rows, as well as to retrieve data
         * from specific cells.
         *
         * @class
         * @name Highcharts.DataTable
         *
         * @param {Highcharts.DataTableOptions} [options]
         * Options to initialize the new DataTable instance.
         */
        class DataTable {
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * Tests whether a row contains only `null` values or is equal to
             * DataTable.NULL. If all columns have `null` values, the function returns
             * `true`. Otherwise, it returns `false` to indicate that the row contains
             * at least one non-null value.
             *
             * @function Highcharts.DataTable.isNull
             *
             * @param {Highcharts.DataTableRow|Highcharts.DataTableRowObject} row
             * Row to test.
             *
             * @return {boolean}
             * Returns `true`, if the row contains only null, otherwise `false`.
             *
             * @example
             * if (DataTable.isNull(row)) {
             *   // handle null row
             * }
             */
            static isNull(row) {
                if (row === DataTable.NULL) {
                    return true;
                }
                if (row instanceof Array) {
                    if (!row.length) {
                        return false;
                    }
                    for (let i = 0, iEnd = row.length; i < iEnd; ++i) {
                        if (row[i] !== null) {
                            return false;
                        }
                    }
                }
                else {
                    const columnNames = Object.keys(row);
                    if (!columnNames.length) {
                        return false;
                    }
                    for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                        if (row[columnNames[i]] !== null) {
                            return false;
                        }
                    }
                }
                return true;
            }
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the DataTable class.
             *
             * @param {Highcharts.DataTableOptions} [options]
             * Options to initialize the new DataTable instance.
             */
            constructor(options = {}) {
                /**
                 * Dictionary of all column aliases and their mapped column. If a column
                 * for one of the get-methods matches an column alias, this column will
                 * be replaced with the mapped column by the column alias.
                 *
                 * @name Highcharts.DataTable#aliases
                 * @type {Highcharts.Dictionary<string>}
                 */
                this.aliases = (options.aliases ?
                    JSON.parse(JSON.stringify(options.aliases)) :
                    {});
                /**
                 * Whether the ID was automatic generated or given in the constructor.
                 *
                 * @name Highcharts.DataTable#autoId
                 * @type {boolean}
                 */
                this.autoId = !options.id;
                this.columns = {};
                /**
                 * ID of the table for indentification purposes.
                 *
                 * @name Highcharts.DataTable#id
                 * @type {string}
                 */
                this.id = (options.id || uniqueKey());
                this.modified = this;
                this.rowCount = 0;
                this.versionTag = uniqueKey();
                const columns = options.columns || {}, columnNames = Object.keys(columns), thisColumns = this.columns;
                let rowCount = 0;
                for (let i = 0, iEnd = columnNames.length, column, columnName; i < iEnd; ++i) {
                    columnName = columnNames[i];
                    column = columns[columnName].slice();
                    thisColumns[columnName] = column;
                    rowCount = Math.max(rowCount, column.length);
                }
                for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                    thisColumns[columnNames[i]].length = rowCount;
                }
                this.rowCount = rowCount;
                const aliases = options.aliases || {}, aliasKeys = Object.keys(aliases), thisAliases = this.aliases;
                for (let i = 0, iEnd = aliasKeys.length, alias; i < iEnd; ++i) {
                    alias = aliasKeys[i];
                    thisAliases[alias] = aliases[alias];
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Returns a clone of this table. The cloned table is completely independent
             * of the original, and any changes made to the clone will not affect
             * the original table.
             *
             * @function Highcharts.DataTable#clone
             *
             * @param {boolean} [skipColumns]
             * Whether to clone columns or not.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Clone of this data table.
             *
             * @emits #cloneTable
             * @emits #afterCloneTable
             */
            clone(skipColumns, eventDetail) {
                const table = this, tableOptions = {};
                table.emit({ type: 'cloneTable', detail: eventDetail });
                if (!skipColumns) {
                    tableOptions.aliases = table.aliases;
                    tableOptions.columns = table.columns;
                }
                if (!table.autoId) {
                    tableOptions.id = table.id;
                }
                const tableClone = new DataTable(tableOptions);
                if (!skipColumns) {
                    tableClone.versionTag = table.versionTag;
                }
                table.emit({
                    type: 'afterCloneTable',
                    detail: eventDetail,
                    tableClone
                });
                return tableClone;
            }
            /**
             * Deletes a column alias and returns the original column name. If the alias
             * is not found, the method returns `undefined`. Deleting an alias does not
             * affect the data in the table, only the way columns are accessed.
             *
             * @function Highcharts.DataTable#deleteColumnAlias
             *
             * @param {string} alias
             * The alias to delete.
             *
             * @return {string|undefined}
             * Returns the original column name, if found.
             */
            deleteColumnAlias(alias) {
                const table = this, aliases = table.aliases, deletedAlias = aliases[alias], modifier = table.modifier;
                if (deletedAlias) {
                    delete table.aliases[alias];
                    if (modifier) {
                        modifier.modifyColumns(table, { [deletedAlias]: new Array(table.rowCount) }, 0);
                    }
                }
                return deletedAlias;
            }
            /**
             * Deletes columns from the table.
             *
             * @function Highcharts.DataTable#deleteColumns
             *
             * @param {Array<string>} [columnNames]
             * Names (no alias) of columns to delete. If no array is provided, all
             * columns will be deleted.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTableColumnCollection|undefined}
             * Returns the deleted columns, if found.
             *
             * @emits #deleteColumns
             * @emits #afterDeleteColumns
             */
            deleteColumns(columnNames, eventDetail) {
                const table = this, columns = table.columns, deletedColumns = {}, modifiedColumns = {}, modifier = table.modifier, rowCount = table.rowCount;
                columnNames = (columnNames || Object.keys(columns));
                if (columnNames.length) {
                    table.emit({
                        type: 'deleteColumns',
                        columnNames,
                        detail: eventDetail
                    });
                    for (let i = 0, iEnd = columnNames.length, column, columnName; i < iEnd; ++i) {
                        columnName = columnNames[i];
                        column = columns[columnName];
                        if (column) {
                            deletedColumns[columnName] = column;
                            modifiedColumns[columnName] = new Array(rowCount);
                        }
                        delete columns[columnName];
                    }
                    if (!Object.keys(columns).length) {
                        table.rowCount = 0;
                    }
                    if (modifier) {
                        modifier.modifyColumns(table, modifiedColumns, 0, eventDetail);
                    }
                    table.emit({
                        type: 'afterDeleteColumns',
                        columns: deletedColumns,
                        columnNames,
                        detail: eventDetail
                    });
                    return deletedColumns;
                }
            }
            /**
             * Deletes rows in this table.
             *
             * @function Highcharts.DataTable#deleteRows
             *
             * @param {number} [rowIndex]
             * Index to start delete of rows. If not specified, all rows will be
             * deleted.
             *
             * @param {number} [rowCount=1]
             * Number of rows to delete.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Array<Highcharts.DataTableRow>}
             * Returns the deleted rows, if found.
             *
             * @emits #deleteRows
             * @emits #afterDeleteRows
             */
            deleteRows(rowIndex, rowCount = 1, eventDetail) {
                const table = this, deletedRows = [], modifiedRows = [], modifier = table.modifier;
                table.emit({
                    type: 'deleteRows',
                    detail: eventDetail,
                    rowCount,
                    rowIndex: (rowIndex || 0)
                });
                if (typeof rowIndex === 'undefined') {
                    rowIndex = 0;
                    rowCount = table.rowCount;
                }
                if (rowCount > 0 && rowIndex < table.rowCount) {
                    const columns = table.columns, columnNames = Object.keys(columns);
                    for (let i = 0, iEnd = columnNames.length, column, deletedCells; i < iEnd; ++i) {
                        column = columns[columnNames[i]];
                        deletedCells = column.splice(rowIndex, rowCount);
                        if (!i) {
                            table.rowCount = column.length;
                        }
                        for (let j = 0, jEnd = deletedCells.length; j < jEnd; ++j) {
                            deletedRows[j] = (deletedRows[j] || []);
                            deletedRows[j][i] = deletedCells[j];
                        }
                        modifiedRows.push(new Array(iEnd));
                    }
                }
                if (modifier) {
                    modifier.modifyRows(table, modifiedRows, (rowIndex || 0), eventDetail);
                }
                table.emit({
                    type: 'afterDeleteRows',
                    detail: eventDetail,
                    rowCount,
                    rowIndex: (rowIndex || 0),
                    rows: deletedRows
                });
                return deletedRows;
            }
            /**
             * Emits an event on this table to all registered callbacks of the given
             * event.
             * @private
             *
             * @param {DataTable.Event} e
             * Event object with event information.
             */
            emit(e) {
                const table = this;
                switch (e.type) {
                    case 'afterDeleteColumns':
                    case 'afterDeleteRows':
                    case 'afterSetCell':
                    case 'afterSetColumns':
                    case 'afterSetRows':
                        table.versionTag = uniqueKey();
                        break;
                    default:
                }
                fireEvent(table, e.type, e);
            }
            /**
             * Fetches a single cell value.
             *
             * @function Highcharts.DataTable#getCell
             *
             * @param {string} columnNameOrAlias
             * Column name or alias of the cell to retrieve.
             *
             * @param {number} rowIndex
             * Row index of the cell to retrieve.
             *
             * @return {Highcharts.DataTableCellType|undefined}
             * Returns the cell value or `undefined`.
             */
            getCell(columnNameOrAlias, rowIndex) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                if (column) {
                    return column[rowIndex];
                }
            }
            /**
             * Fetches a cell value for the given row as a boolean.
             *
             * @function Highcharts.DataTable#getCellAsBoolean
             *
             * @param {string} columnNameOrAlias
             * Column name or alias to fetch.
             *
             * @param {number} rowIndex
             * Row index to fetch.
             *
             * @return {boolean}
             * Returns the cell value of the row as a boolean.
             */
            getCellAsBoolean(columnNameOrAlias, rowIndex) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                return !!(column && column[rowIndex]);
            }
            /**
             * Fetches a cell value for the given row as a number.
             *
             * @function Highcharts.DataTable#getCellAsNumber
             *
             * @param {string} columnNameOrAlias
             * Column name or alias to fetch.
             *
             * @param {number} rowIndex
             * Row index to fetch.
             *
             * @param {boolean} [useNaN]
             * Whether to return NaN instead of `null` and `undefined`.
             *
             * @return {number|null}
             * Returns the cell value of the row as a number.
             */
            getCellAsNumber(columnNameOrAlias, rowIndex, useNaN) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                let cellValue = (column && column[rowIndex]);
                switch (typeof cellValue) {
                    case 'boolean':
                        return (cellValue ? 1 : 0);
                    case 'number':
                        return (isNaN(cellValue) && !useNaN ? null : cellValue);
                }
                cellValue = parseFloat(`${cellValue}`);
                return (isNaN(cellValue) && !useNaN ? null : cellValue);
            }
            /**
             * Fetches a cell value for the given row as a string.
             *
             * @function Highcharts.DataTable#getCellAsString
             *
             * @param {string} columnNameOrAlias
             * Column name or alias to fetch.
             *
             * @param {number} rowIndex
             * Row index to fetch.
             *
             * @return {string}
             * Returns the cell value of the row as a string.
             */
            getCellAsString(columnNameOrAlias, rowIndex) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                return `${(column && column[rowIndex])}`;
            }
            /**
             * Fetches the given column by the canonical column name or by an alias.
             * This function is a simplified wrap of {@link getColumns}.
             *
             * @function Highcharts.DataTable#getColumn
             *
             * @param {string} columnNameOrAlias
             * Name or alias of the column to get, alias takes precedence.
             *
             * @param {boolean} [asReference]
             * Whether to return the column as a readonly reference.
             *
             * @return {Highcharts.DataTableColumn|undefined}
             * A copy of the column, or `undefined` if not found.
             */
            getColumn(columnNameOrAlias, asReference) {
                return this.getColumns([columnNameOrAlias], asReference)[columnNameOrAlias];
            }
            /**
             * Fetches the given column by the canonical column name or by an alias, and
             * validates the type of the first few cells. If the first defined cell is
             * of type number, it assumes for performance reasons, that all cells are of
             * type number or `null`. Otherwise it will convert all cells to number
             * type, except `null`.
             *
             * @function Highcharts.DataTable#getColumnAsNumbers
             *
             * @param {string} columnNameOrAlias
             * Name or alias of the column to get, alias takes precedence.
             *
             * @param {boolean} [useNaN]
             * Whether to use NaN instead of `null` and `undefined`.
             *
             * @return {Array<(number|null)>}
             * A copy of the column, or an empty array if not found.
             */
            getColumnAsNumbers(columnNameOrAlias, useNaN) {
                const table = this, columns = table.columns;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = columns[columnNameOrAlias], columnAsNumber = [];
                if (column) {
                    const columnLength = column.length;
                    if (useNaN) {
                        for (let i = 0; i < columnLength; ++i) {
                            columnAsNumber.push(table.getCellAsNumber(columnNameOrAlias, i, true));
                        }
                    }
                    else {
                        for (let i = 0, cellValue; i < columnLength; ++i) {
                            cellValue = column[i];
                            if (typeof cellValue === 'number') {
                                // Assume unmixed data for performance reasons
                                return column.slice();
                            }
                            if (cellValue !== null &&
                                typeof cellValue !== 'undefined') {
                                break;
                            }
                        }
                        for (let i = 0; i < columnLength; ++i) {
                            columnAsNumber.push(table.getCellAsNumber(columnNameOrAlias, i));
                        }
                    }
                }
                return columnAsNumber;
            }
            /**
             * Fetches all column names.
             *
             * @function Highcharts.DataTable#getColumnNames
             *
             * @return {Array<string>}
             * Returns all column names.
             */
            getColumnNames() {
                const table = this, columnNames = Object.keys(table.columns);
                return columnNames;
            }
            /**
             * Retrieves all or the given columns.
             *
             * @function Highcharts.DataTable#getColumns
             *
             * @param {Array<string>} [columnNamesOrAliases]
             * Column names or aliases to retrieve. Aliases taking precedence.
             *
             * @param {boolean} [asReference]
             * Whether to return columns as a readonly reference.
             *
             * @return {Highcharts.DataTableColumnCollection}
             * Collection of columns. If a requested column was not found, it is
             * `undefined`.
             */
            getColumns(columnNamesOrAliases, asReference) {
                const table = this, tableAliasMap = table.aliases, tableColumns = table.columns, columns = {};
                columnNamesOrAliases = (columnNamesOrAliases || Object.keys(tableColumns));
                for (let i = 0, iEnd = columnNamesOrAliases.length, column, columnName; i < iEnd; ++i) {
                    columnName = columnNamesOrAliases[i];
                    column = tableColumns[(tableAliasMap[columnName] || columnName)];
                    if (column) {
                        columns[columnName] = (asReference ? column : column.slice());
                    }
                }
                return columns;
            }
            /**
             * Retrieves the modifier for the table.
             * @private
             *
             * @return {Highcharts.DataModifier|undefined}
             * Returns the modifier or `undefined`.
             */
            getModifier() {
                return this.modifier;
            }
            /**
             * Retrieves the row at a given index. This function is a simplified wrap of
             * {@link getRows}.
             *
             * @function Highcharts.DataTable#getRow
             *
             * @param {number} rowIndex
             * Row index to retrieve. First row has index 0.
             *
             * @param {Array<string>} [columnNamesOrAliases]
             * Column names or aliases in order to retrieve.
             *
             * @return {Highcharts.DataTableRow}
             * Returns the row values, or `undefined` if not found.
             */
            getRow(rowIndex, columnNamesOrAliases) {
                return this.getRows(rowIndex, 1, columnNamesOrAliases)[0];
            }
            /**
             * Returns the number of rows in this table.
             *
             * @function Highcharts.DataTable#getRowCount
             *
             * @return {number}
             * Number of rows in this table.
             */
            getRowCount() {
                // @todo Implement via property getter `.length` browsers supported
                return this.rowCount;
            }
            /**
             * Retrieves the index of the first row matching a specific cell value.
             *
             * @function Highcharts.DataTable#getRowIndexBy
             *
             * @param {string} columnNameOrAlias
             * Column to search in.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Cell value to search for. `NaN` and `undefined` are not supported.
             *
             * @param {number} [rowIndexOffset]
             * Index offset to start searching.
             *
             * @return {number|undefined}
             * Index of the first row matching the cell value.
             */
            getRowIndexBy(columnNameOrAlias, cellValue, rowIndexOffset) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                if (column) {
                    const rowIndex = column.indexOf(cellValue, rowIndexOffset);
                    if (rowIndex !== -1) {
                        return rowIndex;
                    }
                }
            }
            /**
             * Retrieves the row at a given index. This function is a simplified wrap of
             * {@link getRowObjects}.
             *
             * @function Highcharts.DataTable#getRowObject
             *
             * @param {number} rowIndex
             * Row index.
             *
             * @param {Array<string>} [columnNamesOrAliases]
             * Column names or aliases and their order to retrieve.
             *
             * @return {Highcharts.DataTableRowObject}
             * Returns the row values, or `undefined` if not found.
             */
            getRowObject(rowIndex, columnNamesOrAliases) {
                return this.getRowObjects(rowIndex, 1, columnNamesOrAliases)[0];
            }
            /**
             * Fetches all or a number of rows.
             *
             * @function Highcharts.DataTable#getRowObjects
             *
             * @param {number} [rowIndex]
             * Index of the first row to fetch. Defaults to first row at index `0`.
             *
             * @param {number} [rowCount]
             * Number of rows to fetch. Defaults to maximal number of rows.
             *
             * @param {Array<string>} [columnNamesOrAliases]
             * Column names or aliases and their order to retrieve.
             *
             * @return {Highcharts.DataTableRowObject}
             * Returns retrieved rows.
             */
            getRowObjects(rowIndex = 0, rowCount = (this.rowCount - rowIndex), columnNamesOrAliases) {
                const table = this, aliases = table.aliases, columns = table.columns, rows = new Array(rowCount);
                columnNamesOrAliases = (columnNamesOrAliases || Object.keys(columns));
                for (let i = rowIndex, i2 = 0, iEnd = Math.min(table.rowCount, (rowIndex + rowCount)), column, row; i < iEnd; ++i, ++i2) {
                    row = rows[i2] = {};
                    for (const columnName of columnNamesOrAliases) {
                        column = columns[(aliases[columnName] || columnName)];
                        row[columnName] = (column ? column[i] : void 0);
                    }
                }
                return rows;
            }
            /**
             * Fetches all or a number of rows.
             *
             * @function Highcharts.DataTable#getRows
             *
             * @param {number} [rowIndex]
             * Index of the first row to fetch. Defaults to first row at index `0`.
             *
             * @param {number} [rowCount]
             * Number of rows to fetch. Defaults to maximal number of rows.
             *
             * @param {Array<string>} [columnNamesOrAliases]
             * Column names or aliases and their order to retrieve.
             *
             * @return {Highcharts.DataTableRow}
             * Returns retrieved rows.
             */
            getRows(rowIndex = 0, rowCount = (this.rowCount - rowIndex), columnNamesOrAliases) {
                const table = this, aliases = table.aliases, columns = table.columns, rows = new Array(rowCount);
                columnNamesOrAliases = (columnNamesOrAliases || Object.keys(columns));
                for (let i = rowIndex, i2 = 0, iEnd = Math.min(table.rowCount, (rowIndex + rowCount)), column, row; i < iEnd; ++i, ++i2) {
                    row = rows[i2] = [];
                    for (const columnName of columnNamesOrAliases) {
                        column = columns[(aliases[columnName] || columnName)];
                        row.push(column ? column[i] : void 0);
                    }
                }
                return rows;
            }
            /**
             * Returns the unique version tag of the current state of the table.
             *
             * @function Highcharts.DataTable#getVersionTag
             *
             * @return {string}
             * Unique version tag.
             */
            getVersionTag() {
                return this.versionTag;
            }
            /**
             * Checks for given column names or aliases.
             *
             * @function Highcharts.DataTable#hasColumns
             *
             * @param {Array<string>} columnNamesOrAliases
             * Column names of aliases to check.
             *
             * @return {boolean}
             * Returns `true` if all columns have been found, otherwise `false`.
             */
            hasColumns(columnNamesOrAliases) {
                const table = this, aliases = table.aliases, columns = table.columns;
                for (let i = 0, iEnd = columnNamesOrAliases.length, columnName; i < iEnd; ++i) {
                    columnName = columnNamesOrAliases[i];
                    if (!columns[columnName] && !aliases[columnName]) {
                        return false;
                    }
                }
                return true;
            }
            /**
             * Searches for a specific cell value.
             *
             * @function Highcharts.DataTable#hasRowWith
             *
             * @param {string} columnNameOrAlias
             * Column to search in.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Cell value to search for. `NaN` and `undefined` are not supported.
             *
             * @return {boolean}
             * True, if a row has been found, otherwise false.
             */
            hasRowWith(columnNameOrAlias, cellValue) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                if (column) {
                    return (column.indexOf(cellValue) !== -1);
                }
                return false;
            }
            /**
             * Registers a callback for a specific event.
             *
             * @function Highcharts.DataTable#on
             *
             * @param {string} type
             * Event type as a string.
             *
             * @param {Highcharts.EventCallbackFunction<Highcharts.DataTable>} callback
             * Function to register for an event callback.
             *
             * @return {Function}
             * Function to unregister callback from the event.
             */
            on(type, callback) {
                return addEvent(this, type, callback);
            }
            /**
             * Renames a column of cell values.
             *
             * @function Highcharts.DataTable#renameColumn
             *
             * @param {string} columnName
             * Name of the column to be renamed.
             *
             * @param {string} newColumnName
             * New name of the column. An existing column with the same name will be
             * replaced.
             *
             * @return {boolean}
             * Returns `true` if successful, `false` if the column was not found.
             */
            renameColumn(columnName, newColumnName) {
                const table = this, columns = table.columns;
                if (columns[columnName]) {
                    if (columnName !== newColumnName) {
                        const aliases = table.aliases;
                        if (aliases[newColumnName]) {
                            delete aliases[newColumnName];
                        }
                        columns[newColumnName] = columns[columnName];
                        delete columns[columnName];
                    }
                    return true;
                }
                return false;
            }
            /**
             * Sets a cell value based on the row index and column name or alias.  Will
             * insert a new column, if not found.
             *
             * @function Highcharts.DataTable#setCell
             *
             * @param {string} columnNameOrAlias
             * Column name or alias to set.
             *
             * @param {number|undefined} rowIndex
             * Row index to set.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Cell value to set.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits #setCell
             * @emits #afterSetCell
             */
            setCell(columnNameOrAlias, rowIndex, cellValue, eventDetail) {
                const table = this, columns = table.columns, modifier = table.modifier;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                let column = columns[columnNameOrAlias];
                if (column && column[rowIndex] === cellValue) {
                    return;
                }
                table.emit({
                    type: 'setCell',
                    cellValue,
                    columnName: columnNameOrAlias,
                    detail: eventDetail,
                    rowIndex
                });
                if (!column) {
                    column = columns[columnNameOrAlias] = new Array(table.rowCount);
                }
                if (rowIndex >= table.rowCount) {
                    table.rowCount = (rowIndex + 1);
                }
                column[rowIndex] = cellValue;
                if (modifier) {
                    modifier.modifyCell(table, columnNameOrAlias, rowIndex, cellValue);
                }
                table.emit({
                    type: 'afterSetCell',
                    cellValue,
                    columnName: columnNameOrAlias,
                    detail: eventDetail,
                    rowIndex
                });
            }
            /**
             * Sets cell values for a column. Will insert a new column, if not found.
             *
             * @function Highcharts.DataTable#setColumn
             *
             * @param {string} columnNameOrAlias
             * Column name or alias to set.
             *
             * @param {Highcharts.DataTableColumn} [column]
             * Values to set in the column.
             *
             * @param {number} [rowIndex=0]
             * Index of the first row to change. (Default: 0)
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits #setColumns
             * @emits #afterSetColumns
             */
            setColumn(columnNameOrAlias, column = [], rowIndex = 0, eventDetail) {
                this.setColumns({ [columnNameOrAlias]: column }, rowIndex, eventDetail);
            }
            /**
             * Sets cell values for multiple columns. Will insert new columns, if not
             * found.
             *
             * @function Highcharts.DataTable#setColumns
             *
             * @param {Highcharts.DataTableColumnCollection} columns
             * Columns as a collection, where the keys are the column names or aliases.
             *
             * @param {number} [rowIndex]
             * Index of the first row to change. Keep undefined to reset.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits #setColumns
             * @emits #afterSetColumns
             */
            setColumns(columns, rowIndex, eventDetail) {
                const table = this, tableColumns = table.columns, tableModifier = table.modifier, reset = (typeof rowIndex === 'undefined'), columnNames = Object.keys(columns);
                table.emit({
                    type: 'setColumns',
                    columns,
                    columnNames,
                    detail: eventDetail,
                    rowIndex
                });
                for (let i = 0, iEnd = columnNames.length, column, columnName; i < iEnd; ++i) {
                    columnName = columnNames[i];
                    column = columns[columnName];
                    columnName = (table.aliases[columnName] ||
                        columnName);
                    if (reset) {
                        tableColumns[columnName] = column.slice();
                        table.rowCount = column.length;
                    }
                    else {
                        const tableColumn = (tableColumns[columnName] ?
                            tableColumns[columnName] :
                            tableColumns[columnName] = new Array(table.rowCount));
                        for (let i = (rowIndex || 0), iEnd = column.length; i < iEnd; ++i) {
                            tableColumn[i] = column[i];
                        }
                        table.rowCount = Math.max(table.rowCount, tableColumn.length);
                    }
                }
                const tableColumnNames = Object.keys(tableColumns);
                for (let i = 0, iEnd = tableColumnNames.length; i < iEnd; ++i) {
                    tableColumns[tableColumnNames[i]].length = table.rowCount;
                }
                if (tableModifier) {
                    tableModifier.modifyColumns(table, columns, (rowIndex || 0));
                }
                table.emit({
                    type: 'afterSetColumns',
                    columns,
                    columnNames,
                    detail: eventDetail,
                    rowIndex
                });
            }
            /**
             * Sets or unsets the modifier for the table.
             * @private
             *
             * @param {Highcharts.DataModifier} [modifier]
             * Modifier to set, or `undefined` to unset.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Promise<Highcharts.DataTable>}
             * Resolves to this table if successfull, or rejects on failure.
             *
             * @emits #setModifier
             * @emits #afterSetModifier
             */
            setModifier(modifier, eventDetail) {
                const table = this;
                let promise;
                table.emit({
                    type: 'setModifier',
                    detail: eventDetail,
                    modifier,
                    modified: table.modified
                });
                table.modified = table;
                table.modifier = modifier;
                if (modifier) {
                    promise = modifier.modify(table);
                }
                else {
                    promise = Promise.resolve(table);
                }
                return promise
                    .then((table) => {
                    table.emit({
                        type: 'afterSetModifier',
                        detail: eventDetail,
                        modifier,
                        modified: table.modified
                    });
                    return table;
                })['catch']((error) => {
                    table.emit({
                        type: 'setModifierError',
                        error,
                        modifier,
                        modified: table.modified
                    });
                    throw error;
                });
            }
            /**
             * Sets cell values of a row. Will insert a new row, if no index was
             * provided, or if the index is higher than the total number of table rows.
             *
             * Note: This function is just a simplified wrap of
             * {@link Highcharts.DataTable#setRows}.
             *
             * @function Highcharts.DataTable#setRow
             *
             * @param {Highcharts.DataTableRow|Highcharts.DataTableRowObject} row
             * Cell values to set.
             *
             * @param {number} [rowIndex]
             * Index of the row to set. Leave `undefind` to add as a new row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits #setRows
             * @emits #afterSetRows
             */
            setRow(row, rowIndex, eventDetail) {
                this.setRows([row], rowIndex, eventDetail);
            }
            /**
             * Sets cell values for multiple rows. Will insert new rows, if no index was
             * was provided, or if the index is higher than the total number of table
             * rows.
             *
             * @function Highcharts.DataTable#setRows
             *
             * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
             * Row values to set.
             *
             * @param {number} [rowIndex]
             * Index of the first row to set. Leave `undefind` to add as new rows.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits #setRows
             * @emits #afterSetRows
             */
            setRows(rows, rowIndex = this.rowCount, eventDetail) {
                const table = this, aliases = table.aliases, columns = table.columns, columnNames = Object.keys(columns), modifier = table.modifier, rowCount = rows.length;
                table.emit({
                    type: 'setRows',
                    detail: eventDetail,
                    rowCount,
                    rowIndex,
                    rows
                });
                for (let i = 0, i2 = rowIndex, row; i < rowCount; ++i, ++i2) {
                    row = rows[i];
                    if (row === DataTable.NULL) {
                        for (let j = 0, jEnd = columnNames.length; j < jEnd; ++j) {
                            columns[columnNames[j]][i2] = null;
                        }
                    }
                    else if (row instanceof Array) {
                        for (let j = 0, jEnd = columnNames.length; j < jEnd; ++j) {
                            columns[columnNames[j]][i2] = row[j];
                        }
                    }
                    else {
                        const rowColumnNames = Object.keys(row);
                        for (let j = 0, jEnd = rowColumnNames.length, rowColumnName; j < jEnd; ++j) {
                            rowColumnName = rowColumnNames[j];
                            rowColumnName = (aliases[rowColumnName] || rowColumnName);
                            if (!columns[rowColumnName]) {
                                columns[rowColumnName] = new Array(i2 + 1);
                            }
                            columns[rowColumnName][i2] = row[rowColumnName];
                        }
                    }
                }
                const indexRowCount = (rowIndex + rowCount);
                if (indexRowCount > table.rowCount) {
                    table.rowCount = indexRowCount;
                    for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                        columns[columnNames[i]].length = indexRowCount;
                    }
                }
                if (modifier) {
                    modifier.modifyRows(table, rows, rowIndex);
                }
                table.emit({
                    type: 'afterSetRows',
                    detail: eventDetail,
                    rowCount,
                    rowIndex,
                    rows
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Null state for a row record. In some cases, a row in a table may not
         * contain any data or may be invalid. In these cases, a null state can be
         * used to indicate that the row record is empty or invalid.
         *
         * @name Highcharts.DataTable.NULL
         * @type {Highcharts.DataTableRowObject}
         *
         * @see {@link Highcharts.DataTable.isNull} for a null test.
         *
         * @example
         * table.setRows([DataTable.NULL, DataTable.NULL], 10);
         */
        DataTable.NULL = {};
        /**
         * Semantic version string of the DataTable class.
         * @internal
         */
        DataTable.version = '1.0.0';
        /* *
         *
         *  Default Export
         *
         * */

        return DataTable;
    });
    _registerModule(_modules, 'Data/Connectors/DataConnector.js', [_modules['Data/Modifiers/DataModifier.js'], _modules['Data/DataTable.js'], _modules['Core/Utilities.js']], function (DataModifier, DataTable, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *
         * */
        const { addEvent, fireEvent, merge, pick } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Abstract class providing an interface for managing a DataConnector.
         *
         * @private
         */
        class DataConnector {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructor for the connector class.
             *
             * @param {DataConnector.UserOptions} [options]
             * Options to use in the connector.
             */
            constructor(options = {}) {
                this.table = new DataTable(options.dataTable);
                this.metadata = options.metadata || { columns: {} };
            }
            /**
             * Poll timer ID, if active.
             */
            get polling() {
                return !!this.polling;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Method for adding metadata for a single column.
             *
             * @param {string} name
             * The name of the column to be described.
             *
             * @param {DataConnector.MetaColumn} columnMeta
             * The metadata to apply to the column.
             */
            describeColumn(name, columnMeta) {
                const connector = this, columns = connector.metadata.columns;
                columns[name] = merge(columns[name] || {}, columnMeta);
            }
            /**
             * Method for applying columns meta information to the whole DataConnector.
             *
             * @param {Highcharts.Dictionary<DataConnector.MetaColumn>} columns
             * Pairs of column names and MetaColumn objects.
             */
            describeColumns(columns) {
                const connector = this, columnNames = Object.keys(columns);
                let columnName;
                while (typeof (columnName = columnNames.pop()) === 'string') {
                    connector.describeColumn(columnName, columns[columnName]);
                }
            }
            /**
             * Emits an event on the connector to all registered callbacks of this
             * event.
             *
             * @param {DataConnector.Event} [e]
             * Event object containing additional event information.
             */
            emit(e) {
                fireEvent(this, e.type, e);
            }
            /**
             * Returns the order of columns.
             *
             * @param {boolean} [usePresentationState]
             * Whether to use the column order of the presentation state of the table.
             *
             * @return {Array<string>|undefined}
             * Order of columns.
             */
            getColumnOrder(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            usePresentationState) {
                const connector = this, columns = connector.metadata.columns, names = Object.keys(columns || {});
                if (names.length) {
                    return names.sort((a, b) => (pick(columns[a].index, 0) - pick(columns[b].index, 0)));
                }
            }
            /**
             * Retrieves the columns of the dataTable,
             * applies column order from meta.
             *
             * @param {boolean} [usePresentationOrder]
             * Whether to use the column order of the presentation state of the table.
             *
             * @return {Highcharts.DataTableColumnCollection}
             * An object with the properties `columnNames` and `columnValues`
             */
            getSortedColumns(usePresentationOrder) {
                return this.table.getColumns(this.getColumnOrder(usePresentationOrder));
            }
            /**
             * The default load method, which fires the `afterLoad` event
             *
             * @return {Promise<DataConnector>}
             * The loaded connector.
             *
             * @emits DataConnector#afterLoad
             */
            load() {
                fireEvent(this, 'afterLoad', { table: this.table });
                return Promise.resolve(this);
            }
            /**
             * Registers a callback for a specific connector event.
             *
             * @param {string} type
             * Event type as a string.
             *
             * @param {DataEventEmitter.Callback} callback
             * Function to register for the connector callback.
             *
             * @return {Function}
             * Function to unregister callback from the connector event.
             */
            on(type, callback) {
                return addEvent(this, type, callback);
            }
            /**
             * The default save method, which fires the `afterSave` event.
             *
             * @return {Promise<DataConnector>}
             * The saved connector.
             *
             * @emits DataConnector#afterSave
             * @emits DataConnector#saveError
             */
            save() {
                fireEvent(this, 'saveError', { table: this.table });
                return Promise.reject(new Error('Not implemented'));
            }
            /**
             * Sets the index and order of columns.
             *
             * @param {Array<string>} columnNames
             * Order of columns.
             */
            setColumnOrder(columnNames) {
                const connector = this;
                for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                    connector.describeColumn(columnNames[i], { index: i });
                }
            }
            setModifierOptions(modifierOptions) {
                const ModifierClass = (modifierOptions &&
                    DataModifier.types[modifierOptions.type]);
                return this.table
                    .setModifier(ModifierClass ?
                    new ModifierClass(modifierOptions) :
                    void 0)
                    .then(() => this);
            }
            /**
             * Starts polling new data after the specific time span in milliseconds.
             *
             * @param {number} refreshTime
             * Refresh time in milliseconds between polls.
             */
            startPolling(refreshTime = 1000) {
                const connector = this;
                window.clearTimeout(connector._polling);
                connector._polling = window.setTimeout(() => connector
                    .load()['catch']((error) => connector.emit({
                    type: 'loadError',
                    error,
                    table: connector.table
                }))
                    .then(() => {
                    if (connector._polling) {
                        connector.startPolling(refreshTime);
                    }
                }), refreshTime);
            }
            /**
             * Stops polling data.
             */
            stopPolling() {
                const connector = this;
                window.clearTimeout(connector._polling);
                delete connector._polling;
            }
            /**
             * Retrieves metadata from a single column.
             *
             * @param {string} name
             * The identifier for the column that should be described
             *
             * @return {DataConnector.MetaColumn|undefined}
             * Returns a MetaColumn object if found.
             */
            whatIs(name) {
                return this.metadata.columns[name];
            }
        }
        /* *
         *
         *  Class Namespace
         *
         * */
        (function (DataConnector) {
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
             * Registry as a record object with connector names and their class.
             */
            DataConnector.types = {};
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Adds a connector class to the registry. The connector has to provide the
             * `DataConnector.options` property and the `DataConnector.load` method to
             * modify the table.
             *
             * @private
             *
             * @param {string} key
             * Registry key of the connector class.
             *
             * @param {DataConnectorType} DataConnectorClass
             * Connector class (aka class constructor) to register.
             *
             * @return {boolean}
             * Returns true, if the registration was successful. False is returned, if
             * their is already a connector registered with this key.
             */
            function registerType(key, DataConnectorClass) {
                return (!!key &&
                    !DataConnector.types[key] &&
                    !!(DataConnector.types[key] = DataConnectorClass));
            }
            DataConnector.registerType = registerType;
        })(DataConnector || (DataConnector = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return DataConnector;
    });
    _registerModule(_modules, 'Data/DataCursor.js', [], function () {
        /* *
         *
         *  (c) 2020-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Class
         *
         * */
        /**
         * This class manages state cursors pointing on {@link Data.DataTable}. It
         * creates a relation between states of the user interface and the table cells,
         * columns, or rows.
         *
         * @class
         * @name Data.DataCursor
         */
        class DataCursor {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(stateMap = {}) {
                this.emittingRegister = [];
                this.listenerMap = {};
                this.stateMap = stateMap;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * This function registers a listener for a specific state and table.
             *
             * @example
             * ```TypeScript
             * dataCursor.addListener(myTable.id, 'hover', (e: DataCursor.Event) => {
             *     if (e.cursor.type === 'position') {
             *         console.log(`Hover over row #${e.cursor.row}.`);
             *     }
             * });
             * ```
             *
             * @function #addListener
             *
             * @param {Data.DataCursor.TableId} tableId
             * The ID of the table to listen to.
             *
             * @param {Data.DataCursor.State} state
             * The state on the table to listen to.
             *
             * @param {Data.DataCursor.Listener} listener
             * The listener to register.
             *
             * @return {Data.DataCursor}
             * Returns the DataCursor instance for a call chain.
             */
            addListener(tableId, state, listener) {
                const listenerMap = this.listenerMap[tableId] = (this.listenerMap[tableId] ||
                    {});
                const listeners = listenerMap[state] = (listenerMap[state] ||
                    []);
                listeners.push(listener);
                return this;
            }
            /**
             * @private
             */
            buildEmittingTag(e) {
                return (e.cursor.type === 'position' ?
                    [
                        e.table.id,
                        e.cursor.column,
                        e.cursor.row,
                        e.cursor.state,
                        e.cursor.type
                    ] :
                    [
                        e.table.id,
                        e.cursor.columns,
                        e.cursor.firstRow,
                        e.cursor.lastRow,
                        e.cursor.state,
                        e.cursor.type
                    ]).join('\0');
            }
            // Implementation
            emitCursor(table, groupOrCursor, cursorOrEvent, eventOrLasting, lasting) {
                const cursor = (typeof groupOrCursor === 'object' ?
                    groupOrCursor :
                    cursorOrEvent), event = (typeof eventOrLasting === 'object' ?
                    eventOrLasting :
                    cursorOrEvent), group = (typeof groupOrCursor === 'string' ?
                    groupOrCursor :
                    void 0), tableId = table.id, state = cursor.state, listeners = (this.listenerMap[tableId] &&
                    this.listenerMap[tableId][state]);
                lasting = (lasting || eventOrLasting === true);
                if (listeners) {
                    const stateMap = this.stateMap[tableId] = (this.stateMap[tableId] ||
                        {});
                    const cursors = stateMap[cursor.state] || [];
                    if (lasting) {
                        if (!cursors.length) {
                            stateMap[cursor.state] = cursors;
                        }
                        if (DataCursor.getIndex(cursor, cursors) === -1) {
                            cursors.push(cursor);
                        }
                    }
                    const e = {
                        cursor,
                        cursors,
                        table
                    };
                    if (event) {
                        e.event = event;
                    }
                    if (group) {
                        e.group = group;
                    }
                    const emittingRegister = this.emittingRegister, emittingTag = this.buildEmittingTag(e);
                    if (emittingRegister.indexOf(emittingTag) >= 0) {
                        // Break call stack loops
                        return this;
                    }
                    try {
                        this.emittingRegister.push(emittingTag);
                        for (let i = 0, iEnd = listeners.length; i < iEnd; ++i) {
                            listeners[i].call(this, e);
                        }
                    }
                    finally {
                        const index = this.emittingRegister.indexOf(emittingTag);
                        if (index >= 0) {
                            this.emittingRegister.splice(index, 1);
                        }
                    }
                }
                return this;
            }
            /**
             * Removes a lasting state cursor.
             *
             * @function #remitCursor
             *
             * @param {string} tableId
             * ID of the related cursor table.
             *
             * @param {Data.DataCursor.Type} cursor
             * Copy or reference of the cursor.
             *
             * @return {Data.DataCursor}
             * Returns the DataCursor instance for a call chain.
             */
            remitCursor(tableId, cursor) {
                const cursors = (this.stateMap[tableId] &&
                    this.stateMap[tableId][cursor.state]);
                if (cursors) {
                    const index = DataCursor.getIndex(cursor, cursors);
                    if (index >= 0) {
                        cursors.splice(index, 1);
                    }
                }
                return this;
            }
            /**
             * This function removes a listener.
             *
             * @function #addListener
             *
             * @param {Data.DataCursor.TableId} tableId
             * The ID of the table the listener is connected to.
             *
             * @param {Data.DataCursor.State} state
             * The state on the table the listener is listening to.
             *
             * @param {Data.DataCursor.Listener} listener
             * The listener to deregister.
             *
             * @return {Data.DataCursor}
             * Returns the DataCursor instance for a call chain.
             */
            removeListener(tableId, state, listener) {
                const listeners = (this.listenerMap[tableId] &&
                    this.listenerMap[tableId][state]);
                if (listeners) {
                    const index = listeners.indexOf(listener);
                    if (index) {
                        listeners.splice(index, 1);
                    }
                }
                return this;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Semantic version string of the DataCursor class.
         * @internal
         */
        DataCursor.version = '1.0.0';
        /* *
         *
         *  Class Namespace
         *
         * */
        /**
         * @class Data.DataCursor
         */
        (function (DataCursor) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Finds the index of an cursor in an array.
             * @private
             */
            function getIndex(needle, cursors) {
                if (needle.type === 'position') {
                    for (let cursor, i = 0, iEnd = cursors.length; i < iEnd; ++i) {
                        cursor = cursors[i];
                        if (cursor.type === 'position' &&
                            cursor.state === needle.state &&
                            cursor.column === needle.column &&
                            cursor.row === needle.row) {
                            return i;
                        }
                    }
                }
                else {
                    const columnNeedle = JSON.stringify(needle.columns);
                    for (let cursor, i = 0, iEnd = cursors.length; i < iEnd; ++i) {
                        cursor = cursors[i];
                        if (cursor.type === 'range' &&
                            cursor.state === needle.state &&
                            cursor.firstRow === needle.firstRow &&
                            cursor.lastRow === needle.lastRow &&
                            JSON.stringify(cursor.columns) === columnNeedle) {
                            return i;
                        }
                    }
                }
                return -1;
            }
            DataCursor.getIndex = getIndex;
            /**
             * Checks whether two cursor share the same properties.
             * @private
             */
            function isEqual(cursorA, cursorB) {
                if (cursorA.type === 'position' && cursorB.type === 'position') {
                    return (cursorA.column === cursorB.column &&
                        cursorA.row === cursorB.row &&
                        cursorA.state === cursorB.state);
                }
                if (cursorA.type === 'range' && cursorB.type === 'range') {
                    return (cursorA.firstRow === cursorB.firstRow &&
                        cursorA.lastRow === cursorB.lastRow &&
                        (JSON.stringify(cursorA.columns) ===
                            JSON.stringify(cursorB.columns)));
                }
                return false;
            }
            DataCursor.isEqual = isEqual;
            /**
             * Checks whether a cursor is in a range.
             * @private
             */
            function isInRange(needle, range) {
                if (range.type === 'position') {
                    range = toRange(range);
                }
                if (needle.type === 'position') {
                    needle = toRange(needle, range);
                }
                const needleColumns = needle.columns;
                const rangeColumns = range.columns;
                return (needle.firstRow >= range.firstRow &&
                    needle.lastRow <= range.lastRow &&
                    (!needleColumns ||
                        !rangeColumns ||
                        needleColumns.every((column) => rangeColumns.indexOf(column) >= 0)));
            }
            DataCursor.isInRange = isInRange;
            /**
             * @private
             */
            function toPositions(cursor) {
                if (cursor.type === 'position') {
                    return [cursor];
                }
                const columns = (cursor.columns || []);
                const positions = [];
                const state = cursor.state;
                for (let row = cursor.firstRow, rowEnd = cursor.lastRow; row < rowEnd; ++row) {
                    if (!columns.length) {
                        positions.push({
                            type: 'position',
                            row,
                            state
                        });
                        continue;
                    }
                    for (let column = 0, columnEnd = columns.length; column < columnEnd; ++column) {
                        positions.push({
                            type: 'position',
                            column: columns[column],
                            row,
                            state
                        });
                    }
                }
                return positions;
            }
            DataCursor.toPositions = toPositions;
            /**
             * @private
             */
            function toRange(cursor, defaultRange) {
                if (cursor.type === 'range') {
                    return cursor;
                }
                const range = {
                    type: 'range',
                    firstRow: (cursor.row ??
                        (defaultRange && defaultRange.firstRow) ??
                        0),
                    lastRow: (cursor.row ??
                        (defaultRange && defaultRange.lastRow) ??
                        Number.MAX_VALUE),
                    state: cursor.state
                };
                if (typeof cursor.column !== 'undefined') {
                    range.columns = [cursor.column];
                }
                return range;
            }
            DataCursor.toRange = toRange;
        })(DataCursor || (DataCursor = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return DataCursor;
    });
    _registerModule(_modules, 'DataGrid/DataGridUtils.js', [], function () {
        /* *
         *
         *  Data Grid utilities
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Øystein Moseng
         *
         * */
        /* *
         *
         *  Functions
         *
         * */
        const DataGridUtils = {
            dataTableCellToString(cell) {
                return typeof cell === 'string' ||
                    typeof cell === 'number' ||
                    typeof cell === 'boolean' ?
                    '' + cell :
                    '';
            },
            emptyHTMLElement(element) {
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
            },
            makeDiv: (className, id) => {
                const div = document.createElement('div');
                div.className = className;
                if (id) {
                    div.id = id;
                }
                return div;
            }
        };
        /* *
         *
         *  Default Export
         *
         * */

        return DataGridUtils;
    });
    _registerModule(_modules, 'DataGrid/Globals.js', [], function () {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
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
        /* *
         *
         *  Imports
         *
         * */
        /* *
         *
         *  Namespace
         *
         * */
        /**
         * Global DataGrid namespace.
         *
         * @namespace DataGrid
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
            Globals.classNamePrefix = 'highcharts-datagrid-';
            Globals.classNames = {
                gridContainer: Globals.classNamePrefix + 'container',
                outerContainer: Globals.classNamePrefix + 'outer-container',
                scrollContainer: Globals.classNamePrefix + 'scroll-container',
                innerContainer: Globals.classNamePrefix + 'inner-container',
                cell: Globals.classNamePrefix + 'cell',
                cellInput: Globals.classNamePrefix + 'cell-input',
                row: Globals.classNamePrefix + 'row',
                columnHeader: Globals.classNamePrefix + 'column-header'
            };
            Globals.win = window;
            Globals.userAgent = (Globals.win.navigator && Globals.win.navigator.userAgent) || '';
            Globals.isChrome = Globals.userAgent.indexOf('Chrome') !== -1;
            Globals.isSafari = !Globals.isChrome && Globals.userAgent.indexOf('Safari') !== -1;
        })(Globals || (Globals = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return Globals;
    });
    _registerModule(_modules, 'Core/Chart/ChartDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /**
         * General options for the chart.
         *
         * @optionparent chart
         */
        const ChartDefaults = {
            /**
             * Default `mapData` for all series, in terms of a GeoJSON or TopoJSON
             * object. If set to a string, it functions as an index into the
             * `Highcharts.maps` array.
             *
             * For picking out individual shapes and geometries to use for each series
             * of the map, see [series.mapData](#series.map.mapData).
             *
             * @sample    maps/demo/geojson
             *            Loading GeoJSON data
             * @sample    maps/chart/topojson
             *            Loading TopoJSON data
             *
             * @type      {string|Array<*>|Highcharts.GeoJSON|Highcharts.TopoJSON}
             * @since     5.0.0
             * @product   highmaps
             * @apioption chart.map
             */
            /**
             * Set lat/lon transformation definitions for the chart. If not defined,
             * these are extracted from the map data.
             *
             * @type      {*}
             * @since     5.0.0
             * @product   highmaps
             * @apioption chart.mapTransforms
             */
            /**
             * When using multiple axes, the ticks of two or more opposite axes
             * will automatically be aligned by adding ticks to the axis or axes
             * with the least ticks, as if `tickAmount` were specified.
             *
             * This can be prevented by setting `alignTicks` to false. If the grid
             * lines look messy, it's a good idea to hide them for the secondary
             * axis by setting `gridLineWidth` to 0.
             *
             * If `startOnTick` or `endOnTick` in the axis options are set to false,
             * then the `alignTicks ` will be disabled for the axis.
             *
             * Disabled for logarithmic axes.
             *
             * @sample {highcharts} highcharts/chart/alignticks-true/
             *         True by default
             * @sample {highcharts} highcharts/chart/alignticks-false/
             *         False
             * @sample {highstock} stock/chart/alignticks-true/
             *         True by default
             * @sample {highstock} stock/chart/alignticks-false/
             *         False
             *
             * @type      {boolean}
             * @default   true
             * @product   highcharts highstock gantt
             * @apioption chart.alignTicks
             */
            /**
             * When using multiple axes, align the thresholds. When this is true, other
             * ticks will also be aligned.
             *
             * Note that for line series and some other series types, the `threshold`
             * option is set to `null` by default. This will in turn cause their y-axis
             * to not have a threshold. In order to avoid that, set the series
             * `threshold` to 0 or another number.
             *
             * If `startOnTick` or `endOnTick` in the axis options are set to false, or
             * if the axis is logarithmic, the threshold will not be aligned.
             *
             * @sample {highcharts} highcharts/chart/alignthresholds/ Set to true
             *
             * @since 10.0.0
             * @product   highcharts highstock gantt
             * @apioption chart.alignThresholds
             */
            alignThresholds: false,
            /**
             * Set the overall animation for all chart updating. Animation can be
             * disabled throughout the chart by setting it to false here. It can
             * be overridden for each individual API method as a function parameter.
             * The only animation not affected by this option is the initial series
             * animation, see [plotOptions.series.animation](
             * #plotOptions.series.animation).
             *
             * The animation can either be set as a boolean or a configuration
             * object. If `true`, it will use the 'swing' jQuery easing and a
             * duration of 500 ms. If used as a configuration object, the following
             * properties are supported:
             *
             * - `defer`: The animation delay time in milliseconds.
             *
             * - `duration`: The duration of the animation in milliseconds.
             *
             * - `easing`: A string reference to an easing function set on the
             *   `Math` object. See
             *   [the easing demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-animation-easing/).
             *
             * When zooming on a series with less than 100 points, the chart redraw
             * will be done with animation, but in case of more data points, it is
             * necessary to set this option to ensure animation on zoom.
             *
             * @sample {highcharts} highcharts/chart/animation-none/
             *         Updating with no animation
             * @sample {highcharts} highcharts/chart/animation-duration/
             *         With a longer duration
             * @sample {highcharts} highcharts/chart/animation-easing/
             *         With a jQuery UI easing
             * @sample {highmaps} maps/chart/animation-none/
             *         Updating with no animation
             * @sample {highmaps} maps/chart/animation-duration/
             *         With a longer duration
             *
             * @type      {boolean|Partial<Highcharts.AnimationOptionsObject>}
             * @default   true
             * @apioption chart.animation
             */
            /**
             * A CSS class name to apply to the charts container `div`, allowing
             * unique CSS styling for each chart.
             *
             * @type      {string}
             * @apioption chart.className
             */
            /**
             * Event listeners for the chart.
             *
             * @apioption chart.events
             */
            /**
             * Fires when a series is added to the chart after load time, using the
             * `addSeries` method. One parameter, `event`, is passed to the
             * function, containing common event information. Through
             * `event.options` you can access the series options that were passed to
             * the `addSeries` method. Returning false prevents the series from
             * being added.
             *
             * @sample {highcharts} highcharts/chart/events-addseries/
             *         Alert on add series
             * @sample {highstock} stock/chart/events-addseries/
             *         Alert on add series
             *
             * @type      {Highcharts.ChartAddSeriesCallbackFunction}
             * @since     1.2.0
             * @context   Highcharts.Chart
             * @apioption chart.events.addSeries
             */
            /**
             * Fires when clicking on the plot background. One parameter, `event`,
             * is passed to the function, containing common event information.
             *
             * Information on the clicked spot can be found through `event.xAxis`
             * and `event.yAxis`, which are arrays containing the axes of each
             * dimension and each axis' value at the clicked spot. The primary axes
             * are `event.xAxis[0]` and `event.yAxis[0]`. Remember the unit of a
             * datetime axis is milliseconds since 1970-01-01 00:00:00.
             *
             * ```js
             * click: function(e) {
             *     console.log(
             *         Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', e.xAxis[0].value),
             *         e.yAxis[0].value
             *     )
             * }
             * ```
             *
             * @sample {highcharts} highcharts/chart/events-click/
             *         Alert coordinates on click
             * @sample {highcharts} highcharts/chart/events-container/
             *         Alternatively, attach event to container
             * @sample {highstock} stock/chart/events-click/
             *         Alert coordinates on click
             * @sample {highstock} highcharts/chart/events-container/
             *         Alternatively, attach event to container
             * @sample {highmaps} maps/chart/events-click/
             *         Record coordinates on click
             * @sample {highmaps} highcharts/chart/events-container/
             *         Alternatively, attach event to container
             *
             * @type      {Highcharts.ChartClickCallbackFunction}
             * @since     1.2.0
             * @context   Highcharts.Chart
             * @apioption chart.events.click
             */
            /**
             * Fires when the chart is finished loading. Since v4.2.2, it also waits
             * for images to be loaded, for example from point markers. One
             * parameter, `event`, is passed to the function, containing common
             * event information.
             *
             * There is also a second parameter to the chart constructor where a
             * callback function can be passed to be executed on chart.load.
             *
             * @sample {highcharts} highcharts/chart/events-load/
             *         Alert on chart load
             * @sample {highcharts} highcharts/chart/events-render/
             *         Load vs Redraw vs Render
             * @sample {highstock} stock/chart/events-load/
             *         Alert on chart load
             * @sample {highmaps} maps/chart/events-load/
             *         Add series on chart load
             *
             * @type      {Highcharts.ChartLoadCallbackFunction}
             * @context   Highcharts.Chart
             * @apioption chart.events.load
             */
            /**
             * Fires when the chart is redrawn, either after a call to
             * `chart.redraw()` or after an axis, series or point is modified with
             * the `redraw` option set to `true`. One parameter, `event`, is passed
             * to the function, containing common event information.
             *
             * @sample {highcharts} highcharts/chart/events-redraw/
             *         Alert on chart redraw
             * @sample {highcharts} highcharts/chart/events-render/
             *         Load vs Redraw vs Render
             * @sample {highstock} stock/chart/events-redraw/
             *         Alert on chart redraw when adding a series or moving the
             *         zoomed range
             * @sample {highmaps} maps/chart/events-redraw/
             *         Set subtitle on chart redraw
             *
             * @type      {Highcharts.ChartRedrawCallbackFunction}
             * @since     1.2.0
             * @context   Highcharts.Chart
             * @apioption chart.events.redraw
             */
            /**
             * Fires after initial load of the chart (directly after the `load`
             * event), and after each redraw (directly after the `redraw` event).
             *
             * @sample {highcharts} highcharts/chart/events-render/
             *         Load vs Redraw vs Render
             *
             * @type      {Highcharts.ChartRenderCallbackFunction}
             * @since     5.0.7
             * @context   Highcharts.Chart
             * @apioption chart.events.render
             */
            /**
             * Fires when an area of the chart has been selected. Selection is
             * enabled by setting the chart's zoomType. One parameter, `event`, is
             * passed to the function, containing common event information. The
             * default action for the selection event is to zoom the chart to the
             * selected area. It can be prevented by calling
             * `event.preventDefault()` or return false.
             *
             * Information on the selected area can be found through `event.xAxis`
             * and `event.yAxis`, which are arrays containing the axes of each
             * dimension and each axis' min and max values. The primary axes are
             * `event.xAxis[0]` and `event.yAxis[0]`. Remember the unit of a
             * datetime axis is milliseconds since 1970-01-01 00:00:00.
             *
             * ```js
             * selection: function(event) {
             *     // log the min and max of the primary, datetime x-axis
             *     console.log(
             *         Highcharts.dateFormat(
             *             '%Y-%m-%d %H:%M:%S',
             *             event.xAxis[0].min
             *         ),
             *         Highcharts.dateFormat(
             *             '%Y-%m-%d %H:%M:%S',
             *             event.xAxis[0].max
             *         )
             *     );
             *     // log the min and max of the y axis
             *     console.log(event.yAxis[0].min, event.yAxis[0].max);
             * }
             * ```
             *
             * @sample {highcharts} highcharts/chart/events-selection/
             *         Report on selection and reset
             * @sample {highcharts} highcharts/chart/events-selection-points/
             *         Select a range of points through a drag selection
             * @sample {highstock} stock/chart/events-selection/
             *         Report on selection and reset
             * @sample {highstock} highcharts/chart/events-selection-points/
             *         Select a range of points through a drag selection
             *         (Highcharts)
             *
             * @type      {Highcharts.ChartSelectionCallbackFunction}
             * @apioption chart.events.selection
             */
            /**
             * The margin between the outer edge of the chart and the plot area.
             * The numbers in the array designate top, right, bottom and left
             * respectively. Use the options `marginTop`, `marginRight`,
             * `marginBottom` and `marginLeft` for shorthand setting of one option.
             *
             * By default there is no margin. The actual space is dynamically
             * calculated from the offset of axis labels, axis title, title,
             * subtitle and legend in addition to the `spacingTop`, `spacingRight`,
             * `spacingBottom` and `spacingLeft` options.
             *
             * @sample {highcharts} highcharts/chart/margins-zero/
             *         Zero margins
             * @sample {highstock} stock/chart/margin-zero/
             *         Zero margins
             *
             * @type      {number|Array<number>}
             * @apioption chart.margin
             */
            /**
             * The margin between the bottom outer edge of the chart and the plot
             * area. Use this to set a fixed pixel value for the margin as opposed
             * to the default dynamic margin. See also `spacingBottom`.
             *
             * @sample {highcharts} highcharts/chart/marginbottom/
             *         100px bottom margin
             * @sample {highstock} stock/chart/marginbottom/
             *         100px bottom margin
             * @sample {highmaps} maps/chart/margin/
             *         100px margins
             *
             * @type      {number}
             * @since     2.0
             * @apioption chart.marginBottom
             */
            /**
             * The margin between the left outer edge of the chart and the plot
             * area. Use this to set a fixed pixel value for the margin as opposed
             * to the default dynamic margin. See also `spacingLeft`.
             *
             * @sample {highcharts} highcharts/chart/marginleft/
             *         150px left margin
             * @sample {highstock} stock/chart/marginleft/
             *         150px left margin
             * @sample {highmaps} maps/chart/margin/
             *         100px margins
             *
             * @type      {number}
             * @since     2.0
             * @apioption chart.marginLeft
             */
            /**
             * The margin between the right outer edge of the chart and the plot
             * area. Use this to set a fixed pixel value for the margin as opposed
             * to the default dynamic margin. See also `spacingRight`.
             *
             * @sample {highcharts} highcharts/chart/marginright/
             *         100px right margin
             * @sample {highstock} stock/chart/marginright/
             *         100px right margin
             * @sample {highmaps} maps/chart/margin/
             *         100px margins
             *
             * @type      {number}
             * @since     2.0
             * @apioption chart.marginRight
             */
            /**
             * The margin between the top outer edge of the chart and the plot area.
             * Use this to set a fixed pixel value for the margin as opposed to
             * the default dynamic margin. See also `spacingTop`.
             *
             * @sample {highcharts} highcharts/chart/margintop/ 100px top margin
             * @sample {highstock} stock/chart/margintop/
             *         100px top margin
             * @sample {highmaps} maps/chart/margin/
             *         100px margins
             *
             * @type      {number}
             * @since     2.0
             * @apioption chart.marginTop
             */
            /**
             * Callback function to override the default function that formats all
             * the numbers in the chart. Returns a string with the formatted number.
             *
             * @sample highcharts/members/highcharts-numberformat
             *      Arabic digits in Highcharts
             * @type {Highcharts.NumberFormatterCallbackFunction}
             * @since 8.0.0
             * @apioption chart.numberFormatter
             */
            /**
             * When a chart with an x and a y-axis is rendered, we first pre-render the
             * labels of both in order to measure them. Then, if either of the axis
             * labels take up so much space that it significantly affects the length of
             * the other axis, we repeat the process.
             *
             * By default we stop at two axis layout runs, but it may be that the second
             * run also alter the space required by either axis, for example if it
             * causes the labels to rotate. In this situation, a subsequent redraw of
             * the chart may cause the tick and label placement to change for apparently
             * no reason.
             *
             * Use the `axisLayoutRuns` option to set the maximum allowed number of
             * repetitions. But keep in mind that the default value of 2 is set because
             * every run costs performance time.
             *
             * **Note:** Changing that option to higher than the default might decrease
             * performance significantly, especially with bigger sets of data.
             *
             * @type      {number}
             * @default   2
             * @since     @next
             * @apioption chart.axisLayoutRuns
             */
            /**
             * Allows setting a key to switch between zooming and panning. Can be
             * one of `alt`, `ctrl`, `meta` (the command key on Mac and Windows
             * key on Windows) or `shift`. The keys are mapped directly to the key
             * properties of the click event argument (`event.altKey`,
             * `event.ctrlKey`, `event.metaKey` and `event.shiftKey`).
             *
             * @type       {string}
             * @since      4.0.3
             * @product    highcharts gantt
             * @validvalue ["alt", "ctrl", "meta", "shift"]
             * @apioption  chart.panKey
             */
            /**
             * Allow panning in a chart. Best used with [panKey](#chart.panKey)
             * to combine zooming and panning.
             *
             * On touch devices, when the [tooltip.followTouchMove](
             * #tooltip.followTouchMove) option is `true` (default), panning
             * requires two fingers. To allow panning with one finger, set
             * `followTouchMove` to `false`.
             *
             * @sample  {highcharts} highcharts/chart/pankey/ Zooming and panning
             * @sample  {highstock} stock/chart/panning/ Zooming and xy panning
             */
            panning: {
                /**
                 * Enable or disable chart panning.
                 *
                 * @type      {boolean}
                 * @default   {highcharts} false
                 * @default   {highstock|highmaps} true
                 */
                enabled: false,
                /**
                 * Decides in what dimensions the user can pan the chart. Can be
                 * one of `x`, `y`, or `xy`.
                 *
                 * When this option is set to `y` or `xy`, [yAxis.startOnTick](#yAxis.startOnTick)
                 * and [yAxis.endOnTick](#yAxis.endOnTick) are overwritten to `false`.
                 *
                 * @sample {highcharts} highcharts/chart/panning-type
                 *         Zooming and xy panning
                 *
                 * @declare    Highcharts.OptionsChartPanningTypeValue
                 * @type       {string}
                 * @validvalue ["x", "y", "xy"]
                 * @default    {highcharts|highstock} x
                 * @product    highcharts highstock gantt
                 */
                type: 'x'
            },
            /**
             * Equivalent to [zoomType](#chart.zoomType), but for multitouch
             * gestures only. By default, the `pinchType` is the same as the
             * `zoomType` setting. However, pinching can be enabled separately in
             * some cases, for example in stock charts where a mouse drag pans the
             * chart, while pinching is enabled. When [tooltip.followTouchMove](
             * #tooltip.followTouchMove) is true, pinchType only applies to
             * two-finger touches.
             *
             * @type       {string}
             * @default    {highcharts} undefined
             * @default    {highstock} undefined
             * @since      3.0
             * @product    highcharts highstock gantt
             * @deprecated
             * @validvalue ["x", "y", "xy"]
             * @apioption  chart.pinchType
             */
            /**
             * Whether to apply styled mode. When in styled mode, no presentational
             * attributes or CSS are applied to the chart SVG. Instead, CSS rules
             * are required to style the chart. The default style sheet is
             * available from `https://code.highcharts.com/css/highcharts.css`.
             *
             * [Read more in the docs](https://www.highcharts.com/docs/chart-design-and-style/style-by-css)
             * on what classes and variables are available.
             *
             * @sample highcharts/css/colors
             *         Color theming with CSS
             * @sample highcharts/css/prefers-color-scheme
             *         Dynamic theme based on system settings
             * @type       {boolean}
             * @default    false
             * @since      7.0
             * @apioption  chart.styledMode
             */
            styledMode: false,
            /**
             * The corner radius of the outer chart border.
             *
             * @sample {highcharts} highcharts/chart/borderradius/
             *         20px radius
             * @sample {highstock} stock/chart/border/
             *         10px radius
             * @sample {highmaps} maps/chart/border/
             *         Border options
             *
             */
            borderRadius: 0,
            /**
             * In styled mode, this sets how many colors the class names
             * should rotate between. With ten colors, series (or points) are
             * given class names like `highcharts-color-0`, `highcharts-color-1`
             * [...] `highcharts-color-9`. The equivalent in non-styled mode
             * is to set colors using the [colors](#colors) setting.
             *
             * @since      5.0.0
             */
            colorCount: 10,
            /**
             * By default, (because of memory and performance reasons) the chart does
             * not copy the data but keeps it as a reference. In some cases, this might
             * result in mutating the original data source. In order to prevent that,
             * set that property to false. Please note that changing that might decrease
             * performance, especially with bigger sets of data.
             *
             * @type       {boolean}
             * @since 10.1.0
             */
            allowMutatingData: true,
            /**
             * If true, the axes will scale to the remaining visible series once
             * one series is hidden. If false, hiding and showing a series will
             * not affect the axes or the other series. For stacks, once one series
             * within the stack is hidden, the rest of the stack will close in
             * around it even if the axis is not affected.
             *
             * @sample {highcharts} highcharts/chart/ignorehiddenseries-true/
             *         True by default
             * @sample {highcharts} highcharts/chart/ignorehiddenseries-false/
             *         False
             * @sample {highcharts} highcharts/chart/ignorehiddenseries-true-stacked/
             *         True with stack
             * @sample {highstock} stock/chart/ignorehiddenseries-true/
             *         True by default
             * @sample {highstock} stock/chart/ignorehiddenseries-false/
             *         False
             *
             * @since   1.2.0
             * @product highcharts highstock gantt
             */
            ignoreHiddenSeries: true,
            /**
             * Whether to invert the axes so that the x axis is vertical and y axis
             * is horizontal. When `true`, the x axis is [reversed](#xAxis.reversed)
             * by default.
             *
             * @productdesc {highcharts}
             * If a bar series is present in the chart, it will be inverted
             * automatically. Inverting the chart doesn't have an effect if there
             * are no cartesian series in the chart.
             *
             * @sample {highcharts} highcharts/chart/inverted/
             *         Inverted line
             * @sample {highstock} stock/navigator/inverted/
             *         Inverted stock chart
             *
             * @type      {boolean}
             * @default   false
             * @product   highcharts highstock gantt
             * @apioption chart.inverted
             */
            /**
             * The distance between the outer edge of the chart and the content,
             * like title or legend, or axis title and labels if present. The
             * numbers in the array designate top, right, bottom and left
             * respectively. Use the options spacingTop, spacingRight, spacingBottom
             * and spacingLeft options for shorthand setting of one option.
             *
             * @type    {Array<number>}
             * @see     [chart.margin](#chart.margin)
             * @default [10, 10, 15, 10]
             * @since   3.0.6
             */
            spacing: [10, 10, 15, 10],
            /**
             * The button that appears after a selection zoom, allowing the user
             * to reset zoom. This option is deprecated in favor of
             * [zooming](#chart.zooming).
             *
             * @since      2.2
             * @deprecated 10.2.1
             */
            resetZoomButton: {
                /**
                 * What frame the button placement should be related to. Can be
                 * either `plotBox` or `spacingBox`.
                 *
                 * @sample {highcharts} highcharts/chart/resetzoombutton-relativeto/
                 *         Relative to the chart
                 * @sample {highstock} highcharts/chart/resetzoombutton-relativeto/
                 *         Relative to the chart
                 *
                 * @type      {Highcharts.ButtonRelativeToValue}
                 * @apioption chart.resetZoomButton.relativeTo
                 */
                /**
                 * A collection of attributes for the button. The object takes SVG
                 * attributes like `fill`, `stroke`, `stroke-width` or `r`, the
                 * border radius. The theme also supports `style`, a collection of
                 * CSS properties for the text. Equivalent attributes for the hover
                 * state are given in `theme.states.hover`.
                 *
                 * @sample {highcharts} highcharts/chart/resetzoombutton-theme/
                 *         Theming the button
                 * @sample {highstock} highcharts/chart/resetzoombutton-theme/
                 *         Theming the button
                 *
                 * @type {Highcharts.SVGAttributes}
                 */
                theme: {
                /**
                 * The z-index of the button.
                 *
                 * @type {number}
                 * @apioption chart.resetZoomButton.theme.zIndex
                 */
                },
                /**
                 * The position of the button.
                 *
                 * @sample {highcharts} highcharts/chart/resetzoombutton-position/
                 *         Above the plot area
                 * @sample {highstock} highcharts/chart/resetzoombutton-position/
                 *         Above the plot area
                 * @sample {highmaps} highcharts/chart/resetzoombutton-position/
                 *         Above the plot area
                 *
                 * @type {Highcharts.AlignObject}
                 */
                position: {
                /**
                 * The horizontal alignment of the button.
                 *
                 * @type {number}
                 * @apioption chart.resetZoomButton.position.align
                 */
                /**
                 * The horizontal offset of the button.
                 *
                 * @type {number}
                 * @apioption chart.resetZoomButton.position.x
                 */
                /**
                 * The vertical alignment of the button.
                 *
                 * @type      {Highcharts.VerticalAlignValue}
                 * @apioption chart.resetZoomButton.position.verticalAlign
                 */
                /**
                 * The vertical offset of the button.
                 *
                 * @type {number}
                 * @apioption chart.resetZoomButton.position.y
                 */
                }
            },
            /**
             * The pixel width of the plot area border.
             *
             * @sample {highcharts} highcharts/chart/plotborderwidth/
             *         1px border
             * @sample {highstock} stock/chart/plotborder/
             *         2px border
             * @sample {highmaps} maps/chart/plotborder/
             *         Plot border options
             *
             * @type      {number}
             * @default   0
             * @apioption chart.plotBorderWidth
             */
            /**
             * Whether to apply a drop shadow to the plot area. Requires that
             * plotBackgroundColor be set. The shadow can be an object configuration
             * containing `color`, `offsetX`, `offsetY`, `opacity` and `width`.
             *
             * @sample {highcharts} highcharts/chart/plotshadow/
             *         Plot shadow
             * @sample {highstock} stock/chart/plotshadow/
             *         Plot shadow
             * @sample {highmaps} maps/chart/plotborder/
             *         Plot border options
             *
             * @type      {boolean|Highcharts.ShadowOptionsObject}
             * @default   false
             * @apioption chart.plotShadow
             */
            /**
             * When true, cartesian charts like line, spline, area and column are
             * transformed into the polar coordinate system. This produces _polar
             * charts_, also known as _radar charts_.
             *
             * @sample {highcharts} highcharts/demo/polar/
             *         Polar chart
             * @sample {highcharts} highcharts/demo/polar-wind-rose/
             *         Wind rose, stacked polar column chart
             * @sample {highcharts} highcharts/demo/polar-spider/
             *         Spider web chart
             * @sample {highcharts} highcharts/parallel-coordinates/polar/
             *         Star plot, multivariate data in a polar chart
             *
             * @type      {boolean}
             * @default   false
             * @since     2.3.0
             * @product   highcharts
             * @requires  highcharts-more
             * @apioption chart.polar
             */
            /**
             * Whether to reflow the chart to fit the width of the container div
             * on resizing the window.
             *
             * @sample {highcharts} highcharts/chart/reflow-true/
             *         True by default
             * @sample {highcharts} highcharts/chart/reflow-false/
             *         False
             * @sample {highstock} stock/chart/reflow-true/
             *         True by default
             * @sample {highstock} stock/chart/reflow-false/
             *         False
             * @sample {highmaps} maps/chart/reflow-true/
             *         True by default
             * @sample {highmaps} maps/chart/reflow-false/
             *         False
             *
             * @since     2.1
             */
            reflow: true,
            /**
             * The HTML element where the chart will be rendered. If it is a string,
             * the element by that id is used. The HTML element can also be passed
             * by direct reference, or as the first argument of the chart
             * constructor, in which case the option is not needed.
             *
             * @sample {highcharts} highcharts/chart/reflow-true/
             *         String
             * @sample {highcharts} highcharts/chart/renderto-object/
             *         Object reference
             * @sample {highstock} stock/chart/renderto-string/
             *         String
             * @sample {highstock} stock/chart/renderto-object/
             *         Object reference
             *
             * @type      {string|Highcharts.HTMLDOMElement}
             * @apioption chart.renderTo
             */
            /**
             * The background color of the marker square when selecting (zooming
             * in on) an area of the chart.
             *
             * @see In styled mode, the selection marker fill is set with the
             *      `.highcharts-selection-marker` class.
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default   rgba(51,92,173,0.25)
             * @since     2.1.7
             * @apioption chart.selectionMarkerFill
             */
            /**
             * Whether to apply a drop shadow to the global series group. This causes
             * all the series to have the same shadow. Contrary to the `series.shadow`
             * option, this prevents items from casting shadows on each other, like for
             * others series in a stack. The shadow can be an object configuration
             * containing `color`, `offsetX`, `offsetY`, `opacity` and `width`.
             *
             * @sample highcharts/chart/seriesgroupshadow/ Shadow
             *
             * @type      {boolean|Highcharts.ShadowOptionsObject}
             * @default   false
             * @apioption chart.shadow
             */
            /**
             * Whether to apply a drop shadow to the outer chart area. Requires
             * that backgroundColor be set. The shadow can be an object
             * configuration containing `color`, `offsetX`, `offsetY`, `opacity` and
             * `width`.
             *
             * @sample {highcharts} highcharts/chart/shadow/
             *         Shadow
             * @sample {highstock} stock/chart/shadow/
             *         Shadow
             * @sample {highmaps} maps/chart/border/
             *         Chart border and shadow
             *
             * @type      {boolean|Highcharts.ShadowOptionsObject}
             * @default   false
             * @apioption chart.shadow
             */
            /**
             * Whether to show the axes initially. This only applies to empty charts
             * where series are added dynamically, as axes are automatically added
             * to cartesian series.
             *
             * @sample {highcharts} highcharts/chart/showaxes-false/
             *         False by default
             * @sample {highcharts} highcharts/chart/showaxes-true/
             *         True
             *
             * @type      {boolean}
             * @since     1.2.5
             * @product   highcharts gantt
             * @apioption chart.showAxes
             */
            /**
             * The space between the bottom edge of the chart and the content (plot
             * area, axis title and labels, title, subtitle or legend in top
             * position).
             *
             * @sample {highcharts} highcharts/chart/spacingbottom/
             *         Spacing bottom set to 100
             * @sample {highstock} stock/chart/spacingbottom/
             *         Spacing bottom set to 100
             * @sample {highmaps} maps/chart/spacing/
             *         Spacing 100 all around
             *
             * @type      {number}
             * @default   15
             * @since     2.1
             * @apioption chart.spacingBottom
             */
            /**
             * The space between the left edge of the chart and the content (plot
             * area, axis title and labels, title, subtitle or legend in top
             * position).
             *
             * @sample {highcharts} highcharts/chart/spacingleft/
             *         Spacing left set to 100
             * @sample {highstock} stock/chart/spacingleft/
             *         Spacing left set to 100
             * @sample {highmaps} maps/chart/spacing/
             *         Spacing 100 all around
             *
             * @type      {number}
             * @default   10
             * @since     2.1
             * @apioption chart.spacingLeft
             */
            /**
             * The space between the right edge of the chart and the content (plot
             * area, axis title and labels, title, subtitle or legend in top
             * position).
             *
             * @sample {highcharts} highcharts/chart/spacingright-100/
             *         Spacing set to 100
             * @sample {highcharts} highcharts/chart/spacingright-legend/
             *         Legend in right position with default spacing
             * @sample {highstock} stock/chart/spacingright/
             *         Spacing set to 100
             * @sample {highmaps} maps/chart/spacing/
             *         Spacing 100 all around
             *
             * @type      {number}
             * @default   10
             * @since     2.1
             * @apioption chart.spacingRight
             */
            /**
             * The space between the top edge of the chart and the content (plot
             * area, axis title and labels, title, subtitle or legend in top
             * position).
             *
             * @sample {highcharts} highcharts/chart/spacingtop-100/
             *         A top spacing of 100
             * @sample {highcharts} highcharts/chart/spacingtop-10/
             *         Floating chart title makes the plot area align to the default
             *         spacingTop of 10.
             * @sample {highstock} stock/chart/spacingtop/
             *         A top spacing of 100
             * @sample {highmaps} maps/chart/spacing/
             *         Spacing 100 all around
             *
             * @type      {number}
             * @default   10
             * @since     2.1
             * @apioption chart.spacingTop
             */
            /**
             * Additional CSS styles to apply inline to the container `div` and the root
             * SVG.
             *
             * According to the CSS syntax documentation, it is recommended to quote
             * font family names that contain white space, digits, or punctuation
             * characters other than hyphens. In such cases, wrap the fontFamily
             * name as follows: `fontFamily: '"Font name"'`.
             *
             * Since v11, the root font size is 1rem by default, and all child element
             * are given a relative `em` font size by default. This allows implementers
             * to control all the chart's font sizes by only setting the root level.
             *
             * @see    In styled mode, general chart styles can be set with the
             *         `.highcharts-root` class.
             * @sample {highcharts} highcharts/chart/style-serif-font/
             *         Using a serif type font
             * @sample {highcharts} highcharts/chart/style-special-font/
             *         Using a font with special character in name
             * @sample {highcharts} highcharts/members/relative-font-size/
             *         Relative font sizes
             * @sample {highcharts} highcharts/css/em/
             *         Styled mode with relative font sizes
             * @sample {highstock} stock/chart/style/
             *         Using a serif type font
             * @sample {highmaps} maps/chart/style-serif-font/
             *         Using a serif type font
             *
             * @type      {Highcharts.CSSObject}
             * @default   {"fontFamily": Helvetica, Arial, sans-serif","fontSize":"1rem"}
             * @apioption chart.style
             */
            /**
             * The default series type for the chart. Can be any of the chart types
             * listed under [plotOptions](#plotOptions) and [series](#series) or can
             * be a series provided by an additional module.
             *
             * In TypeScript this option has no effect in sense of typing and
             * instead the `type` option must always be set in the series.
             *
             * @sample {highcharts} highcharts/chart/type-bar/
             *         Bar
             * @sample {highstock} stock/chart/type/
             *         Areaspline
             * @sample {highmaps} maps/chart/type-mapline/
             *         Mapline
             *
             * @type       {string}
             * @default    {highcharts} line
             * @default    {highstock} line
             * @default    {highmaps} map
             * @since      2.1.0
             * @apioption  chart.type
             */
            type: 'line',
            /**
             * Decides in what dimensions the user can zoom by dragging the mouse.
             * Can be one of `x`, `y` or `xy`.
             *
             * @see [panKey](#chart.panKey)
             *
             * @sample {highcharts} highcharts/chart/zoomtype-none/
             *         None by default
             * @sample {highcharts} highcharts/chart/zoomtype-x/
             *         X
             * @sample {highcharts} highcharts/chart/zoomtype-y/
             *         Y
             * @sample {highcharts} highcharts/chart/zoomtype-xy/
             *         Xy
             * @sample {highcharts} highcharts/chart/zoomtype-polar/
             *         Zoom on polar chart
             * @sample {highstock} stock/demo/basic-line/
             *         None by default
             * @sample {highstock} stock/chart/zoomtype-x/
             *         X
             * @sample {highstock} stock/chart/zoomtype-y/
             *         Y
             * @sample {highstock} stock/chart/zoomtype-xy/
             *         Xy
             * @sample {highmaps} maps/chart/zoomtype-xy/
             *         Map with selection zoom
             *
             * @type       {string}
             * @validvalue ["x", "y", "xy"]
             * @deprecated
             * @apioption  chart.zoomType
             */
            /**
             * Enables zooming by a single touch, in combination with
             * [chart.zoomType](#chart.zoomType). When enabled, two-finger pinch
             * will still work as set up by [chart.pinchType](#chart.pinchType).
             * However, `zoomBySingleTouch` will interfere with touch-dragging the
             * chart to read the tooltip. And especially when vertical zooming is
             * enabled, it will make it hard to scroll vertically on the page.
             * @since      9.0.0
             * @sample     highcharts/chart/zoombysingletouch
             *             Zoom by single touch enabled, with buttons to toggle
             * @product    highcharts highstock gantt
             * @deprecated
             */
            /**
             * Chart zooming options.
             * @since 10.2.1
             */
            zooming: {
                /**
                 * Equivalent to [type](#chart.zooming.type), but for multitouch
                 * gestures only. By default, the `pinchType` is the same as the
                 * `type` setting. However, pinching can be enabled separately in
                 * some cases, for example in stock charts where a mouse drag pans the
                 * chart, while pinching is enabled. When [tooltip.followTouchMove](
                 * #tooltip.followTouchMove) is true, pinchType only applies to
                 * two-finger touches.
                 *
                 * @type       {string}
                 * @default    {highcharts} undefined
                 * @default    {highstock} x
                 * @product    highcharts highstock gantt
                 * @validvalue ["x", "y", "xy"]
                 * @apioption  chart.zooming.pinchType
                 */
                /**
                 * Decides in what dimensions the user can zoom by dragging the mouse.
                 * Can be one of `x`, `y` or `xy`.
                 *
                 * @declare    Highcharts.OptionsChartZoomingTypeValue
                 * @type       {string}
                 * @default    {highcharts} undefined
                 * @product    highcharts highstock gantt
                 * @validvalue ["x", "y", "xy"]
                 * @apioption  chart.zooming.type
                 */
                /**
                 * Set a key to hold when dragging to zoom the chart. This is useful to
                 * avoid zooming while moving points. Should be set different than
                 * [chart.panKey](#chart.panKey).
                 *
                 * @type       {string}
                 * @default    {highcharts} undefined
                 * @validvalue ["alt", "ctrl", "meta", "shift"]
                 * @requires   modules/draggable-points
                 * @apioption  chart.zooming.key
                 */
                /**
                 * Enables zooming by a single touch, in combination with
                 * [chart.zooming.type](#chart.zooming.type). When enabled, two-finger
                 * pinch will still work as set up by [chart.zooming.pinchType]
                 * (#chart.zooming.pinchType). However, `singleTouch` will interfere
                 * with touch-dragging the chart to read the tooltip. And especially
                 * when vertical zooming is enabled, it will make it hard to scroll
                 * vertically on the page.
                 *
                 * @sample  highcharts/chart/zoombysingletouch
                 *          Zoom by single touch enabled, with buttons to toggle
                 *
                 * @product highcharts highstock gantt
                 */
                singleTouch: false,
                /**
                 * The button that appears after a selection zoom, allowing the user
                 * to reset zoom.
                 */
                resetButton: {
                    /**
                     * What frame the button placement should be related to. Can be
                     * either `plotBox` or `spacingBox`.
                     *
                     * @sample {highcharts} highcharts/chart/resetzoombutton-relativeto/
                     *         Relative to the chart
                     * @sample {highstock} highcharts/chart/resetzoombutton-relativeto/
                     *         Relative to the chart
                     *
                     * @type      {Highcharts.ButtonRelativeToValue}
                     * @default   plot
                     * @apioption chart.zooming.resetButton.relativeTo
                     */
                    /**
                     * A collection of attributes for the button. The object takes SVG
                     * attributes like `fill`, `stroke`, `stroke-width` or `r`, the
                     * border radius. The theme also supports `style`, a collection of
                     * CSS properties for the text. Equivalent attributes for the hover
                     * state are given in `theme.states.hover`.
                     *
                     * @sample {highcharts} highcharts/chart/resetzoombutton-theme/
                     *         Theming the button
                     * @sample {highstock} highcharts/chart/resetzoombutton-theme/
                     *         Theming the button
                     *
                     * @type  {Highcharts.SVGAttributes}
                     * @since 10.2.1
                     */
                    theme: {
                        /** @internal */
                        zIndex: 6
                    },
                    /**
                     * The position of the button.
                     *
                     * Note: Adjusting position values might cause overlap with chart
                     * elements. Ensure coordinates do not obstruct other components or
                     * data visibility.
                     *
                     * @sample {highcharts} highcharts/chart/resetzoombutton-position/
                     *         Above the plot area
                     * @sample {highstock} highcharts/chart/resetzoombutton-position/
                     *         Above the plot area
                     * @sample {highmaps} highcharts/chart/resetzoombutton-position/
                     *         Above the plot area
                     *
                     * @type  {Highcharts.AlignObject}
                     * @since 10.2.1
                     */
                    position: {
                        /**
                         * The horizontal alignment of the button.
                         */
                        align: 'right',
                        /**
                         * The horizontal offset of the button.
                         */
                        x: -10,
                        /**
                         * The vertical alignment of the button.
                         *
                         * @type       {Highcharts.VerticalAlignValue}
                         * @default    top
                         * @apioption  chart.zooming.resetButton.position.verticalAlign
                         */
                        /**
                         * The vertical offset of the button.
                         */
                        y: 10
                    }
                }
            },
            /**
             * An explicit width for the chart. By default (when `null`) the width
             * is calculated from the offset width of the containing element.
             *
             * @sample {highcharts} highcharts/chart/width/
             *         800px wide
             * @sample {highstock} stock/chart/width/
             *         800px wide
             * @sample {highmaps} maps/chart/size/
             *         Chart with explicit size
             *
             * @type {null|number|string}
             */
            width: null,
            /**
             * An explicit height for the chart. If a _number_, the height is
             * given in pixels. If given a _percentage string_ (for example
             * `'56%'`), the height is given as the percentage of the actual chart
             * width. This allows for preserving the aspect ratio across responsive
             * sizes.
             *
             * By default (when `null`) the height is calculated from the offset
             * height of the containing element, or 400 pixels if the containing
             * element's height is 0.
             *
             * @sample {highcharts} highcharts/chart/height/
             *         500px height
             * @sample {highstock} stock/chart/height/
             *         300px height
             * @sample {highmaps} maps/chart/size/
             *         Chart with explicit size
             * @sample highcharts/chart/height-percent/
             *         Highcharts with percentage height
             *
             * @type {null|number|string}
             */
            height: null,
            /**
             * The color of the outer chart border.
             *
             * @see In styled mode, the stroke is set with the
             *      `.highcharts-background` class.
             *
             * @sample {highcharts} highcharts/chart/bordercolor/
             *         Brown border
             * @sample {highstock} stock/chart/border/
             *         Brown border
             * @sample {highmaps} maps/chart/border/
             *         Border options
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            borderColor: "#334eff" /* Palette.highlightColor80 */,
            /**
             * The pixel width of the outer chart border.
             *
             * @see In styled mode, the stroke is set with the
             *      `.highcharts-background` class.
             *
             * @sample {highcharts} highcharts/chart/borderwidth/
             *         5px border
             * @sample {highstock} stock/chart/border/
             *         2px border
             * @sample {highmaps} maps/chart/border/
             *         Border options
             *
             * @type      {number}
             * @default   0
             * @apioption chart.borderWidth
             */
            /**
             * The background color or gradient for the outer chart area.
             *
             * @see In styled mode, the background is set with the
             *      `.highcharts-background` class.
             *
             * @sample {highcharts} highcharts/chart/backgroundcolor-color/
             *         Color
             * @sample {highcharts} highcharts/chart/backgroundcolor-gradient/
             *         Gradient
             * @sample {highstock} stock/chart/backgroundcolor-color/
             *         Color
             * @sample {highstock} stock/chart/backgroundcolor-gradient/
             *         Gradient
             * @sample {highmaps} maps/chart/backgroundcolor-color/
             *         Color
             * @sample {highmaps} maps/chart/backgroundcolor-gradient/
             *         Gradient
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            backgroundColor: "#ffffff" /* Palette.backgroundColor */,
            /**
             * The background color or gradient for the plot area.
             *
             * @see In styled mode, the plot background is set with the
             *      `.highcharts-plot-background` class.
             *
             * @sample {highcharts} highcharts/chart/plotbackgroundcolor-color/
             *         Color
             * @sample {highcharts} highcharts/chart/plotbackgroundcolor-gradient/
             *         Gradient
             * @sample {highstock} stock/chart/plotbackgroundcolor-color/
             *         Color
             * @sample {highstock} stock/chart/plotbackgroundcolor-gradient/
             *         Gradient
             * @sample {highmaps} maps/chart/plotbackgroundcolor-color/
             *         Color
             * @sample {highmaps} maps/chart/plotbackgroundcolor-gradient/
             *         Gradient
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @apioption chart.plotBackgroundColor
             */
            /**
             * The URL for an image to use as the plot background. To set an image
             * as the background for the entire chart, set a CSS background image
             * to the container element. Note that for the image to be applied to
             * exported charts, its URL needs to be accessible by the export server.
             *
             * @see In styled mode, a plot background image can be set with the
             *      `.highcharts-plot-background` class and a [custom pattern](
             *      https://www.highcharts.com/docs/chart-design-and-style/gradients-shadows-and-patterns).
             *
             * @sample {highcharts} highcharts/chart/plotbackgroundimage/
             *         Skies
             * @sample {highstock} stock/chart/plotbackgroundimage/
             *         Skies
             *
             * @type      {string}
             * @apioption chart.plotBackgroundImage
             */
            /**
             * The color of the inner chart or plot area border.
             *
             * @see In styled mode, a plot border stroke can be set with the
             *      `.highcharts-plot-border` class.
             *
             * @sample {highcharts} highcharts/chart/plotbordercolor/
             *         Blue border
             * @sample {highstock} stock/chart/plotborder/
             *         Blue border
             * @sample {highmaps} maps/chart/plotborder/
             *         Plot border options
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            plotBorderColor: "#cccccc" /* Palette.neutralColor20 */
        };
        /* *
         *
         *  Default Export
         *
         * */

        return ChartDefaults;
    });
    _registerModule(_modules, 'Core/Color/Palettes.js', [], function () {
        /*
         * Series palettes for Highcharts. Series colors are defined in highcharts.css.
         * **Do not edit this file!** This file is generated using the 'gulp palette' task.
         */
        const SeriesPalettes = {
            /**
             * Colors for data series and points
             */
            colors: [
                '#2caffe',
                '#544fc5',
                '#00e272',
                '#fe6a35',
                '#6b8abc',
                '#d568fb',
                '#2ee0ca',
                '#fa4b42',
                '#feb56a',
                '#91e8e1'
            ]
        };

        return SeriesPalettes;
    });
    _registerModule(_modules, 'Core/Time.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { win } = H;
        const { defined, error, extend, isNumber, isObject, merge, objectEach, pad, pick, splat, timeUnits } = U;
        /* *
         *
         *  Constants
         *
         * */
        const hasNewSafariBug = H.isSafari &&
            win.Intl &&
            win.Intl.DateTimeFormat.prototype.formatRange;
        // To do: Remove this when we no longer need support for Safari < v14.1
        const hasOldSafariBug = H.isSafari &&
            win.Intl &&
            !win.Intl.DateTimeFormat.prototype.formatRange;
        /* *
         *
         *  Class
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * The Time class. Time settings are applied in general for each page using
         * `Highcharts.setOptions`, or individually for each Chart item through the
         * [time](https://api.highcharts.com/highcharts/time) options set.
         *
         * The Time object is available from {@link Highcharts.Chart#time},
         * which refers to  `Highcharts.time` if no individual time settings are
         * applied.
         *
         * @example
         * // Apply time settings globally
         * Highcharts.setOptions({
         *     time: {
         *         timezone: 'Europe/London'
         *     }
         * });
         *
         * // Apply time settings by instance
         * let chart = Highcharts.chart('container', {
         *     time: {
         *         timezone: 'America/New_York'
         *     },
         *     series: [{
         *         data: [1, 4, 3, 5]
         *     }]
         * });
         *
         * // Use the Time object
         * console.log(
         *        'Current time in New York',
         *        chart.time.dateFormat('%Y-%m-%d %H:%M:%S', Date.now())
         * );
         *
         * @since 6.0.5
         *
         * @class
         * @name Highcharts.Time
         *
         * @param {Highcharts.TimeOptions} [options]
         * Time options as defined in [chart.options.time](/highcharts/time).
         */
        class Time {
            /* *
             *
             *  Constructors
             *
             * */
            constructor(options) {
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.options = {};
                this.useUTC = false;
                this.variableTimezone = false;
                this.Date = win.Date;
                /**
                 * Get the time zone offset based on the current timezone information as
                 * set in the global options.
                 *
                 * @function Highcharts.Time#getTimezoneOffset
                 *
                 * @param {number} timestamp
                 *        The JavaScript timestamp to inspect.
                 *
                 * @return {number}
                 *         The timezone offset in minutes compared to UTC.
                 */
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.update(options);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Time units used in `Time.get` and `Time.set`
             *
             * @typedef {"Date"|"Day"|"FullYear"|"Hours"|"Milliseconds"|"Minutes"|"Month"|"Seconds"} Highcharts.TimeUnitValue
             */
            /**
             * Get the value of a date object in given units, and subject to the Time
             * object's current timezone settings. This function corresponds directly to
             * JavaScripts `Date.getXXX / Date.getUTCXXX`, so instead of calling
             * `date.getHours()` or `date.getUTCHours()` we will call
             * `time.get('Hours')`.
             *
             * @function Highcharts.Time#get
             *
             * @param {Highcharts.TimeUnitValue} unit
             * @param {Date} date
             *
             * @return {number}
             *        The given time unit
             */
            get(unit, date) {
                if (this.variableTimezone || this.timezoneOffset) {
                    const realMs = date.getTime();
                    const ms = realMs - this.getTimezoneOffset(date);
                    date.setTime(ms); // Temporary adjust to timezone
                    const ret = date['getUTC' + unit]();
                    date.setTime(realMs); // Reset
                    return ret;
                }
                // UTC time with no timezone handling
                if (this.useUTC) {
                    return date['getUTC' + unit]();
                }
                // Else, local time
                return date['get' + unit]();
            }
            /**
             * Set the value of a date object in given units, and subject to the Time
             * object's current timezone settings. This function corresponds directly to
             * JavaScripts `Date.setXXX / Date.setUTCXXX`, so instead of calling
             * `date.setHours(0)` or `date.setUTCHours(0)` we will call
             * `time.set('Hours', 0)`.
             *
             * @function Highcharts.Time#set
             *
             * @param {Highcharts.TimeUnitValue} unit
             * @param {Date} date
             * @param {number} value
             *
             * @return {number}
             *        The epoch milliseconds of the updated date
             */
            set(unit, date, value) {
                // UTC time with timezone handling
                if (this.variableTimezone || this.timezoneOffset) {
                    // For lower order time units, just set it directly using UTC
                    // time
                    if (unit === 'Milliseconds' ||
                        unit === 'Seconds' ||
                        (unit === 'Minutes' &&
                            this.getTimezoneOffset(date) % 3600000 === 0) // #13961
                    ) {
                        return date['setUTC' + unit](value);
                    }
                    // Higher order time units need to take the time zone into
                    // account
                    // Adjust by timezone
                    const offset = this.getTimezoneOffset(date);
                    let ms = date.getTime() - offset;
                    date.setTime(ms);
                    date['setUTC' + unit](value);
                    const newOffset = this.getTimezoneOffset(date);
                    ms = date.getTime() + newOffset;
                    return date.setTime(ms);
                }
                // UTC time with no timezone handling
                if (this.useUTC ||
                    // Leap calculation in UTC only
                    (hasNewSafariBug && unit === 'FullYear')) {
                    return date['setUTC' + unit](value);
                }
                // Else, local time
                return date['set' + unit](value);
            }
            /**
             * Update the Time object with current options. It is called internally on
             * initializing Highcharts, after running `Highcharts.setOptions` and on
             * `Chart.update`.
             *
             * @private
             * @function Highcharts.Time#update
             *
             * @param {Highcharts.TimeOptions} [options]
             *
             */
            update(options = {}) {
                const useUTC = pick(options.useUTC, true);
                this.options = options = merge(true, this.options, options);
                // Allow using a different Date class
                this.Date = options.Date || win.Date || Date;
                this.useUTC = useUTC;
                this.timezoneOffset = (useUTC && options.timezoneOffset) || void 0;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                /*
                 * The time object has options allowing for variable time zones, meaning
                 * the axis ticks or series data needs to consider this.
                 */
                this.variableTimezone = useUTC && !!(options.getTimezoneOffset ||
                    options.timezone);
            }
            /**
             * Make a time and returns milliseconds. Interprets the inputs as UTC time,
             * local time or a specific timezone time depending on the current time
             * settings.
             *
             * @function Highcharts.Time#makeTime
             *
             * @param {number} year
             *        The year
             *
             * @param {number} month
             *        The month. Zero-based, so January is 0.
             *
             * @param {number} [date=1]
             *        The day of the month
             *
             * @param {number} [hours=0]
             *        The hour of the day, 0-23.
             *
             * @param {number} [minutes=0]
             *        The minutes
             *
             * @param {number} [seconds=0]
             *        The seconds
             *
             * @return {number}
             *         The time in milliseconds since January 1st 1970.
             */
            makeTime(year, month, date, hours, minutes, seconds) {
                let d, offset, newOffset;
                if (this.useUTC) {
                    d = this.Date.UTC.apply(0, arguments);
                    offset = this.getTimezoneOffset(d);
                    d += offset;
                    newOffset = this.getTimezoneOffset(d);
                    if (offset !== newOffset) {
                        d += newOffset - offset;
                        // A special case for transitioning from summer time to winter time.
                        // When the clock is set back, the same time is repeated twice, i.e.
                        // 02:30 am is repeated since the clock is set back from 3 am to
                        // 2 am. We need to make the same time as local Date does.
                    }
                    else if (offset - 36e5 === this.getTimezoneOffset(d - 36e5) &&
                        !hasOldSafariBug) {
                        d -= 36e5;
                    }
                }
                else {
                    d = new this.Date(year, month, pick(date, 1), pick(hours, 0), pick(minutes, 0), pick(seconds, 0)).getTime();
                }
                return d;
            }
            /**
             * Sets the getTimezoneOffset function. If the `timezone` option is set, a
             * default getTimezoneOffset function with that timezone is returned. If
             * a `getTimezoneOffset` option is defined, it is returned. If neither are
             * specified, the function using the `timezoneOffset` option or 0 offset is
             * returned.
             *
             * @private
             * @function Highcharts.Time#timezoneOffsetFunction
             *
             * @return {Function}
             *         A getTimezoneOffset function
             */
            timezoneOffsetFunction() {
                const time = this, options = this.options, getTimezoneOffset = options.getTimezoneOffset;
                if (!this.useUTC) {
                    return (timestamp) => new Date(timestamp.toString()).getTimezoneOffset() * 60000;
                }
                if (options.timezone) {
                    return (timestamp) => {
                        try {
                            // Cache the DateTimeFormat instances for performance
                            // (#20720)
                            const cacheKey = `shortOffset,${options.timezone || ''}`, dateTimeFormat = Time.formatCache[cacheKey] = (Time.formatCache[cacheKey] ||
                                // eslint-disable-next-line new-cap
                                Intl.DateTimeFormat('en', {
                                    timeZone: options.timezone,
                                    timeZoneName: 'shortOffset'
                                }));
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const [date, gmt, hours, colon, minutes = 0] = dateTimeFormat
                                .format(timestamp)
                                .split(/(GMT|:)/)
                                .map(Number), offset = -(hours + minutes / 60) * 60 * 60000;
                            // Possible future NaNs stop here
                            if (isNumber(offset)) {
                                return offset;
                            }
                        }
                        catch (e) {
                            error(34);
                        }
                        return 0;
                    };
                }
                // If not timezone is set, look for the getTimezoneOffset callback
                if (this.useUTC && getTimezoneOffset) {
                    return (timestamp) => getTimezoneOffset(timestamp.valueOf()) * 60000;
                }
                // Last, use the `timezoneOffset` option if set
                return () => (time.timezoneOffset || 0) * 60000;
            }
            /**
             * Formats a JavaScript date timestamp (milliseconds since Jan 1st 1970)
             * into a human readable date string. The available format keys are listed
             * below. Additional formats can be given in the
             * {@link Highcharts.dateFormats} hook.
             *
             * Supported format keys:
             * - `%a`: Short weekday, like 'Mon'
             * - `%A`: Long weekday, like 'Monday'
             * - `%d`: Two digit day of the month, 01 to 31
             * - `%e`: Day of the month, 1 through 31
             * - `%w`: Day of the week, 0 through 6
             * - `%b`: Short month, like 'Jan'
             * - `%B`: Long month, like 'January'
             * - `%m`: Two digit month number, 01 through 12
             * - `%y`: Two digits year, like 09 for 2009
             * - `%Y`: Four digits year, like 2009
             * - `%H`: Two digits hours in 24h format, 00 through 23
             * - `%k`: Hours in 24h format, 0 through 23
             * - `%I`: Two digits hours in 12h format, 00 through 11
             * - `%l`: Hours in 12h format, 1 through 12
             * - `%M`: Two digits minutes, 00 through 59
             * - `%p`: Upper case AM or PM
             * - `%P`: Lower case AM or PM
             * - `%S`: Two digits seconds, 00 through 59
             * - `%L`: Milliseconds (naming from Ruby)
             *
             * @example
             * const time = new Highcharts.Time();
             * const s = time.dateFormat('%Y-%m-%d %H:%M:%S', Date.UTC(2020, 0, 1));
             * console.log(s); // => 2020-01-01 00:00:00
             *
             * @function Highcharts.Time#dateFormat
             *
             * @param {string} format
             *        The desired format where various time representations are
             *        prefixed with %.
             *
             * @param {number} [timestamp]
             *        The JavaScript timestamp.
             *
             * @param {boolean} [capitalize=false]
             *        Upper case first letter in the return.
             *
             * @return {string}
             *         The formatted date.
             */
            dateFormat(format, timestamp, capitalize) {
                if (!defined(timestamp) || isNaN(timestamp)) {
                    return (H.defaultOptions.lang &&
                        H.defaultOptions.lang.invalidDate ||
                        '');
                }
                format = pick(format, '%Y-%m-%d %H:%M:%S');
                const time = this, date = new this.Date(timestamp), 
                // Get the basic time values
                hours = this.get('Hours', date), day = this.get('Day', date), dayOfMonth = this.get('Date', date), month = this.get('Month', date), fullYear = this.get('FullYear', date), lang = H.defaultOptions.lang, langWeekdays = (lang && lang.weekdays), shortWeekdays = (lang && lang.shortWeekdays), 
                // List all format keys. Custom formats can be added from the
                // outside.
                replacements = extend({
                    // Day
                    // Short weekday, like 'Mon'
                    a: shortWeekdays ?
                        shortWeekdays[day] :
                        langWeekdays[day].substr(0, 3),
                    // Long weekday, like 'Monday'
                    A: langWeekdays[day],
                    // Two digit day of the month, 01 to 31
                    d: pad(dayOfMonth),
                    // Day of the month, 1 through 31
                    e: pad(dayOfMonth, 2, ' '),
                    // Day of the week, 0 through 6
                    w: day,
                    // Week (none implemented)
                    // 'W': weekNumber(),
                    // Month
                    // Short month, like 'Jan'
                    b: lang.shortMonths[month],
                    // Long month, like 'January'
                    B: lang.months[month],
                    // Two digit month number, 01 through 12
                    m: pad(month + 1),
                    // Month number, 1 through 12 (#8150)
                    o: month + 1,
                    // Year
                    // Two digits year, like 09 for 2009
                    y: fullYear.toString().substr(2, 2),
                    // Four digits year, like 2009
                    Y: fullYear,
                    // Time
                    // Two digits hours in 24h format, 00 through 23
                    H: pad(hours),
                    // Hours in 24h format, 0 through 23
                    k: hours,
                    // Two digits hours in 12h format, 00 through 11
                    I: pad((hours % 12) || 12),
                    // Hours in 12h format, 1 through 12
                    l: (hours % 12) || 12,
                    // Two digits minutes, 00 through 59
                    M: pad(this.get('Minutes', date)),
                    // Upper case AM or PM
                    p: hours < 12 ? 'AM' : 'PM',
                    // Lower case AM or PM
                    P: hours < 12 ? 'am' : 'pm',
                    // Two digits seconds, 00 through 59
                    S: pad(this.get('Seconds', date)),
                    // Milliseconds (naming from Ruby)
                    L: pad(Math.floor(timestamp % 1000), 3)
                }, H.dateFormats);
                // Do the replaces
                objectEach(replacements, function (val, key) {
                    // Regex would do it in one line, but this is faster
                    while (format.indexOf('%' + key) !== -1) {
                        format = format.replace('%' + key, typeof val === 'function' ? val.call(time, timestamp) : val);
                    }
                });
                // Optionally capitalize the string and return
                return capitalize ?
                    (format.substr(0, 1).toUpperCase() +
                        format.substr(1)) :
                    format;
            }
            /**
             * Resolve legacy formats of dateTimeLabelFormats (strings and arrays) into
             * an object.
             * @private
             * @param {string|Array<T>|Highcharts.Dictionary<T>} f
             * General format description
             * @return {Highcharts.Dictionary<T>}
             * The object definition
             */
            resolveDTLFormat(f) {
                if (!isObject(f, true)) { // Check for string or array
                    f = splat(f);
                    return {
                        main: f[0],
                        from: f[1],
                        to: f[2]
                    };
                }
                return f;
            }
            /**
             * Return an array with time positions distributed on round time values
             * right and right after min and max. Used in datetime axes as well as for
             * grouping data on a datetime axis.
             *
             * @function Highcharts.Time#getTimeTicks
             *
             * @param {Highcharts.TimeNormalizedObject} normalizedInterval
             *        The interval in axis values (ms) and the count
             *
             * @param {number} [min]
             *        The minimum in axis values
             *
             * @param {number} [max]
             *        The maximum in axis values
             *
             * @param {number} [startOfWeek=1]
             *
             * @return {Highcharts.AxisTickPositionsArray}
             * Time positions
             */
            getTimeTicks(normalizedInterval, min, max, startOfWeek) {
                const time = this, Date = time.Date, tickPositions = [], higherRanks = {}, 
                // When crossing DST, use the max. Resolves #6278.
                minDate = new Date(min), interval = normalizedInterval.unitRange, count = normalizedInterval.count || 1;
                let i, minYear, // Used in months and years as a basis for Date.UTC()
                variableDayLength, minDay;
                startOfWeek = pick(startOfWeek, 1);
                if (defined(min)) { // #1300
                    time.set('Milliseconds', minDate, interval >= timeUnits.second ?
                        0 : // #3935
                        count * Math.floor(time.get('Milliseconds', minDate) / count)); // #3652, #3654
                    if (interval >= timeUnits.second) { // Second
                        time.set('Seconds', minDate, interval >= timeUnits.minute ?
                            0 : // #3935
                            count * Math.floor(time.get('Seconds', minDate) / count));
                    }
                    if (interval >= timeUnits.minute) { // Minute
                        time.set('Minutes', minDate, interval >= timeUnits.hour ?
                            0 :
                            count * Math.floor(time.get('Minutes', minDate) / count));
                    }
                    if (interval >= timeUnits.hour) { // Hour
                        time.set('Hours', minDate, interval >= timeUnits.day ?
                            0 :
                            count * Math.floor(time.get('Hours', minDate) / count));
                    }
                    if (interval >= timeUnits.day) { // Day
                        time.set('Date', minDate, interval >= timeUnits.month ?
                            1 :
                            Math.max(1, count * Math.floor(time.get('Date', minDate) / count)));
                    }
                    if (interval >= timeUnits.month) { // Month
                        time.set('Month', minDate, interval >= timeUnits.year ? 0 :
                            count * Math.floor(time.get('Month', minDate) / count));
                        minYear = time.get('FullYear', minDate);
                    }
                    if (interval >= timeUnits.year) { // Year
                        minYear -= minYear % count;
                        time.set('FullYear', minDate, minYear);
                    }
                    // Week is a special case that runs outside the hierarchy
                    if (interval === timeUnits.week) {
                        // Get start of current week, independent of count
                        minDay = time.get('Day', minDate);
                        time.set('Date', minDate, (time.get('Date', minDate) -
                            minDay + startOfWeek +
                            // We don't want to skip days that are before
                            // startOfWeek (#7051)
                            (minDay < startOfWeek ? -7 : 0)));
                    }
                    // Get basics for variable time spans
                    minYear = time.get('FullYear', minDate);
                    const minMonth = time.get('Month', minDate), minDateDate = time.get('Date', minDate), minHours = time.get('Hours', minDate);
                    // Redefine min to the floored/rounded minimum time (#7432)
                    min = minDate.getTime();
                    // Handle local timezone offset
                    if ((time.variableTimezone || !time.useUTC) && defined(max)) {
                        // Detect whether we need to take the DST crossover into
                        // consideration. If we're crossing over DST, the day length may
                        // be 23h or 25h and we need to compute the exact clock time for
                        // each tick instead of just adding hours. This comes at a cost,
                        // so first we find out if it is needed (#4951).
                        variableDayLength = (
                        // Long range, assume we're crossing over.
                        max - min > 4 * timeUnits.month ||
                            // Short range, check if min and max are in different time
                            // zones.
                            time.getTimezoneOffset(min) !==
                                time.getTimezoneOffset(max));
                    }
                    // Iterate and add tick positions at appropriate values
                    let t = minDate.getTime();
                    i = 1;
                    while (t < max) {
                        tickPositions.push(t);
                        // If the interval is years, use Date.UTC to increase years
                        if (interval === timeUnits.year) {
                            t = time.makeTime(minYear + i * count, 0);
                            // If the interval is months, use Date.UTC to increase months
                        }
                        else if (interval === timeUnits.month) {
                            t = time.makeTime(minYear, minMonth + i * count);
                            // If we're using global time, the interval is not fixed as it
                            // jumps one hour at the DST crossover
                        }
                        else if (variableDayLength &&
                            (interval === timeUnits.day || interval === timeUnits.week)) {
                            t = time.makeTime(minYear, minMonth, minDateDate +
                                i * count * (interval === timeUnits.day ? 1 : 7));
                        }
                        else if (variableDayLength &&
                            interval === timeUnits.hour &&
                            count > 1) {
                            // Make sure higher ranks are preserved across DST (#6797,
                            // #7621)
                            t = time.makeTime(minYear, minMonth, minDateDate, minHours + i * count);
                            // Else, the interval is fixed and we use simple addition
                        }
                        else {
                            t += interval * count;
                        }
                        i++;
                    }
                    // Push the last time
                    tickPositions.push(t);
                    // Handle higher ranks. Mark new days if the time is on midnight
                    // (#950, #1649, #1760, #3349). Use a reasonable dropout threshold
                    // to prevent looping over dense data grouping (#6156).
                    if (interval <= timeUnits.hour && tickPositions.length < 10000) {
                        tickPositions.forEach(function (t) {
                            if (
                            // Speed optimization, no need to run dateFormat unless
                            // we're on a full or half hour
                            t % 1800000 === 0 &&
                                // Check for local or global midnight
                                time.dateFormat('%H%M%S%L', t) === '000000000') {
                                higherRanks[t] = 'day';
                            }
                        });
                    }
                }
                // Record information on the chosen unit - for dynamic label formatter
                tickPositions.info = extend(normalizedInterval, {
                    higherRanks,
                    totalRange: interval * count
                });
                return tickPositions;
            }
            /**
             * Get the optimal date format for a point, based on a range.
             *
             * @private
             * @function Highcharts.Time#getDateFormat
             *
             * @param {number} range
             *        The time range
             *
             * @param {number} timestamp
             *        The timestamp of the date
             *
             * @param {number} startOfWeek
             *        An integer representing the first day of the week, where 0 is
             *        Sunday.
             *
             * @param {Highcharts.Dictionary<string>} dateTimeLabelFormats
             *        A map of time units to formats.
             *
             * @return {string}
             *         The optimal date format for a point.
             */
            getDateFormat(range, timestamp, startOfWeek, dateTimeLabelFormats) {
                const dateStr = this.dateFormat('%m-%d %H:%M:%S.%L', timestamp), blank = '01-01 00:00:00.000', strpos = {
                    millisecond: 15,
                    second: 12,
                    minute: 9,
                    hour: 6,
                    day: 3
                };
                let n = 'millisecond', 
                // For sub-millisecond data, #4223
                lastN = n;
                for (n in timeUnits) { // eslint-disable-line guard-for-in
                    // If the range is exactly one week and we're looking at a
                    // Sunday/Monday, go for the week format
                    if (range === timeUnits.week &&
                        +this.dateFormat('%w', timestamp) === startOfWeek &&
                        dateStr.substr(6) === blank.substr(6)) {
                        n = 'week';
                        break;
                    }
                    // The first format that is too great for the range
                    if (timeUnits[n] > range) {
                        n = lastN;
                        break;
                    }
                    // If the point is placed every day at 23:59, we need to show
                    // the minutes as well. #2637.
                    if (strpos[n] &&
                        dateStr.substr(strpos[n]) !== blank.substr(strpos[n])) {
                        break;
                    }
                    // Weeks are outside the hierarchy, only apply them on
                    // Mondays/Sundays like in the first condition
                    if (n !== 'week') {
                        lastN = n;
                    }
                }
                return this.resolveDTLFormat(dateTimeLabelFormats[n]).main;
            }
        }
        Time.formatCache = {};
        /* *
         *
         * Default export
         *
         * */
        /* *
         *
         * API Declarations
         *
         * */
        /**
         * Normalized interval.
         *
         * @interface Highcharts.TimeNormalizedObject
         */ /**
        * The count.
        *
        * @name Highcharts.TimeNormalizedObject#count
        * @type {number|undefined}
        */ /**
        * The interval in axis values (ms).
        *
        * @name Highcharts.TimeNormalizedObject#unitRange
        * @type {number}
        */
        /**
         * Function of an additional date format specifier.
         *
         * @callback Highcharts.TimeFormatCallbackFunction
         *
         * @param {number} timestamp
         *        The time to format.
         *
         * @return {string}
         *         The formatted portion of the date.
         */
        /**
         * Time ticks.
         *
         * @interface Highcharts.AxisTickPositionsArray
         * @extends global.Array<number>
         */ /**
        * @name Highcharts.AxisTickPositionsArray#info
        * @type {Highcharts.TimeTicksInfoObject|undefined}
        */
        /**
         * A callback to return the time zone offset for a given datetime. It
         * takes the timestamp in terms of milliseconds since January 1 1970,
         * and returns the timezone offset in minutes. This provides a hook
         * for drawing time based charts in specific time zones using their
         * local DST crossover dates, with the help of external libraries.
         *
         * @callback Highcharts.TimezoneOffsetCallbackFunction
         *
         * @param {number} timestamp
         * Timestamp in terms of milliseconds since January 1 1970.
         *
         * @return {number}
         * Timezone offset in minutes.
         */
        ''; // Keeps doclets above in JS file

        return Time;
    });
    _registerModule(_modules, 'Core/Defaults.js', [_modules['Core/Chart/ChartDefaults.js'], _modules['Core/Globals.js'], _modules['Core/Color/Palettes.js'], _modules['Core/Time.js'], _modules['Core/Utilities.js']], function (ChartDefaults, H, Palettes, Time, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { isTouchDevice, svg } = H;
        const { merge } = U;
        /* *
         *
         *  API Options
         *
         * */
        /**
         * Global default settings.
         *
         * @name Highcharts.defaultOptions
         * @type {Highcharts.Options}
         */ /**
        * @optionparent
        * @private
        */
        const defaultOptions = {
            /**
             * An array containing the default colors for the chart's series. When
             * all colors are used, new colors are pulled from the start again.
             *
             * Default colors can also be set on a series or series.type basis,
             * see [column.colors](#plotOptions.column.colors),
             * [pie.colors](#plotOptions.pie.colors).
             *
             * In styled mode, the colors option doesn't exist. Instead, colors
             * are defined in CSS and applied either through series or point class
             * names, or through the [chart.colorCount](#chart.colorCount) option.
             *
             * @sample {highcharts} highcharts/chart/colors/
             *         Assign a global color theme
             * @sample highcharts/members/theme-v10/
             *         Latest release styled like version 10
             *
             * @type    {Array<(Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject)>}
             * @default [
             *     "#2caffe",
             *     "#544fc5",
             *     "#00e272",
             *     "#fe6a35",
             *     "#6b8abc",
             *     "#d568fb",
             *     "#2ee0ca",
             *     "#fa4b42",
             *     "#feb56a",
             *     "#91e8e1"
             * ]
             */
            colors: Palettes.colors,
            /**
             * Styled mode only. Configuration object for adding SVG definitions for
             * reusable elements. See [gradients, shadows and
             * patterns](https://www.highcharts.com/docs/chart-design-and-style/gradients-shadows-and-patterns)
             * for more information and code examples.
             *
             * @type      {*}
             * @since     5.0.0
             * @apioption defs
             */
            /**
             * @ignore-option
             */
            symbols: ['circle', 'diamond', 'square', 'triangle', 'triangle-down'],
            /**
             * The language object is global and it can't be set on each chart
             * initialization. Instead, use `Highcharts.setOptions` to set it before any
             * chart is initialized.
             *
             * ```js
             * Highcharts.setOptions({
             *     lang: {
             *         months: [
             *             'Janvier', 'Février', 'Mars', 'Avril',
             *             'Mai', 'Juin', 'Juillet', 'Août',
             *             'Septembre', 'Octobre', 'Novembre', 'Décembre'
             *         ],
             *         weekdays: [
             *             'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
             *             'Jeudi', 'Vendredi', 'Samedi'
             *         ]
             *     }
             * });
             * ```
             */
            lang: {
                /**
                 * The loading text that appears when the chart is set into the loading
                 * state following a call to `chart.showLoading`.
                 */
                loading: 'Loading...',
                /**
                 * An array containing the months names. Corresponds to the `%B` format
                 * in `Highcharts.dateFormat()`.
                 *
                 * @type    {Array<string>}
                 * @default ["January", "February", "March", "April", "May", "June",
                 *          "July", "August", "September", "October", "November",
                 *          "December"]
                 */
                months: [
                    'January', 'February', 'March', 'April', 'May', 'June', 'July',
                    'August', 'September', 'October', 'November', 'December'
                ],
                /**
                 * An array containing the months names in abbreviated form. Corresponds
                 * to the `%b` format in `Highcharts.dateFormat()`.
                 *
                 * @type    {Array<string>}
                 * @default ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                 *          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                 */
                shortMonths: [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ],
                /**
                 * An array containing the weekday names.
                 *
                 * @type    {Array<string>}
                 * @default ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                 *          "Friday", "Saturday"]
                 */
                weekdays: [
                    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
                    'Thursday', 'Friday', 'Saturday'
                ],
                /**
                 * Short week days, starting Sunday. If not specified, Highcharts uses
                 * the first three letters of the `lang.weekdays` option.
                 *
                 * @sample highcharts/lang/shortweekdays/
                 *         Finnish two-letter abbreviations
                 *
                 * @type      {Array<string>}
                 * @since     4.2.4
                 * @apioption lang.shortWeekdays
                 */
                /**
                 * What to show in a date field for invalid dates. Defaults to an empty
                 * string.
                 *
                 * @type      {string}
                 * @since     4.1.8
                 * @product   highcharts highstock
                 * @apioption lang.invalidDate
                 */
                /**
                 * The title appearing on hovering the zoom in button. The text itself
                 * defaults to "+" and can be changed in the button options.
                 *
                 * @type      {string}
                 * @default   Zoom in
                 * @product   highmaps
                 * @apioption lang.zoomIn
                 */
                /**
                 * The title appearing on hovering the zoom out button. The text itself
                 * defaults to "-" and can be changed in the button options.
                 *
                 * @type      {string}
                 * @default   Zoom out
                 * @product   highmaps
                 * @apioption lang.zoomOut
                 */
                /**
                 * The default decimal point used in the `Highcharts.numberFormat`
                 * method unless otherwise specified in the function arguments.
                 *
                 * @since 1.2.2
                 */
                decimalPoint: '.',
                /**
                 * [Metric prefixes](https://en.wikipedia.org/wiki/Metric_prefix) used
                 * to shorten high numbers in axis labels. Replacing any of the
                 * positions with `null` causes the full number to be written. Setting
                 * `numericSymbols` to `undefined` disables shortening altogether.
                 *
                 * @sample {highcharts} highcharts/lang/numericsymbols/
                 *         Replacing the symbols with text
                 * @sample {highstock} highcharts/lang/numericsymbols/
                 *         Replacing the symbols with text
                 *
                 * @type    {Array<string>}
                 * @default ["k", "M", "G", "T", "P", "E"]
                 * @since   2.3.0
                 */
                numericSymbols: ['k', 'M', 'G', 'T', 'P', 'E'],
                /**
                 * The magnitude of [numericSymbols](#lang.numericSymbol) replacements.
                 * Use 10000 for Japanese, Korean and various Chinese locales, which
                 * use symbols for 10^4, 10^8 and 10^12.
                 *
                 * @sample highcharts/lang/numericsymbolmagnitude/
                 *         10000 magnitude for Japanese
                 *
                 * @type      {number}
                 * @default   1000
                 * @since     5.0.3
                 * @apioption lang.numericSymbolMagnitude
                 */
                /**
                 * The text for the label appearing when a chart is zoomed.
                 *
                 * @since 1.2.4
                 */
                resetZoom: 'Reset zoom',
                /**
                 * The tooltip title for the label appearing when a chart is zoomed.
                 *
                 * @since 1.2.4
                 */
                resetZoomTitle: 'Reset zoom level 1:1',
                /**
                 * The default thousands separator used in the `Highcharts.numberFormat`
                 * method unless otherwise specified in the function arguments. Defaults
                 * to a single space character, which is recommended in
                 * [ISO 31-0](https://en.wikipedia.org/wiki/ISO_31-0#Numbers) and works
                 * across Anglo-American and continental European languages.
                 *
                 * @default \u0020
                 * @since   1.2.2
                 */
                thousandsSep: ' '
            },
            /**
             * Global options that don't apply to each chart. These options, like
             * the `lang` options, must be set using the `Highcharts.setOptions`
             * method.
             *
             * ```js
             * Highcharts.setOptions({
             *     global: {
             *         useUTC: false
             *     }
             * });
             * ```
             */
            /**
             * _Canvg rendering for Android 2.x is removed as of Highcharts 5.0\.
             * Use the [libURL](#exporting.libURL) option to configure exporting._
             *
             * The URL to the additional file to lazy load for Android 2.x devices.
             * These devices don't support SVG, so we download a helper file that
             * contains [canvg](https://github.com/canvg/canvg), its dependency
             * rbcolor, and our own CanVG Renderer class. To avoid hotlinking to
             * our site, you can install canvas-tools.js on your own server and
             * change this option accordingly.
             *
             * @deprecated
             *
             * @type      {string}
             * @default   https://code.highcharts.com/{version}/modules/canvas-tools.js
             * @product   highcharts highmaps
             * @apioption global.canvasToolsURL
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.useUTC](#time.useUTC) that supports individual time settings
             * per chart.
             *
             * @deprecated
             *
             * @type      {boolean}
             * @apioption global.useUTC
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.Date](#time.Date) that supports individual time settings
             * per chart.
             *
             * @deprecated
             *
             * @type      {Function}
             * @product   highcharts highstock
             * @apioption global.Date
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.getTimezoneOffset](#time.getTimezoneOffset) that supports
             * individual time settings per chart.
             *
             * @deprecated
             *
             * @type      {Function}
             * @product   highcharts highstock
             * @apioption global.getTimezoneOffset
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.timezone](#time.timezone) that supports individual time
             * settings per chart.
             *
             * @deprecated
             *
             * @type      {string}
             * @product   highcharts highstock
             * @apioption global.timezone
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.timezoneOffset](#time.timezoneOffset) that supports individual
             * time settings per chart.
             *
             * @deprecated
             *
             * @type      {number}
             * @product   highcharts highstock
             * @apioption global.timezoneOffset
             */
            global: {},
            /**
             * Time options that can apply globally or to individual charts. These
             * settings affect how `datetime` axes are laid out, how tooltips are
             * formatted, how series
             * [pointIntervalUnit](#plotOptions.series.pointIntervalUnit) works and how
             * the Highcharts Stock range selector handles time.
             *
             * The common use case is that all charts in the same Highcharts object
             * share the same time settings, in which case the global settings are set
             * using `setOptions`.
             *
             * ```js
             * // Apply time settings globally
             * Highcharts.setOptions({
             *     time: {
             *         timezone: 'Europe/London'
             *     }
             * });
             * // Apply time settings by instance
             * let chart = Highcharts.chart('container', {
             *     time: {
             *         timezone: 'America/New_York'
             *     },
             *     series: [{
             *         data: [1, 4, 3, 5]
             *     }]
             * });
             *
             * // Use the Time object
             * console.log(
             *        'Current time in New York',
             *        chart.time.dateFormat('%Y-%m-%d %H:%M:%S', Date.now())
             * );
             * ```
             *
             * Since v6.0.5, the time options were moved from the `global` object to the
             * `time` object, and time options can be set on each individual chart.
             *
             * @sample {highcharts|highstock}
             *         highcharts/time/timezone/
             *         Set the timezone globally
             * @sample {highcharts}
             *         highcharts/time/individual/
             *         Set the timezone per chart instance
             * @sample {highstock}
             *         stock/time/individual/
             *         Set the timezone per chart instance
             *
             * @since     6.0.5
             * @optionparent time
             */
            time: {
                /**
                 * A custom `Date` class for advanced date handling. For example,
                 * [JDate](https://github.com/tahajahangir/jdate) can be hooked in to
                 * handle Jalali dates.
                 *
                 * @type      {*}
                 * @since     4.0.4
                 * @product   highcharts highstock gantt
                 */
                Date: void 0,
                /**
                 * A callback to return the time zone offset for a given datetime. It
                 * takes the timestamp in terms of milliseconds since January 1 1970,
                 * and returns the timezone offset in minutes. This provides a hook
                 * for drawing time based charts in specific time zones using their
                 * local DST crossover dates, with the help of external libraries.
                 *
                 * @see [global.timezoneOffset](#global.timezoneOffset)
                 *
                 * @sample {highcharts|highstock} highcharts/time/gettimezoneoffset/
                 *         Use moment.js to draw Oslo time regardless of browser locale
                 *
                 * @type      {Highcharts.TimezoneOffsetCallbackFunction}
                 * @since     4.1.0
                 * @product   highcharts highstock gantt
                 */
                getTimezoneOffset: void 0,
                /**
                 * A named time zone. Supported time zone names rely on the browser
                 * implementations, as described in the [mdn
                 * docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#timezone).
                 * If the given time zone is not recognized by the browser, Highcharts
                 * provides a warning and falls back to returning a 0 offset,
                 * corresponding to the UCT time zone.
                 *
                 * Until v11.2.0, this option depended on moment.js.
                 *
                 * @see [getTimezoneOffset](#time.getTimezoneOffset)
                 *
                 * @sample {highcharts|highstock} highcharts/time/timezone/ Europe/Oslo
                 *
                 * @type      {string}
                 * @since     5.0.7
                 * @product   highcharts highstock gantt
                 */
                timezone: void 0,
                /**
                 * The timezone offset in minutes. Positive values are west, negative
                 * values are east of UTC, as in the ECMAScript
                 * [getTimezoneOffset](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset)
                 * method. Use this to display UTC based data in a predefined time zone.
                 *
                 * @see [time.getTimezoneOffset](#time.getTimezoneOffset)
                 *
                 * @sample {highcharts|highstock} highcharts/time/timezoneoffset/
                 *         Timezone offset
                 *
                 * @since     3.0.8
                 * @product   highcharts highstock gantt
                 */
                timezoneOffset: 0,
                /**
                 * Whether to use UTC time for axis scaling, tickmark placement and
                 * time display in `Highcharts.dateFormat`. Advantages of using UTC
                 * is that the time displays equally regardless of the user agent's
                 * time zone settings. Local time can be used when the data is loaded
                 * in real time or when correct Daylight Saving Time transitions are
                 * required.
                 *
                 * @sample {highcharts} highcharts/time/useutc-true/
                 *         True by default
                 * @sample {highcharts} highcharts/time/useutc-false/
                 *         False
                 */
                useUTC: true
            },
            chart: ChartDefaults,
            /**
             * The chart's main title.
             *
             * @sample {highmaps} maps/title/title/
             *         Title options demonstrated
             */
            title: {
                /**
                 * When the title is floating, the plot area will not move to make space
                 * for it.
                 *
                 * @sample {highcharts} highcharts/chart/zoomtype-none/
                 *         False by default
                 * @sample {highcharts} highcharts/title/floating/
                 *         True - title on top of the plot area
                 * @sample {highstock} stock/chart/title-floating/
                 *         True - title on top of the plot area
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.1
                 * @apioption title.floating
                 */
                /**
                 * Whether to
                 * [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the text.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption title.useHTML
                 */
                /**
                 * The vertical alignment of the title. Can be one of `"top"`,
                 * `"middle"` and `"bottom"`. When a value is given, the title behaves
                 * as if [floating](#title.floating) were `true`.
                 *
                 * @sample {highcharts} highcharts/title/verticalalign/
                 *         Chart title in bottom right corner
                 * @sample {highstock} stock/chart/title-verticalalign/
                 *         Chart title in bottom right corner
                 *
                 * @type      {Highcharts.VerticalAlignValue}
                 * @since     2.1
                 * @apioption title.verticalAlign
                 */
                /**
                 * The x position of the title relative to the alignment within
                 * `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @sample {highcharts} highcharts/title/align/
                 *         Aligned to the plot area (x = 70px = margin left - spacing
                 *         left)
                 * @sample {highstock} stock/chart/title-align/
                 *         Aligned to the plot area (x = 50px = margin left - spacing
                 *         left)
                 *
                 * @type      {number}
                 * @default   0
                 * @since     2.0
                 * @apioption title.x
                 */
                /**
                 * The y position of the title relative to the alignment within
                 * [chart.spacingTop](#chart.spacingTop) and [chart.spacingBottom](
                 * #chart.spacingBottom). By default it depends on the font size.
                 *
                 * @sample {highcharts} highcharts/title/y/
                 *         Title inside the plot area
                 * @sample {highstock} stock/chart/title-verticalalign/
                 *         Chart title in bottom right corner
                 *
                 * @type      {number}
                 * @since     2.0
                 * @apioption title.y
                 */
                /**
                 * CSS styles for the title. Use this for font styling, but use `align`,
                 * `x` and `y` for text alignment.
                 *
                 * In styled mode, the title style is given in the `.highcharts-title`
                 * class.
                 *
                 * @sample {highcharts} highcharts/title/style/
                 *         Custom color and weight
                 * @sample {highstock} stock/chart/title-style/
                 *         Custom color and weight
                 * @sample highcharts/css/titles/
                 *         Styled mode
                 *
                 * @type      {Highcharts.CSSObject}
                 * @default   {highcharts|highmaps} { "color": "#333333", "fontSize": "18px" }
                 * @default   {highstock} { "color": "#333333", "fontSize": "16px" }
                 */
                style: {
                    color: "#333333" /* Palette.neutralColor80 */,
                    fontWeight: 'bold'
                },
                /**
                 * The title of the chart. To disable the title, set the `text` to
                 * `undefined`.
                 *
                 * @sample {highcharts} highcharts/title/text/
                 *         Custom title
                 * @sample {highstock} stock/chart/title-text/
                 *         Custom title
                 *
                 * @default {highcharts|highmaps} Chart title
                 * @default {highstock} undefined
                 */
                text: 'Chart title',
                /**
                 * The horizontal alignment of the title. Can be one of "left", "center"
                 * and "right".
                 *
                 * @sample {highcharts} highcharts/title/align/
                 *         Aligned to the plot area (x = 70px = margin left - spacing
                 *         left)
                 * @sample {highstock} stock/chart/title-align/
                 *         Aligned to the plot area (x = 50px = margin left - spacing
                 *         left)
                 *
                 * @type  {Highcharts.AlignValue}
                 * @since 2.0
                 */
                align: 'center',
                /**
                 * The margin between the title and the plot area, or if a subtitle
                 * is present, the margin between the subtitle and the plot area.
                 *
                 * @sample {highcharts} highcharts/title/margin-50/
                 *         A chart title margin of 50
                 * @sample {highcharts} highcharts/title/margin-subtitle/
                 *         The same margin applied with a subtitle
                 * @sample {highstock} stock/chart/title-margin/
                 *         A chart title margin of 50
                 *
                 * @since 2.1
                 */
                margin: 15,
                /**
                 * Adjustment made to the title width, normally to reserve space for
                 * the exporting burger menu.
                 *
                 * @sample highcharts/title/widthadjust/
                 *         Wider menu, greater padding
                 *
                 * @since 4.2.5
                 */
                widthAdjust: -44
            },
            /**
             * The chart's subtitle. This can be used both to display a subtitle below
             * the main title, and to display random text anywhere in the chart. The
             * subtitle can be updated after chart initialization through the
             * `Chart.setTitle` method.
             *
             * @sample {highmaps} maps/title/subtitle/
             *         Subtitle options demonstrated
             */
            subtitle: {
                /**
                 * When the subtitle is floating, the plot area will not move to make
                 * space for it.
                 *
                 * @sample {highcharts} highcharts/subtitle/floating/
                 *         Floating title and subtitle
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote floating at bottom right of plot area
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.1
                 * @apioption subtitle.floating
                 */
                /**
                 * CSS styles for the title.
                 *
                 * In styled mode, the subtitle style is given in the
                 * `.highcharts-subtitle` class.
                 *
                 * @sample {highcharts} highcharts/subtitle/style/
                 *         Custom color and weight
                 * @sample {highcharts} highcharts/css/titles/
                 *         Styled mode
                 * @sample {highstock} stock/chart/subtitle-style
                 *         Custom color and weight
                 * @sample {highstock} highcharts/css/titles/
                 *         Styled mode
                 * @sample {highmaps} highcharts/css/titles/
                 *         Styled mode
                 *
                 * @type      {Highcharts.CSSObject}
                 * @default   {"color": "#666666"}
                 * @apioption subtitle.style
                 */
                /**
                 * Whether to
                 * [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the text.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption subtitle.useHTML
                 */
                /**
                 * The vertical alignment of the title. Can be one of `"top"`,
                 * `"middle"` and `"bottom"`. When middle, the subtitle behaves as
                 * floating.
                 *
                 * @sample {highcharts} highcharts/subtitle/verticalalign/
                 *         Footnote at the bottom right of plot area
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote at the bottom right of plot area
                 *
                 * @type      {Highcharts.VerticalAlignValue}
                 * @since     2.1
                 * @apioption subtitle.verticalAlign
                 */
                /**
                 * The x position of the subtitle relative to the alignment within
                 * `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @sample {highcharts} highcharts/subtitle/align/
                 *         Footnote at right of plot area
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote at the bottom right of plot area
                 *
                 * @type      {number}
                 * @default   0
                 * @since     2.0
                 * @apioption subtitle.x
                 */
                /**
                 * The y position of the subtitle relative to the alignment within
                 * `chart.spacingTop` and `chart.spacingBottom`. By default the subtitle
                 * is laid out below the title unless the title is floating.
                 *
                 * @sample {highcharts} highcharts/subtitle/verticalalign/
                 *         Footnote at the bottom right of plot area
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote at the bottom right of plot area
                 *
                 * @type      {number}
                 * @since     2.0
                 * @apioption subtitle.y
                 */
                /**
                 * CSS styles for the title.
                 *
                 * In styled mode, the subtitle style is given in the
                 * `.highcharts-subtitle` class.
                 *
                 * @sample {highcharts} highcharts/subtitle/style/
                 *         Custom color and weight
                 * @sample {highcharts} highcharts/css/titles/
                 *         Styled mode
                 * @sample {highstock} stock/chart/subtitle-style
                 *         Custom color and weight
                 * @sample {highstock} highcharts/css/titles/
                 *         Styled mode
                 * @sample {highmaps} highcharts/css/titles/
                 *         Styled mode
                 *
                 * @type      {Highcharts.CSSObject}
                 * @default   {"color": "#666666"}
                 */
                style: {
                    color: "#666666" /* Palette.neutralColor60 */,
                    fontSize: '0.8em'
                },
                /**
                 * The subtitle of the chart.
                 *
                 * @sample {highcharts|highstock} highcharts/subtitle/text/
                 *         Custom subtitle
                 * @sample {highcharts|highstock} highcharts/subtitle/text-formatted/
                 *         Formatted and linked text.
                 */
                text: '',
                /**
                 * The horizontal alignment of the subtitle. Can be one of "left",
                 *  "center" and "right".
                 *
                 * @sample {highcharts} highcharts/subtitle/align/
                 *         Footnote at right of plot area
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote at bottom right of plot area
                 *
                 * @type  {Highcharts.AlignValue}
                 * @since 2.0
                 */
                align: 'center',
                /**
                 * Adjustment made to the subtitle width, normally to reserve space
                 * for the exporting burger menu.
                 *
                 * @see [title.widthAdjust](#title.widthAdjust)
                 *
                 * @sample highcharts/title/widthadjust/
                 *         Wider menu, greater padding
                 *
                 * @since 4.2.5
                 */
                widthAdjust: -44
            },
            /**
             * The chart's caption, which will render below the chart and will be part
             * of exported charts. The caption can be updated after chart initialization
             * through the `Chart.update` or `Chart.caption.update` methods.
             *
             * @sample highcharts/caption/text/
             *         A chart with a caption
             * @since  7.2.0
             */
            caption: {
                /**
                 * When the caption is floating, the plot area will not move to make
                 * space for it.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption caption.floating
                 */
                /**
                 * The margin between the caption and the plot area.
                 */
                margin: 15,
                /**
                 * Whether to
                 * [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the text.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption caption.useHTML
                 */
                /**
                 * The x position of the caption relative to the alignment within
                 * `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @type      {number}
                 * @default   0
                 * @apioption caption.x
                 */
                /**
                 * The y position of the caption relative to the alignment within
                 * `chart.spacingTop` and `chart.spacingBottom`.
                 *
                 * @type      {number}
                 * @apioption caption.y
                 */
                /**
                 * CSS styles for the caption.
                 *
                 * In styled mode, the caption style is given in the
                 * `.highcharts-caption` class.
                 *
                 * @sample {highcharts} highcharts/css/titles/
                 *         Styled mode
                 *
                 * @type      {Highcharts.CSSObject}
                 * @default   {"color": "#666666"}
                 */
                style: {
                    color: "#666666" /* Palette.neutralColor60 */,
                    fontSize: '0.8em'
                },
                /**
                 * The caption text of the chart.
                 *
                 * @sample {highcharts} highcharts/caption/text/
                 *         Custom caption
                 */
                text: '',
                /**
                 * The horizontal alignment of the caption. Can be one of "left",
                 *  "center" and "right".
                 *
                 * @type  {Highcharts.AlignValue}
                 */
                align: 'left',
                /**
                 * The vertical alignment of the caption. Can be one of `"top"`,
                 * `"middle"` and `"bottom"`. When middle, the caption behaves as
                 * floating.
                 *
                 * @type      {Highcharts.VerticalAlignValue}
                 */
                verticalAlign: 'bottom'
            },
            /**
             * The plotOptions is a wrapper object for config objects for each series
             * type. The config objects for each series can also be overridden for
             * each series item as given in the series array.
             *
             * Configuration options for the series are given in three levels. Options
             * for all series in a chart are given in the [plotOptions.series](
             * #plotOptions.series) object. Then options for all series of a specific
             * type are given in the plotOptions of that type, for example
             * `plotOptions.line`. Next, options for one single series are given in
             * [the series array](#series).
             */
            plotOptions: {},
            /**
             * The legend is a box containing a symbol and name for each series
             * item or point item in the chart. Each series (or points in case
             * of pie charts) is represented by a symbol and its name in the legend.
             *
             * It is possible to override the symbol creator function and create
             * [custom legend symbols](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/studies/legend-custom-symbol/).
             *
             * @productdesc {highmaps}
             * A Highmaps legend by default contains one legend item per series, but if
             * a `colorAxis` is defined, the axis will be displayed in the legend.
             * Either as a gradient, or as multiple legend items for `dataClasses`.
             */
            legend: {
                /**
                 * The background color of the legend.
                 *
                 * @see In styled mode, the legend background fill can be applied with
                 *      the `.highcharts-legend-box` class.
                 *
                 * @sample {highcharts} highcharts/legend/backgroundcolor/
                 *         Yellowish background
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption legend.backgroundColor
                 */
                /**
                 * The width of the drawn border around the legend.
                 *
                 * @see In styled mode, the legend border stroke width can be applied
                 *      with the `.highcharts-legend-box` class.
                 *
                 * @sample {highcharts} highcharts/legend/borderwidth/
                 *         2px border width
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 *
                 * @type      {number}
                 * @default   0
                 * @apioption legend.borderWidth
                 */
                /**
                 * Enable or disable the legend. There is also a series-specific option,
                 * [showInLegend](#plotOptions.series.showInLegend), that can hide the
                 * series from the legend. In some series types this is `false` by
                 * default, so it must set to `true` in order to show the legend for the
                 * series.
                 *
                 * @sample {highcharts} highcharts/legend/enabled-false/ Legend disabled
                 * @sample {highstock} stock/legend/align/ Various legend options
                 * @sample {highmaps} maps/legend/enabled-false/ Legend disabled
                 *
                 * @default {highstock} false
                 * @default {highmaps} true
                 * @default {gantt} false
                 */
                enabled: true,
                /**
                 * The horizontal alignment of the legend box within the chart area.
                 * Valid values are `left`, `center` and `right`.
                 *
                 * In the case that the legend is aligned in a corner position, the
                 * `layout` option will determine whether to place it above/below
                 * or on the side of the plot area.
                 *
                 * @sample {highcharts} highcharts/legend/align/
                 *         Legend at the right of the chart
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/alignment/
                 *         Legend alignment
                 *
                 * @type  {Highcharts.AlignValue}
                 * @since 2.0
                 */
                align: 'center',
                /**
                 * If the [layout](legend.layout) is `horizontal` and the legend items
                 * span over two lines or more, whether to align the items into vertical
                 * columns. Setting this to `false` makes room for more items, but will
                 * look more messy.
                 *
                 * @since 6.1.0
                 */
                alignColumns: true,
                /**
                 * A CSS class name to apply to the legend group.
                 */
                className: 'highcharts-no-tooltip',
                /**
                 * When the legend is floating, the plot area ignores it and is allowed
                 * to be placed below it.
                 *
                 * @sample {highcharts} highcharts/legend/floating-false/
                 *         False by default
                 * @sample {highcharts} highcharts/legend/floating-true/
                 *         True
                 * @sample {highmaps} maps/legend/alignment/
                 *         Floating legend
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.1
                 * @apioption legend.floating
                 */
                /**
                 * The layout of the legend items. Can be one of `horizontal` or
                 * `vertical` or `proximate`. When `proximate`, the legend items will be
                 * placed as close as possible to the graphs they're representing,
                 * except in inverted charts or when the legend position doesn't allow
                 * it.
                 *
                 * @sample {highcharts} highcharts/legend/layout-horizontal/
                 *         Horizontal by default
                 * @sample {highcharts} highcharts/legend/layout-vertical/
                 *         Vertical
                 * @sample highcharts/legend/layout-proximate
                 *         Labels proximate to the data
                 * @sample {highstock} stock/legend/layout-horizontal/
                 *         Horizontal by default
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Vertical with data classes
                 * @sample {highmaps} maps/legend/layout-vertical/
                 *         Vertical with color axis gradient
                 *
                 * @validvalue ["horizontal", "vertical", "proximate"]
                 */
                layout: 'horizontal',
                /**
                 * In a legend with horizontal layout, the itemDistance defines the
                 * pixel distance between each item.
                 *
                 * @sample {highcharts} highcharts/legend/layout-horizontal/
                 *         50px item distance
                 * @sample {highstock} highcharts/legend/layout-horizontal/
                 *         50px item distance
                 *
                 * @type      {number}
                 * @default   {highcharts} 20
                 * @default   {highstock} 20
                 * @default   {highmaps} 8
                 * @since     3.0.3
                 * @apioption legend.itemDistance
                 */
                /**
                 * The pixel bottom margin for each legend item.
                 *
                 * @sample {highcharts|highstock} highcharts/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 *
                 * @since     2.2.0
                 */
                itemMarginBottom: 2,
                /**
                 * The pixel top margin for each legend item.
                 *
                 * @sample {highcharts|highstock} highcharts/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 *
                 * @since     2.2.0
                 */
                itemMarginTop: 2,
                /**
                 * The width for each legend item. By default the items are laid out
                 * successively. In a [horizontal layout](legend.layout), if the items
                 * are laid out across two rows or more, they will be vertically aligned
                 * depending on the [legend.alignColumns](legend.alignColumns) option.
                 *
                 * @sample {highcharts} highcharts/legend/itemwidth-default/
                 *         Undefined by default
                 * @sample {highcharts} highcharts/legend/itemwidth-80/
                 *         80 for aligned legend items
                 *
                 * @type      {number}
                 * @since     2.0
                 * @apioption legend.itemWidth
                 */
                /**
                 * A [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
                 * for each legend label. Available variables relates to properties on
                 * the series, or the point in case of pies.
                 *
                 * @type      {string}
                 * @default   {name}
                 * @since     1.3
                 * @apioption legend.labelFormat
                 */
                /* eslint-disable valid-jsdoc */
                /**
                 * Callback function to format each of the series' labels. The `this`
                 * keyword refers to the series object, or the point object in case of
                 * pie charts. By default the series or point name is printed.
                 *
                 * @productdesc {highmaps}
                 * In Highmaps the context can also be a data class in case of a
                 * `colorAxis`.
                 *
                 * @sample {highcharts} highcharts/legend/labelformatter/
                 *         Add text
                 * @sample {highmaps} maps/legend/labelformatter/
                 *         Data classes with label formatter
                 *
                 * @type {Highcharts.FormatterCallbackFunction<Point|Series>}
                 */
                labelFormatter: function () {
                    // eslint-enable valid-jsdoc
                    return this.name;
                },
                /**
                 * Line height for the legend items. Deprecated as of 2.1\. Instead,
                 * the line height for each item can be set using
                 * `itemStyle.lineHeight`, and the padding between items using
                 * `itemMarginTop` and `itemMarginBottom`.
                 *
                 * @sample {highcharts} highcharts/legend/lineheight/
                 *         Setting padding
                 *
                 * @deprecated
                 *
                 * @type      {number}
                 * @default   16
                 * @since     2.0
                 * @product   highcharts gantt
                 * @apioption legend.lineHeight
                 */
                /**
                 * If the plot area sized is calculated automatically and the legend is
                 * not floating, the legend margin is the space between the legend and
                 * the axis labels or plot area.
                 *
                 * @sample {highcharts} highcharts/legend/margin-default/
                 *         12 pixels by default
                 * @sample {highcharts} highcharts/legend/margin-30/
                 *         30 pixels
                 *
                 * @type      {number}
                 * @default   12
                 * @since     2.1
                 * @apioption legend.margin
                 */
                /**
                 * Maximum pixel height for the legend. When the maximum height is
                 * extended, navigation will show.
                 *
                 * @type      {number}
                 * @since     2.3.0
                 * @apioption legend.maxHeight
                 */
                /**
                 * The color of the drawn border around the legend.
                 *
                 * @see In styled mode, the legend border stroke can be applied with the
                 *      `.highcharts-legend-box` class.
                 *
                 * @sample {highcharts} highcharts/legend/bordercolor/
                 *         Brown border
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                borderColor: "#999999" /* Palette.neutralColor40 */,
                /**
                 * The border corner radius of the legend.
                 *
                 * @sample {highcharts} highcharts/legend/borderradius-default/
                 *         Square by default
                 * @sample {highcharts} highcharts/legend/borderradius-round/
                 *         5px rounded
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 */
                borderRadius: 0,
                /**
                 * Options for the paging or navigation appearing when the legend is
                 * overflown. Navigation works well on screen, but not in static
                 * exported images. One way of working around that is to
                 * [increase the chart height in
                 * export](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/legend/navigation-enabled-false/).
                 *
                 * @sample highcharts/legend/scrollable-vertical/
                 *         Legend with vertical scrollable extension
                 * @sample highcharts/legend/scrollable-horizontal/
                 *         Legend with horizontal scrollable extension
                 *
                 */
                navigation: {
                    /**
                     * How to animate the pages when navigating up or down. A value of
                     * `true` applies the default navigation given in the
                     * `chart.animation` option. Additional options can be given as an
                     * object containing values for easing and duration.
                     *
                     * @sample {highcharts} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     * @sample {highstock} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     *
                     * @type      {boolean|Partial<Highcharts.AnimationOptionsObject>}
                     * @default   true
                     * @since     2.2.4
                     * @apioption legend.navigation.animation
                     */
                    /**
                     * The pixel size of the up and down arrows in the legend paging
                     * navigation.
                     *
                     * @sample {highcharts} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     * @sample {highstock} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     *
                     * @type      {number}
                     * @default   12
                     * @since     2.2.4
                     * @apioption legend.navigation.arrowSize
                     */
                    /**
                     * Whether to enable the legend navigation. In most cases, disabling
                     * the navigation results in an unwanted overflow.
                     *
                     * See also the
                     * [adapt chart to legend](https://github.com/highcharts/adapt-chart-to-legend)
                     * plugin for a solution to extend the chart height to make room for
                     * the legend, optionally in exported charts only.
                     *
                     * @type      {boolean}
                     * @default   true
                     * @since     4.2.4
                     * @apioption legend.navigation.enabled
                     */
                    /**
                     * Text styles for the legend page navigation.
                     *
                     * @see In styled mode, the navigation items are styled with the
                     *      `.highcharts-legend-navigation` class.
                     *
                     * @sample {highcharts} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     * @sample {highstock} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     *
                     * @type      {Highcharts.CSSObject}
                     * @since     2.2.4
                     * @apioption legend.navigation.style
                     */
                    style: {
                        fontSize: '0.8em'
                    },
                    /**
                     * The color for the active up or down arrow in the legend page
                     * navigation.
                     *
                     * @see In styled mode, the active arrow be styled with the
                     *      `.highcharts-legend-nav-active` class.
                     *
                     * @sample  {highcharts} highcharts/legend/navigation/
                     *          Legend page navigation demonstrated
                     * @sample  {highstock} highcharts/legend/navigation/
                     *          Legend page navigation demonstrated
                     *
                     * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @since 2.2.4
                     */
                    activeColor: "#0022ff" /* Palette.highlightColor100 */,
                    /**
                     * The color of the inactive up or down arrow in the legend page
                     * navigation. .
                     *
                     * @see In styled mode, the inactive arrow be styled with the
                     *      `.highcharts-legend-nav-inactive` class.
                     *
                     * @sample {highcharts} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     * @sample {highstock} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     *
                     * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @since 2.2.4
                     */
                    inactiveColor: "#cccccc" /* Palette.neutralColor20 */
                },
                /**
                 * The inner padding of the legend box.
                 *
                 * @sample {highcharts|highstock} highcharts/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 *
                 * @type      {number}
                 * @default   8
                 * @since     2.2.0
                 * @apioption legend.padding
                 */
                /**
                 * Whether to reverse the order of the legend items compared to the
                 * order of the series or points as defined in the configuration object.
                 *
                 * @see [yAxis.reversedStacks](#yAxis.reversedStacks),
                 *      [series.legendIndex](#series.legendIndex)
                 *
                 * @sample {highcharts} highcharts/legend/reversed/
                 *         Stacked bar with reversed legend
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     1.2.5
                 * @apioption legend.reversed
                 */
                /**
                 * Whether to show the symbol on the right side of the text rather than
                 * the left side. This is common in Arabic and Hebrew.
                 *
                 * @sample {highcharts} highcharts/legend/rtl/
                 *         Symbol to the right
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.2
                 * @apioption legend.rtl
                 */
                /**
                 * CSS styles for the legend area. In the 1.x versions the position
                 * of the legend area was determined by CSS. In 2.x, the position is
                 * determined by properties like `align`, `verticalAlign`, `x` and `y`,
                 * but the styles are still parsed for backwards compatibility.
                 *
                 * @deprecated
                 *
                 * @type      {Highcharts.CSSObject}
                 * @product   highcharts highstock
                 * @apioption legend.style
                 */
                /**
                 * CSS styles for each legend item. Only a subset of CSS is supported,
                 * notably those options related to text. The default `textOverflow`
                 * property makes long texts truncate. Set it to `undefined` to wrap
                 * text instead. A `width` property can be added to control the text
                 * width.
                 *
                 * @see In styled mode, the legend items can be styled with the
                 *      `.highcharts-legend-item` class.
                 *
                 * @sample {highcharts} highcharts/legend/itemstyle/
                 *         Bold black text
                 * @sample {highmaps} maps/legend/itemstyle/
                 *         Item text styles
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"color": "#333333", "cursor": "pointer", "fontSize": "0.75em", "fontWeight": "bold", "textOverflow": "ellipsis"}
                 */
                itemStyle: {
                    /**
                     * @ignore
                     */
                    color: "#333333" /* Palette.neutralColor80 */,
                    /**
                     * @ignore
                     */
                    cursor: 'pointer',
                    /**
                     * @ignore
                     */
                    fontSize: '0.8em',
                    /**
                     * @ignore
                     */
                    textDecoration: 'none',
                    /**
                     * @ignore
                     */
                    textOverflow: 'ellipsis'
                },
                /**
                 * CSS styles for each legend item in hover mode. Only a subset of
                 * CSS is supported, notably those options related to text. Properties
                 * are inherited from `style` unless overridden here.
                 *
                 * @see In styled mode, the hovered legend items can be styled with
                 *      the `.highcharts-legend-item:hover` pseudo-class.
                 *
                 * @sample {highcharts} highcharts/legend/itemhoverstyle/
                 *         Red on hover
                 * @sample {highmaps} maps/legend/itemstyle/
                 *         Item text styles
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"color": "#000000"}
                 */
                itemHoverStyle: {
                    /**
                     * @ignore
                     */
                    color: "#000000" /* Palette.neutralColor100 */
                },
                /**
                 * CSS styles for each legend item when the corresponding series or
                 * point is hidden. Only a subset of CSS is supported, notably those
                 * options related to text. Properties are inherited from `style`
                 * unless overridden here.
                 *
                 * @see In styled mode, the hidden legend items can be styled with
                 *      the `.highcharts-legend-item-hidden` class.
                 *
                 * @sample {highcharts} highcharts/legend/itemhiddenstyle/
                 *         Darker gray color
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"color": "#cccccc"}
                 */
                itemHiddenStyle: {
                    /**
                     * @ignore
                     */
                    color: "#666666" /* Palette.neutralColor60 */,
                    /**
                     * @ignore
                     */
                    textDecoration: 'line-through'
                },
                /**
                 * Whether to apply a drop shadow to the legend. A `backgroundColor`
                 * also needs to be applied for this to take effect. The shadow can be
                 * an object configuration containing `color`, `offsetX`, `offsetY`,
                 * `opacity` and `width`.
                 *
                 * @sample {highcharts} highcharts/legend/shadow/
                 *         White background and drop shadow
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 *
                 * @type {boolean|Highcharts.CSSObject}
                 */
                shadow: false,
                /**
                 * Default styling for the checkbox next to a legend item when
                 * `showCheckbox` is true.
                 *
                 * @type {Highcharts.CSSObject}
                 * @default {"width": "13px", "height": "13px", "position":"absolute"}
                 */
                itemCheckboxStyle: {
                    /**
                     * @ignore
                     */
                    position: 'absolute',
                    /**
                     * @ignore
                     */
                    width: '13px',
                    /**
                     * @ignore
                     */
                    height: '13px'
                },
                /// itemWidth: undefined,
                /**
                 * When this is true, the legend symbol width will be the same as
                 * the symbol height, which in turn defaults to the font size of the
                 * legend items.
                 *
                 * @since 5.0.0
                 */
                squareSymbol: true,
                /**
                 * The pixel height of the symbol for series types that use a rectangle
                 * in the legend. Defaults to the font size of legend items.
                 *
                 * Note: This option is a default source of color axis height, if the
                 * [colorAxis.height](https://api.highcharts.com/highcharts/colorAxis.height)
                 * option is not set.
                 *
                 * @productdesc {highmaps}
                 * In Highmaps, when the symbol is the gradient of a vertical color
                 * axis, the height defaults to 200.
                 *
                 * @sample {highmaps} maps/legend/layout-vertical-sized/
                 *         Sized vertical gradient
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         No distance between data classes
                 *
                 * @type      {number}
                 * @since     3.0.8
                 * @apioption legend.symbolHeight
                 */
                /**
                 * The border radius of the symbol for series types that use a rectangle
                 * in the legend. Defaults to half the `symbolHeight`, effectively
                 * creating a circle.
                 *
                 * For color axis scales, it defaults to 3.
                 *
                 * @sample {highcharts} highcharts/legend/symbolradius/
                 *         Round symbols
                 * @sample {highstock} highcharts/legend/symbolradius/
                 *         Round symbols
                 * @sample {highmaps} highcharts/legend/symbolradius/
                 *         Round symbols
                 *
                 * @type      {number}
                 * @since     3.0.8
                 * @apioption legend.symbolRadius
                 */
                /**
                 * The pixel width of the legend item symbol. When the `squareSymbol`
                 * option is set, this defaults to the `symbolHeight`, otherwise 16.
                 *
                 * Note: This option is a default source of color axis width, if the
                 * [colorAxis.width](https://api.highcharts.com/highcharts/colorAxis.width)
                 * option is not set.
                 *
                 * @productdesc {highmaps}
                 * In Highmaps, when the symbol is the gradient of a horizontal color
                 * axis, the width defaults to 200.
                 *
                 * @sample {highcharts} highcharts/legend/symbolwidth/
                 *         Greater symbol width and padding
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 * @sample {highmaps} maps/legend/layout-vertical-sized/
                 *         Sized vertical gradient
                 *
                 * @type      {number}
                 * @apioption legend.symbolWidth
                 */
                /**
                 * Whether to [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the legend item texts.
                 *
                 * Prior to 4.1.7, when using HTML, [legend.navigation](
                 * #legend.navigation) was disabled.
                 *
                 * @sample highcharts/legend/scrollable-vertical/
                 *         Legend with vertical scrollable extension
                 * @sample highcharts/legend/scrollable-horizontal/
                 *         Legend with horizontal scrollable extension
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption legend.useHTML
                 */
                /**
                 * For a color axis with data classes, how many decimals to render in
                 * the legend. The default preserves the decimals of the range numbers.
                 *
                 * @type      {number}
                 * @default   -1
                 * @product   highcharts highmaps
                 * @apioption legend.valueDecimals
                 */
                /**
                 * For a color axis with data classes, a suffix for the range numbers in
                 * the legend.
                 *
                 * @type      {string}
                 * @default   ''
                 * @product   highcharts highmaps
                 * @apioption legend.valueSuffix
                 */
                /**
                 * The width of the legend box. If a number is set, it translates to
                 * pixels. Since v7.0.2 it allows setting a percent string of the full
                 * chart width, for example `40%`.
                 *
                 * Defaults to the full chart width for legends below or above the
                 * chart, half the chart width for legends to the left and right.
                 *
                 * @sample {highcharts} highcharts/legend/width/
                 *         Aligned to the plot area
                 * @sample {highcharts} highcharts/legend/width-percent/
                 *         A percent of the chart width
                 *
                 * @type      {number|string}
                 * @since     2.0
                 * @apioption legend.width
                 */
                /**
                 * The pixel padding between the legend item symbol and the legend
                 * item text.
                 *
                 * @sample {highcharts} highcharts/legend/symbolpadding/
                 *         Greater symbol width and padding
                 */
                symbolPadding: 5,
                /**
                 * The vertical alignment of the legend box. Can be one of `top`,
                 * `middle` or `bottom`. Vertical position can be further determined
                 * by the `y` option.
                 *
                 * In the case that the legend is aligned in a corner position, the
                 * `layout` option will determine whether to place it above/below
                 * or on the side of the plot area.
                 *
                 * When the [layout](#legend.layout) option is `proximate`, the
                 * `verticalAlign` option doesn't apply.
                 *
                 * @sample {highcharts} highcharts/legend/verticalalign/
                 *         Legend 100px from the top of the chart
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/alignment/
                 *         Legend alignment
                 *
                 * @type  {Highcharts.VerticalAlignValue}
                 * @since 2.0
                 */
                verticalAlign: 'bottom',
                // Width: undefined,
                /**
                 * The x offset of the legend relative to its horizontal alignment
                 * `align` within chart.spacingLeft and chart.spacingRight. Negative
                 * x moves it to the left, positive x moves it to the right.
                 *
                 * @sample {highcharts} highcharts/legend/width/
                 *         Aligned to the plot area
                 *
                 * @since 2.0
                 */
                x: 0,
                /**
                 * The vertical offset of the legend relative to it's vertical alignment
                 * `verticalAlign` within chart.spacingTop and chart.spacingBottom.
                 *  Negative y moves it up, positive y moves it down.
                 *
                 * @sample {highcharts} highcharts/legend/verticalalign/
                 *         Legend 100px from the top of the chart
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/alignment/
                 *         Legend alignment
                 *
                 * @since 2.0
                 */
                y: 0,
                /**
                 * A title to be added on top of the legend.
                 *
                 * @sample {highcharts} highcharts/legend/title/
                 *         Legend title
                 * @sample {highmaps} maps/legend/alignment/
                 *         Legend with title
                 *
                 * @since 3.0
                 */
                title: {
                    /**
                     * A text or HTML string for the title.
                     *
                     * @type      {string}
                     * @since     3.0
                     * @apioption legend.title.text
                     */
                    /**
                     * Generic CSS styles for the legend title.
                     *
                     * @see In styled mode, the legend title is styled with the
                     *      `.highcharts-legend-title` class.
                     *
                     * @type    {Highcharts.CSSObject}
                     * @default {"fontSize": "0.75em", "fontWeight": "bold"}
                     * @since   3.0
                     */
                    style: {
                        /**
                         * @ignore
                         */
                        fontSize: '0.8em',
                        /**
                         * @ignore
                         */
                        fontWeight: 'bold'
                    }
                }
            },
            /**
             * The loading options control the appearance of the loading screen
             * that covers the plot area on chart operations. This screen only
             * appears after an explicit call to `chart.showLoading()`. It is a
             * utility for developers to communicate to the end user that something
             * is going on, for example while retrieving new data via an XHR connection.
             * The "Loading..." text itself is not part of this configuration
             * object, but part of the `lang` object.
             */
            loading: {
                /**
                 * The duration in milliseconds of the fade out effect.
                 *
                 * @sample highcharts/loading/hideduration/
                 *         Fade in and out over a second
                 *
                 * @type      {number}
                 * @default   100
                 * @since     1.2.0
                 * @apioption loading.hideDuration
                 */
                /**
                 * The duration in milliseconds of the fade in effect.
                 *
                 * @sample highcharts/loading/hideduration/
                 *         Fade in and out over a second
                 *
                 * @type      {number}
                 * @default   100
                 * @since     1.2.0
                 * @apioption loading.showDuration
                 */
                /**
                 * CSS styles for the loading label `span`.
                 *
                 * @see In styled mode, the loading label is styled with the
                 *      `.highcharts-loading-inner` class.
                 *
                 * @sample {highcharts|highmaps} highcharts/loading/labelstyle/
                 *         Vertically centered
                 * @sample {highstock} stock/loading/general/
                 *         Label styles
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"fontWeight": "bold", "position": "relative", "top": "45%"}
                 * @since   1.2.0
                 */
                labelStyle: {
                    /**
                     * @ignore
                     */
                    fontWeight: 'bold',
                    /**
                     * @ignore
                     */
                    position: 'relative',
                    /**
                     * @ignore
                     */
                    top: '45%'
                },
                /**
                 * CSS styles for the loading screen that covers the plot area.
                 *
                 * In styled mode, the loading label is styled with the
                 * `.highcharts-loading` class.
                 *
                 * @sample  {highcharts|highmaps} highcharts/loading/style/
                 *          Gray plot area, white text
                 * @sample  {highstock} stock/loading/general/
                 *          Gray plot area, white text
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"position": "absolute", "backgroundColor": "#ffffff", "opacity": 0.5, "textAlign": "center"}
                 * @since   1.2.0
                 */
                style: {
                    /**
                     * @ignore
                     */
                    position: 'absolute',
                    /**
                     * @ignore
                     */
                    backgroundColor: "#ffffff" /* Palette.backgroundColor */,
                    /**
                     * @ignore
                     */
                    opacity: 0.5,
                    /**
                     * @ignore
                     */
                    textAlign: 'center'
                }
            },
            /**
             * Options for the tooltip that appears when the user hovers over a
             * series or point.
             *
             * @declare Highcharts.TooltipOptions
             */
            tooltip: {
                /**
                 * The color of the tooltip border. When `undefined`, the border takes
                 * the color of the corresponding series or point.
                 *
                 * Note that the [borderWidth](#tooltip.borderWidth) is usually 0 by
                 * default, so the border color may not be visible until a border width
                 * is set.
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/ Follow
                 *         series by default
                 * @sample {highcharts} highcharts/tooltip/bordercolor-black/ Black
                 *         border
                 * @sample {highstock} stock/tooltip/general/ Styled tooltip
                 * @sample {highmaps} maps/tooltip/background-border/ Background and
                 *         border demo
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption tooltip.borderColor
                 */
                /**
                 * A CSS class name to apply to the tooltip's container div,
                 * allowing unique CSS styling for each chart.
                 *
                 * @type      {string}
                 * @apioption tooltip.className
                 */
                /**
                 * Since 4.1, the crosshair definitions are moved to the Axis object
                 * in order for a better separation from the tooltip. See
                 * [xAxis.crosshair](#xAxis.crosshair).
                 *
                 * @sample {highcharts} highcharts/tooltip/crosshairs-x/
                 *         Enable a crosshair for the x value
                 *
                 * @deprecated
                 *
                 * @type      {*}
                 * @default   true
                 * @apioption tooltip.crosshairs
                 */
                /**
                 * Distance from point to tooltip in pixels.
                 *
                 * @type      {number}
                 * @default   16
                 * @apioption tooltip.distance
                 */
                /**
                 * Whether the tooltip should follow the mouse as it moves across
                 * columns, pie slices and other point types with an extent.
                 * By default it behaves this way for pie, polygon, map, sankey
                 * and wordcloud series by override in the `plotOptions`
                 * for those series types.
                 *
                 * Does not apply if [split](#tooltip.split) is `true`.
                 *
                 * For touch moves to behave the same way, [followTouchMove](
                 * #tooltip.followTouchMove) must be `true` also.
                 *
                 * @sample highcharts/tooltip/followpointer/
                 *         Tooltip follow pointer comparison
                 *
                 * @type      {boolean}
                 * @default   {highcharts} false
                 * @default   {highstock} false
                 * @default   {highmaps} true
                 * @since     3.0
                 * @apioption tooltip.followPointer
                 */
                /**
                 * Whether the tooltip should update as the finger moves on a touch
                 * device. If this is `true` and [chart.panning](#chart.panning) is
                 * set,`followTouchMove` will take over one-finger touches, so the user
                 * needs to use two fingers for zooming and panning.
                 *
                 * Note the difference to [followPointer](#tooltip.followPointer) that
                 * only defines the _position_ of the tooltip. If `followPointer` is
                 * false in for example a column series, the tooltip will show above or
                 * below the column, but as `followTouchMove` is true, the tooltip will
                 * jump from column to column as the user swipes across the plot area.
                 *
                 * @type      {boolean}
                 * @default   {highcharts} true
                 * @default   {highstock} true
                 * @default   {highmaps} false
                 * @since     3.0.1
                 * @apioption tooltip.followTouchMove
                 */
                /**
                 * A [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
                 * for the whole tooltip. When format strings are a requirement, it is
                 * usually more convenient to use `headerFormat`, `pointFormat` and
                 * `footerFormat`, but the `format` option allows combining them into
                 * one setting.
                 *
                 * The context of the format string is the same as that of the
                 * `formatter` callback.
                 *
                 * @sample {highcharts} highcharts/tooltip/format-shared/
                 *         Format for shared tooltip
                 *
                 * @type      {string}
                 * @default   undefined
                 * @since 11.1.0
                 * @apioption tooltip.format
                 */
                /**
                 * Callback function to format the text of the tooltip from scratch. In
                 * case of single or [shared](#tooltip.shared) tooltips, a string should
                 * be returned. In case of [split](#tooltip.split) tooltips, it should
                 * return an array where the first item is the header, and subsequent
                 * items are mapped to the points. Return `false` to disable tooltip for
                 * a specific point on series.
                 *
                 * A subset of HTML is supported. Unless `useHTML` is true, the HTML of
                 * the tooltip is parsed and converted to SVG, therefore this isn't a
                 * complete HTML renderer. The following HTML tags are supported: `b`,
                 * `br`, `em`, `i`, `span`, `strong`. Spans can be styled with a `style`
                 * attribute, but only text-related CSS, that is shared with SVG, is
                 * handled.
                 *
                 * The available data in the formatter differ a bit depending on whether
                 * the tooltip is shared or split, or belongs to a single point. In a
                 * shared/split tooltip, all properties except `x`, which is common for
                 * all points, are kept in an array, `this.points`.
                 *
                 * Available data are:
                 *
                 * - **this.percentage (not shared) /**
                 *   **this.points[i].percentage (shared)**:
                 *   Stacked series and pies only. The point's percentage of the total.
                 *
                 * - **this.point (not shared) / this.points[i].point (shared)**:
                 *   The point object. The point name, if defined, is available through
                 *   `this.point.name`.
                 *
                 * - **this.points**:
                 *   In a shared tooltip, this is an array containing all other
                 *   properties for each point.
                 *
                 * - **this.series (not shared) / this.points[i].series (shared)**:
                 *   The series object. The series name is available through
                 *   `this.series.name`.
                 *
                 * - **this.total (not shared) / this.points[i].total (shared)**:
                 *   Stacked series only. The total value at this point's x value.
                 *
                 * - **this.x**:
                 *   The x value. This property is the same regardless of the tooltip
                 *   being shared or not.
                 *
                 * - **this.y (not shared) / this.points[i].y (shared)**:
                 *   The y value.
                 *
                 * @sample {highcharts} highcharts/tooltip/formatter-simple/
                 *         Simple string formatting
                 * @sample {highcharts} highcharts/tooltip/formatter-shared/
                 *         Formatting with shared tooltip
                 * @sample {highcharts|highstock} highcharts/tooltip/formatter-split/
                 *         Formatting with split tooltip
                 * @sample highcharts/tooltip/formatter-conditional-default/
                 *         Extending default formatter
                 * @sample {highstock} stock/tooltip/formatter/
                 *         Formatting with shared tooltip
                 * @sample {highmaps} maps/tooltip/formatter/
                 *         String formatting
                 *
                 * @type      {Highcharts.TooltipFormatterCallbackFunction}
                 * @apioption tooltip.formatter
                 */
                /**
                 * Callback function to format the text of the tooltip for
                 * visible null points.
                 * Works analogously to [formatter](#tooltip.formatter).
                 *
                 * @sample highcharts/plotoptions/series-nullformat
                 *         Format data label and tooltip for null point.
                 *
                 * @type      {Highcharts.TooltipFormatterCallbackFunction}
                 * @apioption tooltip.nullFormatter
                 */
                /**
                 * Whether to allow the tooltip to render outside the chart's SVG
                 * element box. By default (`false`), the tooltip is rendered within the
                 * chart's SVG element, which results in the tooltip being aligned
                 * inside the chart area. For small charts, this may result in clipping
                 * or overlapping. When `true`, a separate SVG element is created and
                 * overlaid on the page, allowing the tooltip to be aligned inside the
                 * page itself.
                 *
                 * Defaults to `true` if `chart.scrollablePlotArea` is activated,
                 * otherwise `false`.
                 *
                 * @sample highcharts/tooltip/outside
                 *         Small charts with tooltips outside
                 *
                 * @type      {boolean|undefined}
                 * @default   undefined
                 * @since     6.1.1
                 * @apioption tooltip.outside
                 */
                /**
                 * A callback function for formatting the HTML output for a single point
                 * in the tooltip. Like the `pointFormat` string, but with more
                 * flexibility.
                 *
                 * @type      {Highcharts.FormatterCallbackFunction<Highcharts.Point>}
                 * @since     4.1.0
                 * @context   Highcharts.Point
                 * @apioption tooltip.pointFormatter
                 */
                /**
                 * A callback function to place the tooltip in a custom position. The
                 * callback receives three parameters: `labelWidth`, `labelHeight` and
                 * `point`, where point contains values for `plotX` and `plotY` telling
                 * where the reference point is in the plot area. Add `chart.plotLeft`
                 * and `chart.plotTop` to get the full coordinates.
                 *
                 * To find the actual hovered `Point` instance, use
                 * `this.chart.hoverPoint`. For shared or split tooltips, all the hover
                 * points are available in `this.chart.hoverPoints`.
                 *
                 * Since v7, when [tooltip.split](#tooltip.split) option is enabled,
                 * positioner is called for each of the boxes separately, including
                 * xAxis header. xAxis header is not a point, instead `point` argument
                 * contains info: `{ plotX: Number, plotY: Number, isHeader: Boolean }`
                 *
                 * The return should be an object containing x and y values, for example
                 * `{ x: 100, y: 100 }`.
                 *
                 * @sample {highcharts} highcharts/tooltip/positioner/
                 *         A fixed tooltip position
                 * @sample {highstock} stock/tooltip/positioner/
                 *         A fixed tooltip position on top of the chart
                 * @sample {highmaps} maps/tooltip/positioner/
                 *         A fixed tooltip position
                 * @sample {highstock} stock/tooltip/split-positioner/
                 *         Split tooltip with fixed positions
                 * @sample {highstock} stock/tooltip/positioner-scrollable-plotarea/
                 *         Scrollable plot area combined with tooltip positioner
                 *
                 * @type      {Highcharts.TooltipPositionerCallbackFunction}
                 * @since     2.2.4
                 * @apioption tooltip.positioner
                 */
                /**
                 * Split the tooltip into one label per series, with the header close
                 * to the axis. This is recommended over [shared](#tooltip.shared)
                 * tooltips for charts with multiple line series, generally making them
                 * easier to read. This option takes precedence over `tooltip.shared`.
                 *
                 * Not supported for [polar](#chart.polar) and [inverted](#chart.inverted) charts.
                 *
                 * @productdesc {highstock} In Highcharts Stock, tooltips are split
                 * by default since v6.0.0. Stock charts typically contain
                 * multi-dimension points and multiple panes, making split tooltips
                 * the preferred layout over
                 * the previous `shared` tooltip.
                 *
                 * @sample highcharts/tooltip/split/
                 *         Split tooltip
                 * @sample {highcharts|highstock} highcharts/tooltip/formatter-split/
                 *         Split tooltip and custom formatter callback
                 *
                 * @type      {boolean}
                 * @default   {highcharts} false
                 * @default   {highstock} true
                 * @since     5.0.0
                 * @product   highcharts highstock
                 * @apioption tooltip.split
                 */
                /**
                 * Prevents the tooltip from switching or closing, when touched or
                 * pointed.
                 *
                 * @sample highcharts/tooltip/stickoncontact/
                 *         Tooltip sticks on pointer contact
                 *
                 * @type      {boolean}
                 * @since     8.0.1
                 * @apioption tooltip.stickOnContact
                 */
                /**
                 * Use HTML to render the contents of the tooltip instead of SVG. Using
                 * HTML allows advanced formatting like tables and images in the
                 * tooltip. It is also recommended for rtl languages as it works around
                 * rtl bugs in early Firefox.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/footerformat/
                 *         A table for value alignment
                 * @sample {highcharts|highstock} highcharts/tooltip/fullhtml/
                 *         Full HTML tooltip
                 * @sample {highmaps} maps/tooltip/usehtml/
                 *         Pure HTML tooltip
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.2
                 * @apioption tooltip.useHTML
                 */
                /**
                 * How many decimals to show in each series' y value. This is
                 * overridable in each series' tooltip options object. The default is to
                 * preserve all decimals.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 * @sample {highmaps} maps/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 *
                 * @type      {number|undefined}
                 * @since     2.2
                 * @apioption tooltip.valueDecimals
                 */
                /**
                 * A string to prepend to each series' y value. Overridable in each
                 * series' tooltip options object.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 * @sample {highmaps} maps/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 *
                 * @type      {string}
                 * @since     2.2
                 * @apioption tooltip.valuePrefix
                 */
                /**
                 * A string to append to each series' y value. Overridable in each
                 * series' tooltip options object.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 * @sample {highmaps} maps/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 *
                 * @type      {string}
                 * @since     2.2
                 * @apioption tooltip.valueSuffix
                 */
                /**
                 * The format for the date in the tooltip header if the X axis is a
                 * datetime axis. The default is a best guess based on the smallest
                 * distance between points in the chart.
                 *
                 * @sample {highcharts} highcharts/tooltip/xdateformat/
                 *         A different format
                 *
                 * @type      {string}
                 * @product   highcharts highstock gantt
                 * @apioption tooltip.xDateFormat
                 */
                /**
                 * How many decimals to show for the `point.change`
                 * or the `point.cumulativeSum` value when the `series.compare`
                 * or the `series.cumulative` option is set.
                 * This is overridable in each series' tooltip options object.
                 *
                 * @type      {number}
                 * @default   2
                 * @since     1.0.1
                 * @product   highstock
                 * @apioption tooltip.changeDecimals
                 */
                /**
                 * Enable or disable the tooltip.
                 *
                 * @sample {highcharts} highcharts/tooltip/enabled/
                 *         Disabled
                 * @sample {highcharts} highcharts/plotoptions/series-point-events-mouseover/
                 *         Disable tooltip and show values on chart instead
                 */
                enabled: true,
                /**
                 * Enable or disable animation of the tooltip.
                 *
                 * @type       {boolean}
                 * @default    true
                 * @since      2.3.0
                 */
                animation: svg,
                /**
                 * The radius of the rounded border corners.
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         Default border radius
                 * @sample {highcharts} highcharts/tooltip/borderradius-0/
                 *         Square borders
                 * @sample {highmaps} maps/tooltip/background-border/
                 *         Background and border demo
                 */
                borderRadius: 3,
                /**
                 * For series on datetime axes, the date format in the tooltip's
                 * header will by default be guessed based on the closest data points.
                 * This member gives the default string representations used for
                 * each unit. For an overview of the replacement codes, see
                 * [dateFormat](/class-reference/Highcharts.Time#dateFormat).
                 *
                 * @see [xAxis.dateTimeLabelFormats](#xAxis.dateTimeLabelFormats)
                 *
                 * @type    {Highcharts.Dictionary<string>}
                 * @product highcharts highstock gantt
                 */
                dateTimeLabelFormats: {
                    /** @internal */
                    millisecond: '%A, %e %b, %H:%M:%S.%L',
                    /** @internal */
                    second: '%A, %e %b, %H:%M:%S',
                    /** @internal */
                    minute: '%A, %e %b, %H:%M',
                    /** @internal */
                    hour: '%A, %e %b, %H:%M',
                    /** @internal */
                    day: '%A, %e %b %Y',
                    /** @internal */
                    week: 'Week from %A, %e %b %Y',
                    /** @internal */
                    month: '%B %Y',
                    /** @internal */
                    year: '%Y'
                },
                /**
                 * A string to append to the tooltip format.
                 *
                 * @sample {highcharts} highcharts/tooltip/footerformat/
                 *         A table for value alignment
                 * @sample {highmaps} maps/tooltip/format/
                 *         Format demo
                 *
                 * @since 2.2
                 */
                footerFormat: '',
                /**
                 * The name of a symbol to use for the border around the tooltip
                 * header. Applies only when [tooltip.split](#tooltip.split) is
                 * enabled.
                 *
                 * Custom callbacks for symbol path generation can also be added to
                 * `Highcharts.SVGRenderer.prototype.symbols` the same way as for
                 * [series.marker.symbol](plotOptions.line.marker.symbol).
                 *
                 * @see [tooltip.shape](#tooltip.shape)
                 *
                 * @sample {highstock} stock/tooltip/split-positioner/
                 *         Different shapes for header and split boxes
                 *
                 * @type       {Highcharts.TooltipShapeValue}
                 * @validvalue ["callout", "rect"]
                 * @since      7.0
                 */
                headerShape: 'callout',
                /**
                 * The number of milliseconds to wait until the tooltip is hidden when
                 * mouse out from a point or chart.
                 *
                 * @since 3.0
                 */
                hideDelay: 500,
                /**
                 * Padding inside the tooltip, in pixels.
                 *
                 * @since 5.0.0
                 */
                padding: 8,
                /**
                 * The name of a symbol to use for the border around the tooltip. Can
                 * be one of: `"callout"`, `"circle"` or `"rect"`. When
                 * [tooltip.split](#tooltip.split)
                 * option is enabled, shape is applied to all boxes except header, which
                 * is controlled by
                 * [tooltip.headerShape](#tooltip.headerShape).
                 *
                 * Custom callbacks for symbol path generation can also be added to
                 * `Highcharts.SVGRenderer.prototype.symbols` the same way as for
                 * [series.marker.symbol](plotOptions.line.marker.symbol).
                 *
                 * @type  {Highcharts.TooltipShapeValue}
                 * @since 4.0
                 */
                shape: 'callout',
                /**
                 * When the tooltip is shared, the entire plot area will capture mouse
                 * movement or touch events. Tooltip texts for series types with ordered
                 * data (not pie, scatter, flags etc) will be shown in a single bubble.
                 * This is recommended for single series charts and for tablet/mobile
                 * optimized charts.
                 *
                 * See also [tooltip.split](#tooltip.split), that is better suited for
                 * charts with many series, especially line-type series. The
                 * `tooltip.split` option takes precedence over `tooltip.shared`.
                 *
                 * @sample {highcharts} highcharts/tooltip/shared-false/
                 *         False by default
                 * @sample {highcharts} highcharts/tooltip/shared-true/
                 *         True
                 * @sample {highcharts} highcharts/tooltip/shared-x-crosshair/
                 *         True with x axis crosshair
                 * @sample {highcharts} highcharts/tooltip/shared-true-mixed-types/
                 *         True with mixed series types
                 *
                 * @since   2.1
                 * @product highcharts highstock
                 */
                shared: false,
                /**
                 * Proximity snap for graphs or single points. It defaults to 10 for
                 * mouse-powered devices and 25 for touch devices.
                 *
                 * Note that in most cases the whole plot area captures the mouse
                 * movement, and in these cases `tooltip.snap` doesn't make sense. This
                 * applies when [stickyTracking](#plotOptions.series.stickyTracking)
                 * is `true` (default) and when the tooltip is [shared](#tooltip.shared)
                 * or [split](#tooltip.split).
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         10 px by default
                 * @sample {highcharts} highcharts/tooltip/snap-50/
                 *         50 px on graph
                 *
                 * @type    {number}
                 * @default 10/25
                 * @since   1.2.0
                 * @product highcharts highstock
                 */
                snap: isTouchDevice ? 25 : 10,
                /**
                 * The HTML of the tooltip header line. Variables are enclosed by
                 * curly brackets. Available variables are `point.key`, `series.name`,
                 * `series.color` and other members from the `point` and `series`
                 * objects. The `point.key` variable contains the category name, x
                 * value or datetime string depending on the type of axis. For datetime
                 * axes, the `point.key` date format can be set using
                 * `tooltip.xDateFormat`.
                 *
                 * @sample {highcharts} highcharts/tooltip/footerformat/
                 *         An HTML table in the tooltip
                 * @sample {highstock} highcharts/tooltip/footerformat/
                 *         An HTML table in the tooltip
                 * @sample {highmaps} maps/tooltip/format/
                 *         Format demo
                 *
                 * @type      {string}
                 * @apioption tooltip.headerFormat
                 */
                headerFormat: '<span style="font-size: 0.8em">{point.key}</span><br/>',
                /**
                 * The HTML of the null point's line in the tooltip. Works analogously
                 * to [pointFormat](#tooltip.pointFormat).
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-nullformat
                 *         Format data label and tooltip for null point.
                 *
                 * @type      {string}
                 * @apioption tooltip.nullFormat
                 */
                /**
                 * The HTML of the point's line in the tooltip. Variables are enclosed
                 * by curly brackets. Available variables are `point.x`, `point.y`,
                 * `series.name` and `series.color` and other properties on the same
                 * form. Furthermore, `point.y` can be extended by the
                 * `tooltip.valuePrefix` and `tooltip.valueSuffix` variables. This can
                 * also be overridden for each series, which makes it a good hook for
                 * displaying units.
                 *
                 * In styled mode, the dot is colored by a class name rather
                 * than the point color.
                 *
                 * @sample {highcharts} highcharts/tooltip/pointformat/
                 *         A different point format with value suffix
                 * @sample {highcharts|highstock} highcharts/tooltip/pointformat-extra-information/
                 *         Show extra information about points in the tooltip
                 * @sample {highmaps} maps/tooltip/format/
                 *         Format demo
                 *
                 * @type       {string}
                 * @since      2.2
                 * @apioption  tooltip.pointFormat
                 */
                pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
                /**
                 * The background color or gradient for the tooltip.
                 *
                 * In styled mode, the stroke width is set in the
                 * `.highcharts-tooltip-box` class.
                 *
                 * @sample {highcharts} highcharts/tooltip/backgroundcolor-solid/
                 *         Yellowish background
                 * @sample {highcharts} highcharts/tooltip/backgroundcolor-gradient/
                 *         Gradient
                 * @sample {highcharts} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 * @sample {highstock} stock/tooltip/general/
                 *         Custom tooltip
                 * @sample {highstock} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 * @sample {highmaps} maps/tooltip/background-border/
                 *         Background and border demo
                 * @sample {highmaps} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                backgroundColor: "#ffffff" /* Palette.backgroundColor */,
                /**
                 * The pixel width of the tooltip border. Defaults to 0 for single
                 * tooltips and 1 for split tooltips.
                 *
                 * In styled mode, the stroke width is set in the
                 * `.highcharts-tooltip-box` class.
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         2 pixels
                 * @sample {highcharts} highcharts/tooltip/borderwidth/
                 *         No border (shadow only)
                 * @sample {highcharts} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 * @sample {highstock} stock/tooltip/general/
                 *         Custom tooltip
                 * @sample {highstock} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 * @sample {highmaps} maps/tooltip/background-border/
                 *         Background and border demo
                 * @sample {highmaps} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 *
                 * @type {number}
                 */
                borderWidth: void 0,
                /**
                 * Whether to apply a drop shadow to the tooltip.
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         True by default
                 * @sample {highcharts} highcharts/tooltip/shadow/
                 *         False
                 * @sample {highmaps} maps/tooltip/positioner/
                 *         Fixed tooltip position, border and shadow disabled
                 *
                 * @type {boolean|Highcharts.ShadowOptionsObject}
                 */
                shadow: true,
                /**
                 * Prevents the tooltip from switching or closing when touched or
                 * pointed.
                 *
                 * @sample highcharts/tooltip/stickoncontact/
                 *         Tooltip sticks on pointer contact
                 *
                 * @since 8.0.1
                 */
                stickOnContact: false,
                /**
                 * CSS styles for the tooltip. The tooltip can also be styled through
                 * the CSS class `.highcharts-tooltip`.
                 *
                 * Note that the default `pointerEvents` style makes the tooltip ignore
                 * mouse events, so in order to use clickable tooltips, this value must
                 * be set to `auto`.
                 *
                 * @sample {highcharts} highcharts/tooltip/style/
                 *         Greater padding, bold text
                 *
                 * @type {Highcharts.CSSObject}
                 */
                style: {
                    /** @internal */
                    color: "#333333" /* Palette.neutralColor80 */,
                    /** @internal */
                    cursor: 'default',
                    /** @internal */
                    fontSize: '0.8em'
                },
                /**
                 * Use HTML to render the contents of the tooltip instead of SVG. Using
                 * HTML allows advanced formatting like tables and images in the
                 * tooltip. It is also recommended for rtl languages as it works around
                 * rtl bugs in early Firefox.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/footerformat/
                 *         A table for value alignment
                 * @sample {highcharts|highstock} highcharts/tooltip/fullhtml/
                 *         Full HTML tooltip
                 * @sample {highmaps} maps/tooltip/usehtml/
                 *         Pure HTML tooltip
                 *
                 * @since 2.2
                 */
                useHTML: false
            },
            /**
             * Highchart by default puts a credits label in the lower right corner
             * of the chart. This can be changed using these options.
             */
            credits: {
                /**
                 * Credits for map source to be concatenated with conventional credit
                 * text. By default this is a format string that collects copyright
                 * information from the map if available.
                 *
                 * @see [mapTextFull](#credits.mapTextFull)
                 * @see [text](#credits.text)
                 *
                 * @type      {string}
                 * @default   \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>
                 * @since     4.2.2
                 * @product   highmaps
                 * @apioption credits.mapText
                 */
                /**
                 * Detailed credits for map source to be displayed on hover of credits
                 * text. By default this is a format string that collects copyright
                 * information from the map if available.
                 *
                 * @see [mapText](#credits.mapText)
                 * @see [text](#credits.text)
                 *
                 * @type      {string}
                 * @default   {geojson.copyright}
                 * @since     4.2.2
                 * @product   highmaps
                 * @apioption credits.mapTextFull
                 */
                /**
                 * Whether to show the credits text.
                 *
                 * @sample {highcharts} highcharts/credits/enabled-false/
                 *         Credits disabled
                 * @sample {highstock} stock/credits/enabled/
                 *         Credits disabled
                 * @sample {highmaps} maps/credits/enabled-false/
                 *         Credits disabled
                 */
                enabled: true,
                /**
                 * The URL for the credits label.
                 *
                 * @sample {highcharts} highcharts/credits/href/
                 *         Custom URL and text
                 * @sample {highmaps} maps/credits/customized/
                 *         Custom URL and text
                 */
                href: 'https://www.highcharts.com?credits',
                /**
                 * Position configuration for the credits label.
                 *
                 * @sample {highcharts} highcharts/credits/position-left/
                 *         Left aligned
                 * @sample {highcharts} highcharts/credits/position-left/
                 *         Left aligned
                 * @sample {highmaps} maps/credits/customized/
                 *         Left aligned
                 * @sample {highmaps} maps/credits/customized/
                 *         Left aligned
                 *
                 * @type    {Highcharts.AlignObject}
                 * @since   2.1
                 */
                position: {
                    /** @internal */
                    align: 'right',
                    /** @internal */
                    x: -10,
                    /** @internal */
                    verticalAlign: 'bottom',
                    /** @internal */
                    y: -5
                },
                /**
                 * CSS styles for the credits label.
                 *
                 * @see In styled mode, credits styles can be set with the
                 *      `.highcharts-credits` class.
                 *
                 * @type {Highcharts.CSSObject}
                 */
                style: {
                    /** @internal */
                    cursor: 'pointer',
                    /** @internal */
                    color: "#999999" /* Palette.neutralColor40 */,
                    /** @internal */
                    fontSize: '0.6em'
                },
                /**
                 * The text for the credits label.
                 *
                 * @productdesc {highmaps}
                 * If a map is loaded as GeoJSON, the text defaults to
                 * `Highcharts @ {map-credits}`. Otherwise, it defaults to
                 * `Highcharts.com`.
                 *
                 * @sample {highcharts} highcharts/credits/href/
                 *         Custom URL and text
                 * @sample {highmaps} maps/credits/customized/
                 *         Custom URL and text
                 */
                text: 'Highcharts.com'
            }
        };
        /* eslint-disable spaced-comment */

        defaultOptions.chart.styledMode = false;

        '';
        const defaultTime = new Time(defaultOptions.time);
        /**
         * Get the updated default options. Until 3.0.7, merely exposing defaultOptions
         * for outside modules wasn't enough because the setOptions method created a new
         * object.
         *
         * @function Highcharts.getOptions
         *
         * @return {Highcharts.Options}
         * Default options.
         */
        function getOptions() {
            return defaultOptions;
        }
        /**
         * Merge the default options with custom options and return the new options
         * structure. Commonly used for defining reusable templates.
         *
         * @sample highcharts/global/useutc-false Setting a global option
         * @sample highcharts/members/setoptions Applying a global theme
         *
         * @function Highcharts.setOptions
         *
         * @param {Highcharts.Options} options
         * The new custom chart options.
         *
         * @return {Highcharts.Options}
         * Updated options.
         */
        function setOptions(options) {
            // Copy in the default options
            merge(true, defaultOptions, options);
            // Update the time object
            if (options.time || options.global) {
                if (H.time) {
                    H.time.update(merge(defaultOptions.global, defaultOptions.time, options.global, options.time));
                }
                else {
                    /**
                     * Global `Time` object with default options. Since v6.0.5, time
                     * settings can be applied individually for each chart. If no
                     * individual settings apply, this `Time` object is shared by all
                     * instances.
                     *
                     * @name Highcharts.time
                     * @type {Highcharts.Time}
                     */
                    H.time = defaultTime;
                }
            }
            return defaultOptions;
        }
        /* *
         *
         *  Default Export
         *
         * */
        const DefaultOptions = {
            defaultOptions,
            defaultTime,
            getOptions,
            setOptions
        };
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * @typedef {"plotBox"|"spacingBox"} Highcharts.ButtonRelativeToValue
         */
        /**
         * Gets fired when a series is added to the chart after load time, using the
         * `addSeries` method. Returning `false` prevents the series from being added.
         *
         * @callback Highcharts.ChartAddSeriesCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occurred.
         *
         * @param {Highcharts.ChartAddSeriesEventObject} event
         *        The event that occurred.
         */
        /**
         * Contains common event information. Through the `options` property you can
         * access the series options that were passed to the `addSeries` method.
         *
         * @interface Highcharts.ChartAddSeriesEventObject
         */ /**
        * The series options that were passed to the `addSeries` method.
        * @name Highcharts.ChartAddSeriesEventObject#options
        * @type {Highcharts.SeriesOptionsType}
        */ /**
        * Prevents the default behaviour of the event.
        * @name Highcharts.ChartAddSeriesEventObject#preventDefault
        * @type {Function}
        */ /**
        * The event target.
        * @name Highcharts.ChartAddSeriesEventObject#target
        * @type {Highcharts.Chart}
        */ /**
        * The event type.
        * @name Highcharts.ChartAddSeriesEventObject#type
        * @type {"addSeries"}
        */
        /**
         * Gets fired when clicking on the plot background.
         *
         * @callback Highcharts.ChartClickCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occurred.
         *
         * @param {Highcharts.PointerEventObject} event
         *        The event that occurred.
         */
        /**
         * Contains an axes of the clicked spot.
         *
         * @interface Highcharts.ChartClickEventAxisObject
         */ /**
        * Axis at the clicked spot.
        * @name Highcharts.ChartClickEventAxisObject#axis
        * @type {Highcharts.Axis}
        */ /**
        * Axis value at the clicked spot.
        * @name Highcharts.ChartClickEventAxisObject#value
        * @type {number}
        */
        /**
         * Contains information about the clicked spot on the chart. Remember the unit
         * of a datetime axis is milliseconds since 1970-01-01 00:00:00.
         *
         * @interface Highcharts.ChartClickEventObject
         * @extends Highcharts.PointerEventObject
         */ /**
        * Information about the x-axis on the clicked spot.
        * @name Highcharts.ChartClickEventObject#xAxis
        * @type {Array<Highcharts.ChartClickEventAxisObject>}
        */ /**
        * Information about the y-axis on the clicked spot.
        * @name Highcharts.ChartClickEventObject#yAxis
        * @type {Array<Highcharts.ChartClickEventAxisObject>}
        */ /**
        * Information about the z-axis on the clicked spot.
        * @name Highcharts.ChartClickEventObject#zAxis
        * @type {Array<Highcharts.ChartClickEventAxisObject>|undefined}
        */
        /**
         * Gets fired when the chart is finished loading.
         *
         * @callback Highcharts.ChartLoadCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occurred.
         *
         * @param {global.Event} event
         *        The event that occurred.
         */
        /**
         * Fires when the chart is redrawn, either after a call to `chart.redraw()` or
         * after an axis, series or point is modified with the `redraw` option set to
         * `true`.
         *
         * @callback Highcharts.ChartRedrawCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occurred.
         *
         * @param {global.Event} event
         *        The event that occurred.
         */
        /**
         * Gets fired after initial load of the chart (directly after the `load` event),
         * and after each redraw (directly after the `redraw` event).
         *
         * @callback Highcharts.ChartRenderCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occurred.
         *
         * @param {global.Event} event
         *        The event that occurred.
         */
        /**
         * Gets fired when an area of the chart has been selected. The default action
         * for the selection event is to zoom the chart to the selected area. It can be
         * prevented by calling `event.preventDefault()` or return false.
         *
         * @callback Highcharts.ChartSelectionCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occurred.
         *
         * @param {Highcharts.SelectEventObject} event
         *        Event informations
         *
         * @return {boolean|undefined}
         *         Return false to prevent the default action, usually zoom.
         */
        (''); // Detach doclets above

        return DefaultOptions;
    });
    _registerModule(_modules, 'Core/Templating.js', [_modules['Core/Defaults.js'], _modules['Core/Utilities.js']], function (D, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defaultOptions, defaultTime } = D;
        const { extend, getNestedProperty, isArray, isNumber, isObject, pick, pInt } = U;
        const helpers = {
            // Built-in helpers
            add: (a, b) => a + b,
            divide: (a, b) => (b !== 0 ? a / b : ''),
            // eslint-disable-next-line eqeqeq
            eq: (a, b) => a == b,
            each: function (arr) {
                const match = arguments[arguments.length - 1];
                return isArray(arr) ?
                    arr.map((item, i) => format(match.body, extend(isObject(item) ? item : { '@this': item }, {
                        '@index': i,
                        '@first': i === 0,
                        '@last': i === arr.length - 1
                    }))).join('') :
                    false;
            },
            ge: (a, b) => a >= b,
            gt: (a, b) => a > b,
            'if': (condition) => !!condition,
            le: (a, b) => a <= b,
            lt: (a, b) => a < b,
            multiply: (a, b) => a * b,
            // eslint-disable-next-line eqeqeq
            ne: (a, b) => a != b,
            subtract: (a, b) => a - b,
            unless: (condition) => !condition
        };
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Formats a JavaScript date timestamp (milliseconds since Jan 1st 1970) into a
         * human readable date string. The format is a subset of the formats for PHP's
         * [strftime](https://www.php.net/manual/en/function.strftime.php) function.
         * Additional formats can be given in the {@link Highcharts.dateFormats} hook.
         *
         * Since v6.0.5, all internal dates are formatted through the
         * {@link Highcharts.Chart#time} instance to respect chart-level time settings.
         * The `Highcharts.dateFormat` function only reflects global time settings set
         * with `setOptions`.
         *
         * Supported format keys:
         * - `%a`: Short weekday, like 'Mon'
         * - `%A`: Long weekday, like 'Monday'
         * - `%d`: Two digit day of the month, 01 to 31
         * - `%e`: Day of the month, 1 through 31
         * - `%w`: Day of the week, 0 through 6
         * - `%b`: Short month, like 'Jan'
         * - `%B`: Long month, like 'January'
         * - `%m`: Two digit month number, 01 through 12
         * - `%y`: Two digits year, like 09 for 2009
         * - `%Y`: Four digits year, like 2009
         * - `%H`: Two digits hours in 24h format, 00 through 23
         * - `%k`: Hours in 24h format, 0 through 23
         * - `%I`: Two digits hours in 12h format, 00 through 11
         * - `%l`: Hours in 12h format, 1 through 12
         * - `%M`: Two digits minutes, 00 through 59
         * - `%p`: Upper case AM or PM
         * - `%P`: Lower case AM or PM
         * - `%S`: Two digits seconds, 00 through 59
         * - `%L`: Milliseconds (naming from Ruby)
         *
         * @function Highcharts.dateFormat
         *
         * @param {string} format
         *        The desired format where various time representations are prefixed
         *        with `%`.
         *
         * @param {number} timestamp
         *        The JavaScript timestamp.
         *
         * @param {boolean} [capitalize=false]
         *        Upper case first letter in the return.
         *
         * @return {string}
         *         The formatted date.
         */
        function dateFormat(format, timestamp, capitalize) {
            return defaultTime.dateFormat(format, timestamp, capitalize);
        }
        /**
         * Format a string according to a subset of the rules of Python's String.format
         * method.
         *
         * @example
         * let s = Highcharts.format(
         *     'The {color} fox was {len:.2f} feet long',
         *     { color: 'red', len: Math.PI }
         * );
         * // => The red fox was 3.14 feet long
         *
         * @function Highcharts.format
         *
         * @param {string} str
         *        The string to format.
         *
         * @param {Record<string, *>} ctx
         *        The context, a collection of key-value pairs where each key is
         *        replaced by its value.
         *
         * @param {Highcharts.Chart} [chart]
         *        A `Chart` instance used to get numberFormatter and time.
         *
         * @return {string}
         *         The formatted string.
         */
        function format(str = '', ctx, chart) {
            const regex = /\{([a-zA-Z0-9\:\.\,;\-\/<>%_@"'= #\(\)]+)\}/g, 
            // The sub expression regex is the same as the top expression regex,
            // but except parens and block helpers (#), and surrounded by parens
            // instead of curly brackets.
            subRegex = /\(([a-zA-Z0-9\:\.\,;\-\/<>%_@"'= ]+)\)/g, matches = [], floatRegex = /f$/, decRegex = /\.([0-9])/, lang = defaultOptions.lang, time = chart && chart.time || defaultTime, numberFormatter = chart && chart.numberFormatter || numberFormat;
            /*
             * Get a literal or variable value inside a template expression. May be
             * extended with other types like string or null if needed, but keep it
             * small for now.
             */
            const resolveProperty = (key = '') => {
                let n;
                // Literals
                if (key === 'true') {
                    return true;
                }
                if (key === 'false') {
                    return false;
                }
                if ((n = Number(key)).toString() === key) {
                    return n;
                }
                // Variables and constants
                return getNestedProperty(key, ctx);
            };
            let match, currentMatch, depth = 0, hasSub;
            // Parse and create tree
            while ((match = regex.exec(str)) !== null) {
                // When a sub expression is found, it is evaluated first, and the
                // results recursively evaluated until no subexpression exists.
                const subMatch = subRegex.exec(match[1]);
                if (subMatch) {
                    match = subMatch;
                    hasSub = true;
                }
                if (!currentMatch || !currentMatch.isBlock) {
                    currentMatch = {
                        ctx,
                        expression: match[1],
                        find: match[0],
                        isBlock: match[1].charAt(0) === '#',
                        start: match.index,
                        startInner: match.index + match[0].length,
                        length: match[0].length
                    };
                }
                // Identify helpers
                const fn = match[1].split(' ')[0].replace('#', '');
                if (helpers[fn]) {
                    // Block helper, only 0 level is handled
                    if (currentMatch.isBlock && fn === currentMatch.fn) {
                        depth++;
                    }
                    if (!currentMatch.fn) {
                        currentMatch.fn = fn;
                    }
                }
                // Closing a block helper
                const startingElseSection = match[1] === 'else';
                if (currentMatch.isBlock &&
                    currentMatch.fn && (match[1] === `/${currentMatch.fn}` ||
                    startingElseSection)) {
                    if (!depth) { // === 0
                        const start = currentMatch.startInner, body = str.substr(start, match.index - start);
                        // Either closing without an else section, or when encountering
                        // an else section
                        if (currentMatch.body === void 0) {
                            currentMatch.body = body;
                            currentMatch.startInner = match.index + match[0].length;
                            // The body exists already, so this is the else section
                        }
                        else {
                            currentMatch.elseBody = body;
                        }
                        currentMatch.find += body + match[0];
                        if (!startingElseSection) {
                            matches.push(currentMatch);
                            currentMatch = void 0;
                        }
                    }
                    else if (!startingElseSection) {
                        depth--;
                    }
                    // Common expression
                }
                else if (!currentMatch.isBlock) {
                    matches.push(currentMatch);
                }
                // Evaluate sub-matches one by one to prevent orphaned block closers
                if (subMatch && !currentMatch?.isBlock) {
                    break;
                }
            }
            // Execute
            matches.forEach((match) => {
                const { body, elseBody, expression, fn } = match;
                let replacement, i;
                // Helper function
                if (fn) {
                    // Pass the helpers the amount of arguments defined by the function,
                    // then the match as the last argument.
                    const args = [match], parts = expression.split(' ');
                    i = helpers[fn].length;
                    while (i--) {
                        args.unshift(resolveProperty(parts[i + 1]));
                    }
                    replacement = helpers[fn].apply(ctx, args);
                    // Block helpers may return true or false. They may also return a
                    // string, like the `each` helper.
                    if (match.isBlock && typeof replacement === 'boolean') {
                        replacement = format(replacement ? body : elseBody, ctx);
                    }
                    // Simple variable replacement
                }
                else {
                    const valueAndFormat = expression.split(':');
                    replacement = resolveProperty(valueAndFormat.shift() || '');
                    // Format the replacement
                    if (valueAndFormat.length && typeof replacement === 'number') {
                        const segment = valueAndFormat.join(':');
                        if (floatRegex.test(segment)) { // Float
                            const decimals = parseInt((segment.match(decRegex) || ['', '-1'])[1], 10);
                            if (replacement !== null) {
                                replacement = numberFormatter(replacement, decimals, lang.decimalPoint, segment.indexOf(',') > -1 ? lang.thousandsSep : '');
                            }
                        }
                        else {
                            replacement = time.dateFormat(segment, replacement);
                        }
                    }
                }
                str = str.replace(match.find, pick(replacement, ''));
            });
            return hasSub ? format(str, ctx, chart) : str;
        }
        /**
         * Format a number and return a string based on input settings.
         *
         * @sample highcharts/members/highcharts-numberformat/
         *         Custom number format
         *
         * @function Highcharts.numberFormat
         *
         * @param {number} number
         *        The input number to format.
         *
         * @param {number} decimals
         *        The amount of decimals. A value of -1 preserves the amount in the
         *        input number.
         *
         * @param {string} [decimalPoint]
         *        The decimal point, defaults to the one given in the lang options, or
         *        a dot.
         *
         * @param {string} [thousandsSep]
         *        The thousands separator, defaults to the one given in the lang
         *        options, or a space character.
         *
         * @return {string}
         *         The formatted number.
         */
        function numberFormat(number, decimals, decimalPoint, thousandsSep) {
            number = +number || 0;
            decimals = +decimals;
            let ret, fractionDigits;
            const lang = defaultOptions.lang, origDec = (number.toString().split('.')[1] || '').split('e')[0].length, exponent = number.toString().split('e'), firstDecimals = decimals;
            if (decimals === -1) {
                // Preserve decimals. Not huge numbers (#3793).
                decimals = Math.min(origDec, 20);
            }
            else if (!isNumber(decimals)) {
                decimals = 2;
            }
            else if (decimals && exponent[1] && exponent[1] < 0) {
                // Expose decimals from exponential notation (#7042)
                fractionDigits = decimals + +exponent[1];
                if (fractionDigits >= 0) {
                    // Remove too small part of the number while keeping the notation
                    exponent[0] = (+exponent[0]).toExponential(fractionDigits)
                        .split('e')[0];
                    decimals = fractionDigits;
                }
                else {
                    // `fractionDigits < 0`
                    exponent[0] = exponent[0].split('.')[0] || 0;
                    if (decimals < 20) {
                        // Use number instead of exponential notation (#7405)
                        number = (exponent[0] * Math.pow(10, exponent[1]))
                            .toFixed(decimals);
                    }
                    else {
                        // Or zero
                        number = 0;
                    }
                    exponent[1] = 0;
                }
            }
            // Add another decimal to avoid rounding errors of float numbers. (#4573)
            // Then use toFixed to handle rounding.
            const roundedNumber = (Math.abs(exponent[1] ? exponent[0] : number) +
                Math.pow(10, -Math.max(decimals, origDec) - 1)).toFixed(decimals);
            // A string containing the positive integer component of the number
            const strinteger = String(pInt(roundedNumber));
            // Leftover after grouping into thousands. Can be 0, 1 or 2.
            const thousands = strinteger.length > 3 ? strinteger.length % 3 : 0;
            // Language
            decimalPoint = pick(decimalPoint, lang.decimalPoint);
            thousandsSep = pick(thousandsSep, lang.thousandsSep);
            // Start building the return
            ret = number < 0 ? '-' : '';
            // Add the leftover after grouping into thousands. For example, in the
            // number 42 000 000, this line adds 42.
            ret += thousands ? strinteger.substr(0, thousands) + thousandsSep : '';
            if (+exponent[1] < 0 && !firstDecimals) {
                ret = '0';
            }
            else {
                // Add the remaining thousands groups, joined by the thousands separator
                ret += strinteger
                    .substr(thousands)
                    .replace(/(\d{3})(?=\d)/g, '$1' + thousandsSep);
            }
            // Add the decimal point and the decimal component
            if (decimals) {
                // Get the decimal component
                ret += decimalPoint + roundedNumber.slice(-decimals);
            }
            if (exponent[1] && +ret !== 0) {
                ret += 'e' + exponent[1];
            }
            return ret;
        }
        /* *
         *
         *  Default Export
         *
         * */
        const Templating = {
            dateFormat,
            format,
            helpers,
            numberFormat
        };

        return Templating;
    });
    _registerModule(_modules, 'DataGrid/DataGridDefaults.js', [], function () {
        /* *
         *
         *  Data Grid class
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Øystein Moseng
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /** @internal */
        const DataGridDefaults = {
            /** @internal */
            cellHeight: 49,
            /** @internal */
            columnHeaders: {
                /** @internal */
                enabled: true
            },
            /** @internal */
            columns: {},
            /** @internal */
            defaultHeight: 400,
            /** @internal */
            editable: true,
            /** @internal */
            resizableColumns: true
        };
        /* *
         *
         *  Default Export
         *
         * */

        return DataGridDefaults;
    });
    _registerModule(_modules, 'DataGrid/DataGrid.js', [_modules['Data/DataTable.js'], _modules['DataGrid/DataGridUtils.js'], _modules['DataGrid/Globals.js'], _modules['Core/Templating.js'], _modules['DataGrid/DataGridDefaults.js'], _modules['Core/Utilities.js']], function (DataTable, DataGridUtils, Globals, Templating, DataGridDefaults, U) {
        /* *
         *
         *  Data Grid class
         *
         *  (c) 2020-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Øystein Moseng
         *  - Ken-Håvard Lieng
         *  - Sebastian Bochan
         *
         * */
        const { dataTableCellToString, emptyHTMLElement, makeDiv } = DataGridUtils;
        const { isSafari, win } = Globals;
        const { addEvent, clamp, defined, fireEvent, isNumber, merge, pick } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Creates a scrollable grid structure with editable data cells.
         */
        class DataGrid {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Creates an instance of DataGrid.
             *
             * @param container
             * Element or element ID to create the grid structure into.
             *
             * @param options
             * Options to create the grid structure.
             */
            constructor(container, options) {
                /**
                 * The column names in a sorted array as rendered (or changed).
                 * @internal
                 */
                this.columnNames = [];
                /**
                 * The amount of rows before align end of scrolling.
                 * @internal
                 */
                this.prevTop = -1;
                /**
                 * The amount of rows to align for end of scrolling.
                 * @internal
                 */
                this.scrollEndRowCount = 0;
                /**
                 * Contains the top align offset, when reaching the end of scrolling.
                 * @internal
                 */
                this.scrollEndTop = 0;
                /**
                 * Flag to indicate the end of scrolling. Used to align the last cell with
                 * the container bottom.
                 * @internal
                 */
                this.bottom = false;
                /**
                 * An array of the min column widths for which the text in headers is not
                 * overflown.
                 * @internal
                 */
                this.overflowHeaderWidths = [];
                // Initialize containers
                if (typeof container === 'string') {
                    const existingContainer = win.document.getElementById(container);
                    if (existingContainer) {
                        this.container = existingContainer;
                    }
                    else {
                        this.container =
                            makeDiv(Globals.classNames.gridContainer, container);
                    }
                }
                else {
                    this.container = container;
                }
                this.gridContainer = makeDiv(Globals.classNames.gridContainer);
                this.outerContainer = makeDiv(Globals.classNames.outerContainer);
                this.scrollContainer = makeDiv(Globals.classNames.scrollContainer);
                this.innerContainer = makeDiv(Globals.classNames.innerContainer);
                this.outerContainer.appendChild(this.scrollContainer);
                this.gridContainer.appendChild(this.outerContainer);
                this.container.appendChild(this.gridContainer);
                // Init options
                this.options = merge(DataGrid.defaultOptions, options);
                this.gridContainer.style.height = this.getDataGridSize() + 'px';
                this.gridContainer.role = 'figure';
                // Init data table
                this.dataTable = this.initDataTable();
                this.rowElements = [];
                this.draggedResizeHandle = null;
                this.draggedColumnRightIx = null;
                this.columnNames = this.getColumnsToDisplay();
                this.render();
                (this.containerResizeObserver = new ResizeObserver(() => {
                    this.updateGridElements();
                })).observe(this.container);
            }
            /**
             * Update the data grid with new options.
             *
             * @param options
             * An object with new options.
             */
            update(options) {
                this.options = merge(this.options, options);
                if (this.options.dataTable !== this.dataTable) {
                    this.dataTable = this.initDataTable();
                }
                this.columnNames = this.getColumnsToDisplay();
                this.scrollContainer.removeChild(this.innerContainer);
                this.render();
            }
            /**
             * Resize a column.
             *
             * @internal
             *
             * @param width
             *        New column width.
             *
             * @param columnNameOrIndex
             *        Name or index of the column to resize, omit to resize all
             *        columns.
             *
             * @emits #afterResizeColumn
             */
            resizeColumn(width, columnNameOrIndex) {
                const headers = this.columnHeadersContainer;
                const index = typeof columnNameOrIndex === 'string' ?
                    this.columnNames.indexOf(columnNameOrIndex) :
                    columnNameOrIndex;
                const flex = `${width}`;
                if (isNumber(index)) {
                    if (index !== -1) {
                        if (headers) {
                            const header = headers.children[index];
                            if (header) {
                                header.style.flex = flex;
                            }
                        }
                        for (let i = 0; i < this.rowElements.length; i++) {
                            const cellElement = this.rowElements[i].children[index];
                            if (cellElement) {
                                cellElement.style.flex = flex;
                            }
                        }
                    }
                }
                else {
                    if (headers) {
                        for (let i = 0; i < headers.children.length; i++) {
                            headers.children[i].style.flex = flex;
                        }
                    }
                    for (let i = 0; i < this.rowElements.length; i++) {
                        const row = this.rowElements[i];
                        for (let i = 0; i < row.children.length; i++) {
                            row.children[i].style.flex = flex;
                        }
                    }
                }
                this.renderColumnDragHandles();
                this.emit({
                    type: 'afterResizeColumn',
                    width,
                    index,
                    name: isNumber(index) ? this.columnNames[index] : void 0
                });
            }
            /**
             * Emits an event on this data grid to all registered callbacks of the
             * given event.
             *
             * @internal
             *
             * @param e
             * Event object with event information.
             */
            emit(e) {
                fireEvent(this, e.type, e);
            }
            /**
             * Add class to given element to toggle highlight.
             *
             * @internal
             *
             * @param row
             * Row to highlight.
             */
            toggleRowHighlight(row) {
                if (this.hoveredRow && this.hoveredRow.classList.contains('hovered')) {
                    this.hoveredRow.classList.remove('hovered');
                }
                row && (row.classList.contains('hovered') ?
                    row.classList.remove('hovered') : row.classList.add('hovered'));
            }
            /**
             * Registers a callback for a specific event.
             *
             * @internal
             *
             * @param type
             * Event type as a string.
             *
             * @param callback
             * Function to register for an event callback.
             *
             * @return
             * Function to unregister callback from the event.
             */
            on(type, callback) {
                return addEvent(this, type, callback);
            }
            /**
             * Scroll to a given row.
             *
             * @internal
             *
             * @param row
             * Row number
             */
            scrollToRow(row) {
                this.outerContainer.scrollTop = row * this.options.cellHeight;
            }
            // ---------------- Private methods
            /**
             * Check which columns should be displayed based on the individual
             * column `show` option.
             * @internal
             */
            getColumnsToDisplay() {
                const columnsOptions = this.options.columns, tableColumns = this.dataTable.modified.getColumnNames(), filteredColumns = [];
                for (let i = 0; i < tableColumns.length; i++) {
                    const columnName = tableColumns[i];
                    const column = columnsOptions[columnName];
                    if (column && defined(column.show)) {
                        if (columnsOptions[columnName].show) {
                            filteredColumns.push(columnName);
                        }
                    }
                    else {
                        filteredColumns.push(columnName);
                    }
                }
                return filteredColumns;
            }
            /**
             * Determine whether a column is editable or not.
             *
             * @internal
             *
             * @param columnName
             * Name of the column to test.
             *
             * @return
             * Returns true when the column is editable, or false.
             */
            isColumnEditable(columnName) {
                const columnOptions = this.options.columns[columnName] || {};
                return pick(columnOptions.editable, this.options.editable);
            }
            /**
             * Get a reference to the underlying DataTable from options, or create one
             * if needed.
             *
             * @internal
             *
             * @return
             * DataTable for the DataGrid instance.
             */
            initDataTable() {
                if (this.options.dataTable) {
                    return this.options.dataTable;
                }
                return new DataTable();
            }
            /**
             * Render the data grid. To be called on first render, as well as when
             * options change, or the underlying data changes.
             * @internal
             */
            render() {
                const { options } = this;
                this.prevTop = -1;
                this.bottom = false;
                emptyHTMLElement(this.innerContainer);
                if (options.columnHeaders.enabled) {
                    this.renderColumnHeaders();
                }
                else {
                    this.outerContainer.style.top = '0';
                }
                this.renderInitialRows();
                this.addEvents();
                this.updateScrollingLength();
                this.updateVisibleCells();
                if (options.columnHeaders.enabled && options.resizableColumns) {
                    this.renderColumnDragHandles();
                }
                this.updateGridElements();
                this.gridContainer.ariaLabel = `Grid with ${this.dataTable.getColumnNames().length} columns and ${this.dataTable.getRowCount()} rows.`;
            }
            /**
             * Add internal event listeners to the grid.
             * @internal
             */
            addEvents() {
                this.outerContainer.addEventListener('scroll', (e) => {
                    this.onScroll(e);
                });
                document.addEventListener('click', (e) => {
                    this.onDocumentClick(e);
                });
                this.container.addEventListener('mouseover', (e) => {
                    this.handleMouseOver(e);
                });
                this.container.addEventListener('click', (e) => {
                    this.handleRowClick(e);
                });
            }
            /**
             * Changes the content of the rendered cells. This is used to simulate
             * scrolling.
             *
             * @internal
             *
             * @param force
             * Whether to force the update regardless of whether the position of the
             * first row has not been changed.
             */
            updateVisibleCells(force = false) {
                let scrollTop = this.outerContainer.scrollTop;
                if (isSafari) {
                    scrollTop = clamp(scrollTop, 0, (this.outerContainer.scrollHeight -
                        this.outerContainer.clientHeight));
                }
                let i = Math.floor(scrollTop / this.options.cellHeight);
                if (i === this.prevTop && !force) {
                    return;
                }
                this.prevTop = i;
                const columnsInPresentationOrder = this.columnNames;
                const rowCount = this.dataTable.modified.getRowCount();
                for (let j = 0; j < this.rowElements.length && i < rowCount; j++, i++) {
                    const rowElement = this.rowElements[j];
                    rowElement.dataset.rowIndex = String(i);
                    const cellElements = rowElement.childNodes;
                    for (let k = 0, kEnd = columnsInPresentationOrder.length; k < kEnd; k++) {
                        const cell = cellElements[k], column = columnsInPresentationOrder[k], value = this.dataTable.modified
                            .getCell(columnsInPresentationOrder[k], i);
                        cell.textContent = this.formatCell(value, column);
                        // TODO: consider adding these dynamically to the input element
                        cell.dataset.originalData = '' + value;
                        cell.dataset.columnName = columnsInPresentationOrder[k];
                        // TODO: get this from the store if set?
                        cell.dataset.dataType = typeof value;
                        if (k === 0) { // First column, that is x
                            rowElement.dataset.rowXIndex =
                                String(isNumber(value) ? value : i);
                        }
                    }
                }
                // Scroll innerContainer to align the bottom of the last row with the
                // bottom of the grid when scrolled to the end
                if (this.prevTop + this.scrollEndRowCount === rowCount) {
                    if (!this.bottom && this.scrollEndTop) {
                        this.bottom = true;
                        this.innerContainer.scrollTop = this.scrollEndTop;
                    }
                }
                else if (this.bottom) {
                    this.bottom = false;
                    this.innerContainer.scrollTop = 0;
                }
            }
            /**
             * Handle user scrolling the grid
             *
             * @internal
             *
             * @param e
             * Related scroll event.
             */
            onScroll(e) {
                e.preventDefault();
                window.requestAnimationFrame(this.updateVisibleCells.bind(this, false));
            }
            /**
             * Handle the user starting interaction with a cell.
             *
             * @internal
             *
             * @param cellEl
             * The clicked cell.
             *
             * @param columnName
             * The column the clicked cell belongs to.
             */
            onCellClick(cellEl, columnName) {
                if (this.isColumnEditable(columnName)) {
                    let input = cellEl.querySelector('input');
                    const cellValue = cellEl.getAttribute('data-original-data');
                    if (!input) {
                        this.removeCellInputElement();
                        // Replace cell contents with an input element
                        const inputHeight = cellEl.clientHeight;
                        cellEl.textContent = '';
                        input = this.cellInputEl = document.createElement('input');
                        input.style.height = inputHeight + 'px';
                        input.className = Globals.classNames.cellInput;
                        cellEl.appendChild(input);
                        input.focus();
                        input.value = cellValue || '';
                    }
                    // Emit for use in extensions
                    this.emit({ type: 'cellClick', input });
                }
            }
            /**
             * Handle the user clicking somewhere outside the grid.
             *
             * @internal
             *
             * @param e
             * Related mouse event.
             */
            onDocumentClick(e) {
                if (this.cellInputEl && e.target) {
                    const cellEl = this.cellInputEl.parentNode;
                    const isClickInInput = cellEl && cellEl.contains(e.target);
                    if (!isClickInInput) {
                        this.removeCellInputElement();
                    }
                }
            }
            /**
             * Handle hovering over rows- highlight proper row if needed.
             *
             * @internal
             *
             * @param e
             * Related mouse event.
             */
            handleMouseOver(e) {
                const target = e.target;
                if (target && target.classList.contains(Globals.classNames.cell)) {
                    const row = target.parentElement;
                    this.toggleRowHighlight(row);
                    this.hoveredRow = row;
                    fireEvent(this.container, 'dataGridHover', { row });
                }
                else if (this.hoveredRow) {
                    this.toggleRowHighlight();
                    this.hoveredRow = void 0;
                }
            }
            /**
             * Handle click over rows.
             *
             * @internal
             *
             * @param e
             * Related mouse event.
             */
            handleRowClick(e) {
                const target = e.target;
                const clickEvent = this.options.events?.row?.click;
                if (clickEvent &&
                    target?.classList.contains(Globals.classNames.cell)) {
                    clickEvent.call(target.parentElement, e);
                }
            }
            /**
             * Remove the <input> overlay and update the cell value
             * @internal
             */
            removeCellInputElement() {
                const cellInputEl = this.cellInputEl;
                if (cellInputEl) {
                    const parentNode = cellInputEl.parentNode;
                    // TODO: This needs to modify DataTable. The change in DataTable
                    // should cause a re-render?
                    if (parentNode) {
                        const cellValueType = parentNode.getAttribute('data-data-type'), columnName = parentNode.getAttribute('data-column-name');
                        let cellValue = cellInputEl.value;
                        if (cellValueType === 'number') {
                            cellValue = parseFloat(cellValue);
                        }
                        parentNode.textContent =
                            this.formatCell(cellValue, columnName || '');
                    }
                    cellInputEl.remove();
                    delete this.cellInputEl;
                }
            }
            /**
             * Updates the scroll container to reflect the data size.
             * @internal
             */
            updateScrollingLength() {
                const columnsInPresentationOrder = this.columnNames;
                let i = this.dataTable.modified.getRowCount() - 1;
                let height = 0;
                const top = i - this.getNumRowsToDraw();
                const outerHeight = this.outerContainer.clientHeight;
                // Explicit height is needed for overflow: hidden to work, to make sure
                // innerContainer is not scrollable by user input
                this.innerContainer.style.height = outerHeight + 'px';
                // Calculate how many of the bottom rows is needed to potentially
                // overflow innerContainer and use it to add extra rows to scrollHeight
                // to ensure it is possible to scroll to the last row when rows have
                // variable heights
                for (let j = 0; j < this.rowElements.length; j++) {
                    const cellElements = this.rowElements[j].childNodes;
                    for (let k = 0; k < columnsInPresentationOrder.length; k++) {
                        cellElements[k].textContent = dataTableCellToString(this.dataTable.modified
                            .getCell(columnsInPresentationOrder[k], i - j));
                    }
                }
                this.scrollContainer.appendChild(this.innerContainer);
                for (let j = 0; i > top; i--, j++) {
                    height += this.rowElements[j].offsetHeight;
                    if (height > outerHeight) {
                        i--;
                        break;
                    }
                }
                const extraRows = i - top;
                this.scrollEndRowCount = this.rowElements.length - extraRows;
                // How much innerContainer needs to be scrolled to fully show the last
                // row when scrolled to the end
                this.scrollEndTop = height - outerHeight;
                const scrollHeight = (this.dataTable.modified.getRowCount() + extraRows) *
                    this.options.cellHeight;
                this.scrollContainer.style.height = scrollHeight + 'px';
            }
            /**
             * Calculates the number of rows to render pending of cell sizes.
             *
             * @internal
             *
             * @return
             * The number rows to render.
             */
            getNumRowsToDraw() {
                return Math.min(this.dataTable.modified.getRowCount(), Math.ceil((this.outerContainer.offsetHeight ||
                    this.options.defaultHeight // When datagrid is hidden,
                // offsetHeight is 0, so we need to get defaultValue to
                // avoid empty rows
                ) / this.options.cellHeight));
            }
            /**
             * Internal method that calculates the data grid height. If the container
             * has a height declared in CSS it uses that, otherwise it uses a default.
             * @internal
             */
            getDataGridSize() {
                const grid = this, options = grid.options, { height } = grid.container.getBoundingClientRect();
                // If the container has a height declared in CSS, use that.
                if (height > 2) {
                    return height;
                }
                // Use the default height if the container has no height declared in CSS
                return options.defaultHeight;
            }
            /**
             * Renders a data cell.
             *
             * @internal
             *
             * @param parentRow
             * The parent row to add the cell to.
             *
             * @param columnName
             * The column the cell belongs to.
             */
            renderCell(parentRow, columnName) {
                let className = Globals.classNames.cell;
                if (!this.isColumnEditable(columnName)) {
                    className += ` ${className}-readonly`;
                }
                const cellEl = makeDiv(className);
                cellEl.style.minHeight = this.options.cellHeight + 'px';
                cellEl.addEventListener('click', () => this.onCellClick(cellEl, columnName));
                parentRow.appendChild(cellEl);
            }
            /**
             * Renders a row of data.
             * @internal
             */
            renderRow() {
                const rowEl = makeDiv(Globals.classNames.row);
                for (let i = 0; i < this.columnNames.length; i++) {
                    this.renderCell(rowEl, this.columnNames[i]);
                }
                this.innerContainer.appendChild(rowEl);
                this.rowElements.push(rowEl);
            }
            /**
             * Allows formatting of the header cell text based on provided format
             * option. If that is not provided, the column name is returned.
             * @internal
             *
             * @param columnName
             * Column name to format.
             */
            formatHeaderCell(columnName) {
                const options = this.options, columnOptions = options.columns[columnName], headerFormat = columnOptions && columnOptions.headerFormat;
                if (headerFormat) {
                    return Templating.format(headerFormat, { text: columnName });
                }
                return columnName;
            }
            /**
             * Allows formatting of the cell text based on provided format option.
             * If that is not provided, the cell value is returned.
             * @internal
             *
             * @param  cellValue
             * The value of the cell to format.
             *
             * @param  column
             * The column name the cell belongs to.
             */
            formatCell(cellValue, column) {
                const options = this.options, columnOptions = options.columns[column], cellFormat = columnOptions && columnOptions.cellFormat, cellFormatter = columnOptions && columnOptions.cellFormatter;
                let formattedCell = defined(cellValue) ? cellValue : '';
                if (cellFormat) {
                    if (typeof cellValue === 'number' &&
                        cellFormat.indexOf('value') > -1) {
                        formattedCell =
                            Templating.format(cellFormat, { value: cellValue });
                    }
                    else if (typeof cellValue === 'string' &&
                        cellFormat.indexOf('text') > -1) {
                        formattedCell =
                            Templating.format(cellFormat, { text: cellValue });
                    }
                }
                if (cellFormatter) {
                    return cellFormatter.call({ value: cellValue });
                }
                return formattedCell.toString();
            }
            /**
             * Render a column header for a column.
             *
             * @internal
             *
             * @param parentEl
             * The parent element of the column header.
             *
             * @param columnName
             * The name of the column.
             */
            renderColumnHeader(parentEl, columnName) {
                let className = Globals.classNames.columnHeader;
                if (!this.isColumnEditable(columnName)) {
                    className += ` ${className}-readonly`;
                }
                const headerEl = makeDiv(className);
                headerEl.style.minHeight = this.options.cellHeight + 'px';
                headerEl.style.maxHeight = this.options.cellHeight * 2 + 'px';
                headerEl.textContent = this.formatHeaderCell(columnName);
                parentEl.appendChild(headerEl);
            }
            /**
             * Render the column headers of the table.
             * @internal
             */
            renderColumnHeaders() {
                const columnNames = this.columnNames, columnHeadersContainer = this.columnHeadersContainer =
                    this.columnHeadersContainer ||
                        makeDiv(`${Globals.classNamePrefix}column-headers`);
                emptyHTMLElement(columnHeadersContainer);
                columnNames.forEach(this.renderColumnHeader.bind(this, columnHeadersContainer));
                if (!this.headerContainer) {
                    this.headerContainer =
                        makeDiv(`${Globals.classNamePrefix}header-container`);
                    this.headerContainer.appendChild(columnHeadersContainer);
                }
                this.gridContainer.insertBefore(this.headerContainer, this.outerContainer);
                this.updateColumnHeaders();
            }
            /**
             * Refresh container elements to adapt them to new container dimensions.
             * @internal
             */
            updateGridElements() {
                this.updateColumnHeaders();
                this.redrawRowElements();
                this.updateDragHandlesPosition();
            }
            /**
             * Update the column headers of the table.
             * @internal
             */
            updateColumnHeaders() {
                const headersContainer = this.columnHeadersContainer;
                if (!headersContainer) {
                    return;
                }
                // Handle overflowing text in headers.
                for (let i = 0; i < this.columnNames.length; i++) {
                    const columnName = this.columnNames[i], header = headersContainer.children[i], overflowWidth = this.overflowHeaderWidths[i];
                    if (header.scrollWidth > header.clientWidth) {
                        // Headers overlap
                        this.overflowHeaderWidths[i] = header.scrollWidth;
                        header.textContent = this.formatHeaderCell(columnName)
                            .split(' ').map((word) => (word.length < 4 ? word : word.slice(0, 2) + '...')).join(' ');
                    }
                    else if (isNumber(overflowWidth) &&
                        overflowWidth <= header.clientWidth) {
                        // Headers not overlap
                        this.overflowHeaderWidths[i] = null;
                        header.textContent = this.formatHeaderCell(columnName);
                    }
                }
                // Offset the outer container by the header row height.
                this.outerContainer.style.top = headersContainer.clientHeight + 'px';
                // Header columns alignment when scrollbar is shown.
                if (headersContainer.lastChild) {
                    headersContainer.lastChild
                        .style.marginRight = (this.outerContainer.offsetWidth -
                        this.outerContainer.clientWidth) + 'px';
                }
            }
            /**
             * Redraw existing row elements.
             * @internal
             */
            redrawRowElements() {
                if (!this.rowElements.length) {
                    return;
                }
                const prevColumnFlexes = [], firstRowChildren = this.rowElements[0].children;
                for (let i = 0; i < firstRowChildren.length; i++) {
                    prevColumnFlexes.push(firstRowChildren[i].style.flex);
                }
                emptyHTMLElement(this.innerContainer);
                this.renderInitialRows();
                this.updateScrollingLength();
                this.updateVisibleCells(true);
                for (let i = 0; i < this.rowElements.length; i++) {
                    const row = this.rowElements[i];
                    for (let j = 0; j < row.childElementCount; j++) {
                        row.children[j].style.flex =
                            prevColumnFlexes[j];
                    }
                }
            }
            /**
             * Update the column drag handles position.
             * @internal
             */
            updateDragHandlesPosition() {
                const headersContainer = this.columnHeadersContainer, handlesContainer = this.columnDragHandlesContainer;
                if (!handlesContainer || !headersContainer) {
                    return;
                }
                for (let i = 0; i < handlesContainer.childElementCount - 1; i++) {
                    const handle = handlesContainer.children[i], header = headersContainer.children[i + 1];
                    handle.style.height = headersContainer.clientHeight + 'px';
                    handle.style.left = header.offsetLeft - 2 + 'px';
                }
            }
            /**
             * Render initial rows before the user starts scrolling.
             * @internal
             */
            renderInitialRows() {
                this.rowElements = [];
                const rowsToDraw = this.getNumRowsToDraw();
                for (let i = 0; i < rowsToDraw; i++) {
                    this.renderRow();
                }
            }
            /**
             * Render the drag handles for resizing columns.
             * @internal
             */
            renderColumnDragHandles() {
                if (!this.columnHeadersContainer) {
                    return;
                }
                const container = this.columnDragHandlesContainer = (this.columnDragHandlesContainer ||
                    makeDiv(`${Globals.classNamePrefix}col-resize-container`));
                const columnEls = this.columnHeadersContainer.children;
                const handleHeight = this.options.cellHeight;
                emptyHTMLElement(container);
                for (let i = 1; i < columnEls.length; ++i) {
                    const col = columnEls[i];
                    const handle = makeDiv(`${Globals.classNamePrefix}col-resize-handle`);
                    handle.style.height = handleHeight + 'px';
                    handle.style.left = col.offsetLeft - 2 + 'px';
                    handle.addEventListener('mouseover', () => {
                        if (!this.draggedResizeHandle) {
                            handle.style.opacity = '1';
                        }
                    });
                    handle.addEventListener('mouseleave', () => {
                        if (!this.draggedResizeHandle) {
                            handle.style.opacity = '0';
                        }
                    });
                    handle.addEventListener('mousedown', this.onHandleMouseDown.bind(this, handle, i));
                    container.appendChild(handle);
                }
                this.renderColumnResizeCrosshair(container);
                document.addEventListener('mouseup', (e) => {
                    if (this.draggedResizeHandle) {
                        this.stopColumnResize(this.draggedResizeHandle, e);
                    }
                });
                document.addEventListener('mousemove', (e) => {
                    if (this.draggedResizeHandle) {
                        this.updateColumnResizeDrag(e);
                    }
                });
                if (this.headerContainer) {
                    this.headerContainer.appendChild(container);
                }
            }
            /**
             * Renders the crosshair shown when resizing columns.
             *
             * @internal
             *
             * @param container
             * The container to place the crosshair in.
             */
            renderColumnResizeCrosshair(container) {
                const el = this.columnResizeCrosshair = (this.columnResizeCrosshair ||
                    makeDiv(`${Globals.classNamePrefix}col-resize-crosshair`));
                const handleHeight = this.options.cellHeight;
                el.style.top = handleHeight + 'px';
                el.style.height = this.innerContainer.offsetHeight + 'px';
                container.appendChild(el);
            }
            /**
             * On column resize handle click.
             *
             * @internal
             *
             * @param handle
             * The drag handle being clicked.
             *
             * @param colRightIx
             * The column ix to the right of the resize handle.
             *
             * @param e
             * The mousedown event.
             */
            onHandleMouseDown(handle, colRightIx, e) {
                if (this.draggedResizeHandle) {
                    return;
                }
                e.preventDefault();
                this.draggedResizeHandle = handle;
                this.draggedColumnRightIx = colRightIx;
                this.dragResizeStart = e.pageX;
                const crosshair = this.columnResizeCrosshair;
                if (crosshair) {
                    crosshair.style.left = (handle.offsetLeft + handle.offsetWidth / 2 -
                        crosshair.offsetWidth / 2 + 'px');
                    crosshair.style.opacity = '1';
                }
            }
            /**
             * Update as we drag column resizer
             * @internal
             */
            updateColumnResizeDrag(e) {
                const handle = this.draggedResizeHandle;
                const crosshair = this.columnResizeCrosshair;
                const colRightIx = this.draggedColumnRightIx;
                const colHeaders = this.columnHeadersContainer;
                if (!handle ||
                    !crosshair ||
                    colRightIx === null ||
                    !colHeaders ||
                    !this.dragResizeStart) {
                    return;
                }
                const col = colHeaders.children[colRightIx];
                const diff = e.pageX - this.dragResizeStart;
                const newPos = col.offsetLeft + diff;
                handle.style.left = newPos - handle.offsetWidth / 2 + 'px';
                crosshair.style.left = newPos - crosshair.offsetWidth / 2 + 'px';
            }
            /**
             * Stop resizing a column.
             *
             * @internal
             *
             * @param handle
             * The related resize handle.
             *
             * @param e
             * The related mouse event.
             */
            stopColumnResize(handle, e) {
                const crosshair = this.columnResizeCrosshair;
                const colRightIx = this.draggedColumnRightIx;
                const colContainer = this.columnHeadersContainer;
                if (!crosshair ||
                    !colContainer ||
                    !this.dragResizeStart ||
                    colRightIx === null) {
                    return;
                }
                handle.style.opacity = '0';
                crosshair.style.opacity = '0';
                const colLeft = colContainer.children[colRightIx - 1];
                const colRight = colContainer.children[colRightIx];
                const diff = e.pageX - this.dragResizeStart;
                const newWidthLeft = colLeft.offsetWidth + diff;
                const newWidthRight = colRight.offsetWidth - diff;
                const diffRatioLeft = newWidthLeft / colLeft.offsetWidth;
                const diffRatioRight = newWidthRight / colRight.offsetWidth;
                const leftFlexRatio = ((colLeft.style.flex ? parseFloat(colLeft.style.flex) : 1) *
                    diffRatioLeft);
                const rightFlexRatio = ((colRight.style.flex ? parseFloat(colRight.style.flex) : 1) *
                    diffRatioRight);
                this.resizeColumn(leftFlexRatio, colRightIx - 1);
                this.resizeColumn(rightFlexRatio, colRightIx);
                this.draggedResizeHandle = null;
                this.draggedColumnRightIx = null;
                this.updateGridElements();
            }
            /**
             * Update the size of grid container.
             *
             * @internal
             *
             * @param width
             * The new width in pixel, or `null` for no change.
             *
             * @param height
             * The new height in pixel, or `null` for no change.
             */
            setSize(width, height) {
                if (width) {
                    this.innerContainer.style.width = width + 'px';
                }
                if (height) {
                    this.gridContainer.style.height = this.getDataGridSize() + 'px';
                    this.outerContainer.style.height =
                        height -
                            (this.options.cellHeight + // Header height
                                this.getMarginHeight(height)) + 'px';
                }
                this.render();
            }
            /**
             * If the grid is in the parent container that has margins, calculate the
             * height of the margins.
             * @internal
             *
             * @param  height
             * The height of the parent container.
             */
            getMarginHeight(height) {
                return height - this.gridContainer.getBoundingClientRect().height;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options for all DataGrid instances.
         */
        DataGrid.defaultOptions = DataGridDefaults;
        /* *
         *
         *  Default Export
         *
         * */

        return DataGrid;
    });
    _registerModule(_modules, 'Data/DataPoolDefaults.js', [], function () {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        const DataPoolDefaults = {
            connectors: []
        };
        /* *
         *
         *  Export Defaults
         *
         * */

        return DataPoolDefaults;
    });
    _registerModule(_modules, 'Data/DataPool.js', [_modules['Data/Connectors/DataConnector.js'], _modules['Data/DataPoolDefaults.js'], _modules['Core/Utilities.js']], function (DataConnector, DataPoolDefaults, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Class
         *
         * */
        /**
         * Data pool to load connectors on-demand.
         *
         * @class
         * @name Data.DataPool
         *
         * @param {Data.DataPoolOptions} options
         * Pool options with all connectors.
         */
        class DataPool {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(options = DataPoolDefaults) {
                options.connectors = (options.connectors || []);
                this.connectors = {};
                this.options = options;
                this.waiting = {};
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Emits an event on this data pool to all registered callbacks of the given
             * event.
             * @private
             *
             * @param {DataTable.Event} e
             * Event object with event information.
             */
            emit(e) {
                U.fireEvent(this, e.type, e);
            }
            /**
             * Loads the connector.
             *
             * @function Data.DataPool#getConnector
             *
             * @param {string} connectorId
             * ID of the connector.
             *
             * @return {Promise<Data.DataConnector>}
             * Returns the connector.
             */
            getConnector(connectorId) {
                const connector = this.connectors[connectorId];
                // Already loaded
                if (connector) {
                    return Promise.resolve(connector);
                }
                let waitingList = this.waiting[connectorId];
                // Start loading
                if (!waitingList) {
                    waitingList = this.waiting[connectorId] = [];
                    const connectorOptions = this.getConnectorOptions(connectorId);
                    if (!connectorOptions) {
                        throw new Error(`Connector not found. (${connectorId})`);
                    }
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    this
                        .loadConnector(connectorOptions)
                        .then((connector) => {
                        delete this.waiting[connectorId];
                        for (let i = 0, iEnd = waitingList.length; i < iEnd; ++i) {
                            waitingList[i][0](connector);
                        }
                    })['catch']((error) => {
                        delete this.waiting[connectorId];
                        for (let i = 0, iEnd = waitingList.length; i < iEnd; ++i) {
                            waitingList[i][1](error);
                        }
                    });
                }
                // Add request to waiting list
                return new Promise((resolve, reject) => {
                    waitingList.push([resolve, reject]);
                });
            }
            /**
             * Returns the IDs of all connectors.
             *
             * @private
             *
             * @return {Array<string>}
             * Names of all connectors.
             */
            getConnectorIds() {
                const connectors = this.options.connectors, connectorIds = [];
                for (let i = 0, iEnd = connectors.length; i < iEnd; ++i) {
                    connectorIds.push(connectors[i].id);
                }
                return connectorIds;
            }
            /**
             * Loads the options of the connector.
             *
             * @private
             *
             * @param {string} connectorId
             * ID of the connector.
             *
             * @return {DataPoolConnectorOptions|undefined}
             * Returns the options of the connector, or `undefined` if not found.
             */
            getConnectorOptions(connectorId) {
                const connectors = this.options.connectors;
                for (let i = 0, iEnd = connectors.length; i < iEnd; ++i) {
                    if (connectors[i].id === connectorId) {
                        return connectors[i];
                    }
                }
            }
            /**
             * Loads the connector table.
             *
             * @function Data.DataPool#getConnectorTable
             *
             * @param {string} connectorId
             * ID of the connector.
             *
             * @return {Promise<Data.DataTable>}
             * Returns the connector table.
             */
            getConnectorTable(connectorId) {
                return this
                    .getConnector(connectorId)
                    .then((connector) => connector.table);
            }
            /**
             * Tests whether the connector has never been requested.
             *
             * @param {string} connectorId
             * Name of the connector.
             *
             * @return {boolean}
             * Returns `true`, if the connector has never been requested, otherwise
             * `false`.
             */
            isNewConnector(connectorId) {
                return !this.connectors[connectorId];
            }
            /**
             * Creates and loads the connector.
             *
             * @private
             *
             * @param {Data.DataPoolConnectorOptions} options
             * Options of connector.
             *
             * @return {Promise<Data.DataConnector>}
             * Returns the connector.
             */
            loadConnector(options) {
                return new Promise((resolve, reject) => {
                    this.emit({
                        type: 'load',
                        options
                    });
                    const ConnectorClass = DataConnector.types[options.type];
                    if (!ConnectorClass) {
                        throw new Error(`Connector type not found. (${options.type})`);
                    }
                    const connector = new ConnectorClass(options.options);
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    connector
                        .load()
                        .then((connector) => {
                        this.connectors[options.id] = connector;
                        this.emit({
                            type: 'afterLoad',
                            options
                        });
                        resolve(connector);
                    })['catch'](reject);
                });
            }
            /**
             * Registers a callback for a specific event.
             *
             * @function Highcharts.DataPool#on
             *
             * @param {string} type
             * Event type as a string.
             *
             * @param {Highcharts.EventCallbackFunction<Highcharts.DataPool>} callback
             * Function to register for an event callback.
             *
             * @return {Function}
             * Function to unregister callback from the event.
             */
            on(type, callback) {
                return U.addEvent(this, type, callback);
            }
            /**
             * Sets connector options under the specified `options.id`.
             *
             * @param {Data.DataPoolConnectorOptions} options
             * Connector options to set.
             */
            setConnectorOptions(options) {
                const connectors = this.options.connectors, instances = this.connectors;
                this.emit({
                    type: 'setConnectorOptions',
                    options
                });
                for (let i = 0, iEnd = connectors.length; i < iEnd; ++i) {
                    if (connectors[i].id === options.id) {
                        connectors.splice(i, 1);
                        break;
                    }
                }
                if (instances[options.id]) {
                    instances[options.id].stopPolling();
                    delete instances[options.id];
                }
                connectors.push(options);
                this.emit({
                    type: 'afterSetConnectorOptions',
                    options
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Semantic version string of the DataPool class.
         * @internal
         */
        DataPool.version = '1.0.0';
        /* *
         *
         *  Default Export
         *
         * */

        return DataPool;
    });
    _registerModule(_modules, 'Data/Converters/DataConverter.js', [_modules['Data/DataTable.js'], _modules['Core/Utilities.js']], function (DataTable, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *  - Sebastian Bochan
         *  - Gøran Slettemark
         *  - Torstein Hønsi
         *  - Wojciech Chmiel
         *
         * */
        const { addEvent, fireEvent, isNumber, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Base class providing an interface and basic methods for a DataConverter
         *
         * @private
         */
        class DataConverter {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the DataConverter.
             *
             * @param {DataConverter.UserOptions} [options]
             * Options for the DataConverter.
             */
            constructor(options) {
                /* *
                 *
                 *  Properties
                 *
                 * */
                /**
                 * A collection of available date formats.
                 */
                this.dateFormats = {
                    'YYYY/mm/dd': {
                        regex: /^([0-9]{4})([\-\.\/])([0-9]{1,2})\2([0-9]{1,2})$/,
                        parser: function (match) {
                            return (match ?
                                Date.UTC(+match[1], match[3] - 1, +match[4]) :
                                NaN);
                        }
                    },
                    'dd/mm/YYYY': {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{4})$/,
                        parser: function (match) {
                            return (match ?
                                Date.UTC(+match[4], match[3] - 1, +match[1]) :
                                NaN);
                        },
                        alternative: 'mm/dd/YYYY' // Different format with the same regex
                    },
                    'mm/dd/YYYY': {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{4})$/,
                        parser: function (match) {
                            return (match ?
                                Date.UTC(+match[4], match[1] - 1, +match[3]) :
                                NaN);
                        }
                    },
                    'dd/mm/YY': {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{2})$/,
                        parser: function (match) {
                            const d = new Date();
                            if (!match) {
                                return NaN;
                            }
                            let year = +match[4];
                            if (year > (d.getFullYear() - 2000)) {
                                year += 1900;
                            }
                            else {
                                year += 2000;
                            }
                            return Date.UTC(year, match[3] - 1, +match[1]);
                        },
                        alternative: 'mm/dd/YY' // Different format with the same regex
                    },
                    'mm/dd/YY': {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{2})$/,
                        parser: function (match) {
                            return (match ?
                                Date.UTC(+match[4] + 2000, match[1] - 1, +match[3]) :
                                NaN);
                        }
                    }
                };
                const mergedOptions = merge(DataConverter.defaultOptions, options);
                let regExpPoint = mergedOptions.decimalPoint;
                if (regExpPoint === '.' || regExpPoint === ',') {
                    regExpPoint = regExpPoint === '.' ? '\\.' : ',';
                    this.decimalRegExp =
                        new RegExp('^(-?[0-9]+)' + regExpPoint + '([0-9]+)$');
                }
                this.options = mergedOptions;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Converts a value to a boolean.
             *
             * @param {DataConverter.Type} value
             * Value to convert.
             *
             * @return {boolean}
             * Converted value as a boolean.
             */
            asBoolean(value) {
                if (typeof value === 'boolean') {
                    return value;
                }
                if (typeof value === 'string') {
                    return value !== '' && value !== '0' && value !== 'false';
                }
                return !!this.asNumber(value);
            }
            /**
             * Converts a value to a Date.
             *
             * @param {DataConverter.Type} value
             * Value to convert.
             *
             * @return {globalThis.Date}
             * Converted value as a Date.
             */
            asDate(value) {
                let timestamp;
                if (typeof value === 'string') {
                    timestamp = this.parseDate(value);
                }
                else if (typeof value === 'number') {
                    timestamp = value;
                }
                else if (value instanceof Date) {
                    return value;
                }
                else {
                    timestamp = this.parseDate(this.asString(value));
                }
                return new Date(timestamp);
            }
            /**
             * Casts a string value to it's guessed type
             *
             * @param {*} value
             * The value to examine.
             *
             * @return {number|string|Date}
             * The converted value.
             */
            asGuessedType(value) {
                const converter = this, typeMap = {
                    'number': converter.asNumber,
                    'Date': converter.asDate,
                    'string': converter.asString
                };
                return typeMap[converter.guessType(value)].call(converter, value);
            }
            /**
             * Converts a value to a number.
             *
             * @param {DataConverter.Type} value
             * Value to convert.
             *
             * @return {number}
             * Converted value as a number.
             */
            asNumber(value) {
                if (typeof value === 'number') {
                    return value;
                }
                if (typeof value === 'boolean') {
                    return value ? 1 : 0;
                }
                if (typeof value === 'string') {
                    const decimalRegex = this.decimalRegExp;
                    if (value.indexOf(' ') > -1) {
                        value = value.replace(/\s+/g, '');
                    }
                    if (decimalRegex) {
                        if (!decimalRegex.test(value)) {
                            return NaN;
                        }
                        value = value.replace(decimalRegex, '$1.$2');
                    }
                    return parseFloat(value);
                }
                if (value instanceof Date) {
                    return value.getDate();
                }
                if (value) {
                    return value.getRowCount();
                }
                return NaN;
            }
            /**
             * Converts a value to a string.
             *
             * @param {DataConverter.Type} value
             * Value to convert.
             *
             * @return {string}
             * Converted value as a string.
             */
            asString(value) {
                return '' + value;
            }
            /**
             * Tries to guess the date format
             *  - Check if either month candidate exceeds 12
             *  - Check if year is missing (use current year)
             *  - Check if a shortened year format is used (e.g. 1/1/99)
             *  - If no guess can be made, the user must be prompted
             * data is the data to deduce a format based on
             * @private
             *
             * @param {Array<string>} data
             * Data to check the format.
             *
             * @param {number} limit
             * Max data to check the format.
             *
             * @param {boolean} save
             * Whether to save the date format in the converter options.
             */
            deduceDateFormat(data, limit, save) {
                const parser = this, stable = [], max = [];
                let format = 'YYYY/mm/dd', thing, guessedFormat = [], i = 0, madeDeduction = false, 
                /// candidates = {},
                elem, j;
                if (!limit || limit > data.length) {
                    limit = data.length;
                }
                for (; i < limit; i++) {
                    if (typeof data[i] !== 'undefined' &&
                        data[i] && data[i].length) {
                        thing = data[i]
                            .trim()
                            .replace(/[-\.\/]/g, ' ')
                            .split(' ');
                        guessedFormat = [
                            '',
                            '',
                            ''
                        ];
                        for (j = 0; j < thing.length; j++) {
                            if (j < guessedFormat.length) {
                                elem = parseInt(thing[j], 10);
                                if (elem) {
                                    max[j] = (!max[j] || max[j] < elem) ? elem : max[j];
                                    if (typeof stable[j] !== 'undefined') {
                                        if (stable[j] !== elem) {
                                            stable[j] = false;
                                        }
                                    }
                                    else {
                                        stable[j] = elem;
                                    }
                                    if (elem > 31) {
                                        if (elem < 100) {
                                            guessedFormat[j] = 'YY';
                                        }
                                        else {
                                            guessedFormat[j] = 'YYYY';
                                        }
                                        /// madeDeduction = true;
                                    }
                                    else if (elem > 12 &&
                                        elem <= 31) {
                                        guessedFormat[j] = 'dd';
                                        madeDeduction = true;
                                    }
                                    else if (!guessedFormat[j].length) {
                                        guessedFormat[j] = 'mm';
                                    }
                                }
                            }
                        }
                    }
                }
                if (madeDeduction) {
                    // This handles a few edge cases with hard to guess dates
                    for (j = 0; j < stable.length; j++) {
                        if (stable[j] !== false) {
                            if (max[j] > 12 &&
                                guessedFormat[j] !== 'YY' &&
                                guessedFormat[j] !== 'YYYY') {
                                guessedFormat[j] = 'YY';
                            }
                        }
                        else if (max[j] > 12 && guessedFormat[j] === 'mm') {
                            guessedFormat[j] = 'dd';
                        }
                    }
                    // If the middle one is dd, and the last one is dd,
                    // the last should likely be year.
                    if (guessedFormat.length === 3 &&
                        guessedFormat[1] === 'dd' &&
                        guessedFormat[2] === 'dd') {
                        guessedFormat[2] = 'YY';
                    }
                    format = guessedFormat.join('/');
                    // If the caculated format is not valid, we need to present an
                    // error.
                }
                // Save the deduced format in the converter options.
                if (save) {
                    parser.options.dateFormat = format;
                }
                return format;
            }
            /**
             * Emits an event on the DataConverter instance.
             *
             * @param {DataConverter.Event} [e]
             * Event object containing additional event data
             */
            emit(e) {
                fireEvent(this, e.type, e);
            }
            /**
             * Initiates the data exporting. Should emit `exportError` on failure.
             *
             * @param {DataConnector} connector
             * Connector to export from.
             *
             * @param {DataConverter.Options} [options]
             * Options for the export.
             */
            export(
            /* eslint-disable @typescript-eslint/no-unused-vars */
            connector, options
            /* eslint-enable @typescript-eslint/no-unused-vars */
            ) {
                this.emit({
                    type: 'exportError',
                    columns: [],
                    headers: []
                });
                throw new Error('Not implemented');
            }
            /**
             * Getter for the data table.
             *
             * @return {DataTable}
             * Table of parsed data.
             */
            getTable() {
                throw new Error('Not implemented');
            }
            /**
             * Guesses the potential type of a string value for parsing CSV etc.
             *
             * @param {*} value
             * The value to examine.
             *
             * @return {'number'|'string'|'Date'}
             * Type string, either `string`, `Date`, or `number`.
             */
            guessType(value) {
                const converter = this;
                let result = 'string';
                if (typeof value === 'string') {
                    const trimedValue = converter.trim(`${value}`), decimalRegExp = converter.decimalRegExp;
                    let innerTrimedValue = converter.trim(trimedValue, true);
                    if (decimalRegExp) {
                        innerTrimedValue = (decimalRegExp.test(innerTrimedValue) ?
                            innerTrimedValue.replace(decimalRegExp, '$1.$2') :
                            '');
                    }
                    const floatValue = parseFloat(innerTrimedValue);
                    if (+innerTrimedValue === floatValue) {
                        // String is numeric
                        value = floatValue;
                    }
                    else {
                        // Determine if a date string
                        const dateValue = converter.parseDate(value);
                        result = isNumber(dateValue) ? 'Date' : 'string';
                    }
                }
                if (typeof value === 'number') {
                    // Greater than milliseconds in a year assumed timestamp
                    result = value > 365 * 24 * 3600 * 1000 ? 'Date' : 'number';
                }
                return result;
            }
            /**
             * Registers a callback for a specific event.
             *
             * @param {string} type
             * Event type as a string.
             *
             * @param {DataEventEmitter.Callback} callback
             * Function to register for an modifier callback.
             *
             * @return {Function}
             * Function to unregister callback from the modifier event.
             */
            on(type, callback) {
                return addEvent(this, type, callback);
            }
            /**
             * Initiates the data parsing. Should emit `parseError` on failure.
             *
             * @param {DataConverter.UserOptions} options
             * Options of the DataConverter.
             */
            parse(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            options) {
                this.emit({
                    type: 'parseError',
                    columns: [],
                    headers: []
                });
                throw new Error('Not implemented');
            }
            /**
             * Parse a date and return it as a number.
             *
             * @function Highcharts.Data#parseDate
             *
             * @param {string} value
             * Value to parse.
             *
             * @param {string} dateFormatProp
             * Which of the predefined date formats
             * to use to parse date values.
             */
            parseDate(value, dateFormatProp) {
                const converter = this, options = converter.options;
                let dateFormat = dateFormatProp || options.dateFormat, result = NaN, key, format, match;
                if (options.parseDate) {
                    result = options.parseDate(value);
                }
                else {
                    // Auto-detect the date format the first time
                    if (!dateFormat) {
                        for (key in converter.dateFormats) { // eslint-disable-line guard-for-in
                            format = converter.dateFormats[key];
                            match = value.match(format.regex);
                            if (match) {
                                // `converter.options.dateFormat` = dateFormat = key;
                                dateFormat = key;
                                // `converter.options.alternativeFormat` =
                                // format.alternative || '';
                                result = format.parser(match);
                                break;
                            }
                        }
                        // Next time, use the one previously found
                    }
                    else {
                        format = converter.dateFormats[dateFormat];
                        if (!format) {
                            // The selected format is invalid
                            format = converter.dateFormats['YYYY/mm/dd'];
                        }
                        match = value.match(format.regex);
                        if (match) {
                            result = format.parser(match);
                        }
                    }
                    // Fall back to Date.parse
                    if (!match) {
                        match = Date.parse(value);
                        // External tools like Date.js and MooTools extend Date object
                        // and returns a date.
                        if (typeof match === 'object' &&
                            match !== null &&
                            match.getTime) {
                            result = (match.getTime() -
                                match.getTimezoneOffset() *
                                    60000);
                            // Timestamp
                        }
                        else if (isNumber(match)) {
                            result = match - (new Date(match)).getTimezoneOffset() * 60000;
                            if ( // Reset dates without year in Chrome
                            value.indexOf('2001') === -1 &&
                                (new Date(result)).getFullYear() === 2001) {
                                result = NaN;
                            }
                        }
                    }
                }
                return result;
            }
            /**
             * Trim a string from whitespaces.
             *
             * @param {string} str
             * String to trim.
             *
             * @param {boolean} [inside=false]
             * Remove all spaces between numbers.
             *
             * @return {string}
             * Trimed string
             */
            trim(str, inside) {
                if (typeof str === 'string') {
                    str = str.replace(/^\s+|\s+$/g, '');
                    // Clear white space insdie the string, like thousands separators
                    if (inside && /^[0-9\s]+$/.test(str)) {
                        str = str.replace(/\s/g, '');
                    }
                }
                return str;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options
         */
        DataConverter.defaultOptions = {
            dateFormat: '',
            alternativeFormat: '',
            startColumn: 0,
            endColumn: Number.MAX_VALUE,
            startRow: 0,
            endRow: Number.MAX_VALUE,
            firstRowAsNames: true,
            switchRowsAndColumns: false
        };
        /* *
         *
         *  Class Namespace
         *
         * */
        /**
         * Additionally provided types for events and conversion.
         */
        (function (DataConverter) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Converts an array of columns to a table instance. Second dimension of the
             * array are the row cells.
             *
             * @param {Array<DataTable.Column>} [columns]
             * Array to convert.
             *
             * @param {Array<string>} [headers]
             * Column names to use.
             *
             * @return {DataTable}
             * Table instance from the arrays.
             */
            function getTableFromColumns(columns = [], headers = []) {
                const table = new DataTable();
                for (let i = 0, iEnd = Math.max(headers.length, columns.length); i < iEnd; ++i) {
                    table.setColumn(headers[i] || `${i}`, columns[i]);
                }
                return table;
            }
            DataConverter.getTableFromColumns = getTableFromColumns;
        })(DataConverter || (DataConverter = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return DataConverter;
    });
    _registerModule(_modules, 'Data/Converters/CSVConverter.js', [_modules['Data/Converters/DataConverter.js'], _modules['Core/Utilities.js']], function (DataConverter, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Christer Vasseng
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Handles parsing and transforming CSV to a table.
         *
         * @private
         */
        class CSVConverter extends DataConverter {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the CSV parser.
             *
             * @param {CSVConverter.UserOptions} [options]
             * Options for the CSV parser.
             */
            constructor(options) {
                const mergedOptions = merge(CSVConverter.defaultOptions, options);
                super(mergedOptions);
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.columns = [];
                this.headers = [];
                this.dataTypes = [];
                this.options = mergedOptions;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Creates a CSV string from the datatable on the connector instance.
             *
             * @param {DataConnector} connector
             * Connector instance to export from.
             *
             * @param {CSVConverter.Options} [options]
             * Options used for the export.
             *
             * @return {string}
             * CSV string from the connector table.
             */
            export(connector, options = this.options) {
                const { useLocalDecimalPoint, lineDelimiter } = options, exportNames = (this.options.firstRowAsNames !== false);
                let { decimalPoint, itemDelimiter } = options;
                if (!decimalPoint) {
                    decimalPoint = (itemDelimiter !== ',' && useLocalDecimalPoint ?
                        (1.1).toLocaleString()[1] :
                        '.');
                }
                if (!itemDelimiter) {
                    itemDelimiter = (decimalPoint === ',' ? ';' : ',');
                }
                const columns = connector.getSortedColumns(options.usePresentationOrder), columnNames = Object.keys(columns), csvRows = [], columnsCount = columnNames.length;
                const rowArray = [];
                // Add the names as the first row if they should be exported
                if (exportNames) {
                    csvRows.push(columnNames.map((columnName) => `"${columnName}"`).join(itemDelimiter));
                }
                for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
                    const columnName = columnNames[columnIndex], column = columns[columnName], columnLength = column.length;
                    const columnMeta = connector.whatIs(columnName);
                    let columnDataType;
                    if (columnMeta) {
                        columnDataType = columnMeta.dataType;
                    }
                    for (let rowIndex = 0; rowIndex < columnLength; rowIndex++) {
                        let cellValue = column[rowIndex];
                        if (!rowArray[rowIndex]) {
                            rowArray[rowIndex] = [];
                        }
                        // Prefer datatype from metadata
                        if (columnDataType === 'string') {
                            cellValue = '"' + cellValue + '"';
                        }
                        else if (typeof cellValue === 'number') {
                            cellValue = String(cellValue).replace('.', decimalPoint);
                        }
                        else if (typeof cellValue === 'string') {
                            cellValue = `"${cellValue}"`;
                        }
                        rowArray[rowIndex][columnIndex] = cellValue;
                        // On the final column, push the row to the CSV
                        if (columnIndex === columnsCount - 1) {
                            // Trim repeated undefined values starting at the end
                            // Currently, we export the first "comma" even if the
                            // second value is undefined
                            let i = columnIndex;
                            while (rowArray[rowIndex].length > 2) {
                                const cellVal = rowArray[rowIndex][i];
                                if (cellVal !== void 0) {
                                    break;
                                }
                                rowArray[rowIndex].pop();
                                i--;
                            }
                            csvRows.push(rowArray[rowIndex].join(itemDelimiter));
                        }
                    }
                }
                return csvRows.join(lineDelimiter);
            }
            /**
             * Initiates parsing of CSV
             *
             * @param {CSVConverter.UserOptions}[options]
             * Options for the parser
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits CSVDataParser#parse
             * @emits CSVDataParser#afterParse
             */
            parse(options, eventDetail) {
                const converter = this, dataTypes = converter.dataTypes, parserOptions = merge(this.options, options), { beforeParse, lineDelimiter, firstRowAsNames, itemDelimiter } = parserOptions;
                let lines, rowIt = 0, { csv, startRow, endRow } = parserOptions, column;
                converter.columns = [];
                converter.emit({
                    type: 'parse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.headers
                });
                if (csv && beforeParse) {
                    csv = beforeParse(csv);
                }
                if (csv) {
                    lines = csv
                        .replace(/\r\n|\r/g, '\n') // Windows | Mac
                        .split(lineDelimiter || '\n');
                    if (!startRow || startRow < 0) {
                        startRow = 0;
                    }
                    if (!endRow || endRow >= lines.length) {
                        endRow = lines.length - 1;
                    }
                    if (!itemDelimiter) {
                        converter.guessedItemDelimiter =
                            converter.guessDelimiter(lines);
                    }
                    // If the first row contain names, add them to the
                    // headers array and skip the row.
                    if (firstRowAsNames) {
                        const headers = lines[0].split(itemDelimiter || converter.guessedItemDelimiter || ',');
                        // Remove ""s from the headers
                        for (let i = 0; i < headers.length; i++) {
                            headers[i] = headers[i].trim().replace(/^["']|["']$/g, '');
                        }
                        converter.headers = headers;
                        startRow++;
                    }
                    let offset = 0;
                    for (rowIt = startRow; rowIt <= endRow; rowIt++) {
                        if (lines[rowIt][0] === '#') {
                            offset++;
                        }
                        else {
                            converter
                                .parseCSVRow(lines[rowIt], rowIt - startRow - offset);
                        }
                    }
                    if (dataTypes.length &&
                        dataTypes[0].length &&
                        dataTypes[0][1] === 'date' && // Format is a string date
                        !converter.options.dateFormat) {
                        converter.deduceDateFormat(converter.columns[0], null, true);
                    }
                    // Guess types.
                    for (let i = 0, iEnd = converter.columns.length; i < iEnd; ++i) {
                        column = converter.columns[i];
                        for (let j = 0, jEnd = column.length; j < jEnd; ++j) {
                            if (column[j] && typeof column[j] === 'string') {
                                let cellValue = converter.asGuessedType(column[j]);
                                if (cellValue instanceof Date) {
                                    cellValue = cellValue.getTime();
                                }
                                converter.columns[i][j] = cellValue;
                            }
                        }
                    }
                }
                converter.emit({
                    type: 'afterParse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.headers
                });
            }
            /**
             * Internal method that parses a single CSV row
             */
            parseCSVRow(columnStr, rowNumber) {
                const converter = this, columns = converter.columns || [], dataTypes = converter.dataTypes, { startColumn, endColumn } = converter.options, itemDelimiter = (converter.options.itemDelimiter ||
                    converter.guessedItemDelimiter);
                let { decimalPoint } = converter.options;
                if (!decimalPoint || decimalPoint === itemDelimiter) {
                    decimalPoint = converter.guessedDecimalPoint || '.';
                }
                let i = 0, c = '', token = '', actualColumn = 0, column = 0;
                const read = (j) => {
                    c = columnStr[j];
                };
                const pushType = (type) => {
                    if (dataTypes.length < column + 1) {
                        dataTypes.push([type]);
                    }
                    if (dataTypes[column][dataTypes[column].length - 1] !== type) {
                        dataTypes[column].push(type);
                    }
                };
                const push = () => {
                    if (startColumn > actualColumn || actualColumn > endColumn) {
                        // Skip this column, but increment the column count (#7272)
                        ++actualColumn;
                        token = '';
                        return;
                    }
                    // Save the type of the token.
                    if (typeof token === 'string') {
                        if (!isNaN(parseFloat(token)) && isFinite(token)) {
                            token = parseFloat(token);
                            pushType('number');
                        }
                        else if (!isNaN(Date.parse(token))) {
                            token = token.replace(/\//g, '-');
                            pushType('date');
                        }
                        else {
                            pushType('string');
                        }
                    }
                    else {
                        pushType('number');
                    }
                    if (columns.length < column + 1) {
                        columns.push([]);
                    }
                    // Try to apply the decimal point, and check if the token then is a
                    // number. If not, reapply the initial value
                    if (typeof token !== 'number' &&
                        converter.guessType(token) !== 'number' &&
                        decimalPoint) {
                        const initialValue = token;
                        token = token.replace(decimalPoint, '.');
                        if (converter.guessType(token) !== 'number') {
                            token = initialValue;
                        }
                    }
                    columns[column][rowNumber] = token;
                    token = '';
                    ++column;
                    ++actualColumn;
                };
                if (!columnStr.trim().length) {
                    return;
                }
                if (columnStr.trim()[0] === '#') {
                    return;
                }
                for (; i < columnStr.length; i++) {
                    read(i);
                    if (c === '#') {
                        // If there are hexvalues remaining (#13283)
                        if (!/^#[0-F]{3,3}|[0-F]{6,6}/i.test(columnStr.substring(i))) {
                            // The rest of the row is a comment
                            push();
                            return;
                        }
                    }
                    // Quoted string
                    if (c === '"') {
                        read(++i);
                        while (i < columnStr.length) {
                            if (c === '"') {
                                break;
                            }
                            token += c;
                            read(++i);
                        }
                    }
                    else if (c === itemDelimiter) {
                        push();
                        // Actual column data
                    }
                    else {
                        token += c;
                    }
                }
                push();
            }
            /**
             * Internal method that guesses the delimiter from the first
             * 13 lines of the CSV
             * @param {Array<string>} lines
             * The CSV, split into lines
             */
            guessDelimiter(lines) {
                let points = 0, commas = 0, guessed;
                const potDelimiters = {
                    ',': 0,
                    ';': 0,
                    '\t': 0
                }, linesCount = lines.length;
                for (let i = 0; i < linesCount; i++) {
                    let inStr = false, c, cn, cl, token = '';
                    // We should be able to detect dateformats within 13 rows
                    if (i > 13) {
                        break;
                    }
                    const columnStr = lines[i];
                    for (let j = 0; j < columnStr.length; j++) {
                        c = columnStr[j];
                        cn = columnStr[j + 1];
                        cl = columnStr[j - 1];
                        if (c === '#') {
                            // Skip the rest of the line - it's a comment
                            break;
                        }
                        if (c === '"') {
                            if (inStr) {
                                if (cl !== '"' && cn !== '"') {
                                    while (cn === ' ' && j < columnStr.length) {
                                        cn = columnStr[++j];
                                    }
                                    // After parsing a string, the next non-blank
                                    // should be a delimiter if the CSV is properly
                                    // formed.
                                    if (typeof potDelimiters[cn] !== 'undefined') {
                                        potDelimiters[cn]++;
                                    }
                                    inStr = false;
                                }
                            }
                            else {
                                inStr = true;
                            }
                        }
                        else if (typeof potDelimiters[c] !== 'undefined') {
                            token = token.trim();
                            if (!isNaN(Date.parse(token))) {
                                potDelimiters[c]++;
                            }
                            else if (isNaN(Number(token)) ||
                                !isFinite(Number(token))) {
                                potDelimiters[c]++;
                            }
                            token = '';
                        }
                        else {
                            token += c;
                        }
                        if (c === ',') {
                            commas++;
                        }
                        if (c === '.') {
                            points++;
                        }
                    }
                }
                // Count the potential delimiters.
                // This could be improved by checking if the number of delimiters
                // equals the number of columns - 1
                if (potDelimiters[';'] > potDelimiters[',']) {
                    guessed = ';';
                }
                else if (potDelimiters[','] > potDelimiters[';']) {
                    guessed = ',';
                }
                else {
                    // No good guess could be made..
                    guessed = ',';
                }
                // Try to deduce the decimal point if it's not explicitly set.
                // If both commas or points is > 0 there is likely an issue
                if (points > commas) {
                    this.guessedDecimalPoint = '.';
                }
                else {
                    this.guessedDecimalPoint = ',';
                }
                return guessed;
            }
            /**
             * Handles converting the parsed data to a table.
             *
             * @return {DataTable}
             * Table from the parsed CSV.
             */
            getTable() {
                return DataConverter.getTableFromColumns(this.columns, this.headers);
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options
         */
        CSVConverter.defaultOptions = {
            ...DataConverter.defaultOptions,
            lineDelimiter: '\n'
        };
        /* *
         *
         *  Default Export
         *
         * */

        return CSVConverter;
    });
    _registerModule(_modules, 'Data/Connectors/CSVConnector.js', [_modules['Data/Converters/CSVConverter.js'], _modules['Data/Connectors/DataConnector.js'], _modules['Core/Utilities.js']], function (CSVConverter, DataConnector, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Christer Vasseng
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Class that handles creating a DataConnector from CSV
         *
         * @private
         */
        class CSVConnector extends DataConnector {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of CSVConnector.
             *
             * @param {CSVConnector.UserOptions} [options]
             * Options for the connector and converter.
             */
            constructor(options) {
                const mergedOptions = merge(CSVConnector.defaultOptions, options);
                super(mergedOptions);
                this.converter = new CSVConverter(mergedOptions);
                this.options = mergedOptions;
                if (mergedOptions.enablePolling) {
                    this.startPolling(Math.max(mergedOptions.dataRefreshRate || 0, 1) * 1000);
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initiates the loading of the CSV source to the connector
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits CSVConnector#load
             * @emits CSVConnector#afterLoad
             */
            load(eventDetail) {
                const connector = this, converter = connector.converter, table = connector.table, { csv, csvURL, dataModifier } = connector.options;
                connector.emit({
                    type: 'load',
                    csv,
                    detail: eventDetail,
                    table
                });
                return Promise
                    .resolve(csvURL ?
                    fetch(csvURL).then((response) => response.text()) :
                    csv || '')
                    .then((csv) => {
                    if (csv) {
                        // If already loaded, clear the current rows
                        table.deleteColumns();
                        converter.parse({ csv });
                        table.setColumns(converter.getTable().getColumns());
                    }
                    return connector
                        .setModifierOptions(dataModifier)
                        .then(() => csv);
                })
                    .then((csv) => {
                    connector.emit({
                        type: 'afterLoad',
                        csv,
                        detail: eventDetail,
                        table
                    });
                    return connector;
                })['catch']((error) => {
                    connector.emit({
                        type: 'loadError',
                        detail: eventDetail,
                        error,
                        table
                    });
                    throw error;
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        CSVConnector.defaultOptions = {
            csv: '',
            csvURL: '',
            enablePolling: false,
            dataRefreshRate: 1,
            firstRowAsNames: true
        };
        DataConnector.registerType('CSV', CSVConnector);
        /* *
         *
         *  Default Export
         *
         * */

        return CSVConnector;
    });
    _registerModule(_modules, 'Data/Converters/GoogleSheetsConverter.js', [_modules['Data/Converters/DataConverter.js'], _modules['Core/Utilities.js']], function (DataConverter, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Gøran Slettemark
         *  - Wojciech Chmiel
         *  - Sophie Bremer
         *
         * */
        const { merge, uniqueKey } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Handles parsing and transformation of an Google Sheets to a table.
         *
         * @private
         */
        class GoogleSheetsConverter extends DataConverter {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the GoogleSheetsConverter.
             *
             * @param {GoogleSheetsConverter.UserOptions} [options]
             * Options for the GoogleSheetsConverter.
             */
            constructor(options) {
                const mergedOptions = merge(GoogleSheetsConverter.defaultOptions, options);
                super(mergedOptions);
                this.columns = [];
                this.header = [];
                this.options = mergedOptions;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initiates the parsing of the Google Sheet
             *
             * @param {GoogleSheetsConverter.UserOptions}[options]
             * Options for the parser
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits GoogleSheetsParser#parse
             * @emits GoogleSheetsParser#afterParse
             */
            parse(options, eventDetail) {
                const converter = this, parseOptions = merge(converter.options, options), columns = ((parseOptions.json &&
                    parseOptions.json.values) || []).map((column) => column.slice());
                if (columns.length === 0) {
                    return false;
                }
                converter.header = [];
                converter.columns = [];
                converter.emit({
                    type: 'parse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.header
                });
                converter.columns = columns;
                let column;
                for (let i = 0, iEnd = columns.length; i < iEnd; i++) {
                    column = columns[i];
                    converter.header[i] = (parseOptions.firstRowAsNames ?
                        `${column.shift()}` :
                        uniqueKey());
                    for (let j = 0, jEnd = column.length; j < jEnd; ++j) {
                        if (column[j] && typeof column[j] === 'string') {
                            let cellValue = converter.asGuessedType(column[j]);
                            if (cellValue instanceof Date) {
                                cellValue = cellValue.getTime();
                            }
                            converter.columns[i][j] = cellValue;
                        }
                    }
                }
                converter.emit({
                    type: 'afterParse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.header
                });
            }
            /**
             * Handles converting the parsed data to a table.
             *
             * @return {DataTable}
             * Table from the parsed Google Sheet
             */
            getTable() {
                return DataConverter.getTableFromColumns(this.columns, this.header);
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options
         */
        GoogleSheetsConverter.defaultOptions = {
            ...DataConverter.defaultOptions
        };
        /* *
         *
         *  Default Export
         *
         * */

        return GoogleSheetsConverter;
    });
    _registerModule(_modules, 'Data/Connectors/GoogleSheetsConnector.js', [_modules['Data/Connectors/DataConnector.js'], _modules['Data/Converters/GoogleSheetsConverter.js'], _modules['Core/Utilities.js']], function (DataConnector, GoogleSheetsConverter, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Gøran Slettemark
         *  - Wojciech Chmiel
         *  - Sophie Bremer
         *
         * */
        const { merge, pick } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Tests Google's response for error.
         * @private
         */
        function isGoogleError(json) {
            return (typeof json === 'object' && json &&
                typeof json.error === 'object' && json.error &&
                typeof json.error.code === 'number' &&
                typeof json.error.message === 'string' &&
                typeof json.error.status === 'string');
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @todo implement save, requires oauth2
         */
        class GoogleSheetsConnector extends DataConnector {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of GoogleSheetsConnector
             *
             * @param {GoogleSheetsConnector.UserOptions} [options]
             * Options for the connector and converter.
             */
            constructor(options) {
                const mergedOptions = merge(GoogleSheetsConnector.defaultOptions, options);
                super(mergedOptions);
                this.converter = new GoogleSheetsConverter(mergedOptions);
                this.options = mergedOptions;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Loads data from a Google Spreadsheet.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Promise<this>}
             * Same connector instance with modified table.
             */
            load(eventDetail) {
                const connector = this, converter = connector.converter, table = connector.table, { dataModifier, dataRefreshRate, enablePolling, firstRowAsNames, googleAPIKey, googleSpreadsheetKey } = connector.options, url = GoogleSheetsConnector.buildFetchURL(googleAPIKey, googleSpreadsheetKey, connector.options);
                connector.emit({
                    type: 'load',
                    detail: eventDetail,
                    table,
                    url
                });
                return fetch(url)
                    .then((response) => (response.json()))
                    .then((json) => {
                    if (isGoogleError(json)) {
                        throw new Error(json.error.message);
                    }
                    converter.parse({
                        firstRowAsNames,
                        json
                    });
                    // If already loaded, clear the current table
                    table.deleteColumns();
                    table.setColumns(converter.getTable().getColumns());
                    return connector.setModifierOptions(dataModifier);
                })
                    .then(() => {
                    connector.emit({
                        type: 'afterLoad',
                        detail: eventDetail,
                        table,
                        url
                    });
                    // Polling
                    if (enablePolling) {
                        setTimeout(() => connector.load(), Math.max(dataRefreshRate || 0, 1) * 1000);
                    }
                    return connector;
                })['catch']((error) => {
                    connector.emit({
                        type: 'loadError',
                        detail: eventDetail,
                        error,
                        table
                    });
                    throw error;
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        GoogleSheetsConnector.defaultOptions = {
            googleAPIKey: '',
            googleSpreadsheetKey: '',
            worksheet: 1,
            enablePolling: false,
            dataRefreshRate: 2,
            firstRowAsNames: true
        };
        /* *
         *
         *  Class Namespace
         *
         * */
        (function (GoogleSheetsConnector) {
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
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Creates GoogleSheets API v4 URL.
             * @private
             */
            function buildFetchURL(apiKey, sheetKey, options = {}) {
                return (`https://sheets.googleapis.com/v4/spreadsheets/${sheetKey}/values/` +
                    (options.onlyColumnNames ?
                        'A1:Z1' :
                        buildQueryRange(options)) +
                    '?alt=json' +
                    (options.onlyColumnNames ?
                        '' :
                        '&dateTimeRenderOption=FORMATTED_STRING' +
                            '&majorDimension=COLUMNS' +
                            '&valueRenderOption=UNFORMATTED_VALUE') +
                    '&prettyPrint=false' +
                    `&key=${apiKey}`);
            }
            GoogleSheetsConnector.buildFetchURL = buildFetchURL;
            /**
             * Creates sheets range.
             * @private
             */
            function buildQueryRange(options = {}) {
                const { endColumn, endRow, googleSpreadsheetRange, startColumn, startRow } = options;
                return googleSpreadsheetRange || ((alphabet[startColumn || 0] || 'A') +
                    (Math.max((startRow || 0), 0) + 1) +
                    ':' +
                    (alphabet[pick(endColumn, 25)] || 'Z') +
                    (endRow ?
                        Math.max(endRow, 0) :
                        'Z'));
            }
            GoogleSheetsConnector.buildQueryRange = buildQueryRange;
        })(GoogleSheetsConnector || (GoogleSheetsConnector = {}));
        DataConnector.registerType('GoogleSheets', GoogleSheetsConnector);
        /* *
         *
         *  Default Export
         *
         * */

        return GoogleSheetsConnector;
    });
    _registerModule(_modules, 'Data/Converters/HTMLTableConverter.js', [_modules['Data/Converters/DataConverter.js'], _modules['Core/Utilities.js']], function (DataConverter, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Gøran Slettemark
         *  - Wojciech Chmiel
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Row equal
         */
        function isRowEqual(row1, row2) {
            let i = row1.length;
            if (row2.length === i) {
                while (--i) {
                    if (row1[i] !== row2[i]) {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
            return true;
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * Handles parsing and transformation of an HTML table to a table.
         *
         * @private
         */
        class HTMLTableConverter extends DataConverter {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the HTMLTableConverter.
             *
             * @param {HTMLTableConverter.UserOptions} [options]
             * Options for the HTMLTableConverter.
             */
            constructor(options) {
                const mergedOptions = merge(HTMLTableConverter.defaultOptions, options);
                super(mergedOptions);
                this.columns = [];
                this.headers = [];
                this.options = mergedOptions;
                if (mergedOptions.tableElement) {
                    this.tableElement = mergedOptions.tableElement;
                    this.tableElementID = mergedOptions.tableElement.id;
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Exports the dataconnector as an HTML string, using the options
             * provided on      *
             * @param {DataConnector} connector
             * Connector instance to export from.
             *
             * @param {HTMLTableConnector.ExportOptions} [options]
             * Options that override default or existing export options.
             *
             * @return {string}
             * HTML from the current dataTable.
             */
            export(connector, options = this.options) {
                const exportNames = (options.firstRowAsNames !== false), useMultiLevelHeaders = options.useMultiLevelHeaders;
                const columns = connector.getSortedColumns(options.usePresentationOrder), columnNames = Object.keys(columns), htmlRows = [], columnsCount = columnNames.length;
                const rowArray = [];
                let tableHead = '';
                // Add the names as the first row if they should be exported
                if (exportNames) {
                    const subcategories = [];
                    // If using multilevel headers, the first value
                    // of each column is a subcategory
                    if (useMultiLevelHeaders) {
                        for (const name of columnNames) {
                            const subhead = (columns[name].shift() || '').toString();
                            subcategories.push(subhead);
                        }
                        tableHead = this.getTableHeaderHTML(columnNames, subcategories, options);
                    }
                    else {
                        tableHead = this.getTableHeaderHTML(void 0, columnNames, options);
                    }
                }
                for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
                    const columnName = columnNames[columnIndex], column = columns[columnName], columnLength = column.length;
                    for (let rowIndex = 0; rowIndex < columnLength; rowIndex++) {
                        let cellValue = column[rowIndex];
                        if (!rowArray[rowIndex]) {
                            rowArray[rowIndex] = [];
                        }
                        // Alternative: Datatype from HTML attribute with
                        // connector.whatIs(columnName)
                        if (!(typeof cellValue === 'string' ||
                            typeof cellValue === 'number' ||
                            typeof cellValue === 'undefined')) {
                            cellValue = (cellValue || '').toString();
                        }
                        rowArray[rowIndex][columnIndex] = this.getCellHTMLFromValue(columnIndex ? 'td' : 'th', null, columnIndex ? '' : 'scope="row"', cellValue);
                        // On the final column, push the row to the array
                        if (columnIndex === columnsCount - 1) {
                            htmlRows.push('<tr>' +
                                rowArray[rowIndex].join('') +
                                '</tr>');
                        }
                    }
                }
                let caption = '';
                // Add table caption
                // Current exportdata falls back to chart title
                // but that should probably be handled elsewhere?
                if (options.tableCaption) {
                    caption = '<caption class="highcharts-table-caption">' +
                        options.tableCaption +
                        '</caption>';
                }
                return ('<table>' +
                    caption +
                    tableHead +
                    '<tbody>' +
                    htmlRows.join('') +
                    '</tbody>' +
                    '</table>');
            }
            /**
             * Get table cell markup from row data.
             */
            getCellHTMLFromValue(tag, classes, attrs, value, decimalPoint) {
                let val = value, className = 'text' + (classes ? ' ' + classes : '');
                // Convert to string if number
                if (typeof val === 'number') {
                    val = val.toString();
                    if (decimalPoint === ',') {
                        val = val.replace('.', decimalPoint);
                    }
                    className = 'number';
                }
                else if (!value) {
                    val = '';
                    className = 'empty';
                }
                return '<' + tag + (attrs ? ' ' + attrs : '') +
                    ' class="' + className + '">' +
                    val + '</' + tag + '>';
            }
            /**
             * Get table header markup from row data.
             */
            getTableHeaderHTML(topheaders = [], subheaders = [], options = this.options) {
                const { useMultiLevelHeaders, useRowspanHeaders } = options;
                let html = '<thead>', i = 0, len = subheaders && subheaders.length, next, cur, curColspan = 0, rowspan;
                // Clean up multiple table headers. Chart.getDataRows() returns two
                // levels of headers when using multilevel, not merged. We need to
                // merge identical headers, remove redundant headers, and keep it
                // all marked up nicely.
                if (useMultiLevelHeaders &&
                    topheaders &&
                    subheaders &&
                    !isRowEqual(topheaders, subheaders)) {
                    html += '<tr>';
                    for (; i < len; ++i) {
                        cur = topheaders[i];
                        next = topheaders[i + 1];
                        if (cur === next) {
                            ++curColspan;
                        }
                        else if (curColspan) {
                            // Ended colspan
                            // Add cur to HTML with colspan.
                            html += this.getCellHTMLFromValue('th', 'highcharts-table-topheading', 'scope="col" ' +
                                'colspan="' + (curColspan + 1) + '"', cur);
                            curColspan = 0;
                        }
                        else {
                            // Cur is standalone. If it is same as sublevel,
                            // remove sublevel and add just toplevel.
                            if (cur === subheaders[i]) {
                                if (useRowspanHeaders) {
                                    rowspan = 2;
                                    delete subheaders[i];
                                }
                                else {
                                    rowspan = 1;
                                    subheaders[i] = '';
                                }
                            }
                            else {
                                rowspan = 1;
                            }
                            html += this.getCellHTMLFromValue('th', 'highcharts-table-topheading', 'scope="col"' +
                                (rowspan > 1 ?
                                    ' valign="top" rowspan="' + rowspan + '"' :
                                    ''), cur);
                        }
                    }
                    html += '</tr>';
                }
                // Add the subheaders (the only headers if not using multilevels)
                if (subheaders) {
                    html += '<tr>';
                    for (i = 0, len = subheaders.length; i < len; ++i) {
                        if (typeof subheaders[i] !== 'undefined') {
                            html += this.getCellHTMLFromValue('th', null, 'scope="col"', subheaders[i]);
                        }
                    }
                    html += '</tr>';
                }
                html += '</thead>';
                return html;
            }
            /**
             * Initiates the parsing of the HTML table
             *
             * @param {HTMLTableConverter.UserOptions}[options]
             * Options for the parser
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits CSVDataParser#parse
             * @emits CSVDataParser#afterParse
             * @emits HTMLTableParser#parseError
             */
            parse(options, eventDetail) {
                const converter = this, columns = [], headers = [], parseOptions = merge(converter.options, options), { endRow, startColumn, endColumn, firstRowAsNames } = parseOptions, tableHTML = parseOptions.tableElement || this.tableElement;
                if (!(tableHTML instanceof HTMLElement)) {
                    converter.emit({
                        type: 'parseError',
                        columns,
                        detail: eventDetail,
                        headers,
                        error: 'Not a valid HTML Table'
                    });
                    return;
                }
                converter.tableElement = tableHTML;
                converter.tableElementID = tableHTML.id;
                this.emit({
                    type: 'parse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.headers
                });
                const rows = tableHTML.getElementsByTagName('tr'), rowsCount = rows.length;
                let rowIndex = 0, item, { startRow } = parseOptions;
                // Insert headers from the first row
                if (firstRowAsNames && rowsCount) {
                    const items = rows[0].children, itemsLength = items.length;
                    for (let i = startColumn; i < itemsLength; i++) {
                        if (i > endColumn) {
                            break;
                        }
                        item = items[i];
                        if (item.tagName === 'TD' ||
                            item.tagName === 'TH') {
                            headers.push(item.innerHTML);
                        }
                    }
                    startRow++;
                }
                while (rowIndex < rowsCount) {
                    if (rowIndex >= startRow && rowIndex <= endRow) {
                        const columnsInRow = rows[rowIndex].children, columnsInRowLength = columnsInRow.length;
                        let columnIndex = 0;
                        while (columnIndex < columnsInRowLength) {
                            const relativeColumnIndex = columnIndex - startColumn, row = columns[relativeColumnIndex];
                            item = columnsInRow[columnIndex];
                            if ((item.tagName === 'TD' ||
                                item.tagName === 'TH') &&
                                (columnIndex >= startColumn &&
                                    columnIndex <= endColumn)) {
                                if (!columns[relativeColumnIndex]) {
                                    columns[relativeColumnIndex] = [];
                                }
                                let cellValue = converter.asGuessedType(item.innerHTML);
                                if (cellValue instanceof Date) {
                                    cellValue = cellValue.getTime();
                                }
                                columns[relativeColumnIndex][rowIndex - startRow] = cellValue;
                                // Loop over all previous indices and make sure
                                // they are nulls, not undefined.
                                let i = 1;
                                while (rowIndex - startRow >= i &&
                                    row[rowIndex - startRow - i] === void 0) {
                                    row[rowIndex - startRow - i] = null;
                                    i++;
                                }
                            }
                            columnIndex++;
                        }
                    }
                    rowIndex++;
                }
                this.columns = columns;
                this.headers = headers;
                this.emit({
                    type: 'afterParse',
                    columns,
                    detail: eventDetail,
                    headers
                });
            }
            /**
             * Handles converting the parsed data to a table.
             *
             * @return {DataTable}
             * Table from the parsed HTML table
             */
            getTable() {
                return DataConverter.getTableFromColumns(this.columns, this.headers);
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options
         */
        HTMLTableConverter.defaultOptions = {
            ...DataConverter.defaultOptions,
            useRowspanHeaders: true,
            useMultiLevelHeaders: true
        };
        /* *
         *
         *  Default Export
         *
         * */

        return HTMLTableConverter;
    });
    _registerModule(_modules, 'Data/Connectors/HTMLTableConnector.js', [_modules['Data/Connectors/DataConnector.js'], _modules['Core/Globals.js'], _modules['Data/Converters/HTMLTableConverter.js'], _modules['Core/Utilities.js']], function (DataConnector, H, HTMLTableConverter, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Gøran Slettemark
         *  - Wojciech Chmiel
         *  - Sophie Bremer
         *
         * */
        const { win } = H;
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Class that handles creating a data connector from an HTML table.
         *
         * @private
         */
        class HTMLTableConnector extends DataConnector {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of HTMLTableConnector.
             *
             * @param {HTMLTableConnector.UserOptions} [options]
             * Options for the connector and converter.
             */
            constructor(options) {
                const mergedOptions = merge(HTMLTableConnector.defaultOptions, options);
                super(mergedOptions);
                this.converter = new HTMLTableConverter(mergedOptions);
                this.options = mergedOptions;
            }
            /**
             * Initiates creating the dataconnector from the HTML table
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits HTMLTableConnector#load
             * @emits HTMLTableConnector#afterLoad
             * @emits HTMLTableConnector#loadError
             */
            load(eventDetail) {
                const connector = this, converter = connector.converter, table = connector.table, { dataModifier, table: tableHTML } = connector.options;
                connector.emit({
                    type: 'load',
                    detail: eventDetail,
                    table,
                    tableElement: connector.tableElement
                });
                let tableElement;
                if (typeof tableHTML === 'string') {
                    connector.tableID = tableHTML;
                    tableElement = win.document.getElementById(tableHTML);
                }
                else {
                    tableElement = tableHTML;
                    connector.tableID = tableElement.id;
                }
                connector.tableElement = tableElement || void 0;
                if (!connector.tableElement) {
                    const error = 'HTML table not provided, or element with ID not found';
                    connector.emit({
                        type: 'loadError',
                        detail: eventDetail,
                        error,
                        table
                    });
                    return Promise.reject(new Error(error));
                }
                converter.parse(merge({ tableElement: connector.tableElement }, connector.options), eventDetail);
                // If already loaded, clear the current rows
                table.deleteColumns();
                table.setColumns(converter.getTable().getColumns());
                return connector
                    .setModifierOptions(dataModifier)
                    .then(() => {
                    connector.emit({
                        type: 'afterLoad',
                        detail: eventDetail,
                        table,
                        tableElement: connector.tableElement
                    });
                    return connector;
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        HTMLTableConnector.defaultOptions = {
            table: ''
        };
        DataConnector.registerType('HTMLTable', HTMLTableConnector);
        /* *
         *
         *  Default Export
         *
         * */

        return HTMLTableConnector;
    });
    _registerModule(_modules, 'Data/Converters/JSONConverter.js', [_modules['Data/Converters/DataConverter.js'], _modules['Data/DataTable.js'], _modules['Core/Utilities.js']], function (DataConverter, DataTable, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Pawel Lysy
         *
         * */
        const { error, isArray, merge, objectEach } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Handles parsing and transforming JSON to a table.
         *
         * @private
         */
        class JSONConverter extends DataConverter {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the JSON parser.
             *
             * @param {JSONConverter.UserOptions} [options]
             * Options for the JSON parser.
             */
            constructor(options) {
                const mergedOptions = merge(JSONConverter.defaultOptions, options);
                super(mergedOptions);
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.columns = [];
                this.headers = [];
                this.options = mergedOptions;
                this.table = new DataTable();
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initiates parsing of JSON structure.
             *
             * @param {JSONConverter.UserOptions}[options]
             * Options for the parser
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits JSONConverter#parse
             * @emits JSONConverter#afterParse
             */
            parse(options, eventDetail) {
                const converter = this;
                options = merge(converter.options, options);
                const { beforeParse, orientation, firstRowAsNames, columnNames } = options;
                let data = options.data;
                if (!data) {
                    return;
                }
                converter.columns = [];
                converter.emit({
                    type: 'parse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.headers
                });
                if (beforeParse) {
                    data = beforeParse(data);
                }
                data = data.slice();
                if (orientation === 'columns') {
                    for (let i = 0, iEnd = data.length; i < iEnd; i++) {
                        const item = data[i];
                        if (!(item instanceof Array)) {
                            return;
                        }
                        if (converter.headers instanceof Array) {
                            if (firstRowAsNames) {
                                converter.headers.push(`${item.shift()}`);
                            }
                            else if (columnNames && columnNames instanceof Array) {
                                converter.headers.push(columnNames[i]);
                            }
                            converter.table.setColumn(converter.headers[i] || i.toString(), item);
                        }
                        else {
                            error('JSONConverter: Invalid `columnNames` option.', false);
                        }
                    }
                }
                else if (orientation === 'rows') {
                    if (firstRowAsNames) {
                        converter.headers = data.shift();
                    }
                    else if (columnNames) {
                        converter.headers = columnNames;
                    }
                    for (let rowIndex = 0, iEnd = data.length; rowIndex < iEnd; rowIndex++) {
                        let row = data[rowIndex];
                        if (isArray(row)) {
                            for (let columnIndex = 0, jEnd = row.length; columnIndex < jEnd; columnIndex++) {
                                if (converter.columns.length < columnIndex + 1) {
                                    converter.columns.push([]);
                                }
                                converter.columns[columnIndex].push(row[columnIndex]);
                                if (converter.headers instanceof Array) {
                                    this.table.setColumn(converter.headers[columnIndex] ||
                                        columnIndex.toString(), converter.columns[columnIndex]);
                                }
                                else {
                                    error('JSONConverter: Invalid `columnNames` option.', false);
                                }
                            }
                        }
                        else {
                            const columnNames = converter.headers;
                            if (columnNames && !(columnNames instanceof Array)) {
                                const newRow = {};
                                objectEach(columnNames, (arrayWithPath, name) => {
                                    newRow[name] = arrayWithPath.reduce((acc, key) => acc[key], row);
                                });
                                row = newRow;
                            }
                            this.table.setRows([row], rowIndex);
                        }
                    }
                }
                converter.emit({
                    type: 'afterParse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.headers
                });
            }
            /**
             * Handles converting the parsed data to a table.
             *
             * @return {DataTable}
             * Table from the parsed CSV.
             */
            getTable() {
                return this.table;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options
         */
        JSONConverter.defaultOptions = {
            ...DataConverter.defaultOptions,
            data: [],
            orientation: 'rows'
        };
        /* *
         *
         *  Default Export
         *
         * */

        return JSONConverter;
    });
    _registerModule(_modules, 'Data/Connectors/JSONConnector.js', [_modules['Data/Connectors/DataConnector.js'], _modules['Core/Utilities.js'], _modules['Data/Converters/JSONConverter.js']], function (DataConnector, U, JSONConverter) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Pawel Lysy
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Class that handles creating a DataConnector from JSON structure
         *
         * @private
         */
        class JSONConnector extends DataConnector {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of JSONConnector.
             *
             * @param {JSONConnector.UserOptions} [options]
             * Options for the connector and converter.
             */
            constructor(options) {
                const mergedOptions = merge(JSONConnector.defaultOptions, options);
                super(mergedOptions);
                this.converter = new JSONConverter(mergedOptions);
                this.options = mergedOptions;
                if (mergedOptions.enablePolling) {
                    this.startPolling(Math.max(mergedOptions.dataRefreshRate || 0, 1) * 1000);
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initiates the loading of the JSON source to the connector
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits JSONConnector#load
             * @emits JSONConnector#afterLoad
             */
            load(eventDetail) {
                const connector = this, converter = connector.converter, table = connector.table, { data, dataUrl, dataModifier } = connector.options;
                connector.emit({
                    type: 'load',
                    data,
                    detail: eventDetail,
                    table
                });
                return Promise
                    .resolve(dataUrl ?
                    fetch(dataUrl).then((json) => json.json()) :
                    data || [])
                    .then((data) => {
                    if (data) {
                        // If already loaded, clear the current rows
                        table.deleteColumns();
                        converter.parse({ data });
                        table.setColumns(converter.getTable().getColumns());
                    }
                    return connector.setModifierOptions(dataModifier).then(() => data);
                })
                    .then((data) => {
                    connector.emit({
                        type: 'afterLoad',
                        data,
                        detail: eventDetail,
                        table
                    });
                    return connector;
                })['catch']((error) => {
                    connector.emit({
                        type: 'loadError',
                        detail: eventDetail,
                        error,
                        table
                    });
                    throw error;
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        JSONConnector.defaultOptions = {
            data: [],
            enablePolling: false,
            dataRefreshRate: 0,
            firstRowAsNames: true,
            orientation: 'rows'
        };
        DataConnector.registerType('JSON', JSONConnector);
        /* *
         *
         *  Default Export
         *
         * */

        return JSONConnector;
    });
    _registerModule(_modules, 'Data/Modifiers/ChainModifier.js', [_modules['Data/Modifiers/DataModifier.js'], _modules['Core/Utilities.js']], function (DataModifier, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Modifies a table with the help of modifiers in an ordered chain.
         *
         * @private
         */
        class ChainModifier extends DataModifier {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the modifier chain.
             *
             * @param {Partial<ChainModifier.Options>} [options]
             * Options to configure the modifier chain.
             *
             * @param {...DataModifier} [chain]
             * Ordered chain of modifiers.
             */
            constructor(options, ...chain) {
                super();
                this.chain = chain;
                this.options = merge(ChainModifier.defaultOptions, options);
                const optionsChain = this.options.chain || [];
                for (let i = 0, iEnd = optionsChain.length, modifierOptions, ModifierClass; i < iEnd; ++i) {
                    modifierOptions = optionsChain[i];
                    if (!modifierOptions.type) {
                        continue;
                    }
                    ModifierClass = DataModifier.types[modifierOptions.type];
                    if (ModifierClass) {
                        chain.push(new ModifierClass(modifierOptions));
                    }
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Adds a configured modifier to the end of the modifier chain. Please note,
             * that the modifier can be added multiple times.
             *
             * @param {DataModifier} modifier
             * Configured modifier to add.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             */
            add(modifier, eventDetail) {
                this.emit({
                    type: 'addModifier',
                    detail: eventDetail,
                    modifier
                });
                this.chain.push(modifier);
                this.emit({
                    type: 'addModifier',
                    detail: eventDetail,
                    modifier
                });
            }
            /**
             * Clears all modifiers from the chain.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             */
            clear(eventDetail) {
                this.emit({
                    type: 'clearChain',
                    detail: eventDetail
                });
                this.chain.length = 0;
                this.emit({
                    type: 'afterClearChain',
                    detail: eventDetail
                });
            }
            /**
             * Applies several modifications to the table and returns a modified copy of
             * the given table.
             *
             * @param {Highcharts.DataTable} table
             * Table to modify.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Promise<Highcharts.DataTable>}
             * Table with `modified` property as a reference.
             */
            modify(table, eventDetail) {
                const modifiers = (this.options.reverse ?
                    this.chain.slice().reverse() :
                    this.chain.slice());
                if (table.modified === table) {
                    table.modified = table.clone(false, eventDetail);
                }
                let promiseChain = Promise.resolve(table);
                for (let i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                    const modifier = modifiers[i];
                    promiseChain = promiseChain.then((chainTable) => modifier.modify(chainTable.modified, eventDetail));
                }
                promiseChain = promiseChain.then((chainTable) => {
                    table.modified.deleteColumns();
                    table.modified.setColumns(chainTable.modified.getColumns());
                    return table;
                });
                promiseChain = promiseChain['catch']((error) => {
                    this.emit({
                        type: 'error',
                        detail: eventDetail,
                        table
                    });
                    throw error;
                });
                return promiseChain;
            }
            /**
             * Applies partial modifications of a cell change to the property `modified`
             * of the given modified table.
             *
             * *Note:* The `modified` property of the table gets replaced.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {string} columnName
             * Column name of changed cell.
             *
             * @param {number|undefined} rowIndex
             * Row index of changed cell.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Changed cell value.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyCell(table, columnName, rowIndex, cellValue, eventDetail) {
                const modifiers = (this.options.reverse ?
                    this.chain.reverse() :
                    this.chain);
                if (modifiers.length) {
                    let clone = table.clone();
                    for (let i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                        modifiers[i].modifyCell(clone, columnName, rowIndex, cellValue, eventDetail);
                        clone = clone.modified;
                    }
                    table.modified = clone;
                }
                return table;
            }
            /**
             * Applies partial modifications of column changes to the property
             * `modified` of the given table.
             *
             * *Note:* The `modified` property of the table gets replaced.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Highcharts.DataTableColumnCollection} columns
             * Changed columns as a collection, where the keys are the column names.
             *
             * @param {number} [rowIndex=0]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyColumns(table, columns, rowIndex, eventDetail) {
                const modifiers = (this.options.reverse ?
                    this.chain.reverse() :
                    this.chain.slice());
                if (modifiers.length) {
                    let clone = table.clone();
                    for (let i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                        modifiers[i].modifyColumns(clone, columns, rowIndex, eventDetail);
                        clone = clone.modified;
                    }
                    table.modified = clone;
                }
                return table;
            }
            /**
             * Applies partial modifications of row changes to the property `modified`
             * of the given table.
             *
             * *Note:* The `modified` property of the table gets replaced.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
             * Changed rows.
             *
             * @param {number} [rowIndex]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyRows(table, rows, rowIndex, eventDetail) {
                const modifiers = (this.options.reverse ?
                    this.chain.reverse() :
                    this.chain.slice());
                if (modifiers.length) {
                    let clone = table.clone();
                    for (let i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                        modifiers[i].modifyRows(clone, rows, rowIndex, eventDetail);
                        clone = clone.modified;
                    }
                    table.modified = clone;
                }
                return table;
            }
            /**
             * Applies several modifications to the table.
             *
             * *Note:* The `modified` property of the table gets replaced.
             *
             * @param {DataTable} table
             * Table to modify.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {DataTable}
             * Table as a reference.
             *
             * @emits ChainDataModifier#execute
             * @emits ChainDataModifier#afterExecute
             */
            modifyTable(table, eventDetail) {
                const chain = this;
                chain.emit({
                    type: 'modify',
                    detail: eventDetail,
                    table
                });
                const modifiers = (chain.options.reverse ?
                    chain.chain.reverse() :
                    chain.chain.slice());
                let modified = table.modified;
                for (let i = 0, iEnd = modifiers.length, modifier; i < iEnd; ++i) {
                    modifier = modifiers[i];
                    modified = modifier.modifyTable(modified, eventDetail).modified;
                }
                table.modified = modified;
                chain.emit({
                    type: 'afterModify',
                    detail: eventDetail,
                    table
                });
                return table;
            }
            /**
             * Removes a configured modifier from all positions in the modifier chain.
             *
             * @param {DataModifier} modifier
             * Configured modifier to remove.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             */
            remove(modifier, eventDetail) {
                const modifiers = this.chain;
                this.emit({
                    type: 'removeModifier',
                    detail: eventDetail,
                    modifier
                });
                modifiers.splice(modifiers.indexOf(modifier), 1);
                this.emit({
                    type: 'afterRemoveModifier',
                    detail: eventDetail,
                    modifier
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default option for the ordered modifier chain.
         */
        ChainModifier.defaultOptions = {
            type: 'Chain'
        };
        DataModifier.registerType('Chain', ChainModifier);
        /* *
         *
         *  Default Export
         *
         * */

        return ChainModifier;
    });
    _registerModule(_modules, 'Data/Modifiers/InvertModifier.js', [_modules['Data/Modifiers/DataModifier.js'], _modules['Core/Utilities.js']], function (DataModifier, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Wojciech Chmiel
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Inverts columns and rows in a table.
         *
         * @private
         */
        class InvertModifier extends DataModifier {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the invert modifier.
             *
             * @param {Partial<InvertModifier.Options>} [options]
             * Options to configure the invert modifier.
             */
            constructor(options) {
                super();
                this.options = merge(InvertModifier.defaultOptions, options);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Applies partial modifications of a cell change to the property `modified`
             * of the given modified table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {string} columnName
             * Column name of changed cell.
             *
             * @param {number|undefined} rowIndex
             * Row index of changed cell.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Changed cell value.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyCell(table, columnName, rowIndex, cellValue, eventDetail) {
                const modified = table.modified, modifiedRowIndex = modified.getRowIndexBy('columnNames', columnName);
                if (typeof modifiedRowIndex === 'undefined') {
                    modified.setColumns(this.modifyTable(table.clone()).getColumns(), void 0, eventDetail);
                }
                else {
                    modified.setCell(`${rowIndex}`, modifiedRowIndex, cellValue, eventDetail);
                }
                return table;
            }
            /**
             * Applies partial modifications of column changes to the property
             * `modified` of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Highcharts.DataTableColumnCollection} columns
             * Changed columns as a collection, where the keys are the column names.
             *
             * @param {number} [rowIndex=0]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyColumns(table, columns, rowIndex, eventDetail) {
                const modified = table.modified, modifiedColumnNames = (modified.getColumn('columnNames') || []);
                let columnNames = table.getColumnNames(), reset = (table.getRowCount() !== modifiedColumnNames.length);
                if (!reset) {
                    for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                        if (columnNames[i] !== modifiedColumnNames[i]) {
                            reset = true;
                            break;
                        }
                    }
                }
                if (reset) {
                    return this.modifyTable(table, eventDetail);
                }
                columnNames = Object.keys(columns);
                for (let i = 0, iEnd = columnNames.length, column, columnName, modifiedRowIndex; i < iEnd; ++i) {
                    columnName = columnNames[i];
                    column = columns[columnName];
                    modifiedRowIndex = (modified.getRowIndexBy('columnNames', columnName) ||
                        modified.getRowCount());
                    for (let j = 0, j2 = rowIndex, jEnd = column.length; j < jEnd; ++j, ++j2) {
                        modified.setCell(`${j2}`, modifiedRowIndex, column[j], eventDetail);
                    }
                }
                return table;
            }
            /**
             * Applies partial modifications of row changes to the property `modified`
             * of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
             * Changed rows.
             *
             * @param {number} [rowIndex]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyRows(table, rows, rowIndex, eventDetail) {
                const columnNames = table.getColumnNames(), modified = table.modified, modifiedColumnNames = (modified.getColumn('columnNames') || []);
                let reset = (table.getRowCount() !== modifiedColumnNames.length);
                if (!reset) {
                    for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                        if (columnNames[i] !== modifiedColumnNames[i]) {
                            reset = true;
                            break;
                        }
                    }
                }
                if (reset) {
                    return this.modifyTable(table, eventDetail);
                }
                for (let i = 0, i2 = rowIndex, iEnd = rows.length, row; i < iEnd; ++i, ++i2) {
                    row = rows[i];
                    if (row instanceof Array) {
                        modified.setColumn(`${i2}`, row);
                    }
                    else {
                        for (let j = 0, jEnd = columnNames.length; j < jEnd; ++j) {
                            modified.setCell(`${i2}`, j, row[columnNames[j]], eventDetail);
                        }
                    }
                }
                return table;
            }
            /**
             * Inverts rows and columns in the table.
             *
             * @param {DataTable} table
             * Table to invert.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {DataTable}
             * Table with inverted `modified` property as a reference.
             */
            modifyTable(table, eventDetail) {
                const modifier = this;
                modifier.emit({ type: 'modify', detail: eventDetail, table });
                const modified = table.modified;
                if (table.hasColumns(['columnNames'])) { // Inverted table
                    const columnNames = ((table.deleteColumns(['columnNames']) || {})
                        .columnNames || []).map((column) => `${column}`), columns = {};
                    for (let i = 0, iEnd = table.getRowCount(), row; i < iEnd; ++i) {
                        row = table.getRow(i);
                        if (row) {
                            columns[columnNames[i]] = row;
                        }
                    }
                    modified.deleteColumns();
                    modified.setColumns(columns);
                }
                else { // Regular table
                    const columns = {};
                    for (let i = 0, iEnd = table.getRowCount(), row; i < iEnd; ++i) {
                        row = table.getRow(i);
                        if (row) {
                            columns[`${i}`] = row;
                        }
                    }
                    columns.columnNames = table.getColumnNames();
                    modified.deleteColumns();
                    modified.setColumns(columns);
                }
                modifier.emit({ type: 'afterModify', detail: eventDetail, table });
                return table;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options for the invert modifier.
         */
        InvertModifier.defaultOptions = {
            type: 'Invert'
        };
        DataModifier.registerType('Invert', InvertModifier);
        /* *
         *
         *  Default Export
         *
         * */

        return InvertModifier;
    });
    _registerModule(_modules, 'Data/Modifiers/RangeModifier.js', [_modules['Data/Modifiers/DataModifier.js'], _modules['Core/Utilities.js']], function (DataModifier, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Filters out table rows with a specific value range.
         *
         * @private
         */
        class RangeModifier extends DataModifier {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the range modifier.
             *
             * @param {Partial<RangeModifier.Options>} [options]
             * Options to configure the range modifier.
             */
            constructor(options) {
                super();
                this.options = merge(RangeModifier.defaultOptions, options);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Replaces table rows with filtered rows.
             *
             * @param {DataTable} table
             * Table to modify.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {DataTable}
             * Table with `modified` property as a reference.
             */
            modifyTable(table, eventDetail) {
                const modifier = this;
                modifier.emit({ type: 'modify', detail: eventDetail, table });
                const { additive, ranges, strict } = modifier.options;
                if (ranges.length) {
                    const modified = table.modified;
                    let columns = table.getColumns(), rows = [];
                    for (let i = 0, iEnd = ranges.length, range, rangeColumn; i < iEnd; ++i) {
                        range = ranges[i];
                        if (strict &&
                            typeof range.minValue !== typeof range.maxValue) {
                            continue;
                        }
                        if (i > 0 && !additive) {
                            modified.deleteRows();
                            modified.setRows(rows);
                            columns = modified.getColumns();
                            rows = [];
                        }
                        rangeColumn = (columns[range.column] || []);
                        for (let j = 0, jEnd = rangeColumn.length, cell, row; j < jEnd; ++j) {
                            cell = rangeColumn[j];
                            switch (typeof cell) {
                                default:
                                    continue;
                                case 'boolean':
                                case 'number':
                                case 'string':
                                    break;
                            }
                            if (strict &&
                                typeof cell !== typeof range.minValue) {
                                continue;
                            }
                            if (cell >= range.minValue &&
                                cell <= range.maxValue) {
                                row = (additive ?
                                    table.getRow(j) :
                                    modified.getRow(j));
                                if (row) {
                                    rows.push(row);
                                }
                            }
                        }
                    }
                    modified.deleteRows();
                    modified.setRows(rows);
                }
                modifier.emit({ type: 'afterModify', detail: eventDetail, table });
                return table;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options for the range modifier.
         */
        RangeModifier.defaultOptions = {
            type: 'Range',
            ranges: []
        };
        DataModifier.registerType('Range', RangeModifier);
        /* *
         *
         *  Default Export
         *
         * */

        return RangeModifier;
    });
    _registerModule(_modules, 'Data/Modifiers/SortModifier.js', [_modules['Data/Modifiers/DataModifier.js'], _modules['Data/DataTable.js'], _modules['Core/Utilities.js']], function (DataModifier, DataTable, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Sort table rows according to values of a column.
         *
         * @private
         */
        class SortModifier extends DataModifier {
            /* *
             *
             *  Static Functions
             *
             * */
            static ascending(a, b) {
                return ((a || 0) < (b || 0) ? -1 :
                    (a || 0) > (b || 0) ? 1 :
                        0);
            }
            static descending(a, b) {
                return ((b || 0) < (a || 0) ? -1 :
                    (b || 0) > (a || 0) ? 1 :
                        0);
            }
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the range modifier.
             *
             * @param {Partial<RangeDataModifier.Options>} [options]
             * Options to configure the range modifier.
             */
            constructor(options) {
                super();
                this.options = merge(SortModifier.defaultOptions, options);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Returns index and row for sort reference.
             *
             * @private
             *
             * @param {Highcharts.DataTable} table
             * Table with rows to reference.
             *
             * @return {Array<SortModifier.RowReference>}
             * Array of row references.
             */
            getRowReferences(table) {
                const rows = table.getRows(), rowReferences = [];
                for (let i = 0, iEnd = rows.length; i < iEnd; ++i) {
                    rowReferences.push({
                        index: i,
                        row: rows[i]
                    });
                }
                return rowReferences;
            }
            /**
             * Applies partial modifications of a cell change to the property `modified`
             * of the given modified table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {string} columnName
             * Column name of changed cell.
             *
             * @param {number|undefined} rowIndex
             * Row index of changed cell.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Changed cell value.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyCell(table, columnName, rowIndex, cellValue, eventDetail) {
                const modifier = this, { orderByColumn, orderInColumn } = modifier.options;
                if (columnName === orderByColumn) {
                    if (orderInColumn) {
                        table.modified.setCell(columnName, rowIndex, cellValue);
                        table.modified.setColumn(orderInColumn, modifier
                            .modifyTable(new DataTable({
                            columns: table
                                .getColumns([orderByColumn, orderInColumn])
                        }))
                            .modified
                            .getColumn(orderInColumn));
                    }
                    else {
                        modifier.modifyTable(table, eventDetail);
                    }
                }
                return table;
            }
            /**
             * Applies partial modifications of column changes to the property
             * `modified` of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Highcharts.DataTableColumnCollection} columns
             * Changed columns as a collection, where the keys are the column names.
             *
             * @param {number} [rowIndex=0]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyColumns(table, columns, rowIndex, eventDetail) {
                const modifier = this, { orderByColumn, orderInColumn } = modifier.options, columnNames = Object.keys(columns);
                if (columnNames.indexOf(orderByColumn) > -1) {
                    if (orderInColumn &&
                        columns[columnNames[0]].length) {
                        table.modified.setColumns(columns, rowIndex);
                        table.modified.setColumn(orderInColumn, modifier
                            .modifyTable(new DataTable({
                            columns: table
                                .getColumns([orderByColumn, orderInColumn])
                        }))
                            .modified
                            .getColumn(orderInColumn));
                    }
                    else {
                        modifier.modifyTable(table, eventDetail);
                    }
                }
                return table;
            }
            /**
             * Applies partial modifications of row changes to the property `modified`
             * of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
             * Changed rows.
             *
             * @param {number} [rowIndex]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyRows(table, rows, rowIndex, eventDetail) {
                const modifier = this, { orderByColumn, orderInColumn } = modifier.options;
                if (orderInColumn &&
                    rows.length) {
                    table.modified.setRows(rows, rowIndex);
                    table.modified.setColumn(orderInColumn, modifier
                        .modifyTable(new DataTable({
                        columns: table
                            .getColumns([orderByColumn, orderInColumn])
                    }))
                        .modified
                        .getColumn(orderInColumn));
                }
                else {
                    modifier.modifyTable(table, eventDetail);
                }
                return table;
            }
            /**
             * Sorts rows in the table.
             *
             * @param {DataTable} table
             * Table to sort in.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {DataTable}
             * Table with `modified` property as a reference.
             */
            modifyTable(table, eventDetail) {
                const modifier = this;
                modifier.emit({ type: 'modify', detail: eventDetail, table });
                const columnNames = table.getColumnNames(), rowCount = table.getRowCount(), rowReferences = this.getRowReferences(table), { direction, orderByColumn, orderInColumn } = modifier.options, compare = (direction === 'asc' ?
                    SortModifier.ascending :
                    SortModifier.descending), orderByColumnIndex = columnNames.indexOf(orderByColumn), modified = table.modified;
                if (orderByColumnIndex !== -1) {
                    rowReferences.sort((a, b) => compare(a.row[orderByColumnIndex], b.row[orderByColumnIndex]));
                }
                if (orderInColumn) {
                    const column = [];
                    for (let i = 0; i < rowCount; ++i) {
                        column[rowReferences[i].index] = i;
                    }
                    modified.setColumns({ [orderInColumn]: column });
                }
                else {
                    const rows = [];
                    for (let i = 0; i < rowCount; ++i) {
                        rows.push(rowReferences[i].row);
                    }
                    modified.setRows(rows, 0);
                }
                modifier.emit({ type: 'afterModify', detail: eventDetail, table });
                return table;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options to group table rows.
         */
        SortModifier.defaultOptions = {
            type: 'Sort',
            direction: 'desc',
            orderByColumn: 'y'
        };
        DataModifier.registerType('Sort', SortModifier);
        /* *
         *
         *  Default Export
         *
         * */

        return SortModifier;
    });
    _registerModule(_modules, 'masters/datagrid.src.js', [_modules['Data/Connectors/DataConnector.js'], _modules['Data/DataCursor.js'], _modules['DataGrid/DataGrid.js'], _modules['Data/Modifiers/DataModifier.js'], _modules['Data/DataPool.js'], _modules['Data/DataTable.js'], _modules['DataGrid/Globals.js']], function (DataConnector, DataCursor, _DataGrid, DataModifier, DataPool, DataTable, Globals) {

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
        const G = Globals;
        G.DataConnector = DataConnector;
        G.DataCursor = DataCursor;
        G.DataGrid = _DataGrid;
        G.DataModifier = DataModifier;
        G.DataPool = DataPool;
        G.DataTable = DataTable;
        /* *
         *
         *  Classic Export
         *
         * */
        if (!G.win.DataGrid) {
            G.win.DataGrid = G;
        }
        /* *
         *
         *  Default Export
         *
         * */

        return G;
    });
    _modules['masters/datagrid.src.js']._modules = _modules;
    return _modules['masters/datagrid.src.js'];
}));