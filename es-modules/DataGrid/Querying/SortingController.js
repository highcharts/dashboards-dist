/* *
 *
 *  DataGrid Sorting Controller class
 *
 *  (c) 2020-2024 Highsoft AS
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
import SortModifier from '../../Data/Modifiers/SortModifier.js';
/* *
 *
 *  Class
 *
 * */
/**
 * Class that manages one of the data grid querying types - sorting.
 */
class SortingController {
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Constructs the SortingController instance.
     *
     * @param dataGrid
     * The data grid instance.
     */
    constructor(dataGrid) {
        /**
         * The flag that indicates if the data should be updated because of the
         * change in the sorting options.
         */
        this.shouldBeUpdated = false;
        this.dataGrid = dataGrid;
    }
    /* *
    *
    *  Functions
    *
    * */
    /**
     * Sets the sorting state. If the new sorting state is different than the
     * current one, the `shouldBeUpdated` flag is set to `true`. If the
     * same, the flag is set to `false`.
     *
     * @param order
     * The sorting order.
     *
     * @param columnId
     * The column ID to sort by.
     */
    setSorting(order, columnId) {
        if (this.currentSorting?.columnId !== columnId ||
            this.currentSorting?.order !== order) {
            this.shouldBeUpdated = true;
            this.currentSorting = {
                columnId,
                order
            };
        }
        this.modifier = this.createModifier();
    }
    /**
     * Returns the sorting options from the data grid options.
     */
    getSortingOptions() {
        const dataGrid = this.dataGrid, { columnOptionsMap } = dataGrid;
        if (!columnOptionsMap) {
            return { order: null };
        }
        const columnIDs = Object.keys(columnOptionsMap);
        let foundOrder = null;
        let foundColumnId;
        for (let i = columnIDs.length - 1; i > -1; --i) {
            const columnId = columnIDs[i];
            const columnOptions = columnOptionsMap[columnId];
            const order = columnOptions.sorting?.order;
            if (order) {
                if (foundColumnId) {
                    // eslint-disable-next-line no-console
                    console.warn('DataGrid: Only one column can be sorted at a time. ' +
                        'Data will be sorted only by the last found column ' +
                        `with the sorting order defined in the options: "${foundColumnId}".`);
                    break;
                }
                foundOrder = order;
                foundColumnId = columnId;
            }
        }
        return {
            columnId: foundColumnId,
            order: foundOrder
        };
    }
    /**
     * Loads sorting options from the data grid options.
     */
    loadOptions() {
        const stateFromOptions = this.getSortingOptions();
        if (stateFromOptions.columnId !== this.initialSorting?.columnId ||
            stateFromOptions.order !== this.initialSorting?.order) {
            this.initialSorting = stateFromOptions;
            this.setSorting(stateFromOptions.order, stateFromOptions.columnId);
        }
    }
    /**
     * Returns the sorting modifier based on the loaded sorting options.
     */
    createModifier() {
        if (!this.currentSorting) {
            return;
        }
        const { columnId, order } = this.currentSorting;
        if (!order) {
            return;
        }
        return new SortModifier({
            orderByColumn: columnId,
            direction: order
        });
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default SortingController;
