import type Column from '../Column.js';
import type ColumnsResizer from '../Actions/ColumnsResizer.js';
import DistributionStrategy from './ColumnDistributionStrategy.js';
declare class FixedDistributionStrategy extends DistributionStrategy {
    readonly type: "fixed";
    /**
     * Array of units for each column width value. Codified as:
     * - `0` - px
     * - `1` - %
     */
    private columnWidthUnits;
    loadColumn(column: Column): void;
    getColumnWidth(column: Column): number;
    resize(resizer: ColumnsResizer, diff: number): void;
    /**
     * Creates a mock element to measure the width of the column from the CSS.
     * The element is appended to the viewport container and then removed.
     * It should be called only once for each column.
     *
     * @param column
     * The column for which the initial width is being calculated.
     *
     * @returns The initial width of the column.
     */
    private getInitialColumnWidth;
}
export default FixedDistributionStrategy;
