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
import DataModifier from '../../../../Data/Modifiers/DataModifier.js';
import NavigatorSyncUtils from './NavigatorSyncUtils.js';
import { addEvent } from '../../../../Shared/Utilities.js';
const { Filter: FilterModifier } = DataModifier.types;
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
                const table = component.connectorHandlers[0].connector.getTable(), dataCursor = component.board.dataCursor, filterColumn = component.getColumnAssignment()[0], [min, max] = component.getAxisExtremes();
                let modifier = table.getModifier();
                if (modifier instanceof FilterModifier) {
                    NavigatorSyncUtils.setRangeOptions(modifier.options, filterColumn, min, max);
                }
                else {
                    modifier = new FilterModifier({
                        condition: {
                            operator: 'and',
                            conditions: [{
                                    columnId: filterColumn,
                                    operator: '>=',
                                    value: min
                                }, {
                                    columnId: filterColumn,
                                    operator: '<=',
                                    value: max
                                }]
                        }
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
