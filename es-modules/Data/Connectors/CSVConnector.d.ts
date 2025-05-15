import type DataEvent from '../DataEvent';
import type CSVConnectorOptions from './CSVConnectorOptions';
import type Types from '../../Shared/Types';
import type DataTable from '../DataTable';
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
     * @param {CSVConnector.UserOptions} [options]
     * Options for the connector and converter.
     *
     * @param {Array<DataTable>} [dataTables]
     * Multiple connector data tables options.
     *
     */
    constructor(options?: CSVConnector.UserOptions, dataTables?: Array<DataTable>);
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
    type Event = (ErrorEvent | LoadEvent);
    /**
     * The event object that is provided on errors within CSVConnector.
     */
    interface ErrorEvent extends DataConnector.ErrorEvent {
        csv?: string;
    }
    /**
     * The event object that is provided on load events within CSVConnector.
     */
    interface LoadEvent extends DataConnector.LoadEvent {
        csv?: string;
    }
    /**
     * Available options for constructor of the CSVConnector.
     */
    type UserOptions = Types.DeepPartial<CSVConnectorOptions>;
}
declare module './DataConnectorType' {
    interface DataConnectorTypes {
        CSV: typeof CSVConnector;
    }
}
export default CSVConnector;
