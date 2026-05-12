import type { AnyRecord } from '../Shared/Types';
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
export interface EventCallback<T> {
    (this: T, eventArguments: (AnyRecord | Event)): (boolean | void);
}
export interface EventWrapperObject<T> {
    fn: EventCallback<T>;
    order: number;
}
export interface EventOptions {
    order?: number;
    passive?: boolean;
}
declare const Utilities: {
    deepClone: typeof deepClone;
    error: typeof error;
};
export default Utilities;
