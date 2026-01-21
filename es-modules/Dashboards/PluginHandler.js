/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  A commercial license may be required depending on use.
 *  See www.highcharts.com/license
 *
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */
'use strict';
import Board from './Board.js';
import Sync from './Components/Sync/Sync.js';
import ComponentRegistry from './Components/ComponentRegistry.js';
/* *
 *
 *  Constants
 *
 * */
/** @internal */
export const registry = {};
/**
 * Revision of the Dashboard plugin API.
 *
 * @internal
 */
export const revision = 0;
/* *
 *
 *  Functions
 *
 * */
/**
 * Adds a dashboard plugin.
 *
 * @param {Dashboards.Plugin} plugin
 * Dashboard plugin to register.
 *
 * @param {string} [key]
 * Plugin key for the registry. (Default: `plugin.name`)
 */
export function addPlugin(plugin, key = plugin.name) {
    const { maxRevision, minRevision, onRegister } = plugin;
    if (registry[key]) {
        // Only throw error with custom key
        if (key !== plugin.name) {
            throw new Error(`Plugin '${key}' already registered.`);
        }
        return;
    }
    if ((typeof minRevision === 'number' && minRevision > revision) ||
        (typeof maxRevision === 'number' && maxRevision < revision)) {
        throw new Error(`Plugin '${key}' does not support revision ${revision}.`);
    }
    onRegister({
        Board,
        ComponentRegistry,
        Sync,
        revision
    });
    registry[key] = plugin;
}
/**
 * Removes a dashboard plugin.
 *
 * @param {string} key
 * Plugin key in the registry.
 */
export function removePlugin(key) {
    if (registry[key]) {
        registry[key].onUnregister({
            ComponentRegistry: ComponentRegistry,
            Board,
            Sync,
            revision
        });
        delete registry[key];
    }
}
/* *
 *
 *  Default Export
 *
 * */
const PluginHandler = {
    addPlugin,
    removePlugin,
    registry,
    revision
};
export default PluginHandler;
