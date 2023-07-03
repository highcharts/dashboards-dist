import type AnimationOptions from '../Animation/AnimationOptions';
import type Series from './Series';
import DataTable from '../../Data/DataTable.js';
declare module './SeriesLike' {
    interface SeriesLike {
        datas?: DataSeriesAdditions;
    }
}
declare module './SeriesOptions' {
    interface SeriesOptions {
        dataAsColumns?: boolean;
    }
}
export declare class DataSeriesComposition extends Series {
    datas: DataSeriesAdditions;
}
declare class DataSeriesAdditions {
    /**
     * @private
     */
    static compose(SeriesClass: typeof Series): void;
    constructor(series: DataSeriesComposition);
    private indexAsX?;
    series: DataSeriesComposition;
    table: DataTable;
    private unlisteners;
    /**
     * Triggers processing and redrawing
     * @private
     */
    processTable(redraw?: boolean, animation?: (boolean | Partial<AnimationOptions>)): void;
    /**
     * Experimental integration of the data layer
     * @private
     */
    setTable(table: DataTable, redraw?: boolean, animation?: (boolean | Partial<AnimationOptions>)): void;
    /**
     * Stops synchronisation of table changes with series.
     * @private
     */
    syncOff(): void;
    /**
     * Activates synchronization of table changes with series.
     * @private
     */
    syncOn(): void;
}
export default DataSeriesAdditions;
