/* *
 *
 *  (c) 2020-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *
 * */
'use strict';
import U from '../../Core/Utilities.js';
import Globals from '../../Core/Globals.js';
const { addEvent, fireEvent, pushUnique } = U;
const propagate = {
    'cell_mouseOver': function () {
        fireEvent(this.row.viewport.grid, 'cellMouseOver', {
            target: this
        });
    },
    'cell_mouseOut': function () {
        fireEvent(this.row.viewport.grid, 'cellMouseOut', {
            target: this
        });
    }
};
/* *
 *
 *  Functions
 *
 * */
/**
 * Composition to add events to the TableCellClass methods.
 *
 * @param ColumnClass
 * The class to extend.
 *
 * @param HeaderCellClass
 * The class to extend.
 *
 * @param TableCellClass
 * The class to extend.
 *
 * @internal
 */
function compose(ColumnClass, HeaderCellClass, TableCellClass) {
    if (!pushUnique(Globals.composed, 'GridEvents')) {
        return;
    }
    [
        'mouseOver',
        'mouseOut',
        'dblClick',
        'click',
        'afterSetValue'
    ].forEach((name) => {
        addEvent(TableCellClass, name, (e) => {
            const cell = e.target;
            cell.row.viewport.grid.options?.events?.cell?.[name]?.call(cell);
            propagate['cell_' + name]?.call(cell);
        });
    });
    [
        'afterResize',
        'afterSorting'
    ].forEach((name) => {
        addEvent(ColumnClass, name, (e) => {
            const column = e.target;
            column.viewport.grid.options?.events?.column?.[name]?.call(column);
        });
    });
    // HeaderCell Events
    addEvent(HeaderCellClass, 'click', (e) => {
        const col = e.target;
        col.viewport.grid.options?.events?.header?.click?.call(col);
    });
}
/* *
 *
 *  Default Export
 *
 * */
/**
 * @internal
 */
export default { compose };
