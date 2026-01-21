/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  A commercial license may be required depending on use.
 *  See www.highcharts.com/license
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */
'use strict';
/* *
 *
 *  Functions
 *
 * */
export function getMargins(element, includeBorders = true) {
    const borders = {
        x: ['borderLeft', 'borderRight'],
        y: ['borderTop', 'borderBottom']
    };
    return {
        y: getStyles(element, [
            'marginTop',
            'marginBottom',
            ...(includeBorders ? borders.y : [])
        ]).reduce(sumPixels, 0),
        x: getStyles(element, [
            'marginLeft',
            'marginTop',
            ...(includeBorders ? borders.x : [])
        ]).reduce(sumPixels, 0)
    };
}
export function getPaddings(element) {
    return {
        x: getStyles(element, ['paddingLeft', 'paddingRight']).reduce(sumPixels, 0),
        y: getStyles(element, ['paddingTop', 'paddingBottom']).reduce(sumPixels, 0)
    };
}
export function getStyles(element, styles) {
    const elementStyles = window.getComputedStyle(element);
    return styles.map((style) => elementStyles[style]); // Cannot use getPropertyValue?
}
export function sumPixels(accumulator, value) {
    if (value) {
        accumulator += (typeof value === 'number' ? value : parseFloat(value));
    }
    return accumulator;
}
/* *
 *
 *  Default Export
 *
 * */
const ComponentUtilities = {
    getMargins,
    getPaddings,
    getStyles,
    sumPixels
};
export default ComponentUtilities;
