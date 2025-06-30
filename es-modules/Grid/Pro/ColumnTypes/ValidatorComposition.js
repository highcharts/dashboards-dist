/* *
 *
 *  Validator Composition.
 *
 *  (c) 2020-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sebastian Bochan
 *
 * */
'use strict';
import Validator from './Validator.js';
import Globals from '../../Core/Globals.js';
import U from '../../../Core/Utilities.js';
const { addEvent, pushUnique } = U;
/* *
 *
 *  Composition
 *
 * */
/**
 * @internal
 */
var ValidatorComposition;
(function (ValidatorComposition) {
    /**
     * Extends the grid classes with cell editing functionality.
     *
     * @param TableClass
     * The class to extend.
     *
     */
    function compose(TableClass) {
        if (!pushUnique(Globals.composed, 'Validator')) {
            return;
        }
        addEvent(TableClass, 'afterInit', initValidatorComposition);
        addEvent(TableClass, 'afterDestroy', destroy);
    }
    ValidatorComposition.compose = compose;
    /**
     * Callback function called after table initialization.
     */
    function initValidatorComposition() {
        this.validator = new Validator(this);
    }
    /**
     * Callback function called after table destroy.
     */
    function destroy() {
        this.validator.destroy();
    }
})(ValidatorComposition || (ValidatorComposition = {}));
/* *
 *
 *  Default Export
 *
 * */
export default ValidatorComposition;
