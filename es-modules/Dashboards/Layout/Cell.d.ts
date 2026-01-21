import type CSSJSONObject from '../CSSJSONObject';
import type { Options as LayoutOptions } from './Layout';
import type CellHTML from './CellHTML.js';
/**
 * Checks if a valid cell instance.
 */
export declare function isCell(cell: Cell | CellHTML | undefined): cell is Cell;
/**
 * Options for each cell.
 **/
export interface Options {
    /**
     * Unique cell id.
     **/
    id: string;
    /**
     * Options controlling the edit mode for the cell.
     **/
    editMode?: {
        /**
         * Individual options for the toolbar items.
         **/
        toolbarItems?: {
            /**
             * Options for the `destroy` toolbar item.
             */
            destroy: {
                enabled?: boolean;
            };
            /**
             * Options for the `drag` toolbar item.
             */
            drag: {
                enabled?: boolean;
            };
            /**
             * Options for the `settings` toolbar item.
             */
            settings: {
                enabled?: boolean;
            };
            /**
             * Options for the `viewFullscreen` toolbar item.
             */
            viewFullscreen: {
                enabled?: boolean;
            };
        };
    };
    /**
     * CSS styles for cell container.
     **/
    style?: CSSJSONObject;
    /**
     * Id of the container that holds the cell.
     **/
    parentContainerId?: string;
    /**
     * To create a nested layout, add a layout object to a cell.
     *
     * Try it:
     *
     * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/gui/nested-layout/ | Nested layout}
     **/
    layout?: LayoutOptions;
}
export default Cell;
