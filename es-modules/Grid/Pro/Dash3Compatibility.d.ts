import type Grid from '../Core/Grid';
import type Table from '../Core/Table/Table';
/**
 * Composition to add compatibility with the old `dataGrid` property.
 *
 * @param TableClass
 * The class to extend.
 */
declare function compose(TableClass: typeof Table): void;
declare module '../Core/Table/Table' {
    export default interface Table {
        /**
         * Deprecated. Use `grid` instead.
         * @deprecated
         */
        readonly dataGrid: Grid;
    }
}
declare const _default: {
    compose: typeof compose;
};
export default _default;
