import type DataEvent from '../DataEvent';
import type { FilterModifierOptions } from './FilterModifierOptions';
import DataModifier from './DataModifier.js';
import DataTable from '../DataTable.js';
/**
 * Filters out table rows matching a given condition.
 */
declare class FilterModifier extends DataModifier {
    /**
     * Default options for the filter modifier.
     */
    static readonly defaultOptions: FilterModifierOptions;
    /**
     * Compiles a filter condition into a callback function.
     *
     * @param {FilterCondition} condition
     * Condition to compile.
     */
    private static compile;
    /**
     * Constructs an instance of the filter modifier.
     *
     * @param {Partial<FilterModifier.Options>} [options]
     * Options to configure the filter modifier.
     */
    constructor(options?: Partial<FilterModifierOptions>);
    /**
     * Options of the filter modifier.
     */
    readonly options: FilterModifierOptions;
    /**
     * Replaces table rows with filtered rows.
     *
     * @param {DataTable} table
     * Table to modify.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {DataTable}
     * Table with `modified` property as a reference.
     */
    modifyTable<T extends DataTable>(table: T, eventDetail?: DataEvent.Detail): T;
}
declare module './DataModifierType' {
    interface DataModifierTypes {
        Filter: typeof FilterModifier;
    }
}
export default FilterModifier;
