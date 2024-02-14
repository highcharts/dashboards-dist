/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */
'use strict';
import Component from '../Components/Component.js';
import DataModifier from '../../Data/Modifiers/DataModifier.js';
const { Range: RangeModifier } = DataModifier.types;
import Globals from '../Globals.js';
import NavigatorComponentDefaults from './NavigatorComponentDefaults.js';
import U from '../../Core/Utilities.js';
const { addEvent, diffObjects, isNumber, isObject, isString, merge, pick } = U;
/* *
 *
 *  Constants
 *
 * */
const navigatorComponentSync = {
    crossfilter: {
        emitter: crossfilterEmitter
    },
    extremes: {
        emitter: extremesEmitter,
        handler: extremesReceiver
    }
};
/* *
 *
 *  Functions
 *
 * */
/** @internal */
function crossfilterEmitter() {
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
}
/** @internal */
function extremesEmitter() {
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
/** @internal */
function extremesReceiver() {
    const component = this, dataCursor = component.board.dataCursor;
    const extremesListener = (e) => {
        const cursor = e.cursor;
        if (!component.connector) {
            return;
        }
        const table = component.connector.table;
        // assume first column with unique keys as fallback
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
    component.on('setConnector', () => unregisterCursorListeners());
    component.on('afterSetConnector', () => registerCursorListeners());
}
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
 *  Class
 *
 * */
/**
 * Setup a component with data navigation.
 */
class NavigatorComponent extends Component {
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * Creates component from JSON.
     *
     * @param json
     * Set of component options, used for creating the Highcharts component.
     *
     * @returns
     * Highcharts component based on config from JSON.
     *
     * @private
     */
    static fromJSON(json, cell) {
        const options = json.options, component = new NavigatorComponent(cell, options);
        component.emit({
            type: 'fromJSON',
            json
        });
        return component;
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor(cell, options) {
        super(cell, options);
        this.options = merge(NavigatorComponent.defaultOptions, options);
        const charter = (NavigatorComponent.charter.Chart ||
            Globals.win.Highcharts);
        this.chartContainer = Globals.win.document.createElement('div');
        this.chart = charter
            .chart(this.chartContainer, (this.options.chartOptions || {}));
        this.chartContainer.classList
            .add(Globals.classNamePrefix + 'navigator');
        this.filterAndAssignSyncOptions(navigatorComponentSync);
        this.sync = new NavigatorComponent.Sync(this, this.syncHandlers);
        const crossfilterOptions = this.options.sync?.crossfilter;
        if (crossfilterOptions === true || (isObject(crossfilterOptions) && crossfilterOptions.enabled)) {
            this.chart.update(merge({ navigator: { xAxis: { labels: { format: '{value}' } } } }, this.options.chartOptions || {}), false);
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    /** @private */
    adjustNavigator() {
        const chart = this.chart, height = pick(chart.chartHeight, this.contentElement.clientHeight), width = this.contentElement.clientWidth, chartUpdates = {};
        if (chart.chartHeight !== height ||
            chart.chartWidth !== width) {
            chartUpdates.chart = {
                height,
                width
            };
        }
        if (chart.navigator) {
            const navigator = chart.navigator, navigatorHeight = (navigator.top - chart.plotTop + navigator.height);
            if (navigator.height !== navigatorHeight) {
                chartUpdates.navigator = {
                    handles: {
                        height: Math.round(height / 4)
                    },
                    height: navigatorHeight
                };
            }
            if (Object.keys(chartUpdates).length) {
                chart.update(chartUpdates, false);
            }
            if (navigator.series && navigator.series[0]) {
                navigator.series[0].update({
                    type: chart.series[0].type
                }, false);
            }
        }
        else if (Object.keys(chartUpdates).length) {
            chart.update(chartUpdates, false);
        }
    }
    /**
     * Returns the first column of columnAssignments to use for navigator data.
     * @private
     *
     * @return
     * Navigator column assignment.
     */
    getColumnAssignment() {
        const columnAssignments = (this.options.columnAssignments || {});
        let columnsAssignment;
        for (const column of Object.keys(columnAssignments)) {
            columnsAssignment = columnAssignments[column];
            if (columnsAssignment !== null) {
                return [column, columnsAssignment];
            }
        }
        if (this.connector) {
            const columns = this.connector.table.getColumnNames();
            if (columns.length) {
                return [columns[0], 'y'];
            }
        }
        return ['', 'y'];
    }
    /**
     * Gets the component's options.
     * @internal
     */
    getOptions() {
        return {
            ...diffObjects(this.options, NavigatorComponentDefaults),
            type: 'Navigator'
        };
    }
    /**
     * Gets the extremes of the navigator's x-axis.
     */
    getAxisExtremes() {
        const axis = this.chart.xAxis[0], extremes = axis.getExtremes(), min = isNumber(extremes.min) ? extremes.min : extremes.dataMin, max = isNumber(extremes.max) ? extremes.max : extremes.dataMax;
        if (this.categories) {
            return [
                this.categories[Math.max(0, Math.ceil(min))],
                this.categories[Math.min(this.categories.length - 1, Math.floor(max))]
            ];
        }
        if (axis.hasNames) {
            return [
                axis.names[Math.ceil(min)],
                axis.names[Math.floor(max)]
            ];
        }
        return [min, max];
    }
    /** @private */
    async load() {
        await super.load();
        this.contentElement.appendChild(this.chartContainer);
        this.parentElement.appendChild(this.element);
        this.adjustNavigator();
        this.emit({ type: 'afterLoad' });
        return this;
    }
    onTableChanged() {
        this.renderNavigator();
    }
    /** @private */
    redrawNavigator() {
        const timeouts = this.resizeTimeouts;
        for (let i = 0, iEnd = timeouts.length; i < iEnd; ++i) {
            clearTimeout(timeouts[i]);
        }
        timeouts.length = 0;
        timeouts.push(setTimeout(() => {
            this.adjustNavigator();
            this.chart.redraw();
        }, 33));
    }
    /** @private */
    render() {
        const component = this;
        super.render();
        component.renderNavigator();
        component.sync.start();
        component.emit({ type: 'afterRender' });
        return component;
    }
    /** @private */
    renderNavigator() {
        const chart = this.chart;
        if (this.connector) {
            const table = this.connector.table, options = this.options, column = this.getColumnAssignment(), columnValues = table.getColumn(column[0], true) || [], crossfilterOptions = options.sync?.crossfilter;
            let data;
            if (crossfilterOptions === true || (isObject(crossfilterOptions) && crossfilterOptions.enabled)) {
                data = this.generateCrossfilterData();
            }
            else {
                data = columnValues.slice();
            }
            if (!chart.series[0]) {
                chart.addSeries({ id: table.id, data }, false);
            }
            else {
                chart.series[0].setData(data, false);
            }
        }
        this.redrawNavigator();
    }
    /**
     * Generates the data for the crossfilter navigator.
     */
    generateCrossfilterData() {
        let crossfilterOptions = this.options.sync?.crossfilter;
        const table = this.connector?.table;
        const columnValues = table?.getColumn(this.getColumnAssignment()[0], true) || [];
        // TODO: Remove this when merging to v2.
        if (crossfilterOptions === true) {
            crossfilterOptions = {
                affectNavigator: false
            };
        }
        if (!table ||
            columnValues.length < 1 ||
            !isObject(crossfilterOptions)) {
            return [];
        }
        const values = [];
        const uniqueXValues = [];
        for (let i = 0, iEnd = columnValues.length; i < iEnd; i++) {
            let value = columnValues[i];
            if (value === null) {
                continue;
            }
            else if (!isNumber(value)) {
                value = `${value}`;
            }
            // Check if the x-axis data is not of mixed type.
            if (this.stringData === void 0) {
                this.stringData = isString(value);
            }
            else if (this.stringData !== isString(value)) {
                throw new Error('Mixed data types in crossfilter navigator are ' +
                    'not supported.');
            }
            values.push(value);
            if (uniqueXValues.indexOf(value) === -1) {
                uniqueXValues.push(value);
            }
        }
        uniqueXValues.sort((a, b) => (pick(a, NaN) < pick(b, NaN) ? -1 : a === b ? 0 : 1));
        let filteredValues;
        const modifierOptions = table.getModifier()?.options;
        if (crossfilterOptions.affectNavigator && modifierOptions) {
            const appliedRanges = [], rangedColumns = [], { ranges } = modifierOptions;
            for (let i = 0, iEnd = ranges.length; i < iEnd; i++) {
                if (ranges[i].column !== this.getColumnAssignment()[0]) {
                    appliedRanges.push(ranges[i]);
                    rangedColumns.push(table.getColumn(ranges[i].column, true) || []);
                }
            }
            filteredValues = [];
            const appliedRagesLength = appliedRanges.length;
            for (let i = 0, iEnd = values.length; i < iEnd; i++) {
                const value = values[i];
                let allConditionsMet = true;
                for (let j = 0; j < appliedRagesLength; j++) {
                    const range = appliedRanges[j];
                    if (!(rangedColumns[j][i] >=
                        (range.minValue ?? -Infinity) &&
                        rangedColumns[j][i] <=
                            (range.maxValue ?? Infinity))) {
                        allConditionsMet = false;
                        break;
                    }
                }
                if (allConditionsMet) {
                    filteredValues.push(value);
                }
            }
        }
        else {
            filteredValues = values;
        }
        const seriesData = [];
        if (this.stringData) {
            this.categories = uniqueXValues;
            for (let i = 0, iEnd = uniqueXValues.length; i < iEnd; i++) {
                seriesData.push([i, null]);
            }
        }
        else {
            for (let i = 0, iEnd = uniqueXValues.length; i < iEnd; i++) {
                seriesData.push([uniqueXValues[i], null]);
            }
        }
        for (let i = 0, iEnd = filteredValues.length; i < iEnd; i++) {
            const index = uniqueXValues.indexOf(filteredValues[i]);
            seriesData[index][1] = (seriesData[index][1] || 0) + 1;
        }
        return seriesData;
    }
    /** @private */
    resize(width, height) {
        super.resize(width, height);
        this.redrawNavigator();
        return this;
    }
    /**
     * Handles updating via options.
     *
     * @param options
     * The options to apply.
     */
    async update(options, shouldRerender = true) {
        const chart = this.chart, crossfilterOptions = this.options.sync?.crossfilter;
        await super.update(options, false);
        if (options.sync) {
            this.filterAndAssignSyncOptions(navigatorComponentSync);
        }
        if (options.chartOptions) {
            chart.update(merge((crossfilterOptions === true || (isObject(crossfilterOptions) &&
                crossfilterOptions.enabled) ?
                {
                    navigator: {
                        xAxis: {
                            labels: {
                                format: '{value}'
                            }
                        }
                    }
                } :
                {}), options.chartOptions), false);
        }
        this.emit({ type: 'afterUpdate' });
        if (shouldRerender) {
            this.render();
        }
    }
    getOptionsOnDrop(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sidebar) {
        return {};
    }
}
/**
 * Default options of the Navigator component.
 */
NavigatorComponent.defaultOptions = merge(Component.defaultOptions, NavigatorComponentDefaults);
/* *
 *
 *  Default Export
 *
 * */
export default NavigatorComponent;
