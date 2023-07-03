import type { AxisBreakOptions } from '../AxisOptions';
import type Chart from '../../Chart/Chart';
import type GanttSeries from '../../../Series/Gantt/GanttSeries';
import type { PointOptions } from '../../Series/PointOptions';
import type Series from '../../Series/Series';
import type { TreeGridAxisLabelOptions, TreeGridAxisOptions } from './TreeGridOptions';
import type Axis from '../Axis.js';
import type Tick from '../Tick.js';
import Tree from '../../../Gantt/Tree.js';
declare module '../AxisComposition' {
    interface AxisComposition {
        treeGrid?: TreeGridAxisComposition['treeGrid'];
    }
}
declare module '../AxisLike' {
    interface AxisLike {
        utils: TreeGridAxisUtilsObject;
    }
}
declare module '../AxisType' {
    interface AxisTypeRegistry {
        TreeGridAxis: TreeGridAxisComposition;
    }
}
declare module '../../Series/PointOptions' {
    interface PointOptions extends Highcharts.TreePointOptionsObject {
        collapsed?: boolean;
        seriesIndex?: number;
    }
}
interface GridNode {
    children: Array<GridNode>;
    collapsed?: boolean;
    collapseEnd?: number;
    collapseStart?: number;
    depth: number;
    descendants?: number;
    id?: string;
    height?: number;
    name: string;
    nodes: [TreeGridNode];
    pos: number;
    tickmarkOffset?: number;
}
export declare class TreeGridAxisComposition extends Axis {
    dataMax: number;
    dataMin: number;
    max: number;
    min: number;
    options: TreeGridAxisOptions;
    series: Array<GanttSeries>;
    treeGrid: TreeGridAxisAdditions;
}
interface TreeGridAxisUtilsObject {
    getNode: typeof Tree['getNode'];
}
interface TreeGridNode extends Highcharts.TreeNode {
    data: PointOptions;
    pos: number;
    seriesIndex: number;
}
/**
 * @private
 * @class
 */
declare class TreeGridAxisAdditions {
    /**
     * @private
     */
    static compose<T extends typeof Axis>(AxisClass: T, ChartClass: typeof Chart, SeriesClass: typeof Series, TickClass: typeof Tick): (T & typeof TreeGridAxisComposition);
    /**
     * @private
     */
    constructor(axis: TreeGridAxisComposition);
    axis: TreeGridAxisComposition;
    mapOfPosToGridNode?: Record<string, GridNode>;
    mapOptionsToLevel?: Record<string, TreeGridAxisLabelOptions>;
    tree?: Highcharts.TreeNode;
    collapsedNodes?: GridNode[];
    /**
     * Set the collapse status.
     *
     * @private
     *
     * @param {Highcharts.Axis} axis
     * The axis to check against.
     *
     * @param {Highcharts.GridNode} node
     * The node to collapse.
     */
    setCollapsedStatus(node: GridNode): void;
    /**
     * Calculates the new axis breaks to collapse a node.
     *
     * @private
     *
     * @param {Highcharts.Axis} axis
     * The axis to check against.
     *
     * @param {Highcharts.GridNode} node
     * The node to collapse.
     *
     * @param {number} pos
     * The tick position to collapse.
     *
     * @return {Array<object>}
     * Returns an array of the new breaks for the axis.
     */
    collapse(node: GridNode): Array<AxisBreakOptions>;
    /**
     * Calculates the new axis breaks to expand a node.
     *
     * @private
     *
     * @param {Highcharts.Axis} axis
     * The axis to check against.
     *
     * @param {Highcharts.GridNode} node
     * The node to expand.
     *
     * @param {number} pos
     * The tick position to expand.
     *
     * @return {Array<object>}
     * Returns an array of the new breaks for the axis.
     */
    expand(node: GridNode): Array<AxisBreakOptions>;
    /**
     * Creates a list of positions for the ticks on the axis. Filters out
     * positions that are outside min and max, or is inside an axis break.
     *
     * @private
     *
     * @return {Array<number>}
     * List of positions.
     */
    getTickPositions(): Array<number>;
    /**
     * Check if a node is collapsed.
     *
     * @private
     *
     * @param {Highcharts.Axis} axis
     * The axis to check against.
     *
     * @param {Object} node
     * The node to check if is collapsed.
     *
     * @param {number} pos
     * The tick position to collapse.
     *
     * @return {boolean}
     * Returns true if collapsed, false if expanded.
     */
    isCollapsed(node: GridNode): boolean;
    /**
     * Calculates the new axis breaks after toggling the collapse/expand
     * state of a node. If it is collapsed it will be expanded, and if it is
     * exapended it will be collapsed.
     *
     * @private
     *
     * @param {Highcharts.Axis} axis
     * The axis to check against.
     *
     * @param {Highcharts.GridNode} node
     * The node to toggle.
     *
     * @return {Array<object>}
     * Returns an array of the new breaks for the axis.
     */
    toggleCollapse(node: GridNode): Array<AxisBreakOptions>;
}
export default TreeGridAxisAdditions;
