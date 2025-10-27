import type DataEvent from '../DataEvent';
import type CSVConnectorOptions from './CSVConnectorOptions';
import CSVConverter from '../Converters/CSVConverter.js';
import DataConnector from './DataConnector.js';
/**
 * Class that handles creating a DataConnector from CSV
 *
 * @private
 */
declare class CSVConnector extends DataConnector {
    protected static readonly defaultOptions: CSVConnectorOptions;
    /**
     * Constructs an instance of CSVConnector.
     *
     * @param {Partial<CSVConnectorOptions>} [options]
     * Options for the connector and converter.
     */
    constructor(options?: Partial<CSVConnectorOptions>);
    /**
     * Options related to the handling of the CSV DataConnector,
     * i.e. source, fetching, polling
     */
    readonly options: CSVConnectorOptions;
    /**
     * The attached parser, which can be replaced in the constructor
     */
    converter?: CSVConverter;
    /**
     * Overrides the DataConnector method. Emits an event on the connector to
     * all registered callbacks of this event.
     *
     * @param {CSVConnector.Event} e
     * Event object containing additional event information.
     */
    emit(e: CSVConnector.Event): void;
    /**
     * Initiates the loading of the CSV source to the connector
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits CSVConnector#load
     * @emits CSVConnector#afterLoad
     */
    load(eventDetail?: DataEvent.Detail): Promise<this>;
}
/**
 * Types for class-specific options and events.
 */
declare namespace CSVConnector {
    /**
     * Event objects fired from CSVConnector events.
     */
    interface Event extends DataConnector.Event {
        readonly csv?: string;
    }
}
declare module './DataConnectorType' {
    interface DataConnectorTypes {
        CSV: typeof CSVConnector;
    }
}
export default CSVConnector;
