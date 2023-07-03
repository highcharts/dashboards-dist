import type AnimationOptions from '../../Animation/AnimationOptions';
import type AxisLike from '../AxisLike';
import type AxisOptions from '../AxisOptions';
import type Chart from '../../Chart/Chart.js';
import type ColorType from '../../Color/ColorType';
import type Fx from '../../Animation/Fx';
import type GradientColor from '../../Color/GradientColor';
import type Legend from '../../Legend/Legend';
import type { LegendItemObject } from '../../Legend/LegendItem';
import type LegendOptions from '../../Legend/LegendOptions';
import type Point from '../../Series/Point.js';
import type PointerEvent from '../../PointerEvent';
import type { StatesOptionsKey } from '../../Series/StatesOptions';
import type SVGPath from '../../Renderer/SVG/SVGPath';
import Axis from '../Axis.js';
import ColorAxisComposition from './ColorAxisComposition.js';
import LegendSymbol from '../../Legend/LegendSymbol.js';
declare const Series: typeof import("../../Series/Series").default;
declare module '../../Axis/AxisLike' {
    interface AxisLike {
        labelLeft?: number;
        labelRight?: number;
    }
}
declare module '../../Chart/ChartLike' {
    interface ChartLike {
        colorAxis?: Array<ColorAxis>;
    }
}
declare module '../../../Core/Options' {
    interface Options {
        colorAxis?: (DeepPartial<ColorAxis.Options> | Array<DeepPartial<ColorAxis.Options>>);
    }
}
declare module '../../Series/PointLike' {
    interface PointLike {
        dataClass?: number;
    }
}
declare module '../../Series/SeriesLike' {
    interface SeriesLike {
        axisTypes?: Array<string>;
        colorAxis?: ColorAxis;
        colorKey?: string;
        minColorValue?: number;
        maxColorValue?: number;
    }
}
declare module '../../Series/SeriesOptions' {
    interface SeriesOptions {
        colorKey?: string;
    }
}
/**
 * The ColorAxis object for inclusion in gradient legends.
 *
 * @class
 * @name Highcharts.ColorAxis
 * @augments Highcharts.Axis
 *
 * @param {Highcharts.Chart} chart
 * The related chart of the color axis.
 *
 * @param {Highcharts.ColorAxisOptions} userOptions
 * The color axis options for initialization.
 */
declare class ColorAxis extends Axis implements AxisLike {
    static defaultColorAxisOptions: DeepPartial<ColorAxis.Options>;
    static defaultLegendLength: number;
    /**
     * @private
     */
    static keepProps: Array<string>;
    static compose(ChartClass: typeof Chart, FxClass: typeof Fx, LegendClass: typeof Legend, SeriesClass: typeof Series): void;
    /**
     * @private
     */
    constructor(chart: Chart, userOptions: DeepPartial<ColorAxis.Options>);
    added?: boolean;
    beforePadding: any;
    chart: Chart;
    coll: "colorAxis";
    dataClasses: Array<ColorAxis.DataClassesOptions>;
    legendColor?: GradientColor;
    legendItem?: LegendItemObject;
    name?: string;
    options: ColorAxis.Options;
    stops: GradientColor['stops'];
    visible: boolean;
    /**
     * Initializes the color axis.
     *
     * @function Highcharts.ColorAxis#init
     *
     * @param {Highcharts.Chart} chart
     * The related chart of the color axis.
     *
     * @param {Highcharts.ColorAxisOptions} userOptions
     * The color axis options for initialization.
     */
    init(chart: Chart, userOptions: DeepPartial<ColorAxis.Options>): void;
    /**
     * @private
     */
    initDataClasses(userOptions: DeepPartial<ColorAxis.Options>): void;
    /**
     * Returns true if the series has points at all.
     *
     * @function Highcharts.ColorAxis#hasData
     *
     * @return {boolean}
     * True, if the series has points, otherwise false.
     */
    hasData(): boolean;
    /**
     * Override so that ticks are not added in data class axes (#6914)
     * @private
     */
    setTickPositions(): void;
    /**
     * @private
     */
    initStops(): void;
    /**
     * Extend the setOptions method to process extreme colors and color stops.
     * @private
     */
    setOptions(userOptions: DeepPartial<ColorAxis.Options>): void;
    /**
     * @private
     */
    setAxisSize(): void;
    /**
     * @private
     */
    normalizedValue(value: number): number;
    /**
     * Translate from a value to a color.
     * @private
     */
    toColor(value: number, point: Point): (ColorType | undefined);
    /**
     * Override the getOffset method to add the whole axis groups inside the
     * legend.
     * @private
     */
    getOffset(): void;
    /**
     * Create the color gradient.
     * @private
     */
    setLegendColor(): void;
    /**
     * The color axis appears inside the legend and has its own legend symbol.
     * @private
     */
    drawLegendSymbol(legend: Legend, item: ColorAxis): void;
    /**
     * Fool the legend.
     * @private
     */
    setState(state?: StatesOptionsKey): void;
    /**
     * @private
     */
    setVisible(): void;
    /**
     * @private
     */
    getSeriesExtremes(): void;
    /**
     * Internal function to draw a crosshair.
     *
     * @function Highcharts.ColorAxis#drawCrosshair
     *
     * @param {Highcharts.PointerEventObject} [e]
     *        The event arguments from the modified pointer event, extended with
     *        `chartX` and `chartY`
     *
     * @param {Highcharts.Point} [point]
     *        The Point object if the crosshair snaps to points.
     *
     * @emits Highcharts.ColorAxis#event:afterDrawCrosshair
     * @emits Highcharts.ColorAxis#event:drawCrosshair
     */
    drawCrosshair(e?: PointerEvent, point?: ColorAxisComposition.PointComposition): void;
    /**
     * @private
     */
    getPlotLinePath(options: Axis.PlotLinePathOptions): (SVGPath | null);
    /**
     * Updates a color axis instance with a new set of options. The options are
     * merged with the existing options, so only new or altered options need to
     * be specified.
     *
     * @function Highcharts.ColorAxis#update
     *
     * @param {Highcharts.ColorAxisOptions} newOptions
     * The new options that will be merged in with existing options on the color
     * axis.
     *
     * @param {boolean} [redraw]
     * Whether to redraw the chart after the color axis is altered. If doing
     * more operations on the chart, it is a good idea to set redraw to `false`
     * and call {@link Highcharts.Chart#redraw} after.
     */
    update(newOptions: DeepPartial<ColorAxis.Options>, redraw?: boolean): void;
    /**
     * Destroy color axis legend items.
     * @private
     */
    destroyItems(): void;
    destroy(): void;
    /**
     * Removes the color axis and the related legend item.
     *
     * @function Highcharts.ColorAxis#remove
     *
     * @param {boolean} [redraw=true]
     *        Whether to redraw the chart following the remove.
     */
    remove(redraw?: boolean): void;
    /**
     * Get the legend item symbols for data classes.
     * @private
     */
    getDataClassLegendSymbols(): Array<ColorAxis.LegendItemObject>;
}
declare namespace ColorAxis {
    interface DataClassesOptions {
        color?: ColorType;
        colorIndex?: number;
        from?: number;
        name?: string;
        to?: number;
    }
    interface LegendItemObject extends DataClassesOptions {
        [key: string]: any;
        chart: Chart;
        name: string;
        options: object;
        drawLegendSymbol: typeof LegendSymbol['rectangle'];
        visible: boolean;
        setState: Point['setState'];
        isDataClass: true;
        setVisible: Function;
    }
    interface MarkerOptions {
        animation?: (boolean | Partial<AnimationOptions>);
        color?: ColorType;
        width?: number;
    }
    interface Options extends AxisOptions {
        dataClassColor?: string;
        dataClasses?: Array<DataClassesOptions>;
        layout?: string;
        legend?: LegendOptions;
        marker?: MarkerOptions;
        maxColor?: ColorType;
        minColor?: ColorType;
        showInLegend?: boolean;
        stops?: GradientColor['stops'];
    }
}
export default ColorAxis;
