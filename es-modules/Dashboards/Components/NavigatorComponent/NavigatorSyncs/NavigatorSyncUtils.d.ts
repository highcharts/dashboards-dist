import type { RangeModifierRangeOptions } from '../../../../Data/Modifiers/RangeModifierOptions';
declare namespace NavigatorSyncUtils {
    /**
     * Adds or updates range options for a specific column.
     * @param ranges Array of range options (will be modified).
     * @param column Column name.
     * @param minValue Minimum value.
     * @param maxValue Maximum value.
     * @internal
     */
    function setRangeOptions(ranges: Array<RangeModifierRangeOptions>, column: string, minValue: (boolean | number | string), maxValue: (boolean | number | string)): void;
    /**
     * Removes range options for a specific column.
     * @param ranges Array of range options (will be modified).
     * @param column Column name.
     * @internal
     */
    function unsetRangeOptions(ranges: Array<RangeModifierRangeOptions>, column: string): (RangeModifierRangeOptions | undefined);
}
export default NavigatorSyncUtils;
