/* *
 *
 *  Checkbox Cell Renderer class
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
import CheckboxContent from '../ContentTypes/CheckboxContent.js';
import U from '../../../../Core/Utilities.js';
const { merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Renderer for the Checkbox in a column.
 */
class CheckboxRenderer extends CellRenderer {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(column, options) {
        super(column);
        this.options = merge(CheckboxRenderer.defaultOptions, options);
    }
    /* *
     *
     *  Methods
     *
     * */
    render(cell, parentElement) {
        return new CheckboxContent(cell, this, parentElement);
    }
}
/**
 * The default edit mode renderer type name for this view renderer.
 */
CheckboxRenderer.defaultEditingRenderer = 'checkbox';
/**
 * Default options for the checkbox renderer.
 */
CheckboxRenderer.defaultOptions = {
    type: 'checkbox'
};
CellRendererRegistry.registerRenderer('checkbox', CheckboxRenderer);
/* *
 *
 *  Default Export
 *
 * */
export default CheckboxRenderer;
