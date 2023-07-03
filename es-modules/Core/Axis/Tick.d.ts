import type Axis from './Axis.js';
import type { AxisLabelOptions, AxisOptions } from './AxisOptions';
import type PositionObject from '../Renderer/PositionObject';
import type TickLike from './TickLike';
import type SVGElement from '../Renderer/SVG/SVGElement';
import type SVGPath from '../Renderer/SVG/SVGPath';
import type SVGRenderer from '../Renderer/SVG/SVGRenderer';
import type TimeTicksInfoObject from './TimeTicksInfoObject';
declare module './AxisOptions' {
    interface AxisLabelFormatterContextObject {
        tickPositionInfo?: TimeTicksInfoObject;
    }
}
/**
 * The Tick class.
 *
 * @class
 * @name Highcharts.Tick
 *
 * @param {Highcharts.Axis} axis
 * The axis of the tick.
 *
 * @param {number} pos
 * The position of the tick on the axis in terms of axis values.
 *
 * @param {string} [type]
 * The type of tick, either 'minor' or an empty string
 *
 * @param {boolean} [noLabel=false]
 * Whether to disable the label or not. Defaults to false.
 *
 * @param {Object} [parameters]
 * Optional parameters for the tick.
 */
declare class Tick {
    constructor(axis: Axis, pos: number, type?: string, noLabel?: boolean, parameters?: Tick.ParametersObject);
    axis: Axis;
    gridLine?: SVGElement;
    isActive?: boolean;
    isFirst?: boolean;
    isNew: boolean;
    isNewLabel: boolean;
    isLast?: boolean;
    label?: SVGElement;
    labelPos?: PositionObject;
    mark?: SVGElement;
    movedLabel?: SVGElement;
    options?: DeepPartial<AxisOptions>;
    parameters: Tick.ParametersObject;
    pos: number;
    rotation?: number;
    shortenLabel?: Function;
    slotWidth?: number;
    tickmarkOffset?: number;
    type: string;
    /**
     * Write the tick label.
     *
     * @private
     * @function Highcharts.Tick#addLabel
     */
    addLabel(): void;
    /**
     * Render and return the label of the tick.
     *
     * @private
     * @function Highcharts.Tick#createLabel
     */
    createLabel(xy: PositionObject, str: string, labelOptions: AxisLabelOptions): (SVGElement | undefined);
    /**
     * Destructor for the tick prototype
     *
     * @private
     * @function Highcharts.Tick#destroy
     */
    destroy(): void;
    /**
     * Gets the x and y positions for ticks in terms of pixels.
     *
     * @private
     * @function Highcharts.Tick#getPosition
     *
     * @param {boolean} horiz
     * Whether the tick is on an horizontal axis or not.
     *
     * @param {number} tickPos
     * Position of the tick.
     *
     * @param {number} tickmarkOffset
     * Tickmark offset for all ticks.
     *
     * @param {boolean} [old]
     * Whether the axis has changed or not.
     *
     * @return {Highcharts.PositionObject}
     * The tick position.
     *
     * @emits Highcharts.Tick#event:afterGetPosition
     */
    getPosition(horiz: boolean | undefined, tickPos: number, tickmarkOffset: number, old?: boolean): PositionObject;
    /**
     * Get the x, y position of the tick label
     * @private
     */
    getLabelPosition(x: number, y: number, label: SVGElement, horiz: boolean, labelOptions: AxisLabelOptions, tickmarkOffset: number, index: number, step: number): PositionObject;
    /**
     * Get the offset height or width of the label
     *
     * @private
     * @function Highcharts.Tick#getLabelSize
     */
    getLabelSize(): number;
    /**
     * Extendible method to return the path of the marker
     * @private
     */
    getMarkPath(x: number, y: number, tickLength: number, tickWidth: number, horiz: boolean, renderer: SVGRenderer): SVGPath;
    /**
     * Handle the label overflow by adjusting the labels to the left and right
     * edge, or hide them if they collide into the neighbour label.
     *
     * @private
     * @function Highcharts.Tick#handleOverflow
     */
    handleOverflow(xy: PositionObject): void;
    /**
     * Try to replace the label if the same one already exists.
     *
     * @private
     * @function Highcharts.Tick#moveLabel
     */
    moveLabel(str: string, labelOptions: AxisLabelOptions): void;
    /**
     * Put everything in place
     *
     * @private
     * @param {number} index
     *
     * @param {boolean} [old]
     * Use old coordinates to prepare an animation into new position
     *
     * @param {number} [opacity]
     */
    render(index: number, old?: boolean, opacity?: number): void;
    /**
     * Renders the gridLine.
     *
     * @private
     * @function Highcharts.Tick#renderGridLine
     * @param {boolean} old  Whether or not the tick is old
     * @param {number} opacity  The opacity of the grid line
     * @param {number} reverseCrisp  Modifier for avoiding overlapping 1 or -1
     */
    renderGridLine(old: boolean | undefined, opacity: number, reverseCrisp: number): void;
    /**
     * Renders the tick mark.
     *
     * @private
     * @function Highcharts.Tick#renderMark
     * @param {Highcharts.PositionObject} xy  The position vector of the mark
     * @param {number} opacity  The opacity of the mark
     * @param {number} reverseCrisp  Modifier for avoiding overlapping 1 or -1
     */
    renderMark(xy: PositionObject, opacity: number, reverseCrisp: number): void;
    /**
     * Renders the tick label.
     * Note: The label should already be created in init(), so it should only
     * have to be moved into place.
     *
     * @private
     * @function Highcharts.Tick#renderLabel
     * @param {Highcharts.PositionObject} xy  The position vector of the label
     * @param {boolean} old  Whether or not the tick is old
     * @param {number} opacity  The opacity of the label
     * @param {number} index  The index of the tick
     */
    renderLabel(xy: Tick.LabelObject, old: boolean | undefined, opacity: number, index: number): void;
    /**
     * Replace labels with the moved ones to perform animation. Additionally
     * destroy unused labels.
     *
     * @private
     * @function Highcharts.Tick#replaceMovedLabel
     */
    replaceMovedLabel(): void;
}
interface Tick extends TickLike {
}
declare namespace Tick {
    interface ParametersObject {
        category?: string;
        options?: AnyRecord;
        tickmarkOffset?: number;
    }
    interface LabelObject extends PositionObject {
        opacity?: number;
    }
}
export default Tick;
