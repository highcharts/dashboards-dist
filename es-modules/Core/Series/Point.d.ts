import type AnimationOptions from '../Animation/AnimationOptions';
import type ColorType from '../Color/ColorType';
import type { EventCallback } from '../Callback';
import type PointLike from './PointLike';
import type { PointEventsOptions, PointMarkerOptions, PointOptions, PointShortOptions } from './PointOptions';
import type { PointTypeOptions } from './PointType';
import type Series from './Series';
import type { SeriesZonesOptions } from './SeriesOptions';
import type { StatesOptionsKey } from './StatesOptions';
import type SVGAttributes from '../Renderer/SVG/SVGAttributes';
import type SVGElement from '../Renderer/SVG/SVGElement';
import type SVGLabel from '../Renderer/SVG/SVGLabel';
import type SVGPath from '../Renderer/SVG/SVGPath';
declare module './PointLike' {
    interface PointLike {
        className?: string;
        events?: PointEventsOptions;
        hasImportedEvents?: boolean;
        selected?: boolean;
        selectedStaging?: boolean;
        state?: string;
        haloPath(size: number): SVGPath;
        importEvents(): void;
        onMouseOut(): void;
        onMouseOver(e?: PointerEvent): void;
        select(selected?: boolean | null, accumulate?: boolean): void;
        setState(state?: (StatesOptionsKey | ''), move?: boolean): void;
    }
}
/**
 * The Point object. The point objects are generated from the `series.data`
 * configuration objects or raw numbers. They can be accessed from the
 * `Series.points` array. Other ways to instantiate points are through {@link
 * Highcharts.Series#addPoint} or {@link Highcharts.Series#setData}.
 *
 * @class
 * @name Highcharts.Point
 */
declare class Point {
    /**
     * For categorized axes this property holds the category name for the
     * point. For other axes it holds the X value.
     *
     * @name Highcharts.Point#category
     * @type {number|string}
     */
    category: (number | string);
    color?: ColorType;
    colorIndex?: number;
    dataLabels?: Array<SVGElement | SVGLabel>;
    destroyed: boolean;
    formatPrefix: string;
    graphic?: SVGElement;
    graphics?: Array<SVGElement | undefined>;
    id: string;
    isNew?: boolean;
    isNull: boolean;
    marker?: PointMarkerOptions;
    /**
     * The name of the point. The name can be given as the first position of the
     * point configuration array, or as a `name` property in the configuration:
     *
     * @example
     * // Array config
     * data: [
     *     ['John', 1],
     *     ['Jane', 2]
     * ]
     *
     * // Object config
     * data: [{
     *        name: 'John',
     *        y: 1
     * }, {
     *     name: 'Jane',
     *     y: 2
     * }]
     *
     * @name Highcharts.Point#name
     * @type {string}
     */
    name: string;
    nonZonedColor?: ColorType;
    /**
     * The point's options as applied in the initial configuration, or
     * extended through `Point.update`.
     *
     * In TypeScript you have to extend `PointOptionsObject` via an
     * additional interface to allow custom data options:
     *
     * ```
     * declare interface PointOptionsObject {
     *     customProperty: string;
     * }
     * ```
     *
     * @name Highcharts.Point#options
     * @type {Highcharts.PointOptionsObject}
     */
    options: PointOptions;
    /**
     * The percentage for points in a stacked series, pies or gauges.
     *
     * @name Highcharts.Point#percentage
     * @type {number|undefined}
     */
    percentage?: number;
    selected?: boolean;
    /**
     * The series object associated with the point.
     *
     * @name Highcharts.Point#series
     * @type {Highcharts.Series}
     */
    series: Series;
    /**
     * The attributes of the rendered SVG shape like in `column` or `pie`
     * series.
     *
     * @readonly
     * @name Highcharts.Point#shapeArgs
     * @type {Readonly<Highcharts.SVGAttributes>|undefined}
     */
    shapeArgs?: SVGAttributes;
    shapeType?: string;
    startXPos?: number;
    state?: StatesOptionsKey;
    /**
     * The total of values in either a stack for stacked series, or a pie in a
     * pie series.
     *
     * @name Highcharts.Point#total
     * @type {number|undefined}
     */
    total?: number;
    /**
     * For certain series types, like pie charts, where individual points can
     * be shown or hidden.
     *
     * @name Highcharts.Point#visible
     * @type {boolean}
     * @default true
     */
    visible: boolean;
    x: number;
    y?: (number | null);
    /**
     * Animate SVG elements associated with the point.
     *
     * @private
     * @function Highcharts.Point#animateBeforeDestroy
     */
    animateBeforeDestroy(): void;
    /**
     * Apply the options containing the x and y data and possible some extra
     * properties. Called on point init or from point.update.
     *
     * @private
     * @function Highcharts.Point#applyOptions
     *
     * @param {Highcharts.PointOptionsType} options
     *        The point options as defined in series.data.
     *
     * @param {number} [x]
     *        Optionally, the x value.
     *
     * @return {Highcharts.Point}
     *         The Point instance.
     */
    applyOptions(options: (PointOptions | PointShortOptions), x?: number): Point;
    /**
     * Destroy a point to clear memory. Its reference still stays in
     * `series.data`.
     *
     * @private
     * @function Highcharts.Point#destroy
     */
    destroy(): void;
    /**
     * Destroy SVG elements associated with the point.
     *
     * @private
     * @function Highcharts.Point#destroyElements
     * @param {Highcharts.Dictionary<number>} [kinds]
     */
    destroyElements(kinds?: Record<string, number>): void;
    /**
     * Fire an event on the Point object.
     *
     * @private
     * @function Highcharts.Point#firePointEvent
     *
     * @param {string} eventType
     *        Type of the event.
     *
     * @param {Highcharts.Dictionary<any>|Event} [eventArgs]
     *        Additional event arguments.
     *
     * @param {Highcharts.EventCallbackFunction<Highcharts.Point>|Function} [defaultFunction]
     *        Default event handler.
     *
     * @emits Highcharts.Point#event:*
     */
    firePointEvent<T extends AnyRecord | Event>(eventType: string, eventArgs?: T, defaultFunction?: (EventCallback<Point, T> | Function)): void;
    /**
     * Get the CSS class names for individual points. Used internally where the
     * returned value is set on every point.
     *
     * @function Highcharts.Point#getClassName
     *
     * @return {string}
     *         The class names.
     */
    getClassName(): string;
    /**
     * Get props of all existing graphical point elements.
     *
     * @private
     * @function Highcharts.Point#getGraphicalProps
     */
    getGraphicalProps(kinds?: Record<string, number>): Point.GraphicalProps;
    /**
     * Return the configuration hash needed for the data label and tooltip
     * formatters.
     *
     * @function Highcharts.Point#getLabelConfig
     *
     * @return {Highcharts.PointLabelObject}
     *         Abstract object used in formatters and formats.
     */
    getLabelConfig(): Point.PointLabelObject;
    /**
     * Returns the value of the point property for a given value.
     * @private
     */
    getNestedProperty(key?: string): unknown;
    /**
     * In a series with `zones`, return the zone that the point belongs to.
     *
     * @function Highcharts.Point#getZone
     *
     * @return {Highcharts.SeriesZonesOptionsObject}
     *         The zone item.
     */
    getZone(): SeriesZonesOptions;
    /**
     * Utility to check if point has new shape type. Used in column series and
     * all others that are based on column series.
     * @private
     */
    hasNewShapeType(): boolean | undefined;
    /**
     * Initialize the point. Called internally based on the `series.data`
     * option.
     *
     * @function Highcharts.Point#init
     *
     * @param {Highcharts.Series} series
     *        The series object containing this point.
     *
     * @param {Highcharts.PointOptionsType} options
     *        The data in either number, array or object format.
     *
     * @param {number} [x]
     *        Optionally, the X value of the point.
     *
     * @return {Highcharts.Point}
     *         The Point instance.
     *
     * @emits Highcharts.Point#event:afterInit
     */
    init(series: Series, options: (PointOptions | PointShortOptions), x?: number): Point;
    /**
     * Determine if point is valid.
     * @private
     * @function Highcharts.Point#isValid
     */
    isValid(): boolean;
    /**
     * Transform number or array configs into objects. Also called for object
     * configs. Used internally to unify the different configuration formats for
     * points. For example, a simple number `10` in a line series will be
     * transformed to `{ y: 10 }`, and an array config like `[1, 10]` in a
     * scatter series will be transformed to `{ x: 1, y: 10 }`.
     *
     * @deprecated
     * @function Highcharts.Point#optionsToObject
     *
     * @param {Highcharts.PointOptionsType} options
     * Series data options.
     *
     * @return {Highcharts.Dictionary<*>}
     * Transformed point options.
     */
    optionsToObject(options: (PointOptions | PointShortOptions)): this['options'];
    /**
     * Get the pixel position of the point relative to the plot area.
     * @function Highcharts.Point#pos
     *
     * @sample highcharts/point/position
     *         Get point's position in pixels.
     *
     * @param {boolean} chartCoordinates
     * If true, the returned position is relative to the full chart area.
     * If false, it is relative to the plot area determined by the axes.
     *
     * @param {number|undefined} plotY
     * A custom plot y position to be computed. Used internally for some
     * series types that have multiple `y` positions, like area range (low
     * and high values).
     *
     * @return {Array<number>|undefined}
     * Coordinates of the point if the point exists.
     */
    pos(chartCoordinates?: boolean, plotY?: number | undefined): [number, number] | undefined;
    /**
     * @private
     * @function Highcharts.Point#resolveColor
     */
    resolveColor(): void;
    /**
     * Set a value in an object, on the property defined by key. The key
     * supports nested properties using dot notation. The function modifies the
     * input object and does not make a copy.
     *
     * @function Highcharts.Point#setNestedProperty<T>
     *
     * @param {T} object
     *        The object to set the value on.
     *
     * @param {*} value
     *        The value to set.
     *
     * @param {string} key
     *        Key to the property to set.
     *
     * @return {T}
     *         The modified object.
     */
    setNestedProperty<T>(object: T, value: any, key: string): T;
    shouldDraw(): boolean;
    /**
     * Extendable method for formatting each point's tooltip line.
     *
     * @function Highcharts.Point#tooltipFormatter
     *
     * @param {string} pointFormat
     *        The point format.
     *
     * @return {string}
     *         A string to be concatenated in to the common tooltip text.
     */
    tooltipFormatter(pointFormat: string): string;
    /**
     * Update point with new options (typically x/y data) and optionally redraw
     * the series.
     *
     * @sample highcharts/members/point-update-column/
     *         Update column value
     * @sample highcharts/members/point-update-pie/
     *         Update pie slice
     * @sample maps/members/point-update/
     *         Update map area value in Highmaps
     *
     * @function Highcharts.Point#update
     *
     * @param {Highcharts.PointOptionsType} options
     *        The point options. Point options are handled as described under
     *        the `series.type.data` item for each series type. For example
     *        for a line series, if options is a single number, the point will
     *        be given that number as the marin y value. If it is an array, it
     *        will be interpreted as x and y values respectively. If it is an
     *        object, advanced options are applied.
     *
     * @param {boolean} [redraw=true]
     *        Whether to redraw the chart after the point is updated. If doing
     *        more operations on the chart, it is best practice to set
     *        `redraw` to false and call `chart.redraw()` after.
     *
     * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation=true]
     *        Whether to apply animation, and optionally animation
     *        configuration.
     *
     * @emits Highcharts.Point#event:update
     */
    update(options: (PointOptions | PointShortOptions), redraw?: boolean, animation?: (boolean | Partial<AnimationOptions>), runEvent?: boolean): void;
    /**
     * Remove a point and optionally redraw the series and if necessary the axes
     *
     * @sample highcharts/plotoptions/series-point-events-remove/
     *         Remove point and confirm
     * @sample highcharts/members/point-remove/
     *         Remove pie slice
     * @sample maps/members/point-remove/
     *         Remove selected points in Highmaps
     *
     * @function Highcharts.Point#remove
     *
     * @param {boolean} [redraw=true]
     *        Whether to redraw the chart or wait for an explicit call. When
     *        doing more operations on the chart, for example running
     *        `point.remove()` in a loop, it is best practice to set `redraw`
     *        to false and call `chart.redraw()` after.
     *
     * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation=false]
     *        Whether to apply animation, and optionally animation
     *        configuration.
     */
    remove(redraw?: boolean, animation?: (boolean | Partial<AnimationOptions>)): void;
    /**
     * Toggle the selection status of a point.
     *
     * @see Highcharts.Chart#getSelectedPoints
     *
     * @sample highcharts/members/point-select/
     *         Select a point from a button
     * @sample highcharts/chart/events-selection-points/
     *         Select a range of points through a drag selection
     * @sample maps/series/data-id/
     *         Select a point in Highmaps
     *
     * @function Highcharts.Point#select
     *
     * @param {boolean} [selected]
     * When `true`, the point is selected. When `false`, the point is
     * unselected. When `null` or `undefined`, the selection state is toggled.
     *
     * @param {boolean} [accumulate=false]
     * When `true`, the selection is added to other selected points.
     * When `false`, other selected points are deselected. Internally in
     * Highcharts, when
     * [allowPointSelect](https://api.highcharts.com/highcharts/plotOptions.series.allowPointSelect)
     * is `true`, selected points are accumulated on Control, Shift or Cmd
     * clicking the point.
     *
     * @emits Highcharts.Point#event:select
     * @emits Highcharts.Point#event:unselect
     */
    select(selected?: boolean, accumulate?: boolean): void;
    /**
     * Runs on mouse over the point. Called internally from mouse and touch
     * events.
     *
     * @function Highcharts.Point#onMouseOver
     *
     * @param {Highcharts.PointerEventObject} [e]
     *        The event arguments.
     */
    onMouseOver(e?: PointerEvent): void;
    /**
     * Runs on mouse out from the point. Called internally from mouse and touch
     * events.
     *
     * @function Highcharts.Point#onMouseOut
     * @emits Highcharts.Point#event:mouseOut
     */
    onMouseOut(): void;
    /**
     * Import events from the series' and point's options. Only do it on
     * demand, to save processing time on hovering.
     *
     * @private
     * @function Highcharts.Point#importEvents
     */
    importEvents(): void;
    /**
     * Set the point's state.
     *
     * @function Highcharts.Point#setState
     *
     * @param {Highcharts.PointStateValue|""} [state]
     *        The new state, can be one of `'hover'`, `'select'`, `'inactive'`,
     *        or `''` (an empty string), `'normal'` or `undefined` to set to
     *        normal state.
     * @param {boolean} [move]
     *        State for animation.
     *
     * @emits Highcharts.Point#event:afterSetState
     */
    setState(state?: (StatesOptionsKey | ''), move?: boolean): void;
    /**
     * Get the path definition for the halo, which is usually a shadow-like
     * circle around the currently hovered point.
     *
     * @function Highcharts.Point#haloPath
     *
     * @param {number} size
     *        The radius of the circular halo.
     *
     * @return {Highcharts.SVGPathArray}
     *         The path definition.
     */
    haloPath(size: number): SVGPath;
}
interface Point extends PointLike {
}
declare namespace Point {
    interface GraphicalProps {
        singular: Array<string>;
        plural: Array<string>;
    }
    interface PointLabelObject {
        x?: (number | string);
        y?: (number | null);
        color?: ColorType;
        colorIndex?: number;
        key?: number | string;
        series: Series;
        point: Point;
        percentage?: number;
        total?: number;
    }
    interface SeriesPointsOptions {
        events?: Highcharts.PointEventsOptionsObject;
    }
    interface UpdateCallbackFunction {
        (this: Point, event: UpdateEventObject): void;
    }
    interface UpdateEventObject {
        options?: PointTypeOptions;
    }
}
export default Point;
