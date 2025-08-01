import type DataEvent from '../DataEvent';
import type GoogleSheetsConnectorOptions from './GoogleSheetsConnectorOptions';
import type Types from '../../Shared/Types';
import type DataTableOptions from '../DataTableOptions';
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
     * @param {GoogleSheetsConnector.UserOptions} [options]
     * Options for the connector and converter.
     *
     * @param {Array<DataTableOptions>} [dataTables]
     * Multiple connector data tables options.
     *
     */
    constructor(options?: GoogleSheetsConnector.UserOptions, dataTables?: Array<DataTableOptions>);
    readonly options: GoogleSheetsConnectorOptions;
    /**
     * The attached converter, which can be replaced in the constructor
     */
    converter?: GoogleSheetsConverter;
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
     * Available options for constructor of the GoogleSheetsConnector.
     */
    type UserOptions = Types.DeepPartial<GoogleSheetsConnectorOptions>;
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
