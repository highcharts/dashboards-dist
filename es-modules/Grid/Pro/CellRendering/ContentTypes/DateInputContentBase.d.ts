import type DateInputRendererBase from '../Renderers/DateInputRendererBase';
import type { EditModeContent } from '../../CellEditing/CellEditMode';
import type TableCell from '../../../Core/Table/Body/TableCell';
import CellContentPro from '../CellContentPro.js';
import CellRenderer from '../CellRenderer';
/**
 * Represents a date/time/datetime input type of cell content.
 */
declare abstract class DateInputContentBase extends CellContentPro implements EditModeContent {
    /**
     * Whether to finish the edit after a change.
     */
    finishAfterChange: boolean;
    blurHandler?: (e: FocusEvent) => void;
    keyDownHandler?: (e: KeyboardEvent) => void;
    changeHandler?: (e: Event) => void;
    /**
     * Options of the renderer.
     */
    options: DateInputRendererBase.Options;
    /**
     * The HTML input element representing the date input.
     */
    protected input: HTMLInputElement;
    constructor(cell: TableCell, renderer: CellRenderer, parentElement?: HTMLElement);
    /**
     * Adds the input element to the parent element.
     * @param parentElement The parent element to add the input element to.
     * @returns The input element.
     */
    add(parentElement?: HTMLElement): HTMLInputElement;
    /**
     * Gets the input type. Used to override the input type.
     */
    protected abstract getInputType(): 'date' | 'datetime-local' | 'time';
    /**
     * Updates the input element.
     */
    update(): void;
    /**
     * Gets the raw value of the input element.
     */
    get rawValue(): string;
    /**
     * Gets the value of the input element.
     */
    get value(): number;
    /**
     * Gets the main element (input) of the content.
     * @returns The input element.
     */
    getMainElement(): HTMLInputElement;
    /**
     * Destroys the content.
     */
    destroy(): void;
    /**
     * Converts the cell value to a string for the input.
     */
    protected abstract convertToInputValue(): string;
    private readonly onChange;
    private readonly onKeyDown;
    private readonly onBlur;
    private readonly onCellKeyDown;
}
export default DateInputContentBase;
