import type Board from '../../Board';
import type Cell from '../../Layout/Cell';
import type { DataGrid, DataGridNamespace } from '../../Plugins/DataGridTypes';
import type BaseDataGridOptions from '../../../DataGrid/DataGridOptions';
import type Options from './DataGridComponentOptions';
import type SidebarPopup from '../../EditMode/SidebarPopup';
import Component from '../Component.js';
/**
 * DataGrid component for Highcharts Dashboards.
 * @private
 */
declare class DataGridComponent extends Component {
    /**
     * Predefined sync config for the DataGrid component.
     */
    static predefinedSyncConfig: import("../Sync/Sync").default.PredefinedSyncConfig;
    /** @private */
    static DataGridNamespace?: DataGridNamespace;
    /** @private */
    static defaultOptions: Partial<Component.Options> & import("../../Globals").default.DeepPartial<Options>;
    /** @private */
    static fromJSON(json: DataGridComponent.ClassJSON, cell: Cell): DataGridComponent;
    /** @private */
    dataGrid?: DataGrid;
    /** @private */
    dataGridOptions: Partial<BaseDataGridOptions>;
    /** @private */
    options: Options;
    /** @private */
    private connectorListeners;
    constructor(cell: Cell, options: Partial<Options>, board?: Board);
    onTableChanged(): void;
    /**
     * Disable editing of the columns that are modified by the data modifier.
     * @internal
     *
     * @param connector
     * Attached connector
     */
    private disableEditingModifiedColumns;
    /**
     * Get the column options for the data grid.
     * @internal
     */
    private getColumnOptions;
    /**
     * Triggered on component initialization.
     * @private
     */
    load(): Promise<this>;
    /** @private */
    render(): this;
    /** @private */
    resize(width?: number | null, height?: number | null): void;
    update(options: Partial<Options>): Promise<void>;
    /** @private */
    private constructDataGrid;
    private setupConnectorUpdate;
    /**
     * Based on the `visibleColumns` option, filter the columns of the table.
     *
     * @internal
     */
    private filterColumns;
    getOptionsOnDrop(sidebar: SidebarPopup): Partial<Options>;
    /** @private */
    toJSON(): DataGridComponent.ClassJSON;
    /**
     * Get the DataGrid component's options.
     * @returns
     * The JSON of DataGrid component's options.
     *
     * @internal
     *
     */
    getOptions(): Partial<Options>;
    /**
     * Destroys the data grid component.
     */
    destroy(): void;
}
declare namespace DataGridComponent {
    /** @private */
    type ComponentType = DataGridComponent;
    /** @private */
    type ChartComponentEvents = JSONEvent | Component.EventTypes;
    /** @private */
    type JSONEvent = Component.Event<'toJSON' | 'fromJSON', {
        json: ClassJSON;
    }>;
    /** @private */
    interface ComponentJSONOptions extends Component.ComponentOptionsJSON {
        /** @private */
        dataGridOptions?: string;
        /** @private */
        chartClassName?: string;
        /** @private */
        chartID?: string;
    }
    /** @private */
    interface ClassJSON extends Component.JSON {
        /** @private */
        options: ComponentJSONOptions;
    }
}
export default DataGridComponent;
