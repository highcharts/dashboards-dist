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
const { addEvent } = U;
/* *
 *
 *  Constants
 *
 * */
const defaultOptions = {
    affectNavigator: false
};
const syncPair = {
    emitter: function () {
        if (this.type !== 'Navigator') {
            return;
        }
        const component = this;
        const syncOptions = this.sync.syncConfig.crossfilter;
        const groupKey = syncOptions.group ? ':' + syncOptions.group : '';
        const afterSetExtremes = async (extremes) => {
            if (component.connectorHandlers?.[0]?.connector) {
                const table = component.connectorHandlers[0].connector.table, dataCursor = component.board.dataCursor, filterColumn = component.getColumnAssignment()[0], [min, max] = component.getAxisExtremes();
                let modifier = table.getModifier();
                if (modifier instanceof RangeModifier) {
                    NavigatorSyncUtils.setRangeOptions(modifier.options.ranges, filterColumn, min, max);
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
                    type: 'position',
                    column: filterColumn,
                    row: table.getRowIndexBy(filterColumn, min),
                    state: 'crossfilter' + groupKey
                }, extremes);
                dataCursor.emitCursor(table, {
                    type: 'position',
                    column: filterColumn,
                    row: table.getRowIndexBy(filterColumn, max),
                    state: 'crossfilter' + groupKey
                }, extremes);
            }
        };
        let delay;
        return addEvent(component.chart.xAxis[0], 'afterSetExtremes', function (extremes) {
            clearTimeout(delay);
            delay = setTimeout(afterSetExtremes, 50, this, extremes);
        });
    },
    handler: void 0
};
/* *
*
*  Default export
*
* */
export default { defaultOptions, syncPair };
