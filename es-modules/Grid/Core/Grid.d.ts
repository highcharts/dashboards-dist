import type { Options, GroupedHeaderOptions } from './Options';
import type Column from './Table/Column';
import Accessibility from './Accessibility/Accessibility.js';
import DataTable from '../../Data/DataTable.js';
import Table from './Table/Table.js';
import QueryingController from './Querying/QueryingController.js';
import Globals from './Globals.js';
import TimeBase from '../../Shared/TimeBase.js';
/**
 * A base class for the Grid.
 */
declare class Grid {
    /**
     * Creates a new Grid.
     *
     * @param renderTo
     * The render target (html element or id) of the Grid.
     *
     * @param options
     * The options of the Grid.
     *
     * @param async
     * Whether to initialize the dashboard asynchronously. When true, the
     * function returns a promise that resolves with the dashboard instance.
     *
     * @return
     * The new Grid.
     */
    static grid(renderTo: string | HTMLElement, options: Options, async?: boolean): Grid;
    /**
     * Creates a new Grid.
     *
     * @param renderTo
     * The render target (html element or id) of the Grid.
     *
     * @param options
     * The options of the Grid.
     *
     * @param async
     * Whether to initialize the dashboard asynchronously. When true, the
     * function returns a promise that resolves with the dashboard instance.
     *
     * @return
     * Promise that resolves with the new Grid.
     */
    static grid(renderTo: string | HTMLElement, options: Options, async: true): Promise<Grid>;
    /**
     * An array containing the current Grid objects in the page.
     * @internal
     */
    static readonly grids: Array<(Grid | undefined)>;
    /**
     * The accessibility controller.
     */
    accessibility?: Accessibility;
    /**
     * The caption element of the Grid.
     */
    captionElement?: HTMLElement;
    /**
     * The user options declared for the columns as an object of column ID to
     * column options.
     * @internal
     */
    columnOptionsMap: Record<string, Grid.ColumnOptionsMapItem>;
    /**
     * The container of the grid.
     */
    container?: HTMLElement;
    /**
     * The content container of the Grid.
     */
    contentWrapper?: HTMLElement;
    /**
     * The data source of the Grid. It contains the original data table
     * that was passed to the Grid.
     */
    dataTable?: DataTable;
    /**
     * The description element of the Grid.
     */
    descriptionElement?: HTMLElement;
    /**
     * The container element of the loading indicator overlaying the Grid.
     */
    loadingWrapper?: HTMLElement;
    /**
     * The presentation table of the Grid. It contains a modified version
     * of the data table that is used for rendering the Grid content. If
     * not modified, just a reference to the original data table.
     */
    presentationTable?: DataTable;
    /**
     * The HTML element of the table.
     */
    tableElement?: HTMLTableElement;
    /**
     * The options of the Grid. Contains the options that were declared
     * by the user and some of the default options.
     */
    options?: Options;
    /**
     * The options that were declared by the user when creating the Grid
     * or when updating it.
     */
    userOptions: Partial<Options>;
    /**
     * The table (viewport) element of the Grid.
     */
    viewport?: Table;
    /**
     * The list of columns that are displayed in the Grid.
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
     * The synced row index.
     * @internal
     */
    syncedRowIndex?: number;
    /**
     * The synced column ID.
     * @internal
     */
    syncedColumnId?: string;
    /**
     * The querying controller.
     * @internal
     */
    querying: QueryingController;
    /**
     * The time instance.
     */
    time: TimeBase;
    /**
     * The locale of the Grid.
     */
    locale?: string | string[];
    /**
     * The initial height of the container. Can be 0 also if not set.
     * @internal
     */
    initialContainerHeight: number;
    /**
     * The unique ID of the Grid.
     */
    id: string;
    /**
     * Constructs a new Grid.
     *
     * @param renderTo
     * The render target (container) of the Grid.
     *
     * @param options
     * The options of the Grid.
     *
     * @param afterLoadCallback
     * The callback that is called after the Grid is loaded.
     */
    constructor(renderTo: string | HTMLElement, options: Options, afterLoadCallback?: Grid.AfterLoadCallback);
    private initAccessibility;
    /**
     * Initializes the container of the Grid.
     *
     * @param renderTo
     * The render target (html element or id) of the Grid.
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
     * Sets the new column options to the userOptions field.
     *
     * @param newColumnOptions
     * The new column options that should be loaded.
     *
     * @param overwrite
     * Whether to overwrite the existing column options with the new ones.
     * Default is `false`.
     */
    private setColumnOptions;
    /**
     * Loads the new column options to the userOptions field in a one-to-one
     * manner. It means that all the columns that are not defined in the new
     * options will be removed.
     *
     * @param newColumnOptions
     * The new column options that should be loaded.
     */
    private setColumnOptionsOneToOne;
    update(options?: Options, render?: boolean, oneToOne?: boolean): Promise<void>;
    update(options: Options, render: false, oneToOne?: boolean): void;
    updateColumn(columnId: string, options: Column.Options, render?: boolean, overwrite?: boolean): Promise<void>;
    updateColumn(columnId: string, options: Column.Options, render?: false, overwrite?: boolean): void;
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
     * Sets the sync state to the row with the provided index. It removes the
     * synced effect from the previously synced row.
     *
     * @param rowIndex
     * The index of the row.
     */
    syncRow(rowIndex?: number): void;
    /**
     * Sets the sync state to the column with the provided ID. It removes the
     * synced effect from the previously synced column.
     *
     * @param columnId
     * The ID of the column.
     */
    syncColumn(columnId?: string): void;
    /**
     * Render caption above the grid.
     * @internal
     */
    renderCaption(): void;
    /**
     * Render description under the grid.
     *
     * @internal
     */
    renderDescription(): void;
    /**
     * Resets the content wrapper of the Grid. It clears the content and
     * resets the class names.
     * @internal
     */
    resetContentWrapper(): void;
    /**
     * Renders the viewport of the Grid. If the Grid is already
     * rendered, it will be destroyed and re-rendered with the new data.
     * @internal
     */
    renderViewport(): void;
    /**
     * Renders the table (viewport) of the Grid.
     *
     * @returns
     * The newly rendered table (viewport) of the Grid.
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
     * @param columnsTree
     * Structure that we start calculation
     *
     * @param [onlyEnabledColumns=true]
     * Extract all columns from header or columns filtered by enabled param
     * @returns
     */
    getColumnIds(columnsTree: Array<GroupedHeaderOptions | string>, onlyEnabledColumns?: boolean): string[];
    /**
     * Destroys the Grid.
     */
    destroy(): void;
    /**
     * Grey out the Grid and show a loading indicator.
     *
     * @param message
     * The message to display in the loading indicator.
     */
    showLoading(message?: string): void;
    /**
     * Removes the loading indicator.
     */
    hideLoading(): void;
    /**
     * Returns the current grid data as a JSON string.
     *
     * @return
     * JSON representation of the data
     */
    getData(): string;
    /**
     * Returns the current grid data as a JSON string.
     *
     * @return
     * JSON representation of the data
     *
     * @deprecated
     */
    getJSON(): string;
    /**
     * Returns the current Grid options.
     *
     * @param onlyUserOptions
     * Whether to return only the user options or all options (user options
     * merged with the default ones). Default is `true`.
     *
     * @returns
     * Grid options.
     */
    getOptions(onlyUserOptions?: boolean): Globals.DeepPartial<Options>;
    /**
     * Returns the current Grid options.
     *
     * @param onlyUserOptions
     * Whether to return only the user options or all options (user options
     * merged with the default ones). Default is `true`.
     *
     * @returns
     * Options as a JSON string
     *
     * @deprecated
     */
    getOptionsJSON(onlyUserOptions?: boolean): string;
    /**
     * Enables virtualization if the row count is greater than or equal to the
     * threshold or virtualization is enabled externally. Should be fired after
     * the data table is loaded.
     */
    private initVirtualization;
}
declare namespace Grid {
    /**
     * @internal
     * Callback that is called after the Grid is loaded.
     */
    type AfterLoadCallback = (grid: Grid) => void;
    /**
     * @internal
     * An item in the column options map.
     */
    interface ColumnOptionsMapItem {
        index: number;
        options: Column.Options;
    }
}
export default Grid;
