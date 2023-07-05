/**
 * @license Highcharts Dashboards v1.0.0 (2023-07-04)
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
import Globals from '../DataGrid/Globals.js';
import DataGrid from '../DataGrid/DataGrid.js';
/* *
 *
 *  Namespace
 *
 * */
const G = Globals;
G.win = window;
G.DataGrid = DataGrid;
/* *
 *
 *  Classic Export
 *
 * */
if (!G.win.DataGrid) {
    G.win.DataGrid = G;
}
/* *
 *
 *  Default Export
 *
 * */
export default G;