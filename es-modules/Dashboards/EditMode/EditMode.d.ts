import type Board from '../Board';
import EditGlobals from './EditGlobals.js';
import CellEditToolbar from './Toolbar/CellEditToolbar.js';
import RowEditToolbar from './Toolbar/RowEditToolbar.js';
import SidebarPopup from './SidebarPopup.js';
import EditContextMenu from './EditContextMenu.js';
import DragDrop from '../Actions/DragDrop.js';
import Resizer from '../Actions/Resizer.js';
import ConfirmationPopup from './ConfirmationPopup.js';
declare class EditMode {
    /**
     * Whether the board is generated with custom HTML.
     */
    customHTMLMode: boolean;
    /**
     * Edit mode options.
     */
    options: EditMode.Options;
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
    lang: EditGlobals.LangOptions;
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
declare namespace EditMode {
    interface Options {
        /**
         * Context menu options.
         */
        contextMenu?: EditContextMenu.Options;
        /**
         * Confirmation popup options.
         */
        confirmationPopup?: ConfirmationPopup.Options;
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
        dragDrop?: DragDrop.Options;
        /**
         * The URL prefix for the icons used in the edit mode like the context
         * menu icons, the row and cell edit toolbar icons, etc.
         *
         * @default @product.assetPrefix@/gfx/dashboards-icons/
         */
        iconsURLPrefix?: string;
        /**
         * Additional Language options.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/edit-mode/lang/ | Norwegian language}
         */
        lang?: EditGlobals.LangOptions;
        /**
         * Resize options.
         */
        resize?: Resizer.Options;
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
    }
    /**
     * Settings options
     */
    interface SettingsOptions {
        /**
         * Whether the toolbar settings buttons should be enabled.
         *
         * @default true
         */
        enabled?: boolean;
    }
    /**
    * Toolbar options.
    */
    interface Toolbars {
        /**
        * Options of the cell toolbar.
        *
        * When the cell toolbar is disabled, the Add Component button is not
        * displayed.
        */
        cell?: CellEditToolbar.Options;
        /**
        * Options of the row toolbar.
        */
        row?: RowEditToolbar.Options;
        /**
        * Options of the sidebar.
        */
        sidebar?: SidebarPopup.Options;
    }
    /**
    * Tools options.
    */
    interface Tools {
        /**
        * Add Component button options.
        */
        addComponentBtn?: AddComponentBtn;
    }
    /**
    * Add Component Button options.
    */
    interface AddComponentBtn {
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
}
export default EditMode;
