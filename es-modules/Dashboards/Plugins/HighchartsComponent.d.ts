import type Chart from '../../Core/Chart/Chart';
import type ChartOptions from '../../Core/Options';
import type Cell from '../Layout/Cell';
import Component from '../Components/Component.js';
import DataConnector from '../../Data/Connectors/DataConnector.js';
import G from '../../Core/Globals.js';
declare module '../../Core/GlobalsLike' {
    interface GlobalsLike {
        chart: typeof Chart.chart;
        ganttChart: typeof Chart.chart;
        mapChart: typeof Chart.chart;
        stockChart: typeof Chart.chart;
    }
}
/**
 *
 * Class that represents a Highcharts component.
 *
 */
declare class HighchartsComponent extends Component {
    /** @private */
    static charter?: typeof G;
    /** @private */
    static syncHandlers: import("../Components/Sync/Sync").default.OptionsRecord;
    /**
     * Default options of the Highcharts component.
     */
    static defaultOptions: Partial<Component.ComponentOptions> & {
        /**
         * Whether to allow the component to edit the store to which it is
         * attached.
         * @default true
         */
        allowConnectorUpdate: boolean;
        chartClassName: string;
        chartID: string;
        chartOptions: {
            chart: {
                styledMode: boolean;
            };
            series: never[];
        };
        chartConstructor: string;
        editableOptions: import("../Components/EditableOptions").default.Options[];
        syncHandlers: import("../Components/Sync/Sync").default.OptionsRecord;
        editableOptionsBindings: import("../Components/EditableOptions").default.OptionsBindings & {
            skipRedraw: string[];
        };
        columnAssignment: {};
    };
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
    static fromJSON(json: HighchartsComponent.ClassJSON, cell: Cell): HighchartsComponent;
    /**
     * A full set of chart options used by the chart.
     * [Highcharts API](https://api.highcharts.com/highcharts/)
     *
     * Try it:
     *
     * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/highcharts-components/highcharts/  | Chart options}
     *
     */
    chartOptions: Partial<ChartOptions>;
    /**
     * Reference to the chart.
     */
    chart: Chart | undefined;
    /**
     * HTML element where the chart is created.
     */
    chartContainer: HTMLElement;
    /**
     * Highcharts component's options.
     */
    options: HighchartsComponent.Options;
    /**
     * Type of constructor used for creating proper chart like: chart, stock,
     * gantt or map.
     *
     * Try it:
     *
     * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/highcharts-components/chart-constructor-maps/ | Map constructor}
     *
     * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/highcharts-components/chart-constructor-gantt/ | Gantt constructor}
     *
     * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/highcharts-components/chart-and-stock-constructors/ | Chart and Stock constructors}
     *
     */
    chartConstructor: HighchartsComponent.ConstructorType;
    /**
     * Reference to sync component that allows to sync i.e tooltips.
     *
     * @private
     */
    sync: Component['sync'];
    /**
     * Creates a Highcharts component in the cell.
     *
     * @param options
     * The options for the component.
     */
    constructor(cell: Cell, options: Partial<HighchartsComponent.Options>);
    /** @private */
    load(): this;
    render(): this;
    resize(width?: number | string | null, height?: number | string | null): this;
    /**
     * Adds call update value in store, when chart's point is updated.
     *
     * @private
     * */
    private setupConnectorUpdate;
    /**
     * Internal method for handling option updates.
     *
     * @private
     */
    private setOptions;
    /**
     * Update the store, when the point is being dragged.
     * @param  {Point} point Dragged point.
     * @param  {Component.ConnectorTypes} store Connector to update.
     */
    private onChartUpdate;
    /**
     * Handles updating via options.
     * @param options
     * The options to apply.
     *
     */
    update(options: Partial<HighchartsComponent.Options>, redraw?: boolean): Promise<void>;
    /**
     * Updates chart's series when the data table is changed.
     *
     * @private
     */
    private updateSeries;
    /**
     * Destroy chart and create a new one.
     *
     * @returns
     * The chart.
     *
     * @private
     *
     */
    private getChart;
    /**
     * Creates chart.
     *
     * @returns
     * The chart.
     *
     * @private
     *
     */
    private createChart;
    /**
     * Registers events from the chart options to the callback register.
     *
     * @private
     */
    private registerChartEvents;
    setConnector(connector: DataConnector | undefined): this;
    /**
     * Converts the class instance to a class JSON.
     *
     * @returns
     * Class JSON of this Component instance.
     *
     * @private
     */
    toJSON(): HighchartsComponent.ClassJSON;
    getEditableOptions(): HighchartsComponent.Options;
    getEditableOptionValue(propertyPath?: string[]): number | boolean | undefined | string;
}
declare namespace HighchartsComponent {
    /** @private */
    type ComponentType = HighchartsComponent;
    /** @private */
    type ConstructorType = ('chart' | 'stockChart' | 'mapChart' | 'ganttChart');
    /** @private */
    type ChartComponentEvents = JSONEvent | Component.EventTypes;
    /** @private */
    type JSONEvent = Component.Event<'toJSON' | 'fromJSON', {
        json: ClassJSON;
    }>;
    interface Options extends Component.ComponentOptions {
        /**
         * Whether to allow the component to edit the store to which it is
         * attached.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/demo/datagrid-sync/ | Allow connector update comparison}
         *
         */
        allowConnectorUpdate?: boolean;
        /**
         * The string that declares constructor that is called for creating
         * a chart.
         *
         * Example: `chart`, `stockChart`, `mapChart` or `ganttChart`.
         *
         */
        chartConstructor: ConstructorType;
        /**
         * Type of the component.
         */
        type: 'Highcharts';
        /**
         * A full set of chart options used by the chart.
         * [Highcharts API](https://api.highcharts.com/highcharts/)
         */
        chartOptions: Partial<ChartOptions>;
        /**
         * The name of class that is applied to the chart's container.
         */
        chartClassName?: string;
        /**
         * The id that is applied to the chart's container.
         */
        chartID?: string;
        /**
         * Names / aliases that should be mapped to xAxis values. You can use
         * null to keep columns selectively out of the chart.
         * ```
         * Example
         * columnAssignment: {
         *      'Food': 'x',
         *      'Vitamin A': 'y'
         * }
         * ```
         */
        columnAssignment?: Record<string, string | null>;
    }
    /** @private */
    interface OptionsJSON extends Component.ComponentOptionsJSON {
        chartOptions?: string;
        chartClassName?: string;
        chartID?: string;
        chartConstructor: ConstructorType;
        type: 'Highcharts';
    }
    /** @private */
    interface ClassJSON extends Component.JSON {
        options: OptionsJSON;
    }
}
export default HighchartsComponent;
