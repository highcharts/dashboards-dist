import type Component from './Components/Component';
import type ComponentType from './Components/ComponentType';
import type DataPoolOptions from '../Data/DataPoolOptions';
import type EditMode from './EditMode/EditMode';
import type Fullscreen from './EditMode/Fullscreen';
import Bindings from './Actions/Bindings.js';
import DashboardsAccessibility from './Accessibility/DashboardsAccessibility.js';
import DataCursor from '../Data/DataCursor.js';
import DataPool from '../Data/DataPool.js';
import Globals from './Globals.js';
import Layout from './Layout/Layout.js';
/**
 * Class that represents a dashboard.
 *
 * @example
 * const dashboard = Dashboards.board('container', {
 *      gui: {
 *          layouts: [{
 *              id: 'layout-1',
 *              rows: [{
 *                  cells: [{
 *                      id: 'dashboard-col-0'
 *                  }]
 *              }]
 *          }]
 *      },
 *      components: [{
 *          cell: 'dashboard-col-0',
 *          type: 'Highcharts',
 *          chartOptions: {
 *              series: [{
 *                  data: [1, 2, 3, 4]
 *              }]
 *          }
 *      }]
 * });
 */
declare class Board {
    /**
     * Factory function for creating a new dashboard.
     *
     * @param renderTo
     * The DOM element to render to, or its id.
     *
     * @param options
     * The options for the dashboard.
     *
     * @param async
     * Whether to initialize the dashboard asynchronously. When false or
     * undefined, the function returns the dashboard instance.
     */
    static board(renderTo: (string | globalThis.HTMLElement), options: Board.Options, async?: boolean): Board;
    /**
     * Factory function for creating a new dashboard.
     *
     * @param renderTo
     * The DOM element to render to, or its id.
     *
     * @param options
     * The options for the dashboard.
     *
     * @param async
     * Whether to initialize the dashboard asynchronously. When true, the
     * function returns a promise that resolves with the dashboard instance.
     */
    static board(renderTo: (string | globalThis.HTMLElement), options: Board.Options, async: true): Promise<Board>;
    /**
     * Creates a dashboard with components like charts, tables, and HTML
     * elements.
     *
     * @internal
     * @param renderTo
     * The DOM element to render to, or its id.
     *
     * @param options
     * The options for the dashboard.
     */
    protected constructor(renderTo: (string | HTMLElement), options: Board.Options);
    /**
     * The accessibility module for the dashboard.
     * @internal
     * */
    a11y: DashboardsAccessibility;
    /**
     * The container referenced by the `renderTo` option when creating the
     * dashboard.
     * @internal
     * */
    boardWrapper: HTMLElement;
    /**
     * The main container for the dashboard. Created inside the element
     * specified by user when creating the dashboard.
     * */
    container: HTMLElement;
    /**
     * All types of components available in the dashboard.
     * @internal
     */
    componentTypes: import("./Components/ComponentType").ComponentTypeRegistry;
    /**
     * The data cursor instance used for interacting with the data.
     * @internal
     * */
    dataCursor: DataCursor;
    /**
     * The data pool instance with all the connectors.
     * */
    dataPool: DataPool;
    /**
     * The edit mode instance. Used to handle editing the dashboard.
     * @internal
     * */
    editMode?: EditMode;
    /**
     * The fullscreen instance. Controls the fullscreen mode.
     * @internal
     * */
    fullscreen?: Fullscreen;
    /**
     * Flag to determine if the GUI is enabled.
     * @internal
     * */
    guiEnabled?: boolean;
    /**
     * Flag to determine if the EditMode is enabled.
     * @internal
     * */
    editModeEnabled?: boolean;
    /**
     * The unique id of the dashboard, it is generated automatically.
     * */
    readonly id: string;
    /**
     * Index of the board in the global boards array. Allows to access the
     * specific one when having multiple dashboards.
     * */
    readonly index: number;
    /**
     * An array of generated layouts.
     * */
    layouts: Array<Layout>;
    /**
     * The wrapper for the layouts.
     * @internal
     * */
    layoutsWrapper?: globalThis.HTMLElement;
    /**
     * An array of mounted components on the dashboard.
     * */
    mountedComponents: Array<Bindings.MountedComponent>;
    /**
     * The options for the dashboard.
     * */
    options: Board.Options;
    /**
     * Reference to ResizeObserver, which allows running 'unobserve'.
     * @internal
     */
    private resizeObserver?;
    /**
     * Init the layouts and components on the dashboard.
     *
     * @internal
     * @param async Whether to initialize the dashboard asynchronously. When
     * false or undefined the function returns the dashboard instance.
     *  instance.
     *
     * @returns
     * Board instance
     */
    protected init(async?: boolean): Board;
    /**
     * Init the layouts and components on the dashboard, and attaches connectors
     * if they are defined on component level.
     *
     * @internal
     * @param async Whether to initialize the dashboard asynchronously. When
     * true, the function returns a promise that resolves with the dashboard
     *  instance.
     *
     * @returns
     * A promise that resolves with the dashboard instance.
     */
    protected init(async: true): Promise<Board>;
    /**
     * Initializes the events.
     * @internal
     */
    private initEvents;
    /**
     * Initialize the container for the dashboard.
     * @internal
     *
     * @param renderTo
     * The DOM element to render to, or its id.
     */
    private initContainer;
    /**
     * Inits creating a layouts and setup the EditMode tools.
     * @internal
     *
     */
    private initEditMode;
    /**
     * Set the components from options.
     * @internal
     *
     * @param components
     * An array of component options.
     *
     */
    setComponents(components: Array<Partial<ComponentType['options']>>): Array<Promise<Component | void>>;
    /**
     * Destroy the whole dashboard, its layouts and elements.
     */
    destroy(): void;
    /**
     * Reflow the dashboard. Hide the toolbars and context pointer. Reflow the
     * layouts and its cells.
     */
    reflow(): void;
    /**
     * Convert the current state of board's options into JSON. The function does
     * not support converting functions or events into JSON object.
     *
     * @returns
     * Dashboards options.
     */
    getOptions(): Globals.DeepPartial<Board.Options>;
    /**
     * Get a Dashboards component by its identifier.
     *
     * @param id
     * The identifier of the requested component.
     *
     * @returns
     * The component with the given identifier.
     */
    getComponentById(id: string): ComponentType | undefined;
    /**
     * Get a Dashboards component by its cell identifier.
     *
     * @param id
     * The identifier of the cell that contains the requested component.
     *
     * @returns
     * The component with the given cell identifier.
     */
    getComponentByCellId(id: string): ComponentType | undefined;
}
declare namespace Board {
    /**
     * Options to configure the board.
     **/
    interface Options {
        /**
         * Data pool with all of the connectors.
         **/
        dataPool?: DataPoolOptions;
        /**
         * Options for the GUI. Allows to define graphical elements and its
         * layout.
         **/
        gui?: GUIOptions;
        /**
         * Options for the edit mode. Can be used to enable the edit mode and
         * define all things related to it like the context menu.
         **/
        editMode?: EditMode.Options;
        /**
         * List of components to add to the board.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/components/component-highcharts | Highcharts component}
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/components/component-html | HTML component}
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/components/component-kpi | KPI component}
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/components/custom-component | Custom component}
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/grid-component/grid-options | Datagrid component}
         *
         **/
        components?: Array<Partial<ComponentType['options']>>;
        /**
         * General options for the components.
         **/
        componentOptions?: Partial<Component.Options>;
        /**
         * Events related to the board.
         */
        events?: BoardEvents;
    }
    interface GUIOptions {
        /**
         * Whether the GUI is enabled or not.
         *
         * @default true
         **/
        enabled?: boolean;
        /**
         * General options for the layouts applied to all layouts.
         **/
        layoutOptions?: Partial<Layout.Options>;
        /**
         * Allows to define graphical elements and its layout. The layout is
         * defined by the row and cells. The row is a horizontal container for
         * the cells. The cells are containers for the elements. The layouts
         * can be nested inside the cells.
         **/
        layouts: Array<Layout.Options>;
    }
    /**
     * Events related to the board.
     */
    interface BoardEvents {
        /**
         * Callback function to be called after the board and all components are
         * initialized.
         */
        mounted: MountedEventCallback;
    }
    /**
     * Callback function to be called when a board event is triggered.
     */
    type MountedEventCallback = (this: Board) => void;
    /**
     * Global dashboard settings.
     */
    const defaultOptions: Board.Options;
}
export default Board;
