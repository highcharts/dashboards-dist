/* *
 *
 *  Grid Columns Resizer class.
 *
 *  (c) 2020-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *  - Sebastian Bochan
 *
 * */
'use strict';
import Column from '../Column.js';
import GridUtils from '../../GridUtils.js';
import Globals from '../../Globals.js';
import Utils from '../../../../Core/Utilities.js';
const { makeHTMLElement } = GridUtils;
const { fireEvent, getStyle } = Utils;
/* *
 *
 *  Class
 *
 * */
/**
 * The class that handles the resizing of columns in the data grid.
 */
class ColumnsResizer {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(viewport) {
        /**
         * The handles and their mouse down event listeners.
         */
        this.handles = [];
        /**
         * Handles the mouse move event on the document.
         *
         * @param e
         * The mouse event.
         *
         * @internal
         */
        this.onDocumentMouseMove = (e) => {
            if (!this.draggedResizeHandle || !this.draggedColumn) {
                return;
            }
            const diff = e.pageX - (this.dragStartX || 0);
            const vp = this.viewport;
            if (vp.columnDistribution === 'full') {
                this.fullDistributionResize(diff);
            }
            else {
                this.fixedDistributionResize(diff);
            }
            vp.reflow(true);
            if (vp.grid.options?.rendering?.rows?.virtualization) {
                vp.rowsVirtualizer.adjustRowHeights();
            }
            fireEvent(this.draggedColumn, 'afterResize', {
                target: this.draggedColumn,
                originalEvent: e
            });
        };
        /**
         * Handles the mouse up event on the document.
         */
        this.onDocumentMouseUp = () => {
            this.draggedColumn?.header?.htmlElement?.classList.remove(Globals.getClassName('resizedColumn'));
            this.dragStartX = void 0;
            this.draggedColumn = void 0;
            this.draggedResizeHandle = void 0;
            this.columnStartWidth = void 0;
            this.nextColumnStartWidth = void 0;
        };
        this.viewport = viewport;
        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Render the drag handle for resizing columns.
     *
     * @param column
     * The reference to rendered column
     *
     * @param cell
     * The reference to rendered cell, where hadles should be added
     */
    renderColumnDragHandles(column, cell) {
        const vp = column.viewport;
        if (vp.columnsResizer && (vp.columnDistribution !== 'full' ||
            (vp.grid.enabledColumns &&
                column.index < vp.grid.enabledColumns.length - 1))) {
            const handle = makeHTMLElement('div', {
                className: Globals.getClassName('resizerHandles')
            }, cell.htmlElement);
            handle.setAttribute('aria-hidden', true);
            vp.columnsResizer?.addHandleListeners(handle, column);
        }
    }
    /**
     * Resizes the columns in the full distribution mode.
     *
     * @param diff
     * The X position difference in pixels.
     */
    fullDistributionResize(diff) {
        const vp = this.viewport;
        const column = this.draggedColumn;
        if (!column) {
            return;
        }
        const nextColumn = vp.columns[column.index + 1];
        if (!nextColumn) {
            return;
        }
        const leftColW = this.columnStartWidth ?? 0;
        const rightColW = this.nextColumnStartWidth ?? 0;
        const minWidth = ColumnsResizer.getMinWidth(column);
        let newLeftW = leftColW + diff;
        let newRightW = rightColW - diff;
        if (newLeftW < minWidth) {
            newLeftW = minWidth;
            newRightW = leftColW + rightColW - minWidth;
        }
        if (newRightW < minWidth) {
            newRightW = minWidth;
            newLeftW = leftColW + rightColW - minWidth;
        }
        column.width = vp.getRatioFromWidth(newLeftW);
        nextColumn.width = vp.getRatioFromWidth(newRightW);
    }
    /**
     * Resizes the columns in the fixed distribution mode.
     *
     * @param diff
     * The X position difference in pixels.
     */
    fixedDistributionResize(diff) {
        const column = this.draggedColumn;
        if (!column) {
            return;
        }
        const colW = this.columnStartWidth ?? 0;
        const minWidth = ColumnsResizer.getMinWidth(column);
        let newW = colW + diff;
        if (newW < minWidth) {
            newW = minWidth;
        }
        column.width = newW;
    }
    /**
     * Adds event listeners to the handle.
     *
     * @param handle
     * The handle element.
     *
     * @param column
     * The column the handle belongs to.
     */
    addHandleListeners(handle, column) {
        const onHandleMouseDown = (e) => {
            const vp = column.viewport;
            const { grid } = vp;
            if (!grid.options?.rendering?.rows?.virtualization) {
                grid.contentWrapper?.classList.add(Globals.getClassName('resizerWrapper'));
                // Apply widths before resizing
                vp.reflow(true);
            }
            this.dragStartX = e.pageX;
            this.draggedColumn = column;
            this.draggedResizeHandle = handle;
            this.columnStartWidth = column.getWidth();
            this.nextColumnStartWidth =
                vp.columns[column.index + 1]?.getWidth();
            column.header?.htmlElement.classList.add(Globals.getClassName('resizedColumn'));
        };
        this.handles.push([handle, onHandleMouseDown]);
        handle.addEventListener('mousedown', onHandleMouseDown);
    }
    /**
     * Removes all added event listeners from the document and handles. This
     * should be called on the destroy of the data grid.
     */
    removeEventListeners() {
        document.removeEventListener('mousemove', this.onDocumentMouseMove);
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
        for (let i = 0, iEnd = this.handles.length; i < iEnd; i++) {
            const [handle, listener] = this.handles[i];
            handle.removeEventListener('mousedown', listener);
        }
    }
    /**
     * Returns the minimum width of the column.
     *
     * @param column
     * The column to get the minimum width for.
     *
     * @returns
     * The minimum width in pixels.
     */
    static getMinWidth(column) {
        const tableColumnEl = column.cells[1].htmlElement;
        const headerColumnEl = column.header?.htmlElement;
        const getElPaddings = (el) => ((getStyle(el, 'padding-left', true) || 0) +
            (getStyle(el, 'padding-right', true) || 0) +
            (getStyle(el, 'border-left', true) || 0) +
            (getStyle(el, 'border-right', true) || 0));
        let result = Column.MIN_COLUMN_WIDTH;
        if (tableColumnEl) {
            result = Math.max(result, getElPaddings(tableColumnEl));
        }
        if (headerColumnEl) {
            result = Math.max(result, getElPaddings(headerColumnEl));
        }
        return result;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default ColumnsResizer;
