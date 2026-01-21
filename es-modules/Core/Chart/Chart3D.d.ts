import type ColorType from '../Color/ColorType';
declare module '../Chart/ChartBase' {
    interface ChartBase {
        is3d(): boolean;
    }
}
declare module '../Chart/ChartOptions' {
    interface ChartOptions {
        /**
         * Options to render charts in 3 dimensions. This feature requires
         * `highcharts-3d.js`, found in the download package or online at
         * [code.highcharts.com/highcharts-3d.js](https://code.highcharts.com/highcharts-3d.js).
         *
         * @since    4.0
         * @product  highcharts
         * @requires highcharts-3d
         */
        options3d?: ChartOptions3D;
    }
}
/**
 * Options to render charts in 3 dimensions. This feature requires
 * `highcharts-3d.js`, found in the download package or online at
 * [code.highcharts.com/highcharts-3d.js](https://code.highcharts.com/highcharts-3d.js).
 *
 * @since    4.0
 * @product  highcharts
 * @requires highcharts-3d
 */
interface ChartOptions3D {
    /**
     * One of the two rotation angles for the chart.
     *
     * @since   4.0
     * @product highcharts
     */
    alpha?: number;
    axisLabelPosition?: ('auto' | null);
    /**
     * One of the two rotation angles for the chart.
     *
     * @since   4.0
     * @product highcharts
     */
    beta?: number;
    /**
     * The total depth of the chart.
     *
     * @since   4.0
     * @product highcharts
     */
    depth?: number;
    /**
     * Whether to render the chart using the 3D functionality.
     *
     * @since   4.0
     * @product highcharts
     */
    enabled?: boolean;
    /**
     * Whether the 3d box should automatically adjust to the chart
     * plot area.
     *
     * @since   4.2.4
     * @product highcharts
     */
    fitToPlot?: boolean;
    /**
     * Provides the option to draw a frame around the charts by
     * defining a bottom, front and back panel.
     *
     * @since    4.0
     * @product  highcharts
     * @requires highcharts-3d
     */
    frame?: Chart3D.FrameOptions;
    viewDistance?: number;
}
declare namespace Chart3D {
    /**
     * Provides the option to draw a frame around the charts by
     * defining a bottom, front and back panel.
     *
     * @since    4.0
     * @product  highcharts
     * @requires highcharts-3d
     */
    interface FrameOptions {
        /**
         * The back side of the frame around a 3D chart.
         */
        back?: FrameSideOptions;
        /**
         * The bottom of the frame around a 3D chart.
         */
        bottom?: FrameSideOptions;
        /**
         * The front of the frame around a 3D chart.
         */
        front?: FrameSideOptions;
        /**
         * The left side of the frame around a 3D chart.
         */
        left?: FrameSideOptions;
        /**
         * The right of the frame around a 3D chart.
         */
        right?: FrameSideOptions;
        /**
         * General pixel thickness for the frame faces.
         */
        size?: number;
        /**
         * The top of the frame around a 3D chart.
         */
        top?: FrameSideOptions;
        /**
         * Whether the frames are visible.
         *
         * @default default
         */
        visible?: string;
    }
    /**
     * A side of the frame around a 3D chart.
     *
     * @since    4.0
     * @product  highcharts
     * @requires highcharts-3d
     */
    interface FrameSideOptions {
        /**
         * The color of the panel.
         *
         * @default transparent
         * @since   4.0
         * @product highcharts
         */
        color?: ColorType;
        /**
         * The thickness of the panel.
         *
         * @default 1
         * @since   4.0
         * @product highcharts
         */
        size?: number;
        /**
         * Whether to display the frame. Possible values are `true`, `false`,
         * `"auto"` to display only the frames behind the data, and `"default"`
         * to display faces behind the data based on the axis layout, ignoring
         * the point of view.
         *
         * @sample {highcharts} highcharts/3d/scatter-frame/
         *         Auto frames
         *
         * @default default
         * @since   5.0.12
         * @product highcharts
         */
        visible?: ('auto' | 'default' | boolean);
    }
    class Additions {
    }
}
export default Chart3D;
