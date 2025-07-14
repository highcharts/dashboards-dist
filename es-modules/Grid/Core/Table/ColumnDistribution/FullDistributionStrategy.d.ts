import type Column from '../Column.js';
import type ColumnsResizer from '../Actions/ColumnsResizer';
import DistributionStrategy from './ColumnDistributionStrategy.js';
/**
 * @deprecated
 * This strategy is deprecated and will be removed in the future.
 */
declare class FullDistributionStrategy extends DistributionStrategy {
    readonly type: "full";
    private allPreviousWidths;
    loadColumn(column: Column): void;
    getColumnWidth(column: Column): number;
    resize(resizer: ColumnsResizer, diff: number): void;
    /**
     * The initial width of the column in the full distribution mode. The last
     * column in the viewport will have to fill the remaining space.
     *
     * @param column
     * The column to measure the width.
     *
     * @param mock
     * The mock element to measure the width.
     */
    private getInitialFullDistWidth;
    /**
     * Creates a mock element to measure the width of the column from the CSS.
     * The element is appended to the viewport container and then removed.
     * It should be called only once for each column.
     *
     * @param column
     * The column to measure the width.
     *
     * @returns The initial width of the column.
     */
    private getInitialColumnWidth;
}
export default FullDistributionStrategy;
