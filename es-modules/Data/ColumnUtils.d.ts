import type DataTable from './DataTable';
import type Types from '../Shared/Types';
/**
 * Utility functions for columns that can be either arrays or typed arrays.
 * @private
 */
declare namespace ColumnUtils {
    /**
     * Result of the `shift` function.
     */
    interface ShiftResult {
        value: DataTable.CellType;
        array: DataTable.Column;
    }
    /**
     * Result of the `splice` function.
     */
    interface SpliceResult<T extends DataTable.Column> {
        removed: T;
        array: T;
    }
    /**
     * Sets the length of the column array.
     *
     * @param {DataTable.Column} column
     * Column to be modified.
     *
     * @param {number} length
     * New length of the column.
     *
     * @param {boolean} asSubarray
     * If column is a typed array, return a subarray instead of a new array. It
     * is faster `O(1)`, but the entire buffer will be kept in memory until all
     * views to it are destroyed. Default is `false`.
     *
     * @return {DataTable.Column}
     * Modified column.
     *
     * @private
     */
    function setLength(column: DataTable.Column, length: number, asSubarray?: boolean): DataTable.Column;
    /**
     * Splices a column array.
     *
     * @param {DataTable.Column} column
     * Column to be modified.
     *
     * @param {number} start
     * Index at which to start changing the array.
     *
     * @param {number} deleteCount
     * An integer indicating the number of old array elements to remove.
     *
     * @param {boolean} removedAsSubarray
     * If column is a typed array, return a subarray instead of a new array. It
     * is faster `O(1)`, but the entire buffer will be kept in memory until all
     * views to it are destroyed. Default is `true`.
     *
     * @param {Array<number>|TypedArray} items
     * The elements to add to the array, beginning at the start index. If you
     * don't specify any elements, `splice()` will only remove elements from the
     * array.
     *
     * @return {SpliceResult}
     * Object containing removed elements and the modified column.
     *
     * @private
     */
    function splice(column: DataTable.Column, start: number, deleteCount: number, removedAsSubarray?: boolean, items?: DataTable.CellType[] | Types.TypedArray): SpliceResult<DataTable.Column>;
}
export default ColumnUtils;
