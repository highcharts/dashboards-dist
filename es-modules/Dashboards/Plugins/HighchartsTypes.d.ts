import type * as H from 'highcharts';
export declare namespace Axis {
    interface ExtremesObject {
        dataMax: number;
        dataMin: number;
        max: number;
        min: number;
        userMax?: number;
        userMin?: number;
    }
}
export type Axis = H.Axis;
export type AxisOptions = H.AxisOptions;
export type Chart = H.Chart;
export type Highcharts = typeof H;
export type Options = H.Options;
export type Point = H.Point;
export type Series = H.Series;
export type SeriesOptions = H.SeriesOptions;
export default H;
