/**
 * @license Highcharts Dashboards v@product.version@ (@product.date@)
 * @module dashboards/modules/dashboards-plugin
 * @requires dashboards
 *
 * (c) 2009-2024 Highsoft AS
 *
 * License: www.highcharts.com/license
 * */
import type { Highcharts as H } from '../../Dashboards/Plugins/HighchartsTypes';
import DataGridPlugin from '../../Dashboards/Plugins/DataGridPlugin.js';
import HighchartsPlugin from '../../Dashboards/Plugins/HighchartsPlugin.js';
declare global {
    interface Dashboards {
        DataGridPlugin: typeof DataGridPlugin;
        HighchartsPlugin: typeof HighchartsPlugin;
    }
    interface Window {
        Highcharts?: H;
    }
}
declare const G: Dashboards;
export default G;
