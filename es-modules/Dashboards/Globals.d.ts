import type { GUIElementType } from './Layout/GUIElement';
import type Board from './Board';
/**
 * Global Dashboards namespace in classic `<scripts>`-based implementations.
 *
 * @namespace Dashboards
 */
/**
 * Abstract class type to wrap expected instance T.
 */
export interface Class<T = unknown> extends Function {
    new (...args: Array<unknown>): T;
}
/**
 * Event callback as used by Highcharts.
 */
export interface EventCallback<T> {
    (this: T, eventArguments: (Record<string, unknown> | Event)): (boolean | void);
}
/**
 * Prefix of a GUIElement HTML class name.
 */
export declare const classNamePrefix = "highcharts-dashboards-";
export declare const version = "4.1.0";
/**
 * Contains all Board instances of this window.
 */
export declare const boards: Array<Board | undefined>;
/**
 * Reference to the window used by Dashboards.
 */
export declare const win: Window & typeof globalThis;
export declare const doc: Document;
export declare const noop: () => void;
export declare const isMS: boolean;
export declare const supportsPassiveEvents: boolean;
declare const Globals: {
    boards: (Board | undefined)[];
    classNamePrefix: string;
    classNames: {
        layout: string;
        cell: string;
        cellHover: string;
        cellActive: string;
        cellLoading: string;
        row: string;
        layoutsWrapper: string;
        boardContainer: string;
    };
    doc: Document;
    guiElementType: Record<string, GUIElementType>;
    isMS: boolean;
    noop: () => void;
    supportsPassiveEvents: boolean;
    version: string;
    win: Window & typeof globalThis;
};
export default Globals;
