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
        const syncOptions = this.sync.syncConfig.visibility;
        const groupKey = syncOptions.group ?
            ':' + syncOptions.group : '';
        const { board } = component;
        const handleVisibilityChange = (e) => {
            const cursor = e.cursor, dataGrid = component.dataGrid;
            if (!(dataGrid && cursor.type === 'position' && cursor.column)) {
                return;
            }
            void dataGrid.updateColumn(cursor.column, {
                enabled: cursor.state !== 'series.hide' + groupKey
            });
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
            cursor.addListener(table.id, 'series.show' + groupKey, handleVisibilityChange);
            cursor.addListener(table.id, 'series.hide' + groupKey, handleVisibilityChange);
        };
        const unregisterCursorListeners = () => {
            const table = component.connectorHandlers?.[0]?.connector?.table;
            const { dataCursor: cursor } = board;
            if (!table) {
                return;
            }
            cursor.removeListener(table.id, 'series.show' + groupKey, handleVisibilityChange);
            cursor.removeListener(table.id, 'series.hide' + groupKey, handleVisibilityChange);
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
