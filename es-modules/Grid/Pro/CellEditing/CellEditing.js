/* *
 *
 *  Grid Cell Editing class.
 *
 *  (c) 2020-2025 Highsoft AS
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
import Globals from '../../Core/Globals.js';
import U from '../../../Core/Utilities.js';
const { fireEvent } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * The class that handles the manual editing of cells in the data grid.
 */
class CellEditing {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(viewport) {
        /**
         * Handles the blur event on the input field.
         */
        this.onInputBlur = () => {
            if (!this.stopEditing()) {
                this.editModeContent?.getMainElement().focus();
            }
        };
        /**
         * Handles the change event on the input field.
         */
        this.onInputChange = () => {
            if (this.editModeContent?.finishAfterChange &&
                !this.stopEditing()) {
                this.editModeContent?.getMainElement().focus();
            }
        };
        /**
         * Handles the keydown event on the input field. Cancels editing on escape
         * and saves the value on enter.
         *
         * @param e
         * The keyboard event.
         */
        this.onInputKeyDown = (e) => {
            const { key } = e;
            e.stopPropagation();
            if (key === 'Escape') {
                this.stopEditing(false);
                return;
            }
            if (key === 'Enter') {
                if (this.editModeContent?.finishAfterChange) {
                    this.onInputChange();
                    return;
                }
                this.stopEditing();
            }
        };
        this.viewport = viewport;
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
        if (this.editedCell === cell || (
        // If value is invalid, do not start new editing
        this.editedCell && !this.stopEditing())) {
            return;
        }
        this.editedCell = cell;
        cell.htmlElement.classList.add(Globals.getClassName('editedCell'));
        this.render();
        fireEvent(cell, 'startedEditing');
    }
    /**
     * Stops the editing of the cell.
     *
     * @param submit
     * Whether to save the value of the input to the cell. Defaults to true.
     *
     * @return
     * Returns `true` if the cell was successfully stopped editing.
     */
    stopEditing(submit = true) {
        const cell = this.editedCell;
        const emContent = this.editModeContent;
        if (!cell || !emContent) {
            return false;
        }
        const { column } = cell;
        const vp = column.viewport;
        const newValue = emContent.value;
        if (submit) {
            const validationErrors = [];
            if (!vp.validator.validate(cell, validationErrors)) {
                vp.validator.initErrorBox(cell, validationErrors);
                return false;
            }
            vp.validator.hide();
            vp.validator.errorCell = void 0;
        }
        // Hide notification
        this.viewport.validator.hide();
        // Hide input
        this.destroy();
        cell.htmlElement.classList.remove(Globals.getClassName('editedCell'));
        cell.htmlElement.focus();
        const isValueChanged = cell.value !== newValue;
        void cell.setValue(submit ? newValue : cell.value, submit && isValueChanged);
        if (isValueChanged) {
            fireEvent(cell, 'stoppedEditing', { submit });
        }
        delete this.editedCell;
        return true;
    }
    /**
     * Renders the input field for the cell, focuses it and sets up event
     * listeners.
     */
    render() {
        const cell = this.editedCell;
        if (!cell || !cell.column.editModeRenderer) {
            return;
        }
        this.containerElement = this.containerElement ||
            document.createElement('div');
        this.containerElement.className =
            CellEditing.classNames.cellEditingContainer;
        this.editedCell?.htmlElement.appendChild(this.containerElement);
        this.editModeContent = cell.column.editModeRenderer?.render(cell, this.containerElement);
        this.editModeContent.getMainElement().focus();
        this.editModeContent.blurHandler = this.onInputBlur;
        this.editModeContent.changeHandler = this.onInputChange;
        this.editModeContent.keyDownHandler = this.onInputKeyDown;
    }
    /**
     * Removes event listeners and the input element.
     */
    destroy() {
        if (!this.editModeContent) {
            return;
        }
        this.editModeContent.destroy();
        this.containerElement?.remove();
        delete this.editModeContent;
        delete this.containerElement;
    }
}
/* *
 *
 *  Namespace
 *
 * */
(function (CellEditing) {
    /**
     * The class names used by the CellEditing functionality.
     */
    CellEditing.classNames = {
        cellEditingContainer: Globals.classNamePrefix + 'cell-editing-container'
    };
})(CellEditing || (CellEditing = {}));
/* *
 *
 *  Default Export
 *
 * */
export default CellEditing;
