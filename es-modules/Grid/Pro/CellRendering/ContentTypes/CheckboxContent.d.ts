import type CheckboxRenderer from '../Renderers/CheckboxRenderer';
import type DataTable from '../../../../Data/DataTable';
import type { EditModeContent } from '../../CellEditing/CellEditMode';
import type TableCell from '../../../Core/Table/Body/TableCell';
import CellContentPro from '../CellContentPro.js';
/**
 * Represents a checkbox type of cell content.
 */
declare class CheckboxContent extends CellContentPro implements EditModeContent {
    finishAfterChange: boolean;
    blurHandler?: (e: FocusEvent) => void;
    keyDownHandler?: (e: KeyboardEvent) => void;
    changeHandler?: (e: Event) => void;
    /**
     * The HTML input element representing the checkbox.
     */
    private input;
    constructor(cell: TableCell, renderer: CheckboxRenderer, parentElement?: HTMLElement);
    protected add(parentElement?: HTMLElement): HTMLInputElement;
    update(): void;
    get rawValue(): string;
    get value(): DataTable.CellType;
    getMainElement(): HTMLInputElement;
    destroy(): void;
    private readonly onChange;
    private readonly onKeyDown;
    private readonly onBlur;
    private readonly onCellKeyDown;
}
export default CheckboxContent;
