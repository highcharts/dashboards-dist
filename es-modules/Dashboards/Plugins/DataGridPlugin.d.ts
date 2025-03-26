import type { DataGridNamespace, GridNamespace } from './DataGridTypes';
import type PluginHandler from '../PluginHandler';
import GridComponent from '../Components/DataGridComponent/DataGridComponent.js';
declare module '../Components/ComponentType' {
    interface ComponentTypeRegistry {
        /**
         * @deprecated
         * DataGrid will be removed in behalf of Grid in the next major version.
         */
        DataGrid: typeof GridComponent;
        Grid: typeof GridComponent;
    }
}
/**
 * Connects DataGrid with the Dashboard plugin.
 *
 * @param DataGridNS
 * DataGrid core to connect.
 *
 * @deprecated
 * DataGrid will be removed in behalf of Grid in the next major version.
 */
declare function connectDataGrid(DataGridNS: DataGridNamespace): void;
/**
 * Connects DataGrid with the Dashboard plugin.
 *
 * @param GridNS
 * Grid core to connect.
 */
declare function connectGrid(GridNS: GridNamespace): void;
declare const DataGridCustom: {
    connectDataGrid: typeof connectDataGrid;
    connectGrid: typeof connectGrid;
};
declare const DataGridPlugin: PluginHandler.DashboardsPlugin<typeof DataGridCustom>;
export default DataGridPlugin;
