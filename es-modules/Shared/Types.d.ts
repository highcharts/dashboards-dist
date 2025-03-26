declare namespace Types {
    /**
     * Any type for objects with mixed property types.
     *
     * **Note:** This is not type safe and should be used only for property
     *           loops.
     */
    type AnyRecord = Record<string, any>;
    /**
     * Utility type to mark recursively all properties and sub-properties
     * optional.
     */
    type DeepPartial<T> = {
        [K in keyof T]?: (T[K] | DeepPartial<T[K]>);
    };
    /**
     * Any typed array.
     */
    type TypedArray = (Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array);
    /**
     * Constructor of a typed array.
     */
    type TypedArrayConstructor = (Int8ArrayConstructor | Uint8ArrayConstructor | Uint8ClampedArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor);
}
export default Types;
