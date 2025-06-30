import type Component from '../Components/Component';
import type CSSJSONObject from '../CSSJSONObject';
import type LayoutType from './Layout';
import type Row from './Row';
import Globals from '../Globals.js';
import GUIElement from './GUIElement.js';
/**
 * @internal
 **/
declare class Cell extends GUIElement {
    /**
     * Constructs an instance of the Cell class.
     *
     * @param {Row} row
     * Reference to the row instance.
     *
     * @param {Cell.Options} options
     * Options for the cell.
     *
     * @param {HTMLElement} cellElement
     * The container of the cell HTML element.
     */
    constructor(row: Row, options: Cell.Options, cellElement?: HTMLElement);
    /**
     * Cell id.
     */
    id: string;
    /**
     * The type of GUI element.
     */
    readonly type?: GUIElement.GUIElementType | undefined;
    /**
     * Reference to the row instance.
     */
    row: Row;
    /**
     * The cell options.
     */
    options: Cell.Options;
    /**
     * Component mounted in the cell.
     */
    mountedComponent?: Component;
    /**
     * Layout nested in the cell.
     */
    nestedLayout?: LayoutType;
    /**
     * Cell highlight flag.
     */
    isHighlighted?: boolean;
    /**
     * HTML container of a GUIElement.
     */
    container: HTMLElement;
    /**
     * Create a nested layout in the cell and assign it to the nestedCell
     * property.
     * @internal
     */
    setNestedLayout(): void;
    /**
     * Destroy the element, its container, event hooks
     * and mounted component.
     */
    destroy(): void;
    /**
     * Get the cell's options.
     * @returns
     * The JSON of cell's options.
     *
     * @internal
     *
     */
    getOptions(): Globals.DeepPartial<Cell.Options>;
    protected changeVisibility(setVisible?: boolean): void;
    getParentCell(level: number): (Cell | undefined);
    getOverlappingLevels(align: 'left' | 'right' | 'top' | 'bottom', levelMaxGap: number, // Max distance between levels
    offset?: number): Array<number>;
    /**
     * Set cell size.
     *
     * @param width
     * % value or 'auto' or px
     *
     * @param height
     * value in px
     */
    setSize(width?: (string | number), height?: (string | number)): void;
    setHighlight(remove?: boolean): void;
    /**
     * Sets the active state of the cell and resets the state of other cells.
     */
    setActiveState(): void;
    /**
     * Enables or disables the loading indicator in the cell.
     *
     * @internal
     */
    setLoadingState(enabled?: boolean): void;
    private convertWidthToValue;
}
declare namespace Cell {
    /**
     * Checks if a valid cell instance.
     */
    function isCell(cell: unknown): cell is Cell;
    /**
     * Responsive options of the cell.
     *
     * @deprecated
     */
    interface CellResponsiveOptions {
        /**
         * The width, that should the cell have in the given responsive mode.
         *
         * @deprecated
         *
         */
        width: (string | number);
    }
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
         * Width of the cell. Can be a percentage value, pixels or a fraction.
         *
         * The fraction converts value into percents like in CSS grid is.
         * For example `1/3` means `33.333%`.
         *
         * @deprecated
         *
         **/
        width?: (string | number);
        /**
         * Height of the cell.
         *
         * @deprecated
         *
         * **/
        height?: (string | number);
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
        /**
         * Options for responsive design.
         *
         * @deprecated
         **/
        responsive?: Record<string, CellResponsiveOptions>;
    }
}
export default Cell;
