/* *
 *
 *  Data Grid class
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
import DGUtils from '../Utils.js';
import Column from './Column.js';
import TableHeader from './Header/TableHeader.js';
import RowsVirtualizer from './Actions/RowsVirtualizer.js';
import ColumnsResizer from './Actions/ColumnsResizer.js';
import Globals from '../Globals.js';
import Utils from '../../Core/Utilities.js';
import CellEditing from './Actions/CellEditing.js';
const { makeHTMLElement } = DGUtils;
const { getStyle } = Utils;
/* *
 *
 *  Class
 *
 * */
/**
 * Represents a table viewport of the data grid.
 */
class Table {
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Constructs a new data grid table.
     *
     * @param dataGrid
     * The data grid instance which the table (viewport) belongs to.
     *
     * @param tableElement
     * The HTML table element of the data grid.
     */
    constructor(dataGrid, tableElement) {
        /**
         * The visible columns of the table.
         */
        this.columns = [];
        /**
         * The visible rows of the table.
         */
        this.rows = [];
        /**
         * Handles the focus event on the table body.
         *
         * @param e
         * The focus event.
         */
        this.onTBodyFocus = (e) => {
            e.preventDefault();
            this.rows[this.rowsVirtualizer.rowCursor - this.rows[0].index]
                ?.cells[0]?.htmlElement.focus();
        };
        /**
         * Handles the resize event.
         */
        this.onResize = () => {
            this.reflow();
        };
        /**
         * Handles the scroll event.
         */
        this.onScroll = () => {
            this.rowsVirtualizer.scroll();
            this.header?.scrollHorizontally(this.tbodyElement.scrollLeft);
        };
        this.dataGrid = dataGrid;
        this.dataTable = this.dataGrid.presentationTable;
        const dgOptions = dataGrid.options;
        const customClassName = dgOptions?.rendering?.table?.className;
        this.columnDistribution =
            dgOptions?.rendering?.columns?.distribution;
        this.renderCaption();
        if (dgOptions?.rendering?.header?.enabled) {
            this.theadElement = makeHTMLElement('thead', {}, tableElement);
        }
        this.tbodyElement = makeHTMLElement('tbody', {}, tableElement);
        this.rowsVirtualizer = new RowsVirtualizer(this);
        if (dgOptions?.columnDefaults?.resizing) {
            this.columnsResizer = new ColumnsResizer(this);
        }
        this.cellEditing = new CellEditing();
        if (customClassName) {
            tableElement.classList.add(...customClassName.split(/\s+/g));
        }
        this.init();
        // Add event listeners
        this.resizeObserver = new ResizeObserver(this.onResize);
        this.resizeObserver.observe(tableElement);
        this.tbodyElement.addEventListener('scroll', this.onScroll);
        this.tbodyElement.addEventListener('focus', this.onTBodyFocus);
    }
    /* *
    *
    *  Methods
    *
    * */
    /**
     * Initializes the data grid table.
     */
    init() {
        // Load columns
        this.loadColumns();
        // Load & render head
        if (this.dataGrid.options?.rendering?.header?.enabled) {
            this.header = new TableHeader(this);
            this.header.render();
        }
        // TODO: Load & render footer
        // this.footer = new TableFooter(this);
        // this.footer.render();
        this.rowsVirtualizer.initialRender();
    }
    /**
     * Loads the columns of the table.
     */
    loadColumns() {
        const { enabledColumns } = this.dataGrid;
        if (!enabledColumns) {
            return;
        }
        let columnId;
        for (let i = 0, iEnd = enabledColumns.length; i < iEnd; ++i) {
            columnId = enabledColumns[i];
            this.columns.push(new Column(this, columnId, i));
        }
    }
    /**
     * Loads the modified data from the data table and renders the rows.
     */
    loadPresentationData() {
        this.dataTable = this.dataGrid.presentationTable;
        for (const column of this.columns) {
            column.loadData();
        }
        this.rowsVirtualizer.rerender();
    }
    /**
     * Reflows the table's content dimensions.
     */
    reflow() {
        const tableEl = this.dataGrid.tableElement;
        const borderWidth = tableEl ? ((getStyle(tableEl, 'border-top-width', true) || 0) +
            (getStyle(tableEl, 'border-bottom-width', true) || 0)) : 0;
        this.tbodyElement.style.height = this.tbodyElement.style.minHeight = `${(this.dataGrid.container?.clientHeight || 0) -
            (this.theadElement?.offsetHeight || 0) -
            (this.captionElement?.offsetHeight || 0) -
            (this.dataGrid.credits?.getHeight() || 0) -
            borderWidth}px`;
        // Get the width of the rows.
        if (this.columnDistribution === 'fixed') {
            let rowsWidth = 0;
            for (let i = 0, iEnd = this.columns.length; i < iEnd; ++i) {
                rowsWidth += this.columns[i].width;
            }
            this.rowsWidth = rowsWidth;
        }
        // Reflow the head
        this.header?.reflow();
        // Reflow rows content dimensions
        this.rowsVirtualizer.reflowRows();
    }
    /**
     * Scrolls the table to the specified row.
     *
     * @param index
     * The index of the row to scroll to.
     *
     * Try it: {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/data-grid/basic/scroll-to-row | Scroll to row}
     */
    scrollToRow(index) {
        this.tbodyElement.scrollTop =
            index * this.rowsVirtualizer.defaultRowHeight;
    }
    /**
     * Get the widthRatio value from the width in pixels. The widthRatio is
     * calculated based on the width of the viewport.
     *
     * @param width
     * The width in pixels.
     *
     * @return The width ratio.
     *
     * @internal
     */
    getRatioFromWidth(width) {
        return width / this.tbodyElement.clientWidth;
    }
    /**
     * Get the width in pixels from the widthRatio value. The width is
     * calculated based on the width of the viewport.
     *
     * @param ratio
     * The width ratio.
     *
     * @returns The width in pixels.
     *
     * @internal
     */
    getWidthFromRatio(ratio) {
        return this.tbodyElement.clientWidth * ratio;
    }
    /**
     * Render caption above the datagrid
     * @internal
     */
    renderCaption() {
        const captionOptions = this.dataGrid.options?.caption;
        if (!captionOptions?.text) {
            return;
        }
        this.captionElement = makeHTMLElement('caption', {
            innerText: captionOptions.text,
            className: Globals.classNames.captionElement
        }, this.dataGrid.tableElement);
        if (captionOptions.className) {
            this.captionElement.classList.add(...captionOptions.className.split(/\s+/g));
        }
    }
    /**
     * Destroys the data grid table.
     */
    destroy() {
        this.tbodyElement.removeEventListener('focus', this.onTBodyFocus);
        this.tbodyElement.removeEventListener('scroll', this.onScroll);
        this.resizeObserver.disconnect();
        this.columnsResizer?.removeEventListeners();
        for (let i = 0, iEnd = this.rows.length; i < iEnd; ++i) {
            this.rows[i].destroy();
        }
    }
    /**
     * Get the viewport state metadata. It is used to save the state of the
     * viewport and restore it when the data grid is re-rendered.
     *
     * @returns
     * The viewport state metadata.
     */
    getStateMeta() {
        return {
            scrollTop: this.tbodyElement.scrollTop,
            scrollLeft: this.tbodyElement.scrollLeft,
            columnDistribution: this.columnDistribution,
            columnWidths: this.columns.map((column) => column.width),
            focusCursor: this.focusCursor
        };
    }
    /**
     * Apply the metadata to the viewport state. It is used to restore the state
     * of the viewport when the data grid is re-rendered.
     *
     * @param meta
     * The viewport state metadata.
     */
    applyStateMeta(meta) {
        this.tbodyElement.scrollTop = meta.scrollTop;
        this.tbodyElement.scrollLeft = meta.scrollLeft;
        if (this.columnDistribution === meta.columnDistribution &&
            this.columns.length === meta.columnWidths.length) {
            const widths = meta.columnWidths;
            for (let i = 0, iEnd = widths.length; i < iEnd; ++i) {
                this.columns[i].width = widths[i];
            }
            this.reflow();
            if (meta.focusCursor) {
                const [rowIndex, columnIndex] = meta.focusCursor;
                const row = this.rows[rowIndex - this.rows[0].index];
                row?.cells[columnIndex]?.htmlElement.focus();
            }
        }
    }
    /**
     * Returns the column with the provided ID.
     *
     * @param id
     * The ID of the column.
     */
    getColumn(id) {
        const columns = this.dataGrid.enabledColumns;
        if (!columns) {
            return;
        }
        const columnIndex = columns.indexOf(id);
        if (columnIndex < 0) {
            return;
        }
        return this.columns[columnIndex];
    }
    /**
     * Returns the row with the provided ID.
     *
     * @param id
     * The ID of the row.
     */
    getRow(id) {
        return this.rows.find((row) => row.id === id);
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default Table;
