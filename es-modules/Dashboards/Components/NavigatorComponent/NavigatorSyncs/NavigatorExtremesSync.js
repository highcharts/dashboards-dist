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
import DataModifier from '../../../../Data/Modifiers/DataModifier.js';
import NavigatorSyncUtils from './NavigatorSyncUtils.js';
import U from '../../../../Core/Utilities.js';
const { Range: RangeModifier } = DataModifier.types;
const { addEvent, pick, defined } = U;
/* *
 *
 *  Constants
 *
 * */
const defaultOptions = {};
const syncPair = {
    emitter: function () {
        if (this.type !== 'Navigator') {
            return;
        }
        const component = this;
        const syncOptions = this.sync.syncConfig.extremes;
        const groupKey = syncOptions.group ? ':' + syncOptions.group : '';
        const afterSetExtremes = (extremes) => {
            if (component.connectorHandlers?.[0]?.connector) {
                const table = component.connectorHandlers[0].connector.table, dataCursor = component.board.dataCursor, filterColumn = component.getColumnAssignment()[0], [min, max] = component.getAxisExtremes();
                dataCursor.emitCursor(table, {
                    type: 'position',
                    column: filterColumn,
                    row: table.getRowIndexBy(filterColumn, min),
                    state: 'xAxis.extremes.min' + groupKey
                }, extremes);
                dataCursor.emitCursor(table, {
                    type: 'position',
                    column: filterColumn,
                    row: table.getRowIndexBy(filterColumn, max),
                    state: 'xAxis.extremes.max' + groupKey
                }, extremes);
            }
        };
        let delay;
        return addEvent(component.chart.xAxis[0], 'afterSetExtremes', function (extremes) {
            clearTimeout(delay);
            delay = setTimeout(afterSetExtremes, 50, this, extremes);
        });
    },
    handler: function () {
        if (this.type !== 'Navigator') {
            return;
        }
        const component = this;
        const syncOptions = this.sync.syncConfig.extremes;
        const groupKey = syncOptions.group ? ':' + syncOptions.group : '';
        const dataCursor = component.board.dataCursor;
        const extremesListener = (e) => {
            const cursor = e.cursor;
            if (!component.connectorHandlers?.[0]?.connector) {
                return;
            }
            const table = component.connectorHandlers[0].connector.table;
            // Assume first column with unique keys as fallback
            let extremesColumn = table.getColumnNames()[0], maxIndex = table.getRowCount(), minIndex = 0;
            if (cursor.type === 'range') {
                maxIndex = cursor.lastRow;
                minIndex = cursor.firstRow;
                if (cursor.columns) {
                    extremesColumn = pick(cursor.columns[0], extremesColumn);
                }
            }
            else if (cursor.state === 'xAxis.extremes.max' + groupKey) {
                extremesColumn = pick(cursor.column, extremesColumn);
                maxIndex = pick(cursor.row, maxIndex);
            }
            else {
                extremesColumn = pick(cursor.column, extremesColumn);
                minIndex = pick(cursor.row, minIndex);
            }
            const modifier = table.getModifier();
            if (typeof extremesColumn === 'string' &&
                modifier instanceof RangeModifier) {
                const ranges = modifier.options.ranges, min = table.getCell(extremesColumn, minIndex), max = table.getCell(extremesColumn, maxIndex);
                if (defined(max) && defined(min)) {
                    NavigatorSyncUtils.unsetRangeOptions(ranges, extremesColumn);
                    ranges.unshift({
                        column: extremesColumn,
                        maxValue: max,
                        minValue: min
                    });
                    table.setModifier(modifier);
                }
            }
        };
        const registerCursorListeners = () => {
            const table = component.connectorHandlers?.[0]?.connector?.table;
            if (table) {
                dataCursor.addListener(table.id, 'xAxis.extremes' + groupKey, extremesListener);
                dataCursor.addListener(table.id, 'xAxis.extremes.max' + groupKey, extremesListener);
                dataCursor.addListener(table.id, 'xAxis.extremes.min' + groupKey, extremesListener);
            }
        };
        const unregisterCursorListeners = () => {
            const table = component.connectorHandlers?.[0]?.connector?.table;
            if (table) {
                dataCursor.removeListener(table.id, 'xAxis.extremes' + groupKey, extremesListener);
                dataCursor.removeListener(table.id, 'xAxis.extremes.max' + groupKey, extremesListener);
                dataCursor.removeListener(table.id, 'xAxis.extremes.min' + groupKey, extremesListener);
            }
        };
        registerCursorListeners();
        return unregisterCursorListeners;
    }
};
/* *
*
*  Default export
*
* */
export default { defaultOptions, syncPair };
