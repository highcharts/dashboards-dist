import type { HTMLDOMElement } from '../../Core/Renderer/DOMElementType';
import type { CSSObject } from '../../Core/Renderer/CSSObject';
import type HTMLAttributes from '../../Core/Renderer/HTML/HTMLAttributes';
declare abstract class GUIElement {
    /**
     * Get offsets of the guiElement relative to the referenceElement or the
     * Viewport.
     *
     * @param guiElement
     * The element to get the offsets from.
     *
     * @param referenceElement
     * The element to get the offsets relative to.
     *
     * @returns
     * The offsets of the guiElement.
     */
    static getOffsets(guiElement: GUIElement, referenceElement?: HTMLDOMElement): GUIElement.Offset;
    /**
     * Get dimensions of the guiElement container from offsets.
     *
     * @param offsets
     * The offsets of the guiElement container.
     *
     * @returns
     * The dimensions of the guiElement container.
     */
    static getDimFromOffsets(offsets: GUIElement.Offset): GUIElement.Dimensions;
    /**
     * Based on the element provided, generate an unique id.
     *
     * @param elementType
     * Type of the element.
     *
     * @returns
     * The unique id.
     */
    static getElementId(elementType: GUIElement.GUIElementType): string;
    /**
     * Get width in percentages (0% - 100%).
     *
     * @param width
     * The width of the element. Supported formats '50%' or '1/2'.
     *
     * @returns
     * The width in percentages.
     */
    static getPercentageWidth(width: string): string | undefined;
    /**
     * HTML container of a GUIElement.
     */
    container?: HTMLDOMElement;
    /**
     * The type of a GUIElement instance.
     */
    protected type?: GUIElement.GUIElementType;
    /**
     * The function to remove bindedGUIElement
     * event on GUIElement container.
     */
    removeBindedEventFn?: Function;
    /**
     * The visibility flag.
     */
    isVisible?: boolean;
    /**
     * Create or get existing HTML element as a GUIElement container.
     *
     * @param {GUIElement.ContainerOptions} options
     * Options.
     *
     * @returns
     * The HTML element for the element container.
     */
    protected getElementContainer(options: GUIElement.GetElementContainerOptions): HTMLElement;
    /**
     * Destroy the element, its container, event hooks and all properties.
     */
    protected destroy(): void;
    /**
     * Return the GUIElement instance type.
     *
     * @returns
     * The GUIElement instance type
     */
    getType(): GUIElement.GUIElementType | undefined;
    protected changeVisibility(setVisible?: boolean, displayStyle?: string): void;
    hide(): void;
    show(): void;
}
declare namespace GUIElement {
    interface GetElementContainerOptions {
        render?: boolean;
        parentContainer?: HTMLDOMElement;
        attribs?: HTMLAttributes;
        style?: CSSObject;
        element?: HTMLElement;
        elementId?: string;
    }
    interface BindedGUIElementEvent extends Event {
        guiElement: GUIElement;
    }
    type GUIElementType = 'row' | 'cell' | 'layout' | 'cell-html' | 'col-nested' | 'col';
    interface Offset {
        left: number;
        top: number;
        right: number;
        bottom: number;
    }
    interface Dimensions {
        width: number;
        height: number;
    }
}
export default GUIElement;
