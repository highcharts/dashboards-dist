import type Board from '../Board';
import type { ComponentType, ComponentTypeRegistry } from './ComponentType';
import type TextOptions from './TextOptions';
import type SidebarPopup from '../EditMode/SidebarPopup';
import type DataConnectorType from '../../Data/Connectors/DataConnectorType';
import Cell from '../Layout/Cell.js';
import CellHTML from '../Layout/CellHTML.js';
import CallbackRegistry from '../CallbackRegistry.js';
import ConnectorHandler from './ConnectorHandler.js';
import DataTable from '../../Data/DataTable.js';
import EditableOptions from './EditableOptions.js';
import Sync from './Sync/Sync.js';
import Globals from '../Globals.js';
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
     * Predefined sync config for component.
     */
    static predefinedSyncConfig: Sync.PredefinedSyncConfig;
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
    cell: Cell | CellHTML;
    /**
     * The connector handlers for the component.
     */
    connectorHandlers: ConnectorHandler[];
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
     * Whether the component state is active.
     */
    isActive?: boolean;
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
     * Reference to the specific connector data table.
     */
    dataTableKey?: string;
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
     * Event listeners tied to the parent cell. Used for rendering/resizing the
     * component on interactions.
     *
     * @internal
     */
    private cellListeners;
    /**
     * Reference to ResizeObserver, which allows running 'unobserve'.
     * @internal
     */
    private resizeObserver?;
    /**
     * @internal
     */
    protected syncHandlers?: Sync.OptionsRecord;
    /** @internal */
    sync: Sync;
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
    constructor(cell: Cell, options: Partial<Component.Options>, board?: Board);
    /**
     * Function fired when component's data source's data is changed.
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
     * Returns the first connector of the component if it exists.
     *
     * @internal
     */
    getFirstConnector(): Component.ConnectorTypes | undefined;
    /**
     * Setup listeners on cell/other things up the chain
     *
     * @internal
     */
    private attachCellListeners;
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
     * Initializes connector handlers for the component.
     */
    initConnectors(): Promise<this>;
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
     * It's a temporary alternative for the `resize` method. It sets the strict
     * pixel height for the component so that the content can be distributed in
     * the right way, without looping the resizers in the content and container.
     * @param width
     * The width to set the component to.
     * @param height
     * The height to set the component to.
     */
    protected resizeDynamicContent(width?: number | string | null, height?: number | string | null): void;
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
     * Get the component's options.
     * @returns
     * The JSON of component's options.
     *
     * @internal
     *
     */
    getOptions(): Partial<Component.Options>;
    getEditableOptions(): Component.Options;
    getEditableOptionValue(propertyPath?: (string | number)[]): number | boolean | undefined | string;
}
interface Component {
    type: keyof ComponentTypeRegistry;
}
declare namespace Component {
    type ConnectorOptions = ConnectorHandler.ConnectorOptions;
    /**
     * The basic events
     */
    /** @internal */
    type EventTypes = SetConnectorsEvent | ResizeEvent | UpdateEvent | TableChangedEvent | LoadEvent | RenderEvent | PresentationModifierEvent;
    type SetConnectorsEvent = Event<'setConnectors' | 'afterSetConnectors', {}>;
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
    interface Options {
        /**
         * Cell id, where component is attached.
         * Deprecated, use `renderTo` instead.
         *
         * @deprecated
         */
        cell?: string;
        /**
         * Cell id, where component is attached.
         */
        renderTo?: string;
        /**
         * The name of class that is applied to the component's container.
         */
        className?: string;
        /**
         * The type of component like: `HTML`, `KPI`, `Highcharts`, `Grid`,
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
        sync?: Sync.RawOptionsRecord;
        /**
         * Connector options
         */
        connector?: (ConnectorOptions | Array<ConnectorOptions>);
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
        /**
         * States for the component.
         */
        states?: StatesOptions;
    }
    /**
     * States options for the component.
     */
    interface StatesOptions {
        active?: {
            /**
             * Whether the component is active. Only used when `enabled` is
             * `true`.
             * If `true`, the `highcharts-dashboards-cell-state-active` class
             * will be added to the component's container.
             *
             * Only one component can be active at a time.
             *
             * Try it:
             * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/component-options/states/ | Active state }
             *
             * @default false
             */
            isActive?: boolean;
            /**
             * Whether to enable the active state.
             *
             * @default false
             */
            enabled?: boolean;
        };
        hover?: {
            /**
             * Whether to enable the hover state.
             *
             * @default false
             */
            enabled?: boolean;
        };
    }
    /** @internal */
    type ConnectorTypes = DataConnectorType;
    /**
     * Allowed types for the text.
    */
    type TextOptionsType = string | false | TextOptions | undefined;
}
export default Component;
