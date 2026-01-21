/**
 * The configuration used to determine the default sync options, handlers
 * and emitters for a component.
 */
export interface PredefinedSyncConfig {
    /**
     * The default sync pairs (emitters and handlers) for the component.
     */
    defaultSyncPairs: Record<string, SyncPair>;
    /**
     * The default sync options for the component.
     */
    defaultSyncOptions: Record<string, OptionsEntry>;
}
export interface OptionsEntry {
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
export default Sync;
