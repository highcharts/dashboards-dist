import TableCell from '../../Core/Table/Content/TableCell.js';
import Table from '../../Core/Table/Table.js';
/**
 * The class that handles the manual editing of cells in the data grid.
 */
declare class CellEditing {
    /**
     * The viewport the edited cells are part of.
     */
    readonly viewport: Table;
    /**
     * The cell being currently edited.
     */
    editedCell?: TableCell;
    /**
     * Input element for the cell.
     */
    private inputElement?;
    constructor(viewport: Table);
    /**
     * Turns the cell into an editable input field.
     *
     * @param cell
     * The cell that is to be edited.
     */
    startEditing(cell: TableCell): void;
    /**
     * Stops the editing of the cell.
     *
     * @param submit
     * Whether to save the value of the input to the cell. Defaults to true.
     */
    stopEditing(submit?: boolean): void;
    /**
     * Handles the blur event on the input field.
     */
    private onInputBlur;
    /**
     * Handles the keydown event on the input field. Cancels editing on escape
     * and saves the value on enter.
     *
     * @param e
     * The keyboard event.
     */
    private onInputKeyDown;
    /**
     * Renders the input field for the cell, focuses it and sets up event
     * listeners.
     */
    private renderInput;
    /**
     * Removes event listeners and the input element.
     */
    private destroyInput;
}
export default CellEditing;
