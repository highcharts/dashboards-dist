import type Chart from '../../Chart/Chart';
import type ColorAxis from './ColorAxis';
import type ColorType from '../../Color/ColorType';
import type Fx from '../../Animation/Fx';
import type Legend from '../../Legend/Legend';
import type Point from '../../Series/Point';
import type Series from '../../Series/Series';
import type SeriesOptions from '../../Series/SeriesOptions';
declare module '../../Series/PointLike' {
    interface PointLike {
        /** @requires ColorSeriesMixin */
        setVisible(vis?: boolean): void;
    }
}
declare module '../../Series/SeriesLike' {
    interface SeriesLike {
        /** @requires ColorSeriesMixin */
        translateColors(): void;
    }
}
declare namespace ColorAxisComposition {
    interface PointComposition extends Point {
        series: SeriesComposition;
        value?: (number | null);
        setVisible(vis?: boolean): void;
    }
    interface SeriesComposition extends Series {
        colorAxis: ColorAxis;
        data: Array<PointComposition>;
        points: Array<PointComposition>;
        options: SeriesCompositionOptions;
        optionalAxis?: string;
        translateColors(): void;
    }
    interface SeriesCompositionOptions extends SeriesOptions {
        nullColor?: ColorType;
    }
    /**
     * @private
     */
    function compose(ColorAxisType: typeof ColorAxis, ChartClass: typeof Chart, FxClass: typeof Fx, LegendClass: typeof Legend, SeriesClass: typeof Series): void;
    /**
     * Set the visibility of a single point
     * @private
     * @function Highcharts.colorPointMixin.setVisible
     * @param {boolean} visible
     */
    function pointSetVisible(this: PointComposition, vis?: boolean): void;
}
export default ColorAxisComposition;
