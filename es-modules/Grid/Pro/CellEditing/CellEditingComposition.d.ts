import type Table from '../../Core/Table/Table';
import type TableCell from '../../Core/Table/Content/TableCell';
import CellEditing from './CellEditing.js';
/**
 * @internal
 */
declare namespace CellEditingComposition {
    /**
     * Extends the grid classes with cell editing functionality.
     *
     * @param TableClass
     * The class to extend.
     *
     * @param TableCellClass
     * The class to extend.
     */
    function compose(TableClass: typeof Table, TableCellClass: typeof TableCell): void;
}
/**
 * Accessibility options for the Grid cell editing functionality.
 */
export interface CellEditingLangA11yOptions {
    /**
     * An additional hint (a visually hidden span) read by the voice over
     * after the cell value.
     *
     * @default 'Editable.'
     */
    editable?: string;
    /**
     * Accessibility lang options for the cell editing announcements.
     */
    announcements?: {
        /**
         * The message when the cell editing started.
         *
         * @default 'Entered cell editing mode.'
         */
        started?: string;
        /**
         * The message when the cell editing ended.
         *
         * @default 'Edited cell value.'
         */
        edited?: string;
        /**
         * The message when the cell editing was cancelled.
         *
         * @default 'Editing cancelled.'
         */
        cancelled?: string;
    };
}
declare module '../../Core/Table/Table' {
    export default interface Table {
        cellEditing?: CellEditing;
    }
}
declare module '../GridEvents' {
    interface CellEvents {
        /**
         * Callback function to be called after editing of cell value.
         */
        afterEdit?: CellEventCallback;
    }
}
declare module '../../Core/Accessibility/A11yOptions' {
    interface A11yAnnouncementsOptions {
        /**
         * Enable accessibility announcements for the cell editing.
         *
         * @default true
         */
        cellEditing?: boolean;
    }
    interface LangAccessibilityOptions {
        /**
         * Language options for the accessibility descriptions in cell editing.
         */
        cellEditing?: CellEditingLangA11yOptions;
    }
}
declare module '../../Core/Options' {
    interface ColumnCellOptions {
        /**
         * Whether to make the column cells editable `true`, or read-only `false`.
         *
         * Try it: {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/grid-pro/basic/overview | Editable columns disabled}
         *
         * @default true
         */
        editable?: boolean;
    }
}
/**
 * The possible types of the edit message.
 */
export type EditMsgType = 'started' | 'edited' | 'cancelled';
export default CellEditingComposition;
