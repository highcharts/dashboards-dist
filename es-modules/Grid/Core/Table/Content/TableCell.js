/* *
 *
 *  Grid class
 *
 *  (c) 2020-2025 Highsoft AS
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
import Cell from '../Cell.js';
import Utils from '../../../../Core/Utilities.js';
import GridUtils from '../../GridUtils.js';
const { setHTMLContent } = GridUtils;
const { defined, fireEvent } = Utils;
/* *
 *
 *  Class
 *
 * */
/**
 * Represents a cell in the data grid.
 */
class TableCell extends Cell {
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Constructs a cell in the data grid.
     *
     * @param row
     * The row of the cell.
     *
     * @param column
     * The column of the cell.
     */
    constructor(row, column) {
        super(row, column);
        this.column = column;
        this.row = row;
        this.column.registerCell(this);
    }
    /* *
    *
    *  Methods
    *
    * */
    /**
     * Renders the cell by appending it to the row and setting its value.
     */
    render() {
        super.render();
        // It may happen that `await` will be needed here in the future.
        void this.setValue(this.column.data?.[this.row.index], false);
    }
    initEvents() {
        this.cellEvents.push(['dblclick', (e) => (this.onDblClick(e))]);
        this.cellEvents.push(['mouseout', () => this.onMouseOut()]);
        this.cellEvents.push(['mouseover', () => this.onMouseOver()]);
        this.cellEvents.push(['mousedown', (e) => {
                this.onMouseDown(e);
            }]);
        super.initEvents();
    }
    /**
     * Handles the focus event on the cell.
     */
    onFocus() {
        super.onFocus();
        const vp = this.row.viewport;
        vp.focusCursor = [
            this.row.index,
            this.column.index
        ];
    }
    /**
     * Handles the mouse down event on the cell.
     *
     * @param e
     * The mouse event object.
     *
     * @internal
     */
    onMouseDown(e) {
        if (e.target === this.htmlElement) {
            this.htmlElement.focus();
        }
        fireEvent(this, 'mouseDown', {
            target: this,
            originalEvent: e
        });
    }
    /**
     * Handles the mouse over event on the cell.
     * @internal
     */
    onMouseOver() {
        const { grid } = this.row.viewport;
        grid.hoverRow(this.row.index);
        grid.hoverColumn(this.column.id);
        fireEvent(this, 'mouseOver', {
            target: this
        });
    }
    /**
     * Handles the mouse out event on the cell.
     */
    onMouseOut() {
        const { grid } = this.row.viewport;
        grid.hoverRow();
        grid.hoverColumn();
        fireEvent(this, 'mouseOut', {
            target: this
        });
    }
    /**
     * Handles the double click event on the cell.
     *
     * @param e
     * The mouse event object.
     */
    onDblClick(e) {
        fireEvent(this, 'dblClick', {
            target: this,
            originalEvent: e
        });
    }
    onClick() {
        fireEvent(this, 'click', {
            target: this
        });
    }
    /**
     * Handles the key down event on the cell.
     *
     * @param e
     * Keyboard event object.
     *
     * @internal
     */
    onKeyDown(e) {
        if (e.target !== this.htmlElement) {
            return;
        }
        fireEvent(this, 'keyDown', {
            target: this,
            originalEvent: e
        });
        super.onKeyDown(e);
    }
    /**
     * Sets the value & updating content of the cell.
     *
     * @param value
     * The raw value to set.
     *
     * @param updateTable
     * Whether to update the table after setting the content.
     */
    async setValue(value, updateTable) {
        this.value = value;
        const vp = this.column.viewport;
        // Render the table cell element content.
        setHTMLContent(this.htmlElement, this.formatCell());
        this.htmlElement.setAttribute('data-value', this.value + '');
        this.setCustomClassName(this.column.options.cells?.className);
        fireEvent(this, 'afterSetValue', {
            target: this
        });
        if (!updateTable) {
            return;
        }
        const { dataTable: originalDataTable } = vp.grid;
        // Taken the local row index of the original grid data table, but
        // in the future it should affect the globally original data table.
        // (To be done after the DataLayer refinement)
        const rowTableIndex = this.row.id && originalDataTable?.getLocalRowIndex(this.row.id);
        if (!originalDataTable || rowTableIndex === void 0) {
            return;
        }
        this.row.data[this.column.id] = this.value;
        originalDataTable.setCell(this.column.id, rowTableIndex, this.value);
        if (vp.grid.querying.willNotModify()) {
            // If the data table does not need to be modified, skip the
            // data modification and don't update the whole table. It checks
            // if the modifiers are globally set. Can be changed in the future
            // to check if the modifiers are set for the specific columns.
            return;
        }
        let focusedRowId;
        if (vp.focusCursor) {
            focusedRowId = vp.dataTable.getOriginalRowIndex(vp.focusCursor[0]);
        }
        await vp.grid.querying.proceed(true);
        vp.loadPresentationData();
        if (focusedRowId !== void 0 && vp.focusCursor) {
            const newRowIndex = vp.dataTable.getLocalRowIndex(focusedRowId);
            if (newRowIndex !== void 0) {
                vp.rows[newRowIndex - vp.rows[0].index]
                    ?.cells[vp.focusCursor[1]].htmlElement.focus();
            }
        }
    }
    /**
     * Handle the formatting content of the cell.
     *
     * @internal
     */
    formatCell() {
        const cellsDefaults = this.row.viewport.grid.options?.columnDefaults?.cells || {};
        const options = this.column.options.cells || {};
        const { format, formatter } = options;
        const isDefaultFormat = cellsDefaults.format === format;
        const isDefaultFormatter = cellsDefaults.formatter === formatter;
        let value = this.value;
        if (!defined(value)) {
            value = '';
        }
        let cellContent = '';
        if (isDefaultFormat && isDefaultFormatter) {
            cellContent = formatter ?
                formatter.call(this).toString() :
                (format ? this.format(format) : value + '');
        }
        else if (isDefaultFormat) {
            cellContent = formatter?.call(this).toString() || value + '';
        }
        else if (isDefaultFormatter) {
            cellContent = format ? this.format(format) : value + '';
        }
        return cellContent;
    }
    /**
     * Destroys the cell.
     */
    destroy() {
        super.destroy();
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default TableCell;
