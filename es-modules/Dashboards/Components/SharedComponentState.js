/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  A commercial license may be required depending on use.
 *  See www.highcharts.com/license
 *
 *
 *  Authors:
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */
'use strict';
import Serializable from '../Serializable.js';
import U from '../../Core/Utilities.js';
const { addEvent, fireEvent, merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Contains presentation information like column order, usually in relation to a
 * table instance.
 */
class SharedComponentState {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        this.columnVisibilityMap = {};
        this.hiddenRowIndexes = [];
        this.selection = {};
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Emits an event on this table to all registered callbacks of the given
     * event.
     *
     * @param {Event} e
     * Event object with event information.
     */
    emit(e) {
        fireEvent(this, e.type, e);
    }
    /**
     * Returns an ordered array of column names.
     *
     * @return {Array<string>}
     * Array of column names in order.
     */
    getColumnOrder() {
        return (this.columnOrder || []).slice();
    }
    getColumnVisibility(columnId) {
        return this.columnVisibilityMap[columnId];
    }
    /**
     * Returns a function for `Array.sort` to change the order of an array of
     * column names. Unknown column names come last.
     *
     * @return {ColumnOrderCallback}
     * Sort function to change the order.
     */
    getColumnSorter() {
        const columnOrder = (this.columnOrder || []).slice();
        if (!columnOrder.length) {
            return () => 0;
        }
        return (a, b) => {
            const aIndex = columnOrder.indexOf(a), bIndex = columnOrder.indexOf(b);
            if (aIndex > -1 && bIndex > -1) {
                return aIndex - bIndex;
            }
            if (bIndex > -1) {
                return 1;
            }
            if (aIndex > -1) {
                return -1;
            }
            return 0;
        };
    }
    /**
     * @return {boolean}
     * Returns true, if the state was changed since initialization.
     */
    isSet() {
        return this.isModified === true;
    }
    /**
     * Registers a callback for a specific event.
     *
     * @param {string} type
     * Event type as a string.
     *
     * @param {Function} callback
     * Function to register for an event callback.
     *
     * @return {Function}
     * Function to unregister callback from the event.
     */
    on(type, callback) {
        return addEvent(this, type, callback);
    }
    /**
     * Sets the order of the columns in place.
     *
     * @param {Array<string>} columnOrder
     * Array of column names in order.
     *
     * @param {AnyRecord} [eventDetail]
     * Custom information for pending events.
     */
    setColumnOrder(columnOrder, eventDetail) {
        const presentationState = this, oldColumnOrder = (presentationState.columnOrder || []).slice(), newColumnOrder = columnOrder.slice();
        presentationState.emit({
            type: 'columnOrderChange',
            detail: eventDetail,
            newColumnOrder,
            oldColumnOrder
        });
        presentationState.columnOrder = newColumnOrder;
        presentationState.isModified = true;
        presentationState.emit({
            type: 'afterColumnOrderChange',
            detail: eventDetail,
            newColumnOrder,
            oldColumnOrder
        });
    }
    setColumnVisibility(columnVisibility, eventDetail) {
        this.columnVisibilityMap = merge(this.columnVisibilityMap, columnVisibility);
        this.emit({
            type: 'afterColumnVisibilityChange',
            visibilityMap: this.columnVisibilityMap,
            detail: eventDetail
        });
    }
    setHiddenRows(rowIndexes, hidden = true) {
        rowIndexes.forEach((rowIndex) => {
            if (this.hiddenRowIndexes.indexOf(rowIndex) === -1 && hidden) {
                this.hiddenRowIndexes.push(rowIndex);
            }
            if (this.hiddenRowIndexes.indexOf(rowIndex) > -1 && !hidden) {
                this.hiddenRowIndexes
                    .splice(this.hiddenRowIndexes.indexOf(rowIndex), 1);
            }
        });
        this.emit({
            type: 'afterSetHiddenRows',
            hiddenRows: this.hiddenRowIndexes
        });
    }
    getHiddenRows() {
        return this.hiddenRowIndexes;
    }
    setHoverPoint(point, eventDetail) {
        const isGrid = eventDetail && eventDetail.isGrid;
        this.hoverPoint = isGrid ? void 0 : point;
        if (point instanceof HTMLElement) {
            this.hoverRow = isGrid ? point : void 0;
        }
        this.emit({
            type: 'afterHoverPointChange',
            hoverPoint: isGrid ? void 0 : this.hoverPoint,
            hoverRow: isGrid ? this.hoverRow : void 0,
            detail: eventDetail
        });
    }
    getHoverPoint() {
        return this.hoverPoint;
    }
    getSelection() {
        return this.selection;
    }
    setSelection(selection, reset = false, eventDetail) {
        const axes = Object.keys(selection);
        axes.forEach((axisID) => {
            this.selection[axisID] = selection[axisID];
        });
        this.emit({
            type: 'afterSelectionChange',
            selection: this.selection,
            reset,
            detail: eventDetail
        });
    }
    /**
     * Converts JSON to a presentation state.
     * @internal
     *
     * @param {JSON} json
     * JSON (usually with a $class property) to convert.
     *
     * @return {SharedComponentState}
     * Class instance from the JSON.
     */
    fromJSON(json) {
        const presentationState = new SharedComponentState();
        const { columnOrder, visibilityMap, selection, hoverpoint } = json;
        if (columnOrder) {
            presentationState.setColumnOrder(columnOrder);
        }
        if (visibilityMap) {
            presentationState.setColumnVisibility(visibilityMap);
        }
        if (selection) {
            presentationState.setSelection(selection);
        }
        if (hoverpoint) {
            presentationState.setHoverPoint(hoverpoint);
        }
        return presentationState;
    }
    /**
     * Converts the presentation state to JSON.
     * @internal
     *
     * @return {JSON}
     * JSON of this class instance.
     */
    toJSON() {
        const json = {
            $class: 'Dashboards.SharedComponentState'
        };
        if (this.columnOrder) {
            json.columnOrder = this.columnOrder.slice();
        }
        if (this.hoverPoint) {
            const { x, y, id } = this.hoverPoint;
            json.hoverPoint = { x, y, id };
        }
        if (this.selection) {
            json.selection = this.selection;
        }
        if (this.columnVisibilityMap) {
            json.columnVisibility = this.columnVisibilityMap;
        }
        return json;
    }
}
/* *
 *
 *  Registry
 *
 * */
Serializable.registerClassPrototype('Dashboards.SharedComponentState', SharedComponentState.prototype);
/* *
 *
 *  Default Export
 *
 * */
export default SharedComponentState;
