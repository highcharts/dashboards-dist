import DataModifier from '../../../Data/Modifiers/DataModifier.js';
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
    grid: Grid;
    /**
     * Sorting controller instance
     */
    sorting: SortingController;
    /**
     * This flag should be set to `true` if the modifiers should reapply to the
     * data table due to some data change or other important reason.
     */
    shouldBeUpdated: boolean;
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
     * Creates a list of modifiers that should be applied to the data table.
     */
    getModifiers(): DataModifier[];
    /**
     * Apply all modifiers to the data table.
     */
    private modifyData;
}
export default QueryingController;
