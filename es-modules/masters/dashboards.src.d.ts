/**
 * @license Highcharts Dashboards v0.0.2 (@product.date@)
 * @module dashboards/dashboards
 *
 * (c) 2009-2023 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
import DataConnector from '../Data/Connectors/DataConnector.js';
import Board from '../Dashboards/Board.js';
import Component from '../Dashboards/Components/Component.js';
import ComponentRegistry from '../Dashboards/Components/ComponentRegistry.js';
import DataPool from '../Data/DataPool.js';
import DataCursor from '../Data/DataCursor.js';
import DataModifier from '../Data/Modifiers/DataModifier.js';
import DataTable from '../Data/DataTable.js';
import PluginHandler from '../Dashboards/PluginHandler.js';
import Sync from '../Dashboards/Components/Sync/Sync.js';
import '../Data/Connectors/CSVConnector.js';
import '../Data/Connectors/HTMLTableConnector.js';
import '../Data/Connectors/GoogleSheetsConnector.js';
import '../Data/Modifiers/ChainModifier.js';
import '../Data/Modifiers/InvertModifier.js';
import '../Data/Modifiers/RangeModifier.js';
import '../Data/Modifiers/SortModifier.js';
declare global {
    interface Window {
        Dashboards: typeof D;
    }
    let Dashboards: typeof D;
}
declare const D: {
    Board: typeof Board;
    board: typeof Board.board;
    Component: typeof Component;
    ComponentRegistry: typeof ComponentRegistry;
    DataConnector: typeof DataConnector;
    DataCursor: typeof DataCursor;
    DataModifier: typeof DataModifier;
    DataPool: typeof DataPool;
    DataTable: typeof DataTable;
    PluginHandler: typeof PluginHandler;
    Sync: typeof Sync;
    merge: <T>() => T;
    uniqueKey: () => string;
    classNamePrefix: "highcharts-dashboards-";
    classNames: {
        layout: string;
        cell: string;
        cellHover: string;
        cellActive: string;
        row: string;
        layoutsWrapper: string;
        boardContainer: string;
    };
    guiElementType: Record<string, import("../Dashboards/Layout/GUIElement.js").default.GUIElementType>;
    responsiveBreakpoints: Record<string, string>;
    boards: (Board | undefined)[];
    win: Window & typeof globalThis;
};
export default D;
