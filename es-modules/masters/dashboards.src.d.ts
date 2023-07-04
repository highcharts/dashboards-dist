/**
 * @license Highcharts Dashboards v@product.version@ (@product.date@)
 * @module dashboards/dashboards
 *
 * (c) 2009-2023 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
import '../Data/Connectors/CSVConnector.js';
import '../Data/Connectors/HTMLTableConnector.js';
import '../Data/Connectors/GoogleSheetsConnector.js';
import '../Data/Modifiers/ChainModifier.js';
import '../Data/Modifiers/InvertModifier.js';
import '../Data/Modifiers/RangeModifier.js';
import '../Data/Modifiers/SortModifier.js';
declare global {
    interface Window {
        Dashboards: typeof G;
    }
    let Dashboards: typeof G;
}
declare const G: AnyRecord;
export default G;
