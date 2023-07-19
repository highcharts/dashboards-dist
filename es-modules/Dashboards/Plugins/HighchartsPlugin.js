/* *
 *
 *  (c) 2009-2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */
'use strict';
import HighchartsComponent from './HighchartsComponent.js';
import KPIComponent from '../Components/KPIComponent.js';
import HighchartsSyncHandlers from './HighchartsSyncHandlers.js';
/* *
 *
 *  Functions
 *
 * */
/**
 * Connects Highcharts core with the Dashboard plugin.
 *
 * @param {Highcharts} highcharts
 * Highcharts core to connect.
 */
function connectHighcharts(highcharts) {
    HighchartsComponent.charter = highcharts;
    KPIComponent.charter = highcharts;
}
/**
 * Callback function of the Dashboard plugin.
 *
 * @param {Dashboards.PluginHandler.Event} e
 * Plugin context provided by the Dashboard.
 */
function onRegister(e) {
    const { Sync, ComponentRegistry } = e;
    ComponentRegistry.registerComponent('Highcharts', HighchartsComponent);
    ComponentRegistry.registerComponent('KPI', KPIComponent);
    Sync.defaultHandlers = Object.assign(Object.assign({}, Sync.defaultHandlers), HighchartsSyncHandlers);
}
/**
 * Callback function of the Dashboard plugin.
 *
 * @param {Dashboard.PluginHandler.Event} e
 * Plugin context provided by the Dashboard.
 */
function onUnregister(e) {
    const { Sync } = e;
    Object
        .keys(HighchartsSyncHandlers)
        .forEach((handler) => {
        if (Sync.defaultHandlers[handler] ===
            HighchartsSyncHandlers[handler]) {
            delete Sync.defaultHandlers[handler];
        }
    });
}
/* *
 *
 *  Default Export
 *
 * */
const HighchartsCustom = {
    connectHighcharts
};
const HighchartsPlugin = {
    custom: HighchartsCustom,
    name: 'Highcharts.DashboardsPlugin',
    onRegister,
    onUnregister
};
export default HighchartsPlugin;
