import type * as D from '@highcharts/dashboards/datagrid';
/**
 * @deprecated
 * DataGrid will be removed in behalf of Grid in the next major version.
 */
export type DataGrid = D.DataGrid;
export type Grid = D.Grid;
/**
 * @deprecated
 * DataGrid will be removed in behalf of Grid in the next major version.
 */
export type DataGridNamespace = typeof D;
export type GridNamespace = typeof D;
export type Column = D.Column;
export type TableRow = D.TableRow;
export declare namespace TableCell {
    type TableCellEvent = D.TableCell.TableCellEvent;
}
export type TableCell = D.TableCell;
export type GridOptions = D.Options;
export default D;
