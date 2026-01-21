/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  A commercial license may be required depending on use.
 *  See www.highcharts.com/license
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *
 * */
'use strict';
/* *
 *
 *  Functions
 *
 * */
/* *
 *
 *  Class
 *
 * */
class DashboardsAccessibility {
    /* *
    *
    *  Constructor
    *
    * */
    constructor(board) {
        this.board = board;
        this.addTabIndexToCells();
    }
    /* *
    *
    *  Functions
    *
    * */
    addTabIndexToCells() {
        const components = this.board.mountedComponents;
        let cell;
        for (let i = 0, iEnd = components.length; i < iEnd; ++i) {
            cell = components[i].cell;
            if (cell && cell.container) {
                cell.container.setAttribute('tabindex', -1);
            }
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default DashboardsAccessibility;
