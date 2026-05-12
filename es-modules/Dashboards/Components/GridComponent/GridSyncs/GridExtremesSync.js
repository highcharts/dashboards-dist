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
        const syncOptions = this.sync.syncConfig.extremes;
        const groupKey = syncOptions.group ?
            ':' + syncOptions.group : '';
        const { board } = component;
        const handleChangeExtremes = (e) => {
            const cursor = e.cursor;
            if (cursor.type === 'position' &&
                component.grid &&
                typeof cursor?.row === 'number') {
                const { row } = cursor;
                const dataProvider = component.grid.dataProvider;
                const rowIndex = hasDataTableProvider(dataProvider) ?
                    dataProvider.getDataTable(true)?.getLocalRowIndex(row) :
                    void 0;
                if (rowIndex !== void 0) {
                    component.grid.viewport?.scrollToRow(rowIndex);
                }
            }
        };
        const registerCursorListeners = () => {
            const { dataCursor: cursor } = board;
            if (!cursor) {
                return;
            }
            const table = component.connectorHandlers?.[0]?.connector?.getTable();
            if (!table) {
                return;
            }
            cursor.addListener(table.id, 'xAxis.extremes.min' + groupKey, handleChangeExtremes);
        };
        const unregisterCursorListeners = () => {
            const table = component.connectorHandlers?.[0]?.connector?.getTable();
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
