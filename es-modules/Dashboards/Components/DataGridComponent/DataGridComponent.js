/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Karol Kolodziej
 *  - Dawid Dragula
 *
 * */
'use strict';
import Component from '../Component.js';
import DataGridSyncs from './DataGridSyncs/DataGridSyncs.js';
import GridComponentDefaults from './DataGridComponentDefaults.js';
import U from '../../../Core/Utilities.js';
import DU from '../../Utilities.js';
const { merge, diffObjects, getStyle } = U;
const { deepClone } = DU;
/* *
 *
 *  Class
 *
 * */
/**
 * Grid Component for Highcharts Dashboards.
 * @private
 */
class DataGridComponent extends Component {
    /**
     * The namespace of the Grid Component.
     * @deprecated
     * DataGrid will be removed in behalf of Grid in the next major version.
     */
    static get DataGridNamespace() {
        return DataGridComponent.GridNamespace;
    }
    /* *
     *
     *  Properties
     *
     * */
    /**
     * The Grid that is rendered in the Grid Component.
     * @deprecated
     * DataGrid will be removed in behalf of Grid in the next major version.
     */
    get dataGrid() {
        return this.grid;
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor(cell, options, board) {
        options = merge(DataGridComponent.defaultOptions, options);
        super(cell, options, board);
        this.options = options;
        this.type = 'Grid';
        this.setOptions();
    }
    /* *
     *
     *  Functions
     *
     * */
    async update(options) {
        await super.update(options);
        this.setOptions();
        if (this.grid) {
            this.grid.update(merge({}, options.gridOptions, options.dataGridOptions), false);
            if (this.grid?.viewport?.dataTable?.id !==
                this.getFirstConnector()?.table?.id) {
                this.grid.update({
                    dataTable: this.getFirstConnector()?.table?.modified
                }, false);
            }
            this.grid.renderViewport();
        }
        this.emit({ type: 'afterUpdate' });
    }
    render() {
        super.render();
        if (!this.grid) {
            this.grid = this.constructGrid();
        }
        else {
            this.grid.renderViewport();
        }
        this.grid.initialContainerHeight =
            getStyle(this.parentElement, 'height', true) || 0;
        this.sync.start();
        this.emit({ type: 'afterRender' });
        return this;
    }
    resize(width, height) {
        if (height) {
            this.contentElement.style.minHeight = '0';
        }
        else if (height === null) {
            this.contentElement.style.removeProperty('min-height');
        }
        this.resizeDynamicContent(width, height);
        this.grid?.viewport?.reflow();
    }
    onTableChanged() {
        const { grid } = this;
        if (!grid) {
            return;
        }
        const dataTable = this.getFirstConnector()?.getTable(this.dataTableKey);
        if (!dataTable?.modified) {
            grid.update({ dataTable: void 0 });
            return;
        }
        if (!grid.options?.header) {
            // If the header is not defined, we need to check if the column
            // names have changed, so we can update the whole grid. If they
            // have not changed, we can just update the rows (more efficient).
            const newColumnNames = dataTable.modified.getColumnNames();
            const { columnOptionsMap, enabledColumns } = grid;
            let index = 0;
            for (const newColumn of newColumnNames) {
                if (columnOptionsMap[newColumn]?.options?.enabled === false) {
                    continue;
                }
                if (enabledColumns?.[index] !== newColumn) {
                    // If the visible columns have changed,
                    // update the whole grid.
                    grid.update({ dataTable: dataTable.modified });
                    return;
                }
                index++;
            }
        }
        grid.dataTable = dataTable?.modified;
        // Data has changed and the whole grid is not re-rendered, so mark in
        // the querying that data table was modified.
        grid.querying.shouldBeUpdated = true;
        // If the column names have not changed, just update the rows.
        grid.viewport?.updateRows();
    }
    getEditableOptions() {
        const componentOptions = this.options;
        const gridOptions = this.grid?.options;
        return deepClone(merge({
            gridOptions: gridOptions
        }, componentOptions), ['editableOptions', 'dataTable']);
    }
    getOptionsOnDrop(sidebar) {
        const connectorsIds = sidebar.editMode.board.dataPool.getConnectorIds();
        let options = {
            cell: '',
            type: 'Grid'
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
    /**
     * Get the Grid Component's options.
     *
     * @returns
     * Grid Component's options.
     *
     * @internal
     */
    getOptions() {
        // Remove the table from the options copy if the connector is set.
        const optionsCopy = merge(this.options);
        if (optionsCopy.connector?.id) {
            delete optionsCopy.gridOptions?.dataTable;
        }
        else if (optionsCopy.gridOptions?.dataTable?.id) {
            optionsCopy.gridOptions.dataTable = {
                columns: optionsCopy.gridOptions.dataTable.columns
            };
        }
        return {
            ...diffObjects(optionsCopy, DataGridComponent.defaultOptions),
            type: 'Grid'
        };
    }
    /**
     * Destroys the data grid component.
     */
    destroy() {
        this.sync.stop();
        this.grid?.destroy();
        super.destroy();
    }
    /**
     * Sets the options for the data grid component content container.
     */
    setOptions() {
        const options = this.options, gridClassName = options.gridClassName || options.dataGridClassName, gridID = options.gridID || options.dataGridID;
        if (gridClassName) {
            this.contentElement.classList.value =
                GridComponentDefaults.className + ' ' +
                    gridClassName;
        }
        if (gridID) {
            this.contentElement.id = gridID;
        }
    }
    /**
     * Function to create the Grid.
     *
     * @returns The Grid.
     */
    constructGrid() {
        const DGN = DataGridComponent.GridNamespace;
        if (!DGN) {
            throw new Error('Grid not connected.');
        }
        const dataTable = this.getFirstConnector()?.getTable(this.dataTableKey), options = this.options, gridOptions = merge({}, options.gridOptions, options.dataGridOptions);
        if (dataTable) {
            gridOptions.dataTable = dataTable.modified;
        }
        const dataGridInstance = new DGN.Grid(this.contentElement, gridOptions);
        this.options.gridOptions = dataGridInstance.options;
        return dataGridInstance;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * Predefined sync config for the Grid Component.
 */
DataGridComponent.predefinedSyncConfig = DataGridSyncs;
/**
 * The default options for the Grid Component.
 */
DataGridComponent.defaultOptions = merge(Component.defaultOptions, GridComponentDefaults);
/* *
 *
 *  Default Export
 *
 * */
export default DataGridComponent;
