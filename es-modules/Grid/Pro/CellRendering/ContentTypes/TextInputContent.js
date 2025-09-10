/* *
 *
 *  Text Input Cell Content class
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
import CellContentPro from '../CellContentPro.js';
import U from '../../../../Core/Utilities.js';
const { defined } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Represents a text input type of cell content.
 */
class TextInputContent extends CellContentPro {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(cell, renderer, parentElement) {
        super(cell, renderer);
        /**
         * Whether to finish the edit after a change.
         */
        this.finishAfterChange = true;
        this.onChange = (e) => {
            if (this.changeHandler) {
                this.changeHandler(e);
                return;
            }
            void this.cell.setValue(e.target.value, true);
        };
        this.onKeyDown = (e) => {
            e.stopPropagation();
            if (this.keyDownHandler) {
                this.keyDownHandler(e);
                return;
            }
            if (e.key === 'Escape') {
                this.input.value = this.convertToInputValue();
                this.cell.htmlElement.focus();
                return;
            }
            if (e.key === 'Enter') {
                this.cell.htmlElement.focus();
            }
        };
        this.onBlur = (e) => {
            this.blurHandler?.(e);
        };
        this.onCellKeyDown = (e) => {
            if (e.key === ' ') {
                this.input.focus();
                e.preventDefault();
            }
        };
        this.input = this.add(parentElement);
    }
    /* *
     *
     *  Methods
     *
     * */
    /**
     * Adds the input element to the parent element.
     * @param parentElement The parent element to add the input element to.
     * @returns The input element.
     */
    add(parentElement = this.cell.htmlElement) {
        const cell = this.cell;
        const input = this.input = document.createElement('input');
        const { options } = this.renderer;
        input.tabIndex = -1;
        input.name = cell.column.id + '-' + cell.row.id;
        if (options.attributes) {
            Object.entries(options.attributes).forEach(([key, value]) => {
                input.setAttribute(key, value);
            });
        }
        this.update();
        parentElement.appendChild(this.input);
        input.addEventListener('change', this.onChange);
        input.addEventListener('keydown', this.onKeyDown);
        input.addEventListener('blur', this.onBlur);
        this.cell.htmlElement.addEventListener('keydown', this.onCellKeyDown);
        return input;
    }
    /**
     * Updates the input element.
     */
    update() {
        const { options } = this.renderer;
        this.input.value = this.convertToInputValue();
        this.input.disabled = !!options.disabled;
    }
    /**
     * Gets the raw value of the input element.
     */
    get rawValue() {
        return this.input.value;
    }
    /**
     * Gets the value of the input element.
     */
    get value() {
        const val = this.input.value;
        switch (this.cell.column.dataType) {
            case 'datetime':
            case 'number':
                return val === '' ? null : +val;
            case 'boolean':
                if (val === '') {
                    return null;
                }
                if (val === 'false' || +val === 0) {
                    return false;
                }
                return true;
            case 'string':
                return val;
        }
    }
    /**
     * Converts the cell value to a string for the input.
     */
    convertToInputValue() {
        const val = this.cell.value;
        return defined(val) ? '' + val : '';
    }
    /**
     * Gets the main element (input) of the content.
     * @returns The input element.
     */
    getMainElement() {
        return this.input;
    }
    /**
     * Destroys the content.
     */
    destroy() {
        const input = this.input;
        this.cell.htmlElement.removeEventListener('keydown', this.onCellKeyDown);
        input.removeEventListener('blur', this.onBlur);
        input.removeEventListener('keydown', this.onKeyDown);
        input.removeEventListener('change', this.onChange);
        input.remove();
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default TextInputContent;
