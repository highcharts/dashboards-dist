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
import U from '../../Core/Utilities.js';
const { createElement, merge, uniqueKey } = U;
import DataGridSyncHandlers from './DataGridSyncHandlers.js';
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
     * @param store
     * Relate store of the change.
     */
    static onUpdate(e, store) {
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
                    const table = store.table.modified;
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
        this.syncHandlers = this.handleSyncOptions(DataGridSyncHandlers);
        this.sync = new DataGridComponent.Sync(this, this.syncHandlers);
        this.dataGridOptions = this.options.dataGridOptions || {};
        this.innerResizeTimeouts = [];
        // Add the component instance to the registry
        Component.addInstance(this);
    }
    /* *
     *
     *  Class methods
     *
     * */
    /** @private */
    load() {
        this.emit({ type: 'load' });
        super.load();
        this.parentElement.appendChild(this.element);
        this.hasLoaded = true;
        if (this.connector &&
            !this.connectorListeners.length) {
            const connectorListeners = this.connectorListeners;
            // this.on('tableChanged', (): void => this.updateSeries());
            // Reload the store when polling.
            connectorListeners.push(this.connector
                .on('afterLoad', (e) => {
                if (e.table && this.connector) {
                    this.connector.table.setColumns(e.table.getColumns());
                }
            }));
            // Update the DataGrid when store changed.
            connectorListeners.push(this.connector.table
                .on('afterSetCell', (e) => {
                const dataGrid = this.dataGrid;
                let shouldUpdateTheGrid = true;
                if (dataGrid) {
                    const row = dataGrid.rowElements[e.rowIndex], cells = Array.prototype.slice.call(row.childNodes);
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
    }
    /** @private */
    render() {
        this.emit({ type: 'beforeRender' });
        super.render();
        if (!this.dataGrid) {
            this.dataGrid = this.constructDataGrid();
        }
        if (this.connector &&
            this.dataGrid &&
            this.dataGrid.dataTable.modified !== this.connector.table.modified) {
            this.dataGrid.update({ dataTable: this.connector.table.modified });
        }
        this.sync.start();
        this.emit({ type: 'afterRender' });
        this.setupConnectorUpdate();
        return this;
    }
    /** @private */
    redraw() {
        super.redraw();
        return this.render();
    }
    /** @private */
    resize(width, height) {
        if (this.dataGrid) {
            super.resize(width, height);
            this.dataGrid.setSize(width, height);
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
                this.dataGrid.update(this.options.dataGridOptions || {});
            }
            this.emit({ type: 'afterUpdate' });
        });
    }
    /** @private */
    constructDataGrid() {
        if (DataGridComponent.DataGridConstructor) {
            this.dataGrid = new DataGridComponent.DataGridConstructor(this.contentElement, Object.assign(Object.assign({}, this.options.dataGridOptions), { dataTable: this.connector && this.connector.table.modified }));
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
    /** @private */
    toJSON() {
        const dataGridOptions = JSON.stringify(this.options.dataGridOptions);
        const base = super.toJSON();
        const json = Object.assign(Object.assign({}, base), { options: Object.assign(Object.assign({}, base.options), { dataGridOptions }) });
        this.emit({ type: 'toJSON', json });
        return json;
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
