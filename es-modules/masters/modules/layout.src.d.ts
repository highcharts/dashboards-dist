/**
 * @license Highcharts Dashboards Layout 4.1.0 (2026-01-21)
 * @module dashboards/modules/layout
 * @requires dashboards
 *
 * (c) 2009-2026 Highsoft AS
 *
 * A commercial license may be required depending on use.
 * See www.highcharts.com/license
 */
import '../../Dashboards/EditMode/EditMode.js';
import '../../Dashboards/EditMode/Fullscreen.js';
import EditMode from '../../Dashboards/EditMode/EditMode.js';
import Fullscreen from '../../Dashboards/EditMode/Fullscreen.js';
declare global {
    interface Dashboards {
        EditMode: typeof EditMode;
        Fullscreen: typeof Fullscreen;
    }
}
declare const G: Dashboards;
export default G;
