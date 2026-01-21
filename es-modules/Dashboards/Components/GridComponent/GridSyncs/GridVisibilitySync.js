/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  A commercial license may be required depending on use.
 *  See www.highcharts.com/license
 *
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
        if (this.type !== 'Grid') {
            return;
        }
        const component = this;
        const syncOptions = this.sync.syncConfig.visibility;
        const groupKey = syncOptions.group ?
            ':' + syncOptions.group : '';
        const { board } = component;
        const handleVisibilityChange = (e) => {
            const cursor = e.cursor, grid = component.grid;
            if (!(grid && cursor.type === 'position' && cursor.column)) {
                return;
            }
            void grid.updateColumn(cursor.column, {
                enabled: cursor.state !== 'series.hide' + groupKey
            });
        };
        const registerCursorListeners = () => {
            const { dataCursor: cursor } = board;
            if (!cursor) {
                return;
            }
            const table = component.getDataTable();
            if (!table) {
                return;
            }
            cursor.addListener(table.id, 'series.show' + groupKey, handleVisibilityChange);
            cursor.addListener(table.id, 'series.hide' + groupKey, handleVisibilityChange);
        };
        const unregisterCursorListeners = () => {
            const table = component.getDataTable();
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
