/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  Pawel Lysy
 *
 * */
'use strict';
import AST from '../../Core/Renderer/HTML/AST.js';
import CellHTML from '../Layout/CellHTML.js';
import AccordionMenu from './AccordionMenu.js';
import BaseForm from '../../Shared/BaseForm.js';
import Bindings from '../Actions/Bindings.js';
import Cell from '../Layout/Cell.js';
import EditGlobals from './EditGlobals.js';
import EditRenderer from './EditRenderer.js';
import GUIElement from '../Layout/GUIElement.js';
import Layout from '../Layout/Layout.js';
import U from '../../Core/Utilities.js';
const { addEvent, createElement, fireEvent, merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Class which creates the sidebar and handles its behavior.
 *
 * @internal
 */
class SidebarPopup extends BaseForm {
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructor of the SidebarPopup class.
     *
     * @param parentDiv
     * Element to which the sidebar will be appended.
     *
     * @param iconsURL
     * URL to the icons.
     *
     * @param editMode
     * Instance of EditMode.
     */
    constructor(parentDiv, iconsURL, editMode) {
        super(parentDiv, iconsURL);
        /**
         * Options used in the sidebar.
         */
        this.options = {
            components: ['HTML', 'row', 'Highcharts', 'DataGrid', 'KPI']
        };
        /**
         * Whether the sidebar is visible.
         */
        this.isVisible = false;
        /**
         * List of components that can be added to the board.
         */
        this.componentsList = [];
        this.editMode = editMode;
        this.options = merge(this.options, editMode.options.toolbars?.sidebar || {});
        this.componentsList = this.getComponentsList(this.options.components || []);
        this.accordionMenu = new AccordionMenu(this.iconsURL, this.hide.bind(this));
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Function to detect on which side of the screen should the sidebar be.
     *
     * @param context
     * The cell or row which is the context of the sidebar.
     *
     * @returns
     * Whether the sidebar should be on the right side of the screen.
     */
    detectRightSidebar(context) {
        const editMode = this.editMode;
        const layoutWrapper = editMode.customHTMLMode ?
            editMode.board.container : editMode.board.layoutsWrapper;
        if (!layoutWrapper) {
            return false;
        }
        return GUIElement.getOffsets(context, layoutWrapper).left < ((layoutWrapper.offsetWidth / 2) - 10); // 10 = snap
    }
    /**
     * Function to remove the class names from the sidebar.
     */
    removeClassNames() {
        const classNames = EditGlobals.classNames, classList = this.container.classList;
        classList.remove(classNames.editSidebarShow);
        classList.remove(classNames.editSidebarRightShow);
    }
    /**
     * Function to add the class names to the sidebar depending on the position
     * of the sidebar.
     *
     * @param isRightSidebar
     * Whether the sidebar should be on the right side of the screen.
     */
    addClassNames(isRightSidebar) {
        const classList = this.container.classList;
        if (isRightSidebar) {
            classList.add(EditGlobals.classNames.editSidebarRight);
        }
        else {
            classList.remove(EditGlobals.classNames.editSidebarRight);
        }
        setTimeout(() => {
            classList.add(EditGlobals.classNames[isRightSidebar ? 'editSidebarRightShow' : 'editSidebarShow']);
        });
    }
    /**
     * Function to show the sidebar.
     *
     * @param context
     * The cell or row which is the context of the sidebar.
     */
    show(context) {
        const editMode = this.editMode, isRightSidebar = !!(context && this.detectRightSidebar(context));
        this.showPopup(EditGlobals.classNames.editSidebarShow);
        this.addClassNames(isRightSidebar);
        if (editMode.resizer) {
            editMode.resizer.disableResizer();
        }
        // Remove highlight from the row.
        if (Cell.isCell(editMode.editCellContext) &&
            editMode.editCellContext.row) {
            editMode.editCellContext.row.setHighlight();
        }
        editMode.hideToolbars(['cell', 'row']);
        editMode.stopContextDetection();
        this.isVisible = true;
        this.generateContent(context);
    }
    generateContent(context) {
        // Reset
        this.container.innerHTML = AST.emptyHTML;
        // Title
        this.renderHeader(context ?
            this.editMode.lang.settings :
            this.editMode.lang.addComponent, '');
        // Render content wrapper
        this.sidebarWrapper = createElement('div', {
            className: EditGlobals.classNames.editSidebarWrapper
        }, void 0, this.container);
        if (!context) {
            this.renderAddComponentsList();
            return;
        }
        this.type = context.getType();
        if (this.type === 'cell-html' || this.type === 'cell') {
            const component = context.mountedComponent;
            if (!component) {
                return;
            }
            this.accordionMenu.renderContent(this.sidebarWrapper, component, this.container);
        }
    }
    renderAddComponentsList() {
        const sidebar = this;
        const components = this.componentsList;
        let gridElement;
        const gridWrapper = createElement('div', {
            className: EditGlobals.classNames.editGridItems
        }, {}, sidebar.sidebarWrapper);
        for (let i = 0, iEnd = components.length; i < iEnd; ++i) {
            gridElement = createElement('div', {}, {}, gridWrapper);
            // Drag drop new component.
            gridElement.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const dragDrop = sidebar.editMode.dragDrop;
                if (dragDrop) {
                    // Workaround for Firefox, where mouseleave is not triggered
                    // correctly when dragging.
                    const onMouseMove = (event) => {
                        const rect = sidebar.container.getBoundingClientRect();
                        if (event.clientX < rect.left ||
                            event.clientX > rect.right ||
                            event.clientY < rect.top ||
                            event.clientY > rect.bottom) {
                            sidebar.hide();
                            document.removeEventListener('mousemove', onMouseMove);
                        }
                    };
                    // Clean up event listeners
                    const onMouseUp = () => {
                        document.removeEventListener('mousemove', onMouseMove);
                        document.removeEventListener('mouseup', onMouseUp);
                    };
                    // Add event listeners
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                    dragDrop.onDragStart(e, void 0, (dropContext) => {
                        // Add component if there is no layout yet.
                        if (this.editMode.board.layouts.length === 0) {
                            const board = this.editMode.board, newLayoutId = GUIElement.getElementId('layout'), layout = new Layout(board, {
                                id: newLayoutId,
                                copyId: '',
                                parentContainerId: board.container.id,
                                rows: [{}],
                                style: {}
                            });
                            if (layout) {
                                board.layouts.push(layout);
                            }
                            dropContext = layout.rows[0];
                        }
                        if (!dropContext?.type) {
                            const layouts = sidebar.editMode.board.layouts;
                            dragDrop.dropContext = dropContext =
                                layouts[layouts.length - 1].addRow({}, void 0);
                        }
                        const newCell = components[i].onDrop(sidebar, dropContext);
                        /* eslint-disable max-len */
                        const unbindLayoutChanged = addEvent(this.editMode, 'layoutChanged', (e) => {
                            if (newCell && e.type === 'newComponent') {
                                const chart = newCell.mountedComponent?.chart;
                                const settingsEnabled = this.editMode.options.settings?.enabled;
                                if (chart?.isDirtyBox) {
                                    const unbind = addEvent(chart, 'render', () => {
                                        sidebar.editMode.setEditCellContext(newCell);
                                        if (settingsEnabled) {
                                            sidebar.show(newCell);
                                            newCell.setHighlight();
                                        }
                                        unbind();
                                        unbindLayoutChanged();
                                    });
                                }
                                else {
                                    sidebar.editMode.setEditCellContext(newCell);
                                    if (settingsEnabled) {
                                        sidebar.show(newCell);
                                        newCell.setHighlight();
                                    }
                                    unbindLayoutChanged();
                                }
                            }
                        });
                        /* eslint-enable max-len */
                        // Clean up event listener after drop is complete
                        document.removeEventListener('mousemove', onMouseMove);
                    });
                }
            });
            gridElement.innerHTML = components[i].text;
        }
        return;
    }
    onDropNewComponent(dropContext, componentOptions) {
        const sidebar = this, dragDrop = sidebar.editMode.dragDrop;
        if (!dragDrop) {
            return;
        }
        const row = (dropContext.getType() === 'cell' ?
            dropContext.row :
            dropContext), newCell = row.addCell({
            id: GUIElement.getElementId('col')
        });
        dragDrop.onCellDragEnd(newCell);
        const options = merge(componentOptions, {
            cell: newCell.id
        });
        const componentPromise = Bindings.addComponent(options, sidebar.editMode.board, newCell);
        sidebar.editMode.setEditOverlay(!this.editMode.options.settings?.enabled);
        void (async () => {
            const component = await componentPromise;
            if (!component) {
                return;
            }
            fireEvent(this.editMode, 'layoutChanged', {
                type: 'newComponent',
                target: component
            });
        })();
        return newCell;
    }
    /**
     * Function to hide the sidebar.
     */
    hide() {
        const editMode = this.editMode;
        const editCellContext = editMode.editCellContext;
        this.removeClassNames();
        this.container.style.display = 'none';
        // Remove edit overlay if active.
        if (editMode.isEditOverlayActive) {
            editMode.setEditOverlay(true);
        }
        if (Cell.isCell(editCellContext) && editCellContext.row) {
            editMode.showToolbars(['cell', 'row'], editCellContext);
            editCellContext.row.setHighlight(true);
            editCellContext.setHighlight(true);
            if (editMode.resizer) {
                editMode.resizer.setSnapPositions(editMode.editCellContext);
            }
        }
        else if (CellHTML.isCellHTML(editCellContext) && editMode.cellToolbar) {
            editMode.cellToolbar.showToolbar(editCellContext);
            editCellContext.setHighlight();
        }
        editMode.isContextDetectionActive = true;
        this.isVisible = false;
    }
    /**
     * Function called when the close button is pressed.
     *
     * @override BaseForm.closeButtonEvents
     */
    closeButtonEvents() {
        if (this.type === 'cell' || this.type === 'cell-html') {
            this.accordionMenu.cancelChanges();
        }
        else {
            this.hide();
        }
    }
    renderHeader(title, iconURL) {
        if (!this.container) {
            return;
        }
        const headerWrapper = createElement('div', {
            className: EditGlobals.classNames.editSidebarHeader
        }, {}, this.container);
        this.container.appendChild(headerWrapper);
        this.headerWrapper = headerWrapper;
        const icon = EditRenderer.renderIcon(this.headerWrapper, {
            icon: iconURL,
            className: EditGlobals.classNames.editSidebarTitle
        });
        if (icon) {
            icon.textContent = title;
        }
        this.headerWrapper?.appendChild(this.closeButton);
    }
    /**
     * Based on the provided components list, it returns the list of components
     * with its names and functions that are called when the component is
     * dropped.
     *
     * @param components
     * List of components that can be added to the board.
     */
    getComponentsList(components) {
        const sidebar = this, editMode = sidebar.editMode, componentTypes = editMode.board.componentTypes, componentList = [];
        components.forEach((componentName) => {
            const component = componentTypes[componentName];
            if (component) {
                componentList.push({
                    text: editMode.lang?.sidebar[componentName] ||
                        component.name,
                    onDrop: function (sidebar, dropContext) {
                        const options = component.prototype.getOptionsOnDrop(sidebar);
                        if (options) {
                            return sidebar.onDropNewComponent(dropContext, options);
                        }
                    }
                });
            }
            else if (componentName === 'row') {
                componentList.push({
                    ...SidebarPopup.addRow,
                    text: editMode.lang?.sidebar[componentName] ||
                        SidebarPopup.addRow.text
                });
            }
        });
        return componentList;
    }
    /**
     * Function to create and add the close button to the sidebar.
     *
     * @param className
     * Class name of the close button.
     * @returns Close button element
     */
    addCloseButton(className = EditGlobals.classNames.popupCloseButton) {
        // Close popup when click outside the popup
        addEvent(document, 'click', (event) => {
            event.stopPropagation();
            if (this.container.style.display === 'block' &&
                !this.container.contains(event.target) &&
                this.container.classList.value.includes('show')) {
                if (this.type === 'cell' || this.type === 'cell-html') {
                    this.accordionMenu.cancelChanges();
                }
                else {
                    this.hide();
                }
            }
        });
        return super.addCloseButton.call(this, className);
    }
    /**
     * Function that creates the container of the sidebar.
     *
     * @param parentDiv
     * The parent div to which the sidebar will be appended.
     * @param className
     * Class name of the sidebar.
     * @returns The container of the sidebar.
     */
    createPopupContainer(parentDiv, className = EditGlobals.classNames.editSidebar) {
        return super.createPopupContainer.call(this, parentDiv, className);
    }
}
SidebarPopup.addRow = {
    text: EditGlobals.lang.sidebar.row,
    onDrop: function (sidebar, dropContext) {
        if (!dropContext) {
            return;
        }
        const isCellType = dropContext.getType() === 'cell', row = isCellType ? dropContext.row :
            dropContext, board = row.layout.board, cellId = GUIElement.getElementId('cell');
        if (isCellType) {
            const newLayoutId = GUIElement.getElementId('layout');
            const layout = new Layout(board, {
                id: newLayoutId,
                copyId: '',
                parentContainerId: board.container.id,
                rows: [{
                        cells: [{
                                id: cellId
                            }]
                    }],
                style: {}
            });
            board.layouts.push(layout);
            fireEvent(board.editMode, 'layoutChanged', {
                type: 'newLayout',
                target: layout,
                board
            });
        }
        else {
            dropContext.layout.rows[0].addCell({
                id: cellId
            });
        }
        void Bindings.addComponent({
            type: 'HTML',
            cell: cellId,
            className: 'highcharts-dashboards-component-placeholder',
            html: `
                    <h2> Placeholder </h2>
                    <span> This placeholder can be deleted when you add extra
                        components to this row.
                    </span>
                    `
        }, board);
    }
};
/* *
 *
 *  Default Export
 *
 * */
export default SidebarPopup;
