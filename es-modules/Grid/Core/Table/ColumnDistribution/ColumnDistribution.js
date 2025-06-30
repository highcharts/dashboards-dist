/* *
 *
 *  Column Distribution namespace
 *
 *  (c) 2020-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *
 * */
'use strict';
import DistributionStrategy from './ColumnDistributionStrategy.js';
import MixedDistributionStrategy from './MixedDistributionStrategy.js';
import FixedDistributionStrategy from './FixedDistributionStrategy.js';
import FullDistributionStrategy from './FullDistributionStrategy.js';
import U from '../../../../Core/Utilities.js';
const { defined } = U;
/* *
 *
 *  Namespace
 *
 * */
var ColumnDistribution;
(function (ColumnDistribution) {
    /**
     * Abstract class representing a column distribution strategy.
     */
    ColumnDistribution.AbstractStrategy = DistributionStrategy;
    /**
     * Registry of column distribution strategies.
     */
    ColumnDistribution.types = {
        mixed: MixedDistributionStrategy,
        fixed: FixedDistributionStrategy,
        full: FullDistributionStrategy
    };
    /**
     * Returns the column distribution of the table according to the options:
     * 1. If `columns.resizing.mode` defined, use it. If not:
     * 2. If any column has a width defined, use `mixed`. If not:
     * 3. Use `full`.
     *
     * @param viewport
     * The table that the column distribution strategy is applied to.
     */
    function assumeDistributionType(viewport) {
        const { options } = viewport.grid;
        const colRendering = options?.rendering?.columns;
        const result = colRendering?.resizing?.mode ||
            colRendering?.distribution;
        if (result) {
            return result;
        }
        if (options?.columns?.some((column) => defined(column.width)) || defined(options?.columnDefaults?.width)) {
            return 'mixed';
        }
        return 'full';
    }
    /**
     * Creates a new column distribution strategy instance based on the
     * viewport's options.
     *
     * @param viewport
     * The table that the column distribution strategy is applied to.
     *
     * @returns
     * The proper column distribution strategy.
     */
    function initStrategy(viewport) {
        return new ColumnDistribution.types[assumeDistributionType(viewport)](viewport);
    }
    ColumnDistribution.initStrategy = initStrategy;
})(ColumnDistribution || (ColumnDistribution = {}));
/* *
 *
 *  Default Export
 *
 * */
export default ColumnDistribution;
