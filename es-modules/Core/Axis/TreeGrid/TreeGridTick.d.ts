import type SVGElement from '../../Renderer/SVG/SVGElement';
import type Tick from '../Tick';
import type { TreeGridAxisComposition } from './TreeGridAxis';
import type { TreeGridAxisOptions } from './TreeGridOptions';
export interface TreeGridTick extends Tick {
    axis: TreeGridAxisComposition;
    options: TreeGridAxisOptions;
    treeGrid: TreeGridTickAdditions;
}
/**
 * @private
 * @class
 */
declare class TreeGridTickAdditions {
    /**
     * @private
     */
    static compose(TickClass: typeof Tick): void;
    /**
     * @private
     */
    constructor(tick: TreeGridTick);
    tick: TreeGridTick;
    labelIcon?: SVGElement;
    /**
     * Collapse the grid cell. Used when axis is of type treegrid.
     *
     * @see gantt/treegrid-axis/collapsed-dynamically/demo.js
     *
     * @private
     * @function Highcharts.Tick#collapse
     *
     * @param {boolean} [redraw=true]
     * Whether to redraw the chart or wait for an explicit call to
     * {@link Highcharts.Chart#redraw}
     */
    collapse(redraw?: boolean): void;
    /**
     * Destroy remaining labelIcon if exist.
     *
     * @private
     * @function Highcharts.Tick#destroy
     */
    destroy(): void;
    /**
     * Expand the grid cell. Used when axis is of type treegrid.
     *
     * @see gantt/treegrid-axis/collapsed-dynamically/demo.js
     *
     * @private
     * @function Highcharts.Tick#expand
     *
     * @param {boolean} [redraw=true]
     * Whether to redraw the chart or wait for an explicit call to
     * {@link Highcharts.Chart#redraw}
     */
    expand(redraw?: boolean): void;
    /**
     * Toggle the collapse/expand state of the grid cell. Used when axis is
     * of type treegrid.
     *
     * @see gantt/treegrid-axis/collapsed-dynamically/demo.js
     *
     * @private
     * @function Highcharts.Tick#toggleCollapse
     *
     * @param {boolean} [redraw=true]
     * Whether to redraw the chart or wait for an explicit call to
     * {@link Highcharts.Chart#redraw}
     */
    toggleCollapse(redraw?: boolean): void;
}
export default TreeGridTickAdditions;
