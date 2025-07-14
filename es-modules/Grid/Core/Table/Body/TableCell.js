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
const { fireEvent } = Utils;
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
        void this.setValue();
    }
    /**
     * Sets the cell value and updates its content with it.
     *
     * @param value
     * The raw value to set. If not provided, it will use the value from the
     * data table for the current row and column.
     *
     * @param updateTable
     * Whether to update the table after setting the content. Defaults to
     * `false`, meaning the table will not be updated.
     */
    async setValue(value = this.column.data?.[this.row.index], updateTable = false) {
        this.value = value;
        if (updateTable && await this.updateDataTable()) {
            return;
        }
        if (this.content) {
            this.content.update();
        }
        else {
            this.content = this.column.createCellContent(this);
        }
        this.htmlElement.setAttribute('data-value', this.value + '');
        this.setCustomClassName(this.column.options.cells?.className);
        fireEvent(this, 'afterRender', { target: this });
    }
    /**
     * Updates the the data table so that it reflects the current state of
     * the grid.
     *
     * @returns
     * A promise that resolves to `true` if the cell triggered all the whole
     * viewport rows to be updated, or `false` if the only change should be
     * the cell's content.
     */
    async updateDataTable() {
        if (this.column.data?.[this.row.index] === this.value) {
            // Abort if the value is the same as in the data table.
            return false;
        }
        const vp = this.column.viewport;
        const { dataTable: originalDataTable } = vp.grid;
        const rowTableIndex = this.row.id &&
            originalDataTable?.getLocalRowIndex(this.row.id);
        if (!originalDataTable || rowTableIndex === void 0) {
            return false;
        }
        this.row.data[this.column.id] = this.value;
        originalDataTable.setCell(this.column.id, rowTableIndex, this.value);
        vp.grid.querying.shouldBeUpdated = true;
        if (vp.grid.querying.getModifiers().length < 1) {
            return false;
        }
        await vp.updateRows();
        return true;
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
     * Destroys the cell.
     */
    destroy() {
        this.content?.destroy();
        delete this.content;
        super.destroy();
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default TableCell;
