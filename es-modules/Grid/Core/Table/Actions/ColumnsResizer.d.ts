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
     * Any column is being resized. Turned off after slight delay.
     */
    isResizing: boolean;
    /**
     * The column being dragged.
     * @internal
     */
    draggedColumn?: Column;
    /**
     * The start X position of the drag.
     */
    private dragStartX?;
    /**
     * The element when dragging.
     * @internal
     */
    draggedResizeHandle?: HTMLElement;
    /**
     * The width of the dragged column when dragging started.
     * @internal
     */
    columnStartWidth?: number;
    /**
     * The width of the next column when dragging started.
     * @internal
     */
    nextColumnStartWidth?: number;
    /**
     * The handles and their mouse down event listeners.
     */
    private handles;
    constructor(viewport: Table);
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
     * Handles the mouse move event on the document.
     *
     * @param e
     * The mouse event.
     *
     * @internal
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
