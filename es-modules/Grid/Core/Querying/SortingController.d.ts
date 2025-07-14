import type { ColumnSortingOrder } from '../Options.js';
import QueryingController from './QueryingController.js';
import SortModifier from '../../../Data/Modifiers/SortModifier.js';
/**
 * Class that manages one of the data grid querying types - sorting.
 */
declare class SortingController {
    /**
     * The data grid instance.
     */
    private querying;
    /**
     * The current sorting options: column ID and sorting order.
     */
    currentSorting?: SortingController.SortingState;
    /**
     * The initial sorting options: column ID and sorting order.
     * This is the sorting that is applied when the data grid is created or
     * after the whole viewport is reloaded with changed sorting options.
     */
    private initialSorting?;
    /**
     * The modifier that is applied to the data table.
     */
    modifier?: SortModifier;
    /**
     * Constructs the SortingController instance.
     *
     * @param querying
     * The querying controller instance.
     */
    constructor(querying: QueryingController);
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
    setSorting(order: ColumnSortingOrder, columnId?: string): void;
    /**
     * Returns the sorting options from the data grid options.
     */
    private getSortingOptions;
    /**
     * Loads sorting options from the data grid options.
     */
    loadOptions(): void;
    /**
     * Returns the sorting modifier based on the loaded sorting options.
     */
    private createModifier;
}
declare namespace SortingController {
    /**
     * The sorting state interface.
     */
    interface SortingState {
        columnId?: string;
        order: ColumnSortingOrder;
    }
}
export default SortingController;
