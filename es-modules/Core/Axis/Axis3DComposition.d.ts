import type Axis from './Axis';
import type { OptionsPosition3dValue } from '../Options';
import type Position3DObject from '../Renderer/Position3DObject';
import type RadialAxis from './RadialAxis';
import type Tick from './Tick.js';
declare module './AxisComposition' {
    interface AxisComposition {
        axis3D?: Axis3DAdditions;
    }
}
declare module './AxisOptions' {
    interface AxisLabelOptions {
        position3d?: OptionsPosition3dValue;
        skew3d?: boolean;
    }
    interface AxisTitleOptions {
        position3d?: ('chart' | 'flap' | 'offset' | 'ortho' | null);
        skew3d?: (boolean | null);
    }
}
declare module '../Renderer/Position3DObject' {
    interface Position3DObject {
        matrix?: Array<number>;
    }
}
declare module '../Series/PointLike' {
    interface PointLike {
        crosshairPos?: number;
        axisXpos?: number;
        axisYpos?: number;
        axisZpos?: number;
    }
}
/**
 * Axis instance with 3D support.
 * @private
 */
export declare class Axis3DComposition extends RadialAxis.AxisComposition {
    axis3D: Axis3DAdditions;
}
/**
 * Adds 3D support to axes.
 * @private
 * @class
 */
declare class Axis3DAdditions {
    /**
     * Extends axis class with 3D support.
     * @private
     */
    static compose(AxisClass: typeof Axis, TickClass: typeof Tick): void;
    /**
     * @private
     */
    constructor(axis: Axis3DComposition);
    axis: Axis3DComposition;
    /**
     * @private
     * @param {Highcharts.Axis} axis
     * Related axis.
     * @param {Highcharts.Position3DObject} pos
     * Position to fix.
     * @param {boolean} [isTitle]
     * Whether this is a title position.
     * @return {Highcharts.Position3DObject}
     * Fixed position.
     */
    fix3dPosition(pos: Position3DObject, isTitle?: boolean): Position3DObject;
    /**
     * @private
     */
    swapZ(p: Position3DObject, insidePlotArea?: boolean): Position3DObject;
}
export default Axis3DAdditions;
