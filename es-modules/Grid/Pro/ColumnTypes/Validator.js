/* *
 *
 *  Grid cell content validator
 *
 *  (c) 2009-2024 Highsoft AS
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
import AST from '../../../Core/Renderer/HTML/AST.js';
import Globals from '../../Core/Globals.js';
import GridUtils from '../../Core/GridUtils.js';
import U from '../../../Core/Utilities.js';
const { makeDiv, setHTMLContent } = GridUtils;
const { defined } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Class for validating cell content.
 */
class Validator {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(viewport) {
        this.viewport = viewport;
        this.notifContainer = makeDiv(Validator.classNames.notifContainer);
        this.viewport.grid.contentWrapper?.appendChild(this.notifContainer);
    }
    /* *
     *
     *  Methods
     *
     * */
    /**
     * Validates the cell content.
     *
     * @param cell
     * Edited cell.
     *
     * @param errors
     * An output array for error messages.
     *
     * @returns
     * Returns true if the value is valid, false otherwise.
     */
    validate(cell, errors = []) {
        const { options, dataType } = cell.column;
        const validationErrors = cell.row.viewport.grid.options?.lang?.validationErrors;
        let rules = Array.from(options?.cells?.editMode?.validationRules || []);
        // Remove duplicates in validationRules
        const isArrayString = rules.every((rule) => typeof rule === 'string');
        if (rules.length > 0 && isArrayString) {
            rules = [...new Set(rules)];
        }
        else {
            const predefined = Validator.predefinedRules[dataType] || [];
            const hasPredefined = rules.some((rule) => typeof rule !== 'string' &&
                typeof rule.validate === 'string' &&
                predefined.includes(rule.validate));
            if (!hasPredefined) {
                rules.push(...predefined);
            }
        }
        for (const rule of rules) {
            let ruleDef;
            let err;
            if (typeof rule === 'string') {
                ruleDef = Validator.rulesRegistry[rule];
                err = validationErrors?.[rule]?.notification;
            }
            else {
                ruleDef = rule;
            }
            let validateFn;
            if (typeof ruleDef.validate === 'string') {
                const predefinedRules = (Validator.rulesRegistry[ruleDef.validate]);
                validateFn =
                    predefinedRules?.validate;
            }
            else {
                validateFn = ruleDef.validate;
            }
            const { editModeContent } = cell.column.viewport.cellEditing || {};
            if (typeof validateFn === 'function' &&
                editModeContent &&
                !validateFn.call(cell, editModeContent)) {
                if (typeof ruleDef.notification === 'function') {
                    err = ruleDef.notification.call(cell, editModeContent);
                }
                errors.push((err || ruleDef.notification));
            }
        }
        return !errors.length;
    }
    /**
     * Set content of notification and adjust the position.
     *
     * @param cell
     * Cell that is currently edited and is not valid.
     *
     * @param errors
     * An array of error messages.
     *
     */
    initErrorBox(cell, errors) {
        const { grid } = this.viewport;
        this.errorCell = cell;
        // Set error container position
        this.reflow();
        // Set width and content
        setHTMLContent(this.notifContainer, errors.join('<br />'));
        // A11y announcement
        if (grid.options?.accessibility?.announcements?.cellEditing) {
            this.viewport.grid.accessibility?.announce((grid.options?.lang?.accessibility?.cellEditing
                ?.announcements?.notValid || '') + ' ' + errors.join('. '), true);
        }
        this.show();
    }
    /**
     * Highlight the non-valid cell and display error in the notification box.
     */
    show() {
        this.errorCell?.htmlElement.classList.add(Validator.classNames.editedCellError);
        this.notifContainer.classList.add(Validator.classNames.notifError, Validator.classNames.notifAnimation);
    }
    /**
     * Hide the notification, error and unset highlight on cell.
     *
     * @param hideErrorBox
     * The flag that hides the error on edited cell.
     *
     */
    hide(hideErrorBox = true) {
        this.errorCell?.htmlElement.classList.remove(Validator.classNames.editedCellError);
        this.notifContainer.classList.remove(Validator.classNames.notifError, Validator.classNames.notifAnimation);
        if (hideErrorBox) {
            this.errorCell = void 0;
        }
        this.notifContainer.innerHTML = AST.emptyHTML;
    }
    /**
     * Set the position of the error box.
     */
    reflow() {
        const vp = this.viewport, errorCell = this.errorCell?.htmlElement, tableElement = vp.grid.tableElement, contentWrapper = vp.grid.contentWrapper;
        if (!errorCell || !tableElement || !contentWrapper) {
            return;
        }
        const tableTop = tableElement.offsetTop, tableHeight = tableElement.offsetHeight, middlePoint = tableTop + (tableHeight / 2), errorCellTop = errorCell.offsetTop - tableTop;
        if (errorCellTop > middlePoint) {
            this.notifContainer.style.top = // Avoid header overlap
                tableTop + (vp.theadElement?.offsetHeight || 0) + 'px';
            this.notifContainer.style.bottom = 'auto';
        }
        else {
            this.notifContainer.style.top = 'auto';
            this.notifContainer.style.bottom =
                contentWrapper.offsetHeight - tableTop - tableHeight + 'px';
        }
    }
    /**
     * Destroy validator.
     */
    destroy() {
        this.errorCell = void 0;
        this.notifContainer.remove();
    }
}
/* *
 *
 *  Namespace
 *
 * */
/**
 * Namespace for Validation functionality.
 */
(function (Validator) {
    /**
     * The class names used by the validator functionality.
     */
    Validator.classNames = {
        notifContainer: Globals.classNamePrefix + 'notification',
        notifError: Globals.classNamePrefix + 'notification-error',
        notifAnimation: Globals.classNamePrefix + 'notification-animation',
        editedCellError: Globals.classNamePrefix + 'edited-cell-error'
    };
    /* *
     *
     *  Variables
     *
     * */
    /**
     * Definition of default validation rules.
     */
    Validator.rulesRegistry = {
        notEmpty: {
            validate: ({ value, rawValue }) => (defined(value) && rawValue.length > 0),
            notification: 'Value cannot be empty.'
        },
        number: {
            validate: ({ rawValue }) => !isNaN(+rawValue),
            notification: 'Value has to be a number.'
        },
        datetime: {
            validate: ({ value }) => !defined(value) || !isNaN(+value),
            notification: 'Value has to be parsed to a valid timestamp.'
        },
        'boolean': {
            validate: ({ rawValue }) => (rawValue === 'true' || rawValue === 'false' ||
                Number(rawValue) === 1 || Number(rawValue) === 0),
            notification: 'Value has to be a boolean.'
        }
    };
    /**
     * Default validation rules for each dataType.
     */
    Validator.predefinedRules = {
        'boolean': ['boolean'],
        datetime: ['datetime'],
        number: ['number'],
        string: []
    };
})(Validator || (Validator = {}));
/* *
 *
 *  Default Export
 *
 * */
export default Validator;
