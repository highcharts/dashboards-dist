/* *
 *
 *  Grid utilities
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *
 * */
import AST from '../../Core/Renderer/HTML/AST.js';
AST.allowedAttributes.push('srcset', 'media');
AST.allowedTags.push('picture', 'source');
/* *
 *
 *  Namespace
 *
 * */
var GridUtils;
(function (GridUtils) {
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
    GridUtils.makeHTMLElement = makeHTMLElement;
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
    GridUtils.makeDiv = makeDiv;
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
    GridUtils.isHTML = isHTML;
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
    GridUtils.sanitizeText = sanitizeText;
    /**
     * Sets an element's content, checking whether it is HTML or plain text.
     * Should be used instead of element.innerText when the content can be HTML.
     *
     * @param element
     * Parent element where the content should be.
     *
     * @param content
     * Content to render.
     */
    function setHTMLContent(element, content) {
        if (isHTML(content)) {
            element.innerHTML = AST.emptyHTML;
            const formattedNodes = new AST(content);
            formattedNodes.addToDOM(element);
        }
        else {
            element.innerText = content;
        }
    }
    GridUtils.setHTMLContent = setHTMLContent;
})(GridUtils || (GridUtils = {}));
/* *
 *
 *  Default Export
 *
 * */
export default GridUtils;
