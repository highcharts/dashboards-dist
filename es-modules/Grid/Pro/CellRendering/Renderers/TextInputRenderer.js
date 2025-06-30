/* *
 *
 *  Text Input Cell Renderer class
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
import TextInputContent from '../ContentTypes/TextInputContent.js';
import U from '../../../../Core/Utilities.js';
const { merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Renderer for the Select in a column..
 */
class TextInputRenderer extends CellRenderer {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(column, options) {
        super(column);
        this.options = merge(TextInputRenderer.defaultOptions, options);
    }
    /* *
     *
     *  Methods
     *
     * */
    render(cell, parentElement) {
        return new TextInputContent(cell, this, parentElement);
    }
}
/**
 * The default edit mode renderer type names for this view renderer.
 */
TextInputRenderer.defaultEditingRenderer = 'textInput';
/**
 * Default options for the text input renderer.
 */
TextInputRenderer.defaultOptions = {
    type: 'textInput'
};
CellRendererRegistry.registerRenderer('textInput', TextInputRenderer);
/* *
 *
 *  Default Export
 *
 * */
export default TextInputRenderer;
