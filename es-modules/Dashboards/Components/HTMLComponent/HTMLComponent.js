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
 *
 * */
'use strict';
import AST from '../../../Core/Renderer/HTML/AST.js';
import Component from '../Component.js';
import HTMLComponentDefaults from './HTMLComponentDefaults.js';
import HTMLSyncs from './HTMLSyncs/HTMLSyncs.js';
import U from '../../../Core/Utilities.js';
const { merge, diffObjects } = U;
// TODO: This may affect the AST parsing in Highcharts
// should look into adding these as options if possible
// Needs to go in a composition in the Highcharts plugin
AST.allowedTags = [
    ...AST.allowedTags,
    'option',
    'select',
    'label',
    'input',
    'textarea'
];
AST.allowedAttributes = [
    ...AST.allowedAttributes,
    'for',
    'value',
    'checked',
    'src',
    'name',
    'selected'
];
AST.allowedReferences = [
    ...AST.allowedReferences,
    'data:image/'
];
/* *
 *
 *  Class
 *
 * */
/**
 *
 * Class that represents a HTML component.
 *
 */
class HTMLComponent extends Component {
    /* *
     *
     *  Static functions
     *
     * */
    /**
     * Creates component from JSON.
     *
     * @param json
     * Set of component options, used for creating the HTML component.
     *
     * @param cell
     * Instance of cell, where component is attached.
     *
     * @returns
     * HTML component based on config from JSON.
     *
     * @internal
     */
    static fromJSON(json, cell) {
        const options = json.options;
        const elements = (json.elements ?
            json.elements.map((el) => JSON.parse(el)) :
            []);
        /// const connector = (
        //     json.connector ? DataJSON.fromJSON(json.connector) : void 0
        // );
        const component = new HTMLComponent(cell, merge(options, {
            elements
            /// connector: (
            //   connector instanceof DataConnector ? connector : void 0
            // )
        }));
        component.emit({
            type: 'fromJSON',
            json
        });
        return component;
    }
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Creates a HTML component in the cell.
     *
     * @param cell
     * Instance of cell, where component is attached.
     *
     * @param options
     * The options for the component.
     */
    constructor(cell, options) {
        if (options.className) {
            options.className = `${HTMLComponent.defaultOptions.className} ${options.className}`;
        }
        options = merge(HTMLComponent.defaultOptions, options);
        super(cell, options);
        this.options = options;
        this.type = 'HTML';
        this.elements = [];
    }
    /* *
     *
     *  Functions
     *
     * */
    /** @internal */
    async load() {
        this.emit({
            type: 'load'
        });
        await super.load();
        const options = this.options;
        let isError = false;
        if (options.elements?.length) {
            this.elements = options.elements.map(function (element) {
                if (typeof element === 'string') {
                    return new AST(element).nodes[0];
                }
                if (!element.textContent &&
                    !element.tagName &&
                    element.attributes) {
                    isError = true;
                }
                return element;
            });
        }
        else if (options.html) {
            this.elements = this.getElementsFromString(options.html);
            this.options.elements = this.elements;
        }
        this.constructTree();
        this.emit({ type: 'afterLoad' });
        if (isError) {
            throw new Error(`Missing tagName param in component: ${options.renderTo}`);
        }
        return this;
    }
    render() {
        super.render();
        this.constructTree();
        this.sync.start();
        this.emit({ type: 'afterRender' });
        return this;
    }
    resize(width, height) {
        super.resize(width, height);
        return this;
    }
    /**
     * Handles updating via options.
     *
     * @param options
     * The options to apply.
     */
    async update(options, shouldRerender = true) {
        if (options.html) {
            this.elements = this.getElementsFromString(options.html);
            this.options.elements = this.elements;
            this.constructTree();
        }
        await super.update(options, shouldRerender);
        this.emit({ type: 'afterUpdate' });
    }
    getOptionsOnDrop() {
        return {
            cell: '',
            type: 'HTML',
            elements: [{
                    tagName: 'span',
                    textContent: '[Your custom HTML here- edit the component]'
                }]
        };
    }
    /**
     * @internal
     */
    constructTree() {
        // Remove old tree if rerendering.
        while (this.contentElement.firstChild) {
            this.contentElement.firstChild.remove();
        }
        const parser = new AST(this.options.elements || []);
        parser.addToDOM(this.contentElement);
    }
    /**
     * When HTML definition is a string, it needs to be parsed to AST.
     *
     * @internal
     */
    getElementsFromString(htmlString) {
        return new AST(htmlString).nodes;
    }
    /**
     * Converts the class instance to a class JSON.
     *
     * @returns
     * Class JSON of this Component instance.
     *
     * @internal
     */
    toJSON() {
        const elements = (this.options.elements || [])
            .map((el) => JSON.stringify(el));
        const json = merge(super.toJSON(), {
            elements,
            options: this.options
        });
        this.emit({
            type: 'toJSON',
            json
        });
        return json;
    }
    /**
     * Get the HTML component's options.
     * @returns
     * The JSON of HTML component's options.
     *
     * @internal
     *
     */
    getOptions() {
        return {
            ...diffObjects(this.options, HTMLComponent.defaultOptions),
            type: 'HTML'
        };
    }
    /**
     * Retrieves editable options for the HTML component.
     */
    getEditableOptions() {
        const component = this;
        // When adding a new component, the elements are not yet set.
        if (this.elements.length) {
            return merge(component.options, {
                elements: this.elements
            });
        }
        return component.options;
    }
    /**
     * Get the value of the editable option by property path. Parse the elements
     * if the HTML options is not set.
     *
     * @param propertyPath
     * The property path of the option.
     */
    getEditableOptionValue(propertyPath) {
        if (!propertyPath) {
            return;
        }
        if (propertyPath[0] === 'html') {
            const result = this.getEditableOptions();
            if (!result.html && result.elements) {
                return this.getStringFromElements(result.elements);
            }
            return result[propertyPath[0]];
        }
        return super.getEditableOptionValue(propertyPath);
    }
    /**
     * Returns the HTML string from the given elements.
     *
     * @param elements
     * The array of elements to serialize.
     */
    getStringFromElements(elements) {
        let html = '';
        for (const element of elements) {
            html += this.serializeNode(element);
        }
        return html;
    }
    /**
     * Serializes the HTML node to string.
     *
     * @param node
     * The HTML node to serialize.
     */
    serializeNode(node) {
        if (!node.tagName || node.tagName === '#text') {
            // Text node
            return node.textContent || '';
        }
        const attributes = node.attributes;
        let html = `<${node.tagName}`;
        if (attributes) {
            for (const key in attributes) {
                if (Object.prototype.hasOwnProperty.call(attributes, key)) {
                    const value = attributes[key];
                    if (value !== void 0) {
                        html += ` ${key}="${value}"`;
                    }
                }
            }
        }
        html += '>';
        html += node.textContent || '';
        (node.children || []).forEach((child) => {
            html += this.serializeNode(child);
        });
        html += `</${node.tagName}>`;
        return html;
    }
    /**
     * @internal
     */
    onTableChanged(e) {
        if (e.detail?.sender !== this.id) {
            this.render();
        }
    }
}
/* *
 *
 *  Static properties
 *
 * */
/**
 * Default options of the HTML component.
 */
HTMLComponent.defaultOptions = merge(Component.defaultOptions, HTMLComponentDefaults);
/**
 * Predefined sync config for HTML component.
 */
HTMLComponent.predefinedSyncConfig = HTMLSyncs;
/* *
 *
 *  Default export
 *
 * */
export default HTMLComponent;
