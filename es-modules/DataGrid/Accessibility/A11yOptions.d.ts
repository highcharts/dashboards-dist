declare namespace A11yOptions {
    /**
     * Accessibility options for the DataGrid.
     */
    interface GeneralA11yOptions {
        /**
         * Enable accessibility features for the DataGrid.
         *
         * @default true
         */
        enabled?: boolean;
        /**
         * VoiceOver announcer options for DataGrid actions.
         */
        announcements?: {
            /**
             * Enable accessibility announcements for the cell editing.
             *
             * @default true
             */
            cellEditing?: boolean;
            /**
             * Enable accessibility announcements for the sorting.
             *
             * @default true
             */
            sorting?: boolean;
        };
    }
    /**
     * Accessibility language options for the DataGrid.
     */
    interface LangAccessibilityOptions {
        /**
         * Language options for the accessibility descriptions in cell editing.
         */
        cellEditing?: CellEditingLangA11yOptions;
        /**
         * Language options for the accessibility descriptions in sorting.
         */
        sorting?: SortingLangA11yOptions;
    }
    /**
     * Accessibility options for the DataGrid cell editing functionality.
     */
    interface CellEditingLangA11yOptions {
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
             * @default 'Editing canceled.'
             */
            cancelled?: string;
        };
    }
    /**
     * Accessibility options for the DataGrid sorting functionality.
     */
    interface SortingLangA11yOptions {
        /**
         * Accessibility lang options for the sorting announcements.
         */
        announcements?: {
            /**
             * The message when the column was sorted in ascending order.
             *
             * @default 'Sorted ascending.'
             */
            ascending?: string;
            /**
             * The message when the column was sorted in descending order.
             *
             * @default 'Sorted descending.'
             */
            descending?: string;
            /**
             * The message when the column was unsorted.
             *
             * @default 'Not sorted.'
             */
            none?: string;
        };
    }
    /**
     * Accessibility options for the DataGrid header cell.
     */
    interface HeaderCellA11yOptions {
        /**
         * The aria description of the header cell.
         */
        description?: string;
    }
}
export default A11yOptions;
