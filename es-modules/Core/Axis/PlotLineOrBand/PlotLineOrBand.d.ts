import type { PlotBandLabelOptions, PlotBandOptions } from './PlotBandOptions';
import type { PlotLineLabelOptions, PlotLineOptions } from './PlotLineOptions';
import type SVGElement from '../../Renderer/SVG/SVGElement';
import type SVGPath from '../../Renderer/SVG/SVGPath';
import Axis from '../Axis.js';
import PlotLineOrBandAxis from './PlotLineOrBandAxis.js';
/**
 * The object wrapper for plot lines and plot bands
 *
 * @class
 * @name Highcharts.PlotLineOrBand
 *
 * @param {Highcharts.Axis} axis
 * Related axis.
 *
 * @param {Highcharts.AxisPlotLinesOptions|Highcharts.AxisPlotBandsOptions} [options]
 * Options to use.
 */
declare class PlotLineOrBand {
    static compose<T extends typeof Axis>(AxisClass: T): ReturnType<typeof PlotLineOrBandAxis.compose>;
    constructor(axis: PlotLineOrBandAxis.Composition, options?: (PlotBandOptions | PlotLineOptions));
    axis: PlotLineOrBandAxis.Composition;
    id?: string;
    isActive?: boolean;
    eventsAdded?: boolean;
    label?: SVGElement;
    options?: (PlotBandOptions | PlotLineOptions);
    svgElem?: SVGElement;
    /**
     * Render the plot line or plot band. If it is already existing,
     * move it.
     * @private
     * @function Highcharts.PlotLineOrBand#render
     */
    render(): (PlotLineOrBand | undefined);
    /**
     * Render and align label for plot line or band.
     * @private
     * @function Highcharts.PlotLineOrBand#renderLabel
     */
    renderLabel(optionsLabel: (PlotBandLabelOptions | PlotLineLabelOptions), path: SVGPath, isBand?: boolean, zIndex?: number): void;
    /**
     * Get label's text content.
     * @private
     * @function Highcharts.PlotLineOrBand#getLabelText
     */
    getLabelText(optionsLabel: (PlotBandLabelOptions | PlotLineLabelOptions)): string | undefined;
    /**
     * Remove the plot line or band.
     *
     * @function Highcharts.PlotLineOrBand#destroy
     */
    destroy(): void;
}
declare namespace PlotLineOrBand {
    type Axis = PlotLineOrBandAxis.Composition;
}
export default PlotLineOrBand;
