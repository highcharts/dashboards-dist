/* *
 *
 *  Grid Credits class
 *
 *  (c) 2020-2025 Highsoft AS
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
import Globals from './Globals.js';
import GridUtils from './GridUtils.js';
const { makeHTMLElement, setHTMLContent } = GridUtils;
/* *
 *
 *  Class
 *
 * */
/**
 * Represents a credits in the grid.
 */
class Credits {
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Construct the credits.
     *
     * @param grid
     * The Grid instance which the credits belong to.
     *
     * @param options
     * Options for the credits label. Predefined if not provided.
     *
     */
    constructor(grid, options) {
        this.grid = grid;
        this.containerElement = makeHTMLElement('div', {
            className: Globals.getClassName('creditsContainer')
        });
        this.textElement = this.renderAnchor();
        this.options = options ?? Credits.defaultOptions;
        this.render();
    }
    /* *
    *
    *  Methods
    *
    * */
    /**
     * Render the credits. If the credits are disabled, they will be removed
     * from the container.
     */
    render() {
        const grid = this.grid;
        const contentWrapper = grid.contentWrapper;
        const { text, href } = this.options;
        this.containerElement.remove();
        if (!this.textElement) {
            this.textElement = this.renderAnchor();
        }
        if (text && href) {
            setHTMLContent(this.textElement, text);
            this.textElement.setAttribute('href', href || '');
        }
        if (grid.descriptionElement) {
            contentWrapper?.insertBefore(this.containerElement, grid.descriptionElement);
        }
        else {
            contentWrapper?.appendChild(this.containerElement);
        }
    }
    renderAnchor() {
        const anchorElement = makeHTMLElement('a', {
            className: Globals.getClassName('creditsText')
        }, this.containerElement);
        anchorElement.setAttribute('target', '_blank');
        return anchorElement;
    }
    /**
     * Get the height of the credits container.
     */
    getHeight() {
        return this.containerElement.offsetHeight;
    }
    /**
     * Destroy the credits. The credits will be removed from the container and
     * the reference to the credits will be deleted from the Grid instance
     * it belongs to.
     */
    destroy() {
        this.containerElement.remove();
    }
}
/* *
*
*  Static Properties
*
* */
/**
 * Default options of the credits.
 */
Credits.defaultOptions = {
    enabled: true,
    // eslint-disable-next-line no-console
    text: `<picture class="hcg-logo-wrapper">
            <source srcset="https://assets.highcharts.com/grid/logo_darkx2.png 2x, https://assets.highcharts.com/grid/logo_dark.png 1x" media="(prefers-color-scheme: dark)">
            <img src="https://assets.highcharts.com/grid/logo_light.png" srcset="https://assets.highcharts.com/grid/logo_lightx2.png 2x, https://assets.highcharts.com/grid/logo_light.png 1x" alt="Highcharts logo" style="height: 20px !important; width: auto !important; display: inline-block !important;">
        </picture>`,
    href: 'https://www.highcharts.com',
    position: 'bottom'
};
/* *
 *
 *  Default Export
 *
 * */
export default Credits;
