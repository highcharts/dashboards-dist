/* *
 *
 *  Date Input Cell Content class
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
 * Represents a date input type of cell content.
 */
class DateInputContent extends CellContentPro {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(cell, renderer, parentElement) {
        super(cell, renderer);
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
        this.input = this.add(parentElement);
    }
    /* *
     *
     *  Methods
     *
     * */
    add(parentElement = this.cell.htmlElement) {
        const cell = this.cell;
        const input = this.input = document.createElement('input');
        input.tabIndex = -1;
        input.type = 'date';
        input.name = cell.column.id + '-' + cell.row.id;
        this.update();
        parentElement.appendChild(input);
        input.addEventListener('change', this.onChange);
        input.addEventListener('keydown', this.onKeyDown);
        input.addEventListener('blur', this.onBlur);
        this.cell.htmlElement.addEventListener('keydown', this.onCellKeyDown);
        return this.input;
    }
    update() {
        const input = this.input;
        const { options } = this.renderer;
        input.value = this.convertToInputValue();
        input.disabled = !!options.disabled;
    }
    get rawValue() {
        return this.input.value;
    }
    get value() {
        return new Date(this.input.value).getTime();
    }
    getMainElement() {
        return this.input;
    }
    destroy() {
        const input = this.input;
        this.cell.htmlElement.removeEventListener('keydown', this.onCellKeyDown);
        input.removeEventListener('blur', this.onBlur);
        input.removeEventListener('keydown', this.onKeyDown);
        input.removeEventListener('change', this.onChange);
        input.remove();
    }
    /**
     * Converts the cell value to a string for the input.
     */
    convertToInputValue() {
        const time = this.cell.column.viewport.grid.time;
        return time.dateFormat('%Y-%m-%d', Number(this.cell.value || 0));
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default DateInputContent;
