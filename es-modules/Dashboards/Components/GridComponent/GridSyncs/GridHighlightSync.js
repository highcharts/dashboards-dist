/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Dawid Draguła
 *
 * */
'use strict';
import { hasDataTableProvider } from '../GridDataProvider.js';
import { addEvent, removeEvent } from '../../../../Shared/Utilities.js';
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
        if (this.type !== 'Grid') {
            return;
        }
        const component = this;
        const { grid, board } = component;
        const highlightOptions = this.sync.syncConfig.highlight;
        const groupKey = highlightOptions.group ?
            ':' + highlightOptions.group : '';
        if (!board || !grid || !highlightOptions?.enabled) {
            return;
        }
        const { dataCursor: cursor } = board;
        const table = this.getDataTable();
        const dataProvider = grid.dataProvider;
        const presentationTable = hasDataTableProvider(dataProvider) ?
            dataProvider.getDataTable(true) :
            void 0;
        const onCellHover = (e) => {
            if (table) {
                const cell = e.target;
                const localIndex = cell.row.index;
                const originalIndex = presentationTable?.getOriginalRowIndex(localIndex);
                if (typeof originalIndex !== 'number') {
                    return;
                }
                cursor.emitCursor(table, {
                    type: 'position',
                    row: originalIndex,
                    column: cell.column.id,
                    state: 'point.mouseOver' + groupKey,
                    sourceId: this.id
                });
            }
        };
        const onCellMouseOut = (e) => {
            if (table) {
                const cell = e.target;
                const localIndex = cell.row.index;
                const originalIndex = presentationTable?.getOriginalRowIndex(localIndex);
                if (typeof originalIndex !== 'number') {
                    return;
                }
                cursor.emitCursor(table, {
                    type: 'position',
                    row: originalIndex,
                    column: cell.column.id,
                    state: 'point.mouseOut' + groupKey,
                    sourceId: this.id
                });
            }
        };
        addEvent(grid, 'cellMouseOver', onCellHover);
        addEvent(grid, 'cellMouseOut', onCellMouseOut);
        // Return a function that calls the callbacks
        return function () {
            removeEvent(grid.container, 'cellMouseOver', onCellHover);
            removeEvent(grid.container, 'cellMouseOut', onCellMouseOut);
        };
    },
    handler: function () {
        if (this.type !== 'Grid') {
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
        const table = component.getDataTable();
        const handleCursor = (e) => {
            const cursor = e.cursor;
            if (cursor.sourceId === component.id ||
                cursor.type !== 'position') {
                return;
            }
            const { row, column } = cursor;
            const { grid } = component;
            const viewport = grid?.viewport;
            const dataProvider = grid?.dataProvider;
            const presentationTable = hasDataTableProvider(dataProvider) ?
                dataProvider.getDataTable(true) :
                void 0;
            if (row === void 0 || !viewport) {
                return;
            }
            const rowIndex = presentationTable?.getLocalRowIndex(row);
            if (rowIndex === void 0) {
                return;
            }
            if (highlightOptions.autoScroll) {
                viewport.scrollToRow(rowIndex);
            }
            grid.syncRow(rowIndex);
            grid.syncColumn(column);
        };
        const handleCursorOut = (e) => {
            const { grid } = component;
            if (grid && e.cursor.sourceId !== component.id) {
                grid.syncColumn();
                grid.syncRow();
            }
        };
        const registerCursorListeners = () => {
            const { dataCursor: cursor } = board;
            if (!cursor) {
                return;
            }
            if (!table) {
                return;
            }
            cursor.addListener(table.id, 'point.mouseOver' + groupKey, handleCursor);
            cursor.addListener(table.id, 'point.mouseOut' + groupKey, handleCursorOut);
        };
        const unregisterCursorListeners = () => {
            if (!table) {
                return;
            }
            const cursor = board.dataCursor;
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
