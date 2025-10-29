import type { FilterModifierOptions } from '../../../../Data/Modifiers/FilterModifierOptions';
declare namespace NavigatorSyncUtils {
    /**
     * Converts filter options to ranges array.
     *
     * @param filterOptions
     * Filter modifier options object reference.
     */
    function toRange(filterOptions: FilterModifierOptions): Range[];
}
export default NavigatorSyncUtils;
