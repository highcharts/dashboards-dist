import type { AnyRecord } from '../Shared/Types';
declare namespace PluginHandler {
    interface DashboardsPlugin<T = (AnyRecord | undefined)> {
        /**
         * Custom properties of the plugin
         */
        custom: T;
        /**
         * Maximal version of plugin that is compatible with dashboard
         */
        maxRevision?: number;
        /**
         * Minimal version of plugin that is compatible with dashboard
         */
        minRevision?: number;
        /**
         * Name of plugin
         */
        name: string;
    }
    /**
     * Adds a dashboard plugin.
     *
     * @param {Dashboards.Plugin} plugin
     * Dashboard plugin to register.
     *
     * @param {string} [key]
     * Plugin key for the registry. (Default: `plugin.name`)
     */
    function addPlugin(plugin: DashboardsPlugin, key?: string): void;
    /**
     * Removes a dashboard plugin.
     *
     * @param {string} key
     * Plugin key in the registry.
     */
    function removePlugin(key: string): void;
}
export default PluginHandler;
