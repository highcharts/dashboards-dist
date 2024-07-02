/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *
 * */
'use strict';
import U from '../../../../Core/Utilities.js';
const { addEvent, removeEvent } = U;
/* *
 *
 *  Constants
 *
 * */
const defaultOptions = {
    autoScroll: false
};
const syncPair = {
    emitter: function () {
        if (this.type !== 'DataGrid') {
            return;
        }
        const component = this;
        const { dataGrid, board } = component;
        const highlightOptions = this.sync.syncConfig.highlight;
        const groupKey = highlightOptions.group ?
            ':' + highlightOptions.group : '';
        if (!board || !dataGrid || !highlightOptions?.enabled) {
            return;
        }
        const { dataCursor: cursor } = board;
        const onDataGridHover = (e) => {
            const table = this.getFirstConnector()?.table;
            if (table) {
                const row = e.row;
                cursor.emitCursor(table, {
                    type: 'position',
                    row: parseInt(row.dataset.rowIndex, 10),
                    column: e.columnName,
                    state: 'dataGrid.hoverRow' + groupKey
                });
            }
        };
        const onDataGridMouseOut = () => {
            const table = this.getFirstConnector()?.table;
            if (table) {
                cursor.emitCursor(table, {
                    type: 'position',
                    state: 'dataGrid.hoverOut' + groupKey
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
    },
    handler: function () {
        if (this.type !== 'DataGrid') {
            return;
        }
        const component = this;
        const { board } = component;
        const highlightOptions = component.sync.syncConfig.highlight;
        const groupKey = highlightOptions.group ?
            ':' + highlightOptions.group : '';
        if (!highlightOptions?.enabled) {
            return;
        }
        let highlightTimeout;
        const handleCursor = (e) => {
            const cursor = e.cursor;
            if (cursor.type !== 'position') {
                return;
            }
            const { row } = cursor;
            const { dataGrid } = component;
            if (row === void 0 || !dataGrid) {
                return;
            }
            if (highlightOptions.autoScroll) {
                dataGrid.scrollToRow(row - Math.round(dataGrid.rowElements.length / 2) + 1);
            }
            if (highlightTimeout) {
                clearTimeout(highlightTimeout);
            }
            highlightTimeout = setTimeout(() => {
                const highlightedDataRow = dataGrid.container
                    .querySelector(`.highcharts-datagrid-row[data-row-index="${row}"]`);
                if (highlightedDataRow) {
                    dataGrid.toggleRowHighlight(highlightedDataRow);
                    dataGrid.hoveredRow = highlightedDataRow;
                }
            }, highlightOptions.autoScroll ? 10 : 0);
        };
        const handleCursorOut = () => {
            const { dataGrid } = component;
            if (dataGrid) {
                dataGrid.toggleRowHighlight(void 0);
            }
        };
        const registerCursorListeners = () => {
            const { dataCursor: cursor } = board;
            if (!cursor) {
                return;
            }
            const table = component.connectorHandlers?.[0]?.connector?.table;
            if (!table) {
                return;
            }
            cursor.addListener(table.id, 'point.mouseOver' + groupKey, handleCursor);
            cursor.addListener(table.id, 'point.mouseOut' + groupKey, handleCursorOut);
        };
        const unregisterCursorListeners = () => {
            const cursor = board.dataCursor;
            const table = component.connectorHandlers?.[0]?.connector?.table;
            if (!table) {
                return;
            }
            cursor.removeListener(table.id, 'point.mouseOver' + groupKey, handleCursor);
            cursor.removeListener(table.id, 'point.mouseOut' + groupKey, handleCursorOut);
        };
        if (board) {
            registerCursorListeners();
            return unregisterCursorListeners;
        }
    }
};
/* *
*
*  Default export
*
* */
export default { defaultOptions, syncPair };
