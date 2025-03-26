import type Axis from './Axis/Axis';
import type BBoxObject from './Renderer/BBoxObject';
import type Chart from './Chart/Chart';
import type { DOMElementType } from './Renderer/DOMElementType';
import type Options from './Options';
import type Point from './Series/Point';
import type { PointerEvent } from './PointerEvent';
import type Series from './Series/Series';
import type SVGElement from './Renderer/SVG/SVGElement';
import SVGAttributes from './Renderer/SVG/SVGAttributes';
declare module './Chart/ChartLike' {
    interface ChartLike {
        cancelClick?: boolean;
        hoverPoint?: Point;
        hoverPoints?: Array<Point>;
        hoverSeries?: Series;
        mouseDownX?: number;
        mouseDownY?: number;
        mouseIsDown?: (boolean | string);
        pointer?: Pointer;
    }
}
/**
 * The mouse and touch tracker object. Each {@link Chart} item has one
 * associated Pointer item that can be accessed from the  {@link Chart.pointer}
 * property.
 *
 * @class
 * @name Highcharts.Pointer
 *
 * @param {Highcharts.Chart} chart
 * The chart instance.
 *
 * @param {Highcharts.Options} options
 * The root options object. The pointer uses options from the chart and tooltip
 * structures.
 */
declare class Pointer {
    static hoverChartIndex: (number | undefined);
    static unbindDocumentMouseUp: Array<{
        doc: Document;
        unbind: Function;
    }>;
    static unbindDocumentTouchEnd: (Function | undefined);
    chart: Chart;
    chartPosition?: Pointer.ChartPositionObject;
    hasDragged: number;
    hasPinched?: boolean;
    hasPointerCapture?: boolean;
    hasZoom?: boolean;
    initiated?: boolean;
    isDirectTouch?: boolean;
    lastTouches?: Array<PointerEvent>;
    options: Options;
    pinchDown?: Array<PointerEvent>;
    pointerCaptureEventsToUnbind: Array<Function>;
    res?: boolean;
    runChartClick?: boolean;
    selectionMarker?: SVGElement;
    tooltipTimeout?: number;
    eventsToUnbind: Array<Function>;
    unDocMouseMove?: Function;
    zoomHor?: boolean;
    zoomVert?: boolean;
    zoomX?: boolean;
    zoomY?: boolean;
    /**
     * Set inactive state to all series that are not currently hovered,
     * or, if `inactiveOtherPoints` is set to true, set inactive state to
     * all points within that series.
     *
     * @private
     * @function Highcharts.Pointer#applyInactiveState
     *
     * @param {Array<Highcharts.Point>} points
     * Currently hovered points
     */
    applyInactiveState(points?: Array<Point>): void;
    /**
     * Destroys the Pointer object and disconnects DOM events.
     *
     * @function Highcharts.Pointer#destroy
     */
    destroy(): void;
    /**
     * Calculate attrs for selection marker.
     * @private
     * @function Highcharts.Pointer#getSelectionMarkerAttrs
     * @emits getSelectionMarkerAttrs
     */
    getSelectionMarkerAttrs(chartX: number, chartY: number): {
        attrs: SVGAttributes;
        shapeType: 'rect' | 'arc' | 'path';
    };
    /**
     * Perform a drag operation in response to a mousemove event while the mouse
     * is down.
     * @private
     * @function Highcharts.Pointer#drag
     */
    drag(e: PointerEvent): void;
    /**
     * Start a drag operation.
     * @private
     * @function Highcharts.Pointer#dragStart
     */
    dragStart(e: PointerEvent): void;
    /**
     * Get selection box to calculate extremes
     * @private
     * @function Highcharts.Pointer#getSelectionBox
     * @emits getSelectionBox
     */
    getSelectionBox(marker: SVGElement): BBoxObject;
    /**
     * On mouse up or touch end across the entire document, drop the selection.
     * @private
     * @function Highcharts.Pointer#drop
     */
    drop(e?: PointerEvent): void;
    /**
     * Finds the closest point to a set of coordinates, using the k-d-tree
     * algorithm.
     *
     * @function Highcharts.Pointer#findNearestKDPoint
     *
     * @param {Array<Highcharts.Series>} series
     * All the series to search in.
     *
     * @param {boolean|undefined} shared
     * Whether it is a shared tooltip or not.
     *
     * @param {Highcharts.PointerEventObject} e
     * The pointer event object, containing chart coordinates of the pointer.
     *
     * @return {Highcharts.Point|undefined}
     * The point closest to given coordinates.
     */
    findNearestKDPoint(series: Array<Series>, shared: (boolean | undefined), e: PointerEvent): (Point | undefined);
    /**
     * @private
     * @function Highcharts.Pointer#getChartCoordinatesFromPoint
     */
    getChartCoordinatesFromPoint(point: Point, inverted?: boolean): (Pointer.CoordinatesObject | undefined);
    /**
     * Return the cached chartPosition if it is available on the Pointer,
     * otherwise find it. Running offset is quite expensive, so it should be
     * avoided when we know the chart hasn't moved.
     *
     * @function Highcharts.Pointer#getChartPosition
     *
     * @return {Highcharts.ChartPositionObject}
     * The offset of the chart container within the page
     */
    getChartPosition(): Pointer.ChartPositionObject;
    /**
     * Get the click position in terms of axis values.
     *
     * @function Highcharts.Pointer#getCoordinates
     *
     * @param {Highcharts.PointerEventObject} e
     * Pointer event, extended with `chartX` and `chartY` properties.
     *
     * @return {Highcharts.PointerAxisCoordinatesObject}
     * Axis coordinates.
     */
    getCoordinates(e: PointerEvent): Pointer.AxesCoordinatesObject;
    /**
     * Calculates what is the current hovered point/points and series.
     *
     * @private
     * @function Highcharts.Pointer#getHoverData
     *
     * @param {Highcharts.Point|undefined} existingHoverPoint
     * The point currently being hovered.
     *
     * @param {Highcharts.Series|undefined} existingHoverSeries
     * The series currently being hovered.
     *
     * @param {Array<Highcharts.Series>} series
     * All the series in the chart.
     *
     * @param {boolean} isDirectTouch
     * Is the pointer directly hovering the point.
     *
     * @param {boolean|undefined} shared
     * Whether it is a shared tooltip or not.
     *
     * @param {Highcharts.PointerEventObject} [e]
     * The triggering event, containing chart coordinates of the pointer.
     *
     * @return {Object}
     * Object containing resulting hover data: hoverPoint, hoverSeries, and
     * hoverPoints.
     */
    getHoverData(existingHoverPoint: (Point | undefined), existingHoverSeries: (Series | undefined), series: Array<Series>, isDirectTouch?: boolean, shared?: boolean, e?: PointerEvent): Pointer.HoverDataObject;
    /**
     * @private
     * @function Highcharts.Pointer#getPointFromEvent
     */
    getPointFromEvent(e: Event): (Point | undefined);
    /**
     * @private
     * @function Highcharts.Pointer#onTrackerMouseOut
     */
    onTrackerMouseOut(e: PointerEvent): void;
    /**
     * Utility to detect whether an element has, or has a parent with, a
     * specific class name. Used on detection of tracker objects and on deciding
     * whether hovering the tooltip should cause the active series to mouse out.
     *
     * @function Highcharts.Pointer#inClass
     *
     * @param {Highcharts.SVGDOMElement|Highcharts.HTMLDOMElement} element
     * The element to investigate.
     *
     * @param {string} className
     * The class name to look for.
     *
     * @return {boolean|undefined}
     * True if either the element or one of its parents has the given class
     * name.
     */
    inClass(element: DOMElementType, className: string): (boolean | undefined);
    /**
     * Initialize the Pointer.
     *
     * @private
     * @function Highcharts.Pointer#init
     *
     * @param {Highcharts.Chart} chart
     * The Chart instance.
     *
     * @param {Highcharts.Options} options
     * The root options object. The pointer uses options from the chart and
     * tooltip structures.
     */
    constructor(chart: Chart, options: Options);
    /**
     * Takes a browser event object and extends it with custom Highcharts
     * properties `chartX` and `chartY` in order to work on the internal
     * coordinate system.
     *
     * On map charts, the properties `lon` and `lat` are added to the event
     * object given that the chart has projection information.
     *
     * @function Highcharts.Pointer#normalize
     *
     * @param {global.MouseEvent|global.PointerEvent|global.TouchEvent} e
     * Event object in standard browsers.
     *
     * @param {Highcharts.OffsetObject} [chartPosition]
     * Additional chart offset.
     *
     * @return {Highcharts.PointerEventObject}
     * A browser event with extended properties `chartX` and `chartY`.
     */
    normalize<T extends PointerEvent>(e: (T | MouseEvent | PointerEvent | TouchEvent), chartPosition?: Pointer.ChartPositionObject): T;
    /**
     * @private
     * @function Highcharts.Pointer#onContainerClick
     */
    onContainerClick(e: MouseEvent): void;
    /**
     * @private
     * @function Highcharts.Pointer#onContainerMouseDown
     */
    onContainerMouseDown(e: MouseEvent): void;
    /**
     * When mouse leaves the container, hide the tooltip.
     * @private
     * @function Highcharts.Pointer#onContainerMouseLeave
     */
    onContainerMouseLeave(e: MouseEvent): void;
    /**
     * When mouse enters the container, delete pointer's chartPosition.
     * @private
     * @function Highcharts.Pointer#onContainerMouseEnter
     */
    onContainerMouseEnter(): void;
    /**
     * The mousemove, touchmove and touchstart event handler
     * @private
     * @function Highcharts.Pointer#onContainerMouseMove
     */
    onContainerMouseMove(e: MouseEvent): void;
    /**
     * @private
     * @function Highcharts.Pointer#onDocumentTouchEnd
     */
    onDocumentTouchEnd(e: PointerEvent): void;
    /**
     * @private
     * @function Highcharts.Pointer#onContainerTouchMove
     */
    onContainerTouchMove(e: PointerEvent): void;
    /**
     * @private
     * @function Highcharts.Pointer#onContainerTouchStart
     */
    onContainerTouchStart(e: PointerEvent): void;
    /**
     * Special handler for mouse move that will hide the tooltip when the mouse
     * leaves the plotarea. Issue #149 workaround. The mouseleave event does not
     * always fire.
     * @private
     * @function Highcharts.Pointer#onDocumentMouseMove
     */
    onDocumentMouseMove(e: MouseEvent): void;
    /**
     * @private
     * @function Highcharts.Pointer#onDocumentMouseUp
     */
    onDocumentMouseUp(e: PointerEvent): void;
    /**
     * Handle touch events with two touches
     * @private
     * @function Highcharts.Pointer#pinch
     */
    pinch(e: PointerEvent): void;
    /**
     * Run translation operations
     * @private
     * @function Highcharts.Pointer#pinchTranslate
     * /
    public pinchTranslate(
        pinchDown: Array<any>,
        touches: Array<PointerEvent>,
        transform: any,
        selectionMarker: any,
        clip: any,
        lastValidTouch: any
    ): void {
        if (this.zoomHor) {
            this.pinchTranslateDirection(
                true,
                pinchDown,
                touches,
                transform,
                selectionMarker,
                clip,
                lastValidTouch
            );
        }
        if (this.zoomVert) {
            this.pinchTranslateDirection(
                false,
                pinchDown,
                touches,
                transform,
                selectionMarker,
                clip,
                lastValidTouch
            );
        }
    }
    */
    /**
     * Run translation operations for each direction (horizontal and vertical)
     * independently.
     * @private
     * @function Highcharts.Pointer#pinchTranslateDirection
     * /
    public pinchTranslateDirection(
        horiz: boolean,
        pinchDown: Array<any>,
        touches: Array<PointerEvent>,
        transform: any,
        selectionMarker: any,
        clip: any,
        lastValidTouch: any,
        forcedScale?: number
    ): void {
        const chart = this.chart,
            xy: ('x'|'y') = horiz ? 'x' : 'y',
            XY: ('X'|'Y') = horiz ? 'X' : 'Y',
            sChartXY: ('chartX'|'chartY') = ('chart' + XY) as any,
            wh = horiz ? 'width' : 'height',
            plotLeftTop = (chart as any)['plot' + (horiz ? 'Left' : 'Top')],
            inverted = chart.inverted,
            bounds = chart.bounds[horiz ? 'h' : 'v'],
            singleTouch = pinchDown.length === 1,
            touch0Start = pinchDown[0][sChartXY],
            touch1Start = !singleTouch && pinchDown[1][sChartXY],
            setScale = function (): void {
                // Don't zoom if fingers are too close on this axis
                if (
                    typeof touch1Now === 'number' &&
                    Math.abs(touch0Start - touch1Start) > 20
                ) {
                    scale = forcedScale ||
                        Math.abs(touch0Now - touch1Now) /
                        Math.abs(touch0Start - touch1Start);
                }

                clipXY = ((plotLeftTop - touch0Now) / scale) + touch0Start;
                selectionWH = (chart as any)[
                    'plot' + (horiz ? 'Width' : 'Height')
                ] / scale;
            };

        let selectionWH: any,
            selectionXY,
            clipXY: any,
            scale = forcedScale || 1,
            touch0Now = touches[0][sChartXY],
            touch1Now = !singleTouch && touches[1][sChartXY],
            outOfBounds;

        // Set the scale, first pass
        setScale();

        // The clip position (x or y) is altered if out of bounds, the selection
        // position is not
        selectionXY = clipXY;

        // Out of bounds
        if (selectionXY < bounds.min) {
            selectionXY = bounds.min;
            outOfBounds = true;
        } else if (selectionXY + selectionWH > bounds.max) {
            selectionXY = bounds.max - selectionWH;
            outOfBounds = true;
        }

        // Is the chart dragged off its bounds, determined by dataMin and
        // dataMax?
        if (outOfBounds) {

            // Modify the touchNow position in order to create an elastic drag
            // movement. This indicates to the user that the chart is responsive
            // but can't be dragged further.
            touch0Now -= 0.8 * (touch0Now - lastValidTouch[xy][0]);
            if (typeof touch1Now === 'number') {
                touch1Now -= 0.8 * (touch1Now - lastValidTouch[xy][1]);
            }

            // Set the scale, second pass to adapt to the modified touchNow
            // positions
            setScale();

        } else {
            lastValidTouch[xy] = [touch0Now, touch1Now];
        }

        // Set geometry for clipping, selection and transformation
        if (!inverted) {
            clip[xy] = clipXY - plotLeftTop;
            clip[wh] = selectionWH;
        }
        const scaleKey = inverted ?
            (horiz ? 'scaleY' : 'scaleX') : 'scale' + XY;
        const transformScale = inverted ? 1 / scale : scale;

        selectionMarker[wh] = selectionWH;
        selectionMarker[xy] = selectionXY;
        // Invert scale if needed (#19217)
        transform[scaleKey] = scale * (inverted && !horiz ? -1 : 1);
        transform['translate' + XY] = (transformScale * plotLeftTop) +
            (touch0Now - (transformScale * touch0Start));
    }
    */
    /**
     * Reset the tracking by hiding the tooltip, the hover series state and the
     * hover point.
     *
     * @function Highcharts.Pointer#reset
     *
     * @param {boolean} [allowMove]
     * Instead of destroying the tooltip altogether, allow moving it if
     * possible.
     *
     * @param {number} [delay]
     * The tooltip hide delay in ms.
     */
    reset(allowMove?: boolean, delay?: number): void;
    /**
     * With line type charts with a single tracker, get the point closest to the
     * mouse. Run Point.onMouseOver and display tooltip for the point or points.
     *
     * @private
     * @function Highcharts.Pointer#runPointActions
     *
     * @emits Highcharts.Point#event:mouseOut
     * @emits Highcharts.Point#event:mouseOver
     */
    runPointActions(e?: PointerEvent, p?: Point, force?: boolean): void;
    /**
     * Set the JS DOM events on the container and document. This method should
     * contain a one-to-one assignment between methods and their handlers. Any
     * advanced logic should be moved to the handler reflecting the event's
     * name.
     * @private
     * @function Highcharts.Pointer#setDOMEvents
     */
    setDOMEvents(): void;
    /**
     * Sets, or removes on update, pointer events using pointer capture for
     * tooltip.followTouchMove if any series has findNearestPointBy that
     * includes the y dimension.
     * @private
     * @function Highcharts.Pointer#setPointerCapture
    */
    setPointerCapture(): void;
    /**
     * Sets the index of the hovered chart and leaves the previous hovered
     * chart, to reset states like tooltip.
     * @private
     * @function Highcharts.Pointer#setHoverChartIndex
     */
    setHoverChartIndex(e?: MouseEvent): void;
    /**
     * General touch handler shared by touchstart and touchmove.
     * @private
     * @function Highcharts.Pointer#touch
     */
    touch(e: PointerEvent, start?: boolean): void;
    /**
     * Returns true if the chart is set up for zooming by single touch and the
     * event is capable
     * @private
     * @function Highcharts.Pointer#touchSelect
     */
    private touchSelect;
    /**
     * Resolve the zoomType option, this is reset on all touch start and mouse
     * down events.
     * @private
     * @function Highcharts.Pointer#zoomOption
     */
    zoomOption(e: Event): void;
}
declare namespace Pointer {
    interface ChartPositionObject {
        left: number;
        scaleX: number;
        scaleY: number;
        top: number;
    }
    interface AxesCoordinatesObject {
        xAxis: Array<AxisCoordinateObject>;
        yAxis: Array<AxisCoordinateObject>;
    }
    interface AxisCoordinateObject {
        axis: Axis;
        value: number;
    }
    interface CoordinatesObject {
        chartX: number;
        chartY: number;
    }
    interface EventArgsObject {
        chartX?: number;
        chartY?: number;
        filter?: Function;
        hoverPoint?: Point;
        shared?: boolean;
    }
    interface HoverDataObject {
        hoverPoint?: Point;
        hoverPoints: Array<Point>;
        hoverSeries: Series;
    }
    interface SelectDataObject {
        axis: Axis;
        max: number;
        min: number;
    }
    interface SelectEventObject {
        animation?: boolean;
        height?: number;
        originalEvent: Event;
        resetSelection?: boolean;
        trigger?: string;
        width?: number;
        x?: number;
        xAxis: Array<SelectDataObject>;
        y?: number;
        yAxis: Array<SelectDataObject>;
    }
    /**
     * @private
     */
    function compose(ChartClass: typeof Chart): void;
}
export default Pointer;
