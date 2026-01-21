import type { AnyRecord } from '../../Shared/Types';
import Serializable from '../Serializable.js';
import type { JSON as SerializableJSON } from '../Serializable';
/**
 * Contains presentation information like column order, usually in relation to a
 * table instance.
 */
declare class SharedComponentState implements Serializable<SharedComponentState, JSON> {
    /**
     * Sorted array of column names.
     */
    private columnOrder?;
    private columnVisibilityMap;
    private hiddenRowIndexes;
    private hoverPoint?;
    private hoverRow?;
    private selection;
    /**
     * Whether the state has been changed since initialization.
     */
    protected isModified?: boolean;
    /**
     * Emits an event on this table to all registered callbacks of the given
     * event.
     *
     * @param {Event} e
     * Event object with event information.
     */
    emit(e: Event): void;
    /**
     * Returns an ordered array of column names.
     *
     * @return {Array<string>}
     * Array of column names in order.
     */
    getColumnOrder(): Array<string>;
    getColumnVisibility(columnId: string): boolean | undefined;
    /**
     * Returns a function for `Array.sort` to change the order of an array of
     * column names. Unknown column names come last.
     *
     * @return {ColumnOrderCallback}
     * Sort function to change the order.
     */
    getColumnSorter(): ColumnOrderCallback;
    /**
     * @return {boolean}
     * Returns true, if the state was changed since initialization.
     */
    isSet(): boolean;
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
    on(type: Event['type'], callback: (this: this, e: Event) => void): Function;
    /**
     * Sets the order of the columns in place.
     *
     * @param {Array<string>} columnOrder
     * Array of column names in order.
     *
     * @param {AnyRecord} [eventDetail]
     * Custom information for pending events.
     */
    setColumnOrder(columnOrder: Array<string>, eventDetail?: AnyRecord): void;
    setColumnVisibility(columnVisibility: Record<string, boolean>, eventDetail?: {}): void;
    setHiddenRows(rowIndexes: number[], hidden?: boolean): void;
    getHiddenRows(): number[];
    setHoverPoint(point?: PresentationHoverPointType | HTMLElement, eventDetail?: HoverPointEventDetails): void;
    getHoverPoint(): (PresentationHoverPointType | undefined);
    getSelection(): SelectionObjectType;
    setSelection(selection: SelectionObjectType, reset?: boolean, eventDetail?: {}): void;
}
/**
 * Additionally provided types for events and JSON conversion.
 */
/**
 * Event types related to the column order.
 */
export type ColumnOrderEventType = ('columnOrderChange' | 'afterColumnOrderChange');
export type ColumnVisibilityEventType = ('columnVisibilityChange' | 'afterColumnVisibilityChange');
export type HoverPointEventType = ('hoverPointChange' | 'afterHoverPointChange');
export type selectionEventType = ('selectionChange' | 'afterSelectionChange');
export type eventTypes = (selectionEventType | HoverPointEventType | ColumnVisibilityEventType);
/**
 * Function to sort an array of column names.
 */
export interface ColumnOrderCallback {
    (a: string, b: string): number;
}
export interface HoverPointEventDetails {
    detail?: AnyRecord;
    isGrid?: boolean;
    sender?: string;
}
/**
 * All information objects of DataPresentationState events.
 */
export type Event = (ColumnOrderEvent | ColumnVisibilityEvent | PointHoverEvent | SelectionEvent | HiddenRowEvent);
/**
 * Describes the information object for order-related events.
 */
export interface ColumnOrderEvent {
    type: ColumnOrderEventType;
    detail?: AnyRecord;
    newColumnOrder: Array<string>;
    oldColumnOrder: Array<string>;
}
export interface ColumnVisibilityEvent {
    type: ColumnVisibilityEventType;
    detail?: AnyRecord;
    visibilityMap: Record<string, boolean>;
}
export interface HiddenRowEvent {
    type: ('afterSetHiddenRows');
    detail?: AnyRecord;
    hiddenRows: number[];
}
export interface PointHoverEvent {
    type: HoverPointEventType;
    detail?: AnyRecord;
    hoverPoint?: PresentationHoverPointType;
    hoverRow?: HTMLElement;
}
export type ColumnVisibilityType = Record<string, boolean>;
export type SelectionObjectType = Record<string, {
    columnId?: string;
    min?: number;
    max?: number;
}>;
export type PresentationHoverPointType = Partial<AnyRecord>;
export interface SelectionEvent {
    type: selectionEventType;
    detail?: AnyRecord;
    reset: boolean;
    selection: Record<string, {
        min?: number | undefined;
        max?: number | undefined;
    }>;
}
/**
 * Describes the class JSON of a presentation state.
 */
export interface JSON extends SerializableJSON<'Dashboards.SharedComponentState'> {
    columnOrder?: Array<string>;
    visibilityMap?: ColumnVisibilityType;
    hoverpoint?: {
        x: number;
        y: number;
        id: string;
    };
    selection?: SelectionObjectType;
}
export default SharedComponentState;
