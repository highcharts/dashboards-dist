/**
 * The event object for the grid.
 */
export interface GridEvent<T, E extends Event = Event> {
    /**
     * The original browser event.
     */
    originalEvent?: E;
    /**
     * The target of the event.
     */
    target: T;
}
declare namespace GridUtils {
    /**
     * Parameters for the makeHTMLElement utils function.
     */
    interface MakeHTMLElementParameters {
        className?: string;
        id?: string;
        innerText?: string;
        innerHTML?: string;
        style?: Partial<CSSStyleDeclaration>;
    }
    /**
     * Creates a HTML element with the provided options.
     *
     * @param tagName
     * The tag name of the element.
     *
     * @param params
     * The parameters of the element.
     *
     * @param parent
     * The parent element.
     */
    function makeHTMLElement<T extends HTMLElement>(tagName: string, params?: MakeHTMLElementParameters, parent?: HTMLElement): T;
    /**
     * Creates a div element with the provided class name and id.
     *
     * @param className
     * The class name of the div.
     *
     * @param id
     * The id of the element.
     */
    function makeDiv(className: string, id?: string): HTMLElement;
    /**
     * Check if there's a possibility that the given string is an HTML
     * (contains '<').
     *
     * @param str
     * Text to verify.
     */
    function isHTML(str: string): boolean;
    /**
     * Returns a string containing plain text format by removing HTML tags
     *
     * @param text
     * String to be sanitized
     *
     * @returns
     * Sanitized plain text string
     */
    function sanitizeText(text: string): string;
    /**
     * Sets an element's content, checking whether it is HTML or plain text.
     * Should be used instead of element.innerText when the content can be HTML.
     *
     * @param element
     * Parent element where the content should be.
     *
     * @param content
     * Content to render.
     */
    function setHTMLContent(element: HTMLElement, content: string): void;
}
export default GridUtils;
