import type Board from '../../Board';
import type Cell from '../../Layout/Cell';
import type { Chart, Options as ChartOptions, Highcharts as H } from '../../Plugins/HighchartsTypes';
import type Options from './KPIComponentOptions';
import type SidebarPopup from '../../EditMode/SidebarPopup';
import type Types from '../../../Shared/Types';
import Component from '../Component.js';
/**
 *
 * Class that represents a KPI component.
 *
 */
declare class KPIComponent extends Component {
    /**
     * Creates component from JSON.
     *
     * @param json
     * Set of component options, used for creating the KPI component.
     *
     * @param cell
     * Instance of cell, where component is attached.
     *
     * @returns
     * KPI component based on config from JSON.
     *
     * @internal
     */
    static fromJSON(json: KPIComponent.ClassJSON, cell: Cell): KPIComponent;
    /** @internal */
    static charter?: H;
    /**
     * Default options of the KPI component.
     */
    static defaultOptions: Partial<Component.Options> & import("../../Globals").default.DeepPartial<Options>;
    /**
     * Predefined sync config for the KPI component.
     */
    static predefinedSyncConfig: import("../Sync/Sync").default.PredefinedSyncConfig;
    /**
     * Default options of the KPI component.
     *
     * @default {
        chart: {
            type: 'spline',
            styledMode: true,
            zooming: {
                mouseWheel: {
                    enabled: false
                }
            }
        },
        title: {
            text: void 0
        },
        xAxis: {
            visible: false
        },
        yAxis: {
            visible: false,
            title: {
                text: null
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        tooltip: {
            outside: true
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        }
    }
     */
    static defaultChartOptions: Types.DeepPartial<ChartOptions>;
    /**
     * KPI component's options.
     */
    options: Options;
    /**
     * HTML element where the value is created.
     *
     * @internal
     */
    value: HTMLElement;
    /**
     * The HTML element where the subtitle is created.
     */
    subtitle: HTMLElement;
    /**
     * HTML element where the chart is created.
     */
    chartContainer?: HTMLElement;
    /**
     * Reference to the chart.
     */
    chart?: Chart;
    /**
     * Previous value of KPI.
     *
     * @internal
     */
    private prevValue?;
    /**
     * Creates a KPI component in the cell.
     *
     * @param cell
     * Instance of cell, where component is attached.
     *
     * @param options
     * The options for the component.
     */
    constructor(cell: Cell, options: Partial<Options>, board?: Board);
    /** @internal */
    load(): Promise<this>;
    resize(width?: number | string | null, height?: number | string | null): this;
    render(): this;
    /**
     * Handles updating via options.
     *
     * @param options
     * The options to apply.
     */
    update(options: Partial<Options>, shouldRerender?: boolean): Promise<void>;
    /**
     * @internal
     */
    onTableChanged(): void;
    /**
     * Destroys the highcharts component.
     */
    destroy(): void;
    /**
     * Gets the default value that should be displayed in the KPI.
     *
     * @returns
     * The value that should be displayed in the KPI.
     */
    private getValue;
    /**
     * Sets the value that should be displayed in the KPI.
     *
     * @param value
     * The value to display in the KPI.
     */
    setValue(value?: number | string | undefined): void;
    /**
     * Handles updating chart point value.
     *
     * @internal
     */
    linkValueToChart(value?: number | string | undefined): void;
    /**
     * Handles updating elements via options
     *
     * @internal
     */
    private updateElements;
    /**
     * Gets KPI subtitle text.
     *
     * @returns
     * The subtitle's text.
     *
     * @internal
     */
    private getSubtitle;
    /**
     * Gets CSS class name of the KPI subtitle.
     *
     * @returns
     * The name of class.
     *
     * @internal
     */
    private getSubtitleClassName;
    /**
     * Applies title's color according to the threshold.
     *
     * @returns
     * Hex of color.
     *
     * @internal
     */
    private getValueColor;
    getOptionsOnDrop(sidebar: SidebarPopup): Partial<Options>;
    /**
     * Converts the class instance to a class JSON.
     *
     * @returns
     * Class JSON of this Component instance.
     *
     * @internal
     */
    toJSON(): KPIComponent.ClassJSON;
    /**
     * Get the KPI component's options.
     * @returns
     * The JSON of KPI component's options.
     *
     * @internal
     *
     */
    getOptions(): Partial<Options>;
}
declare namespace KPIComponent {
    /** @internal */
    type ComponentType = KPIComponent;
    /** @internal */
    interface ClassJSON extends Component.JSON {
        options: ComponentJSONOptions;
    }
    /** @internal */
    interface ComponentJSONOptions extends Component.ComponentOptionsJSON {
        title?: string;
        chartOptions?: string;
        threshold?: number | Array<number>;
        thresholdColors?: Array<string>;
        type: 'KPI';
        value?: number | string;
        subtitle?: string;
        valueFormat?: string;
    }
}
export default KPIComponent;
