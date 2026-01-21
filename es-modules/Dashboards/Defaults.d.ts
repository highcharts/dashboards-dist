import type { Options as BoardOptions } from './Board';
import type { DeepPartial } from '../Shared/Types';
/**
 * Default options for the Board.
 */
export declare const defaultOptions: BoardOptions;
/**
 * Merge the default options with custom options. Commonly used for defining
 * reusable templates.
 *
 * @param options
 * The new custom board options.
 */
export declare function setOptions(options: DeepPartial<BoardOptions>): void;
declare const Defaults: {
    defaultOptions: BoardOptions;
    setOptions: typeof setOptions;
};
export default Defaults;
