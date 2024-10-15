import type DataTable from '../../../Data/DataTable';
import Cell from '../Cell.js';
import Column from '../Column';
import TableRow from './TableRow';
/**
 * Represents a cell in the data grid.
 */
declare class TableCell extends Cell {
    /**
     * The row of the cell.
     */
    row: TableRow;
    /**
     * Constructs a cell in the data grid.
     *
     * @param column
     * The column of the cell.
     *
     * @param row
     * The row of the cell.
     */
    constructor(column: Column, row: TableRow);
    /**
     * Renders the cell by appending it to the row and setting its value.
     */
    render(): void;
    initEvents(): void;
    /**
     * Handles the focus event on the cell.
     */
    protected onFocus(): void;
    /**
     * Handles the mouse down event on the cell.
     *
     * @param e
     * The mouse event object.
     */
    protected onMouseDown(e: MouseEvent): void;
    /**
     * Handles the mouse over event on the cell.
     */
    protected onMouseOver(): void;
    /**
     * Handles the mouse out event on the cell.
     */
    protected onMouseOut(): void;
    /**
     * Handles the double click event on the cell.
     *
     * @param e
     * The mouse event object.
     */
    protected onDblClick(e: MouseEvent): void;
    protected onClick(): void;
    protected onKeyDown(e: KeyboardEvent): void;
    /**
     * Sets the value & updating content of the cell.
     *
     * @param value
     * The raw value to set.
     *
     * @param updateTable
     * Whether to update the table after setting the content.
     */
    setValue(value: DataTable.CellType, updateTable: boolean): Promise<void>;
    /**
     * Handle the formatting content of the cell.
     */
    private formatCell;
    /**
     * Destroys the cell.
     */
    destroy(): void;
}
declare namespace TableCell {
    /**
     * Event interface for table cell events.
     */
    interface TableCellEvent {
        target: TableCell;
    }
}
export default TableCell;
