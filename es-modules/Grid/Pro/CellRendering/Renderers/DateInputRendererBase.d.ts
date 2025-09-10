import type CellRenderer from '../CellRenderer.js';
declare namespace DateInputRendererBase {
    /**
     * Options to control the date input renderer content.
     */
    interface Options extends CellRenderer.Options {
        type: 'dateInput' | 'dateTimeInput' | 'timeInput';
        /**
         * Whether the date input is disabled.
         */
        disabled?: boolean;
        /**
         * Attributes to control the date input.
         */
        attributes?: DateInputAttributes;
    }
    /**
     * Attributes to control the date input.
     */
    interface DateInputAttributes {
        min?: string;
        max?: string;
        step?: string;
    }
}
export default DateInputRendererBase;
