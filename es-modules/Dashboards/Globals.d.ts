import type Board from './Board';
/**
 * Global Dashboards namespace in classic `<scripts>`-based implementations.
 *
 * @namespace Dashboards
 */
declare namespace Globals {
    /**
     * Abstract class type to wrap expected instance T.
     */
    interface Class<T = unknown> extends Function {
        new (...args: Array<unknown>): T;
    }
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
