declare namespace DataGridUtils {
    /**
     * Parameters for the makeHTMLElement utils function.
     */
    interface MakeHTMLElementParameters {
        className?: string;
        id?: string;
        innerText?: string;
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
     * Gets the translateY value of an element.
     *
     * @param element
     * The element to get the translateY value from.
     *
     * @returns The translateY value of the element.
     */
    function getTranslateY(element: HTMLElement): number;
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
}
export default DataGridUtils;
