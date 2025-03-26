import type BBoxObject from '../BBoxObject';
import type CSSObject from '../CSSObject';
import type { HTMLDOMElement } from '../DOMElementType';
import type SVGRenderer from '../SVG/SVGRenderer.js';
import SVGElement from '../SVG/SVGElement.js';
declare module '../SVG/SVGRendererLike' {
    interface SVGRendererLike {
        /** @requires Core/Renderer/HTML/HTMLElement */
        html(str: string, x: number, y: number): HTMLElement;
    }
}
declare class HTMLElement extends SVGElement {
    static useForeignObject: boolean | undefined;
    /**
     * Compose
     * @private
     */
    static compose<T extends typeof SVGRenderer>(SVGRendererClass: T): void;
    div?: HTMLDOMElement;
    foreignObject?: SVGElement;
    parentGroup?: SVGElement;
    xCorr?: number;
    yCorr?: number;
    constructor(renderer: SVGRenderer, nodeName: 'span');
    /**
     * Get the correction in X and Y positioning as the element is rotated.
     * @private
     */
    private getSpanCorrection;
    /**
     * Apply CSS to HTML elements. This is used in text within SVG rendering.
     * @private
     */
    css(styles: CSSObject): this;
    /**
     * The useHTML method for calculating the bounding box based on offsets.
     * Called internally from the `SVGElement.getBBox` function and subsequently
     * rotated.
     *
     * @private
     */
    htmlGetBBox(): BBoxObject;
    /**
     * Batch update styles and attributes related to transform
     *
     * @private
     */
    updateTransform(): void;
    /**
     * Add the element to a group wrapper. For HTML elements, a parallel div
     * will be created for each ancenstor SVG `g` element.
     *
     * @private
     */
    add(parentGroup?: SVGElement): this;
    /**
     * Text setter
     * @private
     */
    textSetter(value: string): void;
    /**
     * Align setter
     *
     * @private
     */
    alignSetter(value: 'left' | 'center' | 'right'): void;
    /**
     * Various setters which rely on update transform
     * @private
     */
    xSetter(value: number, key: string): void;
}
interface HTMLElement {
    element: HTMLDOMElement;
}
export default HTMLElement;
