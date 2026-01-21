import type { ComponentTypeRegistry } from './ComponentType';
/**
 *
 * Record of component classes
 * @todo
 *
 */
export declare const types: ComponentTypeRegistry;
/**
 * Method used to register new component classes.
 *
 * @param {string} key
 * Registry key of the component class.
 *
 * @param {ComponentType} DataConnectorClass
 * Component class (aka class constructor) to register.
 */
export declare function registerComponent<T extends keyof ComponentTypeRegistry>(key: T, ComponentClass: ComponentTypeRegistry[T]): boolean;
declare const ComponentRegistry: {
    registerComponent: typeof registerComponent;
    types: ComponentTypeRegistry;
};
export default ComponentRegistry;
