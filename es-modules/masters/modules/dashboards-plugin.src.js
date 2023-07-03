/* eslint-disable require-jsdoc */
/**
 * @license Highcharts Dashboards v0.0.3 (2023-07-03)
 * @module dashboards/modules/dashboards-plugin
 * @requires dashboards
 *
 * (c) 2009-2023 Highsoft AS
 *
 * License: www.highcharts.com/license
 * */
'use strict';
import Dashboards from '../../Dashboards/Globals.js';
import HighchartsPlugin from '../../Dashboards/Plugins/HighchartsPlugin.js';
import DataGridPlugin from '../../Dashboards/Plugins/DataGridPlugin.js';
const G = Dashboards;
G.DataGridPlugin = DataGridPlugin;
G.HighchartsPlugin = HighchartsPlugin;
if (G.win.Dashboards) {
    if (G.win.Highcharts) {
        HighchartsPlugin.custom.connectHighcharts(G.win.Highcharts);
        G.win.Dashboards.PluginHandler.addPlugin(HighchartsPlugin);
    }
    if (G.win.DataGrid) {
        DataGridPlugin.custom.connectDataGrid(G.win.DataGrid.DataGrid);
        G.win.Dashboards.PluginHandler.addPlugin(DataGridPlugin);
    }
}
