/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *  - Pawel Lysy
 *  - Karol Kolodziej
 *
 * */
'use strict';
/* *
 *
 *  Imports
 *
 * */
/* *
 *
 *  Namespace
 *
 * */
/**
 * Global DataGrid namespace.
 *
 * @namespace DataGrid
 */
var Globals;
(function (Globals) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    Globals.classNamePrefix = 'highcharts-datagrid-';
    Globals.classNames = {
        gridContainer: Globals.classNamePrefix + 'container',
        outerContainer: Globals.classNamePrefix + 'outer-container',
        scrollContainer: Globals.classNamePrefix + 'scroll-container',
        innerContainer: Globals.classNamePrefix + 'inner-container',
        cell: Globals.classNamePrefix + 'cell',
        cellInput: Globals.classNamePrefix + 'cell-input',
        row: Globals.classNamePrefix + 'row',
        columnHeader: Globals.classNamePrefix + 'column-header'
    };
    Globals.win = window;
    Globals.userAgent = (Globals.win.navigator && Globals.win.navigator.userAgent) || '';
    Globals.isChrome = Globals.win.chrome;
    Globals.isSafari = !Globals.isChrome && Globals.userAgent.indexOf('Safari') !== -1;
})(Globals || (Globals = {}));
/* *
 *
 *  Default Export
 *
 * */
export default Globals;
