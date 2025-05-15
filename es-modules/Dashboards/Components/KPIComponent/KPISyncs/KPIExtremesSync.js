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
import U from '../../../../Core/Utilities.js';
const { defined } = U;
/* *
 *
 *  Constants
 *
 * */
const defaultOptions = {};
const syncPair = {
    emitter: void 0,
    handler: function () {
        if (this.type !== 'KPI') {
            return;
        }
        const component = this;
        const syncOptions = this.sync.syncConfig.extremes;
        const groupKey = syncOptions.group ? ':' + syncOptions.group : '';
        const { board } = this;
        const handleChangeExtremes = (e) => {
            const cursor = e.cursor;
            if (cursor.type === 'position' &&
                typeof cursor?.row === 'number' &&
                defined(cursor.column) &&
                component.connectorHandlers?.[0]?.connector &&
                !defined(component.options.value)) {
                const value = component.connectorHandlers[0].connector
                    .table.modified.getCellAsString(cursor.column, cursor.row);
                component.setValue(value);
            }
        };
        const registerCursorListeners = () => {
            const { dataCursor: cursor } = board;
            if (!cursor) {
                return;
            }
            const table = this.getFirstConnector()?.table;
            if (!table) {
                return;
            }
            cursor.addListener(table.id, 'xAxis.extremes.max' + groupKey, handleChangeExtremes);
        };
        const unregisterCursorListeners = () => {
            const table = this.getFirstConnector()?.table;
            const { dataCursor: cursor } = board;
            if (!table) {
                return;
            }
            cursor.removeListener(table.id, 'xAxis.extremes.max' + groupKey, handleChangeExtremes);
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
