import type Cell from '../Layout/Cell';
import type CSSObject from '../../Core/Renderer/CSSObject';
import type { Chart, Options as ChartOptions, Highcharts as H } from './HighchartsTypes';
import type SidebarPopup from '../EditMode/SidebarPopup';
import type TextOptions from '../Components/TextOptions';
import type Types from '../../Shared/Types';
import Component from '../Components/Component.js';
/**
 *
 * Class that represents a KPI component.
 *
 */
declare class KPIComponent extends Component {
    static syncHandlers: import("../Components/Sync/Sync").default.OptionsRecord;
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
    static defaultOptions: Partial<Component.Options> & {
        type: string;
        className: string;
        minFontSize: number;
        syncHandlers: import("../Components/Sync/Sync").default.OptionsRecord;
        thresholdColors: string[];
        editableOptions: import("../Components/EditableOptions").default.Options[];
        linkedValueTo: {
            enabled: boolean;
            seriesIndex: number;
            pointIndex: number;
        };
    };
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
    options: KPIComponent.Options;
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
     * Reference to sync component that allows to sync.
     *
     * @internal
     */
    sync: Component['sync'];
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
    constructor(cell: Cell, options: Partial<KPIComponent.Options>);
    /** @internal */
    load(): Promise<this>;
    resize(width?: number | string | null, height?: number | string | null): this;
    render(): this;
    /**
     * Internal method for handling option updates.
     *
     * @private
     */
    private setOptions;
    /**
     * Handles updating via options.
     * @param options
     * The options to apply.
     */
    update(options: Partial<KPIComponent.Options>, shouldRerender?: boolean): Promise<void>;
    /**
     * @internal
     */
    onTableChanged(): void;
    /**
     * Gets the default value that should be displayed in the KPI.
     *
     * @returns
     * The value that should be displayed in the KPI.
     */
    private getValue;
    /**
     * Sets the value that should be displayed in the KPI.
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
    getOptionsOnDrop(sidebar: SidebarPopup): Partial<KPIComponent.Options>;
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
    getOptions(): Partial<KPIComponent.Options>;
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
    interface Options extends Component.Options {
        columnName: string;
        /**
         * A full set of chart options applied into KPI chart that is displayed
         * below the value.
         *
         * Some of the chart options are already set, you can find them in {@link KPIComponent.defaultChartOptions}
         *
         * [Highcharts API](https://api.highcharts.com/highcharts/)
         */
        chartOptions?: ChartOptions;
        style?: CSSObject;
        /**
         * The threshold declares the value when color is applied
         * (according to the `thresholdColors`).
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/kpi-component/threshold/ | Set a threshold}
         *
         */
        threshold?: number | Array<number>;
        /**
         * Array of two colors strings that are applied when threshold is
         * achieved.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/kpi-component/threshold/ | Threshold colors}
         *
         */
        thresholdColors?: Array<string>;
        type: 'KPI';
        /**
         * The value that is displayed in KPI component.
         */
        value?: number | string;
        /**
         * The minimal value of the font size, that KPI component should have.
         */
        minFontSize: number;
        /**
         * The KPI's component subtitle. This can be used both to display
         * a subtitle below the main title.
         */
        subtitle?: string | SubtitleOptions;
        /**
         * A format string for the value text.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/kpi-component/value-format/ | Add a value format}
         *
         */
        valueFormat?: string;
        /**
         * Callback function to format the text of the value from scratch.
         */
        valueFormatter?: ValueFormatterCallbackFunction;
        /**
         * This option allows user to toggle the KPI value connection with the
         * chart and set the specific point for the connection.
         *
         * Linking is enabled by default for the first point of the first
         * series.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/kpi-component/linked-value-to | Linking KPI value to a specific point}
         *
         * @example
         * ```js
         * linkedValueTo: {
         *     seriesIndex: 1,
         *     pointIndex: 2
         * }
         * ```
         */
        linkedValueTo: LinkedValueToOptions;
    }
    /** @internal */
    interface SubtitleOptions extends TextOptions {
        type?: SubtitleType;
    }
    /** @internal */
    type SubtitleType = 'text' | 'diff' | 'diffpercent';
    /** @internal */
    interface ValueFormatterCallbackFunction {
        (this: KPIComponent, value: (number | string)): string;
    }
    /**
     * Options for linking KPI value to the chart point.
     *
     * Try it:
     *
     * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/kpi-component/linked-value-to | Linking KPI value to a specific point}
     */
    interface LinkedValueToOptions {
        /**
         * Enable or disable linking KPI value to a point on the chart.
         *
         * @default true
         */
        enabled?: boolean;
        /**
         * Index of the point that is to receiving the KPI value as its Y.
         *
         * @default 0
         */
        pointIndex?: number;
        /**
         * Index of the series with the point receiving the KPI value.
         *
         * @default 0
         */
        seriesIndex?: number;
    }
}
export default KPIComponent;
