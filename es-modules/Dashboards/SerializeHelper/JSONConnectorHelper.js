/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  A commercial license may be required depending on use.
 *  See www.highcharts.com/license
 *
 *
 *  Authors:
 *  - Pawel Lysy
 *
 * */
'use strict';
import JSONConnector from '../../Data/Connectors/JSONConnector.js';
import DataTableHelper from './DataTableHelper.js';
import U from '../../Core/Utilities.js';
const { merge } = U;
/* *
 *
 *  Functions
 *
 * */
/**
 * Converts the given JSON to a class instance.
 *
 * @param {JSON} json
 * JSON to deserialize as a class instance or object.
 *
 * @return {JSONConnector}
 * Returns the class instance or object, or throws an exception.
 */
function fromJSON(json) {
    return new JSONConnector(json.options);
}
/**
 * Validates the given class instance for JSON support.
 *
 * @param {AnyRecord} obj
 * Class instance or object to validate.
 *
 * @return {boolean}
 * Returns true, if the function set can convert the given object, otherwise
 * false.
 */
function jsonSupportFor(obj) {
    return obj instanceof JSONConnector;
}
/**
 * Converts the given class instance to JSON.
 *
 * @param {JSONConnector} obj
 * Class instance or object to serialize as JSON.
 *
 * @return {JSON}
 * Returns the JSON of the class instance or object.
 */
function toJSON(obj) {
    const options = merge(obj.options);
    options.dataTable = DataTableHelper.toJSON(obj.getTable());
    return {
        $class: 'Data.JSONConnector',
        options
    };
}
/* *
 *
 *  Registry
 *
 * */
const JSONConnectorHelper = {
    $class: 'Data.JSONConnector',
    fromJSON,
    jsonSupportFor,
    toJSON
};
/* *
 *
 *  Default Export
 *
 * */
export default JSONConnectorHelper;
