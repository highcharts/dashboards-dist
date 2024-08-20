/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */
import U from '../../../Core/Utilities.js';
import EditGlobals from '../EditGlobals.js';
import EditToolbar from './EditToolbar.js';
import GUIElement from '../../Layout/GUIElement.js';
const { fireEvent, merge, objectEach } = U;
/**
 * @internal
 */
class RowEditToolbar extends EditToolbar {
    static getMenuItemsConfig(options, iconURLPrefix) {
        const items = [];
        if (options.dragDrop?.enabled) {
            items.push({
                id: 'drag',
                type: 'icon',
                icon: iconURLPrefix + 'drag.svg',
                events: {
                    onmousedown: function (e) {
                        const rowEditToolbar = this.menu
                            .parent, dragDrop = rowEditToolbar.editMode.dragDrop;
                        e.preventDefault();
                        if (dragDrop && rowEditToolbar.row) {
                            dragDrop.onDragStart(e, rowEditToolbar.row);
                        }
                    }
                }
            });
        }
        items.push({
            id: 'destroy',
            type: 'icon',
            className: EditGlobals.classNames.menuDestroy,
            icon: iconURLPrefix + 'destroy.svg',
            events: {
                click: function () {
                    const parentNode = this.menu.parent, editMode = this.menu.parent.editMode, popup = editMode.confirmationPopup;
                    popup.show({
                        confirmButton: {
                            value: editMode.lang.confirmButton,
                            callback: parentNode.onRowDestroy,
                            context: parentNode
                        },
                        cancelButton: {
                            value: editMode.lang.cancelButton,
                            callback: () => {
                                popup.closePopup();
                            }
                        },
                        text: editMode.lang.confirmDestroyRow
                    });
                }
            }
        });
        return items;
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor(editMode) {
        super(editMode, merge(RowEditToolbar.defaultOptions, (editMode.options.toolbars || {}).row, {
            menu: {
                items: RowEditToolbar.getMenuItemsConfig(editMode.options, editMode.iconsURLPrefix)
            }
        }));
        this.menu.initItems({});
    }
    /* *
     *
     *  Functions
     *
     * */
    refreshOutline(x, y) {
        const toolbar = this, offsetWidth = 2;
        if (toolbar.row && toolbar.row.container) {
            super.refreshOutline(x, y, this.row, offsetWidth);
        }
    }
    showToolbar(row) {
        const toolbar = this;
        const rowCnt = row.container;
        const rowToolbar = toolbar.editMode.rowToolbar;
        let x;
        let y;
        let offsetX;
        if (!rowToolbar) {
            return;
        }
        if (rowCnt &&
            toolbar.editMode.isActive() &&
            !(toolbar.editMode.dragDrop || {}).isActive) {
            const rowOffsets = GUIElement.getOffsets(row, toolbar.editMode.board.container);
            const rowWidth = rowOffsets.right - rowOffsets.left;
            objectEach(toolbar.menu.items, (item) => {
                if (!row.options?.editMode?.toolbarItems) {
                    item.activate();
                    return;
                }
                const toolbarItems = row.options.editMode.toolbarItems;
                if (toolbarItems[item.options.id]
                    ?.enabled === false) {
                    item.deactivate();
                    return;
                }
                item.activate();
            });
            offsetX = rowWidth / 2 - toolbar.container.clientWidth / 2;
            x = rowOffsets.left + offsetX;
            y = rowOffsets.top - toolbar.container.clientHeight;
            toolbar.setPosition(x, y);
            toolbar.row = row;
            toolbar.refreshOutline(-offsetX, toolbar.container.clientHeight);
            rowToolbar.isVisible = true;
        }
        else if (toolbar.isVisible) {
            toolbar.hide();
            rowToolbar.isVisible = false;
        }
    }
    onRowOptions() {
        const toolbar = this;
        if (toolbar.editMode.sidebar) {
            toolbar.editMode.sidebar.show(toolbar.row);
        }
    }
    onRowDestroy() {
        const toolbar = this;
        if (toolbar.row) {
            const rowId = toolbar.row.options.id || -1;
            this.resetEditedRow();
            toolbar.row.destroy();
            toolbar.row = void 0;
            // Hide row and cell toolbars.
            toolbar.editMode.hideToolbars(['cell', 'row']);
            fireEvent(toolbar.editMode, 'layoutChanged', {
                type: 'rowDestroyed',
                target: rowId,
                board: toolbar.editMode.board
            });
        }
    }
    resetEditedRow() {
        /// super.resetCurrentElements(this.row as Row, true);
        this.editedRow = void 0;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
RowEditToolbar.defaultOptions = {
    enabled: true,
    className: EditGlobals.classNames.editToolbar,
    outline: true,
    outlineClassName: EditGlobals.classNames.editToolbarRowOutline,
    menu: {
        className: EditGlobals.classNames.editToolbarRow,
        itemsClassName: EditGlobals.classNames.editToolbarItem,
        items: []
    }
};
export default RowEditToolbar;
