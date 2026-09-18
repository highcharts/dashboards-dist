import type Accessibility from '../../Accessibility';
import type Point from '../../../Core/Series/Point';
declare module '../../../Core/Series/PointBase' {
    interface PointBase {
        /** @requires modules/accessibility */
        hasMockGraphic?: boolean;
    }
}
/**
 * @private
 */
declare function compose(PointClass: typeof Point): void;
/**
 * Return string with information about point.
 * @private
 */
declare function defaultPointDescriptionFormatter(point: Accessibility.PointComposition): string;
/**
 * Return string with information about series.
 * @private
 */
declare function defaultSeriesDescriptionFormatter(series: Accessibility.SeriesComposition): string;
/**
 * Put accessible info on series and points of a series.
 * @param {Highcharts.Series} series The series to add info on.
 */
declare function describeSeries(series: Accessibility.SeriesComposition): void;
declare const SeriesDescriber: {
    compose: typeof compose;
    defaultPointDescriptionFormatter: typeof defaultPointDescriptionFormatter;
    defaultSeriesDescriptionFormatter: typeof defaultSeriesDescriptionFormatter;
    describeSeries: typeof describeSeries;
};
export default SeriesDescriber;
