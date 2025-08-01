/**
 * @license Highcharts Dashboards v@product.version@ (@product.date@)
 * @module dashboards/dashboards
 *
 * (c) 2009-2025 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
import type { Highcharts as H } from '../Dashboards/Plugins/HighchartsTypes';
import type { GridNamespace as D } from '../Dashboards/Plugins/DataGridTypes';
import '../Dashboards/Components/HTMLComponent/HTMLComponent.js';
import '../Data/Connectors/CSVConnector.js';
import '../Data/Connectors/GoogleSheetsConnector.js';
import '../Data/Connectors/HTMLTableConnector.js';
import '../Data/Connectors/JSONConnector.js';
import '../Data/Modifiers/ChainModifier.js';
import '../Data/Modifiers/InvertModifier.js';
import '../Data/Modifiers/RangeModifier.js';
import '../Data/Modifiers/SortModifier.js';
import '../Data/Modifiers/FilterModifier.js';
import AST from '../Core/Renderer/HTML/AST.js';
import DataConnector from '../Data/Connectors/DataConnector.js';
import Board from '../Dashboards/Board.js';
import Component from '../Dashboards/Components/Component.js';
import ComponentRegistry from '../Dashboards/Components/ComponentRegistry.js';
import DataPool from '../Data/DataPool.js';
import DataCursor from '../Data/DataCursor.js';
import DataConverter from '../Data/Converters/DataConverter.js';
import DataModifier from '../Data/Modifiers/DataModifier.js';
import DataTable from '../Data/DataTable.js';
import Globals from '../Dashboards/Globals.js';
import GridPlugin from '../Dashboards/Plugins/DataGridPlugin.js';
import HighchartsPlugin from '../Dashboards/Plugins/HighchartsPlugin.js';
import PluginHandler from '../Dashboards/PluginHandler.js';
import Sync from '../Dashboards/Components/Sync/Sync.js';
import Utilities from '../Dashboards/Utilities.js';
declare global {
    interface Dashboards {
        addEvent: typeof Utilities.addEvent;
        board: typeof Board.board;
        boards: typeof Globals.boards;
        error: typeof Utilities.error;
        merge: typeof Utilities.merge;
        removeEvent: typeof Utilities.removeEvent;
        uniqueKey: typeof Utilities.uniqueKey;
        win: typeof Globals.win;
        AST: typeof AST;
        Board: typeof Board;
        Component: typeof Component;
        ComponentRegistry: typeof ComponentRegistry;
        DataConnector: typeof DataConnector;
        DataConverter: typeof DataConverter;
        DataCursor: typeof DataCursor;
        DataModifier: typeof DataModifier;
        DataPool: typeof DataPool;
        DataTable: typeof DataTable;
        /** @deprecated DataGrid will be removed in behalf of Grid in the next major version. */
        DataGridPlugin: typeof GridPlugin;
        GridPlugin: typeof GridPlugin;
        HighchartsPlugin: typeof HighchartsPlugin;
        PluginHandler: typeof PluginHandler;
        Sync: typeof Sync;
    }
    interface Window {
        Dashboards: Dashboards;
        Highcharts?: H;
        /** @deprecated DataGrid will be removed in behalf of Grid in the next major version. */
        DataGrid?: D;
        Grid?: D;
    }
    let Dashboards: Dashboards;
}
declare const G: Dashboards;
export default G;
