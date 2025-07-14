/* *
 *
 *  Grid TableRow class
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
     * The Grid Table instance which the row belongs to.
     *
     * @param index
     * The index of the row in the data table.
     */
    constructor(viewport, index) {
        super(viewport);
        /* *
        *
        *  Properties
        *
        * */
        /**
         * The row values from the data table in the original column order.
         */
        this.data = {};
        /**
         * The vertical translation of the row.
         */
        this.translateY = 0;
        this.index = index;
        this.id = viewport.dataTable.getOriginalRowIndex(index);
        this.loadData();
        this.setRowAttributes();
    }
    /* *
    *
    *  Methods
    *
    * */
    createCell(column) {
        return new TableCell(this, column);
    }
    /**
     * Loads the row data from the data table.
     */
    loadData() {
        const data = this.viewport.dataTable.getRowObject(this.index);
        if (!data) {
            return;
        }
        this.data = data;
    }
    /**
     * Updates the row data and its cells with the latest values from the data
     * table.
     */
    update() {
        this.id = this.viewport.dataTable.getOriginalRowIndex(this.index);
        this.updateRowAttributes();
        this.loadData();
        for (let i = 0, iEnd = this.cells.length; i < iEnd; ++i) {
            const cell = this.cells[i];
            void cell.setValue();
        }
        this.reflow();
    }
    /**
     * Adds or removes the hovered CSS class to the row element.
     *
     * @param hovered
     * Whether the row should be hovered.
     */
    setHoveredState(hovered) {
        this.htmlElement.classList[hovered ? 'add' : 'remove'](Globals.getClassName('hoveredRow'));
        if (hovered) {
            this.viewport.grid.hoveredRowIndex = this.index;
        }
    }
    /**
     * Adds or removes the synced CSS class to the row element.
     *
     * @param synced
     * Whether the row should be synced.
     */
    setSyncedState(synced) {
        this.htmlElement.classList[synced ? 'add' : 'remove'](Globals.getClassName('syncedRow'));
        if (synced) {
            this.viewport.grid.syncedRowIndex = this.index;
        }
    }
    /**
     * Sets the row HTML element attributes and additional classes.
     */
    setRowAttributes() {
        const idx = this.index;
        const el = this.htmlElement;
        el.classList.add(Globals.getClassName('rowElement'));
        // Index of the row in the presentation data table
        el.setAttribute('data-row-index', idx);
        this.updateRowAttributes();
        // Indexing from 0, so rows with even index are odd.
        el.classList.add(Globals.getClassName(idx % 2 ? 'rowEven' : 'rowOdd'));
        if (this.viewport.grid.hoveredRowIndex === idx) {
            el.classList.add(Globals.getClassName('hoveredRow'));
        }
        if (this.viewport.grid.syncedRowIndex === idx) {
            el.classList.add(Globals.getClassName('syncedRow'));
        }
    }
    /**
     * Sets the row HTML element attributes that are updateable in the row
     * lifecycle.
     */
    updateRowAttributes() {
        const a11y = this.viewport.grid.accessibility;
        const idx = this.index;
        const el = this.htmlElement;
        // Index of the row in the original data table (ID)
        if (this.id !== void 0) {
            el.setAttribute('data-row-id', this.id);
        }
        // Calculate levels of header, 1 to avoid indexing from 0
        a11y?.setRowIndex(el, idx + (this.viewport.header?.levels ?? 1) + 1);
    }
    /**
     * Sets the vertical translation of the row. Used for virtual scrolling.
     *
     * @param value
     * The vertical translation of the row.
     */
    setTranslateY(value) {
        this.translateY = value;
        this.htmlElement.style.transform = `translateY(${value}px)`;
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
