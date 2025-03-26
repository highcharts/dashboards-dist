import type Grid from '../../Core/Grid';
import Table from '../../Core/Table/Table';
declare namespace CreditsLiteComposition {
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
    function compose(GridClass: typeof Grid, TableClass: typeof Table): void;
}
export default CreditsLiteComposition;
