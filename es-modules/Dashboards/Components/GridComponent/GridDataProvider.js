/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 * */
'use strict';
/* *
 *
 *  Functions
 *
 * */
/**
 * Returns whether the provider exposes `getDataTable`.
 *
 * @param provider
 * Data provider instance to test.
 *
 * @returns
 * `true` when provider exposes `getDataTable`.
 */
export function hasDataTableProvider(provider) {
    return !!(provider &&
        typeof provider.getDataTable === 'function');
}
