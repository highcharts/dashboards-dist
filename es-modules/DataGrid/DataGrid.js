/* *
 *
 *  Data Grid class
 *
 *  (c) 2020-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *  - Sebastian Bochan
 *
 * */
'use strict';
import AST from '../Core/Renderer/HTML/AST.js';
import Credits from './Credits.js';
import DataGridDefaultOptions from './DefaultOptions.js';
import Table from './Table/Table.js';
import DataGridUtils from './Utils.js';
import DataTable from '../Data/DataTable.js';
import QueryingController from './Querying/QueryingController.js';
import Globals from './Globals.js';
import U from '../Core/Utilities.js';
const { makeHTMLElement } = DataGridUtils;
const { win } = Globals;
const { merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Creates a grid structure (table).
 */
class DataGrid {
    // Implementation
    static dataGrid(renderTo, options, async) {
        if (async) {
            return new Promise((resolve) => {
                void new DataGrid(renderTo, options, (dataGrid) => {
                    resolve(dataGrid);
                });
            });
        }
        return new DataGrid(renderTo, options);
    }
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Constructs a new data grid.
     *
     * @param renderTo
     * The render target (container) of the data grid.
     *
     * @param options
     * The options of the data grid.
     *
     * @param afterLoadCallback
     * The callback that is called after the data grid is loaded.
     */
    constructor(renderTo, options, afterLoadCallback) {
        /**
         * The user options declared for the columns as an object of column ID to
         * column options.
         */
        this.columnOptionsMap = {};
        /**
         * The options that were declared by the user when creating the data grid
         * or when updating it.
         */
        this.userOptions = {};
        this.loadUserOptions(options);
        this.querying = new QueryingController(this);
        this.initContainers(renderTo);
        this.loadDataTable(this.options?.dataTable);
        this.querying.loadOptions();
        void this.querying.proceed().then(() => {
            this.renderViewport();
            afterLoadCallback?.(this);
        });
        DataGrid.dataGrids.push(this);
    }
    /* *
     *
     *  Methods
     *
     * */
    /**
     * Initializes the container of the data grid.
     *
     * @param renderTo
     * The render target (html element or id) of the data grid.
     *
     */
    initContainers(renderTo) {
        const container = (typeof renderTo === 'string') ?
            win.document.getElementById(renderTo) : renderTo;
        // Display an error if the renderTo is wrong
        if (!container) {
            // eslint-disable-next-line no-console
            console.error(`
                Rendering div not found. It is unable to find the HTML element
                to render the DataGrid in.
            `);
            return;
        }
        this.container = container;
        this.container.innerHTML = AST.emptyHTML;
        this.contentWrapper = makeHTMLElement('div', {
            className: Globals.classNames.container
        }, this.container);
    }
    /**
     * Loads the new user options to all the important fields (`userOptions`,
     * `options` and `columnOptionsMap`).
     *
     * @param newOptions
     * The options that were declared by the user.
     *
     * @param oneToOne
     * When `false` (default), the existing column options will be merged with
     * the ones that are currently defined in the user options. When `true`,
     * the columns not defined in the new options will be removed.
     */
    loadUserOptions(newOptions, oneToOne = false) {
        // Operate on a copy of the options argument
        newOptions = merge(newOptions);
        if (newOptions.columns) {
            if (oneToOne) {
                this.loadColumnOptionsOneToOne(newOptions.columns);
            }
            else {
                this.loadColumnOptions(newOptions.columns);
            }
            delete newOptions.columns;
        }
        this.userOptions = merge(this.userOptions, newOptions);
        this.options = merge(this.options ?? DataGrid.defaultOptions, this.userOptions);
        const columnOptionsArray = this.options?.columns;
        if (!columnOptionsArray) {
            return;
        }
        const columnOptionsObj = {};
        for (let i = 0, iEnd = columnOptionsArray?.length ?? 0; i < iEnd; ++i) {
            columnOptionsObj[columnOptionsArray[i].id] = columnOptionsArray[i];
        }
        this.columnOptionsMap = columnOptionsObj;
    }
    /**
     * Loads the new column options to the userOptions field.
     *
     * @param newColumnOptions
     * The new column options that should be loaded.
     *
     * @param overwrite
     * Whether to overwrite the existing column options with the new ones.
     * Default is `false`.
     */
    loadColumnOptions(newColumnOptions, overwrite = false) {
        if (!this.userOptions.columns) {
            this.userOptions.columns = [];
        }
        const columnOptions = this.userOptions.columns;
        for (let i = 0, iEnd = newColumnOptions.length; i < iEnd; ++i) {
            const newOptions = newColumnOptions[i];
            const indexInPrevOptions = columnOptions.findIndex((prev) => prev.id === newOptions.id);
            // If the new column options contain only the id.
            if (Object.keys(newOptions).length < 2) {
                if (overwrite && indexInPrevOptions !== -1) {
                    columnOptions.splice(indexInPrevOptions, 1);
                }
                continue;
            }
            if (indexInPrevOptions === -1) {
                columnOptions.push(newOptions);
            }
            else if (overwrite) {
                columnOptions[indexInPrevOptions] = newOptions;
            }
            else {
                columnOptions[indexInPrevOptions] = merge(columnOptions[indexInPrevOptions], newOptions);
            }
        }
        if (columnOptions.length < 1) {
            delete this.userOptions.columns;
        }
    }
    /**
     * Loads the new column options to the userOptions field in a one-to-one
     * manner. It means that all the columns that are not defined in the new
     * options will be removed.
     *
     * @param newColumnOptions
     * The new column options that should be loaded.
     */
    loadColumnOptionsOneToOne(newColumnOptions) {
        const prevColumnOptions = this.userOptions.columns;
        const columnOptions = [];
        let prevOptions;
        for (let i = 0, iEnd = newColumnOptions.length; i < iEnd; ++i) {
            const newOptions = newColumnOptions[i];
            const indexInPrevOptions = prevColumnOptions?.findIndex((prev) => prev.id === newOptions.id);
            if (indexInPrevOptions !== void 0 && indexInPrevOptions !== -1) {
                prevOptions = prevColumnOptions?.[indexInPrevOptions];
            }
            const resultOptions = merge(prevOptions ?? {}, newOptions);
            if (Object.keys(resultOptions).length > 1) {
                columnOptions.push(resultOptions);
            }
        }
        this.userOptions.columns = columnOptions;
    }
    /**
     * Updates the data grid with new options.
     *
     * @param options
     * The options of the data grid that should be updated. If not provided,
     * the update will be proceeded based on the `this.userOptions` property.
     * The `column` options are merged using the `id` property as a key.
     *
     * @param render
     * Whether to re-render the data grid after updating the options.
     *
     * @param oneToOne
     * When `false` (default), the existing column options will be merged with
     * the ones that are currently defined in the user options. When `true`,
     * the columns not defined in the new options will be removed.
     */
    async update(options = {}, render = true, oneToOne = false) {
        this.loadUserOptions(options, oneToOne);
        let newDataTable = false;
        if (!this.dataTable || options.dataTable) {
            this.userOptions.dataTable = options.dataTable;
            (this.options ?? {}).dataTable = options.dataTable;
            this.loadDataTable(this.options?.dataTable);
            newDataTable = true;
        }
        this.querying.loadOptions();
        if (render) {
            await this.querying.proceed(newDataTable);
            this.renderViewport();
        }
    }
    /**
     * Updates the column of the data grid with new options.
     *
     * @param columnId
     * The ID of the column that should be updated.
     *
     * @param options
     * The options of the columns that should be updated. If null,
     * column options for this column ID will be removed.
     *
     * @param render
     * Whether to re-render the data grid after updating the columns.
     *
     * @param overwrite
     * If true, the column options will be updated by replacing the existing
     * options with the new ones instead of merging them.
     */
    async updateColumn(columnId, options, render = true, overwrite = false) {
        this.loadColumnOptions([{
                id: columnId,
                ...options
            }], overwrite);
        await this.update(void 0, render);
    }
    /**
     * Hovers the row with the provided index. It removes the hover effect from
     * the previously hovered row.
     *
     * @param rowIndex
     * The index of the row.
     */
    hoverRow(rowIndex) {
        const rows = this.viewport?.rows;
        if (!rows) {
            return;
        }
        const firstRowIndex = this.viewport?.rows[0]?.index ?? 0;
        if (this.hoveredRowIndex !== void 0) {
            rows[this.hoveredRowIndex - firstRowIndex]?.setHoveredState(false);
        }
        if (rowIndex !== void 0) {
            rows[rowIndex - firstRowIndex]?.setHoveredState(true);
        }
        this.hoveredRowIndex = rowIndex;
    }
    /**
     * Hovers the column with the provided ID. It removes the hover effect from
     * the previously hovered column.
     *
     * @param columnId
     * The ID of the column.
     */
    hoverColumn(columnId) {
        const vp = this.viewport;
        if (!vp) {
            return;
        }
        if (this.hoveredColumnId) {
            vp.getColumn(this.hoveredColumnId)?.setHoveredState(false);
        }
        if (columnId) {
            vp.getColumn(columnId)?.setHoveredState(true);
        }
        this.hoveredColumnId = columnId;
    }
    /**
     * Renders the viewport of the data grid. If the data grid is already
     * rendered, it will be destroyed and re-rendered with the new data.
     * @internal
     */
    renderViewport() {
        let vp = this.viewport;
        const viewportMeta = vp?.getStateMeta();
        this.enabledColumns = this.getEnabledColumnIDs();
        this.credits?.destroy();
        vp?.destroy();
        if (this.contentWrapper) {
            this.contentWrapper.innerHTML = AST.emptyHTML;
        }
        if (this.enabledColumns.length > 0) {
            this.renderTable();
            vp = this.viewport;
            if (viewportMeta && vp) {
                vp.applyStateMeta(viewportMeta);
            }
        }
        else {
            this.renderNoData();
        }
        if (this.options?.credits?.enabled) {
            this.credits = new Credits(this);
        }
        this.viewport?.reflow();
    }
    /**
     * Renders the table (viewport) of the data grid.
     */
    renderTable() {
        this.tableElement = makeHTMLElement('table', {
            className: Globals.classNames.tableElement
        }, this.contentWrapper);
        this.viewport = new Table(this, this.tableElement);
        // Accessibility
        this.tableElement.setAttribute('aria-rowcount', this.dataTable?.getRowCount() ?? 0);
    }
    /**
     * Renders a message that there is no data to display.
     */
    renderNoData() {
        makeHTMLElement('div', {
            className: Globals.classNames.noData,
            innerText: 'No data to display'
        }, this.contentWrapper);
    }
    /**
     * Returns the array of IDs of columns that should be displayed in the data
     * grid, in the correct order.
     */
    getEnabledColumnIDs() {
        const { columnOptionsMap } = this;
        const header = this.options?.header;
        const headerColumns = this.getColumnIds(header || [], false);
        const columnsIncluded = this.options?.rendering?.columns?.included || (headerColumns && headerColumns.length > 0 ?
            headerColumns : this.dataTable?.getColumnNames());
        if (!columnsIncluded?.length) {
            return [];
        }
        if (!columnOptionsMap) {
            return columnsIncluded;
        }
        let columnName;
        const result = [];
        for (let i = 0, iEnd = columnsIncluded.length; i < iEnd; ++i) {
            columnName = columnsIncluded[i];
            if (columnOptionsMap?.[columnName]?.enabled !== false) {
                result.push(columnName);
            }
        }
        return result;
    }
    loadDataTable(tableOptions) {
        // If the table is passed as a reference, it should be used instead of
        // creating a new one.
        if (tableOptions?.id) {
            this.dataTable = tableOptions;
            this.presentationTable = this.dataTable.modified;
            return;
        }
        this.dataTable = this.presentationTable =
            new DataTable(tableOptions);
    }
    /**
     * Extracts all references to columnIds on all levels below defined level
     * in the settings.header structure.
     *
     * @param columns
     * Structure that we start calculation
     *
     * @param [onlyEnabledColumns=true]
     * Extract all columns from header or columns filtered by enabled param
     * @returns
     */
    getColumnIds(columns, onlyEnabledColumns = true) {
        let columnIds = [];
        const { enabledColumns } = this;
        for (const column of columns) {
            const columnId = typeof column === 'string' ? column : column.columnId;
            if (columnId &&
                (!onlyEnabledColumns || (enabledColumns?.includes(columnId)))) {
                columnIds.push(columnId);
            }
            if (typeof column !== 'string' && column.columns) {
                columnIds = columnIds.concat(this.getColumnIds(column.columns, onlyEnabledColumns));
            }
        }
        return columnIds;
    }
    /**
     * Destroys the data grid.
     */
    destroy() {
        const dgIndex = DataGrid.dataGrids.findIndex((dg) => dg === this);
        this.viewport?.destroy();
        if (this.container) {
            this.container.innerHTML = AST.emptyHTML;
            this.container.classList.remove(Globals.classNames.container);
        }
        // Clear all properties
        Object.keys(this).forEach((key) => {
            delete this[key];
        });
        DataGrid.dataGrids.splice(dgIndex, 1);
    }
    /**
     * Returns the current dataGrid data as a JSON string.
     *
     * @return
     * JSON representation of the data
     */
    getJSON() {
        const json = this.viewport?.dataTable.modified.columns;
        if (!this.enabledColumns || !json) {
            return '{}';
        }
        for (const key of Object.keys(json)) {
            if (this.enabledColumns.indexOf(key) === -1) {
                delete json[key];
            }
        }
        return JSON.stringify(json);
    }
    /**
     * Returns the current DataGrid options as a JSON string.
     *
     * @param onlyUserOptions
     * Whether to return only the user options or all options (user options
     * merged with the default ones). Default is `true`.
     *
     * @returns
     * Options as a JSON string.
     */
    getOptionsJSON(onlyUserOptions = true) {
        const optionsCopy = onlyUserOptions ? merge(this.userOptions) : merge(this.options);
        if (optionsCopy.dataTable?.id) {
            optionsCopy.dataTable = {
                columns: optionsCopy.dataTable.columns
            };
        }
        return JSON.stringify(optionsCopy);
    }
}
/* *
*
*  Properties
*
* */
/**
 * Default options for all DataGrid instances.
 * @internal
 */
DataGrid.defaultOptions = DataGridDefaultOptions;
/**
 * An array containing the current DataGrid objects in the page.
 */
DataGrid.dataGrids = [];
/* *
 *
 *  Default Export
 *
 * */
export default DataGrid;
