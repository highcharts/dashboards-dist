import type { GridNamespace } from './GridTypes';
import type PluginHandler from '../PluginHandler';
import GridComponent from '../Components/GridComponent/GridComponent.js';
declare module '../Components/ComponentType' {
    interface ComponentTypeRegistry {
        Grid: typeof GridComponent;
    }
}
/**
 * Connects Grid with the Dashboard plugin.
 *
 * @param GridNS
 * Grid core to connect.
 */
declare function connectGrid(GridNS: GridNamespace): void;
declare const GridCustom: {
    connectGrid: typeof connectGrid;
};
declare const GridPlugin: PluginHandler.DashboardsPlugin<typeof GridCustom>;
export default GridPlugin;
