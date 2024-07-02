/* *
 *
 *  (c) 2009-2024 Highsoft AS
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
import SyncEmitter from './Emitter.js';
import SyncHandler from './Handler.js';
import U from '../../../Core/Utilities.js';
const { merge, isObject } = U;
/* *
 *
 * Class
 *
 * */
/** @internal */
class Sync {
    /* *
     *
     * Constructor
     *
     * */
    /**
     * Creates an instance of the sync class.
     *
     * @param component
     * The component to which the emitters and handlers are attached.
     *
     * @param predefinedSyncConfig
     * The predefined sync configuration.
     */
    constructor(component, predefinedSyncConfig) {
        this.component = component;
        this.predefinedSyncConfig = predefinedSyncConfig;
        this.syncConfig = Sync.prepareSyncConfig(predefinedSyncConfig, component.options.sync);
        this.registeredSyncHandlers = {};
        this.registeredSyncEmitters = {};
        this.isSyncing = false;
        this.listeners = [];
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Method that prepares the sync configuration from the predefined config
     * and current component options.
     *
     * @param predefinedConfig The predefined sync configuration.
     * @param componentSyncOptions The current component sync options.
     * @returns The sync configuration.
     */
    static prepareSyncConfig(predefinedConfig, componentSyncOptions = {}) {
        const { defaultSyncPairs: defaultPairs, defaultSyncOptions: defaultOptionsList } = predefinedConfig;
        return Object.keys(componentSyncOptions).reduce((acc, syncName) => {
            if (syncName) {
                const defaultPair = defaultPairs[syncName];
                const defaultOptions = defaultOptionsList[syncName];
                const entry = componentSyncOptions[syncName];
                const preparedOptions = merge(defaultOptions || {}, { enabled: isObject(entry) ? entry.enabled : entry }, isObject(entry) ? entry : {});
                if (defaultPair && preparedOptions.enabled) {
                    const keys = [
                        'emitter',
                        'handler'
                    ];
                    for (const key of keys) {
                        if (preparedOptions[key] === true ||
                            preparedOptions[key] === void 0) {
                            preparedOptions[key] =
                                defaultPair[key];
                        }
                    }
                }
                acc[syncName] = preparedOptions;
            }
            return acc;
        }, {});
    }
    /**
     * Add new emitter to the registered emitters.
     *
     * @param emitter
     * The emitter to register.
     */
    registerSyncEmitter(emitter) {
        const { id } = emitter;
        this.registeredSyncEmitters[id] = emitter;
    }
    /**
     * Method that checks if the emitter is registered.
     *
     * @param id
     * The id of the emitter to check.
     *
     * @returns
     * Whether the emitter is registered.
     */
    isRegisteredEmitter(id) {
        return Boolean(this.registeredSyncEmitters[id]);
    }
    /**
     * Register new handler to the registered handlers.
     *
     * @param handler
     * The handler to register.
     */
    registerSyncHandler(handler) {
        const { id } = handler;
        this.registeredSyncHandlers[id] = handler;
    }
    /**
     * Method that checks if the handler is registered.
     *
     * @param handlerID
     * The id of the handler to check.
     *
     * @returns
     * Whether the handler is registered.
     */
    isRegisteredHandler(handlerID) {
        return Boolean(this.registeredSyncHandlers[handlerID]);
    }
    /**
     * Registers the handlers and emitters on the component
     */
    start() {
        const { component } = this;
        this.syncConfig = Sync.prepareSyncConfig(this.predefinedSyncConfig, component.options.sync);
        for (const id of Object.keys(this.syncConfig)) {
            const syncOptions = this.syncConfig[id];
            if (!syncOptions) {
                continue;
            }
            let { emitter: emitterConfig, handler: handlerConfig } = syncOptions;
            if (handlerConfig) {
                if (handlerConfig === true) {
                    handlerConfig =
                        Sync.defaultHandlers[id]
                            .handler;
                }
                const handler = new SyncHandler(id, handlerConfig);
                if (!this.isRegisteredHandler(handler.id)) {
                    this.registerSyncHandler(handler);
                    handler.register(component);
                }
            }
            if (emitterConfig) {
                if (emitterConfig === true) {
                    emitterConfig =
                        Sync.defaultHandlers[id]
                            .emitter;
                }
                const emitter = new SyncEmitter(id, emitterConfig);
                if (!this.isRegisteredEmitter(emitter.id)) {
                    this.registerSyncEmitter(emitter);
                    emitter.create(component);
                }
            }
        }
        this.isSyncing = true;
        this.listeners.push(component.on('update', () => this.stop()));
    }
    /**
     * Removes the handlers and emitters from the component.
     */
    stop() {
        const { component, listeners, registeredSyncHandlers, registeredSyncEmitters } = this;
        Object.keys(registeredSyncHandlers).forEach((id) => {
            registeredSyncHandlers[id].remove();
            delete registeredSyncHandlers[id];
        });
        Object.keys(registeredSyncEmitters).forEach((id) => {
            registeredSyncEmitters[id].remove();
            delete registeredSyncEmitters[id];
        });
        this.isSyncing = false;
        for (let i = 0, iEnd = listeners.length; i < iEnd; ++i) {
            listeners[i]();
        }
        this.listeners.length = 0;
        this.listeners.push(component.on('afterUpdate', () => {
            this.start();
        }));
    }
}
/**
 * Default handlers for the sync class. This property is extended by
 * different Components, where default syncs are added. Allows overwriting
 * the configuration before creating the dashboard.
 */
Sync.defaultHandlers = {};
/* *
 *
 *  Default Export
 *
 * */
export default Sync;
