import type Component from '../Components/Component';
import GUIElement from './GUIElement.js';
/**
 * @internal
 **/
declare class CellHTML extends GUIElement {
    /**
     * Constructs an instance of the CellHTML class.
     *
     * @param {Cell.Options} options
     * Options for the cell.
     */
    constructor(options: CellHTML.Options);
    /**
     * HTML container of a GUIElement.
     */
    container: HTMLElement;
    /**
     * Cell id.
     */
    id: string;
    /**
     * Component mounted in the cell.
     */
    mountedComponent?: Component;
    /**
     * The cell options.
     */
    options: CellHTML.Options;
    /**
     * The type of a GUIElement instance.
     */
    protected type: "cell-html";
    /**
     * Destroy the element, its container, event hooks
     * and mounted component.
     */
    destroy(): void;
    /**
     * Highlight the cell.
     */
    setHighlight(): void;
    setActiveState(): void;
}
declare namespace CellHTML {
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
         * HTML container of a GUIElement.
         **/
        container: HTMLElement;
        /**
         * Component mounted in the cell.
         **/
        mountedComponent?: Component;
    }
}
export default CellHTML;
