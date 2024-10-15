/* *
 *
 *  Data Grid Cell Editing class.
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
import Globals from '../../Globals.js';
import DGUtils from '../../Utils.js';
const { makeHTMLElement } = DGUtils;
/* *
 *
 *  Class
 *
 * */
/**
 * The class that handles the manual editing of cells in the data grid.
 */
class CellEditing {
    constructor() {
        /* *
        *
        *  Properties
        *
        * */
        /**
         * Handles the blur event on the input field.
         */
        this.onInputBlur = () => {
            this.stopEditing();
        };
        /**
         * Handles the keydown event on the input field. Cancels editing on escape
         * and saves the value on enter.
         *
         * @param e
         * The keyboard event.
         */
        this.onInputKeyDown = (e) => {
            const { keyCode } = e;
            // Enter / Escape
            if (keyCode === 13 || keyCode === 27) {
                // Cancel editing on escape
                this.stopEditing(keyCode === 13);
            }
        };
    }
    /* *
     *
     *  Methods
     *
     * */
    /**
     * Turns the cell into an editable input field.
     *
     * @param cell
     * The cell that is to be edited.
     */
    startEditing(cell) {
        if (this.editedCell === cell) {
            return;
        }
        if (this.editedCell) {
            this.stopEditing();
        }
        this.editedCell = cell;
        const cellElement = cell.htmlElement;
        cellElement.innerHTML = '';
        cellElement.classList.add(Globals.classNames.editedCell);
        this.renderInput();
    }
    /**
     * Stops the editing of the cell.
     *
     * @param submit
     * Whether to save the value of the input to the cell. Defaults to true.
     */
    stopEditing(submit = true) {
        const cell = this.editedCell;
        const input = this.inputElement;
        if (!cell || !input) {
            return;
        }
        const dataGrid = cell.column.viewport.dataGrid;
        let newValue = input.value;
        this.destroyInput();
        cell.htmlElement.classList.remove(Globals.classNames.editedCell);
        cell.htmlElement.focus();
        // Convert to number if possible
        if (!isNaN(+newValue)) {
            newValue = +newValue;
        }
        void cell.setValue(submit ? newValue : cell.value, submit && cell.value !== newValue);
        dataGrid.options?.events?.cell?.afterEdit?.call(cell);
        delete this.editedCell;
    }
    /**
     * Renders the input field for the cell, focuses it and sets up event
     * listeners.
     */
    renderInput() {
        const cell = this.editedCell;
        if (!cell) {
            return;
        }
        const cellEl = cell.htmlElement;
        const input = this.inputElement = makeHTMLElement('input', {}, cellEl);
        input.value = '' + cell.value;
        input.focus();
        input.addEventListener('blur', this.onInputBlur);
        input.addEventListener('keydown', this.onInputKeyDown);
    }
    /**
     * Removes event listeners and the input element.
     */
    destroyInput() {
        const input = this.inputElement;
        if (!input) {
            return;
        }
        input.removeEventListener('keydown', this.onInputKeyDown);
        input.removeEventListener('blur', this.onInputBlur);
        input.remove();
        delete this.inputElement;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default CellEditing;
