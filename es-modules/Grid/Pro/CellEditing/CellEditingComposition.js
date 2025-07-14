/* *
 *
 *  Grid Cell Editing class.
 *
 *  (c) 2020-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *  - Sebastian Bochan
 *
 * */
'use strict';
import Defaults from '../../Core/Defaults.js';
import Globals from '../../Core/Globals.js';
import CellEditing from './CellEditing.js';
import CellRendererRegistry from '../CellRendering/CellRendererRegistry.js';
import GU from '../../Core/GridUtils.js';
import U from '../../../Core/Utilities.js';
const { makeHTMLElement } = GU;
const { addEvent, merge, pushUnique } = U;
/* *
 *
 *  Composition
 *
 * */
/**
 * @internal
 */
var CellEditingComposition;
(function (CellEditingComposition) {
    /**
     * Default options for the cell editing.
     */
    const defaultOptions = {
        accessibility: {
            announcements: {
                cellEditing: true
            }
        },
        lang: {
            accessibility: {
                cellEditing: {
                    editable: 'Editable.',
                    announcements: {
                        started: 'Entered cell editing mode.',
                        edited: 'Edited cell value.',
                        cancelled: 'Editing canceled.',
                        notValid: 'Provided value is not valid.'
                    }
                }
            }
        }
    };
    /**
     * Extends the grid classes with cell editing functionality.
     *
     * @param TableClass
     * The class to extend.
     *
     * @param TableCellClass
     * The class to extend.
     *
     * @param ColumnClass
     * The class to extend.
     */
    function compose(TableClass, TableCellClass, ColumnClass) {
        if (!pushUnique(Globals.composed, 'CellEditing')) {
            return;
        }
        merge(true, Defaults.defaultOptions, defaultOptions);
        addEvent(ColumnClass, 'afterInit', afterColumnInit);
        addEvent(TableClass, 'beforeInit', initTable);
        addEvent(TableCellClass, 'keyDown', onCellKeyDown);
        addEvent(TableCellClass, 'dblClick', onCellDblClick);
        addEvent(TableCellClass, 'afterRender', addEditableCellA11yHint);
        addEvent(TableCellClass, 'startedEditing', function () {
            announceA11yUserEditedCell(this, 'started');
        });
        addEvent(TableCellClass, 'stoppedEditing', function (e) {
            const cellEvents = merge(
            // Backward compatibility
            this.column.viewport.grid.options?.events?.cell, this.column.options.cells?.events);
            if (e.submit) {
                cellEvents?.afterEdit?.call(this);
            }
            announceA11yUserEditedCell(this, e.submit ? 'edited' : 'cancelled');
        });
    }
    CellEditingComposition.compose = compose;
    /**
     * Callback function called before table initialization.
     */
    function initTable() {
        this.cellEditing = new CellEditing(this);
    }
    /**
     * Creates the edit mode renderer for the column.
     *
     * @param column
     * The column to create the edit mode renderer for.
     */
    function createEditModeRenderer(column) {
        const editModeOptions = column.options.cells?.editMode;
        const selectedEditModeRendererTypeName = editModeOptions?.renderer?.type;
        const viewRendererTypeName = column.options?.cells?.renderer?.type || 'text';
        if (selectedEditModeRendererTypeName) {
            return new CellRendererRegistry.types[selectedEditModeRendererTypeName](column, editModeOptions?.renderer || {});
        }
        const ViewRendererType = CellRendererRegistry.types[viewRendererTypeName] ||
            CellRendererRegistry.types.text;
        let editModeRendererTypeName = ViewRendererType.defaultEditingRenderer;
        if (typeof editModeRendererTypeName !== 'string') {
            editModeRendererTypeName =
                editModeRendererTypeName[column.dataType] || 'textInput';
        }
        return new CellRendererRegistry.types[editModeRendererTypeName](column, editModeRendererTypeName === viewRendererTypeName ? merge(column.options.cells?.renderer, { disabled: false }) || {} : {});
    }
    /**
     * Callback function called after column initialization.
     */
    function afterColumnInit() {
        const { options } = this;
        if (options?.cells?.editMode?.enabled ||
            options?.cells?.editable) {
            this.editModeRenderer = createEditModeRenderer(this);
        }
    }
    /**
     * Callback function called when a key is pressed on a cell.
     *
     * @param e
     * The event object.
     */
    function onCellKeyDown(e) {
        if (e.originalEvent?.key !== 'Enter' ||
            !this.column.editModeRenderer) {
            return;
        }
        this.row.viewport.cellEditing?.startEditing(this);
    }
    /**
     * Callback function called when a cell is double clicked.
     */
    function onCellDblClick() {
        if (this.column.editModeRenderer) {
            this.row.viewport.cellEditing?.startEditing(this);
        }
    }
    /**
     * Add the 'editable' hint span element for the editable cell.
     */
    function addEditableCellA11yHint() {
        const a11y = this.row.viewport.grid.accessibility;
        if (!a11y || this.a11yEditableHint?.isConnected) {
            return;
        }
        const editableLang = this.row.viewport.grid.options
            ?.lang?.accessibility?.cellEditing?.editable;
        if ((!this.column.options.cells?.editable &&
            !this.column.options.cells?.editMode?.enabled) ||
            !editableLang) {
            return;
        }
        this.a11yEditableHint = makeHTMLElement('span', {
            className: Globals.getClassName('visuallyHidden'),
            innerText: ', ' + editableLang
        }, this.htmlElement);
    }
    /**
     * Announce that the cell editing started.
     *
     * @param cell
     * The cell that is being edited.
     *
     * @param msgType
     * The type of the message.
     */
    function announceA11yUserEditedCell(cell, msgType) {
        const a11y = cell.row.viewport.grid.accessibility;
        if (!a11y) {
            return;
        }
        const { options } = a11y.grid;
        if (!options?.accessibility?.announcements?.cellEditing) {
            return;
        }
        const lang = options?.lang?.accessibility?.cellEditing?.announcements;
        const msg = lang?.[msgType];
        if (!msg) {
            return;
        }
        a11y.announce(msg);
    }
})(CellEditingComposition || (CellEditingComposition = {}));
/* *
 *
 *  Default Export
 *
 * */
export default CellEditingComposition;
