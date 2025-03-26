import type Board from '../../Board';
import type Cell from '../../Layout/Cell';
import type { Grid, GridNamespace } from '../../Plugins/DataGridTypes';
import type Options from './DataGridComponentOptions';
import Component from '../Component.js';
import SidebarPopup from '../../EditMode/SidebarPopup';
/**
 * Grid Component for Highcharts Dashboards.
 * @private
 */
declare class DataGridComponent extends Component {
    /**
     * Predefined sync config for the Grid Component.
     */
    static predefinedSyncConfig: import("../Sync/Sync").default.PredefinedSyncConfig;
    /**
     * The namespace of the Grid Component.
     * @deprecated
     * DataGrid will be removed in behalf of Grid in the next major version.
     */
    static get DataGridNamespace(): GridNamespace | undefined;
    /**
     * The namespace of the Grid Component.
     */
    static GridNamespace?: GridNamespace;
    /**
     * The default options for the Grid Component.
     */
    static defaultOptions: Partial<Component.Options> & import("../../Globals").default.DeepPartial<Options>;
    /**
     * Function to create a Grid Component from JSON.
     *
     * @param json
     * The JSON to create the Grid Component from.
     *
     * @param cell
     * The cell to create the Grid Component in.
     *
     * @returns
     * The Grid Component created from the JSON.
     */
    static fromJSON(json: DataGridComponent.ClassJSON, cell: Cell): DataGridComponent;
    /**
     * The Grid that is rendered in the Grid Component.
     * @deprecated
     * DataGrid will be removed in behalf of Grid in the next major version.
     */
    get dataGrid(): Grid | undefined;
    /**
     * The Grid that is rendered in the Grid Component.
     */
    grid?: Grid;
    /**
     * The options of the Grid Component.
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
     * Get the Grid Component's options.
     *
     * @returns
     * Grid Component's options.
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
     * Function to create the Grid.
     *
     * @returns The Grid.
     */
    private constructGrid;
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
        gridOptions?: string;
        /** @private */
        gridClassName?: string;
        /**
         * @private
         * @deprecated
         **/
        dataGridOptions?: string;
        /**
         * @private
         * @deprecated
         **/
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
