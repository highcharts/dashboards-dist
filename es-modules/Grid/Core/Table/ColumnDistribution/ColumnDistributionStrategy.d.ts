import type { ColumnDistributionType } from '../../Options';
import type Table from '../Table';
import type Column from '../Column.js';
import type ColumnsResizer from '../Actions/ColumnsResizer';
import type Globals from '../../Globals';
import type Options from '../../Options';
/**
 * Represents a column distribution strategy.
 */
declare abstract class ColumnDistributionStrategy {
    /**
     * The minimum width of a column.
     * @internal
     */
    static readonly MIN_COLUMN_WIDTH = 20;
    /**
     * The type of the column distribution strategy.
     */
    abstract readonly type: ColumnDistributionType;
    /**
     * The table that the column distribution strategy is applied to.
     */
    readonly viewport: Table;
    /**
     * The current widths values of the columns.
     */
    columnWidths: Record<string, number>;
    /**
     * Whether the column distribution strategy is invalidated. This flag is
     * used to determine whether the column distribution strategy metadata
     * should be maintained when the table is destroyed and recreated.
     */
    invalidated?: boolean;
    /**
     * Creates a new column distribution strategy.
     *
     * @param viewport
     * The table that the column distribution strategy is applied to.
     */
    constructor(viewport: Table);
    /**
     * Performs important calculations when the column is loaded.
     *
     * @param column
     * The column that is loaded.
     */
    protected abstract loadColumn(column: Column): void;
    /**
     * Returns the column's current width in pixels.
     */
    abstract getColumnWidth(column: Column): number;
    /**
     * Resizes the column by the given diff of pixels.
     *
     * @param resizer
     * The columns resizer instance that is used to resize the column.
     *
     * @param diff
     * The X position difference in pixels.
     */
    abstract resize(resizer: ColumnsResizer, diff: number): void;
    /**
     * Loads the column to the distribution strategy. Should be called before
     * the table is rendered.
     */
    loadColumns(): void;
    /**
     * Recaulculates the changing dimentions of the table.
     */
    reflow(): void;
    /**
     * Returns the current column distribution strategy metadata.
     * @internal
     */
    exportMetadata(): ColumnDistributionStrategy.Metadata;
    /**
     * Imports the column distribution strategy metadata. Used to restore the
     * column distribution strategy after the table is destroyed and recreated.
     *
     * @param metadata
     * The metadata to import.
     *
     * @param columnIterator
     * A function that is called for each significant column in the table.
     */
    importMetadata(metadata: ColumnDistributionStrategy.Metadata, columnIterator?: (columnId: string) => void): void;
    /**
     * Validates the column distribution strategy on update. This method
     * is used to determine whether the current distribution strategy metadata
     * should be invalidated when the table is updated.
     *
     * @param newOptions
     * The new options to validate.
     */
    validateOnUpdate(newOptions: Globals.DeepPartial<Options>): void;
    /**
     * Returns the minimum width of the column.
     *
     * @param column
     * The column to get the minimum width for.
     *
     * @returns
     * The minimum width in pixels.
     */
    protected static getMinWidth(column: Column): number;
}
declare namespace ColumnDistributionStrategy {
    interface Metadata {
        type: ColumnDistributionType;
        columnWidths: Record<string, number>;
    }
}
export default ColumnDistributionStrategy;
