import type { DataConnectorTypes } from './Connectors/DataConnectorType';
import type DataTable from './DataTable';
/**
 * Options to initialize a data pool.
 */
export interface DataPoolOptions {
    /**
     * The connectors to use for loading data. Available connectors and its
     * options:
     *
     * {@link CSVConnectorOptions | CSVConnector}
     *
     * {@link GoogleSheetsConnectorOptions | GoogleSheetsConnector}
     *
     * {@link HTMLTableConnectorOptions | HTMLTableConnector}
     *
     * {@link JSONConnectorOptions | JSONConnector}
     *
     **/
    connectors: Array<DataPoolConnectorOptions>;
}
/**
 * Options for a connector in the data pool. Available options depend on the
 * type of the `DataConnector.types` registry.
 */
export interface DataPoolConnectorOptions<T extends keyof DataConnectorTypes = keyof DataConnectorTypes> {
    /**
     * The unique identifier of the connector. Used later when referencing
     * the connector in the component where it is used.
     **/
    id: string;
    /**
     * The options of the given connector type.
     * @example
     * dataPool: {
     *      connectors: [{
     *      id: 'my-csv-connector',
     *      type: 'CSV',
     *      options: {
     *          csv: csvData
     *          }
     *       }]
     * },
     **/
    options: DataConnectorTypes[T]['prototype']['options'];
    /**
     * The type of the connector, depends on your data source.
     * Possible values are:
     * - `CSV`
     * - `GoogleSheets`
     * - `HTMLTable`
     * - `JSON`
     **/
    type: T;
    /**
     * Allows defining multiple data tables within a single connector, primarily
     * to apply multiple parser methods to each data table.
     *
     * @example
     * dataPool: {
     *     connectors: [{
     *         id: "json-connector",
     *         type: "JSON",
     *         options: {
     *             firstRowAsNames: false,
     *             columnNames: ["time", "open", "high", "low", "close", "volume"],
     *             dataUrl: "https://demo-live-data.highcharts.com/aapl-ohlcv.json"
     *         },
     *         dataTables: [{
     *             id: "data-table-0",
     *             beforeParse: function (payload) {
     *                 return payload;
     *             }
     *         }, {
     *             id: "data-table-1",
     *             beforeParse: function (payload) {
     *                 payload.forEach((data, index) => {
     *                     payload[index][3] = payload[index][3] -= 10;
     *                 });
     *                 return payload;
     *             }
     *         }]
     *     }]
     * }
     **/
    dataTables?: Array<DataTable>;
}
export default DataPoolOptions;
