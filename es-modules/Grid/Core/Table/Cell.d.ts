import type DataTable from '../../../Data/DataTable';
import Column from './Column';
import Row from './Row';
declare abstract class Cell {
    /**
     * The HTML element of the cell.
     */
    htmlElement: HTMLTableCellElement;
    /**
     * The column of the cell.
     */
    column?: Column;
    /**
     * The row of the cell.
     */
    row: Row;
    /**
     * The raw value of the cell.
     */
    value: DataTable.CellType;
    /**
     * An additional, custom class name that can be changed dynamically.
     */
    private customClassName?;
    /**
     * Array of cell events to be removed when the cell is destroyed.
     */
    protected cellEvents: Array<[
        keyof HTMLElementEventMap,
        (e: Event) => void
    ]>;
    /**
     * Constructs a cell in the data grid.
     *
     * @param row
     * The row of the cell.
     *
     * @param column
     * The column of the cell.
     */
    constructor(row: Row, column?: Column);
    /**
     * Init element.
     * @internal
     */
    protected init(): HTMLTableCellElement;
    /**
     * Initialize event listeners. Events added to the `cellEvents` array will
     * be registered now and unregistered when the cell is destroyed.
     */
    protected initEvents(): void;
    /**
     * Handles user click on the cell.
     *
     * @param e
     * Mouse event object.
     *
     * @internal
     */
    protected abstract onClick(e: MouseEvent): void;
    /**
     * Handles the focus event on the cell.
     */
    protected onFocus(): void;
    /**
     * Handles the blur event on the cell.
     */
    protected onBlur(): void;
    /**
     * Handles user keydown on the cell.
     *
     * @param e
     * Keyboard event object.
     */
    protected onKeyDown(e: KeyboardEvent): void;
    /**
     * Renders the cell by appending the HTML element to the row.
     */
    render(): void;
    /**
     * Reflows the cell dimensions.
     */
    reflow(): void;
    /**
     * Returns the formatted string where the templating context is the cell.
     *
     * @param template
     * The template string.
     *
     * @return
     * The formatted string.
     */
    format(template: string): string;
    /**
     * Sets the custom class name of the cell based on the template.
     *
     * @param template
     * The template string.
     */
    protected setCustomClassName(template?: string): void;
    /**
     * Destroys the cell.
     */
    destroy(): void;
}
declare namespace Cell {
}
export default Cell;
