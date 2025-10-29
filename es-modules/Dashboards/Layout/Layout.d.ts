import type CSSJSONObject from '../CSSJSONObject';
import Row from './Row.js';
interface Layout {
    options: Layout.Options;
}
declare namespace Layout {
    /**
     * Each layout's options.
     **/
    interface Options {
        /**
         * Unique id of the layout.
         **/
        id?: string;
        /**
         * The class name of the layout container.
         **/
        layoutClassName?: string;
        /**
         * The class name applied to each row that is in that exact layout.
         * Note that the layout container is also treated as a row thus this
         * class is also being applied to the layout container.
         **/
        rowClassName?: string;
        /**
         * The class name applied to each cell that is in that exact layout.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/gui/cell-class-name/ | Set cell class names}
         **/
        cellClassName?: string;
        /**
         * An array of rows. Each row can contain an array of cells.
         **/
        rows?: Array<Row.Options>;
        /**
         * CSS styles of the layout.
         **/
        style?: CSSJSONObject;
    }
}
export default Layout;
