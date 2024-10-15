/**
 * Global DataGrid namespace.
 *
 * @namespace DataGrid
 */
declare namespace Globals {
    /**
     * Utility type to mark recursively all properties and sub-properties
     * optional.
     */
    type DeepPartial<T> = {
        [K in keyof T]?: (T[K] | DeepPartial<T[K]>);
    };
    /**
     * Utility type to mark recursively all properties and sub-properties
     * required.
     */
    type DeepRequired<T> = {
        [K in keyof T]-?: DeepRequired<T[K]>;
    };
    const classNamePrefix = "highcharts-datagrid-";
    const classNames: {
        container: string;
        tableElement: string;
        captionElement: string;
        theadElement: string;
        tbodyElement: string;
        rowElement: string;
        rowOdd: string;
        hoveredRow: string;
        columnElement: string;
        hoveredCell: string;
        hoveredColumn: string;
        editedCell: string;
        rowsContentNowrap: string;
        headerCell: string;
        headerCellContent: string;
        headerCellResized: string;
        headerRow: string;
        noData: string;
        columnFirst: string;
        columnSortable: string;
        columnSortedAsc: string;
        columnSortedDesc: string;
        resizerHandles: string;
        resizedColumn: string;
        creditsContainer: string;
        creditsText: string;
    };
    const win: Window & typeof globalThis;
    const userAgent: string;
    const isChrome: boolean;
    const isSafari: boolean;
}
export default Globals;
