import type Board from '../../Board';
import type Cell from '../../Layout/Cell';
import type { Chart, Options as ChartOptions, Highcharts as H } from '../../Plugins/HighchartsTypes';
import type Options from './KPIComponentOptions';
import type SidebarPopup from '../../EditMode/SidebarPopup';
import type Types from '../../../Shared/Types';
import Component from '../Component.js';
import SUM from '../../../Data/Formula/Functions/SUM.js';
import AVERAGE from '../../../Data/Formula/Functions/AVERAGE.js';
import MEDIAN from '../../../Data/Formula/Functions/MEDIAN.js';
import MAX from '../../../Data/Formula/Functions/MAX.js';
import MIN from '../../../Data/Formula/Functions/MIN.js';
import COUNT from '../../../Data/Formula/Functions/COUNT.js';
import PRODUCT from '../../../Data/Formula/Functions/PRODUCT.js';
/**
 *
 * Class that represents a KPI component.
 *
 */
declare class KPIComponent extends Component {
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
     * The formula option's default formula functions map.
     */
    static formulaFunctions: {
        readonly SUM: typeof SUM;
        readonly AVERAGE: typeof AVERAGE;
        readonly MEDIAN: typeof MEDIAN;
        readonly MAX: typeof MAX;
        readonly MIN: typeof MIN;
        readonly COUNT: typeof COUNT;
        readonly PRODUCT: typeof PRODUCT;
    };
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
     * Gets a proper value, according to the provided formula option.
     *
     * @returns
     * The formula value. Can be a number internally, or a string from the
     * callback function.
     *
     * @internal
     */
    private getFormulaValue;
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
     * Get the KPI component's options.
     * @returns
     * KPI component's options.
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
    type FormulaType = keyof typeof KPIComponent.formulaFunctions;
}
export default KPIComponent;
