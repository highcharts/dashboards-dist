import type { AxisAccessibilityOptions, SeriesAccessibilityOptions } from './A11yOptions';
import Chart from '../../Core/Chart/Chart.js';
declare module '../../Core/Axis/AxisOptions' {
    interface AxisOptions {
        /** @deprecated */
        description?: AxisAccessibilityOptions['description'];
    }
}
declare module '../../Core/Options' {
    interface Options {
        /** @deprecated */
        exposeElementToA11y?: SeriesAccessibilityOptions['exposeAsGroupOnly'];
    }
}
/**
 * Copy options that are deprecated over to new options. Logs warnings to
 * console if deprecated options are used.
 *
 * @private
 */
declare function copyDeprecatedOptions(chart: Chart): void;
export default copyDeprecatedOptions;
