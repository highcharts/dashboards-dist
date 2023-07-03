import type DataEvent from '../../Data/DataEvent';
import type LineSeries from '../../Series/Line/LineSeries';
import type PointOptions from './PointOptions';
import type SeriesOptions from './SeriesOptions';
import DataTable from '../../Data/DataTable.js';
/**
 * Class to convert Highcharts series data to table and get series data from the
 * table.
 *
 * @private
 */
declare class DataSeriesConverter {
    /**
     * Constructs an instance of the DataSeriesConverter class.
     *
     * @param {DataTable} [table]
     * DataSeriesConverter table to store series data.
     *
     * @param {DataSeriesConverter.Options} [options]
     * DataSeriesConverter options.
     */
    constructor(table?: DataTable, options?: DataSeriesConverter.Options);
    table: DataTable;
    options: DataSeriesConverter.Options;
    /**
     * Registry as record object with series IDs and their
     * meta information instance.
     */
    seriesIdMap: Record<string, DataSeriesConverter.SeriesMeta>;
    /**
     * Array of all series meta information stored in the table.
     */
    seriesMeta: Array<DataSeriesConverter.SeriesMeta>;
    /**
     * Get the specific series data stored in the converter.
     *
     * @param {string} seriesId
     * The id of the series.
     *
     * @return {Array<PointOptions>}
     * Returns an array of series points opitons.
     */
    getSeriesData(seriesId: string): Array<PointOptions>;
    /**
     * Get all series data stored in the converter.
     *
     * @return {Array<SeriesOptions>}
     * Returns an array of series opitons.
     */
    getAllSeriesData(): Array<SeriesOptions>;
    /**
     * Update the converter with passed series options.
     *
     * @param {Array<LineSeries>} allSeries
     * Array of series options to store in the converter.
     *
     * @param {DataEvent.Detail} eventDetail
     * Custom information for pending events.
     */
    updateTable(allSeries: Array<LineSeries>, eventDetail?: DataEvent.Detail): void;
}
declare namespace DataSeriesConverter {
    interface Options {
        seriesOptions?: Array<SeriesOptions>;
    }
    interface SeriesMeta {
        id: string;
        pointArrayMap: Array<string>;
        options: SeriesOptions;
    }
}
export default DataSeriesConverter;
