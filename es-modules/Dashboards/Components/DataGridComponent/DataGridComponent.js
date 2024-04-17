/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Karol Kolodziej
 *
 * */
'use strict';
import Component from '../Component.js';
import DataGridSyncs from './DataGridSyncs/DataGridSyncs.js';
import DataGridComponentDefaults from './DataGridComponentDefaults.js';
import U from '../../../Core/Utilities.js';
const { diffObjects, merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * DataGrid component for Highcharts Dashboards.
 * @private
 */
class DataGridComponent extends Component {
    /* *
     *
     *  Static Functions
     *
     * */
    /** @private */
    static fromJSON(json, cell) {
        const options = json.options;
        const dataGridOptions = JSON.parse(json.options.dataGridOptions || '');
        const component = new DataGridComponent(cell, merge(options, { dataGridOptions }));
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
    constructor(cell, options, board) {
        options = merge(DataGridComponent.defaultOptions, options);
        super(cell, options, board);
        this.connectorListeners = [];
        this.options = options;
        this.type = 'DataGrid';
        if (this.options.dataGridClassName) {
            this.contentElement.classList.add(this.options.dataGridClassName);
        }
        if (this.options.dataGridID) {
            this.contentElement.id = this.options.dataGridID;
        }
        this.dataGridOptions = (this.options.dataGridOptions ||
            {});
        this.innerResizeTimeouts = [];
        this.on('afterSetConnectors', (e) => {
            const connector = e.connectorHandlers?.[0]?.connector;
            if (connector) {
                this.disableEditingModifiedColumns(connector);
            }
        });
    }
    onTableChanged() {
        if (this.dataGrid && !this.dataGrid?.cellInputEl) {
            this.dataGrid.update({ dataTable: this.filterColumns() });
        }
    }
    /**
     * Disable editing of the columns that are modified by the data modifier.
     * @internal
     *
     * @param connector
     * Attached connector
     */
    disableEditingModifiedColumns(connector) {
        const options = this.getColumnOptions(connector);
        this.dataGrid?.update({ columns: options });
    }
    /**
     * Get the column options for the data grid.
     * @internal
     */
    getColumnOptions(connector) {
        const modifierOptions = connector.options.dataModifier;
        if (!modifierOptions || modifierOptions.type !== 'Math') {
            return {};
        }
        const modifierColumns = modifierOptions.columnFormulas;
        if (!modifierColumns) {
            return {};
        }
        const options = {};
        for (let i = 0, iEnd = modifierColumns.length; i < iEnd; ++i) {
            const columnName = modifierColumns[i].column;
            options[columnName] = {
                editable: false
            };
        }
        return options;
    }
    /* *
     *
     *  Class methods
     *
     * */
    /**
     * Triggered on component initialization.
     * @private
     */
    async load() {
        this.emit({ type: 'load' });
        await super.load();
        const connector = this.getFirstConnector();
        if (connector &&
            !this.connectorListeners.length) {
            const connectorListeners = this.connectorListeners;
            // Reload the store when polling.
            connectorListeners.push(connector.on('afterLoad', (e) => {
                if (e.table && connector) {
                    connector.table.setColumns(e.table.getColumns());
                }
            }));
            // Update the DataGrid when connector changed.
            connectorListeners.push(connector.table.on('afterSetCell', (e) => {
                const dataGrid = this.dataGrid;
                let shouldUpdateTheGrid = true;
                if (dataGrid) {
                    const row = dataGrid.rowElements[e.rowIndex];
                    let cells = [];
                    if (row) {
                        cells = Array.prototype.slice.call(row.childNodes);
                    }
                    cells.forEach((cell) => {
                        if (cell.childElementCount > 0) {
                            const input = cell.childNodes[0], convertedInputValue = typeof e.cellValue === 'string' ?
                                input.value :
                                +input.value;
                            if (cell.dataset.columnName ===
                                e.columnName &&
                                convertedInputValue === e.cellValue) {
                                shouldUpdateTheGrid = false;
                            }
                        }
                    });
                }
                shouldUpdateTheGrid ? this.update({}) : void 0;
            }));
        }
        this.emit({ type: 'afterLoad' });
        return this;
    }
    /** @private */
    render() {
        super.render();
        if (!this.dataGrid) {
            this.dataGrid = this.constructDataGrid();
        }
        const connector = this.getFirstConnector();
        if (connector &&
            this.dataGrid &&
            this.dataGrid.dataTable.modified !== connector.table.modified) {
            this.dataGrid.update({ dataTable: this.filterColumns() });
        }
        this.sync.start();
        this.emit({ type: 'afterRender' });
        this.setupConnectorUpdate();
        return this;
    }
    /** @private */
    resize(width, height) {
        if (this.dataGrid) {
            super.resize(width, height);
        }
    }
    async update(options) {
        const connectorOptions = Array.isArray(options.connector) ?
            options.connector[0] : options.connector;
        if (this.connectorHandlers[0] &&
            connectorOptions?.id !== this.connectorHandlers[0]?.connectorId) {
            const connectorListeners = this.connectorListeners;
            for (let i = 0, iEnd = connectorListeners.length; i < iEnd; ++i) {
                connectorListeners[i]();
            }
            connectorListeners.length = 0;
        }
        await super.update(options);
        if (this.dataGrid) {
            this.dataGrid.update(this.options.dataGridOptions || {});
        }
        this.emit({ type: 'afterUpdate' });
    }
    /** @private */
    constructDataGrid() {
        if (DataGridComponent.DataGridNamespace) {
            const DataGrid = DataGridComponent.DataGridNamespace.DataGrid;
            const connector = this.getFirstConnector();
            const columnOptions = connector ?
                this.getColumnOptions(connector) :
                {};
            this.dataGrid = new DataGrid(this.contentElement, {
                ...this.options.dataGridOptions,
                dataTable: this.options.dataGridOptions?.dataTable ||
                    this.filterColumns(),
                columns: merge(columnOptions, this.options.dataGridOptions?.columns)
            });
            return this.dataGrid;
        }
        throw new Error('DataGrid not connected.');
    }
    setupConnectorUpdate() {
        const { dataGrid } = this;
        const connector = this.getFirstConnector();
        if (connector && dataGrid) {
            dataGrid.on('cellClick', (e) => {
                if ('input' in e) {
                    e.input.addEventListener('keyup', (keyEvent) => this.options.onUpdate(keyEvent, connector));
                }
            });
        }
    }
    /**
     * Based on the `visibleColumns` option, filter the columns of the table.
     *
     * @internal
     */
    filterColumns() {
        const table = this.getFirstConnector()?.table.modified, visibleColumns = this.options.visibleColumns;
        if (table) {
            // Show all columns if no visibleColumns is provided.
            if (!visibleColumns?.length) {
                return table;
            }
            const columnsToDelete = table
                .getColumnNames()
                .filter((columnName) => (visibleColumns?.length > 0 &&
                // Don't add columns that are not listed.
                !visibleColumns.includes(columnName)
            // Else show the other columns.
            ));
            // On a fresh table clone remove the columns that are not mapped.
            const filteredTable = table.clone();
            filteredTable.deleteColumns(columnsToDelete);
            return filteredTable;
        }
    }
    getOptionsOnDrop(sidebar) {
        const connectorsIds = sidebar.editMode.board.dataPool.getConnectorIds();
        let options = {
            cell: '',
            type: 'DataGrid'
        };
        if (connectorsIds.length) {
            options = {
                ...options,
                connector: {
                    id: connectorsIds[0]
                }
            };
        }
        return options;
    }
    /** @private */
    toJSON() {
        const dataGridOptions = JSON.stringify(this.options.dataGridOptions);
        const base = super.toJSON();
        const json = {
            ...base,
            options: {
                ...base.options,
                dataGridOptions
            }
        };
        this.emit({ type: 'toJSON', json });
        return json;
    }
    /**
     * Get the DataGrid component's options.
     * @returns
     * The JSON of DataGrid component's options.
     *
     * @internal
     *
     */
    getOptions() {
        return {
            ...diffObjects(this.options, DataGridComponent.defaultOptions),
            type: 'DataGrid'
        };
    }
    /**
     * Destroys the data grid component.
     */
    destroy() {
        this.dataGrid?.containerResizeObserver.disconnect();
        super.destroy();
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * Predefined sync config for the DataGrid component.
 */
DataGridComponent.predefinedSyncConfig = DataGridSyncs;
/** @private */
DataGridComponent.defaultOptions = merge(Component.defaultOptions, DataGridComponentDefaults);
/* *
 *
 *  Default Export
 *
 * */
export default DataGridComponent;
