import D from './Globals.js';
/**
 * Add an event listener.
 *
 * @function Highcharts.addEvent<T>
 *
 * @param  {D.Class<T>|T} el
 *         The element or object to add a listener to. It can be a
 *         {@link HTMLDOMElement}, an {@link SVGElement} or any other object.
 *
 * @param  {string} type
 *         The event type.
 *
 * @param  {Dashboards.EventCallbackFunction<T>|Function} fn
 *         The function callback to execute when the event is fired.
 *
 * @param  {Dashboards.EventOptionsObject} [options]
 *         Options for adding the event.
 *
 * @return {Function}
 *         A callback function to remove the added event.
 */
declare function addEvent<T>(el: (D.Class<T> | T), type: string, fn: (Utilities.EventCallback<T> | Function), options?: Utilities.EventOptions): Function;
/**
 * Utility function to deep merge two or more objects and return a third object.
 * If the first argument is true, the contents of the second object is copied
 * into the first object. The merge function can also be used with a single
 * object argument to create a deep copy of an object.
 *
 * @function Highcharts.merge<T>
 *
 * @param {boolean} extend
 *        Whether to extend the left-side object (a) or return a whole new
 *        object.
 *
 * @param {T|undefined} a
 *        The first object to extend. When only this is given, the function
 *        returns a deep copy.
 *
 * @param {...Array<object|undefined>} [n]
 *        An object to merge into the previous one.
 *
 * @return {T}
 *         The merged object. If the first argument is true, the return is the
 *         same as the second argument.
 */ /**
* Utility function to deep merge two or more objects and return a third object.
* The merge function can also be used with a single object argument to create a
* deep copy of an object.
*
* @function Highcharts.merge<T>
*
* @param {T|undefined} a
*        The first object to extend. When only this is given, the function
*        returns a deep copy.
*
* @param {...Array<object|undefined>} [n]
*        An object to merge into the previous one.
*
* @return {T}
*         The merged object. If the first argument is true, the return is the
*         same as the second argument.
*/
declare function merge<T extends Object>(a: (true | T | undefined), ...n: Array<unknown>): T;
/**
 * Returns a deep copy of an argument. It differs from `merge` in that it copies
 * also arrays.
 *
 * @param value
 * The value to clone.
 *
 * @param excludedKeys
 * An array of keys to exclude from the clone.
 */
declare function deepClone(value: any, excludedKeys?: string[]): any;
/**
 * Creates a session-dependent unique key string for reference purposes.
 *
 * @function Dashboards.uniqueKey
 *
 * @return {string}
 * Unique key string
 */
declare function uniqueKey(): string;
/**
 * Provide error messages for debugging, with links to online explanation. This
 * function can be overridden to provide custom error handling.
 *
 * @sample highcharts/chart/highcharts-error/
 *         Custom error handler
 *
 * @function Dashboards.error
 *
 * @param {number|string} code
 *        The error code. See
 *        [errors.xml](https://github.com/highcharts/highcharts/blob/master/errors/errors.xml)
 *        for available codes. If it is a string, the error message is printed
 *        directly in the console.
 *
 * @param {boolean} [stop=false]
 *        Whether to throw an error or just log a warning in the console.
 *
 * @return {void}
 */
declare function error(code: number | string, stop?: boolean): void;
/**
 * Fire an event that was registered with addEvent.
 *
 * @function Highcharts.fireEvent<T>
 *
 * @param {T} el
 *        The object to fire the event on. It can be a {@link HTMLDOMElement},
 *        an {@link SVGElement} or any other object.
 *
 * @param {string} type
 *        The type of event.
 *
 * @param {Dashboards.Dictionary<*>|Event} [eventArguments]
 *        Custom event arguments that are passed on as an argument to the event
 *        handler.
 *
 * @param {Dashboards.EventCallbackFunction<T>|Function} [defaultFunction]
 *        The default function to execute if the other listeners haven't
 *        returned false.
 *
 * @return {void}
 */
declare function fireEvent<T>(el: T, type: string, eventArguments?: (D.AnyRecord | Event), defaultFunction?: (Utilities.EventCallback<T> | Function)): void;
/**
 * Remove an event that was added with {@link Highcharts#addEvent}.
 *
 * @function Dashboards.removeEvent<T>
 *
 * @param {Dashboards.Class<T>|T} el
 *        The element to remove events on.
 *
 * @param {string} [type]
 *        The type of events to remove. If undefined, all events are removed
 *        from the element.
 *
 * @param {Dashboards.EventCallbackFunction<T>} [fn]
 *        The specific callback to remove. If undefined, all events that match
 *        the element and optionally the type are removed.
 *
 * @return {void}
 */
declare function removeEvent<T>(el: (D.Class<T> | T), type?: string, fn?: (Utilities.EventCallback<T> | Function)): void;
declare namespace Utilities {
    interface EventCallback<T> {
        (this: T, eventArguments: (D.AnyRecord | Event)): (boolean | void);
    }
    interface EventWrapperObject<T> {
        fn: EventCallback<T>;
        order: number;
    }
    interface EventOptions {
        order?: number;
        passive?: boolean;
    }
}
declare const Utilities: {
    addEvent: typeof addEvent;
    deepClone: typeof deepClone;
    error: typeof error;
    fireEvent: typeof fireEvent;
    merge: typeof merge;
    removeEvent: typeof removeEvent;
    uniqueKey: typeof uniqueKey;
};
export default Utilities;
