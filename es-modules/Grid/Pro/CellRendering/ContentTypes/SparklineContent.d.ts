import type SparklineRenderer from '../Renderers/SparklineRenderer';
import type TableCell from '../../../Core/Table/Body/TableCell';
import * as HighchartsNamespace from '../../highcharts';
import CellContentPro from '../CellContentPro.js';
import Globals from '../../../Core/Globals.js';
/**
 * Represents a sparkline type of cell content.
 */
declare class SparklineContent extends CellContentPro {
    static defaultChartOptions: Globals.DeepPartial<HighchartsNamespace.Options>;
    chart?: HighchartsNamespace.Chart;
    private chartContainer?;
    constructor(cell: TableCell, renderer: SparklineRenderer, parentElement?: HTMLElement);
    protected add(parentElement?: HTMLElement): void;
    update(): void;
    destroy(): void;
    private getProcessedOptions;
    private onKeyDown;
}
declare namespace SparklineContent {
    /**
     * Highcharts namespace used by the Sparkline Renderer.
     * This is set to `undefined` by default, and should be set to the
     * Highcharts namespace before using the Sparkline Renderer.
     */
    let H: undefined | typeof HighchartsNamespace;
}
export default SparklineContent;
