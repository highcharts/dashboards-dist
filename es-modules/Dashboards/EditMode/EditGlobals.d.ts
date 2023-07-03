/**
 * @internal
 */
declare const EditGlobals: EditGlobals;
/**
 * @internal
 */
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
        button: string;
        cellEditHighlight: string;
        collapsableContentHeader: string;
        confirmationPopup: string;
        contextDetectionPointer: string;
        contextMenu: string;
        contextMenuBtn: string;
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
        popupConfirmBtn: string;
        popupContentContainer: string;
        resizePointer: string;
        resizeSnap: string;
        resizeSnapX: string;
        resizeSnapY: string;
        resizerMenuBtnActive: string;
        rotateElement: string;
        rowContextHighlight: string;
        separator: string;
        sidebarCloseButton: string;
        sidebarNavButton: string;
        toggleContainer: string;
        toggleLabels: string;
        toggleSlider: string;
        toggleWrapper: string;
        toggleWrapperColored: string;
        viewFullscreen: string;
    }
    interface LangOptions {
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
        confirmButton: string;
        /**
         * @default 'Do you want to destroy the cell?'
         */
        confirmDestroyCell: string;
        /**
         * @default 'Do you want to destroy the row?'
         */
        confirmDestroyRow: string;
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
         * @default 'Large'
         */
        large: string;
        /**
         * @default 'Medium'
         */
        medium: string;
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
         * @default 'Scale elements'
         */
        scaleElements: string;
        /**
         * @default 'Settings'
         */
        settings: string;
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
        [key: string]: string;
    }
    type TLangKeys = 'editMode' | 'verticalSeparator';
}
export default EditGlobals;
