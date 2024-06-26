import type { XAxisOptions } from './Axis/AxisOptions';
import type { ChartOptions } from './Chart/ChartOptions';
import type { SeriesOptions } from './Series/SeriesOptions';
import type { LegendOptions } from './Legend/LegendOptions';
import Axis from './Axis/Axis.js';
import Chart from './Chart/Chart.js';
import Legend from './Legend/Legend.js';
import Series from './Series/Series.js';
declare namespace Foundation {
    /**
     * Register event options. If an event handler is set on the options, it
     * should be subject to Chart.update, Axis.update and Series.update. This is
     * contrary to general handlers that are set directly using addEvent either
     * on the class or on the instance. #6538, #6943, #10861.
     * @private
     */
    function registerEventOptions(component: Axis | Chart | Legend | Series, options: XAxisOptions | ChartOptions | LegendOptions | SeriesOptions): void;
}
export default Foundation;
