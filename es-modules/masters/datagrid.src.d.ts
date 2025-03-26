/**
 * @license Highcharts Dashboards v@product.version@ (@product.date@)
 * @module datagrid/datagrid
 *
 * (c) 2009-2024 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
import AST from '../Core/Renderer/HTML/AST.js';
import Templating from '../Core/Templating.js';
import DataConnector from '../Data/Connectors/DataConnector.js';
import DataConverter from '../Data/Converters/DataConverter.js';
import DataCursor from '../Data/DataCursor.js';
import _Grid from '../Grid/Core/Grid.js';
import DataModifier from '../Data/Modifiers/DataModifier.js';
import DataPool from '../Data/DataPool.js';
import DataTable from '../Data/DataTable.js';
import Defaults from '../Grid/Core/Defaults.js';
import Globals from '../Grid/Core/Globals.js';
import whcm from '../Accessibility/HighContrastMode.js';
import Utilities from '../Core/Utilities.js';
import Table from '../Grid/Core/Table/Table.js';
import Column from '../Grid/Core/Table/Column.js';
import HeaderCell from '../Grid/Core/Table/Header/HeaderCell.js';
import TableCell from '../Grid/Core/Table/Content/TableCell.js';
import '../Data/Connectors/CSVConnector.js';
import '../Data/Connectors/GoogleSheetsConnector.js';
import '../Data/Connectors/HTMLTableConnector.js';
import '../Data/Connectors/JSONConnector.js';
import '../Data/Modifiers/ChainModifier.js';
import '../Data/Modifiers/InvertModifier.js';
import '../Data/Modifiers/RangeModifier.js';
import '../Data/Modifiers/SortModifier.js';
import '../Grid/Pro/GridEvents.js';
import '../Grid/Pro/CellEditing/CellEditingComposition.js';
import '../Grid/Pro/Dash3Compatibility.js';
import '../Grid/Pro/Credits/CreditsProComposition.js';
declare global {
    interface DataGridNamespace {
        win: typeof Globals.win;
        product: 'Grid Pro';
        AST: typeof AST;
        classNamePrefix: typeof Globals.classNamePrefix;
        /**
         * @deprecated Use `Grid` instead.
         */
        DataGrid: typeof _Grid;
        /**
         * @deprecated Use `grid` instead.
         */
        dataGrid: typeof _Grid.grid;
        /**
         * @deprecated Use `grids` instead.
         */
        dataGrids: Array<(_Grid | undefined)>;
        Grid: typeof _Grid;
        grid: typeof _Grid.grid;
        grids: Array<(_Grid | undefined)>;
        DataConverter: typeof DataConverter;
        DataCursor: typeof DataCursor;
        DataModifier: typeof DataModifier;
        DataConnector: typeof DataConnector;
        DataPool: typeof DataPool;
        DataTable: typeof DataTable;
        isHighContrastModeActive: typeof whcm.isHighContrastModeActive;
        defaultOptions: typeof Defaults.defaultOptions;
        setOptions: typeof Defaults.setOptions;
        Table: typeof Table;
        Column: typeof Column;
        HeaderCell: typeof HeaderCell;
        TableCell: typeof TableCell;
        Templating: typeof Templating;
        merge: typeof Utilities.merge;
    }
    interface Window {
        /**
         * @deprecated Use `Grid` instead.
         */
        DataGrid: DataGridNamespace;
        Grid: DataGridNamespace;
    }
}
declare const G: DataGridNamespace;
export default G;
