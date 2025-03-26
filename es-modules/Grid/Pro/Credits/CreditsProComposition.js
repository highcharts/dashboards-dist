/* *
 *
 *  Grid Credits class
 *
 *  (c) 2020-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *  - Sebastian Bochan
 *
 * */
'use strict';
import CreditsPro from './CreditsPro.js';
import Globals from '../../Core/Globals.js';
import U from '../../../Core/Utilities.js';
import Defaults from '../../Core/Defaults.js';
const { addEvent, merge, pushUnique } = U;
/* *
 *
 *  Class Namespace
 *
 * */
var CreditsProComposition;
(function (CreditsProComposition) {
    /**
     * Extends the grid classes with customizable credits.
     *
     * @param GridClass
     * The class to extend.
     *
     */
    function compose(GridClass) {
        if (!pushUnique(Globals.composed, 'CreditsPro')) {
            return;
        }
        merge(true, Defaults.defaultOptions, {
            credits: CreditsPro.defaultOptions
        });
        addEvent(GridClass, 'afterRenderViewport', initCreditsComposition);
    }
    CreditsProComposition.compose = compose;
    /**
     * Callback function called before table initialization.
     */
    function initCreditsComposition() {
        this.credits = new CreditsPro(this, this.options?.credits);
    }
})(CreditsProComposition || (CreditsProComposition = {}));
/* *
 *
 *  Default Export
 *
 * */
export default CreditsProComposition;
