import Table from '../Table.js';
import Column from '../Column.js';
import Cell from '../Cell.js';
/**
 * The class that handles the resizing of columns in the data grid.
 */
declare class ColumnsResizer {
    /**
     * The viewport of the data grid.
     */
    private viewport;
    /**
     * The column being dragged.
     */
    private draggedColumn?;
    /**
     * The start X position of the drag.
     */
    private dragStartX?;
    /**
     * The element when dragging.
     */
    private draggedResizeHandle?;
    /**
     * The width of the dragged column when dragging started.
     */
    private columnStartWidth?;
    /**
     * The width of the next column when dragging started.
     */
    private nextColumnStartWidth?;
    /**
     * The handles and their mouse down event listeners.
     */
    private handles;
    constructor(viewport: Table);
    /**
     * Resizes the columns in the full distribution mode.
     *
     * @param diff
     * The X position difference in pixels.
     */
    private fullDistributionResize;
    /**
     * Render the drag handle for resizing columns.
     *
     * @param column
     * The reference to rendered column
     *
     * @param cell
     * The reference to rendered cell, where hadles should be added
     */
    renderColumnDragHandles(column: Column, cell: Cell): void;
    /**
     * Resizes the columns in the fixed distribution mode.
     *
     * @param diff
     * The X position difference in pixels.
     */
    private fixedDistributionResize;
    /**
     * Handles the mouse move event on the document.
     *
     * @param e
     * The mouse event.
     */
    private onDocumentMouseMove;
    /**
     * Handles the mouse up event on the document.
     */
    private onDocumentMouseUp;
    /**
     * Adds event listeners to the handle.
     *
     * @param handle
     * The handle element.
     *
     * @param column
     * The column the handle belongs to.
     */
    addHandleListeners(handle: HTMLElement, column: Column): void;
    /**
     * Removes all added event listeners from the document and handles. This
     * should be called on the destroy of the data grid.
     */
    removeEventListeners(): void;
}
export default ColumnsResizer;
