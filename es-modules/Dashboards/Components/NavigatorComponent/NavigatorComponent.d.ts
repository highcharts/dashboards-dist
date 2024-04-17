import type { Chart, Highcharts as H } from '../../Plugins/HighchartsTypes';
import type Cell from '../../Layout/Cell';
import type { Options } from './NavigatorComponentOptions';
import Component from '../Component.js';
/**
 * Setup a component with data navigation.
 */
declare class NavigatorComponent extends Component {
    /** @private */
    static charter: H;
    /**
     * Default options of the Navigator component.
     */
    static defaultOptions: Partial<Options>;
    /**
     * Predefined sync configuration for the Navigator component.
     */
    static predefinedSyncConfig: import("../Sync/Sync").default.PredefinedSyncConfig;
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
    static fromJSON(json: Component.JSON, cell: Cell): NavigatorComponent;
    constructor(cell: Cell, options: Options);
    /**
     * Reference to the navigator chart.
     */
    chart: Chart;
    /**
     * HTML element where the navigator is created.
     */
    chartContainer: HTMLElement;
    /**
     * Options for the navigator component
     */
    options: Options;
    /**
     * The content of the navigator is of type string.
     * @private
     */
    private stringData?;
    /**
     * An array of virtual x-axis categories. Index is value on the x-axis.
     * @private
     */
    private categories?;
    /** @private */
    private adjustNavigator;
    /**
     * Returns the first column of columnAssignment to use for navigator data.
     * @private
     *
     * @return
     * Navigator column assignment.
     */
    getColumnAssignment(): [string, string];
    /**
     * Gets the component's options.
     * @internal
     */
    getOptions(): Partial<Options>;
    /**
     * Gets the extremes of the navigator's x-axis.
     */
    getAxisExtremes(): [number, number] | [string, string];
    /** @private */
    load(): Promise<this>;
    onTableChanged(): void;
    /** @private */
    private redrawNavigator;
    /** @private */
    render(): this;
    /** @private */
    private renderNavigator;
    /**
     * Generates the data for the crossfilter navigator.
     */
    private generateCrossfilterData;
    /** @private */
    resize(width?: (number | string | null), height?: (number | string | null)): this;
    /**
     * Handles updating via options.
     *
     * @param options
     * The options to apply.
     */
    update(options: Partial<Options>, shouldRerender?: boolean): Promise<void>;
    getOptionsOnDrop(): Partial<Options>;
}
export default NavigatorComponent;
