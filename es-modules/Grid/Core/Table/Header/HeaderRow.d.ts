import type { GroupedHeaderOptions } from '../../Options';
import Table from '../Table.js';
import Row from '../Row.js';
import HeaderCell from './HeaderCell.js';
import Column from '../Column.js';
/**
 * Represents a row in the data grid header.
 */
declare class HeaderRow extends Row {
    /**
     * The level in the header.
     */
    level: number;
    /**
     * Constructs a row in the data grid.
     *
     * @param viewport
     * The Grid Table instance which the row belongs to.
     *
     * @param level
     * The current level of header that is rendered.
     */
    constructor(viewport: Table, level: number);
    createCell(column?: Column, columnsTree?: GroupedHeaderOptions[]): HeaderCell;
    /**
     * Renders the row's content in the header.
     *
     * @param level
     * The current level in the header tree
     */
    renderMultipleLevel(level: number): void;
    reflow(): void;
    /**
     * Get all headers that should be rendered in a level.
     *
     * @param scope
     * Level that we start from
     *
     * @param targetLevel
     * Max level
     *
     * @param currentLevel
     * Current level
     *
     * @return
     * Array of headers that should be rendered in a level
     */
    private getColumnsAtLevel;
    /**
     * Sets the row HTML element attributes and additional classes.
     */
    setRowAttributes(): void;
}
declare namespace HeaderRow {
}
export default HeaderRow;
