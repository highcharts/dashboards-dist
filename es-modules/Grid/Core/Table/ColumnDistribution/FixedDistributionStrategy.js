/* *
 *
 *  Fixed Distribution Strategy class
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
import DistributionStrategy from './ColumnDistributionStrategy.js';
import Globals from '../../Globals.js';
import GridUtils from '../../GridUtils.js';
const { makeHTMLElement } = GridUtils;
/* *
 *
 *  Class
 *
 * */
class FixedDistributionStrategy extends DistributionStrategy {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.type = 'fixed';
    }
    /* *
     *
     *  Methods
     *
     * */
    loadColumn(column) {
        this.columnWidths[column.id] = this.getInitialColumnWidth(column);
    }
    getColumnWidth(column) {
        return this.columnWidths[column.id];
    }
    resize(resizer, diff) {
        const column = resizer.draggedColumn;
        if (!column) {
            return;
        }
        this.columnWidths[column.id] = Math.max((resizer.columnStartWidth || 0) + diff, DistributionStrategy.getMinWidth(column));
    }
    /**
     * Creates a mock element to measure the width of the column from the CSS.
     * The element is appended to the viewport container and then removed.
     * It should be called only once for each column.
     *
     * @param column
     * The column for which the initial width is being calculated.
     *
     * @returns The initial width of the column.
     */
    getInitialColumnWidth(column) {
        const { viewport } = this;
        // Set the initial width of the column.
        const mock = makeHTMLElement('div', {
            className: Globals.getClassName('columnElement')
        }, viewport.grid.container);
        mock.setAttribute('data-column-id', column.id);
        if (column.options.className) {
            mock.classList.add(...column.options.className.split(/\s+/g));
        }
        const result = mock.offsetWidth || 100;
        mock.remove();
        return result;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default FixedDistributionStrategy;
