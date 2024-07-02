import type CellHTML from '../../Layout/CellHTML';
import EditMode from '../EditMode.js';
import Cell from '../../Layout/Cell.js';
import MenuItem from '../Menu/MenuItem.js';
import EditToolbar from './EditToolbar.js';
/**
 * @internal
 */
declare class CellEditToolbar extends EditToolbar {
    protected static readonly defaultOptions: CellEditToolbar.Options;
    static getItemsConfig(options: EditMode.Options, iconURLPrefix: string): MenuItem.Options[];
    constructor(editMode: EditMode);
    cell?: Cell | CellHTML;
    editedCell?: Cell | CellHTML;
    /**
     * Show toolbar for given cell.
     *
     * @param cell
     * Cell to show toolbar for.
     */
    showToolbar(cell: Cell | CellHTML): void;
    refreshOutline(): void;
    /**
     * When options icon is clicked, show sidebar with options.
     */
    onCellOptions(): void;
    onCellDestroy(): void;
    resetEditedCell(): void;
    /**
     * Filter options available in custom HTML mode, only settings available.
     */
    private filterOptionsAvailableInCustomHTMLMode;
    /**
     * Highlight cell and gray out the rest of the dashboard.
     */
    private highlightCell;
}
declare namespace CellEditToolbar {
    interface Options extends EditToolbar.Options {
    }
}
export default CellEditToolbar;
