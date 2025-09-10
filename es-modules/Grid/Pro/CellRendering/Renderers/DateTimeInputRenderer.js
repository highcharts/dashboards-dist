/* *
 *
 *  Date Time Input Cell Renderer class
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
import DateTimeInputContent from '../ContentTypes/DateTimeInputContent.js';
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
class DateTimeInputRenderer extends CellRenderer {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(column, options) {
        super(column);
        this.options = merge(DateTimeInputRenderer.defaultOptions, options);
    }
    /* *
     *
     *  Methods
     *
     * */
    render(cell, parentElement) {
        return new DateTimeInputContent(cell, this, parentElement);
    }
}
/**
 * The default edit mode renderer type name for this view renderer.
 */
DateTimeInputRenderer.defaultEditingRenderer = 'dateTimeInput';
/**
 * Default options for the date input renderer.
 */
DateTimeInputRenderer.defaultOptions = {
    type: 'dateTimeInput'
};
CellRendererRegistry.registerRenderer('dateTimeInput', DateTimeInputRenderer);
/* *
 *
 *  Default Export
 *
 * */
export default DateTimeInputRenderer;
