import type Board from '../Board';
import type { Options as CellEditToolbarOptions } from './Toolbar/CellEditToolbar';
import type { Options as ConfirmationPopupOptions } from './ConfirmationPopup';
import type { Options as DragDropOptions } from '../Actions/DragDrop';
import type { LangOptions } from './EditGlobals';
import type { Options as EditContextMenuOptions } from './EditContextMenu';
import type { Options as ResizerOptions } from '../Actions/Resizer';
import type { Options as RowEditToolbarOptions } from './Toolbar/RowEditToolbar';
import type { Options as SidebarPopupOptions } from './SidebarPopup';
import CellEditToolbar from './Toolbar/CellEditToolbar.js';
import RowEditToolbar from './Toolbar/RowEditToolbar.js';
import SidebarPopup from './SidebarPopup.js';
import ConfirmationPopup from './ConfirmationPopup.js';
declare class EditMode {
    /**
     * Whether the board is generated with custom HTML.
     */
    customHTMLMode: boolean;
    /**
     * Edit mode options.
     */
    options: Options;
    /**
     * URL from which the icons will be fetched.
     */
    iconsURLPrefix: string;
    /**
     * Dashboards' board instance.
     */
    board: Board;
    /**
     * Language dictionary.
     */
    lang: LangOptions;
    /**
     * Instance of the toolbar, which is displayed for the cell.
     */
    cellToolbar?: CellEditToolbar;
    /**
     * Instance of the toolbar, which is displayed for the row.
     */
    rowToolbar?: RowEditToolbar;
    /**
     * Instance of the sidebar.
     */
    sidebar?: SidebarPopup;
    /**
     * Instance of the confirmation popup.
     */
    confirmationPopup?: ConfirmationPopup;
    /**
     * Activate or deactivate edit mode.
     */
    toggleEditMode(): void;
    /**
     * Event fired when detecting context on drag&drop.
     */
    onDetectContext(): void;
    /**
     * Stops the context detection.
     */
    stopContextDetection(): void;
    /**
     * Confirms the selected context.
     */
    onContextConfirm(): void;
}
export interface Options {
    /**
     * Context menu options.
     */
    contextMenu?: EditContextMenuOptions;
    /**
     * Confirmation popup options.
     */
    confirmationPopup?: ConfirmationPopupOptions;
    /**
     * Whether the edit mode should be enabled for the dashboards.
     *
     * Try it:
     *
     * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/edit-mode/ctx-enabled/ | context enabled}
     *
     * @default false
     *
     */
    enabled?: boolean;
    /**
     * Drag and drop options.
     */
    dragDrop?: DragDropOptions;
    /**
     * The URL prefix for the icons used in the edit mode like the context
     * menu icons, the row and cell edit toolbar icons, etc.
     *
     * @default dashboards/gfx/dashboards-icons/
     */
    iconsURLPrefix?: string;
    /**
     * Additional Language options.
     *
     * Try it:
     *
     * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/edit-mode/lang/ | Norwegian language}
     */
    lang?: LangOptions;
    /**
     * Resize options.
     */
    resize?: ResizerOptions;
    /**
     * Settings options.
     */
    settings?: SettingsOptions;
    /**
     * Toolbar options.
     *
     * Try it:
     *
     * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/edit-mode/toolbars-disabled}
     */
    toolbars?: Toolbars;
    /**
     * Tools options.
     */
    tools?: Tools;
    /**
     * Fullscreen options.
     */
    viewFullscreen?: ViewFullscreenOptions;
}
/**
 * Settings options
 */
export interface SettingsOptions {
    /**
     * Whether the toolbar settings buttons should be enabled.
     *
     * @default true
     */
    enabled?: boolean;
}
export interface ViewFullscreenOptions {
    /**
     * Whether the view fullscreen button should be enabled.
     *
     * @default true
     */
    enabled?: boolean;
}
/**
* Toolbar options.
*/
export interface Toolbars {
    /**
    * Options of the cell toolbar.
    *
    * When the cell toolbar is disabled, the Add Component button is not
    * displayed.
    */
    cell?: CellEditToolbarOptions;
    /**
    * Options of the row toolbar.
    */
    row?: RowEditToolbarOptions;
    /**
    * Options of the sidebar.
    */
    sidebar?: SidebarPopupOptions;
}
/**
* Tools options.
*/
export interface Tools {
    /**
    * Add Component button options.
    */
    addComponentBtn?: AddComponentBtn;
}
/**
* Add Component Button options.
*/
export interface AddComponentBtn {
    /**
     * Whether the Add Component button should be visible.
     *
     * Note that the Add Component button is always disabled when cell
     * toolbars are disabled.
     *
     * @default true
     *
     */
    enabled?: boolean;
    /**
     * URL to the Add Component button icon.
     */
    icon: string;
}
export default EditMode;
