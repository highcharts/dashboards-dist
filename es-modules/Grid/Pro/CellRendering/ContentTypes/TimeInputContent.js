/* *
 *
 *  Time Input Cell Content class
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
import DateInputContentBase from './DateInputContentBase.js';
/* *
 *
 *  Class
 *
 * */
/**
 * Represents a time input type of cell content.
 */
class TimeInputContent extends DateInputContentBase {
    getInputType() {
        return 'time';
    }
    get value() {
        return new Date(`1970-01-01T${this.input.value}Z`).getTime();
    }
    convertToInputValue() {
        return this.cell.column.viewport.grid.time.dateFormat('%H:%M:%S', Number(this.cell.value || 0));
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default TimeInputContent;
