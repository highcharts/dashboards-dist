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
import Globals from '../../Globals.js';
import DGUtils from '../../Utils.js';
const { makeHTMLElement } = DGUtils;
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
            const querying = viewport.dataGrid.querying;
            const sortingController = querying.sorting;
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
                className: Globals.classNames.columnSortableIcon,
                innerText: '▲'
            }, headerCellElement).setAttribute('aria-hidden', true);
            headerCellElement.classList.add(Globals.classNames.columnSortable);
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
        const a11y = col.viewport.dataGrid.accessibility;
        const sortingOptions = col.options.sorting;
        const { currentSorting } = col.viewport.dataGrid.querying.sorting;
        const el = this.headerCellElement;
        if (currentSorting?.columnId !== col.id || !currentSorting?.order) {
            el.classList.remove(Globals.classNames.columnSortedAsc);
            el.classList.remove(Globals.classNames.columnSortedDesc);
            if (sortingOptions?.sortable) {
                a11y?.setColumnSortState(el, 'none');
            }
            return;
        }
        switch (currentSorting?.order) {
            case 'asc':
                el.classList.add(Globals.classNames.columnSortedAsc);
                el.classList.remove(Globals.classNames.columnSortedDesc);
                a11y?.setColumnSortState(el, 'ascending');
                break;
            case 'desc':
                el.classList.remove(Globals.classNames.columnSortedAsc);
                el.classList.add(Globals.classNames.columnSortedDesc);
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
        const querying = viewport.dataGrid.querying;
        const sortingController = querying.sorting;
        const a11y = viewport.dataGrid.accessibility;
        sortingController.setSorting(order, this.column.id);
        await querying.proceed();
        viewport.loadPresentationData();
        for (const col of viewport.columns) {
            col.sorting?.addHeaderElementAttributes();
        }
        a11y?.userSortedColumn(order);
        viewport.dataGrid.options?.events?.column?.afterSorting?.call(this.column);
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default ColumnSorting;
