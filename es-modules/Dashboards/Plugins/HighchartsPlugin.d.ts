import type PluginHandler from '../PluginHandler';
import type G from '../../Core/Globals';
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
declare function connectHighcharts(highcharts: typeof G): void;
declare const HighchartsCustom: {
    connectHighcharts: typeof connectHighcharts;
};
declare const HighchartsPlugin: PluginHandler.DashboardPlugin<typeof HighchartsCustom>;
export default HighchartsPlugin;
