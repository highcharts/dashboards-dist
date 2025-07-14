/* *
 *
 *  Grid ColumnSorting class
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
import GridUtils from '../../GridUtils.js';
import Globals from '../../Globals.js';
import U from '../../../../Core/Utilities.js';
const { makeHTMLElement } = GridUtils;
const { fireEvent } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Class that manages sorting for a dedicated column.
 */
class ColumnSorting {
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Constructs sorting for a dedicated column.
     *
     * @param column
     * The column that be sorted.
     *
     * @param headerCellElement
     * The head element of the column.
     */
    constructor(column, headerCellElement) {
        /**
         * Toggle sorting order for the column in the order: asc -> desc -> none
         */
        this.toggle = () => {
            const viewport = this.column.viewport;
            const querying = viewport.grid.querying;
            const sortingController = querying.sorting;
            // Do not call sorting when cell is currently edited and validated.
            if (viewport.validator?.errorCell) {
                return;
            }
            const currentOrder = (sortingController.currentSorting?.columnId === this.column.id ?
                sortingController.currentSorting.order : null) || 'none';
            const consequents = {
                none: 'asc',
                asc: 'desc',
                desc: null
            };
            void this.setOrder(consequents[currentOrder]);
        };
        this.column = column;
        this.headerCellElement = headerCellElement;
        this.addHeaderElementAttributes();
        if (column.options.sorting?.sortable) {
            makeHTMLElement('span', {
                className: Globals.getClassName('columnSortableIcon'),
                innerText: '▲'
            }, headerCellElement).setAttribute('aria-hidden', true);
            headerCellElement.classList.add(Globals.getClassName('columnSortable'));
        }
    }
    /* *
    *
    *  Methods
    *
    * */
    /**
     * Adds attributes to the column header.
     */
    addHeaderElementAttributes() {
        const col = this.column;
        const a11y = col.viewport.grid.accessibility;
        const sortingOptions = col.options.sorting;
        const { currentSorting } = col.viewport.grid.querying.sorting;
        const sortedAscClassName = Globals.getClassName('columnSortedAsc');
        const sortedDescClassName = Globals.getClassName('columnSortedDesc');
        const el = this.headerCellElement;
        if (currentSorting?.columnId !== col.id || !currentSorting?.order) {
            el.classList.remove(sortedAscClassName);
            el.classList.remove(sortedDescClassName);
            if (sortingOptions?.sortable) {
                a11y?.setColumnSortState(el, 'none');
            }
            return;
        }
        switch (currentSorting?.order) {
            case 'asc':
                el.classList.add(sortedAscClassName);
                el.classList.remove(sortedDescClassName);
                a11y?.setColumnSortState(el, 'ascending');
                break;
            case 'desc':
                el.classList.remove(sortedAscClassName);
                el.classList.add(sortedDescClassName);
                a11y?.setColumnSortState(el, 'descending');
                break;
        }
    }
    /**
     * Set sorting order for the column. It will modify the presentation data
     * and rerender the rows.
     *
     * @param order
     * The order of sorting. It can be `'asc'`, `'desc'` or `null` if the
     * sorting should be disabled.
     */
    async setOrder(order) {
        const viewport = this.column.viewport;
        const querying = viewport.grid.querying;
        const sortingController = querying.sorting;
        const a11y = viewport.grid.accessibility;
        sortingController.setSorting(order, this.column.id);
        await viewport.updateRows();
        for (const col of viewport.columns) {
            col.sorting?.addHeaderElementAttributes();
        }
        a11y?.userSortedColumn(order);
        fireEvent(this.column, 'afterSorting', {
            target: this.column
        });
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default ColumnSorting;
