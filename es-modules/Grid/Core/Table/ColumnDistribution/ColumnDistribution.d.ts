import type Table from '../Table';
import DistributionStrategy from './ColumnDistributionStrategy.js';
import MixedDistributionStrategy from './MixedDistributionStrategy.js';
import FixedDistributionStrategy from './FixedDistributionStrategy.js';
import FullDistributionStrategy from './FullDistributionStrategy.js';
declare namespace ColumnDistribution {
    /**
     * Abstract class representing a column distribution strategy.
     */
    const AbstractStrategy: typeof DistributionStrategy;
    /**
     * Registry of column distribution strategies.
     */
    const types: {
        mixed: typeof MixedDistributionStrategy;
        fixed: typeof FixedDistributionStrategy;
        full: typeof FullDistributionStrategy;
    };
    type StrategyType = keyof typeof types;
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
    function initStrategy(viewport: Table): DistributionStrategy;
}
export default ColumnDistribution;
