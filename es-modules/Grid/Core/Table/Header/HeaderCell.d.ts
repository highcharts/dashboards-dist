import type { GroupedHeaderOptions } from '../../Options';
import Cell from '../Cell.js';
import Column from '../Column';
import Row from '../Row';
/**
 * Represents a cell in the data grid header.
 */
declare class HeaderCell extends Cell {
    /**
     * The HTML element of the header cell content.
     */
    headerContent?: HTMLElement;
    /**
     * Reference to options in settings header.
     */
    readonly options: Partial<Column.Options>;
    /**
     * List of columns that are subordinated to the header cell.
     */
    readonly columns: Column[];
    /**
     * Content value of the header cell.
     */
    value: string;
    /**
     * Constructs a cell in the data grid header.
     *
     * @param row
     * The row of the cell.
     *
     * @param column
     * The column of the cell.
     *
     * @param columnsTree
     * If the cell is a wider than one column, this property contains the
     * structure of the columns that are subordinated to the header cell.
     */
    constructor(row: Row, column?: Column, columnsTree?: GroupedHeaderOptions[]);
    /**
     * Init element.
     */
    init(): HTMLTableCellElement;
    /**
     * Render the cell container.
     */
    render(): void;
    reflow(): void;
    protected onKeyDown(e: KeyboardEvent): void;
    protected onClick(e: MouseEvent): void;
    /**
     * Add sorting option to the column.
     */
    private initColumnSorting;
    /**
     * Check if the cell is part of the last cell in the header.
     */
    isLastColumn(): boolean;
}
declare namespace HeaderCell {
}
export default HeaderCell;
