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
*  Namespace
*
* */
var NavigatorSyncUtils;
(function (NavigatorSyncUtils) {
    /* *
    *
    *  Utility Functions
    *
    * */
    /**
     * Adds or updates range options for a specific column.
     * @param filterOptions Filter modifier options object reference.
     * @param column Column name.
     * @param minValue Minimum value.
     * @param maxValue Maximum value.
     * @internal
     */
    function setRangeOptions(filterOptions, column, minValue, maxValue) {
        let changedMin = false;
        let changedMax = false;
        if (typeof filterOptions.condition !== 'object' ||
            filterOptions.condition.operator !== 'and') {
            filterOptions.condition = {
                operator: 'and',
                conditions: []
            };
        }
        const { conditions } = filterOptions.condition;
        for (let i = 0, iEnd = conditions.length; i < iEnd; ++i) {
            const condition = conditions[i];
            if (!condition ||
                typeof condition !== 'object' ||
                !(condition.operator === '<=' || condition.operator === '>=') ||
                condition.columnId !== column) {
                continue;
            }
            if (condition.operator === '<=') {
                condition.value = maxValue;
                changedMax = true;
            }
            else {
                condition.value = minValue;
                changedMin = true;
            }
            if (changedMin && changedMax) {
                return;
            }
        }
        if (!changedMax) {
            conditions.push({
                operator: '<=',
                columnId: column,
                value: maxValue
            });
        }
        if (!changedMin) {
            conditions.push({
                operator: '>=',
                columnId: column,
                value: minValue
            });
        }
    }
    NavigatorSyncUtils.setRangeOptions = setRangeOptions;
    /**
     * Removes range options for a specific column.
     * @param filterOptions Filter modifier options object reference.
     * @param column Column name.
     * @internal
     */
    function unsetRangeOptions(filterOptions, column) {
        if (typeof filterOptions.condition !== 'object' ||
            filterOptions.condition.operator !== 'and') {
            return;
        }
        const { conditions } = filterOptions.condition;
        for (let i = 0, iEnd = conditions.length; i < iEnd; ++i) {
            const condition = conditions[i];
            if (!condition ||
                typeof condition !== 'object' ||
                !(condition.operator === '<=' || condition.operator === '>=') ||
                condition.columnId !== column) {
                continue;
            }
            conditions.splice(i, 1)[0];
        }
    }
    NavigatorSyncUtils.unsetRangeOptions = unsetRangeOptions;
    /**
     * Converts filter options to ranges array.
     *
     * @param filterOptions
     * Filter modifier options object reference.
     */
    function toRange(filterOptions) {
        const rangesMap = {};
        if (typeof filterOptions.condition !== 'object' ||
            filterOptions.condition.operator !== 'and') {
            return [];
        }
        const { conditions } = filterOptions.condition;
        for (let i = 0, iEnd = conditions.length; i < iEnd; ++i) {
            const condition = conditions[i];
            if (!condition ||
                typeof condition !== 'object' ||
                !(condition.operator === '<=' || condition.operator === '>=') ||
                typeof condition.columnId !== 'string' ||
                !defined(condition.value)) {
                continue;
            }
            const colName = condition.columnId;
            if (!rangesMap[colName]) {
                rangesMap[colName] = {
                    maxValue: Infinity,
                    minValue: -Infinity,
                    columnId: colName
                };
            }
            if (condition.operator === '<=') {
                rangesMap[colName].maxValue = condition.value;
            }
            else {
                rangesMap[colName].minValue = condition.value;
            }
        }
        return Object.values(rangesMap);
    }
    NavigatorSyncUtils.toRange = toRange;
})(NavigatorSyncUtils || (NavigatorSyncUtils = {}));
/* *
 *
 *  Default Export
 *
 * */
export default NavigatorSyncUtils;
