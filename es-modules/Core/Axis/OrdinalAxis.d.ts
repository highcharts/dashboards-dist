import type TickPositionsArray from './TickPositionsArray';
import type Time from '../Time';
import Axis from './Axis.js';
import Chart from '../Chart/Chart.js';
import Series from '../Series/Series.js';
declare module './AxisComposition' {
    interface AxisComposition {
        ordinal?: OrdinalAxis.Additions;
        /** @deprecated */
        getTimeTicks(normalizedInterval: Time.TimeNormalizedObject, min: number, max: number, startOfWeek?: number, positions?: Array<number>, closestDistance?: number, findHigherRanks?: boolean): TickPositionsArray;
        /** @deprecated */
        lin2val(val: number): number;
        /** @deprecated */
        val2lin(val: number, toIndex?: boolean): number;
    }
}
declare module './AxisOptions' {
    interface AxisOptions {
        keepOrdinalPadding?: boolean;
    }
}
declare module './TimeTicksInfoObject' {
    interface TimeTicksInfoObject {
        segmentStarts?: Array<number>;
    }
}
declare module './AxisType' {
    interface AxisTypeRegistry {
        OrdinalAxis: OrdinalAxis.Composition;
    }
}
/**
 * Extends the axis with ordinal support.
 * @private
 */
declare namespace OrdinalAxis {
    class Composition extends Axis {
        forceOrdinal?: boolean;
        isInternal?: boolean;
        ordinal: Additions;
        getTimeTicks(normalizedInterval: Time.TimeNormalizedObject, min: number, max: number, startOfWeek: number, positions?: Array<number>, closestDistance?: number, findHigherRanks?: boolean): TickPositionsArray;
        index2val(val: number): number;
        lin2val(val: number): number;
        ordinal2lin: Composition['val2lin'];
        val2lin(val: number, toIndex?: boolean): number;
    }
    /**
     * Extends the axis with ordinal support.
     *
     * @private
     *
     * @param AxisClass
     * Axis class to extend.
     *
     * @param ChartClass
     * Chart class to use.
     *
     * @param SeriesClass
     * Series class to use.
     */
    function compose<T extends typeof Axis>(AxisClass: T, SeriesClass: typeof Series, ChartClass: typeof Chart): (typeof Composition & T);
    /**
     * @private
     */
    class Additions {
        /**
         * @private
         */
        constructor(axis: Composition);
        axis: Composition;
        extendedOrdinalPositions?: Array<number>;
        groupIntervalFactor?: number;
        index?: Record<string, Array<number>>;
        offset?: number;
        overscrollPointsRange?: number;
        positions?: Array<number>;
        slope?: number;
        /**
         * Calculate the ordinal positions before tick positions are calculated.
         * @private
         */
        beforeSetTickPositions(): void;
        /**
         * Faster way of using the Array.indexOf method.
         * Works for sorted arrays only with unique values.
         *
         * @param {Array} sortedArray
         *        The sorted array inside which we are looking for.
         * @param {number} key
         *        The key to being found.
         * @param {boolean} indirectSearch
         *        In case of lack of the point in the array, should return
         *        value be equal to -1 or the closest smaller index.
         *  @private
         */
        static findIndexOf(sortedArray: Array<number>, key: number, indirectSearch?: boolean): number;
        /**
         * Get the ordinal positions for the entire data set. This is necessary
         * in chart panning because we need to find out what points or data
         * groups are available outside the visible range. When a panning
         * operation starts, if an index for the given grouping does not exists,
         * it is created and cached. This index is deleted on updated data, so
         * it will be regenerated the next time a panning operation starts.
         * @private
         */
        getExtendedPositions(): Array<number>;
        /**
         * Find the factor to estimate how wide the plot area would have been if
         * ordinal gaps were included. This value is used to compute an imagined
         * plot width in order to establish the data grouping interval.
         *
         * A real world case is the intraday-candlestick example. Without this
         * logic, it would show the correct data grouping when viewing a range
         * within each day, but once moving the range to include the gap between
         * two days, the interval would include the cut-away night hours and the
         * data grouping would be wrong. So the below method tries to compensate
         * by identifying the most common point interval, in this case days.
         *
         * An opposite case is presented in issue #718. We have a long array of
         * daily data, then one point is appended one hour after the last point.
         * We expect the data grouping not to change.
         *
         * In the future, if we find cases where this estimation doesn't work
         * optimally, we might need to add a second pass to the data grouping
         * logic, where we do another run with a greater interval if the number
         * of data groups is more than a certain fraction of the desired group
         * count.
         * @private
         */
        getGroupIntervalFactor(xMin: number, xMax: number, series: Series): number;
        /**
         * Get index of point inside the ordinal positions array.
         *
         * @private
         * @param {number} val
         * The pixel value of a point.
         *
         * @param {Array<number>} [ordinallArray]
         * An array of all points available on the axis for the given data set.
         * Either ordinalPositions if the value is inside the plotArea or
         * extendedOrdinalPositions if not.
         */
        getIndexOfPoint(val: number, ordinalArray: Array<number>): number;
        /**
         * Get ticks for an ordinal axis within a range where points don't
         * exist. It is required when overscroll is enabled. We can't base on
         * points, because we may not have any, so we use approximated
         * pointRange and generate these ticks between Axis.dataMax,
         * Axis.dataMax + Axis.overscroll evenly spaced. Used in panning and
         * navigator scrolling.
         * @private
         */
        getOverscrollPositions(): Array<number>;
        /**
         * Make the tick intervals closer because the ordinal gaps make the
         * ticks spread out or cluster.
         * @private
         */
        postProcessTickInterval(tickInterval: number): number;
    }
}
export default OrdinalAxis;
