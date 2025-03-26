/* *
 *
 *  Grid Column class
 *
 *  (c) 2020-2024 Highsoft AS
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
import Utils from '../../../Core/Utilities.js';
import GridUtils from '../GridUtils.js';
import Templating from '../../../Core/Templating.js';
import Globals from '../Globals.js';
const { merge } = Utils;
const { makeHTMLElement } = GridUtils;
/* *
 *
 *  Class
 *
 * */
/**
 * Represents a column in the data grid.
 */
class Column {
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Constructs a column in the data grid.
     *
     * @param viewport
     * The viewport (table) the column belongs to.
     *
     * @param id
     * The id of the column (`name` in the Data Table).
     *
     * @param index
     * The index of the column.
     */
    constructor(viewport, id, index) {
        /**
         * The cells of the column.
         */
        this.cells = [];
        this.options = merge(viewport.grid.options?.columnDefaults ?? {}, viewport.grid.columnOptionsMap?.[id] ?? {});
        this.id = id;
        this.index = index;
        this.viewport = viewport;
        this.width = this.getInitialWidth();
        this.loadData();
    }
    /* *
    *
    *  Methods
    *
    * */
    /**
     * Loads the data of the column from the viewport's data table.
     */
    loadData() {
        this.data = this.viewport.dataTable.getColumn(this.id, true);
    }
    /**
     * Registers a cell in the column.
     *
     * @param cell
     * The cell to register.
     */
    registerCell(cell) {
        cell.htmlElement.setAttribute('data-column-id', this.id);
        if (this.options.className) {
            cell.htmlElement.classList.add(...this.options.className.split(/\s+/g));
        }
        if (this.viewport.grid.hoveredColumnId === this.id) {
            cell.htmlElement.classList.add(Globals.getClassName('hoveredColumn'));
        }
        this.cells.push(cell);
    }
    /**
     * Unregister a cell from the column.
     *
     * @param cell
     * The cell to unregister.
     */
    unregisterCell(cell) {
        const index = this.cells.indexOf(cell);
        if (index > -1) {
            this.cells.splice(index, 1);
        }
    }
    /**
     * Returns the width of the column in pixels.
     */
    getWidth() {
        const vp = this.viewport;
        return vp.columnDistribution === 'full' ?
            vp.getWidthFromRatio(this.width) :
            this.width;
    }
    /**
     * Adds or removes the hovered CSS class to the column element
     * and its cells.
     *
     * @param hovered
     * Whether the column should be hovered.
     */
    setHoveredState(hovered) {
        this.header?.htmlElement?.classList[hovered ? 'add' : 'remove'](Globals.getClassName('hoveredColumn'));
        for (let i = 0, iEnd = this.cells.length; i < iEnd; ++i) {
            this.cells[i].htmlElement.classList[hovered ? 'add' : 'remove'](Globals.getClassName('hoveredColumn'));
        }
    }
    /**
     * Adds or removes the synced CSS class to the column element
     * and its cells.
     *
     * @param synced
     * Whether the column should have synced state.
     */
    setSyncedState(synced) {
        this.header?.htmlElement?.classList[synced ? 'add' : 'remove'](Globals.getClassName('syncedColumn'));
        for (let i = 0, iEnd = this.cells.length; i < iEnd; ++i) {
            this.cells[i].htmlElement.classList[synced ? 'add' : 'remove'](Globals.getClassName('syncedColumn'));
        }
    }
    /**
     * Creates a mock element to measure the width of the column from the CSS.
     * The element is appended to the viewport container and then removed.
     * It should be called only once for each column.
     *
     * @returns The initial width of the column.
     */
    getInitialWidth() {
        let result;
        const { viewport } = this;
        // Set the initial width of the column.
        const mock = makeHTMLElement('div', {
            className: Globals.getClassName('columnElement')
        }, viewport.grid.container);
        mock.setAttribute('data-column-id', this.id);
        if (this.options.className) {
            mock.classList.add(...this.options.className.split(/\s+/g));
        }
        if (viewport.columnDistribution === 'full') {
            result = this.getInitialFullDistWidth(mock);
        }
        else {
            result = mock.offsetWidth || 100;
        }
        mock.remove();
        return result;
    }
    /**
     * The initial width of the column in the full distribution mode. The last
     * column in the viewport will have to fill the remaining space.
     *
     * @param mock
     * The mock element to measure the width.
     */
    getInitialFullDistWidth(mock) {
        const vp = this.viewport;
        const columnsCount = vp.grid.enabledColumns?.length ?? 0;
        if (this.index < columnsCount - 1) {
            return vp.getRatioFromWidth(mock.offsetWidth) || 1 / columnsCount;
        }
        let allPreviousWidths = 0;
        for (let i = 0, iEnd = columnsCount - 1; i < iEnd; i++) {
            allPreviousWidths += vp.columns[i].width;
        }
        const result = 1 - allPreviousWidths;
        if (result < 0) {
            // eslint-disable-next-line no-console
            console.warn('The sum of the columns\' widths exceeds the ' +
                'viewport width. It may cause unexpected behavior in the ' +
                'full distribution mode. Check the CSS styles of the ' +
                'columns. Corrections may be needed.');
        }
        return result;
    }
    /**
     * Returns the formatted string where the templating context is the column.
     *
     * @param template
     * The template string.
     *
     * @return
     * The formatted string.
     */
    format(template) {
        return Templating.format(template, this, this.viewport.grid);
    }
}
/* *
*
*  Static Properties
*
* */
/**
 * The minimum width of a column.
 * @internal
 */
Column.MIN_COLUMN_WIDTH = 20;
/* *
 *
 *  Default Export
 *
 * */
export default Column;
