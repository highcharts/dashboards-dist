import type Chart from '../../Chart/Chart';
import type Series from '../../Series/Series';
import type { StackOverflowValue } from './StackingOptions';
import type SVGElement from '../../Renderer/SVG/SVGElement';
import Axis from '../Axis.js';
import StackItem from './StackItem.js';
declare module '../AxisComposition' {
    interface AxisComposition {
        stacking?: AxisAdditions;
    }
}
declare module '../../Chart/ChartLike' {
    interface ChartLike {
        getStacks(): void;
    }
}
declare module '../../Series/PointLike' {
    interface PointLike {
        leftCliff?: number;
        rightCliff?: number;
    }
}
declare module '../../Series/SeriesLike' {
    interface SeriesLike {
        isRadialBar?: boolean;
        negStacks?: boolean;
        singleStacks?: false;
        stack?: StackOverflowValue;
        stackedYData?: (Array<number> | Array<Array<number>>);
        stackKey?: string;
        getStackIndicator(stackIndicator: (StackItemIndicatorObject | undefined), x: number, index: number, key?: string): StackItemIndicatorObject;
        modifyStacks(): void;
        percentStacker(pointExtremes: Array<number>, stack: StackItem, i: number): void;
        setGroupedPoints(): void;
        setStackedPoints(stackingParam?: string): void;
    }
}
export interface StackItemIndicatorObject {
    index: number;
    key?: string;
    stackKey?: string;
    x: number;
}
declare class StackingAxis extends Axis {
    stacking: AxisAdditions;
}
/**
 * Adds stacking support to axes.
 * @private
 * @class
 */
declare class AxisAdditions {
    constructor(axis: StackingAxis);
    axis: StackingAxis;
    oldStacks: Record<string, Record<string, StackItem>>;
    stacks: Record<string, Record<string, StackItem>>;
    stacksTouched: number;
    stackTotalGroup?: SVGElement;
    usePercentage?: boolean;
    /**
     * Build the stacks from top down
     * @private
     */
    buildStacks(): void;
    /**
     * @private
     */
    cleanStacks(): void;
    /**
     * Set all the stacks to initial states and destroy unused ones.
     * @private
     */
    resetStacks(): void;
    /**
     * @private
     */
    renderStackTotals(): void;
}
declare namespace StackingAxis {
    /**
     * Extends axis with stacking support.
     * @private
     */
    function compose(AxisClass: typeof Axis, ChartClass: typeof Chart, SeriesClass: typeof Series): void;
}
declare module '../AxisType' {
    interface AxisTypeRegistry {
        StackingAxis: StackingAxis;
    }
}
export default StackingAxis;
