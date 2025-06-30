import type Column from '../../../Core/Table/Column';
import type { EditModeRenderer } from '../../CellEditing/CellEditMode';
import type TableCell from '../../../Core/Table/Body/TableCell';
import type { EditModeRendererTypeName } from '../../CellEditing/CellEditingComposition';
import CellRenderer from '../CellRenderer.js';
import CheckboxContent from '../ContentTypes/CheckboxContent.js';
/**
 * Renderer for the Checkbox in a column.
 */
declare class CheckboxRenderer extends CellRenderer implements EditModeRenderer {
    /**
     * The default edit mode renderer type name for this view renderer.
     */
    static defaultEditingRenderer: EditModeRendererTypeName;
    /**
     * Default options for the checkbox renderer.
     */
    static defaultOptions: CheckboxRenderer.Options;
    options: CheckboxRenderer.Options;
    constructor(column: Column, options: Partial<CellRenderer.Options>);
    render(cell: TableCell, parentElement?: HTMLElement): CheckboxContent;
}
declare namespace CheckboxRenderer {
    /**
     * Options to control the checkbox renderer content.
     */
    interface Options extends CellRenderer.Options {
        type: 'checkbox';
        /**
         * Whether the checkbox is disabled.
         */
        disabled?: boolean;
    }
}
declare module '../CellRendererType' {
    interface CellRendererTypeRegistry {
        checkbox: typeof CheckboxRenderer;
    }
}
export default CheckboxRenderer;
