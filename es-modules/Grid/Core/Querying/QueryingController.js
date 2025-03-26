/* *
 *
 *  Grid Querying Controller class
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
/* *
 *
 *  Imports
 *
 * */
import ChainModifier from '../../../Data/Modifiers/ChainModifier.js';
import SortingController from './SortingController.js';
/* *
 *
 *  Class
 *
 * */
/**
 * Class that manage data modification of the visible data in the data grid.
 * It manages the modifiers that are applied to the data table.
 */
class QueryingController {
    /* *
    *
    *  Constructor
    *
    * */
    constructor(grid) {
        this.grid = grid;
        this.sorting = new SortingController(grid);
        /// this.filtering = new FilteringController(grid);
    }
    /* *
    *
    *  Functions
    *
    * */
    /**
     * Proceeds with the data modification if needed.
     *
     * @param force
     * If the data should be modified even if the significant options are not
     * changed.
     */
    async proceed(force = false) {
        if (force ||
            this.sorting.shouldBeUpdated // ||
        // this.filtering.shouldBeUpdated
        ) {
            await this.modifyData();
        }
    }
    /**
     * Load all options needed to generate the modifiers.
     */
    loadOptions() {
        this.sorting.loadOptions();
    }
    /**
     * Check if the data table does not need to be modified.
     */
    willNotModify() {
        return (!this.sorting.modifier
        // && !this.filtering.modifier
        );
    }
    /**
     * Apply all modifiers to the data table.
     */
    async modifyData() {
        const originalDataTable = this.grid.dataTable;
        if (!originalDataTable) {
            return;
        }
        const modifiers = [];
        // TODO: Implement filtering
        // if (this.filtering.modifier) {
        //     modifiers.push(this.filtering.modifier);
        // }
        if (this.sorting.modifier) {
            modifiers.push(this.sorting.modifier);
        }
        if (modifiers.length > 0) {
            const chainModifier = new ChainModifier({}, ...modifiers);
            const dataTableCopy = originalDataTable.clone();
            await chainModifier.modify(dataTableCopy.modified);
            this.grid.presentationTable = dataTableCopy.modified;
        }
        else {
            this.grid.presentationTable = originalDataTable.modified;
        }
        this.sorting.shouldBeUpdated = false;
        /// this.filtering.shouldBeUpdated = false;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default QueryingController;
