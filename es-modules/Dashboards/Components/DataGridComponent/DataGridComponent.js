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
 *  - Dawid Dragula
 *
 * */
'use strict';
import Component from '../Component.js';
import DataGridSyncs from './DataGridSyncs/DataGridSyncs.js';
import DataGridComponentDefaults from './DataGridComponentDefaults.js';
import U from '../../../Core/Utilities.js';
const { merge, diffObjects } = U;
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
     * Function to create a DataGrid component from JSON.
     *
     * @param json
     * The JSON to create the DataGrid component from.
     *
     * @param cell
     * The cell to create the DataGrid component in.
     *
     * @returns
     * The DataGrid component created from the JSON.
     */
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
        this.options = options;
        this.type = 'DataGrid';
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
        if (this.dataGrid) {
            this.dataGrid.update(this.options.dataGridOptions ?? {}, false);
            if (this.dataGrid?.viewport?.dataTable?.id !==
                this.getFirstConnector()?.table?.id) {
                this.dataGrid.update({
                    dataTable: this.getFirstConnector()?.table?.modified
                }, false);
            }
            this.dataGrid.renderViewport();
        }
        this.emit({ type: 'afterUpdate' });
    }
    render() {
        super.render();
        if (!this.dataGrid) {
            this.dataGrid = this.constructDataGrid();
        }
        else {
            this.dataGrid.renderViewport();
        }
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
        this.dataGrid?.viewport?.reflow();
    }
    onTableChanged() {
        this.dataGrid?.update({
            dataTable: this.getFirstConnector()?.table?.modified
        });
    }
    getEditableOptions() {
        const componentOptions = this.options;
        const dataGridOptions = this.dataGrid?.options;
        return merge({
            dataGridOptions: dataGridOptions
        }, componentOptions);
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
    /**
     * Get the DataGrid component's options.
     *
     * @returns
     * The JSON of DataGrid component's options.
     *
     * @internal
     */
    getOptions() {
        // Remove the table from the options copy if the connector is set.
        const optionsCopy = merge(this.options);
        if (optionsCopy.connector?.id) {
            delete optionsCopy.dataGridOptions?.dataTable;
        }
        else if (optionsCopy.dataGridOptions?.dataTable?.id) {
            optionsCopy.dataGridOptions.dataTable = {
                columns: optionsCopy.dataGridOptions.dataTable.columns
            };
        }
        return {
            ...diffObjects(optionsCopy, DataGridComponent.defaultOptions),
            type: 'DataGrid'
        };
    }
    /**
     * Destroys the data grid component.
     */
    destroy() {
        this.sync.stop();
        this.dataGrid?.destroy();
        super.destroy();
    }
    /**
     * Sets the options for the data grid component content container.
     */
    setOptions() {
        if (this.options.dataGridClassName) {
            this.contentElement.classList.value =
                DataGridComponentDefaults.className + ' ' +
                    this.options.dataGridClassName;
        }
        if (this.options.dataGridID) {
            this.contentElement.id = this.options.dataGridID;
        }
    }
    /**
     * Function to create the DataGrid.
     *
     * @returns The DataGrid.
     */
    constructDataGrid() {
        const DGN = DataGridComponent.DataGridNamespace;
        if (!DGN) {
            throw new Error('DataGrid not connected.');
        }
        const dataTable = this.getFirstConnector()?.table;
        const dataGridOptions = this.options.dataGridOptions ?? {};
        if (dataTable) {
            dataGridOptions.dataTable = dataTable.modified;
        }
        const dataGridInstance = new DGN.DataGrid(this.contentElement, dataGridOptions);
        this.options.dataGridOptions = dataGridInstance.options;
        return dataGridInstance;
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
/**
 * The default options for the DataGrid component.
 */
DataGridComponent.defaultOptions = merge(Component.defaultOptions, DataGridComponentDefaults);
/* *
 *
 *  Default Export
 *
 * */
export default DataGridComponent;
