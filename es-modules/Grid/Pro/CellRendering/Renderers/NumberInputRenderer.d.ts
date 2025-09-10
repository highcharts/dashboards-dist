import type Column from '../../../Core/Table/Column';
import type TableCell from '../../../Core/Table/Body/TableCell';
import type { EditModeRenderer } from '../../CellEditing/CellEditMode';
import type { EditModeRendererTypeName } from '../../CellEditing/CellEditingComposition';
import CellRenderer from '../CellRenderer.js';
import NumberInputContent from '../ContentTypes/NumberInputContent.js';
/**
 * Renderer for the Select in a column..
 */
declare class NumberInputRenderer extends CellRenderer implements EditModeRenderer {
    /**
     * The default edit mode renderer type name for this view renderer.
     */
    static defaultEditingRenderer: EditModeRendererTypeName;
    /**
     * Default options for the date input renderer.
     */
    static defaultOptions: NumberInputRenderer.Options;
    options: NumberInputRenderer.Options;
    constructor(column: Column, options: Partial<CellRenderer.Options>);
    render(cell: TableCell, parentElement?: HTMLElement): NumberInputContent;
}
declare namespace NumberInputRenderer {
    /**
     * Options to control the number input renderer content.
     */
    interface Options extends CellRenderer.Options {
        type: 'numberInput';
        /**
         * Whether the number input is disabled.
         */
        disabled?: boolean;
        /**
         * Attributes to control the number input.
         */
        attributes?: NumberInputAttributes;
    }
    /**
     * Attributes to control the number input.
     */
    interface NumberInputAttributes {
        min?: number;
        max?: number;
        step?: number;
    }
}
declare module '../CellRendererType' {
    interface CellRendererTypeRegistry {
        numberInput: typeof NumberInputRenderer;
    }
}
export default NumberInputRenderer;
