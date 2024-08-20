import type GUIElement from './Layout/GUIElement';
import type Board from './Board';
/**
 * Global Dashboards namespace in classic `<scripts>`-based implementations.
 *
 * @namespace Dashboards
 */
declare namespace Globals {
    /**
     * Any type for objects with mixed property types.
     *
     * **Note:** This is not type safe and should be used only for property
     *           loops.
     */
    type AnyRecord = Record<string, any>;
    /**
     * Abstract class type to wrap expected instance T.
     */
    interface Class<T = unknown> extends Function {
        new (...args: Array<unknown>): T;
    }
    /**
     * Utility type to mark recursively all properties and sub-properties
     * optional.
     */
    type DeepPartial<T> = {
        [K in keyof T]?: (T[K] | DeepPartial<T[K]>);
    };
    /**
     * Event callback as used by Highcharts.
     */
    interface EventCallback<T> {
        (this: T, eventArguments: (Record<string, unknown> | Event)): (boolean | void);
    }
    /**
     * Prefix of a GUIElement HTML class name.
     */
    const classNamePrefix = "highcharts-dashboards-";
    /** @internal */
    const classNames: {
        layout: string;
        cell: string;
        cellHover: string;
        cellActive: string;
        cellLoading: string;
        row: string;
        layoutsWrapper: string;
        boardContainer: string;
    };
    /** @internal */
    const guiElementType: Record<string, GUIElement.GUIElementType>;
    /**
     * Contains all Board instances of this window.
     */
    const boards: Array<Board | undefined>;
    /**
     * Reference to the window used by Dashboards.
     */
    const win: Window & typeof globalThis;
    const doc: Document;
    const noop: () => void;
    const isMS: boolean;
    const supportsPassiveEvents: boolean;
}
export default Globals;
