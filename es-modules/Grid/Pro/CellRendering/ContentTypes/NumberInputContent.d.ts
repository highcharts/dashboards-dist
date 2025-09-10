import type { EditModeContent } from '../../CellEditing/CellEditMode';
import type TableCell from '../../../Core/Table/Body/TableCell';
import type NumberInputRenderer from '../Renderers/NumberInputRenderer';
import CellContentPro from '../CellContentPro.js';
/**
 * Represents a text input type of cell content.
 */
declare class NumberInputContent extends CellContentPro implements EditModeContent {
    /**
     * Whether to finish the edit after a change.
     */
    finishAfterChange: boolean;
    blurHandler?: (e: FocusEvent) => void;
    keyDownHandler?: (e: KeyboardEvent) => void;
    changeHandler?: (e: Event) => void;
    /**
     * The HTML input element representing the text input.
     */
    private input;
    constructor(cell: TableCell, renderer: NumberInputRenderer, parentElement?: HTMLElement);
    /**
     * Adds the input element to the parent element.
     * @param parentElement The parent element to add the input element to.
     * @returns The input element.
     */
    add(parentElement?: HTMLElement): HTMLInputElement;
    /**
     * Updates the input element.
     */
    update(): void;
    /**
     * Gets the raw value of the input element.
     */
    get rawValue(): string;
    /**
     * Gets the number value of the input element.
     */
    get value(): number;
    private readonly dblClickHandler;
    /**
     * Converts the cell value to a string for the input.
     */
    private convertToInputValue;
    /**
     * Gets the main element (input) of the content.
     * @returns The input element.
     */
    getMainElement(): HTMLInputElement;
    /**
     * Destroys the content.
     */
    destroy(): void;
    private readonly onChange;
    private readonly onKeyDown;
    private readonly onBlur;
    private readonly onCellKeyDown;
}
export default NumberInputContent;
