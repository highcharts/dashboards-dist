import type Column from '../../Core/Table/Column';
import type TableCell from '../../Core/Table/Body/TableCell';
import type CellContent from '../../Core/Table/CellContent/CellContent';
/**
 * Renderer class that initialize all options per column.
 */
declare abstract class CellRenderer {
    /**
     * Options to control the renderer content.
     */
    abstract options: CellRenderer.Options;
    /**
     * The column to which the specific renderer belongs.
     */
    readonly column: Column;
    /**
     * Constructs the CellRenderer instance.
     *
     * @param column
     * The column of the cell.
     *
     */
    constructor(column: Column);
    /**
     * Render the cell content.
     */
    abstract render(cell: TableCell): CellContent;
}
declare namespace CellRenderer {
    /**
     * Options to control the renderer content.
     */
    interface Options {
        /**
         * The cell content type.
         *
         * Can be one of the following: `'text'`, `'checkbox'`, `'select'`,
         * `'textInput'`, `'dateInput'`, `'sparkline'`.
         *
         * You can also create your own custom renderer by extending the
         * `CellRenderer` class and registering it in the
         * `CellRendererTypeRegistry`.
         *
         * @default 'text'
         */
        type: string;
    }
}
export default CellRenderer;
