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
import Component from '../Component.js';
import DataConverter from '../../../Data/Converters/DataConverter.js';
import DataTable from '../../../Data/DataTable.js';
import Globals from '../../Globals.js';
import HighchartsSyncs from './HighchartsSyncs/HighchartsSyncs.js';
import HighchartsComponentDefaults from './HighchartsComponentDefaults.js';
import U from '../../../Core/Utilities.js';
const { createElement, diffObjects, isString, merge, splat } = U;
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
        /// const store = json.store ? DataJSON.fromJSON(json.store) : void 0;
        const component = new HighchartsComponent(cell, merge(options, {
            chartOptions
            // Highcharts, // TODO: Find a solution
            // store: store instanceof DataConnector ? store : void 0
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
        /**
         * An object of series IDs and their connector handlers.
         */
        this.seriesFromConnector = {};
        this.options = options;
        this.chartConstructor = this.options.chartConstructor || 'chart';
        this.type = 'Highcharts';
        this.chartContainer = createElement('figure', void 0, void 0, this.contentElement, true);
        this.setOptions();
        this.chartOptions = merge((this.options.chartOptions ||
            { chart: {} }), {
            tooltip: {} // Temporary fix for #18876
        });
        for (const connectorHandler of this.connectorHandlers) {
            const connector = connectorHandler.connector;
            if (connector) {
                connector.on('afterLoad', (e) => {
                    if (e.table) {
                        connector.table.setColumns(e.table.getColumns());
                    }
                });
            }
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
        hcComponent.emit({ type: 'afterRender' });
        hcComponent.setupConnectorUpdate();
        this.sync.start();
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
                const heightOffset = this.contentElement.offsetHeight -
                    this.chart?.container.offsetHeight;
                this.chart.setSize(null, (Math.abs(heightOffset) > 1) ?
                    this.contentElement.offsetHeight : null, false);
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
        const { connectorHandlers, chart } = this;
        if (!chart || !this.options.allowConnectorUpdate) {
            return;
        }
        const seriesLength = chart.series.length;
        for (let i = 0, iEnd = connectorHandlers.length; i < iEnd; i++) {
            const connectorHandler = connectorHandlers[i];
            for (let j = 0; j < seriesLength; j++) {
                const series = chart.series[j];
                series.update({
                    point: {
                        events: {
                            update: (e) => {
                                this.onChartUpdate(e.target, connectorHandler);
                            }
                        }
                    }
                }, false);
            }
        }
    }
    /**
     * Update the store, when the point is being dragged.
     * @param point Dragged point.
     * @param connectorHandler Connector handler with data to update.
     */
    onChartUpdate(point, connectorHandler) {
        const table = connectorHandler.connector?.table;
        const columnAssignment = connectorHandler.columnAssignment;
        const seriesId = point.series.options.id;
        const converter = new DataConverter();
        const valueToSet = converter.asNumber(point.y);
        if (!table) {
            return;
        }
        let columnName;
        if (columnAssignment && seriesId) {
            const data = columnAssignment.find((s) => s.seriesId === seriesId)?.data;
            if (isString(data)) {
                columnName = data;
            }
            else if (Array.isArray(data)) {
                columnName = data[1];
            }
            else if (data) {
                columnName = data.y ?? data.value;
            }
        }
        if (!columnName) {
            columnName = seriesId ?? point.series.name;
        }
        table.setCell(columnName, point.index, valueToSet);
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
     * Handles updating via options.
     * @param options
     * The options to apply.
     *
     */
    async update(options, shouldRerender = true) {
        await super.update(options, false);
        this.setOptions();
        if (this.chart) {
            this.chart.update(merge(this.options.chartOptions) || {});
        }
        this.emit({ type: 'afterUpdate' });
        shouldRerender && this.render();
    }
    /**
     * Updates chart's series when the data table is changed.
     * @private
     */
    updateSeries() {
        const { chart } = this;
        const connectorHandlers = this.connectorHandlers;
        if (!chart) {
            return;
        }
        const newSeriesIds = [];
        for (const connectorHandler of connectorHandlers) {
            const options = connectorHandler.options;
            let columnAssignment = options.columnAssignment;
            if (!columnAssignment && connectorHandler.presentationTable) {
                columnAssignment = this.getDefaultColumnAssignment(connectorHandler.presentationTable.getColumnNames(), connectorHandler.presentationTable);
            }
            if (columnAssignment) {
                connectorHandler.columnAssignment = columnAssignment;
                for (const { seriesId } of columnAssignment) {
                    if (seriesId) {
                        newSeriesIds.push(seriesId);
                    }
                }
            }
        }
        const seriesArray = Object.keys(this.seriesFromConnector);
        // Remove series that were added in the previous update and are not
        // present in the new columnAssignment.
        for (let i = 0, iEnd = seriesArray.length; i < iEnd; ++i) {
            const oldSeriesId = seriesArray[i];
            if (newSeriesIds.some((newSeriesId) => newSeriesId === oldSeriesId)) {
                continue;
            }
            const series = chart.get(oldSeriesId);
            if (series) {
                series.destroy();
            }
        }
        this.seriesFromConnector = {};
        for (const connectorHandler of connectorHandlers) {
            this.updateSeriesFromConnector(connectorHandler);
        }
        chart.redraw();
    }
    /**
     * Updates the series based on the connector from each connector handler.
     * @param connectorHandler The connector handler.
     * @private
     */
    updateSeriesFromConnector(connectorHandler) {
        const chart = this.chart;
        if (!connectorHandler.connector ||
            !chart ||
            !connectorHandler.presentationTable) {
            return;
        }
        const table = connectorHandler.presentationTable.modified;
        const modifierOptions = connectorHandler.presentationTable.getModifier()?.options;
        const columnAssignment = connectorHandler.columnAssignment ?? [];
        // Create the series or update the existing ones.
        for (let i = 0, iEnd = columnAssignment.length; i < iEnd; ++i) {
            const assignment = columnAssignment[i];
            const dataStructure = assignment.data;
            const series = chart.get(assignment.seriesId);
            const seriesOptions = {};
            // Prevent dragging on series, which were created out of a
            // columns which are created by MathModifier.
            const adjustDraggableOptions = (compare) => {
                if (modifierOptions?.type === 'Math' &&
                    modifierOptions
                        .columnFormulas?.some((formula) => compare(formula.column))) {
                    seriesOptions.dragDrop = {
                        draggableY: false
                    };
                }
            };
            // Set the series data based on the column assignment data structure
            // type.
            if (isString(dataStructure)) {
                const column = table.getColumn(dataStructure);
                if (column) {
                    seriesOptions.data = column.slice();
                }
                adjustDraggableOptions((columnName) => (columnName === dataStructure));
            }
            else if (Array.isArray(dataStructure)) {
                const seriesTable = new DataTable({
                    columns: table.getColumns(dataStructure)
                });
                seriesOptions.data = seriesTable.getRows();
                adjustDraggableOptions((columnName) => (dataStructure.some((name) => name === columnName)));
            }
            else {
                const keys = Object.keys(dataStructure);
                const columnNames = [];
                for (let j = 0, jEnd = keys.length; j < jEnd; ++j) {
                    columnNames.push(dataStructure[keys[j]]);
                }
                const seriesTable = new DataTable({
                    columns: table.getColumns(columnNames)
                });
                seriesOptions.keys = keys;
                seriesOptions.data = seriesTable.getRows();
                adjustDraggableOptions((columnName) => (columnNames.some((name) => name === columnName)));
            }
            if (!series) {
                chart.addSeries({
                    name: assignment.seriesId,
                    id: assignment.seriesId,
                    ...seriesOptions
                }, false);
            }
            else {
                series.update(seriesOptions, false);
            }
            this.seriesFromConnector[assignment.seriesId] = connectorHandler;
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
    getDefaultColumnAssignment(columnNames = [], presentationTable) {
        const result = [];
        const firstColumn = presentationTable.getColumn(columnNames[0]);
        if (firstColumn && isString(firstColumn[0])) {
            for (let i = 1, iEnd = columnNames.length; i < iEnd; ++i) {
                result.push({
                    seriesId: columnNames[i],
                    data: [columnNames[0], columnNames[i]]
                });
            }
            return result;
        }
        for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
            result.push({
                seriesId: columnNames[i],
                data: columnNames[i]
            });
        }
        return result;
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
            catch (e) {
                throw new Error(`The Highcharts component in cell '${this.cell.id}' is misconfigured. \n____________\n${e}`);
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
    /**
     * Retrieves editable options for the chart.
     *
     * @returns
     * The editable options for the chart and its values.
     */
    getEditableOptions() {
        const component = this;
        const componentOptions = component.options;
        const chart = component.chart;
        const chartOptions = chart && chart.options;
        const chartType = chartOptions?.chart?.type || 'line';
        return merge({
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
        }, componentOptions);
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
/**
 * Predefined sync config for Highcharts component.
 */
HighchartsComponent.predefinedSyncConfig = HighchartsSyncs;
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
