import type DataGrid from '../DataGrid';
import type { ColumnSortingOrder } from '../Options';
/**
 *  Representing the accessibility functionalities for the Data Grid.
 */
declare class Accessibility {
    /**
     * The Data Grid Table instance which the accessibility belong to.
     */
    dataGrid: DataGrid;
    /**
     * The HTML element of the accessibility.
     */
    private element;
    /**
     * The HTML element of the announcer.
     */
    private announcerElement;
    /**
     * The timeout for the announcer element removal.
     */
    private announcerTimeout?;
    /**
     * Construct the accessibility object.
     *
     * @param dataGrid
     * The DataGrid Table instance which the accessibility controller belong to.
     */
    constructor(dataGrid: DataGrid);
    /**
     * Add the 'editable' hint span element for the editable cell.
     *
     * @param cellElement
     * The cell element to add the description to.
     */
    addEditableCellHint(cellElement: HTMLElement): void;
    /**
     * Add the description to the header cell.
     *
     * @param thElement
     * The header cell element to add the description to.
     *
     * @param description
     * The description to be added.
     */
    addHeaderCellDescription(thElement: HTMLElement, description: string | undefined): void;
    /**
     * Announce the message to the screen reader.
     *
     * @param msg
     * The message to be announced.
     *
     * @param assertive
     * Whether the message should be assertive. Default is false.
     */
    announce(msg: string, assertive?: boolean): void;
    /**
     * Announce the message to the screen reader that the user sorted the
     * column.
     *
     * @param order
     * The order of the sorting.
     */
    userSortedColumn(order: ColumnSortingOrder): void;
    /**
     * Announce the message to the screen reader that the user edited the cell.
     *
     * @param msgType
     * The type of the edit message.
     */
    userEditedCell(msgType: Accessibility.EditMsgType): void;
    /**
     * Set the aria sort state of the column header cell element.
     *
     * @param thElement
     * The header cell element to set the `aria-sort` state to.
     *
     * @param state
     * The sort state to be set for the column header cell.
     */
    setColumnSortState(thElement: HTMLElement, state: Accessibility.AriaSortState): void;
    /**
     * Set the row index attribute for the row element.
     *
     * @param el
     * The row element to set the index to.
     *
     * @param idx
     * The index of the row in the data table.
     */
    setRowIndex(el: HTMLElement, idx: number): void;
}
declare namespace Accessibility {
    /**
     * The possible states of the aria-sort attribute.
     */
    type AriaSortState = 'ascending' | 'descending' | 'none';
    /**
     * The possible types of the edit message.
     */
    type EditMsgType = 'started' | 'edited' | 'cancelled';
}
export default Accessibility;
