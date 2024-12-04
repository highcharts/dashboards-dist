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
import Row from '../Row.js';
import TableCell from './TableCell.js';
import Globals from '../../Globals.js';
/* *
 *
 *  Class
 *
 * */
/**
 * Represents a row in the data grid.
 */
class TableRow extends Row {
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
     *
     * @param index
     * The index of the row in the data table.
     */
    constructor(viewport, index) {
        super(viewport);
        this.index = index;
        this.id = viewport.dataTable.getOriginalRowIndex(index);
        this.setRowAttributes();
    }
    /* *
    *
    *  Methods
    *
    * */
    createCell(column) {
        return new TableCell(column, this);
    }
    /**
     * Adds or removes the hovered CSS class to the row element.
     *
     * @param hovered
     * Whether the row should be hovered.
     */
    setHoveredState(hovered) {
        this.htmlElement.classList[hovered ? 'add' : 'remove'](Globals.classNames.hoveredRow);
        if (hovered) {
            this.viewport.dataGrid.hoveredRowIndex = this.index;
        }
    }
    /**
     * Sets the row HTML element attributes and additional classes.
     */
    setRowAttributes() {
        const idx = this.index;
        const el = this.htmlElement;
        const a11y = this.viewport.dataGrid.accessibility;
        el.style.transform = `translateY(${this.getDefaultTopOffset()}px)`;
        el.classList.add(Globals.classNames.rowElement);
        // Index of the row in the presentation data table
        el.setAttribute('data-row-index', idx);
        // Index of the row in the original data table (ID)
        if (this.id !== void 0) {
            el.setAttribute('data-row-id', this.id);
        }
        // Calculate levels of header, 1 to avoid indexing from 0
        a11y?.setRowIndex(el, idx + (this.viewport.header?.levels ?? 1) + 1);
        // Indexing from 0, so rows with even index are odd.
        el.classList.add(Globals.classNames[idx % 2 ? 'rowEven' : 'rowOdd']);
        if (this.viewport.dataGrid.hoveredRowIndex === idx) {
            el.classList.add(Globals.classNames.hoveredRow);
        }
    }
    /**
     * Returns the default top offset of the row (before adjusting row heights).
     * @internal
     */
    getDefaultTopOffset() {
        return this.index * this.viewport.rowsVirtualizer.defaultRowHeight;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default TableRow;
