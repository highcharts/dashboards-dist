import type PluginHandler from '../PluginHandler';
import type { Highcharts as H } from './HighchartsTypes';
import HighchartsComponent from '../Components/HighchartsComponent/HighchartsComponent.js';
import KPIComponent from '../Components/KPIComponent/KPIComponent.js';
import NavigatorComponent from '../Components/NavigatorComponent/NavigatorComponent.js';
declare module '../Components/ComponentType' {
    interface ComponentTypeRegistry {
        Highcharts: typeof HighchartsComponent;
        KPI: typeof KPIComponent;
        Navigator: typeof NavigatorComponent;
    }
}
/**
 * Connects Highcharts core with the Dashboard plugin.
 *
 * @param {Highcharts} highcharts
 * Highcharts core to connect.
 */
declare function connectHighcharts(highcharts: H): void;
declare const HighchartsCustom: {
    connectHighcharts: typeof connectHighcharts;
};
declare const HighchartsPlugin: PluginHandler.DashboardsPlugin<typeof HighchartsCustom>;
export default HighchartsPlugin;
