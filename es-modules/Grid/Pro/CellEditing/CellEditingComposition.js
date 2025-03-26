/* *
 *
 *  Grid Cell Editing class.
 *
 *  (c) 2020-2024 Highsoft AS
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
                        cancelled: 'Editing canceled.'
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
     */
    function compose(TableClass, TableCellClass) {
        if (!pushUnique(Globals.composed, 'CellEditing')) {
            return;
        }
        merge(true, Defaults.defaultOptions, defaultOptions);
        addEvent(TableClass, 'beforeInit', initTable);
        addEvent(TableCellClass, 'keyDown', onCellKeyDown);
        addEvent(TableCellClass, 'dblClick', onCellDblClick);
        addEvent(TableCellClass, 'afterSetValue', addEditableCellA11yHint);
        addEvent(TableCellClass, 'startedEditing', function () {
            announceA11yUserEditedCell(this, 'started');
        });
        addEvent(TableCellClass, 'stoppedEditing', function (e) {
            this.column.viewport.grid.options
                ?.events?.cell?.afterEdit?.call(this);
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
     * Callback function called when a key is pressed on a cell.
     *
     * @param e
     * The event object.
     */
    function onCellKeyDown(e) {
        if (e.originalEvent?.key !== 'Enter' ||
            !this.column.options.cells?.editable) {
            return;
        }
        this.row.viewport.cellEditing?.startEditing(this);
    }
    /**
     * Callback function called when a cell is double clicked.
     */
    function onCellDblClick() {
        if (this.column.options.cells?.editable) {
            this.row.viewport.cellEditing?.startEditing(this);
        }
    }
    /**
     * Add the 'editable' hint span element for the editable cell.
     */
    function addEditableCellA11yHint() {
        const a11y = this.row.viewport.grid.accessibility;
        if (!a11y) {
            return;
        }
        const editableLang = this.row.viewport.grid.options
            ?.lang?.accessibility?.cellEditing?.editable;
        if (!this.column.options.cells?.editable ||
            !editableLang) {
            return;
        }
        makeHTMLElement('span', {
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
