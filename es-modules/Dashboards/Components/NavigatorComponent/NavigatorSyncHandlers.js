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
import DataModifier from '../../../Data/Modifiers/DataModifier.js';
const { Range: RangeModifier } = DataModifier.types;
import U from '../../../Core/Utilities.js';
const { addEvent, pick } = U;
/* *
 *
 *  Functions
 *
 * */
/** @internal */
function setRangeOptions(ranges, column, minValue, maxValue) {
    let changed = false;
    for (let i = 0, iEnd = ranges.length; i < iEnd; ++i) {
        if (ranges[i].column === column) {
            ranges[i].maxValue = maxValue;
            ranges[i].minValue = minValue;
            changed = true;
            break;
        }
    }
    if (!changed) {
        ranges.push({ column, maxValue, minValue });
    }
}
/** @internal */
function unsetRangeOptions(ranges, column) {
    for (let i = 0, iEnd = ranges.length; i < iEnd; ++i) {
        if (ranges[i].column === column) {
            return ranges.splice(i, 1)[0];
        }
    }
}
/* *
 *
 *  Constants
 *
 * */
const configs = {
    handlers: {
        extremesHandler() {
            const component = this, dataCursor = component.board.dataCursor;
            const extremesListener = (e) => {
                const cursor = e.cursor;
                if (!component.connector) {
                    return;
                }
                const table = component.connector.table;
                // Assume first column with unique keys as fallback
                let extremesColumn = table.getColumnNames()[0], maxIndex = table.getRowCount(), minIndex = 0;
                if (cursor.type === 'range') {
                    maxIndex = cursor.lastRow;
                    minIndex = cursor.firstRow;
                    if (cursor.columns) {
                        extremesColumn = pick(cursor.columns[0], extremesColumn);
                    }
                }
                else if (cursor.state === 'xAxis.extremes.max') {
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
                    if (max !== null && typeof max !== 'undefined' &&
                        min !== null && typeof min !== 'undefined') {
                        unsetRangeOptions(ranges, extremesColumn);
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
                const table = component.connector && component.connector.table;
                if (table) {
                    dataCursor.addListener(table.id, 'xAxis.extremes', extremesListener);
                    dataCursor.addListener(table.id, 'xAxis.extremes.max', extremesListener);
                    dataCursor.addListener(table.id, 'xAxis.extremes.min', extremesListener);
                }
            };
            const unregisterCursorListeners = () => {
                const table = component.connector && component.connector.table;
                if (table) {
                    dataCursor.removeListener(table.id, 'xAxis.extremes', extremesListener);
                    dataCursor.removeListener(table.id, 'xAxis.extremes.max', extremesListener);
                    dataCursor.removeListener(table.id, 'xAxis.extremes.min', extremesListener);
                }
            };
            registerCursorListeners();
            return unregisterCursorListeners;
        }
    },
    emitters: {
        crossfilterEmitter() {
            const component = this;
            const afterSetExtremes = async (extremes) => {
                if (component.connector) {
                    const table = component.connector.table, dataCursor = component.board.dataCursor, filterColumn = component.getColumnAssignment()[0], [min, max] = component.getAxisExtremes();
                    let modifier = table.getModifier();
                    if (modifier instanceof RangeModifier) {
                        setRangeOptions(modifier.options.ranges, filterColumn, min, max);
                    }
                    else {
                        modifier = new RangeModifier({
                            ranges: [{
                                    column: filterColumn,
                                    maxValue: max,
                                    minValue: min
                                }]
                        });
                    }
                    await table.setModifier(modifier);
                    dataCursor.emitCursor(table, {
                        type: 'range',
                        columns: [filterColumn],
                        firstRow: 0,
                        lastRow: table.getRowCount() - 1,
                        state: 'crossfilter'
                    }, extremes);
                }
            };
            let delay;
            return addEvent(component.chart.xAxis[0], 'afterSetExtremes', function (extremes) {
                clearTimeout(delay);
                delay = setTimeout(afterSetExtremes, 50, this, extremes);
            });
        },
        extremesEmitter() {
            const component = this;
            const afterSetExtremes = (extremes) => {
                if (component.connector) {
                    const table = component.connector.table, dataCursor = component.board.dataCursor, filterColumn = component.getColumnAssignment()[0], [min, max] = component.getAxisExtremes();
                    dataCursor.emitCursor(table, {
                        type: 'position',
                        column: filterColumn,
                        row: table.getRowIndexBy(filterColumn, min),
                        state: 'xAxis.extremes.min'
                    }, extremes);
                    dataCursor.emitCursor(table, {
                        type: 'position',
                        column: filterColumn,
                        row: table.getRowIndexBy(filterColumn, max),
                        state: 'xAxis.extremes.max'
                    }, extremes);
                }
            };
            let delay;
            return addEvent(component.chart.xAxis[0], 'afterSetExtremes', function (extremes) {
                clearTimeout(delay);
                delay = setTimeout(afterSetExtremes, 50, this, extremes);
            });
        }
    }
};
const defaults = {
    crossfilter: {
        emitter: configs.emitters.crossfilterEmitter
    },
    extremes: {
        emitter: configs.emitters.extremesEmitter,
        handler: configs.emitters.extremesHandler
    }
};
export default defaults;
