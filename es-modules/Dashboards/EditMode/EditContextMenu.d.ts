import Menu from './Menu/Menu.js';
declare namespace EditContextMenu {
    /**
     * Options for the context menu.
     */
    interface Options extends Menu.Options {
        /**
         * The icon name.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/edit-mode/change-ctx-icon/ | Change icon}
         */
        icon?: string;
        /**
         * The text added next to the icon.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/edit-mode/change-ctx-icon/|Add text next to icon}
         *
         * @default undefined
         */
        text?: string;
        /**
         * Width of the context menu.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/edit-mode/ctx-menu-width/ | Change width}
         */
        width?: number;
    }
}
export default EditContextMenu;
