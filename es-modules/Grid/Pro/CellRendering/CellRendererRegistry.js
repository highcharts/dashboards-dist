/* *
 *
 *  Cell Renderer Registry
 *
 *  (c) 2020-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *
 * */
'use strict';
/* *
 *
 *  Namespace
 *
 * */
var CellRendererRegistry;
(function (CellRendererRegistry) {
    /* *
     *
     *  Constants
     *
     * */
    /**
     * Record of cell renderer classes
     */
    CellRendererRegistry.types = {};
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Method used to register new cell renderer classes.
     *
     * @param key
     * Registry key of the cell renderer class.
     *
     * @param CellRendererClass
     * Cell renderer class (aka class constructor) to register.
     */
    function registerRenderer(key, CellRendererClass) {
        return (!!key &&
            !CellRendererRegistry.types[key] &&
            !!(CellRendererRegistry.types[key] = CellRendererClass));
    }
    CellRendererRegistry.registerRenderer = registerRenderer;
})(CellRendererRegistry || (CellRendererRegistry = {}));
/* *
 *
 *  Default Export
 *
 * */
export default CellRendererRegistry;
