/**
 * @license Highcharts Dashboards v0.0.2 (@product.date@)
 * @module dashboards/datagrid
 * @requires dashboards
 *
 * (c) 2009-2023 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
import DataGrid from '../DataGrid/DataGrid.js';
declare global {
    interface Window {
        DataGrid: typeof DG;
    }
    let DataGrid: typeof DG;
}
declare const DG: {
    win: Window & typeof globalThis;
    DataGrid: typeof DataGrid;
};
export default DG;
