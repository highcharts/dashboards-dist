import type { CreditsOptions } from '../../Core/Options';
import Credits from '../../Core/Credits.js';
/**
 * Represents a credits in the data grid.
 */
declare class CreditsPro extends Credits {
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
    destroy(): void;
}
declare namespace CreditsPro {
}
export default CreditsPro;
