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
import DataTableHelper from './DataTableHelper.js';
import GoogleSheetsConnector from '../../Data/Connectors/GoogleSheetsConnector.js';
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
 * @return {GoogleSheetsConnector}
 * Returns the class instance or object, or throws an exception.
 */
function fromJSON(json) {
    return new GoogleSheetsConnector(json.options || { googleAPIKey: '', googleSpreadsheetKey: '' });
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
    return obj instanceof GoogleSheetsConnector;
}
/**
 * Converts the given class instance to JSON.
 *
 * @param {GoogleSheetsConnector} obj
 * Class instance or object to serialize as JSON.
 *
 * @return {JSON}
 * Returns the JSON of the class instance or object.
 */
function toJSON(obj) {
    const options = merge(obj.options);
    options.dataTable = DataTableHelper.toJSON(obj.getTable());
    return {
        $class: 'Data.GoogleSheetsConnector',
        options
    };
}
/* *
 *
 *  Registry
 *
 * */
const GoogleSheetsConnectorHelper = {
    $class: 'Data.GoogleSheetsConnector',
    fromJSON,
    jsonSupportFor,
    toJSON
};
Serializable.registerHelper(GoogleSheetsConnectorHelper);
/* *
 *
 *  Default Export
 *
 * */
export default GoogleSheetsConnectorHelper;
