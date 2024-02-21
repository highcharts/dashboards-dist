/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Gøran Slettemark
 *  - Wojciech Chmiel
 *  - Sebastian Bochan
 *  - Sophie Bremer
 *
 * */
'use strict';
import Component from '../../Components/Component.js';
import DataConverter from '../../../Data/Converters/DataConverter.js';
import DataTable from '../../../Data/DataTable.js';
import Globals from '../../Globals.js';
import HighchartsSyncHandlers from './HighchartsSyncHandlers.js';
import HighchartsComponentDefaults from './HighchartsComponentDefaults.js';
import U from '../../../Core/Utilities.js';
const { addEvent, createElement, diffObjects, isString, merge, splat, isObject } = U;
/* *
 *
 *  Class
 *
 * */
/**
 *
 * Class that represents a Highcharts component.
 *
 */
class HighchartsComponent extends Component {
    /* *
     *
     *  Static functions
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
        const options = json.options;
        const chartOptions = JSON.parse(json.options.chartOptions || '{}');
        // const store = json.store ? DataJSON.fromJSON(json.store) : void 0;
        const component = new HighchartsComponent(cell, merge(options, {
            chartOptions,
            // Highcharts, // TODO: Find a solution
            // store: store instanceof DataConnector ? store : void 0,
            // Get from static registry:
            syncHandlers: HighchartsComponent.syncHandlers
        }));
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
    /**
     * Creates a Highcharts component in the cell.
     *
     * @param options
     * The options for the component.
     */
    constructor(cell, options, board) {
        options = merge(HighchartsComponent.defaultOptions, options);
        super(cell, options, board);
        this.options = options;
        this.chartConstructor = this.options.chartConstructor || 'chart';
        this.type = 'Highcharts';
        this.chartContainer = createElement('figure', void 0, void 0, this.contentElement, true);
        this.setOptions();
        this.sync = new HighchartsComponent.Sync(this, this.syncHandlers);
        this.chartOptions = merge((this.options.chartOptions ||
            { chart: {} }), {
            tooltip: {} // Temporary fix for #18876
        });
        if (this.connector) {
            // reload the store when polling
            this.connector.on('afterLoad', (e) => {
                if (e.table && this.connector) {
                    this.connector.table.setColumns(e.table.getColumns());
                }
            });
        }
        this.innerResizeTimeouts = [];
    }
    onTableChanged() {
        this.updateSeries();
    }
    /* *
     *
     *  Functions
     *
     * */
    /** @private */
    async load() {
        this.emit({ type: 'load' });
        await super.load();
        this.emit({ type: 'afterLoad' });
        return this;
    }
    render() {
        const hcComponent = this;
        super.render();
        hcComponent.chart = hcComponent.getChart();
        hcComponent.updateSeries();
        if (!hcComponent.cell?.container?.style.height) {
            // If the cell height is specified, clear dimensions to make
            // the container to adjust to the chart height.
            hcComponent.contentElement.style.height = '100%';
            super.resize(null, null);
        }
        this.sync.start();
        hcComponent.emit({ type: 'afterRender' });
        hcComponent.setupConnectorUpdate();
        return this;
    }
    resize(width, height) {
        super.resize(width, height);
        while (this.innerResizeTimeouts.length) {
            const timeoutID = this.innerResizeTimeouts.pop();
            if (timeoutID) {
                clearTimeout(timeoutID);
            }
        }
        this.innerResizeTimeouts.push(setTimeout(() => {
            if (this.chart && this.chart.container) {
                this.chart.setSize(null, this.contentElement.clientHeight, false);
            }
        }, 33));
        return this;
    }
    /**
     * Adds call update value in store, when chart's point is updated.
     *
     * @private
     * */
    setupConnectorUpdate() {
        const { connector: store, chart } = this;
        if (store && chart && this.options.allowConnectorUpdate) {
            chart.series.forEach((series) => {
                series.points.forEach((point) => {
                    addEvent(point, 'drag', () => {
                        this.onChartUpdate(point, store);
                    });
                });
            });
        }
    }
    /**
     * Internal method for handling option updates.
     *
     * @internal
     */
    setOptions() {
        if (this.options.chartClassName) {
            this.chartContainer.classList.add(this.options.chartClassName);
        }
        if (this.options.chartID) {
            this.chartContainer.id = this.options.chartID;
        }
    }
    /**
     * Update the store, when the point is being dragged.
     * @param  {Point} point Dragged point.
     * @param  {Component.ConnectorTypes} store Connector to update.
     */
    onChartUpdate(point, store) {
        const table = store.table, columnName = point.series.name, rowNumber = point.index, converter = new DataConverter(), valueToSet = converter.asNumber(point.y);
        table.setCell(columnName, rowNumber, valueToSet);
    }
    /**
     * Handles updating via options.
     * @param options
     * The options to apply.
     *
     */
    async update(options, shouldRerender = true) {
        await super.update(options, false);
        this.setOptions();
        this.filterAndAssignSyncOptions(HighchartsSyncHandlers);
        if (this.chart) {
            this.chart.update(merge(this.options.chartOptions) || {});
        }
        this.emit({ type: 'afterUpdate' });
        shouldRerender && this.render();
    }
    /**
     * Updates chart's series when the data table is changed.
     *
     * @private
     */
    updateSeries() {
        // Heuristically create series from the connector dataTable
        if (this.chart && this.connector) {
            this.presentationTable = this.presentationModifier ?
                this.connector.table.modified.clone() :
                this.connector.table;
            const { id: storeTableID } = this.connector.table;
            const { chart } = this;
            if (this.presentationModifier) {
                this.presentationTable = this.presentationModifier
                    .modifyTable(this.presentationTable).modified;
            }
            const table = this.presentationTable, modifierOptions = table.getModifier()?.options;
            // Names/aliases that should be mapped to xAxis values
            const columnNames = table.modified.getColumnNames();
            const columnAssignment = this.options.columnAssignment ||
                this.getDefaultColumnAssignment(columnNames);
            const xKeyMap = {};
            this.emit({ type: 'afterPresentationModifier', table: table });
            // Remove series names that match the xKeys
            const seriesNames = table.modified.getColumnNames()
                .filter((name) => {
                const isVisible = this.activeGroup ?
                    this.activeGroup
                        .getSharedState()
                        .getColumnVisibility(name) !== false :
                    true;
                if (!isVisible || !columnAssignment[name]) {
                    return false;
                }
                if (columnAssignment[name] === 'x') {
                    xKeyMap[name] = name;
                    return false;
                }
                return true;
            });
            // create empty series for mapping custom props of data
            Object.keys(columnAssignment).forEach(function (key) {
                if (isObject(columnAssignment[key])) {
                    seriesNames.push(key);
                }
            });
            // Create the series or get the already added series
            const seriesList = seriesNames.map((seriesName, index) => {
                let i = 0;
                while (i < chart.series.length) {
                    const series = chart.series[i];
                    const seriesFromConnector = series.options.id === `${storeTableID}-series-${index}`;
                    const existingSeries = seriesNames.indexOf(series.name) !== -1;
                    i++;
                    if (existingSeries && seriesFromConnector) {
                        return series;
                    }
                    if (!existingSeries &&
                        seriesFromConnector) {
                        series.destroy();
                    }
                }
                // Disable dragging on series, which were created out of a
                // columns which are created by MathModifier.
                const shouldBeDraggable = !(modifierOptions?.type === 'Math' &&
                    modifierOptions
                        .columnFormulas?.some((formula) => formula.column === seriesName));
                const seriesOptions = {
                    name: seriesName,
                    id: `${storeTableID}-series-${index}`,
                    dragDrop: {
                        draggableY: shouldBeDraggable
                    }
                };
                const relatedSeries = chart.series.find((series) => series.name === seriesName);
                if (relatedSeries) {
                    relatedSeries.update(seriesOptions, false);
                    return relatedSeries;
                }
                return chart.addSeries(seriesOptions, false);
            });
            // Insert the data
            seriesList.forEach((series) => {
                const xKey = Object.keys(xKeyMap)[0], isSeriesColumnMap = isObject(columnAssignment[series.name]), pointColumnMapValues = [];
                if (isSeriesColumnMap) {
                    const pointColumns = columnAssignment[series.name];
                    Object.keys(pointColumns).forEach((key) => {
                        pointColumnMapValues.push(pointColumns[key]);
                    });
                }
                const columnKeys = isSeriesColumnMap ?
                    [xKey].concat(pointColumnMapValues) : [xKey, series.name];
                const seriesTable = new DataTable({
                    columns: table.modified.getColumns(columnKeys)
                });
                if (!isSeriesColumnMap) {
                    seriesTable.renameColumn(series.name, 'y');
                }
                if (xKey) {
                    seriesTable.renameColumn(xKey, 'x');
                }
                const seriesData = seriesTable.getRowObjects().reduce((arr, row) => {
                    if (isSeriesColumnMap) {
                        arr.push([row.x].concat(pointColumnMapValues.map(function (value) {
                            return row[value];
                        })));
                    }
                    else {
                        arr.push([row.x, row.y]);
                    }
                    return arr;
                }, []);
                series.setData(seriesData, false);
            });
            this.chart.redraw();
        }
    }
    /**
     * Destroy chart and create a new one.
     *
     * @returns
     * The chart.
     *
     * @private
     *
     */
    getChart() {
        return this.chart || this.createChart();
    }
    /**
     * Destroys the highcharts component.
     */
    destroy() {
        // Cleanup references in the global Highcharts scope
        this.chart?.destroy();
        super.destroy();
    }
    /**
     * Creates default mapping when columnAssignment is not declared.
     * @param  { Array<string>} columnNames all columns returned from dataTable.
     *
     * @returns
     * The record of mapping
     *
     * @private
     *
     */
    getDefaultColumnAssignment(columnNames = []) {
        const defaultColumnAssignment = {};
        for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
            defaultColumnAssignment[columnNames[i]] = 'y';
            if (i === 0) {
                const firstColumnValues = this.presentationTable?.getColumn(columnNames[i], true);
                if (firstColumnValues && isString(firstColumnValues[0])) {
                    defaultColumnAssignment[columnNames[i]] = 'x';
                }
            }
        }
        return defaultColumnAssignment;
    }
    /**
     * Creates chart.
     *
     * @returns
     * The chart.
     *
     * @private
     *
     */
    createChart() {
        const charter = HighchartsComponent.charter || Globals.win.Highcharts;
        if (!this.chartConstructor) {
            this.chartConstructor = 'chart';
        }
        const Factory = charter[this.chartConstructor];
        if (Factory) {
            try {
                if (this.chartConstructor === 'chart') {
                    return charter.Chart.chart(this.chartContainer, this.chartOptions);
                }
                return new Factory(this.chartContainer, this.chartOptions);
            }
            catch {
                throw new Error('The Highcharts component is misconfigured: `' +
                    this.cell.id + '`');
            }
        }
        if (typeof charter.chart !== 'function') {
            throw new Error('Chart constructor not found');
        }
        return this.chart;
    }
    /**
     * Registers events from the chart options to the callback register.
     *
     * @private
     */
    registerChartEvents() {
        if (this.chart && this.chart.options) {
            const options = this.chart.options;
            const allEvents = [
                'chart',
                'series',
                'yAxis',
                'xAxis',
                'colorAxis',
                'annotations',
                'navigation'
            ].map((optionKey) => {
                let seriesOrAxisOptions = options[optionKey] || {};
                if (!Array.isArray(seriesOrAxisOptions) &&
                    seriesOrAxisOptions.events) {
                    seriesOrAxisOptions = [seriesOrAxisOptions];
                }
                if (seriesOrAxisOptions &&
                    typeof seriesOrAxisOptions === 'object' &&
                    Array.isArray(seriesOrAxisOptions)) {
                    return seriesOrAxisOptions.reduce((acc, seriesOrAxis, i) => {
                        if (seriesOrAxis && seriesOrAxis.events) {
                            acc[seriesOrAxis.id || `${optionKey}-${i}`] = seriesOrAxis.events;
                        }
                        return acc;
                    }, {}) || {};
                }
                return {};
            });
            allEvents.forEach((options) => {
                Object.keys(options).forEach((key) => {
                    const events = options[key];
                    Object.keys(events).forEach((callbackKey) => {
                        this.callbackRegistry.addCallback(`${key}-${callbackKey}`, {
                            type: 'seriesEvent',
                            func: events[callbackKey]
                        });
                    });
                });
            });
        }
    }
    setConnector(connector) {
        const chart = this.chart;
        if (this.connector &&
            chart &&
            chart.series &&
            this.connector.table.id !== connector?.table.id) {
            const storeTableID = this.connector.table.id;
            for (let i = chart.series.length - 1; i >= 0; i--) {
                const series = chart.series[i];
                if (series.options.id?.indexOf(storeTableID) !== -1) {
                    series.remove(false);
                }
            }
        }
        super.setConnector(connector);
        return this;
    }
    getOptionsOnDrop(sidebar) {
        const connectorsIds = sidebar.editMode.board.dataPool.getConnectorIds();
        let options = {
            cell: '',
            type: 'Highcharts',
            chartOptions: {
                chart: {
                    animation: false,
                    type: 'column',
                    zooming: {}
                }
            }
        };
        if (connectorsIds.length) {
            options = {
                ...options,
                connector: {
                    id: connectorsIds[0]
                }
            };
        }
        return options;
    }
    /**
     * Converts the class instance to a class JSON.
     *
     * @returns
     * Class JSON of this Component instance.
     *
     * @private
     */
    toJSON() {
        const chartOptions = JSON.stringify(this.options.chartOptions), chartConstructor = this.options.chartConstructor || 'chart';
        this.registerChartEvents();
        const base = super.toJSON();
        const json = {
            ...base,
            type: 'Highcharts',
            options: {
                ...base.options,
                chartOptions,
                chartConstructor,
                // TODO: may need to handle callback functions
                // Maybe have a sync.toJSON()
                type: 'Highcharts',
                sync: {}
            }
        };
        this.emit({ type: 'toJSON', json });
        return json;
    }
    /**
     * Get the HighchartsComponent component's options.
     * @returns
     * The JSON of HighchartsComponent component's options.
     *
     * @internal
     *
     */
    getOptions() {
        return {
            ...diffObjects(this.options, HighchartsComponent.defaultOptions),
            type: 'Highcharts'
        };
    }
    getEditableOptions() {
        const component = this;
        const componentOptions = component.options;
        const chart = component.chart;
        const chartOptions = chart && chart.options;
        const chartType = chartOptions && chartOptions.chart?.type || 'line';
        return merge(componentOptions, {
            chartOptions
        }, {
            chartOptions: {
                yAxis: splat(chart && chart.yAxis[0].options),
                xAxis: splat(chart && chart.xAxis[0].options),
                plotOptions: {
                    series: ((chartOptions && chartOptions.plotOptions) ||
                        {})[chartType]
                }
            }
        });
    }
    getEditableOptionValue(propertyPath) {
        const component = this;
        if (!propertyPath) {
            return;
        }
        if (propertyPath.length === 1 && propertyPath[0] === 'chartOptions') {
            return JSON.stringify(component.options.chartOptions, null, 2);
        }
        return super.getEditableOptionValue.call(this, propertyPath);
    }
}
/** @private */
HighchartsComponent.syncHandlers = HighchartsSyncHandlers;
/**
 * Default options of the Highcharts component.
 */
HighchartsComponent.defaultOptions = merge(Component.defaultOptions, HighchartsComponentDefaults);
/* *
 *
 *  Default Export
 *
 * */
export default HighchartsComponent;
