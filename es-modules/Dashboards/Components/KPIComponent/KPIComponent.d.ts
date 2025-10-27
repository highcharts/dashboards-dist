import type Board from '../../Board';
import type Cell from '../../Layout/Cell';
import type { Chart, Options as ChartOptions } from '../../Plugins/HighchartsTypes';
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
    /**
     * Default options of the KPI component.
     */
    static defaultOptions: Partial<Component.Options> & Types.DeepPartial<Options>;
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
     * Creates a KPI component in the cell.
     *
     * @param cell
     * Instance of cell, where component is attached.
     *
     * @param options
     * The options for the component.
     */
    constructor(cell: Cell, options: Partial<Options>, board?: Board);
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
    getOptionsOnDrop(sidebar: SidebarPopup): Partial<Options>;
}
declare namespace KPIComponent {
}
export default KPIComponent;
