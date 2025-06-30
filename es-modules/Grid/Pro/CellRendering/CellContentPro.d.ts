import type CellRenderer from './CellRenderer';
import type TableCell from '../../Core/Table/Body/TableCell';
import CellContent from '../../Core/Table/CellContent/CellContent.js';
/**
 * Represents a cell content in the grid.
 */
declare abstract class CellContentPro extends CellContent {
    /**
     * The renderer that allows to print content (inputs, selects, etc.)
     */
    readonly renderer: CellRenderer;
    /**
     * Creates and renders the cell content.
     *
     * @param cell
     * The cell to which the content belongs.
     *
     * @param renderer
     * Renderer that allows print content (inputs, selects, etc.)
     */
    constructor(cell: TableCell, renderer: CellRenderer);
}
export default CellContentPro;
