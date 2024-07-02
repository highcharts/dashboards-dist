/* *
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
import Cell from '../Layout/Cell.js';
import Globals from '../Globals.js';
/* *
 *
 *  Class
 *
 * */
/**
 * A class that handles the connection between the component and the data
 * connector.
 */
class ConnectorHandler {
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Creates an object that manages the data layer for the component.
     *
     * @param component
     * The component that the connector is tied to.
     *
     * @param options
     * The options for the connector.
     *
     */
    constructor(component, options) {
        /**
         * Event listeners tied to the current DataTable. Used for rerendering the
         * component on data changes.
         *
         * @internal
         */
        this.tableEvents = [];
        this.component = component;
        this.options = options;
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
        const component = this.component;
        const connectorId = this.options.id;
        const dataPool = this.component.board.dataPool;
        if (connectorId &&
            (this.connectorId !== connectorId ||
                dataPool.isNewConnector(connectorId))) {
            if (component.cell instanceof Cell) {
                component.cell.setLoadingState();
            }
            const connector = await dataPool.getConnector(connectorId);
            this.setConnector(connector);
        }
        return component;
    }
    /**
     * Sets the connector for the component connector handler.
     *
     * @param connector
     * The connector to set.
     */
    setConnector(connector) {
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
                    this.component.emit({
                        type: 'tableChanged',
                        connector: connector
                    });
                }
            });
            if (connector.table) {
                if (this.presentationModifier) {
                    this.presentationTable =
                        this.presentationModifier.modifyTable(connector.table.modified.clone()).modified;
                }
                else {
                    this.presentationTable = connector.table;
                }
            }
        }
        return this.component;
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
                    'afterDeleteRows',
                    'afterSetCell',
                    'afterSetColumns',
                    'afterSetRows'
                ].forEach((event) => {
                    this.tableEvents.push(table.on(event, (e) => {
                        clearTimeout(this.tableEventTimeout);
                        this.tableEventTimeout = Globals.win.setTimeout(() => {
                            this.component.emit({
                                ...e,
                                type: 'tableChanged',
                                targetConnector: connector
                            });
                            this.tableEventTimeout = void 0;
                        });
                    }));
                });
            }
        }
    }
    /**
     * Remove event listeners in data table.
     * @internal
     */
    clearTableListeners() {
        const connector = this.connector;
        const tableEvents = this.tableEvents;
        this.destroy();
        if (connector) {
            tableEvents.push(connector.table.on('afterSetModifier', (e) => {
                if (e.type === 'afterSetModifier') {
                    clearTimeout(this.tableEventTimeout);
                    this.tableEventTimeout = Globals.win.setTimeout(() => {
                        connector.emit({
                            ...e,
                            type: 'tableChanged',
                            targetConnector: connector
                        });
                        this.tableEventTimeout = void 0;
                    });
                }
            }));
        }
    }
    updateOptions(newOptions) {
        this.options = newOptions;
    }
    destroy() {
        this.tableEvents.forEach((clearEvent) => clearEvent());
        this.tableEvents.length = 0;
    }
}
export default ConnectorHandler;
