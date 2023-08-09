import type ChainModifierOptions from './ChainModifierOptions';
import type DataEvent from '../DataEvent';
import type DataModifierEvent from './DataModifierEvent';
import DataModifier from './DataModifier.js';
import DataTable from '../DataTable.js';
/**
 * Modifies a table with the help of modifiers in an ordered chain.
 *
 * @private
 */
declare class ChainModifier extends DataModifier {
    /**
     * Default option for the ordered modifier chain.
     */
    static readonly defaultOptions: ChainModifierOptions;
    /**
     * Constructs an instance of the modifier chain.
     *
     * @param {Partial<ChainModifier.Options>} [options]
     * Options to configure the modifier chain.
     *
     * @param {...DataModifier} [chain]
     * Ordered chain of modifiers.
     */
    constructor(options?: Partial<ChainModifierOptions>, ...chain: Array<DataModifier>);
    /**
     * Ordered chain of modifiers.
     */
    readonly chain: Array<DataModifier>;
    /**
     * Options of the modifier chain.
     */
    readonly options: ChainModifierOptions;
    /**
     * Adds a configured modifier to the end of the modifier chain. Please note,
     * that the modifier can be added multiple times.
     *
     * @param {DataModifier} modifier
     * Configured modifier to add.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     */
    add(modifier: DataModifier, eventDetail?: DataEvent.Detail): void;
    /**
     * Clears all modifiers from the chain.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     */
    clear(eventDetail?: DataEvent.Detail): void;
    /**
     * Applies several modifications to the table and returns a modified copy of
     * the given table.
     *
     * @param {Highcharts.DataTable} table
     * Table to modify.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Promise<Highcharts.DataTable>}
     * Table with `modified` property as a reference.
     */
    modify<T extends DataTable>(table: T, eventDetail?: DataEvent.Detail): Promise<T>;
    /**
     * Applies partial modifications of a cell change to the property `modified`
     * of the given modified table.
     *
     * *Note:* The `modified` property of the table gets replaced.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {string} columnName
     * Column name of changed cell.
     *
     * @param {number|undefined} rowIndex
     * Row index of changed cell.
     *
     * @param {Highcharts.DataTableCellType} cellValue
     * Changed cell value.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    modifyCell<T extends DataTable>(table: T, columnName: string, rowIndex: number, cellValue: DataTable.CellType, eventDetail?: DataEvent.Detail): T;
    /**
     * Applies partial modifications of column changes to the property
     * `modified` of the given table.
     *
     * *Note:* The `modified` property of the table gets replaced.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {Highcharts.DataTableColumnCollection} columns
     * Changed columns as a collection, where the keys are the column names.
     *
     * @param {number} [rowIndex=0]
     * Index of the first changed row.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    modifyColumns<T extends DataTable>(table: T, columns: DataTable.ColumnCollection, rowIndex: number, eventDetail?: DataEvent.Detail): T;
    /**
     * Applies partial modifications of row changes to the property `modified`
     * of the given table.
     *
     * *Note:* The `modified` property of the table gets replaced.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
     * Changed rows.
     *
     * @param {number} [rowIndex]
     * Index of the first changed row.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    modifyRows<T extends DataTable>(table: T, rows: Array<(DataTable.Row | DataTable.RowObject)>, rowIndex: number, eventDetail?: DataEvent.Detail): T;
    /**
     * Applies several modifications to the table.
     *
     * *Note:* The `modified` property of the table gets replaced.
     *
     * @param {DataTable} table
     * Table to modify.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {DataTable}
     * Table as a reference.
     *
     * @emits ChainDataModifier#execute
     * @emits ChainDataModifier#afterExecute
     */
    modifyTable<T extends DataTable>(table: T, eventDetail?: DataEvent.Detail): T;
    /**
     * Removes a configured modifier from all positions in the modifier chain.
     *
     * @param {DataModifier} modifier
     * Configured modifier to remove.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     */
    remove(modifier: DataModifier, eventDetail?: DataEvent.Detail): void;
}
/**
 * Additionally provided types for modifier events and options.
 * @private
 */
declare namespace ChainModifier {
    /**
     * Event object
     */
    interface ChainEvent extends DataEvent {
        readonly type: ('clearChain' | 'afterClearChain' | DataModifierEvent['type']);
        readonly table?: DataTable;
    }
    /**
     * Event information.
     */
    type Event = (ChainEvent | ModifierEvent);
    /**
     * Event information for modifier operations.
     */
    interface ModifierEvent extends DataEvent {
        readonly type: ('addModifier' | 'afterAddModifier' | 'removeModifier' | 'afterRemoveModifier');
        readonly modifier: DataModifier;
    }
}
declare module './DataModifierType' {
    interface DataModifierTypes {
        Chain: typeof ChainModifier;
    }
}
export default ChainModifier;
