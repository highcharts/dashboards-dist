/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */
'use strict';
import EditGlobals from '../EditMode/EditGlobals.js';
import Globals from '../Globals.js';
import GUIElement from './GUIElement.js';
/* *
 *
 *  Class
 *
 * */
/**
 * @internal
 **/
class CellHTML extends GUIElement {
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of the CellHTML class.
     *
     * @param {Options} options
     * Options for the cell.
     */
    constructor(options) {
        super();
        /**
         * The type of a GUIElement instance.
         */
        this.type = 'cell-html';
        this.options = options;
        this.id = options.id;
        this.container = options.container;
        this.mountedComponent = options.mountedComponent;
    }
    /**
     * Destroy the element, its container, event hooks
     * and mounted component.
     */
    destroy() {
        const cell = this;
        // Destroy mounted component.
        cell.mountedComponent?.destroy();
        super.destroy();
    }
    /**
     * Highlight the cell.
     */
    setHighlight() {
        const cell = this;
        cell.container.classList.toggle(EditGlobals.classNames.cellEditHighlight);
        cell.mountedComponent?.board.container.classList.toggle(EditGlobals.classNames.dashboardCellEditHighlightActive);
    }
    setActiveState() {
        const cell = this;
        // Apply class
        if (cell.container) {
            cell.container.classList.add(Globals.classNames.cellActive);
        }
    }
}
/* *
 *
 *  Type Declarations
 *
 * */
/**
 * Checks if a valid cell HTML instance.
 */
export function isCellHTML(cellHTML) {
    return cellHTML instanceof CellHTML;
}
/* *
 *
 *  Default Export
 *
 * */
export default CellHTML;
