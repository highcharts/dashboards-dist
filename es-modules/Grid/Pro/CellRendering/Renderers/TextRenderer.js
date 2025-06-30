/* *
 *
 *  Text Cell Renderer class
 *
 *  (c) 2020-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *
 * */
'use strict';
import CellRenderer from '../CellRenderer.js';
import CellRendererRegistry from '../CellRendererRegistry.js';
import TextContent from '../../../Core/Table/CellContent/TextContent.js';
import U from '../../../../Core/Utilities.js';
const { merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Renderer for the Text in a column..
 */
class TextRenderer extends CellRenderer {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(column) {
        super(column);
        this.options = merge(TextRenderer.defaultOptions, this.column.options.cells?.renderer || {});
        const cellOptions = column.options.cells;
        this.format =
            cellOptions?.format ??
                TextContent.defaultFormatsForDataTypes[column.dataType];
        this.formatter = cellOptions?.formatter;
    }
    /* *
     *
     *  Methods
     *
     * */
    render(cell) {
        return new TextContent(cell);
    }
}
/**
 * The default edit mode renderer type names for this view renderer.
 */
TextRenderer.defaultEditingRenderer = {
    string: 'textInput',
    number: 'textInput',
    'boolean': 'checkbox',
    datetime: 'dateInput'
};
/**
 * Default options for the text renderer.
 */
TextRenderer.defaultOptions = {
    type: 'text'
};
CellRendererRegistry.registerRenderer('text', TextRenderer);
/* *
 *
 *  Default Export
 *
 * */
export default TextRenderer;
