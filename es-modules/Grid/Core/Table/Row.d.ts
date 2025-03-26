import type Cell from './Cell';
import type Column from './Column';
import Table from './Table.js';
/**
 * Represents a row in the data grid.
 */
declare abstract class Row {
    /**
     * The cells of the row.
     */
    cells: Cell[];
    /**
     * The HTML element of the row.
     */
    htmlElement: HTMLTableRowElement;
    /**
     * The viewport the row belongs to.
     */
    viewport: Table;
    /**
     * Flag to determine if the row is added to the DOM.
     */
    rendered?: boolean;
    /**
     * Constructs a row in the data grid.
     *
     * @param viewport
     * The Grid Table instance which the row belongs to.
     */
    constructor(viewport: Table);
    /**
     * Creates a cell in the row.
     *
     * @param column
     * The column the cell belongs to.
     */
    abstract createCell(column?: Column): Cell;
    /**
     * Renders the row's content. It does not attach the row element to the
     * viewport nor pushes the rows to the viewport.rows array.
     */
    render(): void;
    /**
     * Reflows the row's content dimensions.
     */
    reflow(): void;
    /**
     * Destroys the row.
     */
    destroy(): void;
    /**
     * Returns the cell with the given column ID.
     *
     * @param columnId
     * The column ID that the cell belongs to.
     *
     * @returns
     * The cell with the given column ID or undefined if not found.
     */
    getCell(columnId: string): Cell | undefined;
    /**
     * Registers a cell in the row.
     *
     * @param cell
     * The cell to register.
     */
    registerCell(cell: Cell): void;
    /**
     * Unregister a cell from the row.
     *
     * @param cell
     * The cell to unregister.
     */
    unregisterCell(cell: Cell): void;
}
declare namespace Row {
}
export default Row;
