import type Axis from './Axis';
declare module './AxisComposition' {
    interface AxisComposition {
        logarithmic?: LogarithmicAxis.Additions;
    }
}
declare module './AxisType' {
    interface AxisTypeRegistry {
        LogarithmicAxis: LogarithmicAxis.Composition;
    }
}
/**
 * @private
 */
declare namespace LogarithmicAxis {
    class Composition extends Axis {
        logarithmic: Additions;
    }
    /**
     * Provides logarithmic support for axes.
     * @private
     */
    function compose<T extends typeof Axis>(AxisClass: T): (T & typeof Composition);
    /**
     * Provides logarithmic support for axes.
     * @private
     * @class
     */
    class Additions {
        constructor(axis: Composition);
        axis: Composition;
        minorAutoInterval?: number;
        /**
         * Set the tick positions of a logarithmic axis.
         */
        getLogTickPositions(interval: number, min: number, max: number, minor?: boolean): Array<number>;
        lin2log(num: number): number;
        log2lin(num: number): number;
    }
}
export default LogarithmicAxis;
