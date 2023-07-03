import type AlignObject from '../Renderer/AlignObject';
import type BBoxObject from '../Renderer/BBoxObject';
import type ColorString from '../Color/ColorString';
import type ColumnPoint from '../../Series/Column/ColumnPoint';
import type DataLabelOptions from './DataLabelOptions';
import type Point from './Point';
import type Series from './Series';
import type SVGAttributes from '../Renderer/SVG/SVGAttributes';
import type SVGElement from '../Renderer/SVG/SVGElement';
import type SVGLabel from '../Renderer/SVG/SVGLabel';
import type AnimationOptions from '../Animation/AnimationOptions';
import R from '../Renderer/RendererUtilities.js';
declare module './PointLike' {
    interface PointLike {
        bottom?: number;
        connector?: SVGElement;
        connectors?: Array<SVGElement>;
        contrastColor?: ColorString;
        dataLabel?: SVGElement | SVGLabel;
        dataLabelOnNull?: boolean;
        dataLabelPath?: SVGElement;
        dataLabels?: Array<SVGElement>;
        distributeBox?: R.BoxObject;
        dlBox?: BBoxObject;
        dlOptions?: DataLabelOptions;
        /** @deprecated */
        positionIndex?: unknown;
        top?: number;
        getDataLabelPath(dataLabel: SVGElement): SVGElement;
    }
}
declare module './PointOptions' {
    interface PointOptions {
        dataLabels?: (DataLabelOptions | Array<DataLabelOptions>);
        labelrank?: number;
    }
}
declare module './SeriesLike' {
    interface SeriesLike {
        _hasPointLabels?: boolean;
        dataLabelsGroup?: SVGElement;
        dataLabelPositioners?: DataLabel.PositionersObject;
        initDataLabelsGroup(): SVGElement;
        initDataLabels(animationConfig?: Partial<AnimationOptions>): SVGElement;
        alignDataLabel(point: Point, dataLabel: SVGElement, options: DataLabelOptions, alignTo: BBoxObject | undefined, isNew?: boolean): void;
        drawDataLabels(points?: Array<Point>): void;
        justifyDataLabel(dataLabel: SVGElement, options: DataLabelOptions, alignAttr: SVGAttributes, bBox: BBoxObject, alignTo?: BBoxObject, isNew?: boolean): (boolean | undefined);
        placeDataLabels?(): void;
        setDataLabelStartPos(point: ColumnPoint, dataLabel: SVGElement, isNew: boolean | undefined, isInside: boolean, alignOptions: AlignObject): void;
        verifyDataLabelOverflow?(overflow: Array<number>): boolean;
    }
}
declare module './SeriesOptions' {
    interface SeriesOptions {
        dataLabels?: (DataLabelOptions | Array<DataLabelOptions>);
    }
}
declare namespace DataLabel {
    interface PositionersObject {
        alignToConnectors(points: Array<Point>, half: boolean, plotWidth: number, plotLeft: number): number;
        alignToPlotEdges(dataLabel: SVGElement, half: boolean, plotWidth: number, plotLeft: number): number;
        justify(point: Point, radius: number, seriesCenter: Array<number>): number;
        radialDistributionX(series: Series, point: Point, y: number, naturalY: number): number;
        radialDistributionY(point: Point): number;
    }
    /**
     * @private
     */
    function compose(SeriesClass: typeof Series): void;
}
export default DataLabel;
