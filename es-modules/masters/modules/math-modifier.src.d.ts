/**
 * @license Highcharts Dashboards Math 4.1.0 (2026-01-21)
 * @module dashboards/modules/math-modifier
 * @requires dashboards
 *
 * (c) 2009-2026 Highsoft AS
 *
 * A commercial license may be required depending on use.
 * See www.highcharts.com/license
 */
import Formula from '../../Data/Formula/Formula.js';
import '../../Data/Modifiers/MathModifier.js';
declare global {
    interface Dashboards {
        Formula: typeof Formula;
    }
}
declare const G: Dashboards;
export default G;
