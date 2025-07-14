/* *
 *
 *  Column Distribution Strategy abstract class
 *
 *  (c) 2020-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *
 * */
'use strict';
import U from '../../../../Core/Utilities.js';
const { getStyle } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Represents a column distribution strategy.
 */
class ColumnDistributionStrategy {
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Creates a new column distribution strategy.
     *
     * @param viewport
     * The table that the column distribution strategy is applied to.
     */
    constructor(viewport) {
        /**
         * The current widths values of the columns.
         */
        this.columnWidths = {};
        this.viewport = viewport;
    }
    /**
     * Loads the column to the distribution strategy. Should be called before
     * the table is rendered.
     */
    loadColumns() {
        const { columns } = this.viewport;
        for (let i = 0, iEnd = columns.length; i < iEnd; ++i) {
            this.loadColumn(columns[i]);
        }
    }
    /**
     * Recaulculates the changing dimentions of the table.
     */
    reflow() {
        if (this.type === 'full') {
            return;
        }
        const vp = this.viewport;
        let rowsWidth = 0;
        for (let i = 0, iEnd = vp.columns.length; i < iEnd; ++i) {
            rowsWidth += this.getColumnWidth(vp.columns[i]);
        }
        vp.rowsWidth = rowsWidth;
    }
    /* *
     *
     * Static Methods
     *
     * */
    /**
     * Returns the minimum width of the column.
     *
     * @param column
     * The column to get the minimum width for.
     *
     * @returns
     * The minimum width in pixels.
     */
    static getMinWidth(column) {
        const tableColumnEl = column.cells[0]?.htmlElement;
        const headerColumnEl = column.header?.htmlElement;
        const getElPaddings = (el) => ((getStyle(el, 'padding-left', true) || 0) +
            (getStyle(el, 'padding-right', true) || 0) +
            (getStyle(el, 'border-left', true) || 0) +
            (getStyle(el, 'border-right', true) || 0));
        let result = ColumnDistributionStrategy.MIN_COLUMN_WIDTH;
        if (tableColumnEl) {
            result = Math.max(result, getElPaddings(tableColumnEl));
        }
        if (headerColumnEl) {
            result = Math.max(result, getElPaddings(headerColumnEl));
        }
        return result;
    }
}
/* *
*
*  Static Properties
*
* */
/**
 * The minimum width of a column.
 * @internal
 */
ColumnDistributionStrategy.MIN_COLUMN_WIDTH = 20;
/* *
 *
 *  Default Export
 *
 * */
export default ColumnDistributionStrategy;
