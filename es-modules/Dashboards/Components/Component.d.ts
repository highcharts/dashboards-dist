import type { ComponentTypeRegistry } from './ComponentType';
import type TextOptions from './TextOptions';
import ConnectorHandler from './ConnectorHandler.js';
import EditableOptions from './EditableOptions.js';
import Sync from './Sync/Sync.js';
interface Component {
    type: keyof ComponentTypeRegistry;
}
declare namespace Component {
    type ConnectorOptions = ConnectorHandler.ConnectorOptions;
    type SetConnectorsEvent = Event<'setConnectors' | 'afterSetConnectors', {}>;
    interface Options {
        /**
         * Cell id, where component is attached.
         */
        renderTo?: string;
        /**
         * The name of class that is applied to the component's container.
         */
        className?: string;
        /**
         * The type of component like: `HTML`, `KPI`, `Highcharts`, `Grid`,
         * `Navigator`.
         */
        type: keyof ComponentTypeRegistry;
        /**
         * Events attached to the component : `mount`, `unmount`, `resize`, `update`.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/component-options/events/ | Mount event }
         */
        events?: Record<string, Function>;
        /**
         * Set of options that are available for editing through sidebar.
         */
        editableOptions?: Array<EditableOptions.Options>;
        /**
         * Sync options. Predefined per component or custom sync options can be
         * used here.
         */
        sync?: Sync.RawOptionsRecord;
        /**
         * Connector options
         */
        connector?: (ConnectorOptions | Array<ConnectorOptions>);
        /**
         * Sets an ID for the component's container.
         */
        id?: string;
        /**
         * The component's title, which will render at the top.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/component-options/title/ | Changed captions }
         */
        title?: TextOptionsType;
        /**
         * The component's caption, which will render at the bottom.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/component-options/caption/ | Changed captions }
         */
        caption?: TextOptionsType;
        /**
         * States for the component.
         */
        states?: StatesOptions;
    }
    /**
     * States options for the component.
     */
    interface StatesOptions {
        active?: {
            /**
             * Whether the component is active. Only used when `enabled` is
             * `true`.
             * If `true`, the `highcharts-dashboards-cell-state-active` class
             * will be added to the component's container.
             *
             * Only one component can be active at a time.
             *
             * Try it:
             * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/component-options/states/ | Active state }
             *
             * @default false
             */
            isActive?: boolean;
            /**
             * Whether to enable the active state.
             *
             * @default false
             */
            enabled?: boolean;
        };
        hover?: {
            /**
             * Whether to enable the hover state.
             *
             * @default false
             */
            enabled?: boolean;
        };
    }
    /**
     * Allowed types for the text.
    */
    type TextOptionsType = string | false | TextOptions | undefined;
}
export default Component;
