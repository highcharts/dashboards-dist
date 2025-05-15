import type Column from '../Column.js';
import type ColumnsResizer from '../Actions/ColumnsResizer';
import DistributionStrategy from './ColumnDistributionStrategy.js';
import Globals from '../../Globals.js';
import Options from '../../Options.js';
declare class MixedDistributionStrategy extends DistributionStrategy {
    readonly type: "mixed";
    /**
     * Array of units for each column width value. Codified as:
     * - `0` - px
     * - `1` - %
     */
    private columnWidthUnits;
    loadColumn(column: Column): void;
    getColumnWidth(column: Column): number;
    resize(resizer: ColumnsResizer, diff: number): void;
    /**
     * Calculates defined (px and %) widths of all defined columns in the grid.
     * Total in px.
     */
    private calculateOccupiedWidth;
    exportMetadata(): MixedDistributionStrategy.Metadata;
    importMetadata(metadata: MixedDistributionStrategy.Metadata): void;
    validateOnUpdate(newOptions: Globals.DeepPartial<Options>): void;
}
declare namespace MixedDistributionStrategy {
    interface Metadata extends DistributionStrategy.Metadata {
        columnWidthUnits: Record<string, number>;
    }
}
export default MixedDistributionStrategy;
