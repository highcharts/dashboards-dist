import type { AlignValue } from '../Renderer/AlignObject';
import type AnimationOptions from '../Animation/AnimationOptions';
import type AxisComposition from './AxisComposition';
import type { AxisCollectionKey, AxisCrosshairOptions, AxisLabelFormatterCallback, AxisLabelFormatterContextObject, AxisOptions, AxisTitleOptions, XAxisOptions, YAxisOptions } from './AxisOptions';
import type AxisLike from './AxisLike';
import type { AxisTypeOptions } from './AxisType';
import type Chart from '../Chart/Chart';
import type { EventCallback } from '../Callback';
import type FontMetricsObject from '../Renderer/FontMetricsObject';
import type PlotLineOrBand from './PlotLineOrBand/PlotLineOrBand';
import type Point from '../Series/Point';
import type PointerEvent from '../PointerEvent';
import type PositionObject from '../Renderer/PositionObject';
import type Series from '../Series/Series';
import type SizeObject from '../Renderer/SizeObject';
import type SVGElement from '../Renderer/SVG/SVGElement';
import type SVGPath from '../Renderer/SVG/SVGPath';
import type TickPositionsArray from './TickPositionsArray';
import Tick from './Tick.js';
declare module '../Series/SeriesOptions' {
    interface SeriesOptions {
        softThreshold?: boolean;
        startFromThreshold?: boolean;
        threshold?: number | null;
    }
}
/**
 * Create a new axis object. Called internally when instanciating a new chart or
 * adding axes by {@link Highcharts.Chart#addAxis}.
 *
 * A chart can have from 0 axes (pie chart) to multiples. In a normal, single
 * series cartesian chart, there is one X axis and one Y axis.
 *
 * The X axis or axes are referenced by {@link Highcharts.Chart.xAxis}, which is
 * an array of Axis objects. If there is only one axis, it can be referenced
 * through `chart.xAxis[0]`, and multiple axes have increasing indices. The same
 * pattern goes for Y axes.
 *
 * If you need to get the axes from a series object, use the `series.xAxis` and
 * `series.yAxis` properties. These are not arrays, as one series can only be
 * associated to one X and one Y axis.
 *
 * A third way to reference the axis programmatically is by `id`. Add an `id` in
 * the axis configuration options, and get the axis by
 * {@link Highcharts.Chart#get}.
 *
 * Configuration options for the axes are given in options.xAxis and
 * options.yAxis.
 *
 * @class
 * @name Highcharts.Axis
 *
 * @param {Highcharts.Chart} chart
 * The Chart instance to apply the axis on.
 *
 * @param {Highcharts.AxisOptions} userOptions
 * Axis options
 */
declare class Axis {
    static readonly defaultOptions: XAxisOptions;
    static keepProps: string[];
    constructor(chart: Chart, userOptions: DeepPartial<AxisOptions>, coll?: AxisCollectionKey);
    _addedPlotLB?: boolean;
    allowZoomOutside?: boolean;
    alternateBands: Record<string, PlotLineOrBand>;
    autoRotation?: Array<number>;
    axisGroup?: SVGElement;
    axisLine?: SVGElement;
    axisParent?: SVGElement;
    axisPointRange?: number;
    axisTitle?: SVGElement;
    axisTitleMargin?: number;
    bottom: number;
    categories?: Array<string>;
    chart: Chart;
    closestPointRange: number;
    coll: AxisCollectionKey;
    cross?: SVGElement;
    crosshair?: AxisCrosshairOptions;
    dataMax?: (null | number);
    dataMin?: (null | number);
    displayBtn?: boolean;
    eventArgs?: any;
    eventOptions: Record<string, EventCallback<Series, Event>>;
    finalTickAmt?: number;
    forceRedraw?: boolean;
    gridGroup?: SVGElement;
    hasNames: boolean;
    hasVisibleSeries: boolean;
    height: number;
    horiz?: boolean;
    index: number;
    isDirty?: boolean;
    isLinked: boolean;
    isOrdinal?: boolean;
    isRadial?: boolean;
    isXAxis?: boolean;
    isZAxis?: boolean;
    keepProps?: Array<string>;
    labelAlign?: AlignValue;
    labelEdge: Array<null>;
    labelFormatter: AxisLabelFormatterCallback;
    labelGroup?: SVGElement;
    labelOffset?: number;
    labelRotation?: number;
    left: number;
    len: number;
    linkedParent?: Axis;
    max: (null | number);
    maxLabelDimensions?: SizeObject;
    maxLabelLength: number;
    min: (null | number);
    minorTickInterval: number;
    minorTicks: Record<string, Tick>;
    minPixelPadding: number;
    minPointOffset?: number;
    minRange?: (null | number);
    names: Array<string>;
    offset: number;
    old?: {
        len: number;
        max: number | null;
        min: number | null;
        transA: number;
        userMax?: number;
        userMin?: number;
    };
    opposite?: boolean;
    options: (AxisOptions | XAxisOptions | YAxisOptions);
    ordinal?: AxisComposition['ordinal'];
    overlap: boolean;
    paddedTicks: Array<number>;
    panningState?: Axis.PanningState;
    plotLinesAndBands: Array<PlotLineOrBand>;
    plotLinesAndBandsGroups: Record<string, SVGElement>;
    pointRange: number;
    pointRangePadding: number;
    pos: number;
    positiveValuesOnly: boolean;
    reserveSpaceDefault?: boolean;
    reversed?: boolean;
    right: number;
    sector?: number;
    series: Array<Series>;
    showAxis?: boolean;
    side: number;
    single?: boolean;
    softThreshold?: boolean;
    staggerLines?: number;
    staticScale?: number;
    threshold?: number;
    thresholdAlignment?: number;
    tickAmount: number;
    tickInterval: number;
    tickmarkOffset: number;
    tickPositions: TickPositionsArray;
    tickRotCorr: PositionObject;
    ticks: Record<string, Tick>;
    titleOffset?: number;
    top: number;
    transA: number;
    transB: number;
    translationSlope: number;
    userMax?: number;
    userMin?: number;
    userMinRange?: number;
    userOptions: DeepPartial<AxisOptions>;
    visible: boolean;
    width: number;
    zoomEnabled: boolean;
    /**
     * Overrideable function to initialize the axis.
     *
     * @see {@link Axis}
     *
     * @function Highcharts.Axis#init
     *
     * @param {Highcharts.Chart} chart
     * The Chart instance to apply the axis on.
     *
     * @param {AxisOptions} userOptions
     * Axis options.
     *
     * @emits Highcharts.Axis#event:afterInit
     * @emits Highcharts.Axis#event:init
     */
    init(chart: Chart, userOptions: DeepPartial<AxisOptions>, coll?: AxisCollectionKey): void;
    /**
     * Merge and set options.
     *
     * @private
     * @function Highcharts.Axis#setOptions
     *
     * @param {Highcharts.AxisOptions} userOptions
     * Axis options.
     *
     * @emits Highcharts.Axis#event:afterSetOptions
     */
    setOptions(userOptions: DeepPartial<AxisOptions>): void;
    /**
     * The default label formatter. The context is a special config object for
     * the label. In apps, use the
     * [labels.formatter](https://api.highcharts.com/highcharts/xAxis.labels.formatter)
     * instead, except when a modification is needed.
     *
     * @function Highcharts.Axis#defaultLabelFormatter
     *
     * @param {Highcharts.AxisLabelsFormatterContextObject} this
     * Formatter context of axis label.
     *
     * @param {Highcharts.AxisLabelsFormatterContextObject} [ctx]
     * Formatter context of axis label.
     *
     * @return {string}
     * The formatted label content.
     */
    defaultLabelFormatter(this: AxisLabelFormatterContextObject, ctx?: AxisLabelFormatterContextObject): string;
    /**
     * Get the minimum and maximum for the series of each axis. The function
     * analyzes the axis series and updates `this.dataMin` and `this.dataMax`.
     *
     * @private
     * @function Highcharts.Axis#getSeriesExtremes
     *
     * @emits Highcharts.Axis#event:afterGetSeriesExtremes
     * @emits Highcharts.Axis#event:getSeriesExtremes
     */
    getSeriesExtremes(): void;
    /**
     * Translate from axis value to pixel position on the chart, or back. Use
     * the `toPixels` and `toValue` functions in applications.
     *
     * @private
     * @function Highcharts.Axis#translate
     */
    translate(val: number, backwards?: boolean, cvsCoord?: boolean, old?: boolean, handleLog?: boolean, pointPlacement?: number): number;
    /**
     * Translate a value in terms of axis units into pixels within the chart.
     *
     * @function Highcharts.Axis#toPixels
     *
     * @param {number} value
     * A value in terms of axis units.
     *
     * @param {boolean} paneCoordinates
     * Whether to return the pixel coordinate relative to the chart or just the
     * axis/pane itself.
     *
     * @return {number}
     * Pixel position of the value on the chart or axis.
     */
    toPixels(value: number, paneCoordinates?: boolean): number;
    /**
     * Translate a pixel position along the axis to a value in terms of axis
     * units.
     *
     * @function Highcharts.Axis#toValue
     *
     * @param {number} pixel
     * The pixel value coordinate.
     *
     * @param {boolean} [paneCoordinates=false]
     * Whether the input pixel is relative to the chart or just the axis/pane
     * itself.
     *
     * @return {number}
     * The axis value.
     */
    toValue(pixel: number, paneCoordinates?: boolean): number;
    /**
     * Create the path for a plot line that goes from the given value on
     * this axis, across the plot to the opposite side. Also used internally for
     * grid lines and crosshairs.
     *
     * @function Highcharts.Axis#getPlotLinePath
     *
     * @param {Highcharts.AxisPlotLinePathOptionsObject} options
     * Options for the path.
     *
     * @return {Highcharts.SVGPathArray|null}
     * The SVG path definition for the plot line.
     */
    getPlotLinePath(options: Axis.PlotLinePathOptions): (SVGPath | null);
    /**
     * Internal function to get the tick positions of a linear axis to round
     * values like whole tens or every five.
     *
     * @function Highcharts.Axis#getLinearTickPositions
     *
     * @param {number} tickInterval
     * The normalized tick interval.
     *
     * @param {number} min
     * Axis minimum.
     *
     * @param {number} max
     * Axis maximum.
     *
     * @return {Array<number>}
     * An array of axis values where ticks should be placed.
     */
    getLinearTickPositions(tickInterval: number, min: number, max: number): Array<number>;
    /**
     * Resolve the new minorTicks/minorTickInterval options into the legacy
     * loosely typed minorTickInterval option.
     *
     * @function Highcharts.Axis#getMinorTickInterval
     *
     * @return {number|"auto"|null}
     * Legacy option
     */
    getMinorTickInterval(): ('auto' | null | number);
    /**
     * Internal function to return the minor tick positions. For logarithmic
     * axes, the same logic as for major ticks is reused.
     *
     * @function Highcharts.Axis#getMinorTickPositions
     *
     * @return {Array<number>}
     * An array of axis values where ticks should be placed.
     */
    getMinorTickPositions(): Array<number>;
    /**
     * Adjust the min and max for the minimum range. Keep in mind that the
     * series data is not yet processed, so we don't have information on data
     * cropping and grouping, or updated `axis.pointRange` or
     * `series.pointRange`. The data can't be processed until we have finally
     * established min and max.
     *
     * @private
     * @function Highcharts.Axis#adjustForMinRange
     */
    adjustForMinRange(): void;
    /**
     * Find the closestPointRange across all series, including the single data
     * series.
     *
     * @private
     * @function Highcharts.Axis#getClosest
     */
    getClosest(): number | undefined;
    /**
     * When a point name is given and no x, search for the name in the existing
     * categories, or if categories aren't provided, search names or create a
     * new category (#2522).
     *
     * @private
     * @function Highcharts.Axis#nameToX
     *
     * @param {Highcharts.Point} point
     * The point to inspect.
     *
     * @return {number}
     * The X value that the point is given.
     */
    nameToX(point: Point): number;
    /**
     * When changes have been done to series data, update the axis.names.
     *
     * @private
     * @function Highcharts.Axis#updateNames
     */
    updateNames(): void;
    /**
     * Update translation information.
     *
     * @private
     * @function Highcharts.Axis#setAxisTranslation
     *
     * @emits Highcharts.Axis#event:afterSetAxisTranslation
     */
    setAxisTranslation(): void;
    /**
     * @private
     * @function Highcharts.Axis#minFromRange
     */
    minFromRange(): (number | undefined);
    /**
     * Set the tick positions to round values and optionally extend the extremes
     * to the nearest tick.
     *
     * @private
     * @function Highcharts.Axis#setTickInterval
     *
     * @param {boolean} secondPass
     * TO-DO: parameter description
     *
     * @emits Highcharts.Axis#event:foundExtremes
     */
    setTickInterval(secondPass?: boolean): void;
    /**
     * Now we have computed the normalized tickInterval, get the tick positions.
     *
     * @private
     * @function Highcharts.Axis#setTickPositions
     *
     * @emits Highcharts.Axis#event:afterSetTickPositions
     */
    setTickPositions(): void;
    /**
     * Handle startOnTick and endOnTick by either adapting to padding min/max or
     * rounded min/max. Also handle single data points.
     *
     * @private
     * @function Highcharts.Axis#trimTicks
     *
     * @param {Array<number>} tickPositions
     * TO-DO: parameter description
     *
     * @param {boolean} [startOnTick]
     * TO-DO: parameter description
     *
     * @param {boolean} [endOnTick]
     * TO-DO: parameter description
     */
    trimTicks(tickPositions: Array<number>, startOnTick?: boolean, endOnTick?: boolean): void;
    /**
     * Check if there are multiple axes in the same pane.
     *
     * @private
     * @function Highcharts.Axis#alignToOthers
     *
     * @return {boolean|undefined}
     * True if there are other axes.
     */
    alignToOthers(): (boolean | undefined);
    /**
     * Where the axis wants its threshold, from 0 which is on `axis.min`, to 1 which
     * is on `axis.max`.
     *
     * @private
     * @function Highcharts.Axis#getThresholdAlignment
     */
    getThresholdAlignment(callerAxis: Axis): number | undefined;
    /**
     * Find the max ticks of either the x and y axis collection, and record it
     * in `this.tickAmount`.
     *
     * @private
     * @function Highcharts.Axis#getTickAmount
     */
    getTickAmount(): void;
    /**
     * When using multiple axes, adjust the number of ticks to match the highest
     * number of ticks in that group.
     *
     * @private
     * @function Highcharts.Axis#adjustTickAmount
     */
    adjustTickAmount(): void;
    /**
     * Set the scale based on data min and max, user set min and max or options.
     *
     * @private
     * @function Highcharts.Axis#setScale
     *
     * @emits Highcharts.Axis#event:afterSetScale
     */
    setScale(): void;
    /**
     * Set the minimum and maximum of the axes after render time. If the
     * `startOnTick` and `endOnTick` options are true, the minimum and maximum
     * values are rounded off to the nearest tick. To prevent this, these
     * options can be set to false before calling setExtremes. Also, setExtremes
     * will not allow a range lower than the `minRange` option, which by default
     * is the range of five points.
     *
     * @sample highcharts/members/axis-setextremes/
     *         Set extremes from a button
     * @sample highcharts/members/axis-setextremes-datetime/
     *         Set extremes on a datetime axis
     * @sample highcharts/members/axis-setextremes-off-ticks/
     *         Set extremes off ticks
     * @sample stock/members/axis-setextremes/
     *         Set extremes in Highcharts Stock
     *
     * @function Highcharts.Axis#setExtremes
     *
     * @param {number} [newMin]
     * The new minimum value.
     *
     * @param {number} [newMax]
     * The new maximum value.
     *
     * @param {boolean} [redraw=true]
     * Whether to redraw the chart or wait for an explicit call to
     * {@link Highcharts.Chart#redraw}
     *
     * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation=true]
     * Enable or modify animations.
     *
     * @param {*} [eventArguments]
     * Arguments to be accessed in event handler.
     *
     * @emits Highcharts.Axis#event:setExtremes
     */
    setExtremes(newMin?: number, newMax?: number, redraw?: boolean, animation?: (boolean | Partial<AnimationOptions>), eventArguments?: any): void;
    /**
     * Overridable method for zooming chart. Pulled out in a separate method to
     * allow overriding in stock charts.
     *
     * @private
     * @function Highcharts.Axis#zoom
     */
    zoom(newMin: number, newMax: number): void;
    /**
     * Update the axis metrics.
     *
     * @private
     * @function Highcharts.Axis#setAxisSize
     */
    setAxisSize(): void;
    /**
     * Get the current extremes for the axis.
     *
     * @sample highcharts/members/axis-getextremes/
     *         Report extremes by click on a button
     *
     * @function Highcharts.Axis#getExtremes
     *
     * @return {Highcharts.ExtremesObject}
     * An object containing extremes information.
     */
    getExtremes(): Axis.ExtremesObject;
    /**
     * Get the zero plane either based on zero or on the min or max value.
     * Used in bar and area plots.
     *
     * @function Highcharts.Axis#getThreshold
     *
     * @param {number} threshold
     * The threshold in axis values.
     *
     * @return {number}
     * The translated threshold position in terms of pixels, and corrected to
     * stay within the axis bounds.
     */
    getThreshold(threshold: number): number;
    /**
     * Compute auto alignment for the axis label based on which side the axis is
     * on and the given rotation for the label.
     *
     * @private
     * @function Highcharts.Axis#autoLabelAlign
     *
     * @param {number} rotation
     * The rotation in degrees as set by either the `rotation` or `autoRotation`
     * options.
     *
     * @return {Highcharts.AlignValue}
     * Can be `"center"`, `"left"` or `"right"`.
     */
    autoLabelAlign(rotation: number): AlignValue;
    /**
     * Get the tick length and width for the axis based on axis options.
     *
     * @private
     * @function Highcharts.Axis#tickSize
     *
     * @param {string} [prefix]
     * 'tick' or 'minorTick'
     *
     * @return {Array<number,number>|undefined}
     * An array of tickLength and tickWidth
     */
    tickSize(prefix?: string): [number, number] | undefined;
    /**
     * Return the size of the labels.
     *
     * @private
     * @function Highcharts.Axis#labelMetrics
     */
    labelMetrics(): FontMetricsObject;
    /**
     * Prevent the ticks from getting so close we can't draw the labels. On a
     * horizontal axis, this is handled by rotating the labels, removing ticks
     * and adding ellipsis. On a vertical axis remove ticks and add ellipsis.
     *
     * @private
     * @function Highcharts.Axis#unsquish
     */
    unsquish(): number;
    /**
     * Get the general slot width for labels/categories on this axis. This may
     * change between the pre-render (from Axis.getOffset) and the final tick
     * rendering and placement.
     *
     * @private
     * @function Highcharts.Axis#getSlotWidth
     *
     * @param {Highcharts.Tick} [tick] Optionally, calculate the slot width
     * basing on tick label. It is used in highcharts-3d module, where the slots
     * has different widths depending on perspective angles.
     *
     * @return {number}
     * The pixel width allocated to each axis label.
     */
    getSlotWidth(tick?: Tick): number;
    /**
     * Render the axis labels and determine whether ellipsis or rotation need to
     * be applied.
     *
     * @private
     * @function Highcharts.Axis#renderUnsquish
     */
    renderUnsquish(): void;
    /**
     * Return true if the axis has associated data.
     *
     * @function Highcharts.Axis#hasData
     *
     * @return {boolean}
     * True if the axis has associated visible series and those series have
     * either valid data points or explicit `min` and `max` settings.
     */
    hasData(): boolean;
    /**
     * Adds the title defined in axis.options.title.
     *
     * @function Highcharts.Axis#addTitle
     *
     * @param {boolean} [display]
     * Whether or not to display the title.
     */
    addTitle(display?: boolean): void;
    /**
     * Generates a tick for initial positioning.
     *
     * @private
     * @function Highcharts.Axis#generateTick
     *
     * @param {number} pos
     * The tick position in axis values.
     *
     * @param {number} [i]
     * The index of the tick in {@link Axis.tickPositions}.
     */
    generateTick(pos: number): void;
    /**
     * Render the tick labels to a preliminary position to get their sizes
     *
     * @private
     * @function Highcharts.Axis#getOffset
     *
     * @emits Highcharts.Axis#event:afterGetOffset
     */
    getOffset(): void;
    /**
     * Internal function to get the path for the axis line. Extended for polar
     * charts.
     *
     * @function Highcharts.Axis#getLinePath
     *
     * @param {number} lineWidth
     * The line width in pixels.
     *
     * @return {Highcharts.SVGPathArray}
     * The SVG path definition in array form.
     */
    getLinePath(lineWidth: number): SVGPath;
    /**
     * Render the axis line. Called internally when rendering and redrawing the
     * axis.
     *
     * @function Highcharts.Axis#renderLine
     */
    renderLine(): void;
    /**
     * Position the axis title.
     *
     * @private
     * @function Highcharts.Axis#getTitlePosition
     *
     * @return {Highcharts.PositionObject}
     * X and Y positions for the title.
     */
    getTitlePosition(axisTitle: SVGElement): PositionObject;
    /**
     * Render a minor tick into the given position. If a minor tick already
     * exists in this position, move it.
     *
     * @function Highcharts.Axis#renderMinorTick
     *
     * @param {number} pos
     * The position in axis values.
     *
     * @param {boolean} slideIn
     * Whether the tick should animate in from last computed position
     */
    renderMinorTick(pos: number, slideIn?: boolean): void;
    /**
     * Render a major tick into the given position. If a tick already exists
     * in this position, move it.
     *
     * @function Highcharts.Axis#renderTick
     *
     * @param {number} pos
     * The position in axis values.
     *
     * @param {number} i
     * The tick index.
     *
     * @param {boolean} slideIn
     * Whether the tick should animate in from last computed position
     */
    renderTick(pos: number, i: number, slideIn?: boolean): void;
    /**
     * Render the axis.
     *
     * @private
     * @function Highcharts.Axis#render
     *
     * @emits Highcharts.Axis#event:afterRender
     */
    render(): void;
    /**
     * Redraw the axis to reflect changes in the data or axis extremes. Called
     * internally from Highcharts.Chart#redraw.
     *
     * @private
     * @function Highcharts.Axis#redraw
     */
    redraw(): void;
    /**
     * Returns an array of axis properties, that should be untouched during
     * reinitialization.
     *
     * @private
     * @function Highcharts.Axis#getKeepProps
     */
    getKeepProps(): Array<string>;
    /**
     * Destroys an Axis instance. See {@link Axis#remove} for the API endpoint
     * to fully remove the axis.
     *
     * @private
     * @function Highcharts.Axis#destroy
     *
     * @param {boolean} [keepEvents]
     * Whether to preserve events, used internally in Axis.update.
     */
    destroy(keepEvents?: boolean): void;
    /**
     * Internal function to draw a crosshair.
     *
     * @function Highcharts.Axis#drawCrosshair
     *
     * @param {Highcharts.PointerEventObject} [e]
     * The event arguments from the modified pointer event, extended with
     * `chartX` and `chartY`
     *
     * @param {Highcharts.Point} [point]
     * The Point object if the crosshair snaps to points.
     *
     * @emits Highcharts.Axis#event:afterDrawCrosshair
     * @emits Highcharts.Axis#event:drawCrosshair
     */
    drawCrosshair(e?: PointerEvent, point?: Point): void;
    /**
     * Hide the crosshair if visible.
     *
     * @function Highcharts.Axis#hideCrosshair
     */
    hideCrosshair(): void;
    /**
     * Check whether the chart has vertical panning ('y' or 'xy' type).
     *
     * @private
     * @function Highcharts.Axis#hasVerticalPanning
     */
    hasVerticalPanning(): boolean;
    /**
     * Update an axis object with a new set of options. The options are merged
     * with the existing options, so only new or altered options need to be
     * specified.
     *
     * @sample highcharts/members/axis-update/
     *         Axis update demo
     *
     * @function Highcharts.Axis#update
     *
     * @param {Highcharts.AxisOptions} options
     * The new options that will be merged in with existing options on the axis.
     *
     * @param {boolean} [redraw=true]
     * Whether to redraw the chart after the axis is altered. If doing more
     * operations on the chart, it is a good idea to set redraw to false and
     * call {@link Chart#redraw} after.
     */
    update(options: DeepPartial<AxisTypeOptions>, redraw?: boolean): void;
    /**
     * Remove the axis from the chart.
     *
     * @sample highcharts/members/chart-addaxis/
     *         Add and remove axes
     *
     * @function Highcharts.Axis#remove
     *
     * @param {boolean} [redraw=true]
     * Whether to redraw the chart following the remove.
     */
    remove(redraw?: boolean): void;
    /**
     * Update the axis title by options after render time.
     *
     * @sample highcharts/members/axis-settitle/
     *         Set a new Y axis title
     *
     * @function Highcharts.Axis#setTitle
     *
     * @param {Highcharts.AxisTitleOptions} titleOptions
     * The additional title options.
     *
     * @param {boolean} [redraw=true]
     * Whether to redraw the chart after setting the title.
     */
    setTitle(titleOptions: AxisTitleOptions, redraw?: boolean): void;
    /**
     * Set new axis categories and optionally redraw.
     *
     * @sample highcharts/members/axis-setcategories/
     *         Set categories by click on a button
     *
     * @function Highcharts.Axis#setCategories
     *
     * @param {Array<string>} categories
     * The new categories.
     *
     * @param {boolean} [redraw=true]
     * Whether to redraw the chart.
     */
    setCategories(categories: Array<string>, redraw?: boolean): void;
}
interface Axis extends AxisComposition, AxisLike {
}
declare namespace Axis {
    interface ExtremesObject {
        dataMax: number;
        dataMin: number;
        max: number;
        min: number;
        userMax?: number;
        userMin?: number;
    }
    interface PanningState {
        startMin: number;
        startMax: number;
        isDirty?: boolean;
    }
    interface PlotLinePathOptions {
        acrossPanes?: boolean;
        force?: (boolean | string);
        lineWidth?: number;
        old?: boolean;
        reverse?: boolean;
        translatedValue?: number;
        value?: number;
    }
}
export default Axis;
