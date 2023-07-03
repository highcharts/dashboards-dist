import type Axis from './Axis';
import type { AxisBreakOptions } from './AxisOptions';
import type { AxisBreakObject } from './BreakObject';
import type Series from '../Series/Series';
import type SVGPath from '../Renderer/SVG/SVGPath';
declare module './AxisComposition' {
    interface AxisComposition {
        brokenAxis?: BrokenAxis.Additions;
    }
}
declare module './AxisOptions' {
    interface AxisBreakOptions {
        breakSize?: number;
        from: number;
        inclusive?: boolean;
        repeat?: number;
        to: number;
    }
    interface AxisOptions {
        breaks?: Array<AxisBreakOptions>;
    }
}
declare module './AxisType' {
    interface AxisTypeRegistry {
        BrokenAxis: BrokenAxis.Composition;
    }
}
declare module '../Series/SeriesLike' {
    interface SeriesLike {
        /** @requires modules/broken-axis */
        drawBreaks(axis: Axis, keys: Array<string>): void;
        /** @requires modules/broken-axis */
        gappedPath?(): SVGPath;
    }
}
declare module '../Series/SeriesOptions' {
    interface SeriesOptions {
        gapSize?: number;
        gapUnit?: string;
    }
}
/**
 * Axis with support of broken data rows.
 * @private
 */
declare namespace BrokenAxis {
    class Composition extends Axis {
        /**
         * HC <= 8 backwards compatibility, used by demo samples.
         * @deprecated
         * @private
         * @requires modules/broken-axis
         */
        breakArray: Array<AxisBreakObject>;
        /** @requires modules/broken-axis */
        brokenAxis: Additions;
    }
    /**
     * Adds support for broken axes.
     * @private
     */
    function compose<T extends typeof Axis>(AxisClass: T, SeriesClass: typeof Series): (T & typeof BrokenAxis);
    /**
     * Provides support for broken axes.
     * @private
     * @class
     */
    class Additions {
        /**
         * @private
         */
        static isInBreak(brk: AxisBreakOptions, val: number): (boolean | undefined);
        /**
         * @private
         */
        static lin2Val(this: Axis, val: (number | null)): (number | null);
        /**
         * @private
         */
        static val2Lin(this: Axis, val: (number | null)): (number | null);
        constructor(axis: Composition);
        axis: Composition;
        breakArray?: Array<AxisBreakObject>;
        hasBreaks: boolean;
        unitLength?: number;
        /**
         * Returns the first break found where the x is larger then break.from
         * and smaller then break.to.
         *
         * @param {number} x
         * The number which should be within a break.
         *
         * @param {Array<Highcharts.XAxisBreaksOptions>} breaks
         * The array of breaks to search within.
         *
         * @return {Highcharts.XAxisBreaksOptions|undefined}
         * Returns the first break found that matches, returns false if no break
         * is found.
         */
        findBreakAt(x: number, breaks: Array<AxisBreakOptions>): (AxisBreakOptions | undefined);
        /**
         * @private
         */
        isInAnyBreak(val: (number | null | undefined), testKeep?: boolean): (boolean | undefined);
        /**
         * Dynamically set or unset breaks in an axis. This function in lighter
         * than usin Axis.update, and it also preserves animation.
         *
         * @private
         * @function Highcharts.Axis#setBreaks
         *
         * @param {Array<Highcharts.XAxisBreaksOptions>} [breaks]
         * The breaks to add. When `undefined` it removes existing breaks.
         *
         * @param {boolean} [redraw=true]
         * Whether to redraw the chart immediately.
         */
        setBreaks(breaks?: Array<AxisBreakOptions>, redraw?: boolean): void;
    }
}
export default BrokenAxis;
