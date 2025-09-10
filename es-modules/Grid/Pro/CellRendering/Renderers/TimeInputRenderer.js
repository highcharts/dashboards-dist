/* *
 *
 *  Time Input Cell Renderer class
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
import TimeInputContent from '../ContentTypes/TimeInputContent.js';
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
class TimeInputRenderer extends CellRenderer {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(column, options) {
        super(column);
        this.options = merge(TimeInputRenderer.defaultOptions, options);
    }
    /* *
     *
     *  Methods
     *
     * */
    render(cell, parentElement) {
        return new TimeInputContent(cell, this, parentElement);
    }
}
/**
 * The default edit mode renderer type name for this view renderer.
 */
TimeInputRenderer.defaultEditingRenderer = 'timeInput';
/**
 * Default options for the time input renderer.
 */
TimeInputRenderer.defaultOptions = {
    type: 'timeInput'
};
CellRendererRegistry.registerRenderer('timeInput', TimeInputRenderer);
/* *
 *
 *  Default Export
 *
 * */
export default TimeInputRenderer;
