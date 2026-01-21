/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  A commercial license may be required depending on use.
 *  See www.highcharts.com/license
 *
 *
 *  Authors:
 *  - Dawid Dragula
 *
 * */
'use strict';
import KPIExtremesSync from './KPIExtremesSync.js';
/* *
*
*  Constants
*
* */
const predefinedSyncConfig = {
    defaultSyncPairs: {
        extremes: KPIExtremesSync.syncPair
    },
    defaultSyncOptions: {
        extremes: KPIExtremesSync.defaultOptions
    }
};
/* *
 *
 *  Default export
 *
 * */
export default predefinedSyncConfig;
