/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Karol Kolodziej
 *  - Dawid Dragula
 *
 * */
'use strict';
import GridComponent from '../Components/DataGridComponent/DataGridComponent.js';
/* *
 *
 *  Functions
 *
 * */
/**
 * Connects DataGrid with the Dashboard plugin.
 *
 * @param DataGridNS
 * DataGrid core to connect.
 *
 * @deprecated
 * DataGrid will be removed in behalf of Grid in the next major version.
 */
function connectDataGrid(DataGridNS) {
    connectGrid(DataGridNS);
}
/**
 * Connects DataGrid with the Dashboard plugin.
 *
 * @param GridNS
 * Grid core to connect.
 */
function connectGrid(GridNS) {
    GridComponent.GridNamespace = GridNS;
}
/**
 * Callback function of the Dashboard plugin.
 *
 * @param {Dashboards.PluginHandler.Event} e
 * Plugin context provided by the Dashboard.
 */
function onRegister(e) {
    const { ComponentRegistry } = e;
    ComponentRegistry.registerComponent('DataGrid', GridComponent);
    ComponentRegistry.registerComponent('Grid', GridComponent);
}
/**
 * Callback function of the Dashboard plugin.
 *
 * @param {Dashboard.PluginHandler.Event} e Plugin context provided by the Dashboard.
 */
function onUnregister(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
e) { }
/* *
 *
 *  Default Export
 *
 * */
const DataGridCustom = {
    connectDataGrid,
    connectGrid
};
const DataGridPlugin = {
    custom: DataGridCustom,
    name: 'DataGrid.DashboardsPlugin',
    onRegister,
    onUnregister
};
export default DataGridPlugin;
