/**
 * @license Highcharts Dashboards v0.0.2 (2023-07-03)
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
const D = Object.assign(Object.assign(Object.assign({}, Globals), Utilities), { Board, board: Board.board, Component,
    ComponentRegistry,
    DataConnector,
    DataCursor,
    DataModifier,
    DataPool,
    DataTable,
    PluginHandler,
    Sync });
/* *
 *
 *  Classic Exports
 *
 * */
if (!D.win.Dashboards) {
    D.win.Dashboards = D;
}
export default D;
