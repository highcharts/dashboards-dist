import type Grid from '../../Core/Grid';
import CreditsPro from './CreditsPro.js';
declare namespace CreditsProComposition {
    /**
     * Extends the grid classes with customizable credits.
     *
     * @param GridClass
     * The class to extend.
     *
     */
    function compose(GridClass: typeof Grid): void;
}
declare module '../../Core/Options' {
    interface Options {
        /**
         * Options for the credits label.
         *
         * Try it: {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/grid-pro/credits | Credits options}
         */
        credits?: CreditsOptions;
    }
}
declare module '../../Core/Grid' {
    export default interface Grid {
        credits?: CreditsPro;
    }
}
export default CreditsProComposition;
