/* *
 *
 *  (c) 2009 - 2023 Highsoft AS
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AST from '../../Core/Renderer/HTML/AST.js';
import Component from './Component.js';
import U from '../../Core/Utilities.js';
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
    'for', 'value', 'checked', 'src', 'name', 'selected'
];
AST.allowedReferences = [...AST.allowedReferences, 'data:image/'];
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
        // const connector = (
        //     json.connector ? DataJSON.fromJSON(json.connector) : void 0
        // );
        const component = new HTMLComponent(cell, merge(options, {
            elements
            // connector: (
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
     * @param options
     * The options for the component.
     */
    constructor(cell, options) {
        options = merge(HTMLComponent.defaultOptions, options);
        super(cell, options);
        this.options = options;
        this.type = 'HTML';
        this.elements = [];
        this.scaleElements = !!this.options.scaleElements;
        this.sync = new Component.Sync(this, this.syncHandlers);
        this.on('tableChanged', (e) => {
            if ('detail' in e && e.detail && e.detail.sender !== this.id) {
                this.redraw();
            }
        });
        Component.addInstance(this);
    }
    /* *
     *
     *  Functions
     *
     * */
    /** @internal */
    load() {
        this.emit({
            type: 'load'
        });
        super.load();
        const options = this.options;
        let isError = false;
        if (options.elements) {
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
        this.constructTree();
        this.parentElement.appendChild(this.element);
        if (this.scaleElements) {
            this.autoScale();
        }
        this.emit({ type: 'afterLoad' });
        if (isError) {
            throw new Error('Missing tagName param in component: ' +
                options.cell);
        }
        return this;
    }
    /**
     * Handle scaling inner elements.
     *
     * @internal
     */
    autoScale() {
        this.element.style.display = 'flex';
        this.element.style.flexDirection = 'column';
        this.contentElement.childNodes.forEach((element) => {
            if (element && element instanceof HTMLElement) {
                element.style.width = 'auto';
                element.style.maxWidth = '100%';
                element.style.maxHeight = '100%';
                element.style.flexBasis = 'auto';
                element.style.overflow = 'auto';
            }
        });
        if (this.options.scaleElements) {
            this.scaleText();
        }
    }
    /**
     * Basic font size scaling
     *
     * @internal
     */
    scaleText() {
        this.contentElement.childNodes.forEach((element) => {
            if (element instanceof HTMLElement) {
                element.style.fontSize = Math.max(Math.min(element.clientWidth / (1 * 10), 200), 20) + 'px';
            }
        });
    }
    render() {
        this.emit({ type: 'beforeRender' });
        super.render(); // Fires the render event and calls load
        this.emit({ type: 'afterRender' });
        return this;
    }
    redraw() {
        super.redraw();
        this.constructTree();
        this.emit({ type: 'afterRedraw' });
        return this;
    }
    resize(width, height) {
        if (this.scaleElements) {
            this.scaleText();
        }
        super.resize(width, height);
        return this;
    }
    /**
     * Handles updating via options.
     * @param options
     * The options to apply.
     *
     * @returns
     * The component for chaining.
     */
    update(options) {
        const _super = Object.create(null, {
            update: { get: () => super.update }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.update.call(this, options);
            this.emit({ type: 'afterUpdate' });
        });
    }
    /**
     * Could probably use the serialize function moved on
     * the exportdata branch
     *
     * @internal
     */
    constructTree() {
        // Remove old tree if redrawing
        while (this.contentElement.firstChild) {
            this.contentElement.firstChild.remove();
        }
        const parser = new AST(this.elements);
        parser.addToDOM(this.contentElement);
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
        return Object.assign(Object.assign({}, diffObjects(this.options, HTMLComponent.defaultOptions)), { type: 'HTML' });
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
HTMLComponent.defaultOptions = merge(Component.defaultOptions, {
    type: 'HTML',
    scaleElements: false,
    elements: [],
    editableOptions: (Component.defaultOptions.editableOptions || []).concat([{
            name: 'scaleElements',
            type: 'toggle'
        }])
});
/* *
 *
 *  Default export
 *
 * */
export default HTMLComponent;
