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
class NumberInputContent extends CellContentPro {
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
        this.finishAfterChange = false;
        this.dblClickHandler = (e) => {
            e.stopPropagation();
            this.input.focus();
        };
        this.onChange = (e) => {
            if (this.changeHandler) {
                this.changeHandler(e);
                return;
            }
            void this.cell.setValue(this.value, true);
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
        input.type = 'number';
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
        input.addEventListener('dblclick', this.dblClickHandler);
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
     * Gets the number value of the input element.
     */
    get value() {
        return +this.input.value;
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
export default NumberInputContent;
