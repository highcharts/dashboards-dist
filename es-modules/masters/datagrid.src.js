/**
 * @license Highcharts Dashboards v0.0.2 (2023-07-03)
 * @module dashboards/datagrid
 * @requires dashboards
 *
 * (c) 2009-2023 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
'use strict';
/* *
 *
 *  Imports
 *
 * */
import DataGrid from '../DataGrid/DataGrid.js';
/* *
 *
 *  Namespace
 *
 * */
const DG = {
    win: window,
    DataGrid
};
/* *
 *
 *  Classic Exports
 *
 * */
if (!DG.win.DataGrid) {
    DG.win.DataGrid = DG;
}
export default DG;
