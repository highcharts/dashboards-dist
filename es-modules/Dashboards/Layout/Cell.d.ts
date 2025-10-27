import type CSSJSONObject from '../CSSJSONObject';
import type LayoutType from './Layout';
declare namespace Cell {
    /**
     * Checks if a valid cell instance.
     */
    function isCell(cell: unknown): cell is Cell;
    /**
     * Options for each cell.
     **/
    interface Options {
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
                 * Options for the `settings` toolbar item.
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
        layout?: LayoutType.Options;
    }
}
export default Cell;
