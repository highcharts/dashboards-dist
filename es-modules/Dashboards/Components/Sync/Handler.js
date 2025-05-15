/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */
'use strict';
/* *
 *
 *  Class
 *
 * */
/**
 * Class responsible for storing handler callbacks used in component sync.
 * @internal
 */
class SyncHandler {
    /**
     * Adds a handler to the handler registry.
     *
     * @param handler
     * The handler to add to the registry.
     */
    static register(handler) {
        const { id } = handler;
        this.registry[id] = handler;
    }
    /**
     * Gets a handler from handler registry.
     *
     * @param handlerID
     * The ID of the handler to get.
     */
    static get(handlerID) {
        return this.registry[handlerID];
    }
    /**
     * Creates a new handler instance.
     *
     * @param id
     * An unique ID for the handler.
     *
     * @param func
     * The function to be called when the handler is activated.
     */
    constructor(id, func) {
        this.id = id;
        this.func = func;
        SyncHandler.register(this);
    }
    /**
     * Calls the activation function on the component and sets the callback to
     * the return function.
     *
     * @param component
     * The component to register on.
     */
    register(component) {
        const { func } = this;
        this.callback = func.call(component);
    }
    /**
     * To be used when removing the handler from the component.
     * Calls the {@link callback} function.
     */
    remove() {
        if (this.callback) {
            this.callback();
        }
    }
}
/**
 * Registry for reusable handlers.
 * The handler is stored by ID.
 */
SyncHandler.registry = {};
/* *
 *
 *  Default Export
 *
 * */
export default SyncHandler;
