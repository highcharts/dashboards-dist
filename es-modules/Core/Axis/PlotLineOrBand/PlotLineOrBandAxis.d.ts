import type Axis from '../Axis';
import type PlotBandOptions from './PlotBandOptions';
import type PlotLineOptions from './PlotLineOptions';
import type PlotLineOrBand from './PlotLineOrBand';
import type SVGPath from '../../Renderer/SVG/SVGPath';
declare module '../AxisOptions' {
    interface AxisOptions {
        plotBands?: Array<PlotBandOptions>;
        plotLines?: Array<PlotLineOptions>;
    }
}
declare namespace PlotLineOrBandAxis {
    class Composition extends Axis {
        addPlotBand(options: PlotBandOptions): (PlotLineOrBand | undefined);
        addPlotBandOrLine(options: PlotBandOptions, coll?: 'plotBands'): (PlotLineOrBand | undefined);
        addPlotBandOrLine(options: PlotLineOptions, coll?: 'plotLines'): (PlotLineOrBand | undefined);
        addPlotLine(options: PlotLineOptions): (PlotLineOrBand | undefined);
        getPlotBandPath(from: number, to: number, options?: (PlotBandOptions | PlotLineOptions)): SVGPath;
        removePlotBand(id: string): void;
        removePlotBandOrLine(id: string): void;
        removePlotLine(id: string): void;
    }
    /**
     * @private
     */
    function compose<T extends typeof Axis>(PlotLineOrBandType: typeof PlotLineOrBand, AxisClass: T): (T & typeof Composition);
}
export default PlotLineOrBandAxis;
