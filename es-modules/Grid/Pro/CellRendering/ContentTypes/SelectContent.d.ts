import type DataTable from '../../../../Data/DataTable';
import type { EditModeContent } from '../../CellEditing/CellEditMode';
import type SelectRenderer from '../Renderers/SelectRenderer';
import type TableCell from '../../../Core/Table/Body/TableCell';
import CellContentPro from '../CellContentPro.js';
/**
 * Represents a select type of cell content.
 */
declare class SelectContent extends CellContentPro implements EditModeContent {
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
    protected add(parentElement?: HTMLElement): HTMLSelectElement;
    update(): void;
    destroy(): void;
    get rawValue(): string;
    get value(): DataTable.CellType;
    getMainElement(): HTMLSelectElement;
    private readonly onChange;
    private readonly onKeyDown;
    private readonly onBlur;
    private readonly onCellKeyDown;
}
export default SelectContent;
