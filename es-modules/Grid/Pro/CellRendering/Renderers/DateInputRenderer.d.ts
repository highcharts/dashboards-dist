import type Column from '../../../Core/Table/Column';
import type TableCell from '../../../Core/Table/Body/TableCell';
import type { EditModeRenderer } from '../../CellEditing/CellEditMode';
import type { EditModeRendererTypeName } from '../../CellEditing/CellEditingComposition';
import CellRenderer from '../CellRenderer.js';
import DateInputContent from '../ContentTypes/DateInputContent.js';
/**
 * Renderer for the Select in a column..
 */
declare class DateInputRenderer extends CellRenderer implements EditModeRenderer {
    /**
     * The default edit mode renderer type name for this view renderer.
     */
    static defaultEditingRenderer: EditModeRendererTypeName;
    /**
     * Default options for the date input renderer.
     */
    static defaultOptions: DateInputRenderer.Options;
    options: DateInputRenderer.Options;
    constructor(column: Column, options: Partial<CellRenderer.Options>);
    render(cell: TableCell, parentElement?: HTMLElement): DateInputContent;
}
declare namespace DateInputRenderer {
    /**
     * Options to control the date input renderer content.
     */
    interface Options extends CellRenderer.Options {
        type: 'dateInput';
        /**
         * Whether the date input is disabled.
         */
        disabled?: boolean;
    }
}
declare module '../CellRendererType' {
    interface CellRendererTypeRegistry {
        dateInput: typeof DateInputRenderer;
    }
}
export default DateInputRenderer;
