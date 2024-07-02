import type Cell from '../Layout/Cell.js';
declare class ContextDetection {
    static isGUIElementOnParentEdge(mouseContext: Cell, side: ContextDetection.ContextSides): boolean;
    static getContextLevel(mouseContext: Cell, offset: number, sideOffset: number, side: ContextDetection.ContextSides): number;
    static getContext(mouseCellContext: Cell, e: PointerEvent, offset: number): ContextDetection.ContextDetails;
}
declare namespace ContextDetection {
    interface ContextDetails {
        cell: Cell;
        side: ContextSides;
    }
    type ContextSides = 'right' | 'left' | 'top' | 'bottom';
}
export default ContextDetection;
