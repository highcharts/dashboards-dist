import type Column from '../../../Core/Table/Column';
import type TableCell from '../../../Core/Table/Body/TableCell';
import type { EditModeRenderer } from '../../CellEditing/CellEditMode';
import type { EditModeRendererTypeName } from '../../CellEditing/CellEditingComposition';
import CellRenderer from '../CellRenderer.js';
import SelectContent from '../ContentTypes/SelectContent.js';
/**
 * Renderer for the Select in a column..
 */
declare class SelectRenderer extends CellRenderer implements EditModeRenderer {
    /**
     * The default edit mode renderer type name for this view renderer.
     */
    static defaultEditingRenderer: EditModeRendererTypeName;
    /**
     * Default options for the select renderer.
     */
    static defaultOptions: SelectRenderer.Options;
    options: SelectRenderer.Options;
    constructor(column: Column, options: Partial<CellRenderer.Options>);
    render(cell: TableCell, parentElement?: HTMLElement): SelectContent;
}
declare namespace SelectRenderer {
    /**
     * Options to define a single select option.
     */
    interface SelectOption {
        /**
         * The value of the option.
         */
        value: string;
        /**
         * The label of the option.
         */
        label?: string;
        /**
         * Whether the option is disabled. If true, the option cannot be
         * selected.
         */
        disabled?: boolean;
    }
    /**
     * Options to control the select renderer content.
     */
    interface Options extends CellRenderer.Options {
        type: 'select';
        /**
         * The options available in the select input.
         */
        options: SelectOption[];
        /**
         * Whether the select input is disabled.
         */
        disabled?: boolean;
    }
}
declare module '../CellRendererType' {
    interface CellRendererTypeRegistry {
        select: typeof SelectRenderer;
    }
}
export default SelectRenderer;
