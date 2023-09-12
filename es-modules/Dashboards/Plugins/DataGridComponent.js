/* *
 *
 *  (c) 2009-2023 Highsoft AS
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Component from '../Components/Component.js';
import DataConverter from '../../Data/Converters/DataConverter.js';
import DataGridSyncHandlers from './DataGridSyncHandlers.js';
import U from '../../Core/Utilities.js';
const { diffObjects, merge, uniqueKey } = U;
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
    /**
     * Default update function, if data grid has changed. This functionality can
     * be replaced with the {@link DataGridComponent.DataGridOptions#onUpdate}
     * option.
     *
     * @private
     *
     * @param e
     * Related keyboard event of the change.
     *
     * @param connector
     * Relate store of the change.
     */
    static onUpdate(e, connector) {
        const inputElement = e.target;
        if (inputElement) {
            const parentRow = inputElement
                .closest('.highcharts-datagrid-row');
            const cell = inputElement.closest('.highcharts-datagrid-cell');
            const converter = new DataConverter();
            if (parentRow &&
                parentRow instanceof HTMLElement &&
                cell &&
                cell instanceof HTMLElement) {
                const dataTableRowIndex = parentRow
                    .dataset.rowIndex;
                const { columnName } = cell.dataset;
                if (dataTableRowIndex !== void 0 &&
                    columnName !== void 0) {
                    const table = connector.table;
                    if (table) {
                        let valueToSet = converter
                            .asGuessedType(inputElement.value);
                        if (valueToSet instanceof Date) {
                            valueToSet = valueToSet.toString();
                        }
                        table.setCell(columnName, parseInt(dataTableRowIndex, 10), valueToSet);
                    }
                }
            }
        }
    }
    /** @private */
    static fromJSON(json, cell) {
        const options = json.options;
        const dataGridOptions = JSON.parse(json.options.dataGridOptions || '');
        const component = new DataGridComponent(cell, merge(options, {
            dataGridOptions,
            syncHandlers: DataGridComponent.syncHandlers
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
    constructor(cell, options) {
        options = merge(DataGridComponent.defaultOptions, options);
        super(cell, options);
        this.connectorListeners = [];
        this.options = options;
        this.type = 'DataGrid';
        if (this.options.dataGridClassName) {
            this.contentElement.classList.add(this.options.dataGridClassName);
        }
        if (this.options.dataGridID) {
            this.contentElement.id = this.options.dataGridID;
        }
        this.sync = new DataGridComponent.Sync(this, this.syncHandlers);
        this.dataGridOptions = (this.options.dataGridOptions ||
            {});
        this.innerResizeTimeouts = [];
        this.on('afterSetConnector', (e) => {
            this.disableEditingModifiedColumns(e.connector);
        });
    }
    onTableChanged() {
        var _a;
        if (this.dataGrid && !((_a = this.dataGrid) === null || _a === void 0 ? void 0 : _a.cellInputEl)) {
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
        var _a;
        const options = this.getColumnOptions(connector);
        (_a = this.dataGrid) === null || _a === void 0 ? void 0 : _a.update({ columns: options });
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
    load() {
        const _super = Object.create(null, {
            load: { get: () => super.load }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.emit({ type: 'load' });
            yield _super.load.call(this);
            if (this.connector &&
                !this.connectorListeners.length) {
                const connectorListeners = this.connectorListeners;
                // Reload the store when polling.
                connectorListeners.push(this.connector
                    .on('afterLoad', (e) => {
                    if (e.table && this.connector) {
                        this.connector.table.setColumns(e.table.getColumns());
                    }
                }));
                // Update the DataGrid when connector changed.
                connectorListeners.push(this.connector.table
                    .on('afterSetCell', (e) => {
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
                                if (cell.dataset.columnName === e.columnName &&
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
        });
    }
    /** @private */
    render() {
        super.render();
        if (!this.dataGrid) {
            this.dataGrid = this.constructDataGrid();
        }
        if (this.connector &&
            this.dataGrid &&
            this.dataGrid.dataTable.modified !== this.connector.table.modified) {
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
    update(options) {
        const _super = Object.create(null, {
            update: { get: () => super.update }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (((_a = options.connector) === null || _a === void 0 ? void 0 : _a.id) !== this.connectorId) {
                const connectorListeners = this.connectorListeners;
                for (let i = 0, iEnd = connectorListeners.length; i < iEnd; ++i) {
                    connectorListeners[i]();
                }
                connectorListeners.length = 0;
            }
            yield _super.update.call(this, options);
            if (this.dataGrid) {
                this.filterAndAssignSyncOptions(DataGridSyncHandlers);
                this.dataGrid.update(this.options.dataGridOptions || {});
            }
            this.emit({ type: 'afterUpdate' });
        });
    }
    /** @private */
    constructDataGrid() {
        var _a, _b;
        if (DataGridComponent.DataGridConstructor) {
            const columnOptions = this.connector ?
                this.getColumnOptions(this.connector) :
                {};
            this.dataGrid = new DataGridComponent.DataGridConstructor(this.contentElement, Object.assign(Object.assign({}, this.options.dataGridOptions), { dataTable: ((_a = this.options.dataGridOptions) === null || _a === void 0 ? void 0 : _a.dataTable) ||
                    this.filterColumns(), columns: merge(columnOptions, (_b = this.options.dataGridOptions) === null || _b === void 0 ? void 0 : _b.columns) }));
            return this.dataGrid;
        }
        throw new Error('DataGrid not connected.');
    }
    setupConnectorUpdate() {
        const { connector, dataGrid } = this;
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
        var _a;
        const table = (_a = this.connector) === null || _a === void 0 ? void 0 : _a.table.modified, visibleColumns = this.options.visibleColumns;
        if (table) {
            // Show all columns if no visibleColumns is provided.
            if (!(visibleColumns === null || visibleColumns === void 0 ? void 0 : visibleColumns.length)) {
                return table;
            }
            const columnsToDelete = table
                .getColumnNames()
                .filter((columnName) => ((visibleColumns === null || visibleColumns === void 0 ? void 0 : visibleColumns.length) > 0 &&
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
    /** @private */
    toJSON() {
        const dataGridOptions = JSON.stringify(this.options.dataGridOptions);
        const base = super.toJSON();
        const json = Object.assign(Object.assign({}, base), { options: Object.assign(Object.assign({}, base.options), { dataGridOptions }) });
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
        return Object.assign(Object.assign({}, diffObjects(this.options, DataGridComponent.defaultOptions)), { type: 'DataGrid' });
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/** @private */
DataGridComponent.syncHandlers = DataGridSyncHandlers;
/** @private */
DataGridComponent.defaultOptions = merge(Component.defaultOptions, {
    dataGridClassName: 'dataGrid-container',
    dataGridID: 'dataGrid-' + uniqueKey(),
    dataGridOptions: {},
    editableOptions: [{
            name: 'connectorName',
            propertyPath: ['connector', 'id'],
            type: 'select'
        }],
    syncHandlers: DataGridSyncHandlers,
    onUpdate: DataGridComponent.onUpdate
});
/* *
 *
 *  Default Export
 *
 * */
export default DataGridComponent;
