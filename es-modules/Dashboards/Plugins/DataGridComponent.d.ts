import type Cell from '../Layout/Cell';
import type Options from '../../Core/Options';
import type DataGrid from '../../DataGrid/DataGrid';
import type BaseDataGridOptions from '../../DataGrid/DataGridOptions';
import Component from '../Components/Component.js';
/**
 * DataGrid component for Highcharts Dashboards.
 * @private
 */
declare class DataGridComponent extends Component {
    /** @private */
    static syncHandlers: import("../Components/Sync/Sync").default.OptionsRecord;
    /** @private */
    static DataGridConstructor?: typeof DataGrid;
    /** @private */
    static defaultOptions: Partial<Component.ComponentOptions> & {
        dataGridClassName: string;
        dataGridID: string;
        dataGridOptions: {};
        editableOptions: {
            name: string;
            propertyPath: string[];
            type: string;
        }[];
        syncHandlers: import("../Components/Sync/Sync").default.OptionsRecord;
        onUpdate: typeof DataGridComponent.onUpdate;
    };
    /**
     * Default update function, if data grid has changed. This functionality can
     * be replaced with the {@link DataGridComponent.DataGridOptions#onUpdate}
     * option.
     *
     * @private
     *
     * @param e
     * Related keyboard event of the change.
     *
     * @param store
     * Relate store of the change.
     */
    static onUpdate(e: KeyboardEvent, store: Component.ConnectorTypes): void;
    /** @private */
    static fromJSON(json: DataGridComponent.ClassJSON, cell: Cell): DataGridComponent;
    /** @private */
    dataGrid?: DataGrid;
    /** @private */
    dataGridOptions: Partial<Options>;
    /** @private */
    options: DataGridComponent.ComponentOptions;
    /** @private */
    sync: Component['sync'];
    /** @private */
    private connectorListeners;
    constructor(cell: Cell, options: Partial<DataGridComponent.ComponentOptions>);
    /** @private */
    load(): this;
    /** @private */
    render(): this;
    /** @private */
    redraw(): this;
    /** @private */
    resize(width?: number | null, height?: number | null): void;
    update(options: Partial<DataGridComponent.ComponentOptions>): Promise<void>;
    /** @private */
    private constructDataGrid;
    private setupConnectorUpdate;
    /** @private */
    toJSON(): DataGridComponent.ClassJSON;
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
    /**
     * Options to control the DataGrid component.
     */
    interface ComponentOptions extends Component.ComponentOptions {
        /**
         * The style class to add to the rendered data grid container.
         */
        dataGridClassName?: string;
        /**
         * The identifier for the rendered data grid container.
         */
        dataGridID?: string;
        /**
         * Callback to use when a change in the data grid occures.
         */
        onUpdate: typeof DataGridComponent.onUpdate;
        type: 'DataGrid';
        /**
         * Generic options to adjust behavor and styling of the rendered data
         * grid.
         */
        dataGridOptions?: BaseDataGridOptions;
        /**
         * The set of options like `dataGridClassName` and `dataGridID`.
         */
        chartClassName?: string;
        /**
         * The id that is applied to the chart's container.
         */
        chartID?: string;
        /**
         * Names / aliases that should be mapped to xAxis values. You can use
         * null to keep columns selectively out of the chart.
         * ```
         * Example
         * columnAssignment: {
         *      'Food': 'x',
         *      'Vitamin A': 'y'
         * }
         * ```
         */
        columnAssignment?: Record<string, string | null>;
        /** @private */
        tableAxisMap?: Record<string, string | null>;
    }
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
