/* *
 *
 *  Grid Querying Controller class
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
        /**
         * This flag should be set to `true` if the modifiers should reapply to the
         * data table due to some data change or other important reason.
         */
        this.shouldBeUpdated = false;
        this.grid = grid;
        this.sorting = new SortingController(this);
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
        if (force || this.shouldBeUpdated) {
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
     * Creates a list of modifiers that should be applied to the data table.
     */
    getModifiers() {
        const modifiers = [];
        if (this.sorting.modifier) {
            modifiers.push(this.sorting.modifier);
        }
        return modifiers;
    }
    /**
     * Apply all modifiers to the data table.
     */
    async modifyData() {
        const originalDataTable = this.grid.dataTable;
        if (!originalDataTable) {
            return;
        }
        const modifiers = this.getModifiers();
        if (modifiers.length > 0) {
            const chainModifier = new ChainModifier({}, ...modifiers);
            const dataTableCopy = originalDataTable.clone();
            await chainModifier.modify(dataTableCopy.modified);
            this.grid.presentationTable = dataTableCopy.modified;
        }
        else {
            this.grid.presentationTable = originalDataTable.modified;
        }
        this.shouldBeUpdated = false;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default QueryingController;
