import type DataEvent from './DataEvent.js';
import type DataTable from './DataTable.js';
import type DataTableOptions from './DataTableOptions.js';
/**
 * Class to manage columns and rows in a table structure. It provides methods
 * to add, remove, and manipulate columns and rows, as well as to retrieve data
 * from specific cells.
 *
 * @class
 * @name Highcharts.DataTable
 *
 * @param {Highcharts.DataTableOptions} [options]
 * Options to initialize the new DataTable instance.
 */
declare class DataTableCore {
    /**
     * Constructs an instance of the DataTable class.
     *
     * @example
     * const dataTable = new Highcharts.DataTableCore({
     *   columns: {
     *     year: [2020, 2021, 2022, 2023],
     *     cost: [11, 13, 12, 14],
     *     revenue: [12, 15, 14, 18]
     *   }
     * });

     *
     * @param {Highcharts.DataTableOptions} [options]
     * Options to initialize the new DataTable instance.
     */
    constructor(options?: DataTableOptions);
    readonly autoId: boolean;
    readonly columns: Record<string, DataTable.Column>;
    readonly id: string;
    modified: DataTableCore;
    rowCount: number;
    protected versionTag: string;
    /**
     * Applies a row count to the table by setting the `rowCount` property and
     * adjusting the length of all columns.
     *
     * @private
     * @param {number} rowCount The new row count.
     */
    protected applyRowCount(rowCount: number): void;
    /**
     * Fetches the given column by the canonical column name. Simplified version
     * of the full `DataTable.getRow` method, always returning by reference.
     *
     * @param {string} columnName
     * Name of the column to get.
     *
     * @return {Highcharts.DataTableColumn|undefined}
     * A copy of the column, or `undefined` if not found.
     */
    getColumn(columnName: string, asReference?: true): (DataTable.Column | undefined);
    /**
     * Retrieves all or the given columns. Simplified version of the full
     * `DataTable.getColumns` method, always returning by reference.
     *
     * @param {Array<string>} [columnNames]
     * Column names to retrieve.
     *
     * @return {Highcharts.DataTableColumnCollection}
     * Collection of columns. If a requested column was not found, it is
     * `undefined`.
     */
    getColumns(columnNames?: Array<string>, asReference?: true): DataTable.ColumnCollection;
    /**
     * Retrieves the row at a given index.
     *
     * @param {number} rowIndex
     * Row index to retrieve. First row has index 0.
     *
     * @param {Array<string>} [columnNames]
     * Column names to retrieve.
     *
     * @return {Record<string, number|string|undefined>|undefined}
     * Returns the row values, or `undefined` if not found.
     */
    getRow(rowIndex: number, columnNames?: Array<string>): (DataTable.Row | undefined);
    /**
     * Sets cell values for a column. Will insert a new column, if not found.
     *
     * @param {string} columnName
     * Column name to set.
     *
     * @param {Highcharts.DataTableColumn} [column]
     * Values to set in the column.
     *
     * @param {number} [rowIndex=0]
     * Index of the first row to change. (Default: 0)
     *
     * @param {Record<string, (boolean|number|string|null|undefined)>} [eventDetail]
     * Custom information for pending events.
     *
     * @emits #setColumns
     * @emits #afterSetColumns
     */
    setColumn(columnName: string, column?: DataTable.Column, rowIndex?: number, eventDetail?: DataEvent.Detail): void;
    /**
     * * Sets cell values for multiple columns. Will insert new columns, if not
     * found. Simplified version of the full `DataTable.setColumns`, limited to
     * full replacement of the columns (undefined `rowIndex`).
     *
     * @param {Highcharts.DataTableColumnCollection} columns
     * Columns as a collection, where the keys are the column names.
     *
     * @param {number} [rowIndex]
     * Index of the first row to change. Keep undefined to reset.
     *
     * @param {Record<string, (boolean|number|string|null|undefined)>} [eventDetail]
     * Custom information for pending events.
     *
     * @emits #setColumns
     * @emits #afterSetColumns
     */
    setColumns(columns: DataTable.ColumnCollection, rowIndex?: number, eventDetail?: DataEvent.Detail): void;
    /**
     * Sets cell values of a row. Will insert a new row if no index was
     * provided, or if the index is higher than the total number of table rows.
     * A simplified version of the full `DateTable.setRow`, limited to objects.
     *
     * @param {Record<string, number|string|undefined>} row
     * Cell values to set.
     *
     * @param {number} [rowIndex]
     * Index of the row to set. Leave `undefind` to add as a new row.
     *
     * @param {boolean} [insert]
     * Whether to insert the row at the given index, or to overwrite the row.
     *
     * @param {Record<string, (boolean|number|string|null|undefined)>} [eventDetail]
     * Custom information for pending events.
     *
     * @emits #afterSetRows
     */
    setRow(row: DataTable.RowObject, rowIndex?: number, insert?: boolean, eventDetail?: DataEvent.Detail): void;
}
/**
 * Additionally it provides necessary types for events.
 */
declare namespace DataTableCore {
    /**
     * Possible value types for a table cell.
     */
    type CellType = (boolean | number | null | string | undefined);
    /**
     * Array of table cells in vertical expansion.
     */
    interface Column extends Array<DataTable.CellType> {
        [index: number]: CellType;
    }
    /**
     * Collection of columns, where the key is the column name and
     * the value is an array of column values.
     */
    interface ColumnCollection {
        [columnName: string]: Column;
    }
    /**
     * Event object for column-related events.
     */
    interface ColumnEvent extends DataEvent {
        readonly type: ('deleteColumns' | 'afterDeleteColumns' | 'setColumns' | 'afterSetColumns');
        readonly columns?: ColumnCollection;
        readonly columnNames: Array<string>;
        readonly rowIndex?: number;
    }
    /**
     * All information objects of DataTable events.
     */
    type Event = (ColumnEvent | RowEvent);
    /**
     * Array of table cells in horizontal expansion. Index of the array is the
     * index of the column names.
     */
    interface Row extends Array<CellType> {
        [index: number]: CellType;
    }
    /**
     * Event object for row-related events.
     */
    interface RowEvent extends DataEvent {
        readonly type: ('deleteRows' | 'afterDeleteRows' | 'setRows' | 'afterSetRows');
        readonly rowCount: number;
        readonly rowIndex: number;
        readonly rows?: Array<(Row | RowObject)>;
    }
    /**
     * Object of row values, where the keys are the column names.
     */
    interface RowObject extends Record<string, CellType> {
        [column: string]: CellType;
    }
}
export default DataTableCore;
