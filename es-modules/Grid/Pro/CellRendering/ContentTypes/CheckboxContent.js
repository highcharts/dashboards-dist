/* *
 *
 *  Checkbox Cell Content class
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
import Globals from '../../../Core/Globals.js';
/* *
 *
 *  Class
 *
 * */
/**
 * Represents a checkbox type of cell content.
 */
class CheckboxContent extends CellContentPro {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(cell, renderer, parentElement) {
        super(cell, renderer);
        this.finishAfterChange = false;
        this.onChange = (e) => {
            if (this.changeHandler) {
                this.changeHandler(e);
            }
            else {
                void this.cell.setValue(this.value, true);
            }
        };
        this.onKeyDown = (e) => {
            this.keyDownHandler?.(e);
        };
        this.onBlur = (e) => {
            this.blurHandler?.(e);
        };
        this.onCellKeyDown = (e) => {
            if (e.key === ' ') {
                this.input.click();
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
        this.input = document.createElement('input');
        this.input.tabIndex = -1;
        this.input.type = 'checkbox';
        this.input.name = cell.column.id + '-' + cell.row.id;
        this.update();
        parentElement.appendChild(this.input);
        this.input.classList.add(Globals.classNamePrefix + 'field-auto-width');
        this.input.addEventListener('change', this.onChange);
        this.input.addEventListener('keydown', this.onKeyDown);
        this.input.addEventListener('blur', this.onBlur);
        this.cell.htmlElement.addEventListener('keydown', this.onCellKeyDown);
        return this.input;
    }
    update() {
        const cell = this.cell;
        const input = this.input;
        const { options } = this.renderer;
        input.checked = !!cell.value;
        input.disabled = !!options.disabled;
    }
    get rawValue() {
        return this.input.checked ? 'true' : 'false';
    }
    get value() {
        const val = this.input.checked;
        switch (this.cell.column.dataType) {
            case 'datetime':
            case 'number':
                return +val;
            case 'boolean':
                return val;
            case 'string':
                return '' + val;
        }
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
}
/* *
 *
 *  Default Export
 *
 * */
export default CheckboxContent;
