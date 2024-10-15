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
    options: Partial<Column.Options>;
    /**
     * Columns that are grouped in the header cell. In most cases is contains
     * only one column, but can be more if the header cell is grouped.
     */
    columns?: GroupedHeaderOptions[];
    /**
     * Whether the cell is a main column cell in the header.
     */
    private isMain;
    /**
     * Content value of the header cell.
     */
    value: string;
    /**
     * Constructs a cell in the data grid header.
     *
     * @param column
     * The column of the cell.
     *
     * @param row
     * The row of the cell.
     */
    constructor(column: Column, row: Row);
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
}
declare namespace HeaderCell {
}
export default HeaderCell;
