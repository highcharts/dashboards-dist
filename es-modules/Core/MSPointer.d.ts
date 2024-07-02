import type Chart from './Chart/Chart';
import type Options from './Options';
import type PointerEvent from './PointerEvent';
import Pointer from './Pointer.js';
import DOMElementType from './Renderer/DOMElementType';
declare global {
    /** @deprecated */
    interface MSPointerEvent extends Partial<PointerEvent> {
        /** @deprecated */
        readonly MSPOINTER_TYPE_TOUCH: string;
        readonly currentTarget?: EventTarget;
        readonly pointerId: number;
        readonly pointerType?: undefined;
        /** @deprecated */
        readonly toElement: Element;
    }
    interface Window {
        /** @deprecated */
        MSPointerEvent?: Class<MSPointerEvent>;
    }
}
/** @private */
declare class MSPointer extends Pointer {
    static isRequired(): boolean;
    /**
     * Add or remove the MS Pointer specific events
     * @private
     * @function Highcharts.Pointer#batchMSEvents
     */
    private batchMSEvents;
    destroy(): void;
    constructor(chart: Chart, options: Options);
    /**
     * Utility to detect whether an element has, or has a parent with, a
     * specific class name. Used on detection of tracker objects and on deciding
     * whether hovering the tooltip should cause the active series to mouse out.
     *
     * @function Highcharts.Pointer#inClass
     *
     * @param {Highcharts.SVGDOMElement|Highcharts.HTMLDOMElement} element
     * The element to investigate.
     *
     * @param {string} className
     * The class name to look for.
     *
     * @return {boolean|undefined}
     * True if either the element or one of its parents has the given class
     * name.
     */
    inClass(element: DOMElementType, className: string): (boolean | undefined);
    /**
     * @private
     * @function Highcharts.Pointer#onContainerPointerDown
     */
    private onContainerPointerDown;
    /**
     * @private
     * @function Highcharts.Pointer#onContainerPointerMove
     */
    private onContainerPointerMove;
    /**
     * @private
     * @function Highcharts.Pointer#onDocumentPointerUp
     */
    private onDocumentPointerUp;
    setDOMEvents(): void;
}
declare namespace MSPointer {
    /**
     * @private
     */
    function compose(ChartClass: typeof Chart): void;
}
export default MSPointer;
