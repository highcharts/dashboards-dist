/**
 * @license Highcharts Dashboards v@product.version@ (@product.date@)
 * @module dashboards/datagrid
 * @requires dashboards
 *
 * (c) 2009-2023 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
declare global {
    interface Window {
        DataGrid: typeof G;
    }
    let DataGrid: typeof G;
}
declare const G: AnyRecord;
export default G;
