import type TableCell from '../Body/TableCell';
/**
 * Represents a cell content in the grid.
 */
declare abstract class CellContent {
    /**
     * The cell to which the content belongs.
     */
    readonly cell: TableCell;
    /**
     * Creates and renders the cell content.
     *
     * @param cell
     * The cell to which the content belongs.
     */
    constructor(cell: TableCell);
    /**
     * Renders the cell content.
     */
    protected abstract add(): void;
    /**
     * Destroy the cell content.
     */
    abstract destroy(): void;
    /**
     * Updates the cell content without re-rendering it.
     */
    abstract update(): void;
}
export default CellContent;
