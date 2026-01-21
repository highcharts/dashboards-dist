/* *
 *
 *  Dashboards default options
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  A commercial license may be required depending on use.
 *  See www.highcharts.com/license
 *
 *
 * */
'use strict';
import Utils from '../Core/Utilities.js';
const { merge } = Utils;
/**
 * Default options for the Board.
 */
export const defaultOptions = {
    gui: {
        enabled: true,
        layoutOptions: {
            rowClassName: void 0,
            cellClassName: void 0
        },
        layouts: []
    },
    components: []
};
/**
 * Merge the default options with custom options. Commonly used for defining
 * reusable templates.
 *
 * @param options
 * The new custom board options.
 */
export function setOptions(options) {
    merge(true, defaultOptions, options);
}
/* *
 *
 *  Default Export
 *
 * */
const Defaults = {
    defaultOptions,
    setOptions
};
export default Defaults;
