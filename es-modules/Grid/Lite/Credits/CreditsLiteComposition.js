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
 *  - Sebastian Bochan
 *
 * */
import Globals from '../../../Core/Globals.js';
import Credits from '../../Core/Credits.js';
import U from '../../../Core/Utilities.js';
const { addEvent, pushUnique } = U;
var CreditsLiteComposition;
(function (CreditsLiteComposition) {
    let creditsObserver;
    /**
     * Extends the grid classes with credits.
     *
     * @param GridClass
     * The class to extend.
     *
     * @param TableClass
     * The class to extend.
     *
     */
    function compose(GridClass, TableClass) {
        if (!pushUnique(Globals.composed, 'CreditsLite')) {
            return;
        }
        addEvent(GridClass, 'afterRenderViewport', initCredits);
        addEvent(TableClass, 'afterDestroy', destroyCredits);
    }
    CreditsLiteComposition.compose = compose;
    /**
     * Callback function called before table initialization.
     */
    function initCredits() {
        const credits = new Credits(this);
        const containerStyle = credits.containerElement.style;
        // Apply static styles
        containerStyle.setProperty('display', 'inline-block', 'important');
        containerStyle.setProperty('padding', '5px 5px 0px 5px', 'important');
        containerStyle.setProperty('text-align', 'right', 'important');
        // Create an observer that check credits modifications
        creditsObserver = new MutationObserver(() => {
            if (!credits.containerElement.querySelector('.hcg-logo-wrapper')) {
                credits.render();
            }
        });
        // Start observing the credits
        creditsObserver.observe(credits.containerElement, {
            attributes: true,
            childList: true,
            subtree: true
        });
        return credits;
    }
    /**
     * Callback function called after credits destroy.
     */
    function destroyCredits() {
        creditsObserver.disconnect();
    }
})(CreditsLiteComposition || (CreditsLiteComposition = {}));
export default CreditsLiteComposition;
