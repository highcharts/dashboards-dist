import type CSSJSONObject from '../CSSJSONObject';
import type { Options as CellOptions } from './Cell';
/**
 * Options for the row.
 **/
export interface Options {
    /**
     * A unique id for the row.
     **/
    id?: string;
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
     * The id of the container element.
     **/
    parentContainerId?: string;
    /**
     * An array of cells to be added to the row.
     **/
    cells?: Array<CellOptions>;
    /**
     * CSS styles for the row.
     **/
    style?: CSSJSONObject;
}
export default Row;
