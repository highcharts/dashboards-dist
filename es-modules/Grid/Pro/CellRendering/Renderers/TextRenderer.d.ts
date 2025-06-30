import type Column from '../../../Core/Table/Column';
import type TableCell from '../../../Core/Table/Body/TableCell';
import type { EditModeRendererTypeName } from '../../CellEditing/CellEditingComposition';
import CellRenderer from '../CellRenderer.js';
import TextContent from '../../../Core/Table/CellContent/TextContent.js';
/**
 * Renderer for the Text in a column..
 */
declare class TextRenderer extends CellRenderer {
    /**
     * The default edit mode renderer type names for this view renderer.
     */
    static defaultEditingRenderer: Record<Column.DataType, EditModeRendererTypeName>;
    /**
     * Default options for the text renderer.
     */
    static defaultOptions: TextRenderer.Options;
    options: TextRenderer.Options;
    /**
     * The format to use for the text content.
     */
    format?: string;
    /**
     * Formatter function for the text content.
     */
    formatter?: (this: TableCell) => string;
    constructor(column: Column);
    render(cell: TableCell): TextContent;
}
declare namespace TextRenderer {
    /**
     * Options to control the text renderer content.
     */
    interface Options extends CellRenderer.Options {
        type: 'text';
    }
}
declare module '../CellRendererType' {
    interface CellRendererTypeRegistry {
        text: typeof TextRenderer;
    }
}
export default TextRenderer;
