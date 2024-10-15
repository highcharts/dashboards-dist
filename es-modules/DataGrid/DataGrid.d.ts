import type { Options, GroupedHeaderOptions, IndividualColumnOptions } from './Options';
import type Column from './Table/Column';
import Credits from './Credits.js';
import Table from './Table/Table.js';
import DataTable from '../Data/DataTable.js';
import QueryingController from './Querying/QueryingController.js';
import Globals from './Globals.js';
/**
 * Creates a grid structure (table).
 */
declare class DataGrid {
    /**
     * Creates a new data grid.
     *
     * @param renderTo
     * The render target (html element or id) of the data grid.
     *
     * @param options
     * The options of the data grid.
     *
     * @param async
     * Whether to initialize the dashboard asynchronously. When true, the
     * function returns a promise that resolves with the dashboard instance.
     *
     * @return
     * The new data grid.
     */
    static dataGrid(renderTo: string | HTMLElement, options: Options, async?: boolean): DataGrid;
    /**
     * Creates a new data grid.
     *
     * @param renderTo
     * The render target (html element or id) of the data grid.
     *
     * @param options
     * The options of the data grid.
     *
     * @param async
     * Whether to initialize the dashboard asynchronously. When true, the
     * function returns a promise that resolves with the dashboard instance.
     *
     * @return
     * Promise that resolves with the new data grid.
     */
    static dataGrid(renderTo: string | HTMLElement, options: Options, async: true): Promise<DataGrid>;
    /**
     * Default options for all DataGrid instances.
     * @internal
     */
    static readonly defaultOptions: Globals.DeepPartial<Options>;
    /**
     * An array containing the current DataGrid objects in the page.
     */
    static readonly dataGrids: Array<(DataGrid | undefined)>;
    /**
     * The user options declared for the columns as an object of column ID to
     * column options.
     */
    columnOptionsMap: Record<string, Column.Options>;
    /**
     * The container of the data grid.
     */
    container?: HTMLElement;
    /**
     * The content container of the data grid.
     */
    contentWrapper?: HTMLElement;
    /**
     * The credits of the data grid.
     */
    credits?: Credits;
    /**
     * The data source of the data grid. It contains the original data table
     * that was passed to the data grid.
     */
    dataTable?: DataTable;
    /**
     * The presentation table of the data grid. It contains a modified version
     * of the data table that is used for rendering the data grid content. If
     * not modified, just a reference to the original data table.
     */
    presentationTable?: DataTable;
    /**
     * The HTML element of the table.
     */
    tableElement?: HTMLTableElement;
    /**
     * The options of the data grid. Contains the options that were declared
     * by the user and some of the default options.
     */
    options?: Options;
    /**
     * The options that were declared by the user when creating the data grid
     * or when updating it.
     */
    userOptions: Partial<Options>;
    /**
     * The table (viewport) element of the data grid.
     */
    viewport?: Table;
    /**
     * The list of columns that are displayed in the data grid.
     * @internal
     */
    enabledColumns?: string[];
    /**
     * The hovered row index.
     * @internal
     */
    hoveredRowIndex?: number;
    /**
     * The hovered column ID.
     * @internal
     */
    hoveredColumnId?: string;
    /**
     * The querying controller.
     */
    querying: QueryingController;
    /**
     * Constructs a new data grid.
     *
     * @param renderTo
     * The render target (container) of the data grid.
     *
     * @param options
     * The options of the data grid.
     *
     * @param afterLoadCallback
     * The callback that is called after the data grid is loaded.
     */
    constructor(renderTo: string | HTMLElement, options: Options, afterLoadCallback?: DataGrid.AfterLoadCallback);
    /**
     * Initializes the container of the data grid.
     *
     * @param renderTo
     * The render target (html element or id) of the data grid.
     *
     */
    private initContainers;
    /**
     * Loads the new user options to all the important fields (`userOptions`,
     * `options` and `columnOptionsMap`).
     *
     * @param newOptions
     * The options that were declared by the user.
     *
     * @param oneToOne
     * When `false` (default), the existing column options will be merged with
     * the ones that are currently defined in the user options. When `true`,
     * the columns not defined in the new options will be removed.
     */
    private loadUserOptions;
    /**
     * Loads the new column options to the userOptions field.
     *
     * @param newColumnOptions
     * The new column options that should be loaded.
     *
     * @param overwrite
     * Whether to overwrite the existing column options with the new ones.
     * Default is `false`.
     */
    private loadColumnOptions;
    /**
     * Loads the new column options to the userOptions field in a one-to-one
     * manner. It means that all the columns that are not defined in the new
     * options will be removed.
     *
     * @param newColumnOptions
     * The new column options that should be loaded.
     */
    private loadColumnOptionsOneToOne;
    update(options?: Options, render?: boolean, oneToOne?: boolean): Promise<void>;
    update(options: Options, render: false, oneToOne?: boolean): void;
    updateColumn(columnId: string, options: Omit<IndividualColumnOptions, 'id'>, render?: boolean, overwrite?: boolean): void;
    updateColumn(columnId: string, options: Omit<IndividualColumnOptions, 'id'>, render: true, overwrite?: boolean): Promise<void>;
    /**
     * Hovers the row with the provided index. It removes the hover effect from
     * the previously hovered row.
     *
     * @param rowIndex
     * The index of the row.
     */
    hoverRow(rowIndex?: number): void;
    /**
     * Hovers the column with the provided ID. It removes the hover effect from
     * the previously hovered column.
     *
     * @param columnId
     * The ID of the column.
     */
    hoverColumn(columnId?: string): void;
    /**
     * Renders the viewport of the data grid. If the data grid is already
     * rendered, it will be destroyed and re-rendered with the new data.
     * @internal
     */
    renderViewport(): void;
    /**
     * Renders the table (viewport) of the data grid.
     */
    private renderTable;
    /**
     * Renders a message that there is no data to display.
     */
    private renderNoData;
    /**
     * Returns the array of IDs of columns that should be displayed in the data
     * grid, in the correct order.
     */
    private getEnabledColumnIDs;
    private loadDataTable;
    /**
     * Extracts all references to columnIds on all levels below defined level
     * in the settings.header structure.
     *
     * @param columns
     * Structure that we start calculation
     *
     * @param [onlyEnabledColumns=true]
     * Extract all columns from header or columns filtered by enabled param
     * @returns
     */
    getColumnIds(columns: Array<GroupedHeaderOptions | string>, onlyEnabledColumns?: boolean): string[];
    /**
     * Destroys the data grid.
     */
    destroy(): void;
    /**
     * Returns the current dataGrid data as a JSON string.
     *
     * @return
     * JSON representation of the data
     */
    getJSON(): string;
    /**
     * Returns the current DataGrid options as a JSON string.
     *
     * @param onlyUserOptions
     * Whether to return only the user options or all options (user options
     * merged with the default ones). Default is `true`.
     *
     * @returns
     * Options as a JSON string.
     */
    getOptionsJSON(onlyUserOptions?: boolean): string;
}
declare namespace DataGrid {
    type AfterLoadCallback = (dataGrid: DataGrid) => void;
}
export default DataGrid;
