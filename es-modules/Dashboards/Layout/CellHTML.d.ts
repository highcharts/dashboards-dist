import type Component from '../Components/Component';
/**
 * Checks if a valid cell HTML instance.
 */
export declare function isCellHTML(cellHTML: unknown): cellHTML is CellHTML;
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
     * HTML container of a GUIElement.
     **/
    container: HTMLElement;
    /**
     * Component mounted in the cell.
     **/
    mountedComponent?: Component;
}
export default CellHTML;
