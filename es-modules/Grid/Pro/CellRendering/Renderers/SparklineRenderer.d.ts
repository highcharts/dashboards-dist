import type Column from '../../../Core/Table/Column';
import type TableCell from '../../../Core/Table/Body/TableCell';
import type DataTable from '../../../../Data/DataTable';
import type * as HighchartsNamespace from '../../highcharts';
import type { EditModeRendererTypeName } from '../../CellEditing/CellEditingComposition';
import CellRenderer from '../CellRenderer.js';
import SparklineContent from '../ContentTypes/SparklineContent.js';
/**
 * Renderer for the Text in a column..
 */
declare class SparklineRenderer extends CellRenderer {
    /**
     * The default edit mode renderer type names for this view renderer.
     */
    static defaultEditingRenderer: EditModeRendererTypeName;
    /**
     * Default options for the sparkline renderer.
     */
    static defaultOptions: SparklineRenderer.Options;
    options: SparklineRenderer.Options;
    constructor(column: Column);
    render(cell: TableCell): SparklineContent;
}
declare namespace SparklineRenderer {
    /**
     * Imports the Highcharts namespace to be used by the Sparkline Renderer.
     *
     * @param H
     * Highcharts namespace.
     */
    function useHighcharts(H: typeof HighchartsNamespace): void;
    /**
     * Options to control the sparkline renderer content.
     */
    interface Options extends CellRenderer.Options {
        type: 'sparkline';
        chartOptions?: (((data: DataTable.CellType) => HighchartsNamespace.Options) | HighchartsNamespace.Options);
    }
}
declare module '../CellRendererType' {
    interface CellRendererTypeRegistry {
        sparkline: typeof SparklineRenderer;
    }
}
export default SparklineRenderer;
