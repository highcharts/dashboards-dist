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
 *
 * */
'use strict';
import Cell from '../Layout/Cell.js';
import CallbackRegistry from '../CallbackRegistry.js';
import ConnectorHandler from './ConnectorHandler.js';
import EditableOptions from './EditableOptions.js';
import Sync from './Sync/Sync.js';
import Globals from '../Globals.js';
const { classNamePrefix } = Globals;
import U from '../../Core/Utilities.js';
const { createElement, isArray, merge, fireEvent, addEvent, objectEach, isFunction, getStyle, diffObjects, removeEvent } = U;
import CU from './ComponentUtilities.js';
const { getMargins, getPaddings } = CU;
import DU from '../Utilities.js';
const { deepClone, uniqueKey } = DU;
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
         * The connector handlers for the component.
         */
        this.connectorHandlers = [];
        /**
         * Registry of callbacks registered on the component. Used in the Highcharts
         * component to keep track of chart events.
         *
         * @internal
         */
        this.callbackRegistry = new CallbackRegistry();
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
        if (this.options.connector) {
            const connectorOptionsArray = isArray(this.options.connector) ?
                this.options.connector :
                [this.options.connector];
            for (const connectorOptions of connectorOptionsArray) {
                this.connectorHandlers.push(new ConnectorHandler(this, connectorOptions));
            }
            // Assign the data table key to define the proper dataTable.
            this.dataTableKey = isArray(this.options.connector) ?
                this.options.connector[0].dataTableKey :
                this.options.connector.dataTableKey;
        }
        this.editableOptions =
            new EditableOptions(this, options.editableOptionsBindings);
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
        this.sync = new Sync(this, this.constructor.predefinedSyncConfig);
        this.setupEventListeners();
        if (cell) {
            this.attachCellListeners();
            this.on('update', () => {
                if (Cell.isCell(this.cell)) {
                    this.cell.setLoadingState();
                }
            });
            this.on('afterRender', () => {
                if (Cell.isCell(this.cell)) {
                    this.cell.setLoadingState(false);
                }
            });
        }
        this.on('tableChanged', () => {
            this.onTableChanged();
        });
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
    /**
     * Returns the first connector of the component if it exists.
     *
     * @internal
     */
    getFirstConnector() {
        return this.connectorHandlers[0]?.connector;
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
        if (this.cell &&
            Cell.isCell(this.cell) &&
            Object.keys(this.cell).length) {
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
     * Initializes connector handlers for the component.
     */
    async initConnectors() {
        fireEvent(this, 'setConnectors', {
            connectorHandlers: this.connectorHandlers
        });
        for (const connectorHandler of this.connectorHandlers) {
            await connectorHandler.initConnector();
        }
        fireEvent(this, 'afterSetConnectors', {
            connectorHandlers: this.connectorHandlers
        });
        return this;
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
     * It's a temporary alternative for the `resize` method. It sets the strict
     * pixel height for the component so that the content can be distributed in
     * the right way, without looping the resizers in the content and container.
     * @param width
     * The width to set the component to.
     * @param height
     * The height to set the component to.
     */
    resizeDynamicContent(width, height) {
        const { element } = this;
        if (height) {
            const margins = getMargins(element).y;
            const paddings = getPaddings(element).y;
            if (typeof height === 'string') {
                height = parseFloat(height);
            }
            height = Math.round(height);
            element.style.height = `${height - margins - paddings}px`;
            this.contentElement.style.height = `${element.clientHeight - this.getContentHeight() - paddings}px`;
        }
        else if (height === null) {
            this.dimensions.height = null;
            element.style.removeProperty('height');
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
        if (newOptions.connector && Array.isArray(this.options.connector)) {
            this.options.connector = void 0;
        }
        this.options = merge(this.options, newOptions);
        const connectorOptions = (this.options.connector ? (isArray(this.options.connector) ? this.options.connector :
            [this.options.connector]) : []);
        let connectorsHaveChanged = connectorOptions.length !== this.connectorHandlers.length;
        if (!connectorsHaveChanged) {
            for (let i = 0, iEnd = connectorOptions.length; i < iEnd; i++) {
                const oldConnectorId = this.connectorHandlers[i]?.options.id;
                const newConnectorId = connectorOptions[i]?.id;
                if (oldConnectorId !== newConnectorId) {
                    connectorsHaveChanged = true;
                    break;
                }
                this.connectorHandlers[i].updateOptions(connectorOptions[i]);
            }
        }
        if (connectorsHaveChanged) {
            for (const connectorHandler of this.connectorHandlers) {
                connectorHandler.destroy();
            }
            this.connectorHandlers.length = 0;
            for (const options of connectorOptions) {
                this.connectorHandlers.push(new ConnectorHandler(this, options));
            }
            await this.initConnectors();
        }
        // Assign the data table key to define the proper dataTable.
        const firstConnectorDataTableKey = connectorOptions[0]?.dataTableKey;
        if (firstConnectorDataTableKey) {
            this.dataTableKey = firstConnectorDataTableKey;
        }
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
        await this.initConnectors();
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
        if (this.sync.isSyncing) {
            this.sync.stop();
        }
        while (this.element.firstChild) {
            this.element.firstChild.remove();
        }
        // Call unmount
        fireEvent(this, 'unmount');
        for (const connectorHandler of this.connectorHandlers) {
            connectorHandler.destroy();
        }
        // Used to removed the onTableChanged event.
        removeEvent(this);
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
        // When refactoring, limit the copied options to the ones that are
        // actually editable to avoid unnecessary memory usage.
        return deepClone(component.options, [
            'dataTable', 'points', 'series', 'data', 'editableOptions'
        ]);
    }
    getEditableOptionValue(propertyPath) {
        const component = this;
        if (!propertyPath) {
            return;
        }
        let result = component.getEditableOptions();
        for (let i = 0, end = propertyPath.length; i < end; i++) {
            if (isArray(result) &&
                propertyPath[0] === 'connector' &&
                result.length > 1) {
                return 'multiple connectors';
            }
            if (!result) {
                return;
            }
            result = result[propertyPath[i]];
            if (result === false &&
                (propertyPath.indexOf('title') >= 0 ||
                    propertyPath.indexOf('subtitle') >= 0 ||
                    propertyPath.indexOf('caption') >= 0)) {
                result = '';
            }
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
 * Predefined sync config for component.
 */
Component.predefinedSyncConfig = {
    defaultSyncOptions: {},
    defaultSyncPairs: {}
};
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
            name: 'title',
            propertyPath: ['title'],
            type: 'input'
        }, {
            name: 'caption',
            propertyPath: ['caption'],
            type: 'input'
        }]
};
export default Component;
