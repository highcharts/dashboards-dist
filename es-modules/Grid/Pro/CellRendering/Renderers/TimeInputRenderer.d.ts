import type Column from '../../../Core/Table/Column';
import type TimeInputRendererBase from './DateInputRendererBase';
import type TableCell from '../../../Core/Table/Body/TableCell';
import type { EditModeRenderer } from '../../CellEditing/CellEditMode';
import type { EditModeRendererTypeName } from '../../CellEditing/CellEditingComposition';
import CellRenderer from '../CellRenderer.js';
import TimeInputContent from '../ContentTypes/TimeInputContent.js';
/**
 * Renderer for the Select in a column..
 */
declare class TimeInputRenderer extends CellRenderer implements EditModeRenderer {
    /**
     * The default edit mode renderer type name for this view renderer.
     */
    static defaultEditingRenderer: EditModeRendererTypeName;
    /**
     * Default options for the time input renderer.
     */
    static defaultOptions: TimeInputRenderer.Options;
    options: TimeInputRenderer.Options;
    constructor(column: Column, options: Partial<CellRenderer.Options>);
    render(cell: TableCell, parentElement?: HTMLElement): TimeInputContent;
}
declare namespace TimeInputRenderer {
    /**
     * Options to control the time input renderer content.
     */
    interface Options extends TimeInputRendererBase.Options {
        type: 'timeInput';
    }
}
declare module '../CellRendererType' {
    interface CellRendererTypeRegistry {
        timeInput: typeof TimeInputRenderer;
    }
}
export default TimeInputRenderer;
