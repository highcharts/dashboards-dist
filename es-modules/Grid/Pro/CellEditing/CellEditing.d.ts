import { EditModeContent } from './CellEditMode.js';
import TableCell from '../../Core/Table/Body/TableCell.js';
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
     * The content of the cell edit mode, which represents a context containing
     * the input field or similar element for applying changes to the cell
     * value.
     */
    editModeContent?: EditModeContent;
    /**
     * The container element for the cell edit mode, which is used to
     * position the edit mode content correctly within the cell.
     */
    private containerElement?;
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
     *
     * @return
     * Returns `true` if the cell was successfully stopped editing.
     */
    stopEditing(submit?: boolean): boolean;
    /**
     * Handles the blur event on the input field.
     */
    private readonly onInputBlur;
    /**
     * Handles the change event on the input field.
     */
    private readonly onInputChange;
    /**
     * Handles the keydown event on the input field. Cancels editing on escape
     * and saves the value on enter.
     *
     * @param e
     * The keyboard event.
     */
    private readonly onInputKeyDown;
    /**
     * Renders the input field for the cell, focuses it and sets up event
     * listeners.
     */
    private render;
    /**
     * Removes event listeners and the input element.
     */
    private destroy;
}
declare namespace CellEditing {
    /**
     * The class names used by the CellEditing functionality.
     */
    const classNames: {
        readonly cellEditingContainer: string;
    };
}
export default CellEditing;
