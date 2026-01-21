import type Cell from '../Layout/Cell.js';
declare class ContextDetection {
    static isGUIElementOnParentEdge(mouseContext: Cell, side: ContextSides): boolean;
    static getContextLevel(mouseContext: Cell, offset: number, sideOffset: number, side: ContextSides): number;
    static getContext(mouseCellContext: Cell, e: PointerEvent, offset: number): ContextDetails;
}
export interface ContextDetails {
    cell: Cell;
    side: ContextSides;
}
export type ContextSides = 'right' | 'left' | 'top' | 'bottom';
export default ContextDetection;
