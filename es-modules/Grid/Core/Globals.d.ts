/**
 * Globals Grid namespace.
 */
declare namespace Globals {
    type DeepPartial<T> = {
        [K in keyof T]?: (T[K] | DeepPartial<T[K]>);
    };
    type DeepRequired<T> = {
        [K in keyof T]-?: DeepRequired<T[K]>;
    };
    type ClassNameKey = keyof typeof rawClassNames;
    const classNamePrefix: string;
    const rawClassNames: {
        readonly container: "container";
        readonly tableElement: "table";
        readonly captionElement: "caption";
        readonly descriptionElement: "description";
        readonly theadElement: "thead";
        readonly tbodyElement: "tbody";
        readonly rowElement: "row";
        readonly rowEven: "row-even";
        readonly rowOdd: "row-odd";
        readonly hoveredRow: "hovered-row";
        readonly columnElement: "column";
        readonly hoveredCell: "hovered-cell";
        readonly hoveredColumn: "hovered-column";
        readonly syncedRow: "synced-row";
        readonly syncedCell: "synced-cell";
        readonly syncedColumn: "synced-column";
        readonly editedCell: "edited-cell";
        readonly mockedRow: "mocked-row";
        readonly rowsContentNowrap: "rows-content-nowrap";
        readonly virtualization: "virtualization";
        readonly scrollableContent: "scrollable-content";
        readonly headerCell: "header-cell";
        readonly headerCellContent: "header-cell-content";
        readonly headerRow: "head-row-content";
        readonly noData: "no-data";
        readonly noPadding: "no-padding";
        readonly columnFirst: "column-first";
        readonly columnSortable: "column-sortable";
        readonly columnSortableIcon: "column-sortable-icon";
        readonly columnSortedAsc: "column-sorted-asc";
        readonly columnSortedDesc: "column-sorted-desc";
        readonly resizableContent: "resizable-content";
        readonly resizerHandles: "column-resizer";
        readonly resizedColumn: "column-resized";
        readonly creditsContainer: "credits-container";
        readonly creditsText: "credits";
        readonly creditsPro: "credits-pro";
        readonly visuallyHidden: "visually-hidden";
        readonly lastHeaderCellInRow: "last-header-cell-in-row";
        readonly loadingWrapper: "loading-wrapper";
        readonly loadingSpinner: "spinner";
        readonly loadingMessage: "loading-message";
    };
    const win: Window & typeof globalThis;
    const composed: Array<string>;
    const userAgent: string;
    const isChrome: boolean;
    const isSafari: boolean;
    const getClassName: (classNameKey: ClassNameKey) => string;
}
export default Globals;
