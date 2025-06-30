import type Column from '../../../Core/Table/Column';
import type TableCell from '../../../Core/Table/Body/TableCell';
import { EditModeRenderer } from '../../CellEditing/CellEditMode';
import type { EditModeRendererTypeName } from '../../CellEditing/CellEditingComposition';
import CellRenderer from '../CellRenderer.js';
import TextInputContent from '../ContentTypes/TextInputContent.js';
/**
 * Renderer for the Select in a column..
 */
declare class TextInputRenderer extends CellRenderer implements EditModeRenderer {
    /**
     * The default edit mode renderer type names for this view renderer.
     */
    static defaultEditingRenderer: EditModeRendererTypeName;
    /**
     * Default options for the text input renderer.
     */
    static defaultOptions: TextInputRenderer.Options;
    options: TextInputRenderer.Options;
    constructor(column: Column, options: Partial<CellRenderer.Options>);
    render(cell: TableCell, parentElement?: HTMLElement): TextInputContent;
}
declare namespace TextInputRenderer {
    /**
     * Options to control the text input renderer content.
     */
    interface Options extends CellRenderer.Options {
        type: 'textInput';
        /**
         * Whether the text input is disabled.
         */
        disabled?: boolean;
    }
}
declare module '../CellRendererType' {
    interface CellRendererTypeRegistry {
        textInput: typeof TextInputRenderer;
    }
}
export default TextInputRenderer;
