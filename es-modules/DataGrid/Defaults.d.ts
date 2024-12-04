import type Options from './Options';
import Globals from './Globals.js';
/**
 * Namespace for default options.
 */
declare namespace Defaults {
    /**
     * Default options for the DataGrid.
     */
    const defaultOptions: Globals.DeepPartial<Options>;
    /**
     * Merge the default options with custom options. Commonly used for defining
     * reusable templates.
     *
     * @param options
     * The new custom chart options.
     */
    function setOptions(options: Globals.DeepPartial<Options>): void;
}
export default Defaults;
