import type Axis from './Axis.js';
import type RangeSelector from '../../Stock/RangeSelector/RangeSelector';
declare module './AxisComposition' {
    interface AxisComposition {
        navigatorAxis?: NavigatorAxisAdditions;
    }
}
export declare class NavigatorAxisComposition extends Axis {
    navigatorAxis: NavigatorAxisAdditions;
}
/**
 * @private
 * @class
 */
declare class NavigatorAxisAdditions {
    /**
     * @private
     */
    static compose(AxisClass: typeof Axis): void;
    constructor(axis: NavigatorAxisComposition);
    axis: NavigatorAxisComposition;
    fake?: boolean;
    previousZoom?: [(number | null), (number | null)];
    /**
     * @private
     */
    destroy(): void;
    /**
     * Add logic to normalize the zoomed range in order to preserve the pressed
     * state of range selector buttons
     *
     * @private
     * @function Highcharts.Axis#toFixedRange
     */
    toFixedRange(pxMin?: number, pxMax?: number, fixedMin?: number, fixedMax?: number): RangeSelector.RangeObject;
}
export default NavigatorAxisAdditions;
