import type Board from '../../Board';
import type Cell from '../../Layout/Cell';
import type { Grid, GridNamespace } from '../../Plugins/GridTypes';
import type { Options } from './GridComponentOptions';
import type { EventTypes as ComponentEventTypes } from '../Component';
import Component from '../Component.js';
import SidebarPopup from '../../EditMode/SidebarPopup';
/**
 * Grid Component for Highcharts Dashboards.
 * @private
 */
declare class GridComponent extends Component {
    /**
     * Predefined sync config for the Grid Component.
     */
    static predefinedSyncConfig: import("../Sync/Sync").PredefinedSyncConfig;
    /**
     * The namespace of the Grid Component.
     */
    static GridNamespace?: GridNamespace;
    /**
     * The default options for the Grid Component.
     */
    static defaultOptions: Partial<import("../Component").Options> & import("../../../Shared/Types").DeepPartial<Options>;
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
/** @private */
export type ComponentType = GridComponent;
/** @private */
export type ChartComponentEvents = ComponentEventTypes;
export default GridComponent;
