/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 * */
'use strict';
/* *
 *
 *  Constants
 *
 * */
/**
 *
 * Record of component classes
 * @todo
 *
 */
export const types = {};
/* *
 *
 *  Functions
 *
 * */
/**
 * Method used to register new component classes.
 *
 * @param {string} key
 * Registry key of the component class.
 *
 * @param {ComponentType} ComponentClass
 * Component class (aka class constructor) to register.
 */
export function registerComponent(key, ComponentClass) {
    return (!!key &&
        !types[key] &&
        !!(types[key] = ComponentClass));
}
/* *
 *
 *  Default Export
 *
 * */
const ComponentRegistry = {
    registerComponent,
    types
};
export default ComponentRegistry;
