import type Component from '../Components/Component.js';
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
