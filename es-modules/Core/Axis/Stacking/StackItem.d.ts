import type { AlignValue, VerticalAlignValue } from '../../Renderer/AlignObject';
import type Axis from '../Axis';
import type BBoxObject from '../../Renderer/BBoxObject';
import type StackingAxis from './StackingAxis';
import type { StackLabelOptions, StackOverflowValue } from './StackingOptions';
import type SVGElement from '../../Renderer/SVG/SVGElement';
import type SVGLabel from '../../Renderer/SVG/SVGLabel';
/**
 * The class for stacks. Each stack, on a specific X value and either negative
 * or positive, has its own stack item.
 * @private
 */
declare class StackItem {
    constructor(axis: StackingAxis, options: StackLabelOptions, negativeValue: boolean, x: number, stackOption?: StackOverflowValue);
    alignOptions: AlignOptions;
    axis: StackingAxis;
    base?: string;
    cumulative: number | null;
    hasValidPoints: boolean;
    isNegative: boolean;
    label?: SVGLabel;
    leftCliff: number;
    options: StackLabelOptions;
    padding?: number;
    points: Record<string, Array<number>>;
    rightCliff: number;
    rotation?: number;
    shadow?: SVGElement;
    shadowGroup?: SVGElement;
    stack?: StackOverflowValue;
    textAlign: AlignValue;
    total: number | null;
    touched?: number;
    x: number;
    /**
     * @private
     */
    destroy(): void;
    /**
     * Renders the stack total label and adds it to the stack label group.
     * @private
     */
    render(group: SVGElement): void;
    /**
     * Sets the offset that the stack has from the x value and repositions the
     * label.
     * @private
     */
    setOffset(xOffset: number, width: number, boxBottom?: number, boxTop?: number, defaultX?: number, xAxis?: Axis): void;
    /**
     * Adjust the stack BBox position, to take into consideration the alignment
     * of the dataLabel. This is necessary to make the stackDataLabel work with
     * core methods like `SVGLabel.adjust` and `Series.justifyDataLabel`.
     * @param AdjustStackPositionProps
     * @return {{x: number, y: number}} Adjusted BBox position of the stack.
     */
    adjustStackPosition({ labelBox, verticalAlign, textAlign }: AdjustStackPositionProps): {
        x: number;
        y: number;
    };
    /**
     * Get the bbox of the stack.
     * @private
     * @function Highcharts.StackItem#getStackBox
     * @return {BBoxObject} The x, y, height, width of the stack.
     */
    getStackBox(stackBoxProps: StackBoxProps): BBoxObject;
}
interface AlignOptions {
    verticalAlign: 'top' | 'middle' | 'bottom';
    align: 'left' | 'center' | 'right';
    x?: number;
    y?: number;
}
export interface StackBoxProps {
    xOffset: number;
    width: number;
    boxBottom?: number;
    boxTop?: number;
    defaultX?: number;
    xAxis?: Axis;
}
export interface AdjustStackPositionProps {
    labelBox: BBoxObject;
    verticalAlign: VerticalAlignValue;
    textAlign: AlignValue;
}
export default StackItem;
