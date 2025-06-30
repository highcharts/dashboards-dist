/* *
 *
 *  (c) 2009-2025 Highsoft AS
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
import U from '../../Core/Utilities.js';
const { pick, defined } = U;
import Row from './Row.js';
import GUIElement from './GUIElement.js';
import Globals from '../Globals.js';
/**
 * @internal
 **/
class Layout extends GUIElement {
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Constructs an instance of the Layout class.
     *
     * @param {Dashboard} board
     * Reference to the dashboard instance.
     *
     * @param {Layout.Options} options
     * Options for the layout.
     */
    constructor(board, options, parentCell) {
        super();
        /**
         * The type of GUI element.
         */
        this.type = Globals.guiElementType.layout;
        this.board = board;
        this.rows = [];
        this.options = options;
        this.isVisible = true;
        // Get parent container
        const parentContainer = parentCell ? parentCell.container :
            document.getElementById(options.parentContainerId || '') || board.layoutsWrapper;
        // Set layout level.
        if (parentCell) {
            this.parentCell = parentCell;
            this.level = parentCell.row.layout.level + 1;
        }
        else {
            this.level = 0;
        }
        // GUI structure
        if (options.copyId) {
            this.copyId = options.copyId;
        }
        const layoutOptions = (this.options || {}), layoutClassName = layoutOptions.rowClassName || '';
        this.container = this.getElementContainer({
            render: board.guiEnabled,
            parentContainer: parentContainer,
            attribs: {
                id: (options.id || '') + (this.copyId ? '_' + this.copyId : ''),
                className: Globals.classNames.layout + ' ' +
                    layoutClassName
            },
            elementId: options.id,
            style: this.options.style
        });
        // Init rows from options.
        if (this.options.rows) {
            this.setRows();
        }
    }
    /* *
    *
    *  Functions
    *
    * */
    /**
     * Set the layout rows using rows options or rowClassName.
     */
    setRows() {
        const layout = this, rowsElements = pick(layout.options.rows, layout.container && layout.container.getElementsByClassName(layout.options.rowClassName || '')) || [];
        let rowElement, i, iEnd;
        for (i = 0, iEnd = rowsElements.length; i < iEnd; ++i) {
            rowElement = rowsElements[i];
            layout.addRow(layout.board.guiEnabled ? rowElement : {}, rowElement instanceof HTMLElement ? rowElement : void 0);
        }
    }
    /**
     * Add a new Row instance to the layout rows array.
     *
     * @param {Row.Options} options
     * Options of a row.
     *
     * @param {HTMLElement} rowElement
     * The container for a new row HTML element.
     *
     * @return {Row}
     * Returns the Row object.
     */
    addRow(options, rowElement, index) {
        const layout = this, row = new Row(layout, options, rowElement);
        if (!defined(index)) {
            layout.rows.push(row);
        }
        else {
            layout.mountRow(row, index);
        }
        // Set editMode events.
        if (layout.board.editMode) {
            layout.board.editMode.setRowEvents(row);
        }
        return row;
    }
    /**
     * Destroy the element, its container, event hooks
     * and inner rows.
     */
    destroy() {
        const layout = this;
        for (let i = layout.board.layouts.length - 1; i >= 0; i--) {
            if (layout.board.layouts[i] === layout) {
                layout.board.layouts.splice(i, 1);
            }
        }
        if (layout.parentCell) {
            delete layout.parentCell.nestedLayout;
        }
        // Destroy rows.
        for (let i = layout.rows.length - 1; i >= 0; i--) {
            layout.rows[i].destroy();
        }
        if (layout.parentCell) {
            layout.parentCell.destroy();
        }
        super.destroy();
    }
    // Get row index from the layout.rows array.
    getRowIndex(row) {
        for (let i = 0, iEnd = this.rows.length; i < iEnd; ++i) {
            if (this.rows[i] === row) {
                return i;
            }
        }
    }
    // Add cell to the layout.rows array and move row container.
    mountRow(row, index) {
        const nextRow = this.rows[index], prevRow = this.rows[index - 1];
        if (row.container) {
            if (nextRow && nextRow.container) {
                nextRow.container.parentNode.insertBefore(row.container, nextRow.container);
            }
            else if (prevRow && prevRow.container) {
                prevRow.container.parentNode.insertBefore(row.container, prevRow.container.nextSibling);
            }
            this.rows.splice(index, 0, row);
            row.layout = this;
        }
    }
    // Remove row from the layout.rows array.
    unmountRow(row) {
        const rowIndex = this.getRowIndex(row);
        if (defined(rowIndex)) {
            this.rows.splice(rowIndex, 1);
        }
    }
    getVisibleRows() {
        const rows = [];
        for (let i = 0, iEnd = this.rows.length; i < iEnd; ++i) {
            if (this.rows[i].isVisible) {
                rows.push(this.rows[i]);
            }
        }
        return rows;
    }
    changeVisibility(setVisible = true) {
        const layout = this;
        super.changeVisibility(setVisible);
        // Change parentCell visibility.
        if (layout.parentCell) {
            if (layout.isVisible && !layout.parentCell.isVisible) {
                layout.parentCell.show();
            }
            else if (!layout.isVisible && layout.parentCell.isVisible) {
                layout.parentCell.hide();
            }
        }
    }
    /**
     * Get the layout's options.
     * @returns
     * Layout's options.
     *
     * @internal
     *
     */
    getOptions() {
        const layout = this, rows = [];
        // Get rows JSON.
        for (let i = 0, iEnd = layout.rows.length; i < iEnd; ++i) {
            rows.push(layout.rows[i].getOptions());
        }
        return {
            id: this.options.id,
            layoutClassName: this.options.layoutClassName,
            rowClassName: this.options.rowClassName,
            cellClassName: this.options.cellClassName,
            style: this.options.style,
            rows
        };
    }
}
export default Layout;
