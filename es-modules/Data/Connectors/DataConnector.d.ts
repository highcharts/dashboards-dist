import type { DataConnectorTypes } from './DataConnectorType';
import type { DataConnectorOptions, MetaColumn, Metadata } from './DataConnectorOptions';
import type DataEvent from '../DataEvent';
import type DataConverterType from '../Converters/DataConverterType';
import DataConverter from '../Converters/DataConverter.js';
import DataTable from '../DataTable.js';
/**
 * Abstract class providing an interface for managing a DataConnector.
 */
declare abstract class DataConnector implements DataEvent.Emitter<DataConnector.Event> {
    /**
     * The DataConverter responsible for handling conversion of provided data to
     * a DataConnector.
     */
    converter?: DataConverter;
    /**
     * Metadata to describe the connector and the content of columns.
     */
    readonly metadata: Metadata;
    /**
     * Tables managed by this DataConnector instance.
     */
    readonly dataTables: Record<string, DataTable>;
    /**
     * The options of the connector.
     */
    readonly options: DataConnectorOptions;
    /**
     * ID of the polling timeout.
     */
    private _polling?;
    /**
     * Whether the connector is currently polling for new data.
     */
    get polling(): boolean;
    /**
     * The polling controller used to abort the request when data polling stops.
     * It gets assigned when data polling starts.
     */
    pollingController?: AbortController;
    /**
     * Constructor for the connector class.
     *
     * @param {DataConnectorOptions} [options]
     * Options to use in the connector.
     */
    constructor(options: DataConnectorOptions);
    /**
     * Returns a single data table instance based on the provided key.
     * Otherwise, returns the first data table.
     *
     * @param {string} [key]
     * The data table key.
     *
     * @return {DataTable}
     * The data table instance.
     */
    getTable(key?: string): DataTable;
    /**
     * Method for adding metadata for a single column.
     *
     * @param {string} name
     * The name of the column to be described.
     *
     * @param {DataConnector.MetaColumn} columnMeta
     * The metadata to apply to the column.
     */
    describeColumn(name: string, columnMeta: MetaColumn): void;
    /**
     * Method for applying columns meta information to the whole DataConnector.
     *
     * @param {Highcharts.Dictionary<DataConnector.MetaColumn>} columns
     * Pairs of column names and MetaColumn objects.
     */
    describeColumns(columns: Record<string, MetaColumn>): void;
    /**
     * Returns the order of columns.
     *
     * @return {string[] | undefined}
     * Order of columns.
     */
    getColumnOrder(): (string[] | undefined);
    /**
     * Retrieves the columns of the dataTable,
     * applies column order from meta.
     *
     * @return {Highcharts.DataTableColumnCollection}
     * An object with the properties `columnIds` and `columnValues`
     */
    getSortedColumns(): DataTable.ColumnCollection;
    /**
     * Sets the index and order of columns.
     *
     * @param {Array<string>} columnIds
     * Order of columns.
     */
    setColumnOrder(columnIds: Array<string>): void;
    /**
     * The default load method, which fires the `afterLoad` event
     *
     * @return {Promise<DataConnector>}
     * The loaded connector.
     *
     * @emits DataConnector#afterLoad
     */
    load(): Promise<this>;
    /**
     * Applies the data modifiers to the data tables according to the
     * connector data tables options.
     */
    applyTableModifiers(): Promise<this>;
    /**
     * Starts polling new data after the specific time span in milliseconds.
     *
     * @param {number} refreshTime
     * Refresh time in milliseconds between polls.
     */
    startPolling(refreshTime?: number): void;
    /**
     * Stops polling data. Shouldn't be performed if polling is already stopped.
     */
    stopPolling(): void;
    /**
     * Emits an event on the connector to all registered callbacks of this
     * event.
     *
     * @param {DataConnector.Event} e
     * Event object containing additional event information.
     */
    emit(e: DataConnector.Event): void;
    /**
     * Registers a callback for a specific connector event.
     *
     * @param type
     * Event type.
     *
     * @param callback
     * Function to register for the connector callback.
     *
     * @return {Function}
     * Function to unregister callback from the connector event.
     */
    on<T extends DataConnector.Event['type']>(type: T, callback: DataEvent.Callback<this, Extract<DataConnector.Event, {
        type: T;
    }>>): Function;
    /**
     * Iterates over the dataTables and initiates the corresponding converters.
     * Updates the dataTables and assigns the first converter.
     *
     * @param {T}[data]
     * Data specific to the corresponding converter.
     *
     * @param {DataConnector.CreateConverterFunction}[createConverter]
     * Creates a specific converter combining the dataTable options.
     *
     * @param {DataConnector.ParseDataFunction<T>}[parseData]
     * Runs the converter parse method with the specific data type.
     */
    initConverters<T>(data: T, createConverter: DataConnector.CreateConverterFunction, parseData: DataConnector.ParseDataFunction<T>): void;
}
declare namespace DataConnector {
    /**
     * The event type that is provided on events within DataConnector.
     */
    interface Event extends DataEvent {
        readonly type: 'loadError' | 'load' | 'afterLoad';
        readonly error?: string | Error;
    }
    /**
     * Creates a specific converter combining the dataTable options.
     */
    interface CreateConverterFunction {
        (key: string): DataConverterType;
    }
    /**
     * Runs the converter parse method with the specific data type.
     */
    interface ParseDataFunction<T> {
        (converter: DataConverterType, data: T): DataTable.ColumnCollection;
    }
    /**
     * Registry as a record object with connector names and their class.
     */
    const types: DataConnectorTypes;
    /**
     * Adds a connector class to the registry. The connector has to provide the
     * `DataConnector.options` property and the `DataConnector.load` method to
     * modify the table.
     *
     * @private
     *
     * @param {string} key
     * Registry key of the connector class.
     *
     * @param {DataConnectorType} DataConnectorClass
     * Connector class (aka class constructor) to register.
     *
     * @return {boolean}
     * Returns true, if the registration was successful. False is returned, if
     * their is already a connector registered with this key.
     */
    function registerType<T extends keyof DataConnectorTypes>(key: T, DataConnectorClass: DataConnectorTypes[T]): boolean;
}
export default DataConnector;
