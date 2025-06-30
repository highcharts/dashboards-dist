import type Column from '../../Core/Table/Column';
import type { EditModeContent } from '../CellEditing/CellEditMode';
import type Table from '../../Core/Table/Table';
import type TableCell from '../../Core/Table/Body/TableCell';
import Cell from '../../Core/Table/Cell.js';
/**
 * Class for validating cell content.
 */
declare class Validator {
    viewport: Table;
    /**
     * The cell that has an error.
     */
    errorCell?: Cell;
    /**
     * HTML Element for the errors.
     */
    notifContainer: HTMLElement;
    constructor(viewport: Table);
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
    validate(cell: TableCell, errors?: string[]): boolean;
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
    initErrorBox(cell: TableCell, errors: string[]): void;
    /**
     * Highlight the non-valid cell and display error in the notification box.
     */
    show(): void;
    /**
     * Hide the notification, error and unset highlight on cell.
     *
     * @param hideErrorBox
     * The flag that hides the error on edited cell.
     *
     */
    hide(hideErrorBox?: boolean): void;
    /**
     * Set the position of the error box.
     */
    reflow(): void;
    /**
     * Destroy validator.
     */
    destroy(): void;
}
/**
 * Namespace for Validation functionality.
 */
declare namespace Validator {
    /**
     * The class names used by the validator functionality.
     */
    const classNames: {
        readonly notifContainer: string;
        readonly notifError: string;
        readonly notifAnimation: string;
        readonly editedCellError: string;
    };
    /**
     * Callback function that checks if field is valid.
     */
    type ValidateFunction = (this: TableCell, content: EditModeContent) => boolean;
    /**
     * Callback function that returns a error message.
     */
    type ValidationErrorFunction = (this: TableCell, content?: EditModeContent) => string;
    /**
     * Definition of the validation rule that should container validate method
     * and error message displayed in notification.
     */
    interface RuleDefinition {
        validate: RulesRegistryType | ValidateFunction;
        notification: string | ValidationErrorFunction;
    }
    /**
     *  Definition of default validation rules.
     */
    interface RulesRegistryType {
        boolean: RuleDefinition;
        datetime: RuleDefinition;
        notEmpty: RuleDefinition;
        number: RuleDefinition;
    }
    /**
     * Type of rule: `notEmpty`, `number` or `boolean`.
     */
    type RuleKey = keyof RulesRegistryType;
    /**
     * Definition of default validation rules.
     */
    const rulesRegistry: RulesRegistryType;
    /**
     * Default validation rules for each dataType.
     */
    const predefinedRules: Record<Column.DataType, RuleKey[]>;
}
export default Validator;
