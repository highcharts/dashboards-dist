/* *
 *
 *  (c) 2020-2025 Highsoft AS
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
        'afterRender'
    ].forEach((name) => {
        addEvent(TableCellClass, name, (e) => {
            const cell = e.target;
            const cellEvent = cell.column.options.cells?.events?.[name] ||
                // Backward compatibility
                cell.row.viewport.grid.options?.events?.cell?.[name];
            cellEvent?.call(cell);
            propagate['cell_' + name]?.call(cell);
        });
    });
    [
        'afterResize',
        'afterSorting'
    ].forEach((name) => {
        addEvent(ColumnClass, name, (e) => {
            const column = e.target;
            const columnEvent = column.options?.events?.[name] ||
                // Backward compatibility
                column.viewport.grid.options?.events?.column?.[name];
            columnEvent?.call(column);
        });
    });
    // HeaderCell Events
    [
        'click',
        'afterRender'
    ].forEach((name) => {
        addEvent(HeaderCellClass, name, (e) => {
            const column = e.target;
            const headerEvent = column.options?.header?.events?.[name] ||
                // Backward compatibility
                column.viewport?.grid?.options?.events?.header?.[name];
            headerEvent?.call(column);
        });
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
