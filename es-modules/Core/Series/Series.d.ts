import type AnimationOptions from '../Animation/AnimationOptions';
import type AxisType from '../Axis/AxisType';
import type BBoxObject from '../Renderer/BBoxObject';
import type Chart from '../Chart/Chart';
import type ColorType from '../Color/ColorType';
import type DataExtremesObject from './DataExtremesObject';
import type { EventCallback } from '../Callback';
import type PointerEvent from '../PointerEvent';
import type { PointOptions, PointShortOptions } from './PointOptions';
import type RangeSelector from '../../Stock/RangeSelector/RangeSelector';
import type SeriesLike from './SeriesLike';
import type { SeriesOptions, SeriesZonesOptions } from './SeriesOptions';
import type { SeriesTypeOptions } from './SeriesType';
import type { StatesOptionsKey } from './StatesOptions';
import type SVGAttributes from '../Renderer/SVG/SVGAttributes';
import type SVGPath from '../Renderer/SVG/SVGPath';
import type { SymbolKey } from '../Renderer/SVG/SymbolType';
import type TooltipOptions from '../TooltipOptions';
import type Legend from '../Legend/Legend';
import Point from './Point.js';
import SeriesRegistry from './SeriesRegistry.js';
import SVGElement from '../Renderer/SVG/SVGElement.js';
import U from '../Utilities.js';
declare module '../Chart/ChartLike' {
    interface ChartLike {
        runTrackerClick?: boolean;
    }
}
declare module '../Renderer/SVG/SVGElementLike' {
    interface SVGElementLike {
        survive?: boolean;
    }
}
declare module './PointLike' {
    interface PointLike {
        plotX?: number;
        plotY?: number;
    }
}
declare module './SeriesLike' {
    interface SeriesLike {
        _hasPointMarkers?: boolean;
        invertible?: boolean;
        pointArrayMap?: Array<string>;
        pointValKey?: string;
        toYData?(point: Point): Array<number>;
    }
}
interface KDNode {
    [side: string]: (KDNode | Point | undefined);
    left?: KDNode;
    point: Point;
    right?: KDNode;
}
interface KDPointSearchObject {
    clientX: number;
    plotY?: number;
}
/**
 * This is the base series prototype that all other series types inherit from.
 * A new series is initialized either through the
 * [series](https://api.highcharts.com/highcharts/series)
 * option structure, or after the chart is initialized, through
 * {@link Highcharts.Chart#addSeries}.
 *
 * The object can be accessed in a number of ways. All series and point event
 * handlers give a reference to the `series` object. The chart object has a
 * {@link Highcharts.Chart#series|series} property that is a collection of all
 * the chart's series. The point objects and axis objects also have the same
 * reference.
 *
 * Another way to reference the series programmatically is by `id`. Add an id
 * in the series configuration options, and get the series object by
 * {@link Highcharts.Chart#get}.
 *
 * Configuration options for the series are given in three levels. Options for
 * all series in a chart are given in the
 * [plotOptions.series](https://api.highcharts.com/highcharts/plotOptions.series)
 * object. Then options for all series of a specific type
 * are given in the plotOptions of that type, for example `plotOptions.line`.
 * Next, options for one single series are given in the series array, or as
 * arguments to `chart.addSeries`.
 *
 * The data in the series is stored in various arrays.
 *
 * - First, `series.options.data` contains all the original config options for
 *   each point whether added by options or methods like `series.addPoint`.
 *
 * - Next, `series.data` contains those values converted to points, but in case
 *   the series data length exceeds the `cropThreshold`, or if the data is
 *   grouped, `series.data` doesn't contain all the points. It only contains the
 *   points that have been created on demand.
 *
 * - Then there's `series.points` that contains all currently visible point
 *   objects. In case of cropping, the cropped-away points are not part of this
 *   array. The `series.points` array starts at `series.cropStart` compared to
 *   `series.data` and `series.options.data`. If however the series data is
 *   grouped, these can't be correlated one to one.
 *
 * - `series.xData` and `series.processedXData` contain clean x values,
 *   equivalent to `series.data` and `series.points`.
 *
 * - `series.yData` and `series.processedYData` contain clean y values,
 *   equivalent to `series.data` and `series.points`.
 *
 * @class
 * @name Highcharts.Series
 *
 * @param {Highcharts.Chart} chart
 * The chart instance.
 *
 * @param {Highcharts.SeriesOptionsType|object} options
 * The series options.
 */
declare class Series {
    static readonly defaultOptions: import("./SeriesOptions").PlotOptionsOf<Series>;
    /**
     * Registry of all available series types.
     *
     * @name Highcharts.Series.types
     * @type {Highcharts.Dictionary<typeof_Highcharts.Series>}
     */
    static readonly types: import("./SeriesType").SeriesTypeRegistry;
    /**
     * Registers a series class to be accessible via `Series.types`.
     *
     * @function Highcharts.Series.registerType
     *
     * @param {string} seriesType
     * The series type as an identifier string in lower case.
     *
     * @param {Function} SeriesClass
     * The series class as a class pattern or a constructor function with
     * prototype.
     */
    static readonly registerType: typeof SeriesRegistry.registerSeriesType;
    _hasTracking?: boolean;
    _i: number;
    animationTimeout?: number;
    area?: SVGElement;
    basePointRange?: number;
    buildingKdTree?: boolean;
    chart: Chart;
    clips?: Array<SVGElement>;
    closestPointRange?: number;
    closestPointRangePx?: number;
    color?: (ColorType);
    colorIndex?: number;
    cropped?: boolean;
    data: Array<Point>;
    dataMax?: number;
    dataMin?: number;
    enabledDataSorting?: boolean;
    fillColor?: ColorType;
    finishedAnimating?: boolean;
    getExtremesFromAll?: boolean;
    graph?: SVGElement;
    graphPath?: SVGPath;
    group?: SVGElement;
    eventOptions: Record<string, EventCallback<Series, Event>>;
    eventsToUnbind: Array<Function>;
    halo?: SVGElement;
    hasCartesianSeries?: Chart['hasCartesianSeries'];
    hasRendered?: boolean;
    id?: string;
    index: number;
    initialType?: string;
    isDirty?: boolean;
    isDirtyData?: boolean;
    isRadialSeries?: boolean;
    kdTree?: KDNode;
    linkedParent?: Series;
    linkedSeries: Array<Series>;
    options: SeriesOptions;
    markerGroup?: SVGElement;
    opacity?: number;
    optionalAxis?: string;
    pointInterval?: number;
    points: Array<Point>;
    pointValKey?: string;
    processedXData: Array<number>;
    processedYData: (Array<(number | null)> | Array<Array<(number | null)>>);
    selected?: boolean;
    sharedClipKey?: string;
    stateMarkerGraphic?: SVGElement;
    stickyTracking?: boolean;
    symbol?: SymbolKey;
    symbolIndex?: number;
    tooltipOptions: TooltipOptions;
    tracker?: SVGElement;
    trackerGroups?: Array<string>;
    userOptions: DeepPartial<SeriesTypeOptions>;
    xAxis: AxisType;
    xData?: Array<number>;
    xIncrement?: (number | null);
    yAxis: AxisType;
    yData?: (Array<(number | null)> | Array<Array<(number | null)>>);
    zoneAxis?: string;
    zones: Array<SeriesZonesOptions>;
    init(chart: Chart, userOptions: DeepPartial<SeriesTypeOptions>): void;
    /**
     * Check whether the series item is itself or inherits from a certain
     * series type.
     *
     * @function Highcharts.Series#is
     * @param {string} type The type of series to check for, can be either
     *        featured or custom series types. For example `column`, `pie`,
     *        `ohlc` etc.
     *
     * @return {boolean}
     *        True if this item is or inherits from the given type.
     */
    is(type: string): boolean;
    /**
     * Set the xAxis and yAxis properties of cartesian series, and register
     * the series in the `axis.series` array.
     *
     * @private
     * @function Highcharts.Series#bindAxes
     */
    bindAxes(): void;
    /**
     * For simple series types like line and column, the data values are
     * held in arrays like xData and yData for quick lookup to find extremes
     * and more. For multidimensional series like bubble and map, this can
     * be extended with arrays like zData and valueData by adding to the
     * `series.parallelArrays` array.
     *
     * @private
     * @function Highcharts.Series#updateParallelArrays
     */
    updateParallelArrays(point: Point, i: (number | string), iArgs?: Array<any>): void;
    /**
     * Define hasData functions for series. These return true if there
     * are data points on this series within the plot area.
     *
     * @private
     * @function Highcharts.Series#hasData
     */
    hasData(): boolean;
    /**
     * Return an auto incremented x value based on the pointStart and
     * pointInterval options. This is only used if an x value is not given
     * for the point that calls autoIncrement.
     *
     * @private
     * @function Highcharts.Series#autoIncrement
     */
    autoIncrement(x?: number): number;
    /**
     * Internal function to set properties for series if data sorting is
     * enabled.
     *
     * @private
     * @function Highcharts.Series#setDataSortingOptions
     */
    setDataSortingOptions(): void;
    /**
     * Set the series options by merging from the options tree. Called
     * internally on initializing and updating series. This function will
     * not redraw the series. For API usage, use {@link Series#update}.
     * @private
     * @function Highcharts.Series#setOptions
     * @param {Highcharts.SeriesOptionsType} itemOptions
     * The series options.
     * @emits Highcharts.Series#event:afterSetOptions
     */
    setOptions(itemOptions: DeepPartial<SeriesTypeOptions>): this['options'];
    /**
     * Return series name in "Series {Number}" format or the one defined by
     * a user. This method can be simply overridden as series name format
     * can vary (e.g. technical indicators).
     *
     * @function Highcharts.Series#getName
     *
     * @return {string}
     * The series name.
     */
    getName(): string;
    /**
     * @private
     * @function Highcharts.Series#getCyclic
     */
    getCyclic(prop: 'color' | 'symbol', value?: any, defaults?: AnyRecord): void;
    /**
     * Get the series' color based on either the options or pulled from
     * global options.
     *
     * @private
     * @function Highcharts.Series#getColor
     */
    getColor(): void;
    /**
     * Get all points' instances created for this series.
     *
     * @private
     * @function Highcharts.Series#getPointsCollection
     */
    getPointsCollection(): Array<Point>;
    /**
     * Get the series' symbol based on either the options or pulled from
     * global options.
     *
     * @private
     * @function Highcharts.Series#getSymbol
     */
    getSymbol(): void;
    /**
     * Finds the index of an existing point that matches the given point
     * options.
     *
     * @private
     * @function Highcharts.Series#findPointIndex
     * @param {Highcharts.PointOptionsObject} optionsObject
     * The options of the point.
     * @param {number} fromIndex
     * The index to start searching from, used for optimizing series with
     * required sorting.
     * @return {number|undefined}
     * Returns the index of a matching point, or undefined if no match is found.
     */
    findPointIndex(optionsObject: PointOptions, fromIndex: number): (number | undefined);
    /**
     * Internal function called from setData. If the point count is the same
     * as it was, or if there are overlapping X values, just run
     * Point.update which is cheaper, allows animation, and keeps references
     * to points. This also allows adding or removing points if the X-es
     * don't match.
     *
     * @private
     * @function Highcharts.Series#updateData
     */
    updateData(data: Array<(PointOptions | PointShortOptions)>, animation?: (boolean | Partial<AnimationOptions>)): boolean;
    /**
     * Apply a new set of data to the series and optionally redraw it. The
     * new data array is passed by reference (except in case of
     * `updatePoints`), and may later be mutated when updating the chart
     * data.
     *
     * Note the difference in behaviour when setting the same amount of
     * points, or a different amount of points, as handled by the
     * `updatePoints` parameter.
     *
     * @sample highcharts/members/series-setdata/
     *         Set new data from a button
     * @sample highcharts/members/series-setdata-pie/
     *         Set data in a pie
     * @sample stock/members/series-setdata/
     *         Set new data in Highcharts Stock
     * @sample maps/members/series-setdata/
     *         Set new data in Highmaps
     *
     * @function Highcharts.Series#setData
     *
     * @param {Array<Highcharts.PointOptionsType>} data
     *        Takes an array of data in the same format as described under
     *        `series.{type}.data` for the given series type, for example a
     *        line series would take data in the form described under
     *        [series.line.data](https://api.highcharts.com/highcharts/series.line.data).
     *
     * @param {boolean} [redraw=true]
     *        Whether to redraw the chart after the series is altered. If
     *        doing more operations on the chart, it is a good idea to set
     *        redraw to false and call {@link Chart#redraw} after.
     *
     * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
     *        When the updated data is the same length as the existing data,
     *        points will be updated by default, and animation visualizes
     *        how the points are changed. Set false to disable animation, or
     *        a configuration object to set duration or easing.
     *
     * @param {boolean} [updatePoints=true]
     *        When this is true, points will be updated instead of replaced
     *        whenever possible. This occurs a) when the updated data is the
     *        same length as the existing data, b) when points are matched
     *        by their id's, or c) when points can be matched by X values.
     *        This allows updating with animation and performs better. In
     *        this case, the original array is not passed by reference. Set
     *        `false` to prevent.
     */
    setData(data: Array<(PointOptions | PointShortOptions)>, redraw?: boolean, animation?: (boolean | Partial<AnimationOptions>), updatePoints?: boolean): void;
    /**
     * Internal function to sort series data
     *
     * @private
     * @function Highcharts.Series#sortData
     * @param {Array<Highcharts.PointOptionsType>} data
     * Force data grouping.
     */
    sortData(data: Array<(PointOptions | PointShortOptions)>): Array<PointOptions>;
    /**
     * Internal function to process the data by cropping away unused data
     * points if the series is longer than the crop threshold. This saves
     * computing time for large series.
     *
     * @private
     * @function Highcharts.Series#getProcessedData
     * @param {boolean} [forceExtremesFromAll]
     * Force getting extremes of a total series data range.
     */
    getProcessedData(forceExtremesFromAll?: boolean): Series.ProcessedDataObject;
    /**
     * Internal function to apply processed data.
     * In Highcharts Stock, this function is extended to provide data grouping.
     *
     * @private
     * @function Highcharts.Series#processData
     * @param {boolean} [force]
     * Force data grouping.
     */
    processData(force?: boolean): (boolean | undefined);
    /**
     * Iterate over xData and crop values between min and max. Returns
     * object containing crop start/end cropped xData with corresponding
     * part of yData, dataMin and dataMax within the cropped range.
     *
     * @private
     * @function Highcharts.Series#cropData
     */
    cropData(xData: Array<number>, yData: (Array<(number | null)> | Array<Array<(number | null)>>), min: number, max: number, cropShoulder?: number): Series.CropDataObject;
    /**
     * Generate the data point after the data has been processed by cropping
     * away unused points and optionally grouped in Highcharts Stock.
     *
     * @private
     * @function Highcharts.Series#generatePoints
     */
    generatePoints(): void;
    /**
     * Get current X extremes for the visible data.
     *
     * @private
     * @function Highcharts.Series#getXExtremes
     * @param {Array<number>} xData
     * The data to inspect. Defaults to the current data within the visible
     * range.
     */
    getXExtremes(xData: Array<number>): RangeSelector.RangeObject;
    /**
     * Calculate Y extremes for the visible data. The result is returned
     * as an object with `dataMin` and `dataMax` properties.
     *
     * @private
     * @function Highcharts.Series#getExtremes
     * @param {Array<number>} [yData]
     * The data to inspect. Defaults to the current data within the visible
     * range.
     * @param {boolean} [forceExtremesFromAll]
     * Force getting extremes of a total series data range.
     */
    getExtremes(yData?: (Array<(number | null)> | Array<Array<(number | null)>>), forceExtremesFromAll?: boolean): DataExtremesObject;
    /**
     * Set the current data extremes as `dataMin` and `dataMax` on the
     * Series item. Use this only when the series properties should be
     * updated.
     *
     * @private
     * @function Highcharts.Series#applyExtremes
     */
    applyExtremes(): DataExtremesObject;
    /**
     * Find and return the first non null point in the data
     *
     * @private
     * @function Highcharts.Series.getFirstValidPoint
     * @param {Array<Highcharts.PointOptionsType>} data
     * Array of options for points
     */
    getFirstValidPoint(data: Array<(PointOptions | PointShortOptions)>): (PointOptions | PointShortOptions);
    /**
     * Translate data points from raw data values to chart specific
     * positioning data needed later in the `drawPoints` and `drawGraph`
     * functions. This function can be overridden in plugins and custom
     * series type implementations.
     *
     * @function Highcharts.Series#translate
     *
     * @emits Highcharts.Series#events:translate
     */
    translate(): void;
    /**
     * Return the series points with null points filtered out.
     *
     * @function Highcharts.Series#getValidPoints
     *
     * @param {Array<Highcharts.Point>} [points]
     * The points to inspect, defaults to {@link Series.points}.
     *
     * @param {boolean} [insideOnly=false]
     * Whether to inspect only the points that are inside the visible view.
     *
     * @param {boolean} [allowNull=false]
     * Whether to allow null points to pass as valid points.
     *
     * @return {Array<Highcharts.Point>}
     * The valid points.
     */
    getValidPoints(points?: Array<Point>, insideOnly?: boolean, allowNull?: boolean): Array<Point>;
    /**
     * Get the clipping for the series. Could be called for a series to
     * initiate animating the clip or to set the final clip (only width
     * and x).
     *
     * @private
     * @function Highcharts.Series#getClip
     */
    getClipBox(): BBoxObject;
    /**
     * Get the shared clip key, creating it if it doesn't exist.
     *
     * @private
     * @function Highcharts.Series#getSharedClipKey
     */
    getSharedClipKey(): string;
    /**
     * Set the clipping for the series. For animated series the clip is later
     * modified.
     *
     * @private
     * @function Highcharts.Series#setClip
     */
    setClip(): void;
    /**
     * Animate in the series. Called internally twice. First with the `init`
     * parameter set to true, which sets up the initial state of the
     * animation. Then when ready, it is called with the `init` parameter
     * undefined, in order to perform the actual animation.
     *
     * @function Highcharts.Series#animate
     *
     * @param {boolean} [init]
     * Initialize the animation.
     */
    animate(init?: boolean): void;
    /**
     * This runs after animation to land on the final plot clipping.
     *
     * @private
     * @function Highcharts.Series#afterAnimate
     *
     * @emits Highcharts.Series#event:afterAnimate
     */
    afterAnimate(): void;
    /**
     * Draw the markers for line-like series types, and columns or other
     * graphical representation for {@link Point} objects for other series
     * types. The resulting element is typically stored as
     * {@link Point.graphic}, and is created on the first call and updated
     * and moved on subsequent calls.
     *
     * @function Highcharts.Series#drawPoints
     */
    drawPoints(points?: Array<Point>): void;
    /**
     * Get non-presentational attributes for a point. Used internally for
     * both styled mode and classic. Can be overridden for different series
     * types.
     *
     * @see Series#pointAttribs
     *
     * @function Highcharts.Series#markerAttribs
     *
     * @param {Highcharts.Point} point
     * The Point to inspect.
     *
     * @param {string} [state]
     * The state, can be either `hover`, `select` or undefined.
     *
     * @return {Highcharts.SVGAttributes}
     * A hash containing those attributes that are not settable from CSS.
     */
    markerAttribs(point: Point, state?: StatesOptionsKey): SVGAttributes;
    /**
     * Internal function to get presentational attributes for each point.
     * Unlike {@link Series#markerAttribs}, this function should return
     * those attributes that can also be set in CSS. In styled mode,
     * `pointAttribs` won't be called.
     *
     * @private
     * @function Highcharts.Series#pointAttribs
     *
     * @param {Highcharts.Point} [point]
     * The point instance to inspect.
     *
     * @param {string} [state]
     * The point state, can be either `hover`, `select` or 'normal'. If
     * undefined, normal state is assumed.
     *
     * @return {Highcharts.SVGAttributes}
     * The presentational attributes to be set on the point.
     */
    pointAttribs(point?: Point, state?: StatesOptionsKey): SVGAttributes;
    /**
     * Clear DOM objects and free up memory.
     *
     * @private
     * @function Highcharts.Series#destroy
     *
     * @emits Highcharts.Series#event:destroy
     */
    destroy(keepEventsForUpdate?: boolean): void;
    /**
     * Clip the graphs into zones for colors and styling.
     *
     * @private
     * @function Highcharts.Series#applyZones
     */
    applyZones(): void;
    /**
     * General abstraction for creating plot groups like series.group,
     * series.dataLabelsGroup and series.markerGroup. On subsequent calls,
     * the group will only be adjusted to the updated plot size.
     *
     * @private
     * @function Highcharts.Series#plotGroup
     */
    plotGroup(prop: string, name: string, visibility: 'hidden' | 'inherit' | 'visible', zIndex?: number, parent?: SVGElement): SVGElement;
    /**
     * Get the translation and scale for the plot area of this series.
     *
     * @function Highcharts.Series#getPlotBox
     */
    getPlotBox(name?: string): Series.PlotBoxTransform;
    /**
     * Removes the event handlers attached previously with addEvents.
     * @private
     * @function Highcharts.Series#removeEvents
     */
    removeEvents(keepEventsForUpdate?: boolean): void;
    /**
     * Render the graph and markers. Called internally when first rendering
     * and later when redrawing the chart. This function can be extended in
     * plugins, but normally shouldn't be called directly.
     *
     * @function Highcharts.Series#render
     *
     * @emits Highcharts.Series#event:afterRender
     */
    render(): void;
    /**
     * Redraw the series. This function is called internally from
     * `chart.redraw` and normally shouldn't be called directly.
     * @private
     * @function Highcharts.Series#redraw
     */
    redraw(): void;
    /**
     * Find the nearest point from a pointer event. This applies to series that
     * use k-d-trees to get the nearest point. Native pointer events must be
     * normalized using `Pointer.normalize`, that adds `chartX` and `chartY`
     * properties.
     *
     * @sample highcharts/demo/synchronized-charts
     *         Synchronized charts with tooltips
     *
     * @function Highcharts.Series#searchPoint
     *
     * @param {Highcharts.PointerEvent} e
     *        The normalized pointer event
     * @param {boolean} [compareX=false]
     *        Search only by the X value, not Y
     *
     * @return {Point|undefined}
     *        The closest point to the pointer event
     */
    searchPoint(e: PointerEvent, compareX?: boolean): (Point | undefined);
    /**
     * Build the k-d-tree that is used by mouse and touch interaction to get
     * the closest point. Line-like series typically have a one-dimensional
     * tree where points are searched along the X axis, while scatter-like
     * series typically search in two dimensions, X and Y.
     *
     * @private
     * @function Highcharts.Series#buildKDTree
     */
    buildKDTree(e?: PointerEvent): void;
    /**
     * @private
     * @function Highcharts.Series#searchKDTree
     */
    searchKDTree(point: KDPointSearchObject, compareX?: boolean, e?: PointerEvent): (Point | undefined);
    /**
     * @private
     * @function Highcharts.Series#pointPlacementToXValue
     */
    pointPlacementToXValue(): number;
    /**
     * @private
     * @function Highcharts.Series#isPointInside
     */
    isPointInside(point: (Record<string, number> | Point)): boolean;
    /**
     * Draw the tracker object that sits above all data labels and markers to
     * track mouse events on the graph or points. For the line type charts
     * the tracker uses the same graphPath, but with a greater stroke width
     * for better control.
     * @private
     */
    drawTracker(): void;
    /**
     * Add a point to the series after render time. The point can be added at
     * the end, or by giving it an X value, to the start or in the middle of the
     * series.
     *
     * @sample highcharts/members/series-addpoint-append/
     *         Append point
     * @sample highcharts/members/series-addpoint-append-and-shift/
     *         Append and shift
     * @sample highcharts/members/series-addpoint-x-and-y/
     *         Both X and Y values given
     * @sample highcharts/members/series-addpoint-pie/
     *         Append pie slice
     * @sample stock/members/series-addpoint/
     *         Append 100 points in Highcharts Stock
     * @sample stock/members/series-addpoint-shift/
     *         Append and shift in Highcharts Stock
     * @sample maps/members/series-addpoint/
     *         Add a point in Highmaps
     *
     * @function Highcharts.Series#addPoint
     *
     * @param {Highcharts.PointOptionsType} options
     *        The point options. If options is a single number, a point with
     *        that y value is appended to the series. If it is an array, it will
     *        be interpreted as x and y values respectively. If it is an
     *        object, advanced options as outlined under `series.data` are
     *        applied.
     *
     * @param {boolean} [redraw=true]
     *        Whether to redraw the chart after the point is added. When adding
     *        more than one point, it is highly recommended that the redraw
     *        option be set to false, and instead {@link Chart#redraw} is
     *        explicitly called after the adding of points is finished.
     *        Otherwise, the chart will redraw after adding each point.
     *
     * @param {boolean} [shift=false]
     *        If true, a point is shifted off the start of the series as one is
     *        appended to the end.
     *
     * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
     *        Whether to apply animation, and optionally animation
     *        configuration.
     *
     * @param {boolean} [withEvent=true]
     *        Used internally, whether to fire the series `addPoint` event.
     *
     * @emits Highcharts.Series#event:addPoint
     */
    addPoint(options: (PointOptions | PointShortOptions), redraw?: boolean, shift?: boolean, animation?: (boolean | Partial<AnimationOptions>), withEvent?: boolean): void;
    /**
     * Remove a point from the series. Unlike the
     * {@link Highcharts.Point#remove} method, this can also be done on a point
     * that is not instanciated because it is outside the view or subject to
     * Highcharts Stock data grouping.
     *
     * @sample highcharts/members/series-removepoint/
     *         Remove cropped point
     *
     * @function Highcharts.Series#removePoint
     *
     * @param {number} i
     *        The index of the point in the {@link Highcharts.Series.data|data}
     *        array.
     *
     * @param {boolean} [redraw=true]
     *        Whether to redraw the chart after the point is added. When
     *        removing more than one point, it is highly recommended that the
     *        `redraw` option be set to `false`, and instead {@link
     *        Highcharts.Chart#redraw} is explicitly called after the adding of
     *        points is finished.
     *
     * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
     *        Whether and optionally how the series should be animated.
     *
     * @emits Highcharts.Point#event:remove
     */
    removePoint(i: number, redraw?: boolean, animation?: (boolean | Partial<AnimationOptions>)): void;
    /**
     * Remove a series and optionally redraw the chart.
     *
     * @sample highcharts/members/series-remove/
     *         Remove first series from a button
     *
     * @function Highcharts.Series#remove
     *
     * @param {boolean} [redraw=true]
     *        Whether to redraw the chart or wait for an explicit call to
     *        {@link Highcharts.Chart#redraw}.
     *
     * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
     *        Whether to apply animation, and optionally animation
     *        configuration.
     *
     * @param {boolean} [withEvent=true]
     *        Used internally, whether to fire the series `remove` event.
     *
     * @emits Highcharts.Series#event:remove
     */
    remove(redraw?: boolean, animation?: (boolean | Partial<AnimationOptions>), withEvent?: boolean, keepEvents?: boolean): void;
    /**
     * Update the series with a new set of options. For a clean and precise
     * handling of new options, all methods and elements from the series are
     * removed, and it is initialized from scratch. Therefore, this method is
     * more performance expensive than some other utility methods like {@link
     * Series#setData} or {@link Series#setVisible}.
     *
     * Note that `Series.update` may mutate the passed `data` options.
     *
     * @sample highcharts/members/series-update/
     *         Updating series options
     * @sample maps/members/series-update/
     *         Update series options in Highmaps
     *
     * @function Highcharts.Series#update
     *
     * @param {Highcharts.SeriesOptionsType} options
     *        New options that will be merged with the series' existing options.
     *
     * @param {boolean} [redraw=true]
     *        Whether to redraw the chart after the series is altered. If doing
     *        more operations on the chart, it is a good idea to set redraw to
     *        false and call {@link Chart#redraw} after.
     *
     * @emits Highcharts.Series#event:update
     * @emits Highcharts.Series#event:afterUpdate
     */
    update(options: DeepPartial<SeriesTypeOptions>, redraw?: boolean): void;
    /**
     * Used from within series.update
     * @private
     */
    setName(name: string): void;
    /**
     * Check if the option has changed.
     * @private
     */
    hasOptionChanged(optionName: string): boolean;
    /**
     * Runs on mouse over the series graphical items.
     *
     * @function Highcharts.Series#onMouseOver
     * @emits Highcharts.Series#event:mouseOver
     */
    onMouseOver(): void;
    /**
     * Runs on mouse out of the series graphical items.
     *
     * @function Highcharts.Series#onMouseOut
     *
     * @emits Highcharts.Series#event:mouseOut
     */
    onMouseOut(): void;
    /**
     * Set the state of the series. Called internally on mouse interaction
     * operations, but it can also be called directly to visually
     * highlight a series.
     *
     * @function Highcharts.Series#setState
     *
     * @param {Highcharts.SeriesStateValue|""} [state]
     *        The new state, can be either `'hover'`, `'inactive'`, `'select'`,
     *        or `''` (an empty string), `'normal'` or `undefined` to set to
     *        normal state.
     * @param {boolean} [inherit]
     *        Determines if state should be inherited by points too.
     */
    setState(state?: (StatesOptionsKey | ''), inherit?: boolean): void;
    /**
     * Set the state for all points in the series.
     *
     * @function Highcharts.Series#setAllPointsToState
     *
     * @private
     *
     * @param {string} [state]
     *        Can be either `hover` or undefined to set to normal state.
     */
    setAllPointsToState(state?: StatesOptionsKey): void;
    /**
     * Show or hide the series.
     *
     * @function Highcharts.Series#setVisible
     *
     * @param {boolean} [visible]
     * True to show the series, false to hide. If undefined, the visibility is
     * toggled.
     *
     * @param {boolean} [redraw=true]
     * Whether to redraw the chart after the series is altered. If doing more
     * operations on the chart, it is a good idea to set redraw to false and
     * call {@link Chart#redraw|chart.redraw()} after.
     *
     * @emits Highcharts.Series#event:hide
     * @emits Highcharts.Series#event:show
     */
    setVisible(vis?: boolean, redraw?: boolean): void;
    /**
     * Show the series if hidden.
     *
     * @sample highcharts/members/series-hide/
     *         Toggle visibility from a button
     *
     * @function Highcharts.Series#show
     * @emits Highcharts.Series#event:show
     */
    show(): void;
    /**
     * Hide the series if visible. If the
     * [chart.ignoreHiddenSeries](https://api.highcharts.com/highcharts/chart.ignoreHiddenSeries)
     * option is true, the chart is redrawn without this series.
     *
     * @sample highcharts/members/series-hide/
     *         Toggle visibility from a button
     *
     * @function Highcharts.Series#hide
     * @emits Highcharts.Series#event:hide
     */
    hide(): void;
    /**
     * Select or unselect the series. This means its
     * {@link Highcharts.Series.selected|selected}
     * property is set, the checkbox in the legend is toggled and when selected,
     * the series is returned by the {@link Highcharts.Chart#getSelectedSeries}
     * function.
     *
     * @sample highcharts/members/series-select/
     *         Select a series from a button
     *
     * @function Highcharts.Series#select
     *
     * @param {boolean} [selected]
     * True to select the series, false to unselect. If undefined, the selection
     * state is toggled.
     *
     * @emits Highcharts.Series#event:select
     * @emits Highcharts.Series#event:unselect
     */
    select(selected?: boolean): void;
    /**
     * Checks if a tooltip should be shown for a given point.
     *
     * @private
     */
    shouldShowTooltip(plotX: number, plotY: number, options?: Chart.IsInsideOptionsObject): boolean;
    /**
     * Draws the legend symbol based on the legendSymbol user option.
     *
     * @private
     */
    drawLegendSymbol(legend: Legend, item: Legend.Item): void;
}
interface Series extends SeriesLike {
    axisTypes: Array<string>;
    coll: 'series';
    colorCounter: number;
    cropShoulder: number;
    directTouch: boolean;
    hcEvents?: Record<string, Array<U.EventWrapperObject<Series>>>;
    isCartesian: boolean;
    kdAxisArray: Array<string>;
    parallelArrays: Array<string>;
    pointClass: typeof Point;
    requireSorting: boolean;
    sorted: boolean;
}
declare namespace Series {
    interface CropDataObject {
        end: number;
        start: number;
        xData: Array<number>;
        yData: (Array<(number | null)> | Array<Array<(number | null)>>);
    }
    interface PlotBoxTransform extends SVGAttributes {
        scaleX: number;
        scaleY: number;
        translateX: number;
        translateY: number;
    }
    interface ProcessedDataObject {
        xData: Array<number>;
        yData: (Array<(number | null)> | Array<Array<(number | null)>>);
        cropped: (boolean | undefined);
        cropStart: number;
        closestPointRange: (number | undefined);
    }
}
export default Series;
