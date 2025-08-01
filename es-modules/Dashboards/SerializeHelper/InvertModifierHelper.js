/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */
'use strict';
import InvertModifier from '../../Data/Modifiers/InvertModifier';
import Serializable from '../Serializable.js';
/* *
 *
 *  Functions
 *
 * */
/**
 * Converts the given JSON to a class instance.
 *
 * @param {ChainModifierSerializer.JSON} json
 * JSON to deserialize as a class instance or object.
 *
 * @return {ChainModifier}
 * Returns the class instance or object, or throws an exception.
 */
function fromJSON(json) {
    return new InvertModifier(json.options);
}
/**
 * Validates the given class instance for JSON support.
 *
 * @param {Globals.AnyRecord} obj
 * Class instance or object to validate.
 *
 * @return {boolean}
 * Returns true, if the function set can convert the given object, otherwise
 * false.
 */
function jsonSupportFor(obj) {
    return obj instanceof InvertModifier;
}
/**
 * Converts the given class instance to JSON.
 *
 * @param {InvertModifier} obj
 * Class instance or object to serialize as JSON.
 *
 * @return {InvertModifierHelper.JSON}
 * Returns the JSON of the class instance or object.
 */
function toJSON(obj) {
    return {
        $class: 'Data.InvertModifier',
        options: obj.options
    };
}
/* *
 *
 *  Registry
 *
 * */
const InvertModifierHelper = {
    $class: 'Data.InvertModifier',
    fromJSON,
    jsonSupportFor,
    toJSON
};
Serializable.registerHelper(InvertModifierHelper);
/* *
 *
 *  Default Export
 *
 * */
export default InvertModifierHelper;
