import type Board from '../Board';
import type Cell from '../Layout/Cell';
import type { ComponentConnectorOptions } from './ComponentOptions';
import type { ComponentType, ComponentTypeRegistry } from './ComponentType';
import type JSON from '../JSON';
import type Serializable from '../Serializable';
import type DataModifier from '../../Data/Modifiers/DataModifier';
import type TextOptions from './TextOptions';
import type SidebarPopup from '../EditMode/SidebarPopup';
import CallbackRegistry from '../CallbackRegistry.js';
import DataConnector from '../../Data/Connectors/DataConnector.js';
import DataTable from '../../Data/DataTable.js';
import EditableOptions from './EditableOptions.js';
import Globals from '../Globals.js';
import ComponentGroup from './ComponentGroup.js';
import Sync from './Sync/Sync.js';
/**
 *
 * Abstract Class of component.
 *
 * @internal
 *
 */
/**
 * Abstract Class of component.
 * @internal
 */
declare abstract class Component {
    /**
     *
     * Creates HTML text element like header or title
     *
     * @param tagName
     * HTML tag name used as wrapper of text like `h2` or `p`.
     * @param elementName
     * Name of element
     * @param textOptions
     * The options for the component
     * @returns
     * HTML object when title is created, otherwise undefined
     *
     * @internal
     */
    static createTextElement(tagName: string, elementName: string, textOptions: Component.TextOptionsType): HTMLElement | undefined;
    /** @internal */
    static Sync: typeof Sync;
    /**
     * Default options of the component.
     */
    static defaultOptions: Partial<Component.Options>;
    /**
     * The HTML element or id of HTML element that is used for appending
     * a component.
     *
     * @internal
     */
    parentElement: HTMLElement;
    /**
     * Instance of cell, where component is attached.
     *
     * @internal
     */
    cell: Cell;
    /**
     * Default sync Handlers.
     */
    static syncHandlers: Sync.OptionsRecord;
    /**
     * Connector that allows you to load data via URL or from a local source.
     */
    connector?: Component.ConnectorTypes;
    /**
     * The id of the connector in the data pool to use.
     */
    protected connectorId?: string;
    /**
     * @internal
     * The board the component belongs to
     * */
    board: Board;
    /**
     * Size of the component (width and height).
     */
    protected dimensions: {
        width: number | null;
        height: number | null;
    };
    /**
     * The HTML element where the component is.
     *
     * @internal
     */
    element: HTMLElement;
    /**
     * The HTML element where the title is.
     */
    titleElement?: HTMLElement;
    /**
     * The HTML element where the caption is.
     */
    captionElement?: HTMLElement;
    /**
     * The HTML element where the component's content is.
     *
     * @internal
     */
    contentElement: HTMLElement;
    /**
     * The options for the component.
     * */
    options: Component.Options;
    /**
     * Sets an ID for the component's `div`.
     */
    id: string;
    /**
     * An array of options marked as editable by the UI.
     *
     */
    editableOptions: EditableOptions;
    /**
     * Registry of callbacks registered on the component. Used in the Highcharts
     * component to keep track of chart events.
     *
     * @internal
     */
    callbackRegistry: CallbackRegistry;
    /**
     * The interval for rendering the component on data changes.
     * @internal
     */
    private tableEventTimeout?;
    /**
     * Event listeners tied to the current DataTable. Used for rerendering the
     * component on data changes.
     *
     * @internal
     */
    private tableEvents;
    /**
     * Event listeners tied to the parent cell. Used for rendering/resizing the
     * component on interactions.
     *
     * @internal
     */
    private cellListeners;
    /**
     * @internal
     */
    protected syncHandlers?: Sync.OptionsRecord;
    /**
     * DataModifier that is applied on top of modifiers set on the DataStore.
     *
     * @internal
     */
    presentationModifier?: DataModifier;
    /**
     * The table being presented, either a result of the above or a way to
     * modify the table via events.
     *
     * @internal
     */
    presentationTable?: DataTable;
    /**
     * The active group of the component. Used for sync.
     *
     * @internal
     */
    activeGroup: ComponentGroup | undefined;
    /** @internal */
    abstract sync: Sync;
    /**
     * Timeouts for calls to `Component.resizeTo()`.
     *
     * @internal
    /* *
     */
    protected resizeTimeouts: number[];
    /**
     * Timeouts for resizing the content. I.e. `chart.setSize()`.
     *
     * @internal
     * */
    protected innerResizeTimeouts: number[];
    /**
     * Creates a component in the cell.
     *
     * @param cell
     * Instance of cell, where component is attached.
     *
     * @param options
     * The options for the component.
     */
    constructor(cell: Cell, options: Partial<Component.Options>);
    /**
     * Function fired when component's `tableChanged` event is fired.
     * @internal
     */
    abstract onTableChanged(e?: Component.EventTypes): void;
    /**
     * Returns the component's options when it is dropped from the sidebar.
     *
     * @param sidebar
     * The sidebar popup.
     */
    getOptionsOnDrop(sidebar: SidebarPopup): Partial<ComponentType['options']>;
    /**
     * Inits connectors for the component and rerenders it.
     *
     * @returns
     * Promise resolving to the component.
     */
    initConnector(): Promise<this>;
    /**
    * Filter the sync options that are declared in the component options.
    * Assigns the sync options to the component and to the sync instance.
    *
    * @param defaultHandlers
    * Sync handlers on component.
    *
    * @internal
    */
    protected filterAndAssignSyncOptions(defaultHandlers?: typeof Sync.defaultHandlers): void;
    /**
     * Setup listeners on cell/other things up the chain
     *
     * @internal
     */
    private attachCellListeneres;
    /**
     * Set a parent cell.
     * @param cell
     * Instance of a cell.
     * @param resize
     * Flag that allow to resize the component.
     *
     * @internal
     */
    setCell(cell: Cell, resize?: boolean): void;
    /**
     * Adds event listeners to data table.
     * @param table
     * Data table that is source of data.
     * @internal
     */
    private setupTableListeners;
    /**
     * Remove event listeners in data table.
     * @internal
     */
    private clearTableListeners;
    /**
     * Attaches data store to the component.
     * @param connector
     * Connector of data.
     *
     * @returns
     * Component which can be used in chaining.
     *
     * @internal
     */
    setConnector(connector: Component.ConnectorTypes | undefined): this;
    /** @internal */
    setActiveGroup(group: ComponentGroup | string | null): void;
    /**
     * Gets height of the component's content.
     *
     * @returns
     * Current height as number.
     * @internal
     */
    private getContentHeight;
    /**
     * Resize the component
     * @param width
     * The width to set the component to.
     * Can be pixels, a percentage string or null.
     * Null will unset the style
     * @param height
     * The height to set the component to.
     * Can be pixels, a percentage string or null.
     * Null will unset the style.
     */
    resize(width?: number | string | null, height?: number | string | null): void;
    /**
     * Adjusts size of component to parent's cell size when animation is done.
     * @param element
     * HTML element that is resized.
     */
    resizeTo(element: HTMLElement): void;
    /**
     * Handles updating via options.
     * @param newOptions
     * The options to apply.
     *
     * @param shouldRerender
     * Set to true if the update should rerender the component.
     */
    update(newOptions: Partial<Component.Options>, shouldRerender?: boolean): Promise<void>;
    /**
     * Private method which sets up event listeners for the component.
     *
     * @internal
     */
    private setupEventListeners;
    /**
     * Adds title at the top of component's container.
     *
     * @param titleOptions
     * The options for the title.
     */
    setTitle(titleOptions: Component.TextOptionsType): void;
    /**
     * Adds caption at the bottom of component's container.
     *
     * @param captionOptions
     * The options for the caption.
     */
    setCaption(captionOptions: Component.TextOptionsType): void;
    /**
     * Handles setting things up on initial render.
     *
     * @returns
     * The component for chaining.
     *
     * @internal
     */
    load(): Promise<this>;
    /**
     * Renders the component.
     *
     * @returns
     * The component for chaining.
     *
     * @internal
     */
    render(): this;
    /**
     * Destroys the component.
     */
    destroy(): void;
    /** @internal */
    on<TEvent extends Component.EventTypes>(type: TEvent['type'], callback: (this: this, e: TEvent) => void): Function;
    /** @internal */
    emit<TEvent extends Component.EventTypes>(e: TEvent): void;
    /**
     * Converts the class instance to a class JSON.
     * @internal
     *
     * @returns
     * Class JSON of this Component instance.
     *
     * @internal
     */
    toJSON(): Component.JSON;
    /**
     * Get the component's options.
     * @returns
     * The JSON of component's options.
     *
     * @internal
     *
     */
    getOptions(): Partial<Component.Options>;
    getEditableOptions(): Component.Options;
    getEditableOptionValue(propertyPath?: string[]): number | boolean | undefined | string;
}
interface Component {
    type: keyof ComponentTypeRegistry;
}
declare namespace Component {
    /** @internal */
    interface JSON extends Serializable.JSON<string> {
        options: ComponentOptionsJSON;
    }
    /**
     * The basic events
     */
    /** @internal */
    type EventTypes = SetConnectorEvent | ResizeEvent | UpdateEvent | TableChangedEvent | LoadEvent | RenderEvent | JSONEvent | PresentationModifierEvent;
    type SetConnectorEvent = Event<'setConnector' | 'afterSetConnector', {}>;
    /** @internal */
    type ResizeEvent = Event<'resize', {
        readonly type: 'resize';
        width?: number;
        height?: number;
    }>;
    /** @internal */
    type UpdateEvent = Event<'update' | 'afterUpdate', {
        options?: Options;
    }>;
    /** @internal */
    type LoadEvent = Event<'load' | 'afterLoad', {}>;
    /** @internal */
    type RenderEvent = Event<'render' | 'afterRender', {}>;
    /** @internal */
    type JSONEvent = Event<'toJSON' | 'fromJSON', {
        json: Serializable.JSON<string>;
    }>;
    /** @internal */
    type TableChangedEvent = Event<'tableChanged', {}>;
    /** @internal */
    type PresentationModifierEvent = Component.Event<'afterPresentationModifier', {
        table: DataTable;
    }>;
    /** @internal */
    type Event<EventType extends string, EventRecord extends Record<string, any>> = {
        readonly type: EventType;
        target?: Component;
        detail?: Globals.AnyRecord;
    } & EventRecord;
    /**
     * The sync can be an object configuration containing: `highlight`,
     * `visibility` or `extremes`. For the Navigator Component `crossfilter`
     * sync can be used.
     *
     * Example:
     * ```
     * {
     *     highlight: true
     * }
     * ```
     */
    interface SyncOptions {
        /**
         * Crossfilter sync is available for Navigator components. Modifies data
         * by selecting only those rows that meet common ranges.
         *
         * Alternatively to the boolean value, it can accept an object
         * containing additional options for operating this type of
         * synchronization.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/demo/crossfilter | Crossfilter Sync }
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/components/crossfilter-affecting-navigators | Crossfilter with affectNavigators enabled }
         *
         * @default false
         */
        crossfilter?: boolean | CrossfilterSyncOptions;
        /**
         * Extremes sync is available for Highcharts, KPI, DataGrid and
         * Navigator components. Sets a common range of displayed data. For the
         * KPI Component sets the last value.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/demo/sync-extremes/ | Extremes Sync }
         *
         * @default false
         */
        extremes?: boolean | Sync.OptionsEntry;
        /**
         * Highlight sync is available for Highcharts and DataGrid components.
         * It allows to highlight hovered corresponding rows in the table and
         * chart points.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/component-options/sync-highlight/ | Highlight Sync }
         *
         * @default false
         */
        highlight?: boolean | Sync.OptionsEntry;
        /**
         * Visibility sync is available for Highcharts and DataGrid components.
         * Synchronizes the visibility of data from a hidden/shown series.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/component-options/sync-visibility/ | Visibility Sync }
         *
         * @default false
         */
        visibility?: boolean | Sync.OptionsEntry;
    }
    /**
     * The crossfilter sync options.
     *
     * Example:
     * ```
     * {
     *     enabled: true,
     *     affectNavigator: true
     * }
     * ```
     */
    interface CrossfilterSyncOptions extends Sync.OptionsEntry {
        /**
         * Whether this navigator component's content should be affected by
         * other navigators with crossfilter enabled.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/components/crossfilter-affecting-navigators | Affect Navigators Enabled }
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/demo/sync-extremes/ | Affect Navigators Disabled }
         *
         * @default false
         */
        affectNavigator?: boolean;
    }
    /** @internal */
    type SyncType = keyof SyncOptions;
    interface Options {
        /**
         * Cell id, where component is attached.
         */
        cell?: string;
        /**
         * The name of class that is applied to the component's container.
         */
        className?: string;
        /**
         * The type of component like: `HTML`, `KPI`, `Highcharts`, `DataGrid`,
         * `Navigator`.
         */
        type: keyof ComponentTypeRegistry;
        /**
         * Allow overwriting gui elements.
         * @internal
         */
        navigationBindings?: Array<Globals.AnyRecord>;
        /**
         * Events attached to the component : `mount`, `unmount`, `resize`, `update`.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/component-options/events/ | Mount event }
         */
        events?: Record<string, Function>;
        /**
         * Set of options that are available for editing through sidebar.
         */
        editableOptions?: Array<EditableOptions.Options>;
        /** @internal */
        editableOptionsBindings?: EditableOptions.OptionsBindings;
        /** @internal */
        presentationModifier?: DataModifier;
        /**
         * Defines which elements should be synced.
         * ```
         * Example:
         * {
         *     highlight: true
         * }
         * ```
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/demo/sync-extremes/ | Extremes Sync }
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/component-options/sync-highlight/ | Highlight Sync }
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/component-options/sync-visibility/ | Visibility Sync }
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/demo/crossfilter | Crossfilter Sync } (Navigator Component only)
         */
        sync?: SyncOptions;
        /**
         * Connector options
         */
        connector?: ComponentConnectorOptions;
        /**
         * Sets an ID for the component's container.
         */
        id?: string;
        /**
         * The component's title, which will render at the top.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/component-options/title/ | Changed captions }
         */
        title?: TextOptionsType;
        /**
         * The component's caption, which will render at the bottom.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/component-options/caption/ | Changed captions }
         */
        caption?: TextOptionsType;
    }
    /**
     * JSON compatible options for export
     * @internal
     *  */
    interface ComponentOptionsJSON extends JSON.Object {
        caption?: string;
        className?: string;
        cell?: string;
        editableOptions?: JSON.Array<string>;
        editableOptionsBindings?: EditableOptions.OptionsBindings & JSON.Object;
        id: string;
        parentCell?: Cell.JSON;
        parentElement?: string;
        style?: {};
        sync?: SyncOptions & JSON.Object;
        title?: string;
        type: keyof ComponentTypeRegistry;
    }
    /** @internal */
    type ConnectorTypes = DataConnector;
    /**
     * Allowed types for the text.
    */
    type TextOptionsType = string | false | TextOptions | undefined;
}
export default Component;
