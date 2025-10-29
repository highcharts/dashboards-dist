import type DataEvent from '../DataEvent';
import type GoogleSheetsConnectorOptions from './GoogleSheetsConnectorOptions';
import DataConnector from './DataConnector.js';
import GoogleSheetsConverter from '../Converters/GoogleSheetsConverter.js';
/**
 * @private
 * @todo implement save, requires oauth2
 */
declare class GoogleSheetsConnector extends DataConnector {
    protected static readonly defaultOptions: GoogleSheetsConnectorOptions;
    /**
     * Constructs an instance of GoogleSheetsConnector
     *
     * @param {Partial<GoogleSheetsConnectorOptions>} [options]
     * Options for the connector and converter.
     */
    constructor(options: Partial<GoogleSheetsConnectorOptions>);
    readonly options: GoogleSheetsConnectorOptions;
    /**
     * The attached converter, which can be replaced in the constructor
     */
    converter?: GoogleSheetsConverter;
    /**
     * Overrides the DataConnector method. Emits an event on the connector to
     * all registered callbacks of this event.
     *
     * @param {GoogleSheetsConnector.Event} e
     * Event object containing additional event information.
     */
    emit(e: GoogleSheetsConnector.Event): void;
    /**
     * Loads data from a Google Spreadsheet.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Promise<this>}
     * Same connector instance with modified table.
     */
    load(eventDetail?: DataEvent.Detail): Promise<this>;
}
declare namespace GoogleSheetsConnector {
    interface Event extends DataConnector.Event {
        readonly url?: string;
    }
    interface FetchURLOptions {
        onlyColumnIds?: boolean;
    }
    /**
     * Creates GoogleSheets API v4 URL.
     * @private
     */
    function buildFetchURL(apiKey: string, sheetKey: string, options?: Partial<(FetchURLOptions & GoogleSheetsConnectorOptions)>): string;
    /**
     * Creates sheets range.
     * @private
     */
    function buildQueryRange(options?: Partial<GoogleSheetsConnectorOptions>): string;
}
declare module './DataConnectorType' {
    interface DataConnectorTypes {
        GoogleSheets: typeof GoogleSheetsConnector;
    }
}
export default GoogleSheetsConnector;
