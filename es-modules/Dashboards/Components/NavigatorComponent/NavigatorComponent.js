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
import Component from '../Component.js';
import Globals from '../../Globals.js';
import NavigatorComponentDefaults from './NavigatorComponentDefaults.js';
import NavigatorSyncs from './NavigatorSyncs/NavigatorSyncs.js';
import U from '../../../Core/Utilities.js';
const { diffObjects, isNumber, isString, merge, pick } = U;
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
        this.type = 'Navigator';
        this.options = merge(NavigatorComponent.defaultOptions, options);
        const charter = (NavigatorComponent.charter.Chart ||
            Globals.win.Highcharts);
        this.chartContainer = Globals.win.document.createElement('div');
        this.chart = charter
            .chart(this.chartContainer, (this.options.chartOptions || {}));
        this.chartContainer.classList
            .add(Globals.classNamePrefix + 'navigator');
        if (this.sync.syncConfig.crossfilter?.enabled) {
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
     * Returns the first column of columnAssignment to use for navigator data.
     * @private
     *
     * @return
     * Navigator column assignment.
     */
    getColumnAssignment() {
        const columnAssignment = this.options.columnAssignment ??
            this.options.columnAssignments ?? {};
        let columnsAssignment;
        for (const column of Object.keys(columnAssignment)) {
            columnsAssignment = columnAssignment[column];
            if (columnsAssignment !== null) {
                return [column, columnsAssignment];
            }
        }
        const connector = this.getFirstConnector();
        if (connector) {
            const columns = connector.table.getColumnNames();
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
        const connector = this.getFirstConnector();
        if (connector) {
            const table = connector.table, column = this.getColumnAssignment(), columnValues = table.getColumn(column[0], true) || [];
            let data;
            if (this.sync.syncConfig.crossfilter?.enabled) {
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
        const crossfilterOptions = this.sync.syncConfig.crossfilter;
        const table = this.getFirstConnector()?.table;
        const columnValues = table?.getColumn(this.getColumnAssignment()[0], true) || [];
        if (!table || columnValues.length < 1 || !crossfilterOptions) {
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
        const chart = this.chart;
        await super.update(options, false);
        if (options.chartOptions) {
            chart.update(merge(this.sync.syncConfig.crossfilter?.enabled ? ({ navigator: { xAxis: { labels: { format: '{value}' } } } }) : {}, options.chartOptions), false);
        }
        this.emit({ type: 'afterUpdate' });
        if (shouldRerender) {
            this.render();
        }
    }
    getOptionsOnDrop() {
        return {};
    }
}
/**
 * Default options of the Navigator component.
 */
NavigatorComponent.defaultOptions = merge(Component.defaultOptions, NavigatorComponentDefaults);
/**
 * Predefined sync configuration for the Navigator component.
 */
NavigatorComponent.predefinedSyncConfig = NavigatorSyncs;
/* *
 *
 *  Default Export
 *
 * */
export default NavigatorComponent;
