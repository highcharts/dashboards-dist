/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  A commercial license may be required depending on use.
 *  See www.highcharts.com/license
 *
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
import Bindings from './Actions/Bindings.js';
import ComponentRegistry from './Components/ComponentRegistry.js';
import DashboardsAccessibility from './Accessibility/DashboardsAccessibility.js';
import DataCursor from '../Data/DataCursor.js';
import DataPool from '../Data/DataPool.js';
import Defaults from './Defaults.js';
import Globals from './Globals.js';
import Layout from './Layout/Layout.js';
import HTMLComponent from './Components/HTMLComponent/HTMLComponent.js';
import U from '../Core/Utilities.js';
const { merge, addEvent, createElement, error, objectEach, uniqueKey } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Class that represents a dashboard.
 *
 * @example
 * const dashboard = Dashboards.board('container', {
 *      gui: {
 *          layouts: [{
 *              id: 'layout-1',
 *              rows: [{
 *                  cells: [{
 *                      id: 'dashboard-col-0'
 *                  }]
 *              }]
 *          }]
 *      },
 *      components: [{
 *          renderTo: 'dashboard-col-0',
 *          type: 'Highcharts',
 *          chartOptions: {
 *              series: [{
 *                  data: [1, 2, 3, 4]
 *              }]
 *          }
 *      }]
 * });
 */
class Board {
    // Implementation:
    static board(renderTo, options, async) {
        return new Board(renderTo, options).init(async);
    }
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Creates a dashboard with components like charts, tables, and HTML
     * elements.
     *
     * @internal
     * @param renderTo
     * The DOM element to render to, or its id.
     *
     * @param options
     * The options for the dashboard.
     */
    constructor(renderTo, options) {
        /**
         * All types of components available in the dashboard.
         * @internal
         */
        this.componentTypes = ComponentRegistry.types;
        this.options = merge(Defaults.defaultOptions, options);
        this.dataPool = new DataPool(options.dataPool);
        this.id = uniqueKey();
        this.guiEnabled = !options.gui ?
            false : this.options?.gui?.enabled;
        this.editModeEnabled = !options.editMode ?
            false : this.options?.editMode?.enabled;
        this.layouts = [];
        this.mountedComponents = [];
        this.initContainer(renderTo);
        this.initEditMode();
        // Add table cursors support.
        this.dataCursor = new DataCursor();
        this.index = Globals.boards.length;
        Globals.boards.push(this);
        // A11y module
        this.a11y = new DashboardsAccessibility(this);
    }
    // Implementation:
    init(async) {
        const options = this.options;
        const componentPromises = (options.components) ?
            this.setComponents(options.components) : [];
        // Init events.
        this.initEvents();
        if (async) {
            return Promise.all(componentPromises).then(() => {
                options.events?.mounted?.call(this);
                return this;
            });
        }
        options.events?.mounted?.call(this);
        return this;
    }
    /**
     * Initializes the events.
     * @internal
     */
    initEvents() {
        const board = this, runReflow = () => {
            board.reflow();
        };
        if (typeof ResizeObserver === 'function') {
            this.resizeObserver = new ResizeObserver(runReflow);
            this.resizeObserver.observe(board.container);
        }
        else {
            const unbind = addEvent(window, 'resize', runReflow);
            addEvent(this, 'destroy', unbind);
        }
    }
    /**
     * Initialize the container for the dashboard.
     * @internal
     *
     * @param renderTo
     * The DOM element to render to, or its id.
     */
    initContainer(renderTo) {
        const board = this;
        if (typeof renderTo === 'string') {
            renderTo = window.document.getElementById(renderTo);
        }
        // Display an error if the renderTo doesn't exist.
        if (!renderTo) {
            error(13, true);
        }
        board.container = renderTo;
    }
    /**
     * Inits creating a layouts and setup the EditMode tools.
     * @internal
     */
    initEditMode() {
        const { EditMode } = Globals.win.Dashboards;
        if (EditMode) {
            this.editMode = new EditMode(this, this.options.editMode);
        }
        else if (this.editModeEnabled) {
            throw new Error('Missing layout.js module');
        }
    }
    /**
     * Set the components from options.
     * @internal
     *
     * @param components
     * An array of component options.
     *
     */
    setComponents(components) {
        const promises = [];
        const board = this;
        for (let i = 0, iEnd = components.length; i < iEnd; ++i) {
            promises.push(Bindings.addComponent(components[i], board));
        }
        return promises;
    }
    /**
     * Destroy the whole dashboard, its layouts and elements.
     */
    destroy() {
        const board = this;
        const index = this.index;
        // Cancel all data connectors pending requests.
        this.dataPool.cancelPendingRequests();
        // Destroy layouts.
        if (this.guiEnabled) {
            for (let i = 0, iEnd = board.layouts?.length; i < iEnd; ++i) {
                board.layouts[i].destroy();
            }
        }
        else {
            for (const mountedComponent of board.mountedComponents) {
                mountedComponent.component.destroy();
            }
        }
        // Remove resizeObserver from the board
        this.resizeObserver?.unobserve(board.container);
        // Destroy container.
        if (this.guiEnabled) {
            board.container?.remove();
        }
        // @ToDo Destroy bindings.
        // Delete all properties.
        objectEach(board, function (val, key) {
            delete board[key];
        });
        Globals.boards[index] = void 0;
        return;
    }
    /**
     * Reflow the dashboard. Hide the toolbars and context pointer. Reflow the
     * layouts and its cells.
     */
    reflow() {
        const board = this;
        if (board.editMode) {
            const editModeTools = board.editMode.tools;
            board.editMode.hideToolbars(['cell', 'row']);
            board.editMode.hideContextPointer();
            // Update expanded context menu container
            if (editModeTools.contextMenu) {
                editModeTools.contextMenu
                    .updatePosition(editModeTools.contextButtonElement);
            }
        }
    }
    /**
     * Update the dashboard with new options.
     *
     * @param newOptions
     * The new options to apply to the dashboard.
     */
    update(newOptions) {
        const board = this;
        // Merge new options with existing ones
        board.options = merge(board.options, newOptions);
        // Update dataPool if dataPool options changed
        if (newOptions.dataPool) {
            board.dataPool = new DataPool(board.options.dataPool);
        }
        // Update guiEnabled and editModeEnabled flags if changed
        if (newOptions.gui !== void 0) {
            board.guiEnabled = !newOptions.gui ?
                false : board.options?.gui?.enabled;
        }
        if (newOptions.editMode !== void 0) {
            board.editModeEnabled = !newOptions.editMode ?
                false : board.options?.editMode?.enabled;
        }
        // Destroy existing components
        for (const mountedComponent of board.mountedComponents) {
            mountedComponent.component.destroy();
        }
        board.mountedComponents = [];
        // Destroy existing layouts if GUI is enabled
        if (board.guiEnabled && board.layouts) {
            for (let i = 0, iEnd = board.layouts.length; i < iEnd; ++i) {
                board.layouts[i].destroy();
            }
            board.layouts = [];
            // Ensure layoutsWrapper exists
            if (!board.layoutsWrapper && board.container) {
                board.layoutsWrapper = createElement('div', {
                    className: Globals.classNames.layoutsWrapper
                }, {}, board.container);
            }
            // Create new layouts if they are provided
            if (board.options.gui?.layouts) {
                const guiOptions = board.options.gui;
                for (let i = 0, iEnd = guiOptions.layouts.length; i < iEnd; ++i) {
                    board.layouts.push(new Layout(board, merge({}, guiOptions.layoutOptions, guiOptions.layouts[i])));
                }
                // Re-initialize editMode events if editMode exists
                if (board.editMode) {
                    // Re-initialize events for all layouts
                    let j = 0;
                    const jEnd = board.layouts.length;
                    for (j; j < jEnd; ++j) {
                        board.editMode.setLayoutEvents(board.layouts[j]);
                    }
                }
            }
        }
        // Add new components
        if (board.options.components) {
            void board.setComponents(board.options.components);
        }
    }
    /**
     * Convert the current state of board's options into JSON. The function does
     * not support converting functions or events into JSON object.
     *
     * @returns
     * Dashboards options.
     */
    getOptions() {
        const board = this, options = {
            ...this.options,
            components: []
        };
        for (let i = 0, iEnd = board.mountedComponents.length; i < iEnd; ++i) {
            if (board.mountedComponents[i].cell &&
                board.mountedComponents[i].cell.mountedComponent) {
                options.components?.push(board.mountedComponents[i].component.getOptions());
            }
        }
        if (this.guiEnabled) {
            options.gui = {
                layouts: []
            };
            for (let i = 0, iEnd = board.layouts.length; i < iEnd; ++i) {
                options.gui.layouts?.push(board.layouts[i].getOptions());
            }
        }
        else {
            delete options.gui;
        }
        return options;
    }
    /**
     * Get a Dashboards component by its identifier.
     *
     * @param id
     * The identifier of the requested component.
     *
     * @returns
     * The component with the given identifier.
     */
    getComponentById(id) {
        return this.mountedComponents.find((c) => c.component.id === id)?.component;
    }
    /**
     * Get a Dashboards component by its cell identifier.
     *
     * @param id
     * The identifier of the cell that contains the requested component.
     *
     * @returns
     * The component with the given cell identifier.
     */
    getComponentByCellId(id) {
        return this.mountedComponents.find((c) => c.cell.id === id)?.component;
    }
}
/* *
 *
 *  Registry
 *
 * */
ComponentRegistry.registerComponent('HTML', HTMLComponent);
/* *
 *
 *  Default Export
 *
 * */
export default Board;
