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
declare function merge<T>(): T;
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
declare const Utilities: {
    error: typeof error;
    merge: typeof merge;
    uniqueKey: typeof uniqueKey;
};
export default Utilities;
