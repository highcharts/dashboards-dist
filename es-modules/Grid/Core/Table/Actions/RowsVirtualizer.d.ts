import type { RowsSettings } from '../../Options';
import type Cell from '../Cell';
import Table from '../Table.js';
/**
 * Represents a virtualized rows renderer for the data grid.
 */
declare class RowsVirtualizer {
    /**
     * The default height of a row.
     */
    readonly defaultRowHeight: number;
    /**
     * The index of the first visible row.
     */
    rowCursor: number;
    /**
     * The viewport (table) of the data grid.
     */
    readonly viewport: Table;
    /**
     * Size of the row buffer - how many rows should be rendered outside of the
     * viewport from the top and the bottom.
     */
    readonly buffer: number;
    /**
     * Flag indicating if the rows should have strict heights (no custom or
     * dynamic heights allowed).
     */
    private readonly strictRowHeights;
    /**
     * Flag indicating if the scrolling handler should be prevented to avoid
     * flickering loops when scrolling to the last row.
     */
    private preventScroll;
    /**
     * The only cell that is to be focusable using tab key - a table focus
     * entry point.
     */
    focusAnchorCell?: Cell;
    /**
     * Rendering row settings.
     */
    rowSettings?: RowsSettings;
    /**
     * Constructs an instance of the rows virtualizer.
     *
     * @param viewport
     * The viewport of the data grid to render rows in.
     */
    constructor(viewport: Table);
    /**
     * Renders the rows in the viewport for the first time.
     */
    initialRender(): void;
    /**
     * Renders the rows in the viewport. It is called when the rows need to be
     * re-rendered, e.g., after a sort or filter operation.
     */
    rerender(): void;
    /**
     * Method called on the viewport scroll event, only when the virtualization
     * is enabled.
     */
    scroll(): void;
    /**
     * Adjusts the visible row heights from the bottom of the viewport.
     */
    private adjustBottomRowHeights;
    /**
     * Renders rows in the specified range. Removes rows that are out of the
     * range except the last row.
     *
     * @param rowCursor
     * The index of the first visible row.
     */
    private renderRows;
    /**
     * Adjusts the heights of the rows based on the current scroll position.
     * It handles the possibility of the rows having different heights than
     * the default height.
     */
    adjustRowHeights(): void;
    /**
     * Reflow the rendered rows content dimensions.
     */
    reflowRows(): void;
    /**
     * Returns the default height of a row. This method should be called only
     * once on initialization.
     */
    private getDefaultRowHeight;
}
export default RowsVirtualizer;
