/* *
 *
 *  Date Input Cell Content Base class
 *
 *  (c) 2020-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *
 * */
'use strict';
import CellContentPro from '../CellContentPro.js';
/* *
 *
 *  Class
 *
 * */
/**
 * Represents a date/time/datetime input type of cell content.
 */
class DateInputContentBase extends CellContentPro {
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
        this.onChange = (e) => {
            this.changeHandler?.(e);
        };
        this.onKeyDown = (e) => {
            e.stopPropagation();
            if (this.keyDownHandler) {
                this.keyDownHandler(e);
                return;
            }
            if (e.key === 'Escape') {
                this.cell.htmlElement.focus();
                this.input.value = this.convertToInputValue();
                return;
            }
            if (e.key === 'Enter') {
                this.cell.htmlElement.focus();
                void this.cell.setValue(this.value, true);
            }
        };
        this.onBlur = (e) => {
            if (this.blurHandler) {
                this.blurHandler(e);
                return;
            }
            void this.cell.setValue(this.value, true);
        };
        this.onCellKeyDown = (e) => {
            if (e.key === ' ') {
                this.input.focus();
                e.preventDefault();
            }
        };
        this.options = renderer.options;
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
        const { cell, options } = this;
        const input = this.input = document.createElement('input');
        input.tabIndex = -1;
        input.type = this.getInputType();
        input.name = cell.column.id + '-' + cell.row.id;
        if (options.attributes) {
            Object.entries(options.attributes).forEach(([key, value]) => {
                input.setAttribute(key, value);
            });
        }
        this.update();
        parentElement.appendChild(input);
        input.addEventListener('change', this.onChange);
        input.addEventListener('keydown', this.onKeyDown);
        input.addEventListener('blur', this.onBlur);
        this.cell.htmlElement.addEventListener('keydown', this.onCellKeyDown);
        return this.input;
    }
    /**
     * Updates the input element.
     */
    update() {
        const input = this.input;
        input.value = this.convertToInputValue();
        input.disabled = !!this.options.disabled;
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
        return new Date(`${this.input.value}Z`).getTime();
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
export default DateInputContentBase;
