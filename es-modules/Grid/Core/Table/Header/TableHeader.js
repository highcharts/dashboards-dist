/* *
 *
 *  Grid TableHeader class
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
import HeaderRow from './HeaderRow.js';
/* *
 *
 *  Class
 *
 * */
/**
 * Represents a table header row containing the cells (headers) with
 * column names.
 */
class TableHeader {
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Constructs a new table head.
     *
     * @param viewport
     * The viewport (table) the table head belongs to.
     */
    constructor(viewport) {
        /* *
        *
        *  Properties
        *
        * */
        /**
         * The visible columns of the table.
         */
        this.columns = [];
        /**
         * The container of the table head.
         */
        this.rows = [];
        /**
         * Amount of levels in the header, that is used in creating correct rows.
         */
        this.levels = 1;
        this.viewport = viewport;
        this.columns = viewport.columns;
        if (viewport.grid.options?.header) {
            this.levels = this.getRowLevels(viewport.grid.options?.header);
        }
    }
    /* *
    *
    *  Methods
    *
    * */
    /**
     * Renders the table head content.
     */
    render() {
        const vp = this.viewport;
        if (!vp.grid.enabledColumns) {
            return;
        }
        for (let i = 0, iEnd = this.levels; i < iEnd; i++) {
            const row = new HeaderRow(vp, i + 1); // Avoid indexing from 0
            row.renderMultipleLevel(i);
            this.rows.push(row);
        }
    }
    /**
     * Reflows the table head's content dimensions.
     */
    reflow() {
        const vp = this.viewport;
        if (!vp.theadElement) {
            return;
        }
        const { clientWidth, offsetWidth } = vp.tbodyElement;
        const header = vp.header;
        const rows = this.rows;
        const bordersWidth = offsetWidth - clientWidth;
        for (const row of rows) {
            row.reflow();
        }
        if (vp.rowsWidth) {
            vp.theadElement.style.width =
                Math.max(vp.rowsWidth, clientWidth) + bordersWidth + 'px';
        }
        if (header &&
            bordersWidth > 0 &&
            this.viewport.columnDistribution.type === 'full') {
            const row = this.columns[this.columns.length - 1].header?.row;
            const lastCellEl = row?.cells[row.cells.length - 1]?.htmlElement;
            if (lastCellEl) {
                lastCellEl.style.width = lastCellEl.style.maxWidth =
                    lastCellEl.offsetWidth + bordersWidth + 'px';
            }
        }
    }
    /**
     * Returns amount of rows for the current cell in header tree.
     *
     * @param scope
     * Structure of header
     *
     * @returns
     */
    getRowLevels(scope) {
        let maxDepth = 0;
        for (const item of scope) {
            if (typeof item !== 'string' && item.columns) {
                const depth = this.getRowLevels(item.columns);
                if (depth > maxDepth) {
                    maxDepth = depth;
                }
            }
        }
        return maxDepth + 1;
    }
    /**
     * Scrolls the table head horizontally, only when the virtualization
     * is enabled.
     *
     * @param scrollLeft
     * The left scroll position.
     */
    scrollHorizontally(scrollLeft) {
        const el = this.viewport.theadElement;
        if (!el) {
            return;
        }
        el.style.transform = `translateX(${-scrollLeft}px)`;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default TableHeader;
