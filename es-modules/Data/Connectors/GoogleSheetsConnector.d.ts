import type DataEvent from '../DataEvent';
import DataConnector from './DataConnector.js';
import GoogleSheetsConverter from '../Converters/GoogleSheetsConverter.js';
/**
 * @private
 * @todo implement save, requires oauth2
 */
declare class GoogleSheetsConnector extends DataConnector {
    protected static readonly defaultOptions: GoogleSheetsConnector.Options;
    /**
     * Constructs an instance of GoogleSheetsConnector
     *
     * @param {GoogleSheetsConnector.UserOptions} [options]
     * Options for the connector and converter.
     */
    constructor(options?: GoogleSheetsConnector.UserOptions);
    readonly options: GoogleSheetsConnector.Options;
    /**
     * The attached converter, which can be replaced in the constructor
     */
    readonly converter: GoogleSheetsConverter;
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
    type Event = (ErrorEvent | LoadEvent);
    type ErrorEvent = DataConnector.ErrorEvent;
    interface FetchURLOptions {
        onlyColumnNames?: boolean;
    }
    interface LoadEvent extends DataConnector.LoadEvent {
        readonly url: string;
    }
    /**
     * Options of the GoogleSheetsConnector.
     */
    interface Options extends DataConnector.Options {
        dataRefreshRate: number;
        enablePolling: boolean;
        endColumn?: number;
        endRow?: number;
        firstRowAsNames: boolean;
        googleAPIKey: string;
        googleSpreadsheetKey: string;
        googleSpreadsheetRange?: string;
        startColumn?: number;
        startRow?: number;
        worksheet?: number;
    }
    /**
     * Available options for constructor and converter of the
     * GoogleSheetsConnector.
     */
    type UserOptions = (DeepPartial<Options> & GoogleSheetsConverter.UserOptions);
    /**
     * Creates GoogleSheets API v4 URL.
     * @private
     */
    function buildFetchURL(apiKey: string, sheetKey: string, options?: Partial<(FetchURLOptions & Options)>): string;
    /**
     * Creates sheets range.
     * @private
     */
    function buildQueryRange(options?: Partial<Options>): string;
}
declare module './DataConnectorType' {
    interface DataConnectorTypes {
        GoogleSheets: typeof GoogleSheetsConnector;
    }
}
export default GoogleSheetsConnector;
