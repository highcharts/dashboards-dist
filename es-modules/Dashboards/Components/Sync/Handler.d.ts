import type Component from '../Component';
/**
 * Class responsible for storing handler callbacks used in component sync.
 * @internal
 */
declare class SyncHandler {
    /**
     * Registry for reusable handlers.
     * The handler is stored by ID.
     */
    static registry: Record<string, SyncHandler>;
    /**
     * Adds a handler to the handler registry.
     *
     * @param handler
     * The handler to add to the registry.
     */
    static register(handler: SyncHandler): void;
    /**
     * Gets a handler from handler registry.
     *
     * @param handlerID
     * The ID of the handler to get.
     */
    static get(handlerID: string): SyncHandler | undefined;
    /**
     * The ID of the handler.
     * @remark Can be any string, but should be unique.
     */
    id: string;
    /**
     * The function to be called when the handler is activated.
     */
    func: Function;
    /**
     * Callback function that is called when the handler is removed.
     * Normally provided as the return value of {@link func}.
     */
    callback?: Function;
    /**
     * Creates a new handler instance.
     *
     * @param id
     * An unique ID for the handler.
     *
     * @param func
     * The function to be called when the handler is activated.
     */
    constructor(id: string, func: Function);
    /**
     * Calls the activation function on the component and sets the callback to
     * the return function.
     *
     * @param component
     * The component to register on.
     */
    register(component: Component): void;
    /**
     * To be used when removing the handler from the component.
     * Calls the {@link callback} function.
     */
    remove(): void;
}
export default SyncHandler;
