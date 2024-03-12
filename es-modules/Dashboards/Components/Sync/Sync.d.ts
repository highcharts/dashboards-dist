import type ComponentType from '../ComponentType';
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
     * @param syncHandlers
     * The emitters and handlers to use for each event.
     */
    constructor(component: ComponentType, syncHandlers?: Sync.OptionsRecord);
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
    component: ComponentType;
    /**
     * The emitters and handlers to use for each event
     */
    syncConfig: Sync.OptionsRecord;
    /**
     * Whether the component is currently syncing.
     */
    isSyncing: boolean;
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
    /**
     * Crossfilter sync options.
     *
     * Example:
     * ```
     * {
     *     enabled: true,
     *     affectNavigator: true
     * }
     * ```
     */
    interface CrossfilterSyncOptions extends Sync.OptionsEntry {
        /**
         * Whether this navigator component's content should be affected by
         * other navigators with crossfilter enabled.
         *
         * Try it:
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/components/crossfilter-affecting-navigators | Affect Navigators Enabled }
         *
         * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/demo/sync-extremes/ | Affect Navigators Disabled }
         *
         * @default false
         */
        affectNavigator?: boolean;
    }
    /**
     * Highlight sync options.
     *
     * Example:
     * ```
     * {
     *     enabled: true,
     *     highlightPoint: true,
     *     showTooltip: false,
     *     showCrosshair: true
     * }
     * ```
     */
    interface HighlightSyncOptions extends Sync.OptionsEntry {
        /**
         * Whether the marker should be synced. When hovering over a point in
         * other component in the same group, the 'hover' state is enabled at
         * the corresponding point in this component.
         *
         * @default true
         */
        highlightPoint?: boolean;
        /**
         * Whether the tooltip should be synced. When hovering over a point in
         * other component in the same group, in this component the tooltip
         * should be also shown.
         *
         * @default true
         */
        showTooltip?: boolean;
        /**
         * Whether the crosshair should be synced. When hovering over a point in
         * other component in the same group, in this component the crosshair
         * should be also shown.
         *
         * Works only for axes that have crosshair enabled.
         *
         * @default true
         */
        showCrosshair?: boolean;
    }
    const defaultSyncOptions: Record<string, unknown>;
}
export default Sync;
