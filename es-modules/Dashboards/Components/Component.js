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
import CallbackRegistry from '../CallbackRegistry.js';
import ComponentGroup from './ComponentGroup.js';
import EditableOptions from './EditableOptions.js';
import Sync from './Sync/Sync.js';
import Globals from '../Globals.js';
const { classNamePrefix } = Globals;
import U from '../../Core/Utilities.js';
const { createElement, isArray, merge, fireEvent, addEvent, objectEach, isFunction, isObject, getStyle, diffObjects } = U;
import CU from './ComponentUtilities.js';
const { getMargins, getPaddings } = CU;
import DU from '../Utilities.js';
const { uniqueKey } = DU;
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
     * HTML tag name used as wrapper of text like `h2` or `p`.
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
            }, {});
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
    constructor(cell, options, board) {
        /**
         * Registry of callbacks registered on the component. Used in the Highcharts
         * component to keep track of chart events.
         *
         * @internal
         */
        this.callbackRegistry = new CallbackRegistry();
        /**
         * Event listeners tied to the current DataTable. Used for rerendering the
         * component on data changes.
         *
         * @internal
         */
        this.tableEvents = [];
        /**
         * Event listeners tied to the parent cell. Used for rendering/resizing the
         * component on interactions.
         *
         * @internal
         */
        this.cellListeners = [];
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
        const renderTo = options.renderTo || options.cell;
        this.board = board || cell?.row?.layout?.board || {};
        this.parentElement =
            cell?.container || document.querySelector('#' + renderTo);
        this.cell = cell;
        this.options = merge(Component.defaultOptions, options);
        this.id = this.options.id && this.options.id.length ?
            this.options.id :
            uniqueKey();
        this.editableOptions =
            new EditableOptions(this, options.editableOptionsBindings);
        this.presentationModifier = this.options.presentationModifier;
        this.dimensions = {
            width: null,
            height: null
        };
        this.element = createElement('div', {
            className: this.options.className
        }, {}, this.parentElement);
        if (!Number(getStyle(this.element, 'padding'))) {
            // Fix flex problem, because of wrong height in internal elements
            this.element.style.padding = '0.1px';
        }
        this.contentElement = createElement('div', {
            className: `${this.options.className}-content`
        }, {}, this.element, true);
        this.filterAndAssignSyncOptions();
        this.setupEventListeners();
        if (cell) {
            this.attachCellListeners();
            this.on('tableChanged', () => {
                this.onTableChanged();
            });
            this.on('update', () => {
                this.cell.setLoadingState();
            });
            this.on('afterRender', () => {
                this.cell.setLoadingState(false);
            });
        }
    }
    /**
     * Returns the component's options when it is dropped from the sidebar.
     *
     * @param sidebar
     * The sidebar popup.
     */
    getOptionsOnDrop(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sidebar) {
        return {};
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Inits connectors for the component and rerenders it.
     *
     * @returns
     * Promise resolving to the component.
     */
    async initConnector() {
        const connectorId = this.options.connector?.id, dataPool = this.board.dataPool;
        if (connectorId &&
            (this.connectorId !== connectorId ||
                dataPool.isNewConnector(connectorId))) {
            this.cell?.setLoadingState();
            const connector = await dataPool.getConnector(connectorId);
            this.setConnector(connector);
        }
        return this;
    }
    /**
    * Filter the sync options that are declared in the component options.
    * Assigns the sync options to the component and to the sync instance.
    *
    * @param defaultHandlers
    * Sync handlers on component.
    *
    * @internal
    */
    filterAndAssignSyncOptions(defaultHandlers = this.constructor.syncHandlers) {
        const sync = this.options.sync || {};
        const syncHandlers = Object.keys(sync).reduce((carry, handlerName) => {
            if (handlerName) {
                const defaultHandler = defaultHandlers[handlerName];
                const defaultOptions = Sync.defaultSyncOptions[handlerName];
                const handler = sync[handlerName];
                // Make it always an object
                carry[handlerName] = merge(defaultOptions || {}, { enabled: isObject(handler) ? handler.enabled : handler }, isObject(handler) ? handler : {});
                // Set emitter and handler default functions
                if (defaultHandler && carry[handlerName].enabled) {
                    const keys = [
                        'emitter', 'handler'
                    ];
                    for (const key of keys) {
                        if (carry[handlerName][key] === true ||
                            carry[handlerName][key] === void 0) {
                            carry[handlerName][key] =
                                defaultHandler[key];
                        }
                    }
                }
            }
            return carry;
        }, {});
        this.sync ? this.sync.syncConfig = syncHandlers : void 0;
        this.syncHandlers = syncHandlers;
    }
    /**
     * Setup listeners on cell/other things up the chain
     *
     * @internal
     */
    attachCellListeners() {
        // Remove old listeners
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
        this.attachCellListeners();
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
                    'afterDeleteColumns',
                    'afterDeleteRows',
                    'afterSetCell',
                    'afterSetConnector',
                    'afterSetColumns',
                    'afterSetRows'
                ].forEach((event) => {
                    this.tableEvents.push((table)
                        .on(event, (e) => {
                        clearTimeout(this.tableEventTimeout);
                        this.tableEventTimeout = Globals.win.setTimeout(() => {
                            this.emit({
                                ...e,
                                type: 'tableChanged'
                            });
                            this.tableEventTimeout = void 0;
                        });
                    }));
                });
            }
            this.tableEvents.push(connector.on('afterLoad', () => {
                clearTimeout(this.tableEventTimeout);
                this.tableEventTimeout = Globals.win.setTimeout(() => {
                    this.emit({
                        target: this,
                        type: 'tableChanged'
                    });
                    this.tableEventTimeout = void 0;
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
                    clearTimeout(this.tableEventTimeout);
                    this.tableEventTimeout = Globals.win.setTimeout(() => {
                        this.emit({
                            ...e,
                            type: 'tableChanged'
                        });
                        this.tableEventTimeout = void 0;
                    });
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
            // Re-setup if modifier changes
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
        const titleHeight = this.titleElement ?
            this.titleElement.clientHeight + getMargins(this.titleElement).y :
            0;
        const captionHeight = this.captionElement ?
            this.captionElement.clientHeight +
                getMargins(this.captionElement).y :
            0;
        return titleHeight + captionHeight;
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
            this.element.style.height = 'calc(100% - ' + pad + 'px)';
            this.contentElement.style.height =
                'calc(100% - ' + this.getContentHeight() + 'px)';
        }
        else if (height === null) {
            this.dimensions.height = null;
            this.element.style.removeProperty('height');
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
     * @param shouldRerender
     * Set to true if the update should rerender the component.
     */
    async update(newOptions, shouldRerender = true) {
        const eventObject = {
            options: newOptions,
            shouldForceRerender: false
        };
        // Update options
        fireEvent(this, 'update', eventObject);
        this.options = merge(this.options, newOptions);
        if (this.options.connector?.id &&
            this.connectorId !== this.options.connector.id) {
            const connector = await this.board.dataPool
                .getConnector(this.options.connector.id);
            this.setConnector(connector);
        }
        this.options = merge(this.options, newOptions);
        if (shouldRerender || eventObject.shouldForceRerender) {
            this.render();
        }
    }
    /**
     * Private method which sets up event listeners for the component.
     *
     * @internal
     */
    setupEventListeners() {
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
        const resizeObserverCallback = () => {
            this.resizeTo(this.parentElement);
        };
        if (typeof ResizeObserver === 'function') {
            this.resizeObserver = new ResizeObserver(resizeObserverCallback);
            this.resizeObserver.observe(this.element);
        }
        else {
            const unbind = addEvent(window, 'resize', resizeObserverCallback);
            addEvent(this, 'destroy', unbind);
        }
    }
    /**
     * Adds title at the top of component's container.
     *
     * @param titleOptions
     * The options for the title.
     */
    setTitle(titleOptions) {
        const titleElement = this.titleElement, shouldExist = titleOptions &&
            (typeof titleOptions === 'string' || titleOptions.text);
        if (shouldExist) {
            const newTitle = Component.createTextElement('h2', 'title', titleOptions);
            if (newTitle) {
                if (!titleElement) {
                    this.element.insertBefore(newTitle, this.element.firstChild);
                }
                else {
                    titleElement.replaceWith(newTitle);
                }
                this.titleElement = newTitle;
            }
        }
        else {
            if (titleElement) {
                titleElement.remove();
                delete this.titleElement;
                return;
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
        const captionElement = this.captionElement, shouldExist = captionOptions &&
            (typeof captionOptions === 'string' || captionOptions.text);
        if (shouldExist) {
            const newCaption = Component.createTextElement('div', 'caption', captionOptions);
            if (newCaption) {
                if (!captionElement) {
                    this.element.appendChild(newCaption);
                }
                else {
                    captionElement.replaceWith(newCaption);
                }
                this.captionElement = newCaption;
            }
        }
        else {
            if (captionElement) {
                captionElement.remove();
                delete this.captionElement;
                return;
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
    async load() {
        await this.initConnector();
        this.render();
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
        this.emit({ type: 'render' });
        this.setTitle(this.options.title);
        this.setCaption(this.options.caption);
        this.resizeTo(this.parentElement);
        return this;
    }
    /**
     * Destroys the component.
     */
    destroy() {
        /**
         * TODO: Should perhaps set an `isActive` flag to false.
         */
        this.sync.stop();
        while (this.element.firstChild) {
            this.element.firstChild.remove();
        }
        // Call unmount
        fireEvent(this, 'unmount');
        // Unregister events
        this.tableEvents.forEach((eventCallback) => eventCallback());
        this.element.remove();
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
            options: {
                renderTo: this.options.renderTo,
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
            if (isArray(result)) {
                result = result[0];
            }
            if (!result) {
                return;
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
    id: '',
    title: false,
    caption: false,
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
/**
 * Default sync Handlers.
 */
Component.syncHandlers = {};
export default Component;
