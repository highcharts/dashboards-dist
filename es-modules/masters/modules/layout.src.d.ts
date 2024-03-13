/**
 * @license Highcharts Dashboards Layout @product.version@ (@product.date@)
 * @module dashboards/modules/layout
 * @requires dashboards
 *
 * (c) 2009-2024 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
import '../../Dashboards/EditMode/EditMode.js';
import '../../Dashboards/EditMode/Fullscreen.js';
import EditMode from '../../Dashboards/EditMode/EditMode.js';
import Fullscreen from '../../Dashboards/EditMode/Fullscreen.js';
declare global {
    interface Dashboards {
        EditMode: typeof EditMode;
        FullScreen: typeof Fullscreen;
    }
}
declare const G: Dashboards;
export default G;
