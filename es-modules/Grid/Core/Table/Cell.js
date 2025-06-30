/* *
 *
 *  Grid Cell abstract class
 *
 *  (c) 2020-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *  - Sebastian Bochan
 *
 * */
'use strict';
import Templating from '../../../Core/Templating.js';
/* *
 *
 *  Abstract Class of Cell
 *
 * */
class Cell {
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Constructs a cell in the data grid.
     *
     * @param row
     * The row of the cell.
     *
     * @param column
     * The column of the cell.
     */
    constructor(row, column) {
        /**
         * Array of cell events to be removed when the cell is destroyed.
         */
        this.cellEvents = [];
        this.column = column;
        this.row = row;
        this.row.registerCell(this);
        this.htmlElement = this.init();
        this.htmlElement.setAttribute('tabindex', '-1');
        this.initEvents();
    }
    /* *
    *
    *  Methods
    *
    * */
    /**
     * Init element.
     * @internal
     */
    init() {
        return document.createElement('td', {});
    }
    /**
     * Initialize event listeners. Events added to the `cellEvents` array will
     * be registered now and unregistered when the cell is destroyed.
     */
    initEvents() {
        this.cellEvents.push(['blur', () => this.onBlur()]);
        this.cellEvents.push(['focus', () => this.onFocus()]);
        this.cellEvents.push(['click', (e) => {
                this.onClick(e);
            }]);
        this.cellEvents.push(['keydown', (e) => {
                this.onKeyDown(e);
            }]);
        this.cellEvents.forEach((pair) => {
            this.htmlElement.addEventListener(pair[0], pair[1]);
        });
    }
    /**
     * Handles the focus event on the cell.
     */
    onFocus() {
        const vp = this.row.viewport;
        const focusAnchor = vp.rowsVirtualizer.focusAnchorCell?.htmlElement;
        focusAnchor?.setAttribute('tabindex', '-1');
    }
    /**
     * Handles the blur event on the cell.
     */
    onBlur() {
        const vp = this.row.viewport;
        const focusAnchor = vp.rowsVirtualizer.focusAnchorCell?.htmlElement;
        focusAnchor?.setAttribute('tabindex', '0');
        delete vp.focusCursor;
    }
    /**
     * Handles user keydown on the cell.
     *
     * @param e
     * Keyboard event object.
     */
    onKeyDown(e) {
        const { row, column } = this;
        if (!column) {
            return;
        }
        const vp = row.viewport;
        const changeFocusKeys = {
            ArrowDown: [1, 0],
            ArrowUp: [-1, 0],
            ArrowLeft: [0, -1],
            ArrowRight: [0, 1]
        };
        const dir = changeFocusKeys[e.key];
        if (dir) {
            e.preventDefault();
            e.stopPropagation();
            const localRowIndex = row.index === void 0 ? -1 : (row.index - vp.rows[0].index);
            const nextVerticalDir = localRowIndex + dir[0];
            if (nextVerticalDir < 0 && vp.header) {
                vp.columns[column.index + dir[1]]?.header?.htmlElement.focus();
                return;
            }
            const nextRow = vp.rows[nextVerticalDir];
            if (nextRow) {
                nextRow.cells[column.index + dir[1]]?.htmlElement.focus();
            }
        }
    }
    /**
     * Renders the cell by appending the HTML element to the row.
     */
    render() {
        this.row.htmlElement.appendChild(this.htmlElement);
        this.reflow();
    }
    /**
     * Reflows the cell dimensions.
     */
    reflow() {
        const column = this.column;
        if (!column) {
            return;
        }
        const elementStyle = this.htmlElement.style;
        elementStyle.width = elementStyle.maxWidth = column.getWidth() + 'px';
    }
    /**
     * Returns the formatted string where the templating context is the cell.
     *
     * @param template
     * The template string.
     *
     * @return
     * The formatted string.
     */
    format(template) {
        return Templating.format(template, this, this.row.viewport.grid);
    }
    /**
     * Sets the custom class name of the cell based on the template.
     *
     * @param template
     * The template string.
     */
    setCustomClassName(template) {
        const element = this.htmlElement;
        if (this.customClassName) {
            element.classList.remove(...this.customClassName.split(/\s+/g));
        }
        if (!template) {
            delete this.customClassName;
            return;
        }
        const newClassName = this.format(template);
        if (!newClassName) {
            delete this.customClassName;
            return;
        }
        element.classList.add(...newClassName.split(/\s+/g));
        this.customClassName = newClassName;
    }
    /**
     * Destroys the cell.
     */
    destroy() {
        this.cellEvents.forEach((pair) => {
            this.htmlElement.removeEventListener(pair[0], pair[1]);
        });
        this.column?.unregisterCell(this);
        this.row.unregisterCell(this);
        this.htmlElement.remove();
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default Cell;
