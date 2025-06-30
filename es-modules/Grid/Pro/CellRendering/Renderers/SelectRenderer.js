/* *
 *
 *  Select Cell Renderer class
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
import SelectContent from '../ContentTypes/SelectContent.js';
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
class SelectRenderer extends CellRenderer {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(column, options) {
        super(column);
        this.options = merge(SelectRenderer.defaultOptions, options);
    }
    /* *
     *
     *  Methods
     *
     * */
    render(cell, parentElement) {
        return new SelectContent(cell, this, parentElement);
    }
}
/**
 * The default edit mode renderer type name for this view renderer.
 */
SelectRenderer.defaultEditingRenderer = 'select';
/**
 * Default options for the select renderer.
 */
SelectRenderer.defaultOptions = {
    type: 'select',
    options: []
};
CellRendererRegistry.registerRenderer('select', SelectRenderer);
/* *
 *
 *  Default Export
 *
 * */
export default SelectRenderer;
