import DataConverter from './DataConverter';
import DataTable from '../DataTable.js';
declare namespace DataConverterUtils {
    /**
     * Converts a value to a Date.
     *
     * @param {DataConverter.Type} value
     * Value to convert.
     *
     * @return {globalThis.Date}
     * Converted value as a Date.
     */
    function asDate(value: DataConverter.Type, converter: DataConverter): Date;
    /**
     * Converts a value to a number.
     *
     * @param {DataConverter.Type} value
     * Value to convert.
     *
     * @return {number}
     * Converted value as a number.
     */
    function asNumber(value: DataConverter.Type, decimalRegExp?: RegExp): number;
    /**
     * Converts a value to a string.
     *
     * @param {DataConverter.Type} value
     * Value to convert.
     *
     * @return {string}
     * Converted value as a string.
     */
    function asString(value: DataConverter.Type): string;
    /**
     * Converts a value to a boolean.
     *
     * @param {DataConverter.Type} value
     * Value to convert.
     *
     * @return {boolean}
     * Converted value as a boolean.
     */
    function asBoolean(value: DataConverter.Type): boolean;
    /**
     * Guesses the potential type of a string value for parsing CSV etc.
     *
     * @param {*} value
     * The value to examine.
     *
     * @return {'number' | 'string' | 'Date'}
     * Type string, either `string`, `Date`, or `number`.
     */
    function guessType(value: unknown, converter: DataConverter): 'number' | 'string' | 'Date';
    /**
     * Trim a string from whitespaces.
     *
     * @param {string} str
     * String to trim.
     *
     * @param {boolean} [inside=false]
     * Remove all spaces between numbers.
     *
     * @return {string}
     * Trimed string
     */
    function trim(str: string, inside?: boolean): string;
    /**
     * Parses an array of columns to a column collection. If more headers are
     * provided, the corresponding, empty columns are added.
     *
     * @param {DataTable.Column[]} [columnsArray]
     * Array of columns.
     *
     * @param {string[]} [headers]
     * Column ids to use.
     *
     * @return {DataTable.ColumnCollection}
     * Parsed columns.
     */
    function getColumnsCollection(columnsArray: DataTable.Column[] | undefined, headers: string[]): DataTable.ColumnCollection;
}
export default DataConverterUtils;
