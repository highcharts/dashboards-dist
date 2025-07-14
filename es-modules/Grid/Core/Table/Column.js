/* *
 *
 *  Grid Column class
 *
 *  (c) 2020-2025 Highsoft AS
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
import Utils from '../../../Core/Utilities.js';
import Templating from '../../../Core/Templating.js';
import TextContent from './CellContent/TextContent.js';
import Globals from '../Globals.js';
const { defined, merge, fireEvent } = Utils;
/* *
 *
 *  Class
 *
 * */
/**
 * Represents a column in the data grid.
 */
class Column {
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Constructs a column in the data grid.
     *
     * @param viewport
     * The viewport (table) the column belongs to.
     *
     * @param id
     * The id of the column (`name` in the Data Table).
     *
     * @param index
     * The index of the column.
     */
    constructor(viewport, id, index) {
        /**
         * The cells of the column.
         */
        this.cells = [];
        const { grid } = viewport;
        this.id = id;
        this.index = index;
        this.viewport = viewport;
        this.loadData();
        this.dataType = this.assumeDataType();
        this.options = merge(grid.options?.columnDefaults ?? {}, grid.columnOptionsMap?.[id]?.options ?? {});
        fireEvent(this, 'afterInit');
    }
    /* *
    *
    *  Methods
    *
    * */
    /**
     * Loads the data of the column from the viewport's data table.
     */
    loadData() {
        this.data = this.viewport.dataTable.getColumn(this.id, true);
    }
    /**
     * Creates a cell content instance.
     *
     * @param cell
     * The cell that is to be edited.
     *
     */
    createCellContent(cell) {
        return new TextContent(cell);
    }
    /**
     * Assumes the data type of the column based on the options or data in the
     * column if not specified.
     */
    assumeDataType() {
        const { grid } = this.viewport;
        const type = grid.columnOptionsMap?.[this.id]?.options.dataType ??
            grid.options?.columnDefaults?.dataType;
        if (type) {
            return type;
        }
        if (!this.data) {
            return 'string';
        }
        if (!Array.isArray(this.data)) {
            // Typed array
            return 'number';
        }
        for (let i = 0, iEnd = Math.min(this.data.length, 30); i < iEnd; ++i) {
            if (!defined(this.data[i])) {
                // If the data is null or undefined, we should look
                // at the next value to determine the type.
                continue;
            }
            switch (typeof this.data[i]) {
                case 'number':
                    return 'number';
                case 'boolean':
                    return 'boolean';
                default:
                    return 'string';
            }
        }
        // eslint-disable-next-line no-console
        console.warn(`Column "${this.id}" contains too few data points with ` +
            'unambiguous types to correctly determine its dataType. It\'s ' +
            'recommended to set the `dataType` option for it.');
        return 'string';
    }
    /**
     * Registers a cell in the column.
     *
     * @param cell
     * The cell to register.
     */
    registerCell(cell) {
        cell.htmlElement.setAttribute('data-column-id', this.id);
        if (this.options.className) {
            cell.htmlElement.classList.add(...this.options.className.split(/\s+/g));
        }
        if (this.viewport.grid.hoveredColumnId === this.id) {
            cell.htmlElement.classList.add(Globals.getClassName('hoveredColumn'));
        }
        this.cells.push(cell);
    }
    /**
     * Unregister a cell from the column.
     *
     * @param cell
     * The cell to unregister.
     */
    unregisterCell(cell) {
        const index = this.cells.indexOf(cell);
        if (index > -1) {
            this.cells.splice(index, 1);
        }
    }
    /**
     * Returns the width of the column in pixels.
     */
    getWidth() {
        return this.viewport.columnDistribution.getColumnWidth(this);
    }
    /**
     * Adds or removes the hovered CSS class to the column element
     * and its cells.
     *
     * @param hovered
     * Whether the column should be hovered.
     */
    setHoveredState(hovered) {
        this.header?.htmlElement?.classList[hovered ? 'add' : 'remove'](Globals.getClassName('hoveredColumn'));
        for (let i = 0, iEnd = this.cells.length; i < iEnd; ++i) {
            this.cells[i].htmlElement.classList[hovered ? 'add' : 'remove'](Globals.getClassName('hoveredColumn'));
        }
    }
    /**
     * Adds or removes the synced CSS class to the column element
     * and its cells.
     *
     * @param synced
     * Whether the column should have synced state.
     */
    setSyncedState(synced) {
        this.header?.htmlElement?.classList[synced ? 'add' : 'remove'](Globals.getClassName('syncedColumn'));
        for (let i = 0, iEnd = this.cells.length; i < iEnd; ++i) {
            this.cells[i].htmlElement.classList[synced ? 'add' : 'remove'](Globals.getClassName('syncedColumn'));
        }
    }
    /**
     * Returns the formatted string where the templating context is the column.
     *
     * @param template
     * The template string.
     *
     * @return
     * The formatted string.
     */
    format(template) {
        return Templating.format(template, this, this.viewport.grid);
    }
    /**
     * Updates the column with new options.
     *
     * @param newOptions
     * The new options for the column.
     *
     * @param render
     * Whether to re-render after the update. If `false`, the update will just
     * extend the options object. Defaults to `true`.
     */
    async update(newOptions, render = true) {
        await this.viewport.grid.updateColumn(this.id, newOptions, render);
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default Column;
