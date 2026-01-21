import type { FilterModifierOptions } from '../../../../Data/Modifiers/FilterModifierOptions';
/**
 * Converts filter options to ranges array.
 *
 * @param filterOptions
 * Filter modifier options object reference.
 */
export declare function toRange(filterOptions: FilterModifierOptions): Range[];
declare const NavigatorSyncUtils: {
    setRangeOptions: typeof setRangeOptions;
    unsetRangeOptions: typeof unsetRangeOptions;
    toRange: typeof toRange;
};
export default NavigatorSyncUtils;
