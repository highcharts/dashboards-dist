import type Table from '../../Core/Table/Table';
import Validator from './Validator.js';
/**
 * @internal
 */
declare namespace ValidatorComposition {
    /**
     * Extends the grid classes with cell editing functionality.
     *
     * @param TableClass
     * The class to extend.
     *
     */
    function compose(TableClass: typeof Table): void;
}
declare module '../../Core/Table/Table' {
    export default interface Table {
        /**
         * The validator object.
         */
        validator: Validator;
    }
}
declare module '../../Pro/CellEditing/CellEditingComposition' {
    interface ColumnEditModeOptions {
        /**
         * Validation options for the column.
         *
         * If not set, the validation rules are applied according to the data
         * type.
         */
        validationRules?: (Validator.RuleKey | Validator.RuleDefinition)[];
    }
}
declare module '../../Core/Options' {
    interface LangOptions {
        /**
         * Validation options for the column.
         *
         * If not set, the validation rules are applied according to the data
         * type.
         */
        validationErrors?: Validator.RulesRegistryType;
    }
}
export default ValidatorComposition;
