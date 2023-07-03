import type Series from './Series.js';
import type { SeriesTypeRegistry } from './SeriesType';
declare namespace SeriesRegistry {
    /** @internal */
    let series: typeof Series;
    /**
     * @internal
     * @todo Move `Globals.seriesTypes` code to her.
     */
    const seriesTypes: SeriesTypeRegistry;
    /**
     * Registers class pattern of a series.
     *
     * @private
     */
    function registerSeriesType(seriesType: string, SeriesClass: typeof Series): void;
    /**
     * Old factory to create new series prototypes.
     *
     * @deprecated
     * @function Highcharts.seriesType
     *
     * @param {string} type
     * The series type name.
     *
     * @param {string} parent
     * The parent series type name. Use `line` to inherit from the basic
     * {@link Series} object.
     *
     * @param {Highcharts.SeriesOptionsType|Highcharts.Dictionary<*>} options
     * The additional default options that are merged with the parent's options.
     *
     * @param {Highcharts.Dictionary<*>} [props]
     * The properties (functions and primitives) to set on the new prototype.
     *
     * @param {Highcharts.Dictionary<*>} [pointProps]
     * Members for a series-specific extension of the {@link Point} prototype if
     * needed.
     *
     * @return {Highcharts.Series}
     * The newly created prototype as extended from {@link Series} or its
     * derivatives.
     */
    function seriesType<T extends typeof Series>(type: keyof SeriesTypeRegistry, parent: (keyof SeriesTypeRegistry | undefined), options: T['prototype']['options'], seriesProto?: DeepPartial<T['prototype']>, pointProto?: DeepPartial<T['prototype']['pointClass']['prototype']>): T;
}
export default SeriesRegistry;
