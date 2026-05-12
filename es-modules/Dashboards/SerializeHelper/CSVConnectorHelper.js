/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */
'use strict';
import CSVConnector from '../../Data/Connectors/CSVConnector.js';
import DataTableHelper from './DataTableHelper.js';
import Serializable from '../Serializable.js';
import { merge } from '../../Shared/Utilities.js';
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
 * @return {CSVConnector}
 * Returns the class instance or object, or throws an exception.
 */
function fromJSON(json) {
    return new CSVConnector(json.options);
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
    return obj instanceof CSVConnector;
}
/**
 * Converts the given class instance to JSON.
 *
 * @param {CSVConnector} obj
 * Class instance or object to serialize as JSON.
 *
 * @return {JSON}
 * Returns the JSON of the class instance or object.
 */
function toJSON(obj) {
    const options = merge(obj.options);
    options.dataTable = DataTableHelper.toJSON(obj.getTable());
    return {
        $class: 'Data.CSVConnector',
        options
    };
}
/* *
 *
 *  Registry
 *
 * */
const CSVConnectorHelper = {
    $class: 'Data.CSVConnector',
    fromJSON,
    jsonSupportFor,
    toJSON
};
Serializable.registerHelper(CSVConnectorHelper);
/* *
 *
 *  Default Export
 *
 * */
export default CSVConnectorHelper;
