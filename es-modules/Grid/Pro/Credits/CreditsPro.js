/* *
 *
 *  Grid Credits class
 *
 *  (c) 2020-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *  - Sebastian Bochan
 *
 * */
'use strict';
import Globals from '../../Core/Globals.js';
import Credits from '../../Core/Credits.js';
/* *
 *
 *  Class
 *
 * */
/**
 * Represents a credits in the data grid.
 */
class CreditsPro extends Credits {
    /* *
    *
    *  Methods
    *
    * */
    /**
     * Set the content of the credits.
     */
    setContent() {
        const { text, href } = this.options;
        this.textElement.innerHTML = text || '';
        this.textElement.setAttribute('href', href || '');
    }
    /**
     * Append the credits to the container. The position of the credits is
     * determined by the `position` option.
     */
    appendToContainer() {
        const grid = this.grid;
        const contentWrapper = grid.contentWrapper;
        const { position } = this.options;
        if (position === 'top') {
            // Append the credits to the top of the table.
            contentWrapper?.prepend(this.containerElement);
            return;
        }
        // Append the credits to the bottom of the table.
        if (grid.descriptionElement) {
            contentWrapper?.insertBefore(this.containerElement, grid.descriptionElement);
        }
        else {
            contentWrapper?.appendChild(this.containerElement);
        }
        // Apply grid-pro class
        this.containerElement.classList.add(Globals.getClassName('creditsPro'));
    }
    /**
     * Update the credits with new options.
     *
     * @param options
     * The new options for the credits.
     *
     * @param render
     * Whether to render the credits after the update.
     */
    update(options, render = true) {
        if (options) {
            this.grid.update({
                credits: options
            }, false);
            this.options = this.grid.options?.credits ?? {};
        }
        if (render) {
            this.render();
        }
    }
    /**
     * Render the credits. If the credits are disabled, they will be removed
     * from the container. If also reflows the viewport dimensions.
     */
    render() {
        const enabled = this.options.enabled ?? false;
        this.containerElement.remove();
        if (enabled) {
            this.setContent();
            this.appendToContainer();
        }
        else {
            this.destroy();
        }
        this.grid.viewport?.reflow();
    }
    destroy() {
        super.destroy();
        delete this.grid.credits;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default CreditsPro;
