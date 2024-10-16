import type { CreditsOptions } from './Options';
import type DataGrid from './DataGrid';
/**
 * Represents a credits in the data grid.
 */
declare class Credits {
    /**
     * The Data Grid Table instance which the credits belong to.
     */
    dataGrid: DataGrid;
    /**
     * The credits container HTML element.
     */
    containerElement: HTMLElement;
    /**
     * The credits content HTML element.
     */
    textElement: HTMLElement;
    /**
     * The options for the credits.
     */
    options: CreditsOptions;
    /**
     * Construct the credits.
     *
     * @param dataGrid
     * The Data Grid Table instance which the credits belong to.
     */
    constructor(dataGrid: DataGrid);
    /**
     * Set the content of the credits.
     */
    private setContent;
    /**
     * Append the credits to the container. The position of the credits is
     * determined by the `position` option.
     */
    private appendToContainer;
    /**
     * Update the credits with new options.
     *
     * @param options
     * The new options for the credits.
     *
     * @param render
     * Whether to render the credits after the update.
     */
    update(options: Partial<CreditsOptions> | undefined, render?: boolean): void;
    /**
     * Render the credits. If the credits are disabled, they will be removed
     * from the container. If also reflows the viewport dimensions.
     */
    render(): void;
    /**
     * Get the height of the credits container.
     */
    getHeight(): number;
    /**
     * Destroy the credits. The credits will be removed from the container and
     * the reference to the credits will be deleted from the DataGrid instance
     * it belongs to.
     */
    destroy(): void;
}
declare namespace Credits {
}
export default Credits;
