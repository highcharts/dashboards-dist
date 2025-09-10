import type DataTable from '../../../../Data/DataTable';
import type { EditModeContent } from '../../CellEditing/CellEditMode';
import type SelectRenderer from '../Renderers/SelectRenderer';
import type TableCell from '../../../Core/Table/Body/TableCell';
import CellContentPro from '../CellContentPro.js';
/**
 * Represents a select type of cell content.
 */
declare class SelectContent extends CellContentPro implements EditModeContent {
    /**
     * Whether to finish the edit after a change.
     */
    finishAfterChange: boolean;
    blurHandler?: (e: FocusEvent) => void;
    keyDownHandler?: (e: KeyboardEvent) => void;
    changeHandler?: (e: Event) => void;
    /**
     * The HTML select element representing the select input.
     */
    private select;
    /**
     * The HTML option elements representing the options in the select input.
     */
    private optionElements;
    constructor(cell: TableCell, renderer: SelectRenderer, parentElement?: HTMLElement);
    /**
     * Adds the select element to the parent element.
     * @param parentElement The parent element to add the select element to.
     * @returns The select element.
     */
    protected add(parentElement?: HTMLElement): HTMLSelectElement;
    /**
     * Updates the select element.
     */
    update(): void;
    /**
     * Destroys the content.
     */
    destroy(): void;
    /**
     * Gets the raw value of the select element.
     */
    get rawValue(): string;
    /**
     * Gets the value of the select element.
     */
    get value(): DataTable.CellType;
    /**
     * Gets the main element (select) of the content.
     * @returns The select element.
     */
    getMainElement(): HTMLSelectElement;
    private readonly onChange;
    private readonly onKeyDown;
    private readonly onBlur;
    private readonly onCellKeyDown;
}
export default SelectContent;
