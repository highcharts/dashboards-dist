declare const EditGlobals: EditGlobals;
interface EditGlobals {
    classNames: EditGlobals.ClassNamesOptions;
    lang: EditGlobals.LangOptions;
}
declare namespace EditGlobals {
    interface ClassNamesOptions {
        accordionContainer: string;
        accordionContent: string;
        accordionHeader: string;
        accordionHeaderBtn: string;
        accordionHeaderIcon: string;
        accordionMenu: string;
        accordionMenuButton: string;
        accordionMenuButtonsContainer: string;
        accordionNestedWrapper: string;
        accordionStandaloneWrapper: string;
        accordionHeaderWrapper: string;
        button: string;
        cellEditHighlight: string;
        collapsableContentHeader: string;
        confirmationPopup: string;
        contextDetectionPointer: string;
        contextMenu: string;
        contextMenuBtn: string;
        contextMenuBtnText: string;
        contextMenuItem: string;
        currentEditedElement: string;
        customSelect: string;
        customSelectButton: string;
        dashboardCellEditHighlightActive: string;
        dragMock: string;
        dropPointer: string;
        dropdown: string;
        dropdownButton: string;
        dropdownButtonContent: string;
        dropdownContent: string;
        dropdownIcon: string;
        editGridItems: string;
        editModeEnabled: string;
        editOverlay: string;
        editOverlayActive: string;
        editSidebar: string;
        editSidebarHide: string;
        editSidebarHeader: string;
        editSidebarMenuItem: string;
        editSidebarRight: string;
        editSidebarRightShow: string;
        editSidebarShow: string;
        editSidebarTabBtn: string;
        editSidebarTabBtnWrapper: string;
        editSidebarTitle: string;
        editSidebarWrapper: string;
        editToolbar: string;
        editToolbarCell: string;
        editToolbarCellOutline: string;
        editToolbarItem: string;
        editToolbarRow: string;
        editToolbarRowOutline: string;
        editTools: string;
        editToolsBtn: string;
        hiddenElement: string;
        icon: string;
        labelText: string;
        maskElement: string;
        menu: string;
        menuDestroy: string;
        menuHorizontalSeparator: string;
        menuItem: string;
        menuVerticalSeparator: string;
        popupCloseButton: string;
        popupCancelBtn: string;
        popupConfirmBtn: string;
        popupButtonContainer: string;
        popupContentContainer: string;
        resizePointer: string;
        resizeSnap: string;
        resizeSnapX: string;
        resizeSnapY: string;
        resizerMenuBtnActive: string;
        collapsedElement: string;
        rowContextHighlight: string;
        separator: string;
        sidebarCloseButton: string;
        sidebarNavButton: string;
        standaloneElement: string;
        toggleContainer: string;
        toggleLabels: string;
        toggleSlider: string;
        toggleWrapper: string;
        toggleWrapperColored: string;
        labeledToggleWrapper: string;
        viewFullscreen: string;
    }
    interface LangOptions {
        /**
         * Accessibility language options for the dashboard.
         */
        accessibility: EditGlobals.LangAccessibilityOptions;
        /**
         * @default 'Add component'
         */
        addComponent: string;
        /**
         * @default 'Cancel'
         */
        cancelButton: string;
        /**
         * @default 'Caption'
         */
        caption: string;
        /**
         * @default 'Chart class name'
         */
        chartClassName: string;
        /**
         * @default 'Chart configuration'
         */
        chartConfig: string;
        /**
         * @default 'Chart ID'
         */
        chartID: string;
        /**
         * @default 'Chart options'
         */
        chartOptions: string;
        /**
         * @default 'Chart type'
         */
        chartType: string;
        /**
         * @default 'Connector name'
         */
        connectorName: string;
        /**
         * @default 'Confirm'
         */
        confirmButton: string;
        /**
         * @default 'Do you really want to destroy the cell?'
         */
        confirmDestroyCell: string;
        /**
         * @default 'Do you really want to destroy the row?'
         */
        confirmDestroyRow: string;
        /**
         * @default 'Do you really want to discard the changes?'
         */
        confirmDiscardChanges: string;
        /**
         * @default 'Data labels'
         */
        dataLabels: string;
        /**
         * @default 'Edit mode'
         */
        editMode: string;
        /**
         * @default 'Something went wrong'
         */
        errorMessage: string;
        /**
         * @default 'Exit full screen'
         */
        exitFullscreen: string;
        /**
         * @default 'Id'
         */
        id: string;
        /**
         * @default 'off'
         */
        off: string;
        /**
         * @default 'on'
         */
        on: string;
        /**
         * @default 'Point format'
         */
        pointFormat: string;
        /**
         * @default 'Settings'
         */
        settings: string;
        /**
         * Options for the sidebar and its components.
         */
        sidebar: SidebarLangOptions;
        /**
         * @default 'Styles'
         */
        style: string;
        /**
         * @default 'Title'
         */
        title: string;
        /**
         * @default 'View in full screen'
         */
        viewFullscreen: string;
        [key: string]: any;
    }
    interface SidebarLangOptions {
        [key: string]: string;
        /**
         * @default 'HTML'
         */
        HTML: string;
        /**
         * @default 'Row'
         */
        row: string;
        /**
         * @default 'Highcharts'
         */
        Highcharts: string;
        /**
         * @default 'DataGrid'
         */
        DataGrid: string;
        /**
         * @default 'KPI'
         */
        KPI: string;
    }
    interface LangAccessibilityOptions {
        contextMenu: LangAccessibilityOptionsContextMenu;
        editMode: LangAccessibilityOptionsEditMode;
    }
    interface LangAccessibilityOptionsContextMenu {
        [key: string]: string;
        /**
         * @default 'Context menu'
         */
        button: string;
    }
    interface LangAccessibilityOptionsEditMode {
        [key: string]: string;
        /**
         * @default 'Edit mode'
         */
        editMode: string;
    }
    type TLangKeys = 'editMode' | 'verticalSeparator';
}
export default EditGlobals;
