import type { AnyRecord } from '../Shared/Types';
import type { JSONObject } from './JSON';
/**
 * JSON of a serializable class.
 */
export interface JSON<T extends string> extends JSONObject {
    $class: T;
}
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
export declare function fromJSON(json: JSON<string>): AnyRecord;
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
export declare function registerClassPrototype<T extends AnyRecord, TJSON extends JSON<string>>($class: TJSON['$class'], classPrototype: Serializable<T, TJSON>): void;
/**
 * Registers helper functions for the given JSON $class.
 *
 * @function Serializable.registerHelper
 *
 * @param {Helper} helperFunctions
 * Helper functions to register.
 */
export declare function registerHelper<T extends AnyRecord, TJSON extends JSON<string>>(helperFunctions: Helper<T, TJSON>): void;
export declare function toJSON<T extends AnyRecord, TJSON extends JSON<string>>(obj: Serializable<T, TJSON>): TJSON;
export declare function toJSON(obj: AnyRecord): JSON<string>;
declare const Serializable: {
    fromJSON: typeof fromJSON;
    registerClassPrototype: typeof registerClassPrototype;
    registerHelper: typeof registerHelper;
    toJSON: typeof toJSON;
};
export default Serializable;
