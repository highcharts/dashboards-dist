import type { Options as ComponentOptions } from './Components/Component';
import type ComponentType from './Components/ComponentType';
import type DataPoolOptions from '../Data/DataPoolOptions';
import type { DeepPartial } from '../Shared/Types';
import type { Options as EditModeOptions } from './EditMode/EditMode';
import type { Options as LayoutOptions } from './Layout/Layout';
import type { MountedComponent } from './Actions/Bindings';
import DataCursor from '../Data/DataCursor.js';
import DataPool from '../Data/DataPool.js';
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
 *          renderTo: 'dashboard-col-0',
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
    static board(renderTo: (string | globalThis.HTMLElement), options: Options, async?: boolean): Board;
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
    static board(renderTo: (string | globalThis.HTMLElement), options: Options, async: true): Promise<Board>;
    /**
     * The main container for the dashboard. Created inside the element
     * specified by user when creating the dashboard.
     */
    container: HTMLElement;
    /**
     * The data cursor instance used for emitting events on the data.
     */
    dataCursor: DataCursor;
    /**
     * The data pool instance with all the connectors.
     */
    dataPool: DataPool;
    /**
     * The unique id of the dashboard, it is generated automatically.
     */
    readonly id: string;
    /**
     * Index of the board in the global boards array. Allows to access the
     * specific one when having multiple dashboards.
     */
    readonly index: number;
    /**
     * An array of generated layouts.
     */
    layouts: Array<Layout>;
    /**
     * An array of mounted components on the dashboard.
     */
    mountedComponents: Array<MountedComponent>;
    /**
     * The options for the dashboard.
     */
    options: Options;
    /**
     * Reference to ResizeObserver, which allows running 'unobserve'.
     */
    private resizeObserver?;
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
     * Update the dashboard with new options.
     *
     * @param newOptions
     * The new options to apply to the dashboard.
     */
    update(newOptions: DeepPartial<Options>): void;
    /**
     * Convert the current state of board's options into JSON. The function does
     * not support converting functions or events into JSON object.
     *
     * @returns
     * Dashboards options.
     */
    getOptions(): DeepPartial<Options>;
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
/**
 * Options to configure the board.
 **/
export interface Options {
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
    editMode?: EditModeOptions;
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
     * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/grid-component/grid-options | grid component}
     *
     **/
    components?: Array<Partial<ComponentType['options']>>;
    /**
     * General options for the components.
     **/
    componentOptions?: Partial<ComponentOptions>;
    /**
     * Events related to the board.
     */
    events?: BoardEvents;
}
export interface GUIOptions {
    /**
     * Whether the GUI is enabled or not.
     *
     * @default true
     **/
    enabled?: boolean;
    /**
     * General options for the layouts applied to all layouts.
     **/
    layoutOptions?: Partial<LayoutOptions>;
    /**
     * Allows to define graphical elements and its layout. The layout is
     * defined by the row and cells. The row is a horizontal container for
     * the cells. The cells are containers for the elements. The layouts
     * can be nested inside the cells.
     **/
    layouts: Array<LayoutOptions>;
}
/**
 * Events related to the board.
 */
export interface BoardEvents {
    /**
     * Callback function to be called after the board and all components are
     * initialized.
     */
    mounted: MountedEventCallback;
}
/**
 * Callback function to be called when a board event is triggered.
 */
export type MountedEventCallback = (this: Board) => void;
export default Board;
