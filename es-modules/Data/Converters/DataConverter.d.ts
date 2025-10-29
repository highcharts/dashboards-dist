import type { DataConverterTypes } from './DataConverterType';
import type DataEvent from '../DataEvent';
import type { ColumnIdsOptions } from '../Connectors/JSONConnectorOptions';
import DataTable from '../DataTable.js';
/**
 * Base class providing an interface and basic methods for a DataConverter
 *
 * @private
 */
declare class DataConverter implements DataEvent.Emitter<DataConverter.Event> {
    /**
     * Default options
     */
    protected static readonly defaultOptions: DataConverter.Options;
    /**
     * Constructs an instance of the DataConverter.
     *
     * @param {DataConverter.UserOptions} [options]
     * Options for the DataConverter.
     */
    constructor(options?: DataConverter.UserOptions);
    /**
     * A collection of available date formats.
     */
    dateFormats: Record<string, DataConverter.DateFormatObject>;
    /**
     * Regular expression used in the trim method to change a decimal point.
     */
    decimalRegExp?: RegExp;
    /**
     * Options for the DataConverter.
     */
    readonly options: DataConverter.Options;
    /**
     * Converts a string value based on its guessed type.
     *
     * @param {*} value
     * The value to examine.
     *
     * @return {number | string | Date}
     * The converted value.
     */
    convertByType(value: DataConverter.Type): number | string | Date;
    /**
     * Tries to guess the date format
     *  - Check if either month candidate exceeds 12
     *  - Check if year is missing (use current year)
     *  - Check if a shortened year format is used (e.g. 1/1/99)
     *  - If no guess can be made, the user must be prompted
     * data is the data to deduce a format based on
     * @private
     *
     * @param {string[]} data
     * Data to check the format.
     *
     * @param {number} limit
     * Max data to check the format.
     *
     * @param {boolean} save
     * Whether to save the date format in the converter options.
     */
    deduceDateFormat(data: string[], limit?: number | null, save?: boolean): string;
    /**
     * Emits an event on the DataConverter instance.
     *
     * @param {DataConverter.Event} [e]
     * Event object containing additional event data
     */
    emit(e: DataConverter.Event): void;
    /**
     * Registers a callback for a specific event.
     *
     * @param {string} type
     * Event type as a string.
     *
     * @param {DataEventEmitter.Callback} callback
     * Function to register for an modifier callback.
     *
     * @return {Function}
     * Function to unregister callback from the modifier event.
     */
    on<T extends DataConverter.Event['type']>(type: T, callback: DataEvent.Callback<this, Extract<DataConverter.Event, {
        type: T;
    }>>): Function;
    /**
     * Parse a date and return it as a number.
     *
     * @param {string} value
     * Value to parse.
     *
     * @param {string} dateFormatProp
     * Which of the predefined date formats
     * to use to parse date values.
     */
    parseDate(value: string, dateFormatProp?: string): number;
}
/**
 * Additionally provided types for events and conversion.
 */
declare namespace DataConverter {
    /**
     * The basic event object for a DataConverter instance.
     * Valid types are `parse`, `afterParse`, and `parseError`
     */
    interface Event extends DataEvent {
        readonly type: ('export' | 'afterExport' | 'exportError' | 'parse' | 'afterParse' | 'parseError');
        readonly columns: DataTable.Column[];
        readonly error?: string | Error;
        readonly headers: string[] | ColumnIdsOptions;
    }
    interface DateFormatCallbackFunction {
        (match: ReturnType<string['match']>): number;
    }
    interface DateFormatObject {
        alternative?: string;
        parser: DateFormatCallbackFunction;
        regex: RegExp;
    }
    /**
     * The shared options for all DataConverter instances
     */
    interface Options {
        dateFormat?: string;
        decimalPoint?: string;
        firstRowAsNames: boolean;
        /**
         * A function to parse string representations of dates into JavaScript
         * timestamps. If not set, the default implementation will be used.
         */
        parseDate?: DataConverter.ParseDateFunction;
    }
    /**
     * A function to parse string representations of dates
     * into JavaScript timestamps.
     */
    interface ParseDateFunction {
        (dateValue: string): number;
    }
    /**
     * Contains supported types to convert values from and to.
     */
    type Type = (boolean | null | number | string | DataTable | Date | undefined);
    /**
     * Options of the DataConverter.
     */
    type UserOptions = Partial<Options>;
    /**
     * Registry as a record object with connector names and their class.
     */
    const types: DataConverterTypes;
    /**
     * Adds a converter class to the registry.
     *
     * @private
     *
     * @param {string} key
     * Registry key of the converter class.
     *
     * @param {DataConverterTypes} DataConverterClass
     * Connector class (aka class constructor) to register.
     *
     * @return {boolean}
     * Returns true, if the registration was successful. False is returned, if
     * their is already a converter registered with this key.
     */
    function registerType<T extends keyof DataConverterTypes>(key: T, DataConverterClass: DataConverterTypes[T]): boolean;
}
export default DataConverter;
