import type { Options as MenuOptions } from '../Menu/Menu';
export interface Options {
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
    menu: MenuOptions;
    /**
     * Whether or not to show the outline.
     */
    outline: boolean;
    /**
     * Class name for the outline.
     */
    outlineClassName: string;
}
export default EditToolbar;
