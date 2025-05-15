/* *
 *
 *  Mixed Distribution Strategy class
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
import DistributionStrategy from './ColumnDistributionStrategy.js';
import U from '../../../../Core/Utilities.js';
const { defined } = U;
/* *
 *
 *  Class
 *
 * */
class MixedDistributionStrategy extends DistributionStrategy {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.type = 'mixed';
        /**
         * Array of units for each column width value. Codified as:
         * - `0` - px
         * - `1` - %
         */
        this.columnWidthUnits = {};
    }
    /* *
     *
     *  Methods
     *
     * */
    loadColumn(column) {
        const raw = column.options.width;
        if (!raw) {
            return;
        }
        let value;
        let unitCode = 0;
        if (typeof raw === 'number') {
            value = raw;
            unitCode = 0;
        }
        else {
            value = parseFloat(raw);
            unitCode = raw.charAt(raw.length - 1) === '%' ? 1 : 0;
        }
        this.columnWidthUnits[column.id] = unitCode;
        this.columnWidths[column.id] = value;
    }
    getColumnWidth(column) {
        const vp = this.viewport;
        const widthValue = this.columnWidths[column.id];
        const minWidth = DistributionStrategy.getMinWidth(column);
        if (!defined(widthValue)) {
            const freeWidth = vp.tbodyElement.clientWidth - this.calculateOccupiedWidth();
            const freeColumns = (vp.grid.enabledColumns?.length || 0) -
                Object.keys(this.columnWidths).length;
            // If undefined width:
            return Math.max(freeWidth / freeColumns, minWidth);
        }
        if (this.columnWidthUnits[column.id] === 0) {
            // If px:
            return widthValue;
        }
        // If %:
        return Math.max(vp.getWidthFromRatio(widthValue / 100), minWidth);
    }
    resize(resizer, diff) {
        const vp = this.viewport;
        const column = resizer.draggedColumn;
        if (!column) {
            return;
        }
        const colW = resizer.columnStartWidth ?? 0;
        const minWidth = DistributionStrategy.getMinWidth(column);
        const nextCol = vp.columns[column.index + 1];
        const newW = Math.max(colW + diff, minWidth);
        this.columnWidths[column.id] = newW;
        this.columnWidthUnits[column.id] = 0; // Always save in px
        if (nextCol) {
            this.columnWidths[nextCol.id] = Math.max((resizer.nextColumnStartWidth ?? 0) + colW - newW, minWidth);
            this.columnWidthUnits[nextCol.id] = 0; // Always save in px
        }
    }
    /**
     * Calculates defined (px and %) widths of all defined columns in the grid.
     * Total in px.
     */
    calculateOccupiedWidth() {
        const vp = this.viewport;
        let occupiedWidth = 0;
        let unit, width;
        const columnIds = Object.keys(this.columnWidths);
        let columnId;
        for (let i = 0, iEnd = columnIds.length; i < iEnd; ++i) {
            columnId = columnIds[i];
            unit = this.columnWidthUnits[columnId];
            if (unit === 0) {
                occupiedWidth += this.columnWidths[columnId];
                continue;
            }
            width = this.columnWidths[columnId];
            occupiedWidth += vp.getWidthFromRatio(width / 100);
        }
        return occupiedWidth;
    }
    exportMetadata() {
        return {
            ...super.exportMetadata(),
            columnWidthUnits: this.columnWidthUnits
        };
    }
    importMetadata(metadata) {
        super.importMetadata(metadata, (colId) => {
            const unit = metadata.columnWidthUnits[colId];
            if (defined(unit)) {
                this.columnWidthUnits[colId] = unit;
            }
        });
    }
    validateOnUpdate(newOptions) {
        super.validateOnUpdate(newOptions);
        if (!this.invalidated && (Object.hasOwnProperty.call(newOptions.columnDefaults || {}, 'width') ||
            newOptions.columns?.some((col) => Object.hasOwnProperty.call(col || {}, 'width')))) {
            this.invalidated = true;
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default MixedDistributionStrategy;
