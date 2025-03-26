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
        if (this.type !== 'DataGrid' && // To be removed in v4
            this.type !== 'Grid') {
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
        const onCellHover = (e) => {
            const table = this.getFirstConnector()?.table;
            if (table) {
                const cell = e.target;
                cursor.emitCursor(table, {
                    type: 'position',
                    row: cell.row.id,
                    column: cell.column.id,
                    state: 'dataGrid.hoverRow' + groupKey
                });
            }
        };
        const onCellMouseOut = () => {
            const table = this.getFirstConnector()?.table;
            if (table) {
                cursor.emitCursor(table, {
                    type: 'position',
                    state: 'dataGrid.hoverOut' + groupKey
                });
            }
        };
        addEvent(dataGrid, 'cellMouseOver', onCellHover);
        addEvent(dataGrid, 'cellMouseOut', onCellMouseOut);
        // Return a function that calls the callbacks
        return function () {
            removeEvent(dataGrid.container, 'cellMouseOver', onCellHover);
            removeEvent(dataGrid.container, 'cellMouseOut', onCellMouseOut);
        };
    },
    handler: function () {
        if (this.type !== 'DataGrid' && // To be removed in v4
            this.type !== 'Grid') {
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
        const handleCursor = (e) => {
            const cursor = e.cursor;
            if (cursor.type !== 'position') {
                return;
            }
            const { row, column } = cursor;
            const { dataGrid } = component;
            const viewport = dataGrid?.viewport;
            if (row === void 0 || !viewport) {
                return;
            }
            const rowIndex = viewport.dataTable.getLocalRowIndex(row);
            if (rowIndex === void 0) {
                return;
            }
            if (highlightOptions.autoScroll) {
                viewport.scrollToRow(rowIndex);
            }
            dataGrid.syncRow(rowIndex);
            dataGrid.syncColumn(column);
        };
        const handleCursorOut = () => {
            const { dataGrid } = component;
            if (dataGrid) {
                dataGrid.syncColumn();
                dataGrid.syncRow();
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
