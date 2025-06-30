import type DateInputRenderer from '../Renderers/DateInputRenderer';
import type { EditModeContent } from '../../CellEditing/CellEditMode';
import type TableCell from '../../../Core/Table/Body/TableCell';
import CellContentPro from '../CellContentPro.js';
/**
 * Represents a date input type of cell content.
 */
declare class DateInputContent extends CellContentPro implements EditModeContent {
    finishAfterChange: boolean;
    blurHandler?: (e: FocusEvent) => void;
    keyDownHandler?: (e: KeyboardEvent) => void;
    changeHandler?: (e: Event) => void;
    /**
     * The HTML input element representing the date input.
     */
    private input;
    constructor(cell: TableCell, renderer: DateInputRenderer, parentElement?: HTMLElement);
    add(parentElement?: HTMLElement): HTMLInputElement;
    update(): void;
    get rawValue(): string;
    get value(): number;
    getMainElement(): HTMLInputElement;
    destroy(): void;
    /**
     * Converts the cell value to a string for the input.
     */
    private convertToInputValue;
    private readonly onChange;
    private readonly onKeyDown;
    private readonly onBlur;
    private readonly onCellKeyDown;
}
export default DateInputContent;
