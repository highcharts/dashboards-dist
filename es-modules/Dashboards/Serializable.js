/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  A commercial license may be required depending on use.
 *  See www.highcharts.com/license
 *
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */
'use strict';
/* *
 *
 *  Constants
 *
 * */
/**
 * Registry of serializable classes.
 */
const classRegistry = {};
/**
 * Registry of function sets.
 */
const helperRegistry = {};
/* *
 *
 *  Functions
 *
 * */
/**
 * Creates a class instance from the given JSON, if a suitable serializer
 * has been found.
 *
 * @function Serializable.fromJSON
 *
 * @param {JSON} json
 * JSON to create a class instance or object from.
 *
 * @return {AnyRecord}
 * Returns the class instance or object, or throws an exception.
 */
export function fromJSON(json) {
    const $class = json.$class;
    if (typeof $class !== 'string') {
        throw new Error('JSON has no $class property.');
    }
    const classs = classRegistry[$class];
    if (classs) {
        return classs.fromJSON(json);
    }
    const helper = helperRegistry[$class];
    if (helper) {
        return helper.fromJSON(json);
    }
    throw new Error(`'${$class}' unknown.`);
}
/**
 * Registers a class prototype for the given JSON $class.
 *
 * @function Serializable.registerClassPrototype
 *
 * @param {string} $class
 * JSON $class to register for.
 *
 * @param {Serializable} classPrototype
 * Class to register.
 */
export function registerClassPrototype($class, classPrototype) {
    if (classRegistry[$class]) {
        throw new Error('A serializer for \'' + $class + '\' is already registered.');
    }
    classRegistry[$class] = classPrototype;
}
/**
 * Registers helper functions for the given JSON $class.
 *
 * @function Serializable.registerHelper
 *
 * @param {Helper} helperFunctions
 * Helper functions to register.
 */
export function registerHelper(helperFunctions) {
    if (helperRegistry[helperFunctions.$class]) {
        throw new Error('A serializer for \'' + helperFunctions.$class +
            '\' is already registered.');
    }
    helperRegistry[helperFunctions.$class] = helperFunctions;
}
/**
 * Creates JSON from a class instance.
 *
 * @function Serializable.toJSON
 *
 * @param {AnyRecord} obj
 * Class instance or object to serialize as JSON.
 *
 * @return {JSON}
 * JSON of the class instance.
 */
export function toJSON(obj) {
    if (typeof obj.fromJSON === 'function' &&
        typeof obj.toJSON === 'function') {
        return obj.toJSON();
    }
    const classes = Object.keys(helperRegistry), numberOfHelpers = classes.length;
    let $class, serializer;
    for (let i = 0; i < numberOfHelpers; ++i) {
        $class = classes[i];
        serializer = helperRegistry[$class];
        if (serializer.jsonSupportFor(obj)) {
            return serializer.toJSON(obj);
        }
    }
    throw new Error('Object is not supported.');
}
/* *
 *
 *  Default Export
 *
 * */
const Serializable = {
    fromJSON,
    registerClassPrototype,
    registerHelper,
    toJSON
};
export default Serializable;
