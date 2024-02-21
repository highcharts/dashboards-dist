/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Karol Kolodziej
 *
 * */
/* eslint-disable require-jsdoc, max-len */
'use strict';
import U from '../../../Core/Utilities.js';
const { addEvent, removeEvent } = U;
/* *
 *
 *  Constants
 *
 * */
const configs = {
    emitters: {
        highlightEmitter: function () {
            if (this.type !== 'DataGrid') {
                return;
            }
            const { dataGrid, board } = this;
            const highlightOptions = this.sync.syncConfig.highlight;
            if (!board || !dataGrid || !highlightOptions.enabled) {
                return;
            }
            const { dataCursor: cursor } = board;
            const onDataGridHover = (e) => {
                const table = this.connector && this.connector.table;
                if (table) {
                    const row = e.row;
                    const cell = row.querySelector(`.highcharts-datagrid-cell[data-original-data="${row.dataset.rowXIndex}"]`);
                    cursor.emitCursor(table, {
                        type: 'position',
                        row: parseInt(row.dataset.rowIndex, 10),
                        column: cell ? cell.dataset.columnName : void 0,
                        state: 'dataGrid.hoverRow'
                    });
                }
            };
            const onDataGridMouseOut = () => {
                const table = this.connector && this.connector.table;
                if (table) {
                    cursor.emitCursor(table, {
                        type: 'position',
                        state: 'dataGrid.hoverOut'
                    });
                }
            };
            addEvent(dataGrid.container, 'dataGridHover', onDataGridHover);
            addEvent(dataGrid.container, 'mouseout', onDataGridMouseOut);
            // Return a function that calls the callbacks
            return function () {
                removeEvent(dataGrid.container, 'dataGridHover', onDataGridHover);
                removeEvent(dataGrid.container, 'mouseout', onDataGridMouseOut);
            };
        }
    },
    handlers: {
        highlightHandler: function () {
            const { board } = this;
            const highlightOptions = this.sync.syncConfig.highlight;
            if (!highlightOptions.enabled) {
                return;
            }
            const handleCursor = (e) => {
                const cursor = e.cursor;
                if (cursor.type === 'position') {
                    const { row } = cursor;
                    const { dataGrid } = this;
                    if (row !== void 0 && dataGrid) {
                        const highlightedDataRow = dataGrid.container
                            .querySelector(`.highcharts-datagrid-row[data-row-index="${row}"]`);
                        if (highlightedDataRow) {
                            dataGrid.toggleRowHighlight(highlightedDataRow);
                            dataGrid.hoveredRow = highlightedDataRow;
                        }
                    }
                }
            };
            const handleCursorOut = () => {
                const { dataGrid } = this;
                if (dataGrid) {
                    dataGrid.toggleRowHighlight(void 0);
                }
            };
            const registerCursorListeners = () => {
                const { dataCursor: cursor } = board;
                if (!cursor) {
                    return;
                }
                const table = this.connector && this.connector.table;
                if (!table) {
                    return;
                }
                cursor.addListener(table.id, 'point.mouseOver', handleCursor);
                cursor.addListener(table.id, 'point.mouseOut', handleCursorOut);
            };
            const unregisterCursorListeners = () => {
                const cursor = board.dataCursor;
                const table = this.connector && this.connector.table;
                if (!table) {
                    return;
                }
                cursor.removeListener(table.id, 'point.mouseOver', handleCursor);
                cursor.removeListener(table.id, 'point.mouseOut', handleCursorOut);
            };
            if (board) {
                registerCursorListeners();
                return unregisterCursorListeners;
            }
        },
        extremesHandler: function () {
            const { board } = this;
            const handleChangeExtremes = (e) => {
                const cursor = e.cursor;
                if (cursor.type === 'position' &&
                    this.dataGrid &&
                    typeof cursor?.row === 'number') {
                    const { row } = cursor;
                    this.dataGrid.scrollToRow(row);
                }
            };
            const registerCursorListeners = () => {
                const { dataCursor: cursor } = board;
                if (!cursor) {
                    return;
                }
                const table = this.connector && this.connector.table;
                if (!table) {
                    return;
                }
                cursor.addListener(table.id, 'xAxis.extremes.min', handleChangeExtremes);
            };
            const unregisterCursorListeners = () => {
                const table = this.connector && this.connector.table;
                const { dataCursor: cursor } = board;
                if (!table) {
                    return;
                }
                cursor.removeListener(table.id, 'xAxis.extremes.min', handleChangeExtremes);
            };
            if (board) {
                registerCursorListeners();
                return unregisterCursorListeners;
            }
        },
        visibilityHandler: function () {
            const component = this, { board } = component;
            const handleVisibilityChange = (e) => {
                const cursor = e.cursor, dataGrid = component.dataGrid;
                if (!(dataGrid && cursor.type === 'position' && cursor.column)) {
                    return;
                }
                const columnName = cursor.column;
                dataGrid.update({
                    columns: {
                        [columnName]: {
                            show: cursor.state !== 'series.hide'
                        }
                    }
                });
            };
            const registerCursorListeners = () => {
                const { dataCursor: cursor } = board;
                if (!cursor) {
                    return;
                }
                const table = this.connector && this.connector.table;
                if (!table) {
                    return;
                }
                cursor.addListener(table.id, 'series.show', handleVisibilityChange);
                cursor.addListener(table.id, 'series.hide', handleVisibilityChange);
            };
            const unregisterCursorListeners = () => {
                const table = this.connector && this.connector.table;
                const { dataCursor: cursor } = board;
                if (!table) {
                    return;
                }
                cursor.removeListener(table.id, 'series.show', handleVisibilityChange);
                cursor.removeListener(table.id, 'series.hide', handleVisibilityChange);
            };
            if (board) {
                registerCursorListeners();
                return unregisterCursorListeners;
            }
        }
    }
};
const defaults = {
    highlight: { emitter: configs.emitters.highlightEmitter, handler: configs.handlers.highlightHandler },
    extremes: { handler: configs.handlers.extremesHandler },
    visibility: { handler: configs.handlers.visibilityHandler }
};
export default defaults;
