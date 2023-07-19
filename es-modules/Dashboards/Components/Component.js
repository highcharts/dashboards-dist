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
import CallbackRegistry from '../CallbackRegistry.js';
import DG from '../Globals.js';
const { classNamePrefix } = DG;
import EditableOptions from './EditableOptions.js';
import U from '../../Core/Utilities.js';
const { createElement, isArray, merge, fireEvent, addEvent, objectEach, isFunction, getStyle, relativeLength, diffObjects } = U;
import CU from './ComponentUtilities.js';
const { getMargins, getPaddings } = CU;
import ComponentGroup from './ComponentGroup.js';
import DU from '../Utilities.js';
const { uniqueKey } = DU;
import Sync from './Sync/Sync.js';
/* *
 *
 *  Class
 *
 * */
/**
 *
 * Abstract Class of component.
 *
 * @internal
 *
 */
/**
 * Abstract Class of component.
 * @internal
 */
class Component {
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     *
     * Creates HTML text element like header or title
     *
     * @param tagName
     * HTML tag name used as wrapper of text like `h1`, `h2` or `p`.
     * @param elementName
     * Name of element
     * @param textOptions
     * The options for the component
     * @returns
     * HTML object when title is created, otherwise undefined
     *
     * @internal
     */
    static createTextElement(tagName, elementName, textOptions) {
        if (typeof textOptions === 'object') {
            const { className, text, style } = textOptions;
            return createElement(tagName, {
                className: className || `${classNamePrefix}component-${elementName}`,
                textContent: text
            }, style);
        }
        if (typeof textOptions === 'string') {
            return createElement(tagName, {
                className: `${classNamePrefix}component-${elementName}`,
                textContent: textOptions
            });
        }
    }
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Creates a component in the cell.
     *
     * @param cell
     * Instance of cell, where component is attached.
     *
     * @param options
     * The options for the component.
     */
    constructor(cell, options) {
        /**
         * Registry of callbacks registered on the component. Used in the Highcharts
         * component to keep track of chart events.
         *
         * @internal
         */
        this.callbackRegistry = new CallbackRegistry();
        /**
         * Event listeners tied to the current DataTable. Used for redrawing the
         * component on data changes.
         *
         * @internal
         */
        this.tableEvents = [];
        /**
         * Event listeners tied to the parent cell. Used for redrawing/resizing the
         * component on interactions.
         *
         * @internal
         */
        this.cellListeners = [];
        /**
         * The active group of the component. Used for sync.
         *
         * @internal
         */
        this.activeGroup = void 0;
        /**
         * Timeouts for calls to `Component.resizeTo()`.
         *
         * @internal
        /* *
         */
        this.resizeTimeouts = [];
        /**
         * Timeouts for resizing the content. I.e. `chart.setSize()`.
         *
         * @internal
         * */
        this.innerResizeTimeouts = [];
        this.board = cell.row.layout.board;
        this.cell = cell;
        // TODO: Change the TS of cell.
        this.parentElement = cell.container;
        this.attachCellListeneres();
        this.options = merge(Component.defaultOptions, options);
        this.id = this.options.id && this.options.id.length ?
            this.options.id :
            uniqueKey();
        // Todo: we might want to handle this later
        this.hasLoaded = false;
        this.shouldRedraw = true;
        this.editableOptions =
            new EditableOptions(this, options.editableOptionsBindings);
        this.presentationModifier = this.options.presentationModifier;
        // Initial dimensions
        this.dimensions = {
            width: null,
            height: null
        };
        this.syncHandlers = this.handleSyncOptions();
        this.element = createElement('div', {
            className: this.options.className
        });
        this.contentElement = createElement('div', {
            className: `${this.options.className}-content`
        }, {
            height: '100%'
        }, void 0, true);
    }
    /**
     * Inits connectors for the component and redraws it.
     *
     * @returns
     * Promise resolviing to the component.
     */
    initConnector() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (((_a = this.options.connector) === null || _a === void 0 ? void 0 : _a.id) &&
                this.connectorId !== this.options.connector.id) {
                const connector = yield this.board.dataPool
                    .getConnector(this.options.connector.id);
                this.setConnector(connector);
                this.shouldRedraw = true;
                this.redraw();
            }
            return this;
        });
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
    * Handles the sync options. Applies the given defaults if no
    * specific callback given.
    *
    * @param defaultHandlers
    * Sync handlers on component.
    *
    * @returns
    * Sync component.
    *
    * @internal
    */
    handleSyncOptions(defaultHandlers = Sync.defaultHandlers) {
        const sync = this.options.sync || {};
        return Object.keys(sync)
            .reduce((carry, handlerName) => {
            if (handlerName) {
                const handler = sync[handlerName];
                if (handler && typeof handler === 'object') {
                    carry[handlerName] = handler;
                }
                if (handler && typeof handler === 'boolean') {
                    carry[handlerName] = defaultHandlers[handlerName];
                }
            }
            return carry;
        }, {});
    }
    /**
     * Setup listeners on cell/other things up the chain
     *
     * @internal
     */
    attachCellListeneres() {
        // remove old listeners
        while (this.cellListeners.length) {
            const destroy = this.cellListeners.pop();
            if (destroy) {
                destroy();
            }
        }
        if (this.cell && Object.keys(this.cell).length) {
            const board = this.cell.row.layout.board;
            this.cellListeners.push(
            // Listen for resize on dashboard
            addEvent(board, 'cellResize', () => {
                this.resizeTo(this.parentElement);
            }), 
            // Listen for changed parent
            addEvent(this.cell.row, 'cellChange', (e) => {
                const { row } = e;
                if (row && this.cell) {
                    const hasLeftTheRow = row.getCellIndex(this.cell) === void 0;
                    if (hasLeftTheRow) {
                        if (this.cell) {
                            this.setCell(this.cell);
                        }
                    }
                }
            }));
        }
    }
    /**
     * Set a parent cell.
     * @param cell
     * Instance of a cell.
     * @param resize
     * Flag that allow to resize the component.
     *
     * @internal
     */
    setCell(cell, resize = false) {
        this.cell = cell;
        if (cell.container) {
            this.parentElement = cell.container;
        }
        this.attachCellListeneres();
        if (resize) {
            this.resizeTo(this.parentElement);
        }
    }
    /**
     * Adds event listeners to data table.
     * @param table
     * Data table that is source of data.
     * @internal
     */
    setupTableListeners(table) {
        const connector = this.connector;
        if (connector) {
            if (table) {
                [
                    'afterSetRows',
                    'afterDeleteRows',
                    'afterSetColumns',
                    'afterDeleteColumns',
                    'afterSetCell'
                ].forEach((event) => {
                    this.tableEvents.push((table)
                        .on(event, (e) => {
                        clearInterval(this.tableEventTimeout);
                        this.tableEventTimeout = setTimeout(() => {
                            this.emit(Object.assign(Object.assign({}, e), { type: 'tableChanged' }));
                            this.tableEventTimeout = void 0;
                        }, 0);
                    }));
                });
            }
            const component = this;
            this.tableEvents.push(connector.on('afterLoad', () => {
                this.emit({
                    target: component,
                    type: 'tableChanged'
                });
            }));
        }
    }
    /**
     * Remove event listeners in data table.
     * @internal
     */
    clearTableListeners() {
        const connector = this.connector, tableEvents = this.tableEvents;
        if (tableEvents.length) {
            tableEvents.forEach((removeEventCallback) => removeEventCallback());
        }
        if (connector) {
            tableEvents.push(connector.table.on('afterSetModifier', (e) => {
                if (e.type === 'afterSetModifier') {
                    this.emit(Object.assign(Object.assign({}, e), { type: 'tableChanged' }));
                }
            }));
        }
    }
    /**
     * Attaches data store to the component.
     * @param connector
     * Connector of data.
     *
     * @returns
     * Component which can be used in chaining.
     *
     * @internal
     */
    setConnector(connector) {
        fireEvent(this, 'setConnector', { connector });
        // Clean up old event listeners
        while (this.tableEvents.length) {
            const eventCallback = this.tableEvents.pop();
            if (typeof eventCallback === 'function') {
                eventCallback();
            }
        }
        this.connector = connector;
        if (connector) {
            // Set up event listeners
            this.clearTableListeners();
            this.setupTableListeners(connector.table);
            // re-setup if modifier changes
            connector.table.on('setModifier', () => this.clearTableListeners());
            connector.table.on('afterSetModifier', (e) => {
                if (e.type === 'afterSetModifier' && e.modified) {
                    this.setupTableListeners(e.modified);
                }
            });
            // Add the component to a group based on the
            // connector table id by default
            // TODO: make this configurable
            const tableID = connector.table.id;
            if (!ComponentGroup.getComponentGroup(tableID)) {
                ComponentGroup.addComponentGroup(new ComponentGroup(tableID));
            }
            const group = ComponentGroup.getComponentGroup(tableID);
            if (group) {
                group.addComponents([this.id]);
                this.activeGroup = group;
            }
        }
        fireEvent(this, 'afterSetConnector', { connector });
        return this;
    }
    /** @internal */
    setActiveGroup(group) {
        if (typeof group === 'string') {
            group = ComponentGroup.getComponentGroup(group) || null;
        }
        if (group instanceof ComponentGroup) {
            this.activeGroup = group;
        }
        if (group === null) {
            this.activeGroup = void 0;
        }
        if (this.activeGroup) {
            this.activeGroup.addComponents([this.id]);
        }
    }
    /**
     * Gets height of the component's content.
     *
     * @returns
     * Current height as number.
     * @internal
     */
    getContentHeight() {
        const parentHeight = this.dimensions.height || Number(getStyle(this.element, 'height'));
        const titleHeight = this.titleElement ?
            this.titleElement.clientHeight + getMargins(this.titleElement).y :
            0;
        const captionHeight = this.captionElement ?
            this.captionElement.clientHeight +
                getMargins(this.captionElement).y :
            0;
        return parentHeight - titleHeight - captionHeight;
    }
    /**
     * Resize the component
     * @param width
     * The width to set the component to.
     * Can be pixels, a percentage string or null.
     * Null will unset the style
     * @param height
     * The height to set the component to.
     * Can be pixels, a percentage string or null.
     * Null will unset the style.
     */
    resize(width, height) {
        if (height) {
            // Get offset for border, padding
            const pad = getPaddings(this.element).y + getMargins(this.element).y;
            this.dimensions.height = relativeLength(height, Number(getStyle(this.parentElement, 'height'))) - pad;
            this.element.style.height = this.dimensions.height + 'px';
            this.contentElement.style.height = this.getContentHeight() + 'px';
        }
        if (width) {
            const pad = getPaddings(this.element).x + getMargins(this.element).x;
            this.dimensions.width = relativeLength(width, Number(getStyle(this.parentElement, 'width'))) - pad;
            this.element.style.width = this.dimensions.width + 'px';
        }
        if (height === null) {
            this.dimensions.height = null;
            this.element.style.removeProperty('height');
        }
        if (width === null) {
            this.dimensions.width = null;
            this.element.style.removeProperty('width');
        }
        fireEvent(this, 'resize', {
            width,
            height
        });
    }
    /**
     * Adjusts size of component to parent's cell size when animation is done.
     * @param element
     * HTML element that is resized.
     */
    resizeTo(element) {
        while (this.resizeTimeouts.length) {
            const timeout = this.resizeTimeouts.pop();
            if (timeout) {
                cancelAnimationFrame(timeout);
            }
        }
        const timeoutID = requestAnimationFrame(() => {
            const { width, height } = element.getBoundingClientRect();
            const padding = getPaddings(element);
            const margins = getMargins(element);
            this.resize(width - padding.x - margins.x, height - padding.y - margins.y);
        });
        this.resizeTimeouts.push(timeoutID);
    }
    /**
     * Handles updating via options.
     * @param newOptions
     * The options to apply.
     *
     * @param redraw
     * Set to true if the update should redraw the component.
     */
    update(newOptions, redraw = true) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const eventObject = {
                options: newOptions,
                shouldForceRedraw: false
            };
            // Update options
            fireEvent(this, 'update', eventObject);
            this.options = merge(this.options, newOptions);
            if (((_a = this.options.connector) === null || _a === void 0 ? void 0 : _a.id) &&
                this.connectorId !== this.options.connector.id) {
                const connector = yield this.board.dataPool
                    .getConnector(this.options.connector.id);
                this.setConnector(connector);
                this.shouldRedraw = true;
            }
            this.options = merge(this.options, newOptions);
            if (redraw || eventObject.shouldForceRedraw) {
                this.redraw();
            }
        });
    }
    /**
     * Adds title at the top of component's container.
     * @param titleOptions
     * The options for the title.
     */
    setTitle(titleOptions) {
        const previousTitle = this.titleElement;
        if (!titleOptions || typeof titleOptions === 'string' ?
            titleOptions === '' :
            titleOptions.text === '') {
            if (previousTitle) {
                previousTitle.remove();
            }
            return;
        }
        const titleElement = Component.createTextElement('h1', 'title', titleOptions);
        if (titleElement) {
            this.titleElement = titleElement;
            if (previousTitle) {
                previousTitle.replaceWith(this.titleElement);
            }
        }
    }
    /**
     * Adds caption at the bottom of component's container.
     *
     * @param captionOptions
     * The options for the caption.
     */
    setCaption(captionOptions) {
        const previousCaption = this.captionElement;
        if (!captionOptions ||
            typeof captionOptions === 'string' ?
            captionOptions === '' :
            captionOptions.text === '') {
            if (previousCaption) {
                previousCaption.remove();
            }
            return;
        }
        const captionElement = Component.createTextElement('div', 'caption', captionOptions);
        if (captionElement) {
            this.captionElement = captionElement;
            if (previousCaption) {
                previousCaption.replaceWith(this.captionElement);
            }
        }
    }
    /**
     * Handles setting things up on initial render.
     *
     * @returns
     * The component for chaining.
     *
     * @internal
     */
    load() {
        // Set up the connector on inital load if it has not been done
        if (!this.hasLoaded && this.connector) {
            this.setConnector(this.connector);
        }
        this.setTitle(this.options.title);
        this.setCaption(this.options.caption);
        [
            this.titleElement,
            this.contentElement,
            this.captionElement
        ].forEach((element) => {
            if (element) {
                this.element.appendChild(element);
            }
        });
        // Setup event listeners
        // Grabbed from Chart.ts
        const events = this.options.events;
        if (events) {
            Object.keys(events).forEach((key) => {
                const eventCallback = events[key];
                if (eventCallback) {
                    this.callbackRegistry.addCallback(key, {
                        type: 'component',
                        func: eventCallback
                    });
                }
            });
            objectEach(events, (eventCallback, eventType) => {
                if (isFunction(eventCallback)) {
                    this.on(eventType, eventCallback);
                }
            });
        }
        this.on('message', (e) => {
            if ('message' in e) {
                this.onMessage(e.message);
            }
        });
        // TODO: should cleanup this event listener
        window.addEventListener('resize', () => this.resizeTo(this.parentElement));
        this.hasLoaded = true;
        this.shouldRedraw = false;
        return this;
    }
    /**
     * Renders the component.
     *
     * @returns
     * The component for chaining.
     *
     * @internal
     */
    render() {
        /**
         * TODO: make this call load on initial render
         */
        if (this.shouldRedraw || !this.hasLoaded) {
            this.load();
            // Call resize to fit to the cell.
            this.resizeTo(this.parentElement);
        }
        return this;
    }
    /**
     * Redraws the component.
     * @returns
     * The component for chaining.
     */
    redraw() {
        // Do a redraw
        const e = {
            component: this
        };
        fireEvent(this, 'redraw', e);
        this.shouldRedraw = true; // set to make render call load as well
        return this.render();
    }
    /**
     * Destroys the component.
     */
    destroy() {
        /**
         * TODO: Should perhaps also remove the component from the registry
         * or set an `isactive` flag to false.
         */
        while (this.element.firstChild) {
            this.element.firstChild.remove();
        }
        // Unregister events
        this.tableEvents.forEach((eventCallback) => eventCallback());
        this.element.remove();
        Component.removeInstance(this);
    }
    /** @internal */
    on(type, callback) {
        return addEvent(this, type, callback);
    }
    /** @internal */
    emit(e) {
        if (!e.target) {
            e.target = this;
        }
        fireEvent(this, e.type, e);
    }
    /** @internal */
    postMessage(message, target = {
        type: 'componentType',
        target: 'all'
    }) {
        const component = Component.getInstanceById(this.id);
        if (component) {
            Component.relayMessage(component, message, target);
        }
    }
    /** @internal */
    onMessage(message) {
        if (message && typeof message === 'string') {
            // do something
            return;
        }
        if (typeof message === 'object' &&
            typeof message.callback === 'function') {
            message.callback.apply(this);
        }
    }
    /**
     * Converts the class instance to a class JSON.
     * @internal
     *
     * @returns
     * Class JSON of this Component instance.
     *
     * @internal
     */
    toJSON() {
        const dimensions = {
            width: 0,
            height: 0
        };
        objectEach(this.dimensions, function (value, key) {
            if (value === null) {
                return;
            }
            dimensions[key] = value;
        });
        const json = {
            $class: this.options.type,
            // connector: this.connector ? this.connector.toJSON() : void 0,
            options: {
                cell: this.options.cell,
                parentElement: this.parentElement.id,
                dimensions,
                id: this.id,
                type: this.type
            }
        };
        return json;
    }
    /**
     * Get the component's options.
     * @returns
     * The JSON of component's options.
     *
     * @internal
     *
     */
    getOptions() {
        return diffObjects(this.options, Component.defaultOptions);
    }
    getEditableOptions() {
        const component = this;
        return merge(component.options);
    }
    getEditableOptionValue(propertyPath) {
        const component = this;
        if (!propertyPath) {
            return;
        }
        let result = component.getEditableOptions();
        for (let i = 0, end = propertyPath.length; i < end; i++) {
            if (!result) {
                return;
            }
            if (isArray(result)) {
                result = result[0];
            }
            result = result[propertyPath[i]];
        }
        return result;
    }
}
/* *
 *
 *  Properties
 *
 * */
/** @internal */
Component.Sync = Sync;
/**
 * Default options of the component.
 */
Component.defaultOptions = {
    className: `${classNamePrefix}component`,
    parentElement: document.body,
    id: '',
    title: false,
    caption: false,
    style: {
        display: 'flex',
        'flex-direction': 'column'
    },
    sync: Sync.defaultHandlers,
    editableOptions: [{
            name: 'connectorName',
            propertyPath: ['connector', 'id'],
            type: 'select'
        }, {
            name: 'title',
            propertyPath: ['title'],
            type: 'input'
        }, {
            name: 'caption',
            propertyPath: ['caption'],
            type: 'input'
        }]
};
/* *
 *
 *  Class Namespace
 *
 * */
(function (Component) {
    /* *
    *
    *  Constants
    *
    * */
    /**
     *
     * Record of component instances
     *
     */
    /** @internal */
    Component.instanceRegistry = {};
    /* *
    *
    *  Functions
    *
    * */
    /**
     * Adds component to the registry.
     *
     * @internal
     *
     * @internal
     * Adds a component instance to the registry.
     * @param component
     * The component to add.
     * Returns the true when component was found and added properly to the
     * registry, otherwise it is false.
     *
     * @internal
     */
    function addInstance(component) {
        Component.instanceRegistry[component.id] = component;
    }
    Component.addInstance = addInstance;
    /**
     * Removes a component instance from the registry.
     * @param component
     * The component to remove.
     *
     * @internal
     */
    function removeInstance(component) {
        delete Component.instanceRegistry[component.id];
    }
    Component.removeInstance = removeInstance;
    /**
     * Retrieves the IDs of the registered component instances.
     * @returns
     * Array of component IDs.
     *
     * @internal
     */
    function getAllInstanceIDs() {
        return Object.keys(Component.instanceRegistry);
    }
    Component.getAllInstanceIDs = getAllInstanceIDs;
    /**
     * Retrieves all registered component instances.
     * @returns
     * Array of components.
     *
     * @internal
     */
    function getAllInstances() {
        const ids = getAllInstanceIDs();
        return ids.map((id) => Component.instanceRegistry[id]);
    }
    Component.getAllInstances = getAllInstances;
    /**
     * Gets instance of component from registry.
     *
     * @param id
     * Component's id that exists in registry.
     *
     * @returns
     * Returns the component.
     * Gets instance of component from registry.
     *
     * @param id
     * Component's id that exists in registry.
     *
     * @returns
     * Returns the component type or undefined.
     *
     * @internal
     */
    function getInstanceById(id) {
        return Component.instanceRegistry[id];
    }
    Component.getInstanceById = getInstanceById;
    /**
     * Sends a message from the given sender to the target,
     * with an optional callback.
     *
     * @param sender
     * The sender of the message. Can be a Component or a ComponentGroup.
     *
     * @param message
     * The message. It can be a string, or a an object containing a
     * `callback` function.
     *
     * @param targetObj
     * An object containing the `type` of target,
     * which can be `group`, `componentID`, or `componentType`
     * as well as the id of the recipient.
     *
     * @internal
     */
    function relayMessage(sender, 
    // Are there cases where a group should be the sender?
    message, targetObj) {
        const emit = (component) => component.emit({
            type: 'message',
            detail: {
                sender: sender.id,
                target: targetObj.target
            },
            message,
            target: component
        });
        const handlers = {
            'componentID': (recipient) => {
                const component = getInstanceById(recipient);
                if (component) {
                    emit(component);
                }
            },
            'componentType': (recipient) => {
                getAllInstanceIDs()
                    .forEach((instanceID) => {
                    const component = getInstanceById(instanceID);
                    if (component && component.id !== sender.id) {
                        if (component.type === recipient ||
                            recipient === 'all') {
                            emit(component);
                        }
                    }
                });
            },
            'group': (recipient) => {
                // Send a message to a whole group
                const group = ComponentGroup.getComponentGroup(recipient);
                if (group) {
                    group.components.forEach((id) => {
                        const component = getInstanceById(id);
                        if (component && component.id !== sender.id) {
                            emit(component);
                        }
                    });
                }
            }
        };
        handlers[targetObj.type](targetObj.target);
    }
    Component.relayMessage = relayMessage;
})(Component || (Component = {}));
export default Component;
