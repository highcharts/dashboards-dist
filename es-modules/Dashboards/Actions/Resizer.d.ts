import type { HTMLDOMElement } from '../../Core/Renderer/DOMElementType';
import type { JSONObject } from '../JSON';
import type Cell from '../Layout/Cell.js';
import type { JSON as SerializableJSON } from '../Serializable';
import EditMode from '../EditMode/EditMode';
/**
 * Class providing a resizing functionality.
 */
declare class Resizer {
    protected static readonly defaultOptions: Options;
    /**
     * Constructor for the Resizer class.
     *
     * @param {EditMode} editMode
     * The parent editMode reference.
     *
     * @param {Options} options
     * Options for the Resizer.
     */
    constructor(editMode: EditMode, options?: Options);
    /**
     * The editMode reference.
     */
    editMode: EditMode;
    /**
     * Resizer options.
     */
    options: Options;
    /**
     * Resized element reference.
     */
    currentCell: Cell | undefined;
    /**
     * Dimension of current resizing (x or y).
     */
    currentDimension: string | undefined;
    /**
     * Type of resizing.
     */
    isX: boolean;
    /**
     * Type of resizing.
     */
    isY: boolean;
    /**
     * Reference to right handler
     */
    snapRight: HTMLDOMElement | undefined;
    /**
     * Reference to bottom handler
     */
    snapBottom: HTMLDOMElement | undefined;
    /**
     * Pending resizer flag
     */
    isActive: boolean;
    /**
     * Reference to start position of resizer
     */
    startX: number;
    /**
     * Array of siblings which have auto-flex width and we need to apply static
     * width for resizing event. After resizing cells revert widths to auto.
     */
    tempSiblingsWidth: Array<Cell>;
    /**
     * Add Snap - create snaps and add events.
     *
     */
    addSnaps(): void;
    /**
     * Hide snaps
     *
     */
    disableResizer(): void;
    /**
     * Update snap position.
     *
     * @param cell
     * Cell reference
     */
    setSnapPositions(cell: Cell): void;
    /**
     * Method detects siblings and auto-width applied by flex. The resizer
     * requires static widths for correct calculations, so we need to apply
     * temporary width on siblings.
     */
    setTempWidthSiblings(): void;
    /**
     * Revert widths to auto.
     */
    revertSiblingsAutoWidth(): void;
    /**
     * Add mouse events to snaps
     *
     */
    addResizeEvents(): void;
    /**
     * General method used on resizing.
     *
     * @param {global.Event} e
     * A mouse event.
     *
     */
    onMouseMove(e: PointerEvent): void;
    /**
     * Destroy resizer
     */
    destroy(): void;
}
interface Resizer {
    mouseDownSnapX?: Function;
    mouseDownSnapY?: Function;
    mouseMoveSnap?: Function;
    mouseUpSnap?: Function;
}
/**
 * Resizer options
 */
export interface Options {
    /**
     * Weather the resizer is enabled or not.
     *
     * Try it:
     *
     * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/edit-mode/resize-disabled/ | Resize disabled}
     */
    enabled: boolean;
    /**
     * Resizer type.
     */
    type: 'x' | 'y' | 'xy';
    /**
     * Options for the snap mechanism.
     */
    snap: SnapOptions;
    /**
     * Style of the snap element.
     */
    styles: ElementStyles;
}
export interface ResizedCell extends Cell {
    resizer?: Snap;
}
/**
 * Style of the snap element.
 */
export interface ElementStyles {
    /**
     * Width of the border on the left side of the element in pixels.
     */
    borderLeft?: number;
    /**
     * Width of the border on the right side of the element in pixels.
     */
    borderRight?: number;
    /**
     * Width of the border on the top side of the element in pixels.
     */
    borderTop?: number;
    /**
     * Width of the border on the bottom side of the element in pixels.
     */
    borderBottom?: number;
    /**
     * Minimum width of the element in pixels.
     */
    minWidth?: number;
    /**
     * Minimum height of the element in pixels.
     */
    minHeight?: number;
}
export interface Snap {
    snapX?: HTMLDOMElement | undefined;
    snapY?: HTMLDOMElement | undefined;
}
/**
 * Options for the snap mechanism.
 */
export interface SnapOptions {
    /**
     * Width of the element in pixels.
     */
    width?: number;
    /**
     * Height of the element in pixels.
     */
    height?: number;
}
export interface JSON extends SerializableJSON<'Dashboards.Action.Resizer'> {
    options: JSONOptions;
}
export interface JSONOptions extends JSONObject {
    enabled: boolean;
    styles: ElementStylesJSON;
    type: 'x' | 'y' | 'xy';
    snap: SnapJSON;
}
export interface SnapJSON extends JSONObject {
    width?: number;
    height?: number;
}
export interface ElementStylesJSON extends JSONObject {
    borderLeft?: number;
    borderRight?: number;
    borderTop?: number;
    borderBottom?: number;
    minWidth?: number;
    minHeight?: number;
}
export interface ResizePointer {
    isVisible: boolean;
    element: HTMLDOMElement;
}
export interface CellSiblings {
    prev: Array<Cell>;
    next: Array<Cell>;
}
export default Resizer;
