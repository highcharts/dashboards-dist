import type Column from '../../Core/Table/Column';
import type CellRendererType from './CellRendererType';
/**
 * @internal
 */
declare namespace CellRenderersComposition {
    /**
     * Extends the grid classes with cell editing functionality.
     *
     * @param ColumnClass
     * The class to extend.
     */
    function compose(ColumnClass: typeof Column): void;
}
declare module '../../Core/Options' {
    interface ColumnCellOptions {
        /**
         * Options to control the cell content rendering.
         */
        renderer?: CellRendererType['options'];
    }
}
declare module '../../Core/Table/Column' {
    export default interface Column {
        /**
         * The cell view renderer instance for the column.
         */
        cellRenderer: CellRendererType;
    }
}
export default CellRenderersComposition;
