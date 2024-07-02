import type Component from '../Component';
import SyncEmitter from './Emitter.js';
import SyncHandler from './Handler.js';
/** @internal */
declare class Sync {
    /**
     * Creates an instance of the sync class.
     *
     * @param component
     * The component to which the emitters and handlers are attached.
     *
     * @param predefinedSyncConfig
     * The predefined sync configuration.
     */
    constructor(component: Component, predefinedSyncConfig: Sync.PredefinedSyncConfig);
    /**
     * Array of listeners that should be removed when the sync is stopped.
     */
    private listeners;
    /**
     * Default handlers for the sync class. This property is extended by
     * different Components, where default syncs are added. Allows overwriting
     * the configuration before creating the dashboard.
     */
    static defaultHandlers: Record<string, Sync.OptionsEntry>;
    /**
     * Registry for the sync handlers used within the component.
     */
    private registeredSyncHandlers;
    /**
     * Registry for the sync emitters used within the component.
     */
    private registeredSyncEmitters;
    /**
     * The component to which the emitters and handlers are attached.
     */
    component: Component;
    /**
     * The predefined sync configuration.
     */
    predefinedSyncConfig: Sync.PredefinedSyncConfig;
    /**
     * The emitters and handlers to use for each event
     */
    syncConfig: Sync.OptionsRecord;
    /**
     * Whether the component is currently syncing.
     */
    isSyncing: boolean;
    /**
     * Method that prepares the sync configuration from the predefined config
     * and current component options.
     *
     * @param predefinedConfig The predefined sync configuration.
     * @param componentSyncOptions The current component sync options.
     * @returns The sync configuration.
     */
    private static prepareSyncConfig;
    /**
     * Add new emitter to the registered emitters.
     *
     * @param emitter
     * The emitter to register.
     */
    registerSyncEmitter(emitter: SyncEmitter): void;
    /**
     * Method that checks if the emitter is registered.
     *
     * @param id
     * The id of the emitter to check.
     *
     * @returns
     * Whether the emitter is registered.
     */
    isRegisteredEmitter(id: string): boolean;
    /**
     * Register new handler to the registered handlers.
     *
     * @param handler
     * The handler to register.
     */
    registerSyncHandler(handler: SyncHandler): void;
    /**
     * Method that checks if the handler is registered.
     *
     * @param handlerID
     * The id of the handler to check.
     *
     * @returns
     * Whether the handler is registered.
     */
    isRegisteredHandler(handlerID: string): boolean;
    /**
     * Registers the handlers and emitters on the component
     */
    start(): void;
    /**
     * Removes the handlers and emitters from the component.
     */
    stop(): void;
}
declare namespace Sync {
    /** @internal */
    type EmitterConfig = SyncEmitter['func'];
    /** @internal */
    type HandlerConfig = SyncHandler['func'];
    /** @internal */
    interface SyncPair {
        emitter?: EmitterConfig;
        handler?: HandlerConfig;
    }
    /**
     * The configuration used to determine the default sync options, handlers
     * and emitters for a component.
     */
    interface PredefinedSyncConfig {
        /**
         * The default sync pairs (emitters and handlers) for the component.
         */
        defaultSyncPairs: Record<string, SyncPair>;
        /**
         * The default sync options for the component.
         */
        defaultSyncOptions: Record<string, OptionsEntry>;
    }
    interface OptionsEntry {
        /**
         * Whether the sync should be enabled.
         *
         * @default false
         */
        enabled?: boolean;
        /**
         * Responsible for communicating to the component group that the action
         * has been triggered on the component.
         *
         * If `true` or undefined the default emitter will be used, if `false`
         * or `null` it will be disabled
         */
        emitter?: EmitterConfig | null | boolean;
        /**
         * The group in which components sharing the same connector should be
         * synced.
         *
         * If `null` or `undefined` the component will be synced with all
         * components with the same connector.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/sync/groups | Sync groups for the same connector }
         *
         * @default undefined
         */
        group?: string;
        /**
         * Responsible for _handling_ incoming action from the synced component
         * group.
         *
         * If `true` or undefined the default handler will be used, if `false`
         * or `null` it will be disabled
         */
        handler?: HandlerConfig | null | boolean;
    }
    /** @internal */
    type OptionsRecord = (Record<(SyncEmitter['id'] | SyncHandler['id']), OptionsEntry>);
    /** @internal */
    type RawOptionsRecord = (Record<(SyncEmitter['id'] | SyncHandler['id']), undefined | boolean | OptionsEntry>);
}
export default Sync;
