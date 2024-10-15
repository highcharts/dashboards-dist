import type Cell from '../Cell';
import type Column from '../Column';
import Row from '../Row.js';
import Table from '../Table.js';
/**
 * Represents a row in the data grid.
 */
declare class TableRow extends Row {
    /**
     * The local index of the row in the presentation data table.
     */
    index: number;
    /**
     * The index of the row in the original data table (ID).
     */
    id?: number;
    /**
     * Constructs a row in the data grid.
     *
     * @param viewport
     * The Data Grid Table instance which the row belongs to.
     *
     * @param index
     * The index of the row in the data table.
     */
    constructor(viewport: Table, index: number);
    createCell(column: Column): Cell;
    /**
     * Adds or removes the hovered CSS class to the row element.
     *
     * @param hovered
     * Whether the row should be hovered.
     */
    setHoveredState(hovered: boolean): void;
    /**
     * Sets the row HTML element attributes and additional classes.
     */
    setRowAttributes(): void;
    /**
     * Returns the default top offset of the row (before adjusting row heights).
     * @internal
     */
    getDefaultTopOffset(): number;
}
declare namespace TableRow {
}
export default TableRow;
