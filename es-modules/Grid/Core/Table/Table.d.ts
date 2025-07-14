import type TableRow from './Body/TableRow';
import DataTable from '../../../Data/DataTable.js';
import ColumnDistributionStrategy from './ColumnDistribution/ColumnDistributionStrategy.js';
import Column from './Column.js';
import TableHeader from './Header/TableHeader.js';
import Grid from '../Grid.js';
import RowsVirtualizer from './Actions/RowsVirtualizer.js';
import ColumnsResizer from './Actions/ColumnsResizer.js';
/**
 * Represents a table viewport of the data grid.
 */
declare class Table {
    /**
     * The data grid instance which the table (viewport) belongs to.
     */
    readonly grid: Grid;
    /**
     * The presentation version of the data table. It has applied modifiers
     * and is ready to be rendered.
     *
     * If you want to modify the data table, you should use the original
     * instance that is stored in the `grid.dataTable` property.
     */
    dataTable: DataTable;
    /**
     * The HTML element of the table head.
     */
    readonly theadElement?: HTMLElement;
    /**
     * The HTML element of the table body.
     */
    readonly tbodyElement: HTMLElement;
    /**
     * The head of the table.
     */
    header?: TableHeader;
    /**
     * The visible columns of the table.
     */
    columns: Column[];
    /**
     * The visible rows of the table.
     */
    rows: TableRow[];
    /**
     * The resize observer for the table container.
     * @internal
     */
    resizeObserver: ResizeObserver;
    /**
     * The rows virtualizer instance that handles the rows rendering &
     * dimensioning logic.
     * @internal
     */
    rowsVirtualizer: RowsVirtualizer;
    /**
     * The column distribution.
     */
    readonly columnDistribution: ColumnDistributionStrategy;
    /**
     * The columns resizer instance that handles the columns resizing logic.
     * @internal
     */
    columnsResizer?: ColumnsResizer;
    /**
     * The width of each row in the table. Each of the rows has the same width.
     * Only for the `fixed` column distribution.
     * @internal
     */
    rowsWidth?: number;
    /**
     * The focus cursor position: [rowIndex, columnIndex] or `undefined` if the
     * table cell is not focused.
     */
    focusCursor?: [number, number];
    /**
     * The flag that indicates if the table rows are virtualized.
     */
    virtualRows: boolean;
    /**
     * Constructs a new data grid table.
     *
     * @param grid
     * The data grid instance which the table (viewport) belongs to.
     *
     * @param tableElement
     * The HTML table element of the data grid.
     */
    constructor(grid: Grid, tableElement: HTMLTableElement);
    /**
     * Initializes the data grid table.
     */
    private init;
    /**
     * Sets the minimum height of the table body.
     */
    private setTbodyMinHeight;
    /**
     * Loads the columns of the table.
     */
    private loadColumns;
    /**
     * Fires an empty update to properly load the virtualization, only if
     * there's a row count compared to the threshold change detected (due to
     * performance reasons).
     */
    private updateVirtualization;
    /**
     * Updates the rows of the table.
     */
    updateRows(): Promise<void>;
    /**
     * Loads the modified data from the data table and renders the rows. Always
     * removes all rows and re-renders them, so it's better to use `updateRows`
     * instead, because it is more performant in some cases.
     *
     * @deprecated
     * Use `updateRows` instead. This method is kept for backward compatibility
     * reasons, but it will be removed in the next major version.
     */
    loadPresentationData(): void;
    /**
     * Reflows the table's content dimensions.
     */
    reflow(): void;
    /**
     * Handles the focus event on the table body.
     *
     * @param e
     * The focus event.
     */
    private onTBodyFocus;
    /**
     * Handles the resize event.
     */
    private onResize;
    /**
     * Handles the scroll event.
     */
    private onScroll;
    /**
     * Scrolls the table to the specified row.
     *
     * @param index
     * The index of the row to scroll to.
     *
     * Try it: {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/grid-lite/basic/scroll-to-row | Scroll to row}
     */
    scrollToRow(index: number): void;
    /**
     * Get the widthRatio value from the width in pixels. The widthRatio is
     * calculated based on the width of the viewport.
     *
     * @param width
     * The width in pixels.
     *
     * @return The width ratio.
     *
     * @internal
     */
    getRatioFromWidth(width: number): number;
    /**
     * Get the width in pixels from the widthRatio value. The width is
     * calculated based on the width of the viewport.
     *
     * @param ratio
     * The width ratio.
     *
     * @returns The width in pixels.
     *
     * @internal
     */
    getWidthFromRatio(ratio: number): number;
    /**
     * Destroys the grid table.
     */
    destroy(): void;
    /**
     * Get the viewport state metadata. It is used to save the state of the
     * viewport and restore it when the data grid is re-rendered.
     *
     * @returns
     * The viewport state metadata.
     */
    getStateMeta(): Table.ViewportStateMetadata;
    /**
     * Apply the metadata to the viewport state. It is used to restore the state
     * of the viewport when the data grid is re-rendered.
     *
     * @param meta
     * The viewport state metadata.
     */
    applyStateMeta(meta: Table.ViewportStateMetadata): void;
    /**
     * Returns the column with the provided ID.
     *
     * @param id
     * The ID of the column.
     */
    getColumn(id: string): Column | undefined;
    /**
     * Returns the row with the provided ID.
     *
     * @param id
     * The ID of the row.
     */
    getRow(id: number): TableRow | undefined;
}
declare namespace Table {
    /**
     * Represents the metadata of the viewport state. It is used to save the
     * state of the viewport and restore it when the data grid is re-rendered.
     */
    interface ViewportStateMetadata {
        scrollTop: number;
        scrollLeft: number;
        columnDistribution: ColumnDistributionStrategy;
        focusCursor?: [number, number];
    }
}
export default Table;
