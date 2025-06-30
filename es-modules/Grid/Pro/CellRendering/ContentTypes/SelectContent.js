/* *
 *
 *  Select Cell Content class
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
import AST from '../../../../Core/Renderer/HTML/AST.js';
/* *
 *
 *  Class
 *
 * */
/**
 * Represents a select type of cell content.
 */
class SelectContent extends CellContentPro {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(cell, renderer, parentElement) {
        super(cell, renderer);
        this.finishAfterChange = true;
        /**
         * The HTML option elements representing the options in the select input.
         */
        this.optionElements = [];
        this.onChange = (e) => {
            if (this.changeHandler) {
                this.changeHandler(e);
            }
            else {
                this.cell.htmlElement.focus();
                void this.cell.setValue(this.value, true);
            }
        };
        this.onKeyDown = (e) => {
            e.stopPropagation();
            if (this.keyDownHandler) {
                this.keyDownHandler?.(e);
                return;
            }
            if (e.key === 'Escape' || e.key === 'Enter') {
                this.cell.htmlElement.focus();
            }
        };
        this.onBlur = (e) => {
            this.blurHandler?.(e);
        };
        this.onCellKeyDown = (e) => {
            if (e.key === ' ') {
                this.select.focus();
                e.preventDefault();
            }
        };
        this.select = this.add(parentElement);
    }
    /* *
     *
     *  Methods
     *
     * */
    add(parentElement = this.cell.htmlElement) {
        const cell = this.cell;
        const select = this.select = document.createElement('select');
        select.tabIndex = -1;
        select.name = cell.column.id + '-' + cell.row.id;
        this.update();
        parentElement.appendChild(this.select);
        select.addEventListener('change', this.onChange);
        select.addEventListener('keydown', this.onKeyDown);
        select.addEventListener('blur', this.onBlur);
        this.cell.htmlElement.addEventListener('keydown', this.onCellKeyDown);
        return select;
    }
    update() {
        const cell = this.cell;
        const { options } = this.renderer;
        this.select.disabled = !!options.disabled;
        // If there will be a need, we can optimize this by not removing all
        // old options and only updating the ones that need to be updated.
        this.select.innerHTML = AST.emptyHTML;
        for (const option of options.options) {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label || option.value;
            optionElement.disabled = !!option.disabled;
            if (cell.value === option.value) {
                optionElement.selected = true;
            }
            this.select.appendChild(optionElement);
            this.optionElements.push(optionElement);
        }
    }
    destroy() {
        const select = this.select;
        this.cell.htmlElement.removeEventListener('keydown', this.onCellKeyDown);
        select.removeEventListener('blur', this.onBlur);
        select.removeEventListener('keydown', this.onKeyDown);
        select.removeEventListener('change', this.onChange);
        for (const optionElement of this.optionElements) {
            optionElement.remove();
        }
        this.optionElements.length = 0;
        select.remove();
    }
    get rawValue() {
        return this.select.value;
    }
    get value() {
        const val = this.select.value;
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
        return this.select;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default SelectContent;
