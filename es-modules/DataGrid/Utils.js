/* *
 *
 *  DataGrid utilities
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *
 * */
/* *
 *
 *  Namespace
 *
 * */
var DataGridUtils;
(function (DataGridUtils) {
    /* *
    *
    *  Functions
    *
    * */
    /* *
    *
    *  Functions
    *
    * */
    /**
     * Creates a HTML element with the provided options.
     *
     * @param tagName
     * The tag name of the element.
     *
     * @param params
     * The parameters of the element.
     *
     * @param parent
     * The parent element.
     */
    function makeHTMLElement(tagName, params, parent) {
        const element = document.createElement(tagName);
        if (params) {
            const paramsKeys = Object.keys(params);
            for (let i = 0; i < paramsKeys.length; i++) {
                const key = paramsKeys[i];
                const value = params[key];
                if (value !== void 0) {
                    if (key === 'style') {
                        Object.assign(element.style, value);
                    }
                    else {
                        element[key] = value;
                    }
                }
            }
        }
        if (parent) {
            parent.appendChild(element);
        }
        return element;
    }
    DataGridUtils.makeHTMLElement = makeHTMLElement;
    /**
     * Creates a div element with the provided class name and id.
     *
     * @param className
     * The class name of the div.
     *
     * @param id
     * The id of the element.
     */
    function makeDiv(className, id) {
        return makeHTMLElement('div', { className, id });
    }
    DataGridUtils.makeDiv = makeDiv;
    /**
     * Gets the translateY value of an element.
     *
     * @param element
     * The element to get the translateY value from.
     *
     * @returns The translateY value of the element.
     */
    function getTranslateY(element) {
        const transform = element.style.transform;
        if (transform) {
            const match = transform.match(/translateY\(([^)]+)\)/);
            if (match) {
                return parseFloat(match[1]);
            }
        }
        return 0;
    }
    DataGridUtils.getTranslateY = getTranslateY;
    /**
     * Check if there's a possibility that the given string is an HTML
     * (contains '<').
     *
     * @param str
     * Text to verify.
     */
    function isHTML(str) {
        return str.indexOf('<') !== -1;
    }
    DataGridUtils.isHTML = isHTML;
    /**
     * Returns a string containing plain text format by removing HTML tags
     *
     * @param text
     * String to be sanitized
     *
     * @returns
     * Sanitized plain text string
    */
    function sanitizeText(text) {
        try {
            return new DOMParser().parseFromString(text, 'text/html')
                .body.textContent || '';
        }
        catch (error) {
            return '';
        }
    }
    DataGridUtils.sanitizeText = sanitizeText;
})(DataGridUtils || (DataGridUtils = {}));
/* *
 *
 *  Default Export
 *
 * */
export default DataGridUtils;
