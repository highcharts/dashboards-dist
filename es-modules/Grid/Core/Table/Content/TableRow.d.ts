import type Cell from '../Cell';
import type Column from '../Column';
import type DataTable from '../../../../Data/DataTable';
import Row from '../Row.js';
import Table from '../Table.js';
/**
 * Represents a row in the data grid.
 */
declare class TableRow extends Row {
    /**
     * The row values from the data table in the original column order.
     */
    data: DataTable.RowObject;
    /**
     * The local index of the row in the presentation data table.
     */
    index: number;
    /**
     * The index of the row in the original data table (ID).
     */
    id?: number;
    /**
     * The vertical translation of the row.
     */
    translateY: number;
    /**
     * Constructs a row in the data grid.
     *
     * @param viewport
     * The Grid Table instance which the row belongs to.
     *
     * @param index
     * The index of the row in the data table.
     */
    constructor(viewport: Table, index: number);
    createCell(column: Column): Cell;
    /**
     * Loads the row data from the data table.
     */
    private loadData;
    /**
     * Adds or removes the hovered CSS class to the row element.
     *
     * @param hovered
     * Whether the row should be hovered.
     */
    setHoveredState(hovered: boolean): void;
    /**
     * Adds or removes the synced CSS class to the row element.
     *
     * @param synced
     * Whether the row should be synced.
     */
    setSyncedState(synced: boolean): void;
    /**
     * Sets the row HTML element attributes and additional classes.
     */
    setRowAttributes(): void;
    /**
     * Sets the vertical translation of the row. Used for virtual scrolling.
     *
     * @param value
     * The vertical translation of the row.
     */
    setTranslateY(value: number): void;
    /**
     * Returns the default top offset of the row (before adjusting row heights).
     * @internal
     */
    getDefaultTopOffset(): number;
}
declare namespace TableRow {
}
export default TableRow;
