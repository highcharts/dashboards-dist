/**
 * Options for Drag and Drop
 */
export interface Options {
    /**
     * Offset how far from the cell edge the context (dragged element)
     * should be detectable.
     *
     * @default 30
     */
    cellDropOffset?: number;
    /**
     * Size of the drop pointer in pixels.
     *
     * @default 16
     */
    dropPointerSize?: number;
    /**
     * Whether the drag and drop is enabled.
     *
     * Try it:
     * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/edit-mode/dragdrop-disabled/ | Drag drop disabled}
     */
    enabled?: boolean;
    /**
     * Offset how far from the row edge the context (dragged element) should
     * be detectable.
     *
     * @default 30
     */
    rowDropOffset?: number;
}
export default DragDrop;
