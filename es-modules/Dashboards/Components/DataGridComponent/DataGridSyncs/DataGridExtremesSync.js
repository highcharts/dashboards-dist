/* *
 *
 *  (c) 2009-2025 Highsoft AS
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
/* *
 *
 *  Constants
 *
 * */
const defaultOptions = {};
const syncPair = {
    emitter: void 0,
    handler: function () {
        if (this.type !== 'DataGrid' && // To be removed in v4
            this.type !== 'Grid') {
            return;
        }
        const component = this;
        const syncOptions = this.sync.syncConfig.extremes;
        const groupKey = syncOptions.group ?
            ':' + syncOptions.group : '';
        const { board } = component;
        const handleChangeExtremes = (e) => {
            const cursor = e.cursor;
            if (cursor.type === 'position' &&
                component.dataGrid &&
                typeof cursor?.row === 'number') {
                const { row } = cursor;
                const { viewport } = component.dataGrid;
                const rowIndex = viewport?.dataTable?.getLocalRowIndex(row);
                if (rowIndex !== void 0) {
                    component.dataGrid.viewport?.scrollToRow(rowIndex);
                }
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
            cursor.addListener(table.id, 'xAxis.extremes.min' + groupKey, handleChangeExtremes);
        };
        const unregisterCursorListeners = () => {
            const table = component.connectorHandlers?.[0]?.connector?.table;
            const { dataCursor: cursor } = board;
            if (!table) {
                return;
            }
            cursor.removeListener(table.id, 'xAxis.extremes.min' + groupKey, handleChangeExtremes);
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
