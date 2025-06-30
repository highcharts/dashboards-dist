import type DataTable from '../../../../Data/DataTable';
import type { EditModeContent } from '../../CellEditing/CellEditMode';
import type TableCell from '../../../Core/Table/Body/TableCell';
import type TextInputRenderer from '../Renderers/TextInputRenderer';
import CellContentPro from '../CellContentPro.js';
/**
 * Represents a text input type of cell content.
 */
declare class TextInputContent extends CellContentPro implements EditModeContent {
    finishAfterChange: boolean;
    blurHandler?: (e: FocusEvent) => void;
    keyDownHandler?: (e: KeyboardEvent) => void;
    changeHandler?: (e: Event) => void;
    /**
     * The HTML input element representing the text input.
     */
    private input;
    constructor(cell: TableCell, renderer: TextInputRenderer, parentElement?: HTMLElement);
    add(parentElement?: HTMLElement): HTMLInputElement;
    update(): void;
    get rawValue(): string;
    get value(): DataTable.CellType;
    /**
     * Converts the cell value to a string for the input.
     */
    private convertToInputValue;
    getMainElement(): HTMLInputElement;
    destroy(): void;
    private readonly onChange;
    private readonly onKeyDown;
    private readonly onBlur;
    private readonly onCellKeyDown;
}
export default TextInputContent;
