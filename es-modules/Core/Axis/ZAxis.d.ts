import type AxisLike from './AxisLike';
import type AxisOptions from './AxisOptions';
import type Chart from '../Chart/Chart.js';
import Axis from './Axis.js';
declare module './AxisType' {
    interface AxisTypeRegistry {
        ZAxis: ZAxis;
    }
}
declare module '../Chart/ChartLike' {
    interface ChartLike {
        zAxis?: Array<ZAxis>;
        addZAxis(options: AxisOptions): Axis;
    }
}
declare module '../Options' {
    interface Options {
        zAxis?: (DeepPartial<AxisOptions> | Array<DeepPartial<AxisOptions>>);
    }
}
/**
 * 3D axis for z coordinates.
 */
declare class ZAxis extends Axis implements AxisLike {
    static compose(ChartClass: typeof Chart): void;
    init(chart: Chart, userOptions: AxisOptions): void;
    ignoreMaxPadding?: boolean;
    ignoreMinPadding?: boolean;
    isZAxis: true;
    getSeriesExtremes(): void;
    /**
     * @private
     */
    setAxisSize(): void;
    /**
     * @private
     */
    setOptions(userOptions: DeepPartial<AxisOptions>): void;
}
export default ZAxis;
