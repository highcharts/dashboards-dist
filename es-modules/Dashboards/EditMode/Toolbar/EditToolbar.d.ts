import Menu from '../Menu/Menu.js';
declare namespace EditToolbar {
    interface Options {
        /**
         * Class name for the toolbar.
         */
        className: string;
        /**
         * Whether or not the toolbar is enabled.
         */
        enabled: boolean;
        /**
         * Options for the toolbar menu.
         */
        menu: Menu.Options;
        /**
         * Whether or not to show the outline.
         */
        outline: boolean;
        /**
         * Class name for the outline.
         */
        outlineClassName: string;
    }
}
export default EditToolbar;
