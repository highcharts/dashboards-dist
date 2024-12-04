/* *
 *
 *  DataGrid Accessibility class
 *
 *  (c) 2020-2024 Highsoft AS
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
import Globals from '../Globals.js';
import DGUtils from '../Utils.js';
const { makeHTMLElement } = DGUtils;
/**
 *  Representing the accessibility functionalities for the Data Grid.
 */
class Accessibility {
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Construct the accessibility object.
     *
     * @param dataGrid
     * The DataGrid Table instance which the accessibility controller belong to.
     */
    constructor(dataGrid) {
        this.dataGrid = dataGrid;
        this.element = document.createElement('div');
        this.element.classList.add(Globals.classNames.visuallyHidden);
        this.dataGrid.container?.prepend(this.element);
        this.announcerElement = document.createElement('p');
        this.announcerElement.setAttribute('aria-atomic', 'true');
        this.announcerElement.setAttribute('aria-hidden', 'false');
    }
    /* *
    *
    *  Methods
    *
    * */
    /**
     * Add the 'editable' hint span element for the editable cell.
     *
     * @param cellElement
     * The cell element to add the description to.
     */
    addEditableCellHint(cellElement) {
        const editableLang = this.dataGrid.options?.lang?.accessibility?.cellEditing?.editable;
        if (!editableLang) {
            return;
        }
        makeHTMLElement('span', {
            className: Globals.classNames.visuallyHidden,
            innerText: ', ' + editableLang
        }, cellElement);
    }
    /**
     * Add the description to the header cell.
     *
     * @param thElement
     * The header cell element to add the description to.
     *
     * @param description
     * The description to be added.
     */
    addHeaderCellDescription(thElement, description) {
        if (description) {
            thElement.setAttribute('aria-description', description);
        }
    }
    /**
     * Announce the message to the screen reader.
     *
     * @param msg
     * The message to be announced.
     *
     * @param assertive
     * Whether the message should be assertive. Default is false.
     */
    announce(msg, assertive = false) {
        if (this.announcerTimeout) {
            clearTimeout(this.announcerTimeout);
        }
        this.announcerElement.remove();
        this.announcerElement.setAttribute('aria-live', assertive ? 'assertive' : 'polite');
        this.element.appendChild(this.announcerElement);
        this.announcerElement.textContent = msg;
        this.announcerTimeout = setTimeout(() => {
            this.announcerElement.remove();
        }, 3000);
    }
    /**
     * Announce the message to the screen reader that the user sorted the
     * column.
     *
     * @param order
     * The order of the sorting.
     */
    userSortedColumn(order) {
        const { options } = this.dataGrid;
        const announcementsLang = options?.lang
            ?.accessibility?.sorting?.announcements;
        if (!options?.accessibility?.announcements?.sorting) {
            return;
        }
        let msg;
        switch (order) {
            case 'asc':
                msg = announcementsLang?.ascending;
                break;
            case 'desc':
                msg = announcementsLang?.descending;
                break;
            default:
                msg = announcementsLang?.none;
        }
        if (!msg) {
            return;
        }
        this.announce(msg, true);
    }
    /**
     * Announce the message to the screen reader that the user edited the cell.
     *
     * @param msgType
     * The type of the edit message.
     */
    userEditedCell(msgType) {
        const { options } = this.dataGrid;
        const announcementsLang = options?.lang
            ?.accessibility?.cellEditing?.announcements;
        if (!options?.accessibility?.announcements?.cellEditing) {
            return;
        }
        const msg = announcementsLang?.[msgType];
        if (!msg) {
            return;
        }
        this.announce(msg);
    }
    /**
     * Set the aria sort state of the column header cell element.
     *
     * @param thElement
     * The header cell element to set the `aria-sort` state to.
     *
     * @param state
     * The sort state to be set for the column header cell.
     */
    setColumnSortState(thElement, state) {
        thElement?.setAttribute('aria-sort', state);
    }
    /**
     * Set the row index attribute for the row element.
     *
     * @param el
     * The row element to set the index to.
     *
     * @param idx
     * The index of the row in the data table.
     */
    setRowIndex(el, idx) {
        el.setAttribute('aria-rowindex', idx);
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default Accessibility;
