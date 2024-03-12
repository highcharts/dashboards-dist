import type Board from '../../Board';
import type Cell from '../../Layout/Cell';
import type { Chart, Options as ChartOptions, Highcharts as H } from '../../Plugins/HighchartsTypes';
import type { ConstructorType, Options } from './HighchartsComponentOptions';
import type SidebarPopup from '../../EditMode/SidebarPopup';
import Component from '../Component.js';
import DataConnector from '../../../Data/Connectors/DataConnector.js';
import Globals from '../../Globals.js';
/**
 *
 * Class that represents a Highcharts component.
 *
 */
declare class HighchartsComponent extends Component {
    /** @private */
    static charter: H;
    /** @private */
    static syncHandlers: import("../Sync/Sync").default.OptionsRecord;
    /**
     * Default options of the Highcharts component.
     */
    static defaultOptions: Partial<Component.Options> & Globals.DeepPartial<Options>;
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
    chart?: Chart;
    /**
     * HTML element where the chart is created.
     */
    chartContainer: HTMLElement;
    /**
     * Highcharts component's options.
     */
    options: Options;
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
    chartConstructor: ConstructorType;
    /**
     * Reference to sync component that allows to sync i.e tooltips.
     *
     * @private
     */
    sync: Component['sync'];
    /**
     * List of series IDs created from the connector using `columnAssignment`.
     */
    seriesFromConnector: string[];
    /**
     * Creates a Highcharts component in the cell.
     *
     * @param options
     * The options for the component.
     */
    constructor(cell: Cell, options: Partial<Options>, board?: Board);
    onTableChanged(): void;
    /** @private */
    load(): Promise<this>;
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
     * @internal
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
    update(options: Partial<Options>, shouldRerender?: boolean): Promise<void>;
    /**
     * Updates chart's series when the data table is changed.
     *
     * @private
     */
    updateSeries(): void;
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
     * Destroys the highcharts component.
     */
    destroy(): void;
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
    private getDefaultColumnAssignment;
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
    getOptionsOnDrop(sidebar: SidebarPopup): Partial<Options>;
    /**
     * Converts the class instance to a class JSON.
     *
     * @returns
     * Class JSON of this Component instance.
     *
     * @private
     */
    toJSON(): HighchartsComponent.ClassJSON;
    /**
     * Get the HighchartsComponent component's options.
     * @returns
     * The JSON of HighchartsComponent component's options.
     *
     * @internal
     *
     */
    getOptions(): Partial<Options>;
    getEditableOptions(): Options;
    getEditableOptionValue(propertyPath?: string[]): number | boolean | undefined | string;
}
/** @private */
declare namespace HighchartsComponent {
    /** @private */
    type ComponentType = HighchartsComponent;
    /** @private */
    type ChartComponentEvents = JSONEvent | Component.EventTypes;
    /** @private */
    type JSONEvent = Component.Event<'toJSON' | 'fromJSON', {
        json: ClassJSON;
    }>;
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
