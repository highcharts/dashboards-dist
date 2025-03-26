import Grid from '../Grid.js';
import SortingController from './SortingController.js';
/**
 * Class that manage data modification of the visible data in the data grid.
 * It manages the modifiers that are applied to the data table.
 */
declare class QueryingController {
    /**
     * The data grid instance.
     */
    private grid;
    /**
     * Sorting controller instance
     */
    sorting: SortingController;
    constructor(grid: Grid);
    /**
     * Proceeds with the data modification if needed.
     *
     * @param force
     * If the data should be modified even if the significant options are not
     * changed.
     */
    proceed(force?: boolean): Promise<void>;
    /**
     * Load all options needed to generate the modifiers.
     */
    loadOptions(): void;
    /**
     * Check if the data table does not need to be modified.
     */
    willNotModify(): boolean;
    /**
     * Apply all modifiers to the data table.
     */
    private modifyData;
}
declare namespace QueryingController {
}
export default QueryingController;
