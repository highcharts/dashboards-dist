/* *
 *
 *  Grid Rows Renderer class.
 *
 *  (c) 2020-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *
 * */
'use strict';
import TableRow from '../Body/TableRow.js';
import Globals from '../../Globals.js';
/* *
 *
 *  Class
 *
 * */
/**
 * Represents a virtualized rows renderer for the data grid.
 */
class RowsVirtualizer {
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Constructs an instance of the rows virtualizer.
     *
     * @param viewport
     * The viewport of the data grid to render rows in.
     */
    constructor(viewport) {
        /**
         * The index of the first visible row.
         */
        this.rowCursor = 0;
        /**
         * Flag indicating if the scrolling handler should be prevented to avoid
         * flickering loops when scrolling to the last row.
         */
        this.preventScroll = false;
        this.rowSettings =
            viewport.grid.options?.rendering?.rows;
        this.viewport = viewport;
        this.strictRowHeights = this.rowSettings.strictHeights;
        this.buffer = Math.max(this.rowSettings.bufferSize, 0);
        this.defaultRowHeight = this.getDefaultRowHeight();
        if (this.strictRowHeights) {
            viewport.tbodyElement.classList.add(Globals.getClassName('rowsContentNowrap'));
        }
    }
    /* *
    *
    *  Functions
    *
    * */
    /**
     * Renders the rows in the viewport for the first time.
     */
    initialRender() {
        // Initial reflow to set the viewport height
        if (this.rowSettings?.virtualization) {
            this.viewport.reflow();
        }
        // Load & render rows
        this.renderRows(this.rowCursor);
        this.adjustRowHeights();
    }
    /**
     * Renders the rows in the viewport. It is called when the rows need to be
     * re-rendered, e.g., after a sort or filter operation.
     */
    rerender() {
        const tbody = this.viewport.tbodyElement;
        let rows = this.viewport.rows;
        const oldScrollLeft = tbody.scrollLeft;
        let oldScrollTop;
        if (rows.length) {
            oldScrollTop = tbody.scrollTop;
            for (let i = 0, iEnd = rows.length; i < iEnd; ++i) {
                rows[i].destroy();
            }
            rows.length = 0;
        }
        this.renderRows(this.rowCursor);
        if (this.rowSettings?.virtualization) {
            if (oldScrollTop !== void 0) {
                tbody.scrollTop = oldScrollTop;
            }
            this.scroll();
        }
        rows = this.viewport.rows;
        // Reflow the rendered row cells widths (check redundancy)
        for (let i = 0, iEnd = rows.length; i < iEnd; ++i) {
            rows[i].reflow();
        }
        tbody.scrollLeft = oldScrollLeft;
    }
    /**
     * Method called on the viewport scroll event, only when the virtualization
     * is enabled.
     */
    scroll() {
        const target = this.viewport.tbodyElement;
        const { defaultRowHeight: rowHeight } = this;
        const lastScrollTop = target.scrollTop;
        if (this.preventScroll) {
            if (lastScrollTop <= target.scrollTop) {
                this.preventScroll = false;
            }
            this.adjustBottomRowHeights();
            return;
        }
        // Do vertical virtual scrolling
        const rowCursor = Math.floor(target.scrollTop / rowHeight);
        if (this.rowCursor !== rowCursor) {
            this.renderRows(rowCursor);
        }
        this.rowCursor = rowCursor;
        this.adjustRowHeights();
        if (!this.strictRowHeights &&
            lastScrollTop > target.scrollTop &&
            !this.preventScroll) {
            target.scrollTop = lastScrollTop;
            this.preventScroll = true;
        }
    }
    /**
     * Adjusts the visible row heights from the bottom of the viewport.
     */
    adjustBottomRowHeights() {
        const rows = this.viewport.rows;
        const rowsLn = rows.length;
        const lastRow = rows[rowsLn - 1];
        let rowTop = lastRow.translateY;
        const rowBottom = rowTop + lastRow.htmlElement.offsetHeight;
        let newHeight = lastRow.cells[0].htmlElement.offsetHeight;
        rowTop = rowBottom - newHeight;
        lastRow.htmlElement.style.height = newHeight + 'px';
        lastRow.setTranslateY(rowTop);
        for (let j = 0, jEnd = lastRow.cells.length; j < jEnd; ++j) {
            lastRow.cells[j].htmlElement.style.transform = '';
        }
        for (let i = rowsLn - 2; i >= 0; i--) {
            const row = rows[i];
            newHeight = row.cells[0].htmlElement.offsetHeight;
            rowTop -= newHeight;
            row.htmlElement.style.height = newHeight + 'px';
            row.setTranslateY(rowTop);
            for (let j = 0, jEnd = row.cells.length; j < jEnd; ++j) {
                row.cells[j].htmlElement.style.transform = '';
            }
        }
    }
    /**
     * Renders rows in the specified range. Removes rows that are out of the
     * range except the last row.
     *
     * @param rowCursor
     * The index of the first visible row.
     */
    renderRows(rowCursor) {
        const { viewport: vp, buffer } = this;
        const rowCount = vp.dataTable.getRowCount();
        // Stop rendering if there are no rows to render.
        if (rowCount < 1) {
            return;
        }
        const isVirtualization = this.rowSettings?.virtualization;
        const rowsPerPage = isVirtualization ? Math.ceil((vp.grid.tableElement?.clientHeight || 0) /
            this.defaultRowHeight) : Infinity; // Need to be refactored when add pagination
        let rows = vp.rows;
        if (!isVirtualization && rows.length > 50) {
            // eslint-disable-next-line no-console
            console.warn('Grid: a large dataset can cause performance issues when ' +
                'virtualization is disabled. Consider enabling ' +
                'virtualization in the rows settings.');
        }
        if (!rows.length) {
            const last = new TableRow(vp, rowCount - 1);
            vp.tbodyElement.appendChild(last.htmlElement);
            last.render();
            rows.push(last);
            if (isVirtualization) {
                last.setTranslateY(last.getDefaultTopOffset());
            }
        }
        const from = Math.max(0, Math.min(rowCursor - buffer, rowCount - rowsPerPage));
        const to = Math.min(rowCursor + rowsPerPage + buffer, rows[rows.length - 1].index - 1);
        const alwaysLastRow = rows.pop();
        const tempRows = [];
        // Remove rows that are out of the range except the last row.
        for (let i = 0, iEnd = rows.length; i < iEnd; ++i) {
            const row = rows[i];
            const rowIndex = row.index;
            if (rowIndex < from || rowIndex > to) {
                row.destroy();
            }
            else {
                tempRows.push(row);
            }
        }
        rows = tempRows;
        vp.rows = rows;
        for (let i = from; i <= to; ++i) {
            const row = rows[i - (rows[0]?.index || 0)];
            // Recreate row when it is destroyed and it is in the range.
            if (!row) {
                const newRow = new TableRow(vp, i);
                rows.push(newRow);
                newRow.rendered = false;
                if (isVirtualization) {
                    newRow.setTranslateY(newRow.getDefaultTopOffset());
                }
            }
        }
        rows.sort((a, b) => a.index - b.index);
        for (let i = 0, iEnd = rows.length; i < iEnd; ++i) {
            if (!rows[i].rendered) {
                vp.tbodyElement.insertBefore(rows[i].htmlElement, vp.tbodyElement.lastChild);
                rows[i].render();
            }
        }
        if (alwaysLastRow) {
            rows.push(alwaysLastRow);
        }
        // Focus the cell if the focus cursor is set
        if (vp.focusCursor) {
            const [rowIndex, columnIndex] = vp.focusCursor;
            const row = rows.find((row) => row.index === rowIndex);
            if (row) {
                row.cells[columnIndex]?.htmlElement.focus({
                    preventScroll: true
                });
            }
        }
        // Reset the focus anchor cell
        this.focusAnchorCell?.htmlElement.setAttribute('tabindex', '-1');
        const firstVisibleRow = rows[rowCursor - rows[0].index];
        this.focusAnchorCell = firstVisibleRow?.cells[0];
        this.focusAnchorCell?.htmlElement.setAttribute('tabindex', '0');
    }
    /**
     * Adjusts the heights of the rows based on the current scroll position.
     * It handles the possibility of the rows having different heights than
     * the default height.
     */
    adjustRowHeights() {
        if (this.strictRowHeights ||
            !this.rowSettings?.virtualization) {
            return;
        }
        const { rowCursor: cursor, defaultRowHeight: defaultH } = this;
        const { rows, tbodyElement } = this.viewport;
        const rowsLn = rows.length;
        let translateBuffer = rows[0].getDefaultTopOffset();
        for (let i = 0; i < rowsLn; ++i) {
            const row = rows[i];
            // Reset row height and cell transforms
            row.htmlElement.style.height = '';
            if (row.cells[0].htmlElement.style.transform) {
                for (let j = 0, jEnd = row.cells.length; j < jEnd; ++j) {
                    const cell = row.cells[j];
                    cell.htmlElement.style.transform = '';
                }
            }
            // Rows above the first visible row
            if (row.index < cursor) {
                row.htmlElement.style.height = defaultH + 'px';
                continue;
            }
            const cellHeight = row.cells[0].htmlElement.offsetHeight;
            row.htmlElement.style.height = cellHeight + 'px';
            // Rows below the first visible row
            if (row.index > cursor) {
                continue;
            }
            // First visible row
            if (row.htmlElement.offsetHeight > defaultH) {
                const newHeight = Math.floor(cellHeight - (cellHeight - defaultH) * (tbodyElement.scrollTop / defaultH - cursor));
                row.htmlElement.style.height = newHeight + 'px';
                for (let j = 0, jEnd = row.cells.length; j < jEnd; ++j) {
                    const cell = row.cells[j];
                    cell.htmlElement.style.transform = `translateY(${newHeight - cellHeight}px)`;
                }
            }
        }
        rows[0].setTranslateY(translateBuffer);
        for (let i = 1, iEnd = rowsLn - 1; i < iEnd; ++i) {
            translateBuffer += rows[i - 1].htmlElement.offsetHeight;
            rows[i].setTranslateY(translateBuffer);
        }
        // Set the proper offset for the last row
        const lastRow = rows[rowsLn - 1];
        const preLastRow = rows[rowsLn - 2];
        if (preLastRow && preLastRow.index === lastRow.index - 1) {
            lastRow.setTranslateY(preLastRow.htmlElement.offsetHeight + translateBuffer);
        }
    }
    /**
     * Reflow the rendered rows content dimensions.
     */
    reflowRows() {
        const rows = this.viewport.rows;
        if (rows.length < 1) {
            return;
        }
        for (let i = 0, iEnd = rows.length; i < iEnd; ++i) {
            rows[i].reflow();
        }
        this.adjustRowHeights();
    }
    /**
     * Returns the default height of a row. This method should be called only
     * once on initialization.
     */
    getDefaultRowHeight() {
        const vp = this.viewport;
        const mockRow = new TableRow(vp, 0);
        mockRow.htmlElement.style.position = 'absolute';
        mockRow.htmlElement.classList.add(Globals.getClassName('mockedRow'));
        this.viewport.tbodyElement.appendChild(mockRow.htmlElement);
        mockRow.render();
        const defaultRowHeight = mockRow.htmlElement.offsetHeight;
        mockRow.destroy();
        return defaultRowHeight;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default RowsVirtualizer;
