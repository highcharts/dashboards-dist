import type { AxisOptions } from './AxisOptions';
import type ChartOptions from '../Chart/ChartOptions';
import type ColorType from '../Color/ColorType';
import type Point from '../Series/Point';
import type SizeObject from '../Renderer/SizeObject';
import type SVGElement from '../Renderer/SVG/SVGElement';
import type SVGPath from '../Renderer/SVG/SVGPath';
import Axis from './Axis.js';
import Chart from '../Chart/Chart.js';
import Tick from './Tick.js';
declare module './AxisComposition' {
    interface AxisComposition {
        grid?: GridAxisComposition['grid'];
    }
}
declare module './AxisLike' {
    interface AxisLike {
        axisBorder?: SVGElement;
        hiddenLabels: Array<SVGElement>;
        hiddenMarks: Array<SVGElement>;
        rightWall?: SVGElement;
        getMaxLabelDimensions(ticks: Record<string, Tick>, tickPositions: Array<(number | string)>): SizeObject;
        addExtraBorder(path: SVGPath): SizeObject;
    }
}
declare module './AxisOptions' {
    interface AxisLabelFormatterContextObject {
        point?: Point;
    }
    interface AxisOptions {
        grid?: GridAxisOptions;
        isInternal?: boolean;
    }
}
declare module '../Chart/ChartLike' {
    interface ChartLike {
        marginRight: ChartOptions['marginRight'];
    }
}
declare module './TickLike' {
    interface TickLike {
        slotWidth?: number;
    }
}
declare module './AxisType' {
    interface AxisTypeRegistry {
        GridAxis: GridAxisComposition;
    }
}
export interface GridAxisComposition extends Axis {
    grid: GridAxisAdditions;
    linkedParent?: GridAxisComposition;
}
export interface GridAxisOptions {
    borderColor?: ColorType;
    borderWidth?: number;
    cellHeight?: number;
    columns?: Array<AxisOptions>;
    enabled?: boolean;
}
/**
 * Extends axis class with grid support.
 * @private
 */
declare function compose<T extends typeof Axis>(AxisClass: T, ChartClass: typeof Chart, TickClass: typeof Tick): (T & typeof GridAxis);
/**
 * Additions for grid axes.
 * @private
 * @class
 */
declare class GridAxisAdditions {
    constructor(axis: GridAxisComposition);
    axis: GridAxisComposition;
    axisLineExtra?: SVGElement;
    upperBorder?: SVGElement;
    lowerBorder?: SVGElement;
    columnIndex?: number;
    columns?: Array<GridAxisComposition>;
    isColumn?: boolean;
    /**
     * Checks if an axis is the outer axis in its dimension. Since
     * axes are placed outwards in order, the axis with the highest
     * index is the outermost axis.
     *
     * Example: If there are multiple x-axes at the top of the chart,
     * this function returns true if the axis supplied is the last
     * of the x-axes.
     *
     * @private
     *
     * @return {boolean}
     * True if the axis is the outermost axis in its dimension; false if
     * not.
     */
    isOuterAxis(): boolean;
    /**
     * Add extra border based on the provided path.
     * @private
     * @param {SVGPath} path
     * The path of the border.
     * @return {Highcharts.SVGElement}
     * Border
     */
    renderBorder(path: SVGPath): SVGElement;
}
declare const GridAxis: {
    compose: typeof compose;
};
export default GridAxis;
