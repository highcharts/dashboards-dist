import type Board from '../Board';
import type { ComponentType, ComponentTypeRegistry } from './ComponentType';
import type SidebarPopup from '../EditMode/SidebarPopup';
import type TextOptions from './TextOptions';
import Cell from '../Layout/Cell.js';
import type { ConnectorOptions as ComponentConnectorOptions } from './ConnectorHandler';
import ConnectorHandler from './ConnectorHandler.js';
import DataTable from '../../Data/DataTable.js';
import type { Options as EditableOption } from './EditableOptions';
import EditableOptions from './EditableOptions.js';
import type { OptionsRecord as SyncOptionsRecord, PredefinedSyncConfig, RawOptionsRecord as SyncRawOptionsRecord } from './Sync/Sync';
/**
 * Abstract class of component.
 */
declare abstract class Component {
    /**
     * Predefined sync config for component.
     */
    static predefinedSyncConfig: PredefinedSyncConfig;
    /**
     * Default options of the component.
     */
    static defaultOptions: Partial<Options>;
    /**
     * The connector handlers for the component. They are used to handle the
     * connector options and data tables.
     */
    connectorHandlers: ConnectorHandler[];
    /**
     * Size of the component (width and height).
     */
    protected dimensions: {
        width: number | null;
        height: number | null;
    };
    /**
     * Whether the component state is active.
     */
    isActive?: boolean;
    /**
     * The HTML element where the caption is.
     */
    captionElement?: HTMLElement;
    /**
     * The options for the component.
     */
    options: Options;
    /**
     * Sets an ID for the component's `div`.
     */
    id: string;
    /**
     * An array of options marked as editable by the UI.
     */
    editableOptions: EditableOptions;
    /**
     * The sync handlers for the component.
     */
    protected syncHandlers?: SyncOptionsRecord;
    /**
     * Creates a component in the cell.
     *
     * @param cell
     * Instance of cell, where component is attached.
     *
     * @param options
     * The options for the component.
     */
    constructor(cell: Cell, options: Partial<Options>, board?: Board);
    /**
     * Function fired when component's data source's data is changed.
     */
    abstract onTableChanged(e?: EventTypes): void;
    /**
     * Returns the component's options when it is dropped from the sidebar.
     *
     * @param sidebar
     * The sidebar popup.
     */
    getOptionsOnDrop(sidebar: SidebarPopup): Partial<ComponentType['options']>;
    /**
     * Returns the data table connected to the component by the `connectorId`
     * and `dataTableKey`. If both args are undefined, the first data table is
     * returned.
     *
     * @param connectorId
     * The id of the connector.
     *
     * @param dataTableKey
     * The key of the data table within the connector.
     *
     * @returns
     * The data table, or undefined if no matching handler is found.
     */
    getDataTable(connectorId?: string, dataTableKey?: string): DataTable | undefined;
    /**
     * Initializes connector handlers for the component.
     */
    initConnectors(): Promise<this>;
    /**
     * Resize the component
     *
     * @param width
     * The width to set the component to.
     * Can be pixels, a percentage string or null.
     * Null will unset the style
     *
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
     *
     * @param width
     * The width to set the component to.
     *
     * @param height
     * The height to set the component to.
     */
    protected resizeDynamicContent(width?: number | string | null, height?: number | string | null): void;
    /**
     * Adjusts size of component to parent's cell size when animation is done.
     *
     * @param element
     * HTML element that is resized.
     */
    resizeTo(element: HTMLElement): void;
    /**
     * Handles updating via options.
     *
     * @param newOptions
     * The options to apply.
     *
     * @param shouldRerender
     * Set to true if the update should rerender the component.
     */
    update(newOptions: Partial<Options>, shouldRerender?: boolean): Promise<void>;
    /**
     * Adds title at the top of component's container.
     *
     * @param titleOptions
     * The options for the title.
     */
    setTitle(titleOptions: TextOptionsType): void;
    /**
     * Adds caption at the bottom of component's container.
     *
     * @param captionOptions
     * The options for the caption.
     */
    setCaption(captionOptions: TextOptionsType): void;
    /**
     * Destroys the component.
     */
    destroy(): void;
    getEditableOptions(): Options;
    getEditableOptionValue(propertyPath?: (string | number)[]): number | boolean | undefined | string;
}
interface Component {
    type: keyof ComponentTypeRegistry;
}
export type ConnectorOptions = ComponentConnectorOptions;
export type SetConnectorsEvent = Event<'setConnectors' | 'afterSetConnectors', {}>;
export interface Options {
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
    editableOptions?: Array<EditableOption>;
    /**
     * Sync options. Predefined per component or custom sync options can be
     * used here.
     */
    sync?: SyncRawOptionsRecord;
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
export interface StatesOptions {
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
/**
 * Allowed types for the text.
*/
export type TextOptionsType = string | false | TextOptions | undefined;
export default Component;
