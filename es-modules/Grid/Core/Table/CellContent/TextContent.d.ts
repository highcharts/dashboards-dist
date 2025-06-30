import type Column from '../Column';
import CellContent from './CellContent.js';
import TableCell from '../Body/TableCell';
/**
 * Represents a text type of content.
 */
declare class TextContent extends CellContent {
    constructor(cell: TableCell);
    protected add(): void;
    destroy(): void;
    update(): void;
    /**
     * Returns the formatted value of the cell.
     *
     * @internal
     */
    private format;
}
declare namespace TextContent {
    /**
     * Default formats for data types.
     */
    const defaultFormatsForDataTypes: Record<Column.DataType, string>;
}
export default TextContent;
