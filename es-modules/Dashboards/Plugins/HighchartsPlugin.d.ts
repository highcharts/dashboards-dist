import type PluginHandler from '../PluginHandler';
import type { Highcharts } from './HighchartsTypes';
import HighchartsComponent from './HighchartsComponent.js';
declare module '../Components/ComponentType' {
    interface ComponentTypeRegistry {
        Highcharts: typeof HighchartsComponent;
    }
}
/**
 * Connects Highcharts core with the Dashboard plugin.
 *
 * @param {Highcharts} highcharts
 * Highcharts core to connect.
 */
declare function connectHighcharts(highcharts: typeof Highcharts): void;
declare const HighchartsCustom: {
    connectHighcharts: typeof connectHighcharts;
};
declare const HighchartsPlugin: PluginHandler.DashboardsPlugin<typeof HighchartsCustom>;
export default HighchartsPlugin;
