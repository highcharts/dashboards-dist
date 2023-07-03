import type DataGrid from '../../DataGrid/DataGrid';
import type PluginHandler from '../PluginHandler';
import DataGridComponent from './DataGridComponent.js';
declare module '../Components/ComponentType' {
    interface ComponentTypeRegistry {
        DataGrid: typeof DataGridComponent;
    }
}
/**
 * Connects DataGrid with the Dashboard plugin.
 *
 * @param {Highcharts} dataGrid DataGrid core to connect.
 */
declare function connectDataGrid(DataGridClass: typeof DataGrid): void;
declare const DataGridCustom: {
    connectDataGrid: typeof connectDataGrid;
};
declare const DataGridPlugin: PluginHandler.DashboardPlugin<typeof DataGridCustom>;
export default DataGridPlugin;
