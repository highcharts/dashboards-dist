/* *
 *
 *  (c) 2009-2023 Highsoft AS
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Component from '../Components/Component.js';
import DataConverter from '../../Data/Converters/DataConverter.js';
import DataTable from '../../Data/DataTable.js';
import Globals from '../../Dashboards/Globals.js';
import HighchartsSyncHandlers from './HighchartsSyncHandlers.js';
import U from '../../Core/Utilities.js';
const { addEvent, createElement, merge, splat, uniqueKey, error, diffObjects } = U;
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
    constructor(cell, options) {
        options = merge(HighchartsComponent.defaultOptions, options);
        super(cell, options);
        this.options = options;
        this.chartConstructor = this.options.chartConstructor;
        this.type = 'Highcharts';
        this.chartContainer = createElement('figure', void 0, void 0, void 0, true);
        this.setOptions();
        this.sync = new HighchartsComponent.Sync(this, this.syncHandlers);
        this.chartOptions = merge((this.options.chartOptions ||
            { chart: {} }), {
            tooltip: {} // Temporary fix for #18876
        });
        this.on('tableChanged', () => this.updateSeries());
        if (this.connector) {
            // reload the store when polling
            this.connector.on('afterLoad', (e) => {
                if (e.table && this.connector) {
                    this.connector.table.setColumns(e.table.getColumns());
                }
            });
        }
        this.innerResizeTimeouts = [];
        // Add the component instance to the registry
        Component.addInstance(this);
    }
    /* *
     *
     *  Functions
     *
     * */
    /** @private */
    load() {
        this.emit({ type: 'load' });
        super.load();
        this.parentElement.appendChild(this.element);
        this.contentElement.appendChild(this.chartContainer);
        this.hasLoaded = true;
        this.emit({ type: 'afterLoad' });
        return this;
    }
    render() {
        const hcComponent = this;
        hcComponent.emit({ type: 'beforeRender' });
        super.render();
        hcComponent.chart = hcComponent.getChart();
        hcComponent.updateSeries();
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
            if (this.chart) {
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
     * @private
     */
    setOptions() {
        if (this.options.chartClassName) {
            this.chartContainer.classList.add(this.options.chartClassName);
        }
        if (this.options.chartID) {
            this.chartContainer.id = this.options.chartID;
        }
        this.syncHandlers = this.handleSyncOptions(HighchartsSyncHandlers);
    }
    /**
     * Update the store, when the point is being dragged.
     * @param  {Point} point Dragged point.
     * @param  {Component.ConnectorTypes} store Connector to update.
     */
    onChartUpdate(point, store) {
        const table = store.table, columnName = point.series.name, rowNumber = point.x, converter = new DataConverter(), valueToSet = converter.asNumber(point.y);
        table.setCell(columnName, rowNumber, valueToSet);
    }
    /**
     * Handles updating via options.
     * @param options
     * The options to apply.
     *
     */
    update(options, redraw = true) {
        const _super = Object.create(null, {
            update: { get: () => super.update }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.update.call(this, options, false);
            this.setOptions();
            if (this.chart) {
                this.chart.update(merge(this.options.chartOptions) || {});
            }
            this.emit({ type: 'afterUpdate' });
            redraw && this.redraw();
        });
    }
    /**
     * Updates chart's series when the data table is changed.
     *
     * @private
     */
    updateSeries() {
        // Heuristically create series from the store dataTable
        if (this.chart && this.connector) {
            this.presentationTable = this.presentationModifier ?
                this.connector.table.modified.clone() :
                this.connector.table;
            const { id: storeTableID } = this.connector.table;
            const { chart } = this;
            // Names/aliases that should be mapped to xAxis values
            const columnAssignment = this.options.columnAssignment || {};
            const xKeyMap = {};
            if (this.presentationModifier) {
                this.presentationTable = this.presentationModifier
                    .modifyTable(this.presentationTable).modified;
            }
            const table = this.presentationTable;
            this.emit({ type: 'afterPresentationModifier', table: table });
            // Remove series names that match the xKeys
            const seriesNames = table.modified.getColumnNames()
                .filter((name) => {
                const isVisible = this.activeGroup ?
                    this.activeGroup
                        .getSharedState()
                        .getColumnVisibility(name) !== false :
                    true;
                if (!isVisible && !columnAssignment[name]) {
                    return false;
                }
                if (columnAssignment[name] === null) {
                    return false;
                }
                if (columnAssignment[name] === 'x') {
                    xKeyMap[name] = name;
                    return false;
                }
                return true;
            });
            // Create the series or get the already added series
            const seriesList = seriesNames.map((seriesName, index) => {
                let i = 0;
                while (i < chart.series.length) {
                    const series = chart.series[i];
                    const seriesFromConnector = series.options.id === `${storeTableID}-series-${index}`;
                    const existingSeries = seriesNames.indexOf(series.name) !== -1;
                    i++;
                    if (existingSeries &&
                        seriesFromConnector) {
                        return series;
                    }
                    if (!existingSeries &&
                        seriesFromConnector) {
                        series.destroy();
                    }
                }
                return chart.addSeries({
                    name: seriesName,
                    id: `${storeTableID}-series-${index}`
                }, false);
            });
            // Insert the data
            seriesList.forEach((series) => {
                const xKey = Object.keys(xKeyMap)[0];
                const seriesTable = new DataTable({
                    columns: table.modified.getColumns([xKey, series.name])
                });
                seriesTable.renameColumn(series.name, 'y');
                if (xKey) {
                    seriesTable.renameColumn(xKey, 'x');
                }
                const seriesData = seriesTable.getRowObjects().reduce((arr, row) => {
                    arr.push([row.x, row.y]);
                    return arr;
                }, []);
                series.setData(seriesData);
            });
            /* chart.redraw(); */
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
     * Creates chart.
     *
     * @returns
     * The chart.
     *
     * @private
     *
     */
    createChart() {
        const charter = (HighchartsComponent.charter ||
            Globals.win.Highcharts);
        if (this.chartConstructor !== 'chart') {
            const factory = charter[this.chartConstructor];
            if (factory) {
                try {
                    return factory(this.chartContainer, this.chartOptions);
                }
                catch (_a) {
                    error('The Highcharts component is misconfigured: `' +
                        this.cell.id + '`');
                }
            }
        }
        if (typeof charter.chart !== 'function') {
            throw new Error('Chart constructor not found');
        }
        this.chart = charter.chart(this.chartContainer, this.chartOptions);
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
        var _a;
        const chart = this.chart;
        if (this.connector &&
            chart &&
            chart.series &&
            this.connector.table.id !== (connector === null || connector === void 0 ? void 0 : connector.table.id)) {
            const storeTableID = this.connector.table.id;
            for (let i = chart.series.length - 1; i >= 0; i--) {
                const series = chart.series[i];
                if (((_a = series.options.id) === null || _a === void 0 ? void 0 : _a.indexOf(storeTableID)) !== -1) {
                    series.remove(false);
                }
            }
        }
        super.setConnector(connector);
        return this;
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
        const chartOptions = JSON.stringify(this.options.chartOptions), chartConstructor = this.options.chartConstructor;
        this.registerChartEvents();
        const base = super.toJSON();
        const json = Object.assign(Object.assign({}, base), { type: 'Highcharts', options: Object.assign(Object.assign({}, base.options), { chartOptions,
                chartConstructor, 
                // TODO: may need to handle callback functions
                // Maybe have a sync.toJSON()
                type: 'Highcharts', sync: {} }) });
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
        return Object.assign(Object.assign({}, diffObjects(this.options, HighchartsComponent.defaultOptions)), { type: 'Highcharts' });
    }
    getEditableOptions() {
        var _a;
        const component = this;
        const componentOptions = component.options;
        const chart = component.chart;
        const chartOptions = chart && chart.options;
        const chartType = chartOptions && ((_a = chartOptions.chart) === null || _a === void 0 ? void 0 : _a.type) || 'line';
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
HighchartsComponent.defaultOptions = merge(Component.defaultOptions, {
    /**
     * Whether to allow the component to edit the store to which it is
     * attached.
     * @default true
     */
    allowConnectorUpdate: true,
    chartClassName: 'chart-container',
    chartID: 'chart-' + uniqueKey(),
    chartOptions: {
        chart: {
            styledMode: true
        },
        series: []
    },
    chartConstructor: '',
    editableOptions: (Component.defaultOptions.editableOptions || []).concat([
        {
            name: 'chartOptions',
            type: 'nested',
            nestedOptions: [{
                    name: 'chart',
                    options: [{
                            name: 'title',
                            propertyPath: ['chartOptions', 'title', 'text'],
                            type: 'input'
                        }, {
                            name: 'subtitle',
                            propertyPath: ['chartOptions', 'subtitle', 'text'],
                            type: 'input'
                        }, {
                            name: 'type',
                            propertyPath: ['chartOptions', 'chart', 'type'],
                            type: 'select',
                            selectOptions: [{
                                    name: 'column',
                                    iconURL: 'series-types/icon-column.svg'
                                }, {
                                    name: 'line',
                                    iconURL: 'series-types/icon-line.svg'
                                }, {
                                    name: 'scatter',
                                    iconURL: 'series-types/icon-scatter.svg'
                                }, {
                                    name: 'pie',
                                    iconURL: 'series-types/icon-pie.svg'
                                }]
                        }]
                }, {
                    name: 'xAxis',
                    options: [{
                            name: 'title',
                            propertyPath: ['chartOptions', 'xAxis', 'title', 'text'],
                            type: 'input'
                        }, {
                            name: 'type',
                            propertyPath: ['chartOptions', 'xAxis', 'type'],
                            type: 'select',
                            selectOptions: [{
                                    name: 'linear'
                                }, {
                                    name: 'datetime'
                                }, {
                                    name: 'logarithmic'
                                }]
                        }]
                }, {
                    name: 'yAxis',
                    options: [{
                            name: 'title',
                            propertyPath: ['chartOptions', 'yAxis', 'title', 'text'],
                            type: 'input'
                        }, {
                            name: 'type',
                            propertyPath: ['chartOptions', 'yAxis', 'type'],
                            type: 'select',
                            selectOptions: [{
                                    name: 'linear'
                                }, {
                                    name: 'datetime'
                                }, {
                                    name: 'logarithmic'
                                }]
                        }]
                }, {
                    name: 'legend',
                    showToggle: true,
                    propertyPath: ['chartOptions', 'legend', 'enabled'],
                    options: [{
                            name: 'align',
                            propertyPath: ['chartOptions', 'legend', 'align'],
                            type: 'select',
                            selectOptions: [{
                                    name: 'left'
                                }, {
                                    name: 'center'
                                }, {
                                    name: 'right'
                                }]
                        }]
                }, {
                    name: 'tooltip',
                    showToggle: true,
                    propertyPath: ['chartOptions', 'tooltip', 'enabled'],
                    options: [{
                            name: 'split',
                            propertyPath: ['chartOptions', 'tooltip', 'split'],
                            type: 'toggle'
                        }]
                }, {
                    name: 'dataLabels',
                    propertyPath: [
                        'chartOptions',
                        'plotOptions',
                        'series',
                        'dataLabels',
                        'enabled'
                    ],
                    showToggle: true,
                    options: [{
                            name: 'align',
                            propertyPath: [
                                'chartOptions',
                                'plotOptions',
                                'series',
                                'dataLabels',
                                'align'
                            ],
                            type: 'select',
                            selectOptions: [{
                                    name: 'left'
                                }, {
                                    name: 'center'
                                }, {
                                    name: 'right'
                                }]
                        }]
                }, {
                    name: 'credits',
                    showToggle: true,
                    propertyPath: ['chartOptions', 'credits', 'enabled'],
                    options: [{
                            name: 'name',
                            propertyPath: [
                                'chartOptions',
                                'credits',
                                'text'
                            ],
                            type: 'input'
                        }, {
                            name: 'url',
                            propertyPath: [
                                'chartOptions',
                                'credits',
                                'href'
                            ],
                            type: 'input'
                        }]
                }]
        }, {
            name: 'chartConfig',
            propertyPath: ['chartOptions'],
            type: 'textarea'
        }, {
            name: 'chartClassName',
            propertyPath: ['chartClassName'],
            type: 'input'
        }, {
            name: 'chartID',
            propertyPath: ['chartID'],
            type: 'input'
        }
    ]),
    syncHandlers: HighchartsSyncHandlers,
    editableOptionsBindings: merge(Component.defaultOptions.editableOptionsBindings, {
        skipRedraw: [
            'chartOptions',
            'chartConfig'
        ]
    }),
    columnAssignment: {}
});
/* *
 *
 *  Default Export
 *
 * */
export default HighchartsComponent;
