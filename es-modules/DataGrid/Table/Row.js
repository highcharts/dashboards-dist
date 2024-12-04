/* *
 *
 *  DataGrid class
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
import DGUtils from '../Utils.js';
const { makeHTMLElement } = DGUtils;
/* *
 *
 *  Abstract Class of Row
 *
 * */
/**
 * Represents a row in the data grid.
 */
class Row {
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Constructs a row in the data grid.
     *
     * @param viewport
     * The DataGrid Table instance which the row belongs to.
     */
    constructor(viewport) {
        /* *
        *
        *  Properties
        *
        * */
        /**
         * The cells of the row.
         */
        this.cells = [];
        this.viewport = viewport;
        this.htmlElement = makeHTMLElement('tr', {});
    }
    /**
     * Renders the row's content. It does not attach the row element to the
     * viewport nor pushes the rows to the viewport.rows array.
     */
    render() {
        const columns = this.viewport.columns;
        for (let i = 0, iEnd = columns.length; i < iEnd; i++) {
            const cell = this.createCell(columns[i]);
            cell.render();
        }
        this.reflow();
    }
    /**
     * Reflows the row's content dimensions.
     */
    reflow() {
        for (let j = 0, jEnd = this.cells.length; j < jEnd; ++j) {
            this.cells[j].reflow();
        }
        const vp = this.viewport;
        if (vp.rowsWidth) {
            this.htmlElement.style.width = vp.rowsWidth + 'px';
        }
    }
    /**
     * Destroys the row.
     */
    destroy() {
        this.destroyed = true;
        if (!this.htmlElement) {
            return;
        }
        for (let i = 0, iEnd = this.cells.length; i < iEnd; ++i) {
            this.cells[i].destroy();
        }
        this.htmlElement.remove();
    }
    /**
     * Returns the cell with the given column ID.
     *
     * @param columnId
     * The column ID that the cell belongs to.
     *
     * @returns
     * The cell with the given column ID or undefined if not found.
     */
    getCell(columnId) {
        return this.cells.find((cell) => cell.column.id === columnId);
    }
    /**
     * Registers a cell in the row.
     *
     * @param cell
     * The cell to register.
     */
    registerCell(cell) {
        this.cells.push(cell);
    }
    /**
     * Unregister a cell from the row.
     *
     * @param cell
     * The cell to unregister.
     */
    unregisterCell(cell) {
        if (this.destroyed) {
            return;
        }
        const index = this.cells.indexOf(cell);
        if (index > -1) {
            this.cells.splice(index, 1);
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default Row;
