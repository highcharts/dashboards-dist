/* *
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
import U from '../../Core/Utilities.js';
import Globals from '../../Core/Globals.js';
const { pushUnique } = U;
/* *
 *
 *  Functions
 *
 * */
/**
 * Composition to add compatibility with the old `dataGrid` property.
 *
 * @param TableClass
 * The class to extend.
 */
function compose(TableClass) {
    if (!pushUnique(Globals.composed, 'Dash3Compatibility')) {
        return;
    }
    Object.defineProperty(TableClass.prototype, 'dataGrid', {
        get: function () {
            return this.grid;
        },
        configurable: true,
        enumerable: false
    });
}
/* *
 *
 *  Default Export
 *
 * */
export default { compose };
