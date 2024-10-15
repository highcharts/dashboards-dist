import type Board from '../../Board';
import type Cell from '../../Layout/Cell';
import type { DataGrid, DataGridNamespace } from '../../Plugins/DataGridTypes';
import type Options from './DataGridComponentOptions';
import Component from '../Component.js';
import SidebarPopup from '../../EditMode/SidebarPopup';
/**
 * DataGrid component for Highcharts Dashboards.
 * @private
 */
declare class DataGridComponent extends Component {
    /**
     * Predefined sync config for the DataGrid component.
     */
    static predefinedSyncConfig: import("../Sync/Sync").default.PredefinedSyncConfig;
    /**
     * The namespace of the DataGrid component.
     */
    static DataGridNamespace?: DataGridNamespace;
    /**
     * The default options for the DataGrid component.
     */
    static defaultOptions: Partial<Component.Options> & import("../../Globals").default.DeepPartial<Options>;
    /**
     * Function to create a DataGrid component from JSON.
     *
     * @param json
     * The JSON to create the DataGrid component from.
     *
     * @param cell
     * The cell to create the DataGrid component in.
     *
     * @returns
     * The DataGrid component created from the JSON.
     */
    static fromJSON(json: DataGridComponent.ClassJSON, cell: Cell): DataGridComponent;
    /**
     * The DataGrid that is rendered in the DataGrid component.
     */
    dataGrid?: DataGrid;
    /**
     * The options of the DataGrid component.
     */
    options: Options;
    constructor(cell: Cell, options: Partial<Options>, board?: Board);
    update(options: Partial<Options>): Promise<void>;
    render(): this;
    resize(width?: number | string | null, height?: number | string | null): void;
    onTableChanged(): void;
    getEditableOptions(): Options;
    getOptionsOnDrop(sidebar: SidebarPopup): Partial<Options>;
    /**
     * Get the DataGrid component's options.
     *
     * @returns
     * The JSON of DataGrid component's options.
     *
     * @internal
     */
    getOptions(): Partial<Options>;
    /**
     * Destroys the data grid component.
     */
    destroy(): void;
    /**
     * Sets the options for the data grid component content container.
     */
    private setOptions;
    /**
     * Function to create the DataGrid.
     *
     * @returns The DataGrid.
     */
    private constructDataGrid;
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
        dataGridClassName?: string;
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
