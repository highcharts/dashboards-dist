import type ZAxis from '../Axis/ZAxis';
import Series from '../Series/Series.js';
declare module './PointLike' {
    interface PointLike {
        plotZ?: number;
        z?: number;
    }
}
declare module './SeriesLike' {
    interface SeriesLike {
        zAxis?: ZAxis;
        rawPointsX?: Array<number>;
        zPadding?: number;
        /** @requires Core/Series/Series3D */
        translate3dPoints(): void;
    }
}
declare class Series3D extends Series {
    static defaultOptions: import("./SeriesOptions").PlotOptionsOf<Series>;
    translate(): void;
    /**
     * Translate the plotX, plotY properties and add plotZ.
     * @private
     */
    translate3dPoints(): void;
}
export default Series3D;
