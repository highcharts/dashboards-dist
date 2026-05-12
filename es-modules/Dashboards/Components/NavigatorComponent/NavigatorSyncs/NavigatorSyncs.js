/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Dawid Draguła
 *
 * */
'use strict';
import NavigatorCrossfilterSync from './NavigatorCrossfilterSync.js';
import NavigatorExtremesSync from './NavigatorExtremesSync.js';
/* *
*
*  Constants
*
* */
const predefinedSyncConfig = {
    defaultSyncPairs: {
        crossfilter: NavigatorCrossfilterSync.syncPair,
        extremes: NavigatorExtremesSync.syncPair
    },
    defaultSyncOptions: {
        crossfilter: NavigatorCrossfilterSync.defaultOptions,
        extremes: NavigatorExtremesSync.defaultOptions
    }
};
/* *
 *
 *  Default export
 *
 * */
export default predefinedSyncConfig;
