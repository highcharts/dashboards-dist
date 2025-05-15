import type { IndividualColumnOptions } from '../Options';
import type Cell from './Cell';
import type HeaderCell from './Header/HeaderCell';
import Table from './Table.js';
import DataTable from '../../../Data/DataTable.js';
import ColumnSorting from './Actions/ColumnSorting';
/**
 * Represents a column in the data grid.
 */
declare class Column {
    /**
     * The viewport (table) the column belongs to.
     */
    readonly viewport: Table;
    /**
     * The cells of the column.
     */
    cells: Cell[];
    /**
     * The id of the column (`name` in the Data Table).
     */
    id: string;
    /**
     * The data of the column.
     */
    data?: DataTable.Column;
    /**
     * The options of the column.
     */
    readonly options: Column.Options;
    /**
     * The index of the column in the viewport.
     */
    readonly index: number;
    /**
     * The wrapper for content of head.
     */
    header?: HeaderCell;
    /**
     * Sorting column module.
     */
    sorting?: ColumnSorting;
    /**
     * Constructs a column in the data grid.
     *
     * @param viewport
     * The viewport (table) the column belongs to.
     *
     * @param id
     * The id of the column (`name` in the Data Table).
     *
     * @param index
     * The index of the column.
     */
    constructor(viewport: Table, id: string, index: number);
    /**
     * Loads the data of the column from the viewport's data table.
     */
    loadData(): void;
    /**
     * Registers a cell in the column.
     *
     * @param cell
     * The cell to register.
     */
    registerCell(cell: Cell): void;
    /**
     * Unregister a cell from the column.
     *
     * @param cell
     * The cell to unregister.
     */
    unregisterCell(cell: Cell): void;
    /**
     * Returns the width of the column in pixels.
     */
    getWidth(): number;
    /**
     * Adds or removes the hovered CSS class to the column element
     * and its cells.
     *
     * @param hovered
     * Whether the column should be hovered.
     */
    setHoveredState(hovered: boolean): void;
    /**
     * Adds or removes the synced CSS class to the column element
     * and its cells.
     *
     * @param synced
     * Whether the column should have synced state.
     */
    setSyncedState(synced: boolean): void;
    /**
     * Returns the formatted string where the templating context is the column.
     *
     * @param template
     * The template string.
     *
     * @return
     * The formatted string.
     */
    format(template: string): string;
}
declare namespace Column {
    type Options = Omit<IndividualColumnOptions, 'id'>;
}
export default Column;
