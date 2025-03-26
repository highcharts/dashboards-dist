import Column from '../Column.js';
import Table from '../Table.js';
import HeaderRow from './HeaderRow.js';
/**
 * Represents a table header row containing the cells (headers) with
 * column names.
 */
declare class TableHeader {
    /**
     * The visible columns of the table.
     */
    columns: Column[];
    /**
     * The container of the table head.
     */
    rows: HeaderRow[];
    /**
     * The viewport (table) the table head belongs to.
     */
    viewport: Table;
    /**
     * Amount of levels in the header, that is used in creating correct rows.
     */
    levels: number;
    /**
     * Constructs a new table head.
     *
     * @param viewport
     * The viewport (table) the table head belongs to.
     */
    constructor(viewport: Table);
    /**
     * Renders the table head content.
     */
    render(): void;
    /**
     * Reflows the table head's content dimensions.
     */
    reflow(): void;
    /**
     * Returns amount of rows for the current cell in header tree.
     *
     * @param scope
     * Structure of header
     *
     * @returns
     */
    private getRowLevels;
    /**
     * Scrolls the table head horizontally, only when the virtualization
     * is enabled.
     *
     * @param scrollLeft
     * The left scroll position.
     */
    scrollHorizontally(scrollLeft: number): void;
}
declare namespace TableHeader {
}
export default TableHeader;
