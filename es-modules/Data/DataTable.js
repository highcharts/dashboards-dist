/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *  - Gøran Slettemark
 *  - Jomar Hønsi
 *  - Dawid Dragula
 *
 * */
'use strict';
import CU from './ColumnUtils.js';
import DataTableCore from './DataTableCore.js';
import U from '../Core/Utilities.js';
const { addEvent, defined, extend, fireEvent, isNumber, uniqueKey } = U;
/* *
 *
 *  Class
 *
 * */
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
class DataTable extends DataTableCore {
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * Tests whether a row contains only `null` values or is equal to
     * DataTable.NULL. If all columns have `null` values, the function returns
     * `true`. Otherwise, it returns `false` to indicate that the row contains
     * at least one non-null value.
     *
     * @function Highcharts.DataTable.isNull
     *
     * @param {Highcharts.DataTableRow|Highcharts.DataTableRowObject} row
     * Row to test.
     *
     * @return {boolean}
     * Returns `true`, if the row contains only null, otherwise `false`.
     *
     * @example
     * if (DataTable.isNull(row)) {
     *   // handle null row
     * }
     */
    static isNull(row) {
        if (row === DataTable.NULL) {
            return true;
        }
        if (row instanceof Array) {
            if (!row.length) {
                return false;
            }
            for (let i = 0, iEnd = row.length; i < iEnd; ++i) {
                if (row[i] !== null) {
                    return false;
                }
            }
        }
        else {
            const columnNames = Object.keys(row);
            if (!columnNames.length) {
                return false;
            }
            for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                if (row[columnNames[i]] !== null) {
                    return false;
                }
            }
        }
        return true;
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor(options = {}) {
        super(options);
        this.modified = this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Returns a clone of this table. The cloned table is completely independent
     * of the original, and any changes made to the clone will not affect
     * the original table.
     *
     * @function Highcharts.DataTable#clone
     *
     * @param {boolean} [skipColumns]
     * Whether to clone columns or not.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Clone of this data table.
     *
     * @emits #cloneTable
     * @emits #afterCloneTable
     */
    clone(skipColumns, eventDetail) {
        const table = this, tableOptions = {};
        table.emit({ type: 'cloneTable', detail: eventDetail });
        if (!skipColumns) {
            tableOptions.columns = table.columns;
        }
        if (!table.autoId) {
            tableOptions.id = table.id;
        }
        const tableClone = new DataTable(tableOptions);
        if (!skipColumns) {
            tableClone.versionTag = table.versionTag;
            tableClone.originalRowIndexes = table.originalRowIndexes;
            tableClone.localRowIndexes = table.localRowIndexes;
        }
        table.emit({
            type: 'afterCloneTable',
            detail: eventDetail,
            tableClone
        });
        return tableClone;
    }
    /**
     * Deletes columns from the table.
     *
     * @function Highcharts.DataTable#deleteColumns
     *
     * @param {Array<string>} [columnNames]
     * Names of columns to delete. If no array is provided, all
     * columns will be deleted.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTableColumnCollection|undefined}
     * Returns the deleted columns, if found.
     *
     * @emits #deleteColumns
     * @emits #afterDeleteColumns
     */
    deleteColumns(columnNames, eventDetail) {
        const table = this, columns = table.columns, deletedColumns = {}, modifiedColumns = {}, modifier = table.modifier, rowCount = table.rowCount;
        columnNames = (columnNames || Object.keys(columns));
        if (columnNames.length) {
            table.emit({
                type: 'deleteColumns',
                columnNames,
                detail: eventDetail
            });
            for (let i = 0, iEnd = columnNames.length, column, columnName; i < iEnd; ++i) {
                columnName = columnNames[i];
                column = columns[columnName];
                if (column) {
                    deletedColumns[columnName] = column;
                    modifiedColumns[columnName] = new Array(rowCount);
                }
                delete columns[columnName];
            }
            if (!Object.keys(columns).length) {
                table.rowCount = 0;
                this.deleteRowIndexReferences();
            }
            if (modifier) {
                modifier.modifyColumns(table, modifiedColumns, 0, eventDetail);
            }
            table.emit({
                type: 'afterDeleteColumns',
                columns: deletedColumns,
                columnNames,
                detail: eventDetail
            });
            return deletedColumns;
        }
    }
    /**
     * Deletes the row index references. This is useful when the original table
     * is deleted, and the references are no longer needed. This table is
     * then considered an original table or a table that has the same row's
     * order as the original table.
     */
    deleteRowIndexReferences() {
        delete this.originalRowIndexes;
        delete this.localRowIndexes;
        // Here, in case of future need, can be implemented updating of the
        // modified tables' row indexes references.
    }
    /**
     * Deletes rows in this table.
     *
     * @function Highcharts.DataTable#deleteRows
     *
     * @param {number} [rowIndex]
     * Index to start delete of rows. If not specified, all rows will be
     * deleted.
     *
     * @param {number} [rowCount=1]
     * Number of rows to delete.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Array<Highcharts.DataTableRow>}
     * Returns the deleted rows, if found.
     *
     * @emits #deleteRows
     * @emits #afterDeleteRows
     */
    deleteRows(rowIndex, rowCount = 1, eventDetail) {
        const table = this, deletedRows = [], modifiedRows = [], modifier = table.modifier;
        table.emit({
            type: 'deleteRows',
            detail: eventDetail,
            rowCount,
            rowIndex: (rowIndex || 0)
        });
        if (typeof rowIndex === 'undefined') {
            rowIndex = 0;
            rowCount = table.rowCount;
        }
        if (rowCount > 0 && rowIndex < table.rowCount) {
            const columns = table.columns, columnNames = Object.keys(columns);
            for (let i = 0, iEnd = columnNames.length, column, deletedCells, columnName; i < iEnd; ++i) {
                columnName = columnNames[i];
                column = columns[columnName];
                const result = CU.splice(column, rowIndex, rowCount);
                deletedCells = result.removed;
                columns[columnName] = column = result.array;
                if (!i) {
                    table.rowCount = column.length;
                }
                for (let j = 0, jEnd = deletedCells.length; j < jEnd; ++j) {
                    deletedRows[j] = (deletedRows[j] || []);
                    deletedRows[j][i] = deletedCells[j];
                }
                modifiedRows.push(new Array(iEnd));
            }
        }
        if (modifier) {
            modifier.modifyRows(table, modifiedRows, (rowIndex || 0), eventDetail);
        }
        table.emit({
            type: 'afterDeleteRows',
            detail: eventDetail,
            rowCount,
            rowIndex: (rowIndex || 0),
            rows: deletedRows
        });
        return deletedRows;
    }
    /**
     * Emits an event on this table to all registered callbacks of the given
     * event.
     * @private
     *
     * @param {DataTable.Event} e
     * Event object with event information.
     */
    emit(e) {
        if ([
            'afterDeleteColumns',
            'afterDeleteRows',
            'afterSetCell',
            'afterSetColumns',
            'afterSetRows'
        ].includes(e.type)) {
            this.versionTag = uniqueKey();
        }
        fireEvent(this, e.type, e);
    }
    /**
     * Fetches a single cell value.
     *
     * @function Highcharts.DataTable#getCell
     *
     * @param {string} columnName
     * Column name of the cell to retrieve.
     *
     * @param {number} rowIndex
     * Row index of the cell to retrieve.
     *
     * @return {Highcharts.DataTableCellType|undefined}
     * Returns the cell value or `undefined`.
     */
    getCell(columnName, rowIndex) {
        const table = this;
        const column = table.columns[columnName];
        if (column) {
            return column[rowIndex];
        }
    }
    /**
     * Fetches a cell value for the given row as a boolean.
     *
     * @function Highcharts.DataTable#getCellAsBoolean
     *
     * @param {string} columnName
     * Column name to fetch.
     *
     * @param {number} rowIndex
     * Row index to fetch.
     *
     * @return {boolean}
     * Returns the cell value of the row as a boolean.
     */
    getCellAsBoolean(columnName, rowIndex) {
        const table = this;
        const column = table.columns[columnName];
        return !!(column && column[rowIndex]);
    }
    /**
     * Fetches a cell value for the given row as a number.
     *
     * @function Highcharts.DataTable#getCellAsNumber
     *
     * @param {string} columnName
     * Column name or to fetch.
     *
     * @param {number} rowIndex
     * Row index to fetch.
     *
     * @param {boolean} [useNaN]
     * Whether to return NaN instead of `null` and `undefined`.
     *
     * @return {number|null}
     * Returns the cell value of the row as a number.
     */
    getCellAsNumber(columnName, rowIndex, useNaN) {
        const table = this;
        const column = table.columns[columnName];
        let cellValue = (column && column[rowIndex]);
        switch (typeof cellValue) {
            case 'boolean':
                return (cellValue ? 1 : 0);
            case 'number':
                return (isNaN(cellValue) && !useNaN ? null : cellValue);
        }
        cellValue = parseFloat(`${cellValue ?? ''}`);
        return (isNaN(cellValue) && !useNaN ? null : cellValue);
    }
    /**
     * Fetches a cell value for the given row as a string.
     *
     * @function Highcharts.DataTable#getCellAsString
     *
     * @param {string} columnName
     * Column name to fetch.
     *
     * @param {number} rowIndex
     * Row index to fetch.
     *
     * @return {string}
     * Returns the cell value of the row as a string.
     */
    getCellAsString(columnName, rowIndex) {
        const table = this;
        const column = table.columns[columnName];
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `${(column && column[rowIndex])}`;
    }
    /**
     * Fetches the given column by the canonical column name.
     * This function is a simplified wrap of {@link getColumns}.
     *
     * @function Highcharts.DataTable#getColumn
     *
     * @param {string} columnName
     * Name of the column to get.
     *
     * @param {boolean} [asReference]
     * Whether to return the column as a readonly reference.
     *
     * @return {Highcharts.DataTableColumn|undefined}
     * A copy of the column, or `undefined` if not found.
     */
    getColumn(columnName, asReference) {
        return this.getColumns([columnName], asReference)[columnName];
    }
    /**
     * Fetches the given column by the canonical column name, and
     * validates the type of the first few cells. If the first defined cell is
     * of type number, it assumes for performance reasons, that all cells are of
     * type number or `null`. Otherwise it will convert all cells to number
     * type, except `null`.
     *
     * @deprecated
     *
     * @function Highcharts.DataTable#getColumnAsNumbers
     *
     * @param {string} columnName
     * Name of the column to get.
     *
     * @param {boolean} [useNaN]
     * Whether to use NaN instead of `null` and `undefined`.
     *
     * @return {Array<(number|null)>}
     * A copy of the column, or an empty array if not found.
     */
    getColumnAsNumbers(columnName, useNaN) {
        const table = this, columns = table.columns;
        const column = columns[columnName], columnAsNumber = [];
        if (column) {
            const columnLength = column.length;
            if (useNaN) {
                for (let i = 0; i < columnLength; ++i) {
                    columnAsNumber.push(table.getCellAsNumber(columnName, i, true));
                }
            }
            else {
                for (let i = 0, cellValue; i < columnLength; ++i) {
                    cellValue = column[i];
                    if (typeof cellValue === 'number') {
                        // Assume unmixed data for performance reasons
                        return column.slice();
                    }
                    if (cellValue !== null &&
                        typeof cellValue !== 'undefined') {
                        break;
                    }
                }
                for (let i = 0; i < columnLength; ++i) {
                    columnAsNumber.push(table.getCellAsNumber(columnName, i));
                }
            }
        }
        return columnAsNumber;
    }
    /**
     * Fetches all column names.
     *
     * @function Highcharts.DataTable#getColumnNames
     *
     * @return {Array<string>}
     * Returns all column names.
     */
    getColumnNames() {
        return Object.keys(this.columns);
    }
    /**
     * Retrieves all or the given columns.
     *
     * @function Highcharts.DataTable#getColumns
     *
     * @param {Array<string>} [columnNames]
     * Column names to retrieve.
     *
     * @param {boolean} [asReference]
     * Whether to return columns as a readonly reference.
     *
     * @param {boolean} [asBasicColumns]
     * Whether to transform all typed array columns to normal arrays.
     *
     * @return {Highcharts.DataTableColumnCollection}
     * Collection of columns. If a requested column was not found, it is
     * `undefined`.
     */
    getColumns(columnNames, asReference, asBasicColumns) {
        const table = this, tableColumns = table.columns, columns = {};
        columnNames = (columnNames || Object.keys(tableColumns));
        for (let i = 0, iEnd = columnNames.length, column, columnName; i < iEnd; ++i) {
            columnName = columnNames[i];
            column = tableColumns[columnName];
            if (column) {
                if (asReference) {
                    columns[columnName] = column;
                }
                else if (asBasicColumns && !Array.isArray(column)) {
                    columns[columnName] = Array.from(column);
                }
                else {
                    columns[columnName] = column.slice();
                }
            }
        }
        return columns;
    }
    /**
     * Takes the original row index and returns the local row index in the
     * modified table for which this function is called.
     *
     * @param {number} originalRowIndex
     * Original row index to get the local row index for.
     *
     * @return {number|undefined}
     * Returns the local row index or `undefined` if not found.
     */
    getLocalRowIndex(originalRowIndex) {
        const { localRowIndexes } = this;
        if (localRowIndexes) {
            return localRowIndexes[originalRowIndex];
        }
        return originalRowIndex;
    }
    /**
     * Retrieves the modifier for the table.
     * @private
     *
     * @return {Highcharts.DataModifier|undefined}
     * Returns the modifier or `undefined`.
     */
    getModifier() {
        return this.modifier;
    }
    /**
     * Takes the local row index and returns the index of the corresponding row
     * in the original table.
     *
     * @param {number} rowIndex
     * Local row index to get the original row index for.
     *
     * @return {number|undefined}
     * Returns the original row index or `undefined` if not found.
     */
    getOriginalRowIndex(rowIndex) {
        const { originalRowIndexes } = this;
        if (originalRowIndexes) {
            return originalRowIndexes[rowIndex];
        }
        return rowIndex;
    }
    /**
     * Retrieves the row at a given index. This function is a simplified wrap of
     * {@link getRows}.
     *
     * @function Highcharts.DataTable#getRow
     *
     * @param {number} rowIndex
     * Row index to retrieve. First row has index 0.
     *
     * @param {Array<string>} [columnNames]
     * Column names in order to retrieve.
     *
     * @return {Highcharts.DataTableRow}
     * Returns the row values, or `undefined` if not found.
     */
    getRow(rowIndex, columnNames) {
        return this.getRows(rowIndex, 1, columnNames)[0];
    }
    /**
     * Returns the number of rows in this table.
     *
     * @function Highcharts.DataTable#getRowCount
     *
     * @return {number}
     * Number of rows in this table.
     */
    getRowCount() {
        // @todo Implement via property getter `.length` browsers supported
        return this.rowCount;
    }
    /**
     * Retrieves the index of the first row matching a specific cell value.
     *
     * @function Highcharts.DataTable#getRowIndexBy
     *
     * @param {string} columnName
     * Column to search in.
     *
     * @param {Highcharts.DataTableCellType} cellValue
     * Cell value to search for. `NaN` and `undefined` are not supported.
     *
     * @param {number} [rowIndexOffset]
     * Index offset to start searching.
     *
     * @return {number|undefined}
     * Index of the first row matching the cell value.
     */
    getRowIndexBy(columnName, cellValue, rowIndexOffset) {
        const table = this;
        const column = table.columns[columnName];
        if (column) {
            let rowIndex = -1;
            if (Array.isArray(column)) {
                // Normal array
                rowIndex = column.indexOf(cellValue, rowIndexOffset);
            }
            else if (isNumber(cellValue)) {
                // Typed array
                rowIndex = column.indexOf(cellValue, rowIndexOffset);
            }
            if (rowIndex !== -1) {
                return rowIndex;
            }
        }
    }
    /**
     * Retrieves the row at a given index. This function is a simplified wrap of
     * {@link getRowObjects}.
     *
     * @function Highcharts.DataTable#getRowObject
     *
     * @param {number} rowIndex
     * Row index.
     *
     * @param {Array<string>} [columnNames]
     * Column names and their order to retrieve.
     *
     * @return {Highcharts.DataTableRowObject}
     * Returns the row values, or `undefined` if not found.
     */
    getRowObject(rowIndex, columnNames) {
        return this.getRowObjects(rowIndex, 1, columnNames)[0];
    }
    /**
     * Fetches all or a number of rows.
     *
     * @function Highcharts.DataTable#getRowObjects
     *
     * @param {number} [rowIndex]
     * Index of the first row to fetch. Defaults to first row at index `0`.
     *
     * @param {number} [rowCount]
     * Number of rows to fetch. Defaults to maximal number of rows.
     *
     * @param {Array<string>} [columnNames]
     * Column names and their order to retrieve.
     *
     * @return {Highcharts.DataTableRowObject}
     * Returns retrieved rows.
     */
    getRowObjects(rowIndex = 0, rowCount = (this.rowCount - rowIndex), columnNames) {
        const table = this, columns = table.columns, rows = new Array(rowCount);
        columnNames = (columnNames || Object.keys(columns));
        for (let i = rowIndex, i2 = 0, iEnd = Math.min(table.rowCount, (rowIndex + rowCount)), column, row; i < iEnd; ++i, ++i2) {
            row = rows[i2] = {};
            for (const columnName of columnNames) {
                column = columns[columnName];
                row[columnName] = (column ? column[i] : void 0);
            }
        }
        return rows;
    }
    /**
     * Fetches all or a number of rows.
     *
     * @function Highcharts.DataTable#getRows
     *
     * @param {number} [rowIndex]
     * Index of the first row to fetch. Defaults to first row at index `0`.
     *
     * @param {number} [rowCount]
     * Number of rows to fetch. Defaults to maximal number of rows.
     *
     * @param {Array<string>} [columnNames]
     * Column names and their order to retrieve.
     *
     * @return {Highcharts.DataTableRow}
     * Returns retrieved rows.
     */
    getRows(rowIndex = 0, rowCount = (this.rowCount - rowIndex), columnNames) {
        const table = this, columns = table.columns, rows = new Array(rowCount);
        columnNames = (columnNames || Object.keys(columns));
        for (let i = rowIndex, i2 = 0, iEnd = Math.min(table.rowCount, (rowIndex + rowCount)), column, row; i < iEnd; ++i, ++i2) {
            row = rows[i2] = [];
            for (const columnName of columnNames) {
                column = columns[columnName];
                row.push(column ? column[i] : void 0);
            }
        }
        return rows;
    }
    /**
     * Returns the unique version tag of the current state of the table.
     *
     * @function Highcharts.DataTable#getVersionTag
     *
     * @return {string}
     * Unique version tag.
     */
    getVersionTag() {
        return this.versionTag;
    }
    /**
     * Checks for given column names.
     *
     * @function Highcharts.DataTable#hasColumns
     *
     * @param {Array<string>} columnNames
     * Column names to check.
     *
     * @return {boolean}
     * Returns `true` if all columns have been found, otherwise `false`.
     */
    hasColumns(columnNames) {
        const table = this, columns = table.columns;
        for (let i = 0, iEnd = columnNames.length, columnName; i < iEnd; ++i) {
            columnName = columnNames[i];
            if (!columns[columnName]) {
                return false;
            }
        }
        return true;
    }
    /**
     * Searches for a specific cell value.
     *
     * @function Highcharts.DataTable#hasRowWith
     *
     * @param {string} columnName
     * Column to search in.
     *
     * @param {Highcharts.DataTableCellType} cellValue
     * Cell value to search for. `NaN` and `undefined` are not supported.
     *
     * @return {boolean}
     * True, if a row has been found, otherwise false.
     */
    hasRowWith(columnName, cellValue) {
        const table = this;
        const column = table.columns[columnName];
        // Normal array
        if (Array.isArray(column)) {
            return (column.indexOf(cellValue) !== -1);
        }
        // Typed array
        if (defined(cellValue) && Number.isFinite(cellValue)) {
            return (column.indexOf(+cellValue) !== -1);
        }
        return false;
    }
    /**
     * Registers a callback for a specific event.
     *
     * @function Highcharts.DataTable#on
     *
     * @param {string} type
     * Event type as a string.
     *
     * @param {Highcharts.EventCallbackFunction<Highcharts.DataTable>} callback
     * Function to register for an event callback.
     *
     * @return {Function}
     * Function to unregister callback from the event.
     */
    on(type, callback) {
        return addEvent(this, type, callback);
    }
    /**
     * Renames a column of cell values.
     *
     * @function Highcharts.DataTable#renameColumn
     *
     * @param {string} columnName
     * Name of the column to be renamed.
     *
     * @param {string} newColumnName
     * New name of the column. An existing column with the same name will be
     * replaced.
     *
     * @return {boolean}
     * Returns `true` if successful, `false` if the column was not found.
     */
    renameColumn(columnName, newColumnName) {
        const table = this, columns = table.columns;
        if (columns[columnName]) {
            if (columnName !== newColumnName) {
                columns[newColumnName] = columns[columnName];
                delete columns[columnName];
            }
            return true;
        }
        return false;
    }
    /**
     * Sets a cell value based on the row index and column.  Will
     * insert a new column, if not found.
     *
     * @function Highcharts.DataTable#setCell
     *
     * @param {string} columnName
     * Column name to set.
     *
     * @param {number|undefined} rowIndex
     * Row index to set.
     *
     * @param {Highcharts.DataTableCellType} cellValue
     * Cell value to set.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits #setCell
     * @emits #afterSetCell
     */
    setCell(columnName, rowIndex, cellValue, eventDetail) {
        const table = this, columns = table.columns, modifier = table.modifier;
        let column = columns[columnName];
        if (column && column[rowIndex] === cellValue) {
            return;
        }
        table.emit({
            type: 'setCell',
            cellValue,
            columnName: columnName,
            detail: eventDetail,
            rowIndex
        });
        if (!column) {
            column = columns[columnName] = new Array(table.rowCount);
        }
        if (rowIndex >= table.rowCount) {
            table.rowCount = (rowIndex + 1);
        }
        column[rowIndex] = cellValue;
        if (modifier) {
            modifier.modifyCell(table, columnName, rowIndex, cellValue);
        }
        table.emit({
            type: 'afterSetCell',
            cellValue,
            columnName: columnName,
            detail: eventDetail,
            rowIndex
        });
    }
    /**
     * Sets cell values for multiple columns. Will insert new columns, if not
     * found.
     *
     * @function Highcharts.DataTable#setColumns
     *
     * @param {Highcharts.DataTableColumnCollection} columns
     * Columns as a collection, where the keys are the column names.
     *
     * @param {number} [rowIndex]
     * Index of the first row to change. Keep undefined to reset.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @param {boolean} [typeAsOriginal=false]
     * Determines whether the original column retains its type when data
     * replaced. If `true`, the original column keeps its type. If not
     * (default), the original column will adopt the type of the replacement
     * column.
     *
     * @emits #setColumns
     * @emits #afterSetColumns
     */
    setColumns(columns, rowIndex, eventDetail, typeAsOriginal) {
        const table = this, tableColumns = table.columns, tableModifier = table.modifier, columnNames = Object.keys(columns);
        let rowCount = table.rowCount;
        table.emit({
            type: 'setColumns',
            columns,
            columnNames,
            detail: eventDetail,
            rowIndex
        });
        if (!defined(rowIndex) && !typeAsOriginal) {
            super.setColumns(columns, rowIndex, extend(eventDetail, { silent: true }));
        }
        else {
            for (let i = 0, iEnd = columnNames.length, column, tableColumn, columnName, ArrayConstructor; i < iEnd; ++i) {
                columnName = columnNames[i];
                column = columns[columnName];
                tableColumn = tableColumns[columnName];
                ArrayConstructor = Object.getPrototypeOf((tableColumn && typeAsOriginal) ? tableColumn : column).constructor;
                if (!tableColumn) {
                    tableColumn = new ArrayConstructor(rowCount);
                }
                else if (ArrayConstructor === Array) {
                    if (!Array.isArray(tableColumn)) {
                        tableColumn = Array.from(tableColumn);
                    }
                }
                else if (tableColumn.length < rowCount) {
                    tableColumn =
                        new ArrayConstructor(rowCount);
                    tableColumn.set(tableColumns[columnName]);
                }
                tableColumns[columnName] = tableColumn;
                for (let i = (rowIndex || 0), iEnd = column.length; i < iEnd; ++i) {
                    tableColumn[i] = column[i];
                }
                rowCount = Math.max(rowCount, column.length);
            }
            this.applyRowCount(rowCount);
        }
        if (tableModifier) {
            tableModifier.modifyColumns(table, columns, rowIndex || 0);
        }
        table.emit({
            type: 'afterSetColumns',
            columns,
            columnNames,
            detail: eventDetail,
            rowIndex
        });
    }
    /**
     * Sets or unsets the modifier for the table.
     *
     * @param {Highcharts.DataModifier} [modifier]
     * Modifier to set, or `undefined` to unset.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Promise<Highcharts.DataTable>}
     * Resolves to this table if successful, or rejects on failure.
     *
     * @emits #setModifier
     * @emits #afterSetModifier
     */
    setModifier(modifier, eventDetail) {
        const table = this;
        let promise;
        table.emit({
            type: 'setModifier',
            detail: eventDetail,
            modifier,
            modified: table.modified
        });
        table.modified = table;
        table.modifier = modifier;
        if (modifier) {
            promise = modifier.modify(table);
        }
        else {
            promise = Promise.resolve(table);
        }
        return promise
            .then((table) => {
            table.emit({
                type: 'afterSetModifier',
                detail: eventDetail,
                modifier,
                modified: table.modified
            });
            return table;
        })['catch']((error) => {
            table.emit({
                type: 'setModifierError',
                error,
                modifier,
                modified: table.modified
            });
            throw error;
        });
    }
    /**
     * Sets the original row indexes for the table. It is used to keep the
     * reference to the original rows when modifying the table.
     *
     * @param {Array<number|undefined>} originalRowIndexes
     * Original row indexes array.
     *
     * @param {boolean} omitLocalRowIndexes
     * Whether to omit the local row indexes calculation. Defaults to `false`.
     */
    setOriginalRowIndexes(originalRowIndexes, omitLocalRowIndexes = false) {
        this.originalRowIndexes = originalRowIndexes;
        if (omitLocalRowIndexes) {
            return;
        }
        const modifiedIndexes = this.localRowIndexes = [];
        for (let i = 0, iEnd = originalRowIndexes.length, originalIndex; i < iEnd; ++i) {
            originalIndex = originalRowIndexes[i];
            if (defined(originalIndex)) {
                modifiedIndexes[originalIndex] = i;
            }
        }
    }
    /**
     * Sets cell values of a row. Will insert a new row, if no index was
     * provided, or if the index is higher than the total number of table rows.
     *
     * Note: This function is just a simplified wrap of
     * {@link Highcharts.DataTable#setRows}.
     *
     * @function Highcharts.DataTable#setRow
     *
     * @param {Highcharts.DataTableRow|Highcharts.DataTableRowObject} row
     * Cell values to set.
     *
     * @param {number} [rowIndex]
     * Index of the row to set. Leave `undefind` to add as a new row.
     *
     * @param {boolean} [insert]
     * Whether to insert the row at the given index, or to overwrite the row.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits #setRows
     * @emits #afterSetRows
     */
    setRow(row, rowIndex, insert, eventDetail) {
        this.setRows([row], rowIndex, insert, eventDetail);
    }
    /**
     * Sets cell values for multiple rows. Will insert new rows, if no index was
     * was provided, or if the index is higher than the total number of table
     * rows.
     *
     * @function Highcharts.DataTable#setRows
     *
     * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
     * Row values to set.
     *
     * @param {number} [rowIndex]
     * Index of the first row to set. Leave `undefined` to add as new rows.
     *
     * @param {boolean} [insert]
     * Whether to insert the row at the given index, or to overwrite the row.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits #setRows
     * @emits #afterSetRows
     */
    setRows(rows, rowIndex = this.rowCount, insert, eventDetail) {
        const table = this, columns = table.columns, columnNames = Object.keys(columns), modifier = table.modifier, rowCount = rows.length;
        table.emit({
            type: 'setRows',
            detail: eventDetail,
            rowCount,
            rowIndex,
            rows
        });
        for (let i = 0, i2 = rowIndex, row; i < rowCount; ++i, ++i2) {
            row = rows[i];
            if (row === DataTable.NULL) {
                for (let j = 0, jEnd = columnNames.length; j < jEnd; ++j) {
                    const column = columns[columnNames[j]];
                    if (insert) {
                        columns[columnNames[j]] = CU.splice(column, i2, 0, true, [null]).array;
                    }
                    else {
                        column[i2] = null;
                    }
                }
            }
            else if (row instanceof Array) {
                for (let j = 0, jEnd = columnNames.length; j < jEnd; ++j) {
                    columns[columnNames[j]][i2] = row[j];
                }
            }
            else {
                super.setRow(row, i2, void 0, { silent: true });
            }
        }
        const indexRowCount = insert ?
            rowCount + rows.length :
            rowIndex + rowCount;
        if (indexRowCount > table.rowCount) {
            table.rowCount = indexRowCount;
            for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                const columnName = columnNames[i];
                columns[columnName] = CU.setLength(columns[columnName], indexRowCount);
            }
        }
        if (modifier) {
            modifier.modifyRows(table, rows, rowIndex);
        }
        table.emit({
            type: 'afterSetRows',
            detail: eventDetail,
            rowCount,
            rowIndex,
            rows
        });
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * Null state for a row record. In some cases, a row in a table may not
 * contain any data or may be invalid. In these cases, a null state can be
 * used to indicate that the row record is empty or invalid.
 *
 * @name Highcharts.DataTable.NULL
 * @type {Highcharts.DataTableRowObject}
 *
 * @see {@link Highcharts.DataTable.isNull} for a null test.
 *
 * @example
 * table.setRows([DataTable.NULL, DataTable.NULL], 10);
 */
DataTable.NULL = {};
/**
 * Semantic version string of the DataTable class.
 * @internal
 */
DataTable.version = '1.0.0';
/* *
 *
 *  Default Export
 *
 * */
export default DataTable;
