/* *
 *
 *  Date Input Cell Renderer class
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
import DateInputContent from '../ContentTypes/DateInputContent.js';
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
class DateInputRenderer extends CellRenderer {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(column, options) {
        super(column);
        this.options = merge(DateInputRenderer.defaultOptions, options);
    }
    /* *
     *
     *  Methods
     *
     * */
    render(cell, parentElement) {
        return new DateInputContent(cell, this, parentElement);
    }
}
/**
 * The default edit mode renderer type name for this view renderer.
 */
DateInputRenderer.defaultEditingRenderer = 'dateInput';
/**
 * Default options for the date input renderer.
 */
DateInputRenderer.defaultOptions = {
    type: 'dateInput'
};
CellRendererRegistry.registerRenderer('dateInput', DateInputRenderer);
/* *
 *
 *  Default Export
 *
 * */
export default DateInputRenderer;
