/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *  - Sebastian Bochan
 *
 * */
'use strict';
/* *
 *
 *  Class
 *
 * */
/**
 * Globals Grid namespace.
 */
var Globals;
(function (Globals) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    Globals.classNamePrefix = 'hcg-';
    Globals.rawClassNames = {
        container: 'container',
        tableElement: 'table',
        captionElement: 'caption',
        descriptionElement: 'description',
        theadElement: 'thead',
        tbodyElement: 'tbody',
        rowElement: 'row',
        rowEven: 'row-even',
        rowOdd: 'row-odd',
        hoveredRow: 'hovered-row',
        columnElement: 'column',
        hoveredCell: 'hovered-cell',
        hoveredColumn: 'hovered-column',
        syncedRow: 'synced-row',
        syncedCell: 'synced-cell',
        syncedColumn: 'synced-column',
        editedCell: 'edited-cell',
        mockedRow: 'mocked-row',
        rowsContentNowrap: 'rows-content-nowrap',
        virtualization: 'virtualization',
        scrollableContent: 'scrollable-content',
        headerCell: 'header-cell',
        headerCellContent: 'header-cell-content',
        headerRow: 'head-row-content',
        noData: 'no-data',
        noPadding: 'no-padding',
        columnFirst: 'column-first',
        columnSortable: 'column-sortable',
        columnSortableIcon: 'column-sortable-icon',
        columnSortedAsc: 'column-sorted-asc',
        columnSortedDesc: 'column-sorted-desc',
        resizableContent: 'resizable-content',
        resizerHandles: 'column-resizer',
        resizedColumn: 'column-resized',
        creditsContainer: 'credits-container',
        creditsText: 'credits',
        creditsPro: 'credits-pro',
        visuallyHidden: 'visually-hidden',
        lastHeaderCellInRow: 'last-header-cell-in-row',
        loadingWrapper: 'loading-wrapper',
        loadingSpinner: 'spinner',
        loadingMessage: 'loading-message'
    };
    Globals.win = window;
    Globals.composed = [];
    Globals.userAgent = (Globals.win.navigator && Globals.win.navigator.userAgent) || '';
    Globals.isChrome = Globals.userAgent.indexOf('Chrome') !== -1;
    Globals.isSafari = !Globals.isChrome && Globals.userAgent.indexOf('Safari') !== -1;
    Globals.getClassName = (classNameKey) => Globals.classNamePrefix + Globals.rawClassNames[classNameKey];
})(Globals || (Globals = {}));
/* *
 *
 *  Default Export
 *
 * */
export default Globals;
