import type Row from '../Layout/Row';
import type Board from '../Board';
import type { HTMLDOMElement } from '../../Core/Renderer/DOMElementType';
import Cell from '../Layout/Cell.js';
import CellHTML from '../Layout/CellHTML.js';
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
     * Edit mode constructor.
     * @internal
      *
     * @param board
     * Board instance
     *
     * @param options
     * Edit mode options
     */
    constructor(board: Board, options?: EditMode.Options);
    /**
     * @internal
     */
    private active;
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
     * @internal
     */
    dragDrop?: DragDrop;
    /**
     * @internal
     */
    resizer?: Resizer;
    /**
     * Whether the instance of edit mode was initialized.
     * @internal
     */
    isInitialized: boolean;
    /**
     * HTML Element responsible for adding the component.
     * @internal
     */
    addComponentBtn?: HTMLDOMElement;
    /**
     * @internal
     */
    tools: EditMode.Tools;
    /**
     * Instance of the confirmation popup.
     */
    confirmationPopup?: ConfirmationPopup;
    /**
     * @internal
     * Whether the context detection is active.
     */
    isContextDetectionActive: boolean;
    /**
     * @internal
     */
    mouseCellContext?: Cell | CellHTML;
    /**
     * @internal
     */
    mouseRowContext?: Row;
    /**
     * @internal
     */
    potentialCellContext?: Cell | CellHTML;
    /**
     * @internal
     */
    editCellContext?: Cell | CellHTML;
    /**
     * @internal
     */
    contextPointer?: EditMode.ContextPointer;
    /**
     * @internal
     */
    editOverlay?: HTMLDOMElement;
    /**
     * @internal
     */
    isEditOverlayActive?: boolean;
    /**
     * Event to fire on click of the context button.
     * @internal
     */
    onContextBtnClick(): void;
    /**
     * Activate or deactivate edit mode.
     */
    toggleEditMode(): void;
    /**
     * Init the instance of edit mode.
     * @internal
     */
    init(): void;
    /**
     * Init events for edit mode.
     * @internal
     */
    private initEvents;
    /**
     * Initialize the container for the layouts.
     * @internal
     *
     */
    private initLayout;
    /**
     * Creates a new layouts and adds it to the dashboard based on the options.
     * @internal
     *
     * @param guiOptions
     * The GUI options for the layout.
     *
     */
    private setLayouts;
    /**
     * Set events for the layout.
     * @internal
     */
    private setLayoutEvents;
    /**
     * Set events for the row.
     * @internal
     */
    setRowEvents(row: Row): void;
    /**
     * Set events for the cell.
     * @internal
     */
    setCellEvents(cell: Cell | CellHTML): void;
    /**
     * Activate the edit mode.
     * @internal
     */
    activate(): void;
    /**
     * Deactivate the edit mode.
     * @internal
     */
    deactivate(): void;
    /**
     * Function to check whether the edit mode is activated.
     * @internal
     *
     * @returns
     * Whether the edit mode is activated.
     */
    isActive(): boolean;
    /**
     * Method for hiding edit toolbars.
     * @internal
     *
     * @param toolbarTypes
     * The array of toolbar names to hide ('cell', 'row', 'sidebar').
     */
    hideToolbars(toolbarTypes?: Array<string>): void;
    /**
     * Method for hiding edit toolbars.
     * @internal
     *
     * @param toolbarTypes
     * The array of toolbar names to hide ('cell', 'row', 'sidebar').
     *
     * @param currentCell
     * The cell reference for toolbar.
     *
     */
    showToolbars(toolbarTypes?: Array<string>, currentCell?: Cell): void;
    /**
     * Creates the buttons such as `addComponent` button, context menu button
     * and its container.
     * @internal
     */
    createTools(): void;
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
    /**
     * Sets the edit cell context.
     * @internal
     */
    setEditCellContext(editCellContext: Cell | CellHTML, oldEditCellContext?: Cell | CellHTML): void;
    /**
     * Method for showing and positioning context pointer.
     * @internal
     */
    private showContextPointer;
    /**
     * Method for hiding context pointer.
     * @internal
     */
    hideContextPointer(): void;
    /**
     * Adds/Removes the edit mode overlay.
     * @internal
     *
     * @param remove
     * Whether the edit overlay should be removed.
     */
    setEditOverlay(remove?: boolean): void;
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
        /**
         * RWD buttons options.
         *
         * RWD buttons are permanently disabled since the change from
         * options-managed responsiveness to fully CSS-managed.
         *
         * @deprecated
         */
        rwdButtons?: RwdButtons;
        /**
        * @internal
        */
        contextMenu?: EditContextMenu;
        /**
        * @internal
        */
        contextButtonElement?: HTMLDOMElement;
        /**
        * @internal
        */
        container?: HTMLDOMElement;
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
    /**
     * Deprecated RWD buttons options.
     *
     * RWD buttons are permanently disabled since the change from
     * options-managed responsiveness to fully CSS-managed.
     *
     * @deprecated
     */
    interface RwdButtons {
        /**
         * Whether the RWD buttons should be visible.
         *
         * @deprecated
         */
        enabled?: boolean;
        /**
         * RWD buttons icons options.
         *
         * @deprecated
         */
        icons: RwdIcons;
    }
    /**
     * RWD Buttons icons options.
     *
     * @deprecated
     */
    interface RwdIcons {
        /**
         * URL to small RWD button icon.
         *
         * @deprecated
         */
        small: string;
        /**
         * URL to medium RWD button icon.
         *
         * @deprecated
         */
        medium: string;
        /**
         * URL to large RWD button icon.
         *
         * @deprecated
         */
        large: string;
    }
    /**
    * @internal
    */
    interface ContextPointer {
        isVisible: boolean;
        element: HTMLDOMElement;
    }
}
export default EditMode;
