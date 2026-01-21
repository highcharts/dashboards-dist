export declare function getMargins(element: HTMLElement, includeBorders?: boolean): {
    x: number;
    y: number;
};
export declare function getPaddings(element: HTMLElement): {
    x: number;
    y: number;
};
export declare function getStyles(element: HTMLElement, styles: Array<keyof CSSStyleDeclaration>): string[];
export declare function sumPixels(accumulator: number, value: (string | number | undefined)): number;
declare const ComponentUtilities: {
    getMargins: typeof getMargins;
    getPaddings: typeof getPaddings;
    getStyles: typeof getStyles;
    sumPixels: typeof sumPixels;
};
export default ComponentUtilities;
