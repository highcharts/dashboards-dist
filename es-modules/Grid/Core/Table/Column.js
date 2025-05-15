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
import Globals from '../Globals.js';
const { merge } = Utils;
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
        this.options = merge(viewport.grid.options?.columnDefaults ?? {}, viewport.grid.columnOptionsMap?.[id] ?? {});
        this.id = id;
        this.index = index;
        this.viewport = viewport;
        this.loadData();
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
}
/* *
 *
 *  Default Export
 *
 * */
export default Column;
