/* *
 *
 *  Cell Content Pro composition
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
import CellRendererRegistry from './CellRendererRegistry.js';
import Globals from '../../Core/Globals.js';
import U from '../../../Core/Utilities.js';
const { addEvent, pushUnique } = U;
/* *
 *
 *  Composition
 *
 * */
/**
 * @internal
 */
var CellRenderersComposition;
(function (CellRenderersComposition) {
    /**
     * Extends the grid classes with cell editing functionality.
     *
     * @param ColumnClass
     * The class to extend.
     */
    function compose(ColumnClass) {
        if (!pushUnique(Globals.composed, 'CellRenderers')) {
            return;
        }
        addEvent(ColumnClass, 'afterInit', afterColumnInit);
        ColumnClass.prototype.createCellContent = createCellContent;
    }
    CellRenderersComposition.compose = compose;
    /**
     * Init a type of content for a column.
     * @param this
     * Current column.
     */
    function afterColumnInit() {
        const rendererType = this.options.cells?.renderer?.type || 'text';
        let Renderer = CellRendererRegistry.types[rendererType];
        if (!Renderer) {
            // eslint-disable-next-line no-console
            console.warn(`The cell renderer of type "${rendererType}" is not registered. Using default text renderer instead.`);
            Renderer = CellRendererRegistry.types.text;
        }
        this.cellRenderer = new Renderer(this, this.options.cells?.renderer || {});
    }
    /**
     * Render content of cell.
     * @param this
     * Current column.
     *
     * @param cell
     * Current cell.
     *
     * @returns
     * Formatted cell content.
     */
    function createCellContent(cell) {
        return this.cellRenderer.render(cell);
    }
})(CellRenderersComposition || (CellRenderersComposition = {}));
/* *
 *
 *  Default Export
 *
 * */
export default CellRenderersComposition;
