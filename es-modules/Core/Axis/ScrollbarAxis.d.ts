import type Axis from './Axis';
import type Scrollbar from '../../Stock/Scrollbar/Scrollbar';
import type ScrollbarOptions from '../../Stock/Scrollbar/ScrollbarOptions';
declare module './AxisComposition' {
    interface AxisComposition {
        scrollbar?: ScrollbarAxis['scrollbar'];
    }
}
declare module './AxisType' {
    interface AxisTypeRegistry {
        ScrollbarAxis: ScrollbarAxis;
    }
}
/**
 * Creates scrollbars if enabled.
 * @private
 */
declare class ScrollbarAxis {
    /**
     * Attaches to axis events to create scrollbars if enabled.
     *
     * @private
     *
     * @param AxisClass
     * Axis class to extend.
     *
     * @param ScrollbarClass
     * Scrollbar class to use.
     */
    static compose<T extends typeof Axis>(AxisClass: T, ScrollbarClass: typeof Scrollbar): (T & ScrollbarAxis);
}
interface ScrollbarAxis extends Axis {
    options: Axis['options'] & ScrollbarAxis.Options;
    scrollbar: Scrollbar;
}
declare namespace ScrollbarAxis {
    interface Options {
        scrollbar?: ScrollbarOptions;
    }
}
export default ScrollbarAxis;
