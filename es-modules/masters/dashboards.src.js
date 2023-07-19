/**
 * @license Highcharts Dashboards v1.0.1 (2023-07-19)
 * @module dashboards/dashboards
 *
 * (c) 2009-2023 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
'use strict';
/* *
 *
 *  Imports
 *
 * */
import DataConnector from '../Data/Connectors/DataConnector.js';
import Board from '../Dashboards/Board.js';
import Component from '../Dashboards/Components/Component.js';
import ComponentRegistry from '../Dashboards/Components/ComponentRegistry.js';
import DataPool from '../Data/DataPool.js';
import DataCursor from '../Data/DataCursor.js';
import DataModifier from '../Data/Modifiers/DataModifier.js';
import DataTable from '../Data/DataTable.js';
import Globals from '../Dashboards/Globals.js';
import PluginHandler from '../Dashboards/PluginHandler.js';
import Sync from '../Dashboards/Components/Sync/Sync.js';
import Utilities from '../Dashboards/Utilities.js';
// Fill registries
import '../Data/Connectors/CSVConnector.js';
import '../Data/Connectors/HTMLTableConnector.js';
import '../Data/Connectors/GoogleSheetsConnector.js';
import '../Data/Modifiers/ChainModifier.js';
import '../Data/Modifiers/InvertModifier.js';
import '../Data/Modifiers/RangeModifier.js';
import '../Data/Modifiers/SortModifier.js';
/* *
 *
 *  Namespace
 *
 * */
const G = Globals;
G.board = Board.board;
G.merge = Utilities.merge;
G.uniqueKey = Utilities.uniqueKey;
G.Board = Board;
G.Component = Component;
G.ComponentRegistry = ComponentRegistry;
G.DataConnector = DataConnector;
G.DataCursor = DataCursor;
G.DataModifier = DataModifier;
G.DataPool = DataPool;
G.DataTable = DataTable;
G.PluginHandler = PluginHandler;
G.Sync = Sync;
/* *
 *
 *  Classic Export
 *
 * */
if (!G.win.Dashboards) {
    G.win.Dashboards = G;
}
/* *
 *
 *  Default Export
 *
 * */
export default G;
